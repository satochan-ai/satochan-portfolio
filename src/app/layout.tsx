import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getSiteUrl, site } from "@/content/site";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-jp",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = getSiteUrl();

const title = "現場を知っているから、AIを実務に変えられる。｜Portfolio";
const description =
  "SES営業16年・採用10年の現場経験をもとに、AI活用、業務改善、Web・業務ツール開発に取り組む個人ポートフォリオ。実運用のWebサイトや営業支援ツール、AI活用講座などを紹介しています。";

export const metadata: Metadata = {
  // 本番URLが未確定の間は metadataBase / canonical を出力しない（架空URLを作らない）
  ...(siteUrl
    ? { metadataBase: new URL(siteUrl), alternates: { canonical: "/" } }
    : {}),
  title: {
    default: title,
    template: `%s｜${site.name}`,
  },
  description,
  applicationName: site.name,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: site.name,
    title,
    description,
    ...(siteUrl ? { url: siteUrl } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${inter.variable} ${notoSansJp.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg text-fg">
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
