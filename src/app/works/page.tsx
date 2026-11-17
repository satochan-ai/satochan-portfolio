import type { Metadata } from "next";
import Link from "next/link";

import { CaseStudy } from "@/components/sections/CaseStudy";
import { WorksList } from "@/components/sections/SelectedWorks";
import { caseStudies } from "@/content/caseStudies";
import { getSiteUrl } from "@/content/site";

const title = "制作物・取り組み事例｜Portfolio";
const description =
  "SES営業・採用の経験をもとに制作した業務ツールやWebサイト、公開ツール、詳しい取り組み事例を、運用中・デモ・試作といった公開状況とともに掲載しています。";
const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  ...(siteUrl ? { alternates: { canonical: "/works" } } : {}),
  openGraph: { title, description },
  twitter: { title, description },
};

export default function WorksPage() {
  return (
    <>
      <section aria-labelledby="works-page-title" className="border-t border-line/70 bg-bg py-20 sm:py-28">
        <div className="mx-auto w-full max-w-page px-5 sm:px-8">
          <p className="text-eyebrow font-medium uppercase text-accent">Works / Case Study</p>
          <h1 id="works-page-title" className="mt-5 max-w-[19ch] text-display font-bold [text-wrap:balance] [word-break:auto-phrase]">
            制作物・取り組み事例
          </h1>
          <p className="mt-7 max-w-prose text-base leading-loose text-muted sm:text-lg">
            SES営業・採用の経験をもとに、業務ツールやWebサイトを制作しています。実際に運用しているものから、検証中の試作まで掲載しています。
          </p>

          <nav aria-label="ページ内目次" className="mt-10 max-w-prose border-t border-line pt-6">
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#works" className="font-medium text-accent hover:underline">
                  制作物一覧
                </a>
              </li>
              <li>
                <a href="#case-study" className="font-medium text-accent hover:underline">
                  詳しい取り組み事例
                </a>
                <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-muted">
                  {caseStudies.map((study) => (
                    <li key={study.id}>
                      <a href={`#${study.id}`} className="hover:text-fg hover:underline [word-break:auto-phrase]">
                        {study.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </section>

      <WorksList />

      <CaseStudy />

      <section aria-label="ご相談への案内" className="border-t border-line/70 bg-surface py-14 sm:py-16">
        <div className="mx-auto flex w-full max-w-page flex-wrap items-center gap-x-6 gap-y-3 px-5 sm:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full border border-fg/20 px-5 py-3 text-sm font-medium text-fg transition-colors hover:border-fg/50"
          >
            相談内容を見る <span aria-hidden>&rarr;</span>
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
          >
            お問い合わせ <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </section>
    </>
  );
}
