// Cloudflare 成果物検査（SEO 関連）の fixture テスト。
// 実行: node --test scripts/cloudflare-output-check.test.mjs
// 本番成果物は使わず、文字列 fixture だけで検証する。

import assert from "node:assert/strict";
import { test } from "node:test";

import { inspectSeoOutput } from "./cloudflare-output-check.mjs";

const PRIMARY = "https://satochan-portfolio.vercel.app";
const BACKUP_HOST = "satochan-portfolio.pages.dev";
const BACKUP = `https://${BACKUP_HOST}`;

const TOOL_LINKS = [
  "https://ses-check-lite.pages.dev/",
  "https://sales-hearing-check.pages.dev/",
  "https://ai-before-after-diagnosis.pages.dev/",
  "https://job-posting-checker.pages.dev/",
]
  .map((href) => `<a href="${href}" target="_blank" rel="noopener noreferrer">ツールを開く</a>`)
  .join("");

function page({ canonical, ogUrl, ogImage, twitterImage }) {
  return [
    "<html><head>",
    `<link rel="canonical" href="${canonical}"/>`,
    `<meta property="og:url" content="${ogUrl}"/>`,
    `<meta property="og:image" content="${ogImage}"/>`,
    `<meta name="twitter:image" content="${twitterImage}"/>`,
    `</head><body>${TOOL_LINKS}</body></html>`,
  ].join("");
}

function fixture(overrides = {}) {
  const indexHtml =
    overrides.indexHtml ??
    page({
      canonical: PRIMARY,
      ogUrl: PRIMARY,
      ogImage: `${PRIMARY}/opengraph-image.png?v`,
      twitterImage: `${PRIMARY}/twitter-image.png?v`,
    });
  const servicesHtml =
    overrides.servicesHtml ?? `<html><head><link rel="canonical" href="${PRIMARY}/services"/></head></html>`;
  const sitemap =
    overrides.sitemap ??
    `<urlset><url><loc>${PRIMARY}/</loc></url><url><loc>${PRIMARY}/services</loc></url></urlset>`;
  const robots = overrides.robots ?? `User-Agent: *\nAllow: /\n\nSitemap: ${PRIMARY}/sitemap.xml\n`;
  return {
    siteUrl: PRIMARY,
    backupHost: BACKUP_HOST,
    indexHtml,
    servicesHtml,
    sitemap,
    robots,
    textFiles: [
      { name: "index.html", content: indexHtml },
      { name: "services.html", content: servicesHtml },
      { name: "sitemap.xml", content: sitemap },
      { name: "robots.txt", content: robots },
    ],
  };
}

function failedLabels(input) {
  return inspectSeoOutput(input)
    .filter((c) => !c.ok)
    .map((c) => c.label);
}

const validPage = (patch) =>
  page({
    canonical: PRIMARY,
    ogUrl: PRIMARY,
    ogImage: `${PRIMARY}/opengraph-image.png?v`,
    twitterImage: `${PRIMARY}/twitter-image.png?v`,
    ...patch,
  });

test("1. 公開ツールへの正当な *.pages.dev リンクがあっても PASS", () => {
  assert.deepEqual(failedLabels(fixture()), []);
});

test("2. canonical が Backup 自身の URL なら FAIL", () => {
  const failed = failedLabels(fixture({ indexHtml: validPage({ canonical: BACKUP }) }));
  assert.ok(failed.includes("index canonical が Primary URL"));
});

test("3. og:url が Backup 自身の URL なら FAIL", () => {
  const failed = failedLabels(fixture({ indexHtml: validPage({ ogUrl: BACKUP }) }));
  assert.ok(failed.includes("OGP・Twitter の URL がすべて Primary URL 配下"));
});

test("3b. twitter:image だけが Backup 自身の URL でも FAIL", () => {
  const failed = failedLabels(
    fixture({ indexHtml: validPage({ twitterImage: `${BACKUP}/twitter-image.png` }) }),
  );
  assert.ok(failed.includes("OGP・Twitter の URL がすべて Primary URL 配下"));
});

test("4. sitemap の loc が Backup 自身の URL なら FAIL", () => {
  const failed = failedLabels(
    fixture({ sitemap: `<urlset><url><loc>${BACKUP}/</loc></url></urlset>` }),
  );
  assert.ok(failed.includes("sitemap の <loc> がすべて Primary URL 配下"));
});

test("5. SEO メタデータに localhost が入ると FAIL", () => {
  const failed = failedLabels(fixture({ indexHtml: validPage({ ogUrl: "http://localhost:3000" }) }));
  assert.ok(failed.includes("OGP・Twitter の URL がすべて Primary URL 配下"));
  assert.ok(failed.includes(`localhost / ${BACKUP_HOST} を含む出力がない`));
});

test("6. SEO メタデータに 127.0.0.1 が入ると FAIL", () => {
  const failed = failedLabels(
    fixture({ indexHtml: validPage({ canonical: "http://127.0.0.1:3000" }) }),
  );
  assert.ok(failed.includes("index canonical が Primary URL"));
  assert.ok(failed.includes(`localhost / ${BACKUP_HOST} を含む出力がない`));
});

test("7. 正しい Primary の canonical・OGP・sitemap は PASS（表記揺れも正規化）", () => {
  const upper = "https://SATOCHAN-PORTFOLIO.vercel.app";
  assert.deepEqual(
    failedLabels(fixture({ indexHtml: validPage({ canonical: `${upper}/`, ogUrl: `${upper}:443` }) })),
    [],
  );
});

test("8. 正常な URL に混ざった 1 件の不正 URL も隠れずに FAIL", () => {
  const failed = failedLabels(
    fixture({
      sitemap: `<urlset><url><loc>${PRIMARY}/</loc></url><url><loc>${BACKUP}/services</loc></url></urlset>`,
      robots: `Sitemap: ${PRIMARY}/sitemap.xml\nSitemap: ${BACKUP}/sitemap.xml\n`,
    }),
  );
  assert.ok(failed.includes("sitemap の <loc> がすべて Primary URL 配下"));
  assert.ok(failed.includes("robots の Sitemap 指定が Primary URL"));
});

test("9. Backup のホストは大文字表記でも本文から検出して FAIL", () => {
  const failed = failedLabels(
    fixture({ servicesHtml: `<link rel="canonical" href="${PRIMARY}/services"/><a href="https://SATOCHAN-PORTFOLIO.PAGES.DEV/">x</a>` }),
  );
  assert.ok(failed.includes(`localhost / ${BACKUP_HOST} を含む出力がない`));
});

test("10. Primary に似た別ホスト（接尾辞の偽装）は FAIL", () => {
  const failed = failedLabels(
    fixture({ indexHtml: validPage({ ogUrl: "https://satochan-portfolio.vercel.app.evil.example/" }) }),
  );
  assert.ok(failed.includes("OGP・Twitter の URL がすべて Primary URL 配下"));
});
