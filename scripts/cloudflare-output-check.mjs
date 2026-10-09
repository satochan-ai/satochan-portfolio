// Cloudflare static export の SEO 関連出力を検査する純粋関数。
// build-cloudflare.mjs から使うほか、scripts/cloudflare-output-check.test.mjs から fixture で検証する。
//
// 方針:
// - canonical / OGP・Twitter の URL / sitemap / robots の Sitemap は、Primary URL（Vercel）のオリジン配下であること。
//   URL は URL API で正規化して比較し、大文字・既定ポートなどの表記違いで回避できないようにする。
// - 出力全体に localhost 系と Backup 自身のホスト（<project>.pages.dev）を含まないこと。
//   他の Pages project への外部リンク（公開ツール等）は許容する。

const LOCAL_HOST_PATTERN = "localhost|127\\.0\\.0\\.1|\\[::1\\]";

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function canonicalOf(html) {
  return html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? null;
}

/** og:* / twitter:* のうち、値が URL のものだけを集める。 */
function socialUrlsOf(html) {
  return [
    ...html.matchAll(/<meta (?:property|name)="(?:og|twitter):[^"]+" content="([^"]+)"/g),
  ]
    .map((m) => m[1])
    .filter((value) => /^https?:\/\//i.test(value));
}

function parseUrl(value) {
  try {
    return new URL(value);
  } catch {
    return null;
  }
}

/** Primary のオリジン配下か（正規化後に比較）。 */
function isUnderPrimary(value, primary) {
  const url = parseUrl(value);
  return url !== null && url.origin === primary.origin;
}

function samePageUrl(value, expected) {
  const url = parseUrl(value);
  const want = parseUrl(expected);
  if (!url || !want) return false;
  const normalizePath = (p) => p.replace(/\/+$/, "") || "/";
  return url.origin === want.origin && normalizePath(url.pathname) === normalizePath(want.pathname);
}

/**
 * @param {object} input
 * @param {string} input.siteUrl Primary URL（オリジン）
 * @param {string} input.backupHost Cloudflare Backup 自身のホスト（例: satochan-portfolio.pages.dev）
 * @param {string} input.indexHtml
 * @param {string} input.servicesHtml
 * @param {string} input.sitemap
 * @param {string} input.robots
 * @param {{ name: string, content: string }[]} input.textFiles 出力内のテキストファイル
 * @returns {{ label: string, ok: boolean, detail: string }[]}
 */
export function inspectSeoOutput({
  siteUrl,
  backupHost,
  indexHtml,
  servicesHtml,
  sitemap,
  robots,
  textFiles,
}) {
  const primary = new URL(siteUrl);
  const checks = [];
  const check = (label, ok, detail = "") => checks.push({ label, ok, detail });
  const underPrimary = (value) => isUnderPrimary(value, primary);

  const indexCanonical = canonicalOf(indexHtml);
  const servicesCanonical = canonicalOf(servicesHtml);
  check(
    "index canonical が Primary URL",
    indexCanonical !== null && samePageUrl(indexCanonical, siteUrl),
    String(indexCanonical),
  );
  check(
    "services canonical が Primary URL",
    servicesCanonical !== null && samePageUrl(servicesCanonical, `${siteUrl}/services`),
    String(servicesCanonical),
  );

  const indexSocial = socialUrlsOf(indexHtml);
  const socialUrls = [...indexSocial, ...socialUrlsOf(servicesHtml)];
  check(
    "OGP・Twitter の URL がすべて Primary URL 配下",
    indexSocial.length > 0 && socialUrls.every(underPrimary),
    socialUrls.join(", "),
  );

  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  check(
    "sitemap の <loc> がすべて Primary URL 配下",
    locs.length > 0 && locs.every(underPrimary),
    locs.join(", "),
  );

  const sitemapLines = [...robots.matchAll(/^Sitemap:\s*(\S+)/gim)].map((m) => m[1]);
  check(
    "robots の Sitemap 指定が Primary URL",
    sitemapLines.length > 0 &&
      sitemapLines.every((value) => samePageUrl(value, `${siteUrl}/sitemap.xml`)),
    sitemapLines.join(", "),
  );

  const forbidden = new RegExp(`${LOCAL_HOST_PATTERN}|${escapeRegExp(backupHost)}`, "i");
  const offenders = textFiles.filter((file) => forbidden.test(file.content)).map((file) => file.name);
  check(
    `localhost / ${backupHost} を含む出力がない`,
    offenders.length === 0,
    offenders.join(", "),
  );

  return checks;
}
