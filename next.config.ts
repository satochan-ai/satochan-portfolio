import type { NextConfig } from "next";

// Cloudflare Pages（Backup）用の静的出力は scripts/build-cloudflare.mjs が
// 隔離コピー内でのみ CLOUDFLARE_STATIC_EXPORT=1 を付けて実行する。
// 通常の `next build`（Vercel / Primary）では output・images を変更しない。
const isCloudflareStaticExport = process.env.CLOUDFLARE_STATIC_EXPORT === "1";

// 基本セキュリティヘッダー。HSTS は Vercel 側が付与するため、ここでは設定しない。
// CSP は別工程。静的 export では headers() が使えないため Cloudflare build では無効化する。
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  ...(isCloudflareStaticExport
    ? {
        output: "export",
        images: { unoptimized: true },
      }
    : {
        async headers() {
          return [{ source: "/(.*)", headers: securityHeaders }];
        },
      }),
};

export default nextConfig;
