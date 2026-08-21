import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    // sitemap の絶対URLは本番URLが解決できるときだけ出力する
    ...(siteUrl ? { sitemap: `${siteUrl}/sitemap.xml` } : {}),
  };
}
