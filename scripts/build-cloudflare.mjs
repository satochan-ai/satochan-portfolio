// Cloudflare Pages（Backup）用の静的ビルドを、元の作業ツリーを変更せずに生成する。
//
// - Vercel（Primary）用の通常ソースはそのまま残し、隔離コピー内でだけ
//   src/app/api/contact（Next.js Route Handler）を除外して static export する。
// - お問い合わせは functions/api/contact.ts（Pages Functions）が担当する。
// - canonical / sitemap / OGP は Primary URL を指す必要があるため、
//   NEXT_PUBLIC_SITE_URL の明示指定を必須とする（値はハードコードしない）。
// - deploy は行わない。
//
// 使い方:
//   NEXT_PUBLIC_SITE_URL=<Primary URL> npm run build:cloudflare
//   NEXT_PUBLIC_SITE_URL=<Primary URL> npm run build:cloudflare -- --ref=<commit>
//
// --ref 未指定時は現在の作業ツリーから、指定時は git archive でそのコミットから
// ソースを取り出す（本番手順はコミット基準で再現できるよう --ref を使う）。

import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// 既存の gitignore 領域（/.next/）配下に隔離する。
// 注意: 元リポジトリで `next build` を実行すると .next 配下とともに消える一時成果物。
const buildRoot = path.join(repoRoot, ".next", "cloudflare-build");
const outDir = path.join(buildRoot, "out");
const functionsCheckDir = path.join(buildRoot, ".functions-check");

// build に必要なものだけを明示的にコピーする（node_modules・lockfile・.env*・docs・tmp は対象外）。
// lockfile を置かないことで、依存解決は元リポジトリの node_modules を参照する。
const SOURCE_ENTRIES = [
  "src",
  "public",
  "functions",
  "package.json",
  "next.config.ts",
  "tsconfig.json",
  "postcss.config.mjs",
];
const EXCLUDED_FROM_EXPORT = "src/app/api/contact";
const WRANGLER_VERSION = process.env.WRANGLER_VERSION ?? "4.141.0";
if (!/^\d+\.\d+\.\d+$/.test(WRANGLER_VERSION)) {
  console.error("[build:cloudflare] FAIL: WRANGLER_VERSION は x.y.z 形式で指定してください。");
  process.exit(1);
}

function fail(message) {
  console.error(`\n[build:cloudflare] FAIL: ${message}`);
  process.exit(1);
}

function log(message) {
  console.log(`[build:cloudflare] ${message}`);
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { stdio: "inherit", ...options });
  if (result.error) fail(`${command} を実行できませんでした: ${result.error.message}`);
  if (result.status !== 0) fail(`${[command, ...args].join(" ")} が終了コード ${result.status} で失敗しました。`);
}

function git(args) {
  const result = spawnSync("git", args, { cwd: repoRoot, encoding: "buffer" });
  if (result.status !== 0) fail(`git ${args.join(" ")} が失敗しました。\n${result.stderr}`);
  return result.stdout;
}

// ---- 1. Primary URL の検証 ----------------------------------------------

function resolvePrimaryUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) {
    fail(
      "NEXT_PUBLIC_SITE_URL が未設定です。canonical / sitemap / OGP が Primary（Vercel）URL を指すよう、明示的に指定してください。",
    );
  }
  let url;
  try {
    url = new URL(raw);
  } catch {
    fail(`NEXT_PUBLIC_SITE_URL が URL として不正です: ${raw}`);
  }
  if (url.protocol !== "https:") fail("NEXT_PUBLIC_SITE_URL は https:// で指定してください。");
  if (["localhost", "127.0.0.1", "[::1]"].includes(url.hostname) || url.hostname.endsWith(".localhost")) {
    fail("NEXT_PUBLIC_SITE_URL にローカルホストは指定できません。");
  }
  if (url.hostname.endsWith(".pages.dev")) {
    fail("NEXT_PUBLIC_SITE_URL に Cloudflare Pages（Backup）の URL は指定できません。Primary URL を指定してください。");
  }
  if (url.pathname !== "/" || url.search || url.hash) {
    fail("NEXT_PUBLIC_SITE_URL はオリジンのみ（パス・クエリなし）で指定してください。");
  }
  return url.origin;
}

// ---- 2. 元リポジトリの状態スナップショット -------------------------------

function hashPath(target, hash) {
  const stat = fs.statSync(target, { throwIfNoEntry: false });
  if (!stat) return;
  if (stat.isDirectory()) {
    for (const name of fs.readdirSync(target).sort()) hashPath(path.join(target, name), hash);
    return;
  }
  hash.update(path.relative(repoRoot, target));
  hash.update(fs.readFileSync(target));
}

function snapshotSource() {
  const hash = createHash("sha256");
  hash.update(git(["status", "--porcelain=v1", "-uall"]));
  for (const entry of SOURCE_ENTRIES) hashPath(path.join(repoRoot, entry), hash);
  return hash.digest("hex");
}

// ---- 3. 隔離コピーの作成 --------------------------------------------------

function prepareBuildRoot() {
  const expectedParent = path.join(repoRoot, ".next");
  if (path.dirname(buildRoot) !== expectedParent) fail("隔離ディレクトリの位置が想定外です。");
  fs.rmSync(buildRoot, { recursive: true, force: true });
  fs.mkdirSync(buildRoot, { recursive: true });
}

function copyFromWorkingTree() {
  for (const entry of SOURCE_ENTRIES) {
    const from = path.join(repoRoot, entry);
    if (!fs.existsSync(from)) fail(`必要なファイルがありません: ${entry}`);
    fs.cpSync(from, path.join(buildRoot, entry), { recursive: true });
  }
}

function copyFromRef(ref) {
  const commit = git(["rev-parse", "--verify", `${ref}^{commit}`]).toString().trim();
  const archive = git(["archive", "--format=tar", commit, "--", ...SOURCE_ENTRIES]);
  // -C にドライブレター付きパスを渡さないよう、cwd で展開先を指定する。
  const result = spawnSync("tar", ["-x", "-f", "-"], { cwd: buildRoot, input: archive });
  if (result.status !== 0) fail(`git archive の展開に失敗しました。\n${result.stderr}`);
  return commit;
}

// ---- 4. 成果物の検査 ------------------------------------------------------

function readOut(relative) {
  const file = path.join(outDir, relative);
  if (!fs.existsSync(file)) fail(`out/${relative} が生成されていません。`);
  return fs.readFileSync(file, "utf8");
}

function listFiles(dir) {
  return fs.readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => path.join(entry.parentPath, entry.name));
}

function canonicalOf(html) {
  return html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? null;
}

function verifyOutput(siteUrl) {
  const checks = [];
  const check = (label, ok, detail = "") => {
    checks.push({ label, ok, detail });
  };

  for (const file of ["index.html", "services.html", "404.html", "robots.txt", "sitemap.xml", "icon"]) {
    check(`out/${file} が存在する`, fs.existsSync(path.join(outDir, file)));
  }
  check("out/_next/static が存在する", fs.existsSync(path.join(outDir, "_next", "static")));
  const apiOutputs = fs.existsSync(path.join(outDir, "api"))
    ? listFiles(path.join(outDir, "api")).map((f) => path.relative(outDir, f))
    : [];
  check("out/api/contact の静的出力がない", apiOutputs.length === 0, apiOutputs.join(", "));

  const indexHtml = readOut("index.html");
  const servicesHtml = readOut("services.html");
  const indexCanonical = canonicalOf(indexHtml);
  const servicesCanonical = canonicalOf(servicesHtml);
  check("index canonical が Primary URL", indexCanonical === siteUrl, String(indexCanonical));
  check("services canonical が Primary URL", servicesCanonical === `${siteUrl}/services`, String(servicesCanonical));

  const ogUrls = [...indexHtml.matchAll(/<meta property="og:(?:url|image)" content="([^"]+)"/g)].map((m) => m[1]);
  check(
    "index OGP（og:url / og:image）が Primary URL 配下",
    ogUrls.length > 0 && ogUrls.every((u) => u === siteUrl || u.startsWith(`${siteUrl}/`)),
    ogUrls.join(", "),
  );

  const sitemap = readOut("sitemap.xml");
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  check(
    "sitemap の <loc> がすべて Primary URL 配下",
    locs.length > 0 && locs.every((u) => u === siteUrl || u.startsWith(`${siteUrl}/`)),
    locs.join(", "),
  );

  const robots = readOut("robots.txt");
  check("robots の Sitemap 指定が Primary URL", robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`));

  const textFiles = listFiles(outDir).filter((f) => /\.(html|txt|xml|json)$/.test(f));
  const offenders = textFiles.filter((f) => /localhost|127\.0\.0\.1|\.pages\.dev/.test(fs.readFileSync(f, "utf8")));
  check(
    "localhost / *.pages.dev を含む出力がない",
    offenders.length === 0,
    offenders.map((f) => path.relative(outDir, f)).join(", "),
  );

  for (const { label, ok, detail } of checks) {
    console.log(`  ${ok ? "PASS" : "FAIL"}  ${label}${!ok && detail ? ` (${detail})` : ""}`);
  }
  if (checks.some((c) => !c.ok)) fail("成果物検査に失敗しました。");
}

// ---- main -----------------------------------------------------------------

const refArg = process.argv.slice(2).find((arg) => arg.startsWith("--ref="));
const ref = refArg?.slice("--ref=".length);

const siteUrl = resolvePrimaryUrl();
const before = snapshotSource();

log(`Primary URL: ${siteUrl}`);
log(`隔離ディレクトリ: ${path.relative(repoRoot, buildRoot)}`);
prepareBuildRoot();

if (ref) {
  const commit = copyFromRef(ref);
  log(`ソース: git archive ${commit}`);
} else {
  copyFromWorkingTree();
  log("ソース: 現在の作業ツリー（検証用。本番手順では --ref=<commit> を使う）");
}

// 隔離コピー内でのみ Next.js Route Handler を除外する。
fs.rmSync(path.join(buildRoot, EXCLUDED_FROM_EXPORT), { recursive: true, force: true });
if (fs.existsSync(path.join(buildRoot, EXCLUDED_FROM_EXPORT))) fail(`${EXCLUDED_FROM_EXPORT} を除外できませんでした。`);
log(`隔離コピーから ${EXCLUDED_FROM_EXPORT} を除外しました。`);

const childEnv = { ...process.env, CLOUDFLARE_STATIC_EXPORT: "1", NEXT_PUBLIC_SITE_URL: siteUrl };
// 静的出力にサーバー専用の値は不要なため子プロセスへ渡さない。
delete childEnv.FORMSPREE_FORM_ID;

const nextBin = createRequire(import.meta.url).resolve("next/dist/bin/next");
log("next build（static export）を実行します。");
run(process.execPath, [nextBin, "build"], { cwd: buildRoot, env: childEnv });

if (!fs.existsSync(outDir)) fail("out/ が生成されていません。");

log(`Pages Functions のコンパイル確認（wrangler@${WRANGLER_VERSION}、deploy なし）`);
// Windows の npx は .cmd のため shell 経由で実行する（引数は固定値のみ）。
const wranglerCommand = [
  "npx",
  "--yes",
  `wrangler@${WRANGLER_VERSION}`,
  "pages functions build functions --outdir .functions-check",
].join(" ");
run(wranglerCommand, [], {
  cwd: buildRoot,
  env: { ...childEnv, WRANGLER_SEND_METRICS: "false" },
  shell: true,
});
if (!fs.existsSync(functionsCheckDir)) fail("Pages Functions のコンパイル結果がありません。");

log("成果物検査");
verifyOutput(siteUrl);

const after = snapshotSource();
if (before !== after) fail("元リポジトリのソースまたは git status がビルド中に変化しました。");
log("元リポジトリのソース・git status に変化がないことを確認しました。");

log("完了（deploy は行っていません）");
log(`  Pages build root : ${path.relative(repoRoot, buildRoot)}`);
log(`  静的出力         : ${path.relative(repoRoot, outDir)}`);
log(`  Pages Functions  : ${path.relative(repoRoot, path.join(buildRoot, "functions"))}`);
