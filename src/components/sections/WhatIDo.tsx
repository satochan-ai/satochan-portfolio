import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { services } from "@/content/services";

/**
 * 「対応できること」。旧 What I Do・Consultation・Use Cases を統合したセクション。
 * 文言は services.ts の home を参照し、表示順は /services と共通にする。
 * 旧アンカー：#what-i-do（セクション）、#use-cases（カード一覧）、#consultation（末尾の相談リンク）。
 */
export function WhatIDo() {
  return (
    <Section
      id="what-i-do"
      eyebrow="What I Do"
      title="対応できること"
      lead="SES営業と採用の実務経験をもとに、次の4つの領域でご相談を受けています。まず今の業務の進め方を伺い、そのうえで何から手を付けるかを一緒に決めます。"
      tone="surface"
    >
      <ul id="use-cases" className="grid gap-6 sm:grid-cols-2">
        {services.map((service) => {
          const area = service.home;
          return (
            <li
              key={service.no}
              className="flex flex-col rounded-card border border-line bg-bg p-7"
            >
              <h3 className="text-h3 font-bold [word-break:auto-phrase]">{area.title}</h3>

              <dl className="mt-4 flex flex-1 flex-col text-sm leading-relaxed">
                <dt className="text-xs font-medium text-accent">相談例</dt>
                <dd className="mt-1 font-medium text-fg [word-break:auto-phrase]">
                  {area.example}
                </dd>

                <dt className="mt-4 text-xs font-medium text-accent">支援内容</dt>
                <dd className="mt-1 text-muted">{area.support}</dd>

                <dt className="mt-auto border-t border-line pt-4 text-xs font-medium text-muted">
                  {area.relatedLabel}
                </dt>
                <dd className="mt-2">
                  <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
                    {area.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="font-medium text-accent hover:text-accent-hover hover:underline [word-break:auto-phrase]"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </dd>
              </dl>
            </li>
          );
        })}
      </ul>

      <p
        id="consultation"
        className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted"
      >
        成果物の例や進め方は、相談内容のページにまとめています。
        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 font-medium text-accent hover:text-accent-hover hover:underline"
        >
          相談内容を見る <span aria-hidden>&rarr;</span>
        </Link>
      </p>
    </Section>
  );
}
