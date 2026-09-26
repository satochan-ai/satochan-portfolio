import type { NextConfig } from "next";

// Cloudflare Pages（Backup）用の静的出力は scripts/build-cloudflare.mjs が
// 隔離コピー内でのみ CLOUDFLARE_STATIC_EXPORT=1 を付けて実行する。
// 通常の `next build`（Vercel / Primary）では output・images を変更しない。
const isCloudflareStaticExport = process.env.CLOUDFLARE_STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isCloudflareStaticExport && {
    output: "export",
    images: { unoptimized: true },
  }),
};

export default nextConfig;
