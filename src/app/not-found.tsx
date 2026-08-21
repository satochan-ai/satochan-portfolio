import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ページが見つかりません",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-page flex-col items-start px-5 py-28 sm:px-8 sm:py-36">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-4 text-h2 font-bold">ページが見つかりませんでした。</h1>
      <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted sm:text-base">
        URLが変更されたか、削除された可能性があります。
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-fg px-6 py-3.5 text-sm font-medium text-bg transition-opacity hover:opacity-85"
      >
        トップへ戻る
      </Link>
    </div>
  );
}
