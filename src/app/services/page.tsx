import type { Metadata } from "next";
import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { commonConsultationIssues, services, supportProcess } from "@/content/services";
import { getSiteUrl } from "@/content/site";

const title = "営業・採用のAI活用・業務改善支援｜Portfolio";
const description =
  "SES営業・採用の現場経験をもとに、AI活用、業務フロー整理、営業・採用業務の仕組み化、小規模な業務ツール試作について個人でのご相談・協業を受け付けています。";
const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  ...(siteUrl ? { alternates: { canonical: "/services" } } : {}),
  openGraph: { title, description },
  twitter: { title, description },
};

export default function ServicesPage() {
  return (
    <>
      <section aria-labelledby="services-title" className="border-t border-line/70 bg-bg py-20 sm:py-28">
        <div className="mx-auto w-full max-w-page px-5 sm:px-8">
          <p className="text-eyebrow font-medium uppercase text-accent">Services / Consultation</p>
          <h1 id="services-title" className="mt-5 max-w-[19ch] text-display font-bold [text-wrap:balance] [word-break:auto-phrase]">
            現場業務の整理から、<br />AI活用・仕組み化・小さな実装まで。
          </h1>
          <p className="mt-7 max-w-prose text-base leading-loose text-muted sm:text-lg">
            営業・採用などの実務課題を整理し、AIを使える工程、人が判断する工程、仕組みにした方がよい工程を切り分けます。必要な場合は、小さな業務ツールの試作まで対応します。
          </p>
          <p className="mt-6 text-sm leading-relaxed text-muted">個人でのご相談・協業についてご案内しています。</p>
        </div>
      </section>

      <Section
        id="service-areas"
        eyebrow="Service Areas"
        title="相談できること"
        lead="困りごとを起点に、現場で続けられる形を考えます。"
        tone="surface"
      >
        <ol className="border-t border-line">
          {services.map((service) => (
            <li key={service.no} className="grid gap-5 border-b border-line py-8 lg:grid-cols-[5rem_minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-8">
              <span className="font-mono text-sm text-accent">{service.no}</span>
              <div>
                <h2 className="text-h3 font-bold [word-break:auto-phrase]">{service.title}</h2>
                <p className="mt-3 text-sm font-medium leading-relaxed text-fg">{service.problem}</p>
              </div>
              <div>
                <p className="text-sm leading-relaxed text-muted">{service.support}</p>
                <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4 text-sm text-fg">
                  {service.examples.map((example) => <li key={example}>{example}</li>)}
                </ul>
                <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm">
                  <span className="font-mono text-xs text-muted">RELATED</span>
                  {service.relatedWorks.map((work) => (
                    <Link key={work} href="/#works" className="text-accent hover:text-accent-hover hover:underline">
                      {work}
                    </Link>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 border-l-2 border-accent pl-5">
          <h2 className="text-h3 font-bold">研修・勉強会のご相談にも対応しています。</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">SES営業、生成AI活用、業務でのAI利用をテーマに、実務で使える形で共有します。</p>
          <Link href="/#speaking" className="mt-4 inline-flex text-sm font-medium text-accent hover:text-accent-hover hover:underline">
            登壇実績を見る →
          </Link>
        </div>
      </Section>

      <Section id="common-issues" eyebrow="Common Issues" title="よくある課題">
        <ul className="border-t border-line">
          {commonConsultationIssues.map((issue, index) => (
            <li key={issue} className="flex gap-4 border-b border-line py-4 text-sm leading-relaxed sm:text-base">
              <span className="font-mono text-xs text-accent">{String(index + 1).padStart(2, "0")}</span>
              {issue}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="service-process"
        eyebrow="Process"
        title="進め方"
        lead="いきなりツールを作るのではなく、現場の状況を整理するところから始めます。"
        tone="surface"
      >
        <ol className="grid gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-5">
          {supportProcess.map((step, index) => (
            <li key={step} className="border-t border-line pt-4">
              <span className="font-mono text-sm text-accent">{String(index + 1).padStart(2, "0")}</span>
              <h2 className="mt-3 text-h3 font-bold">{step}</h2>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="service-contact"
        eyebrow="Contact"
        title="まずは、課題整理からご相談ください。"
        lead="「何をAI化すべきか分からない」「ツールにするべきか判断できない」といった段階でも構いません。"
        tone="dark"
      >
        <Link href="/#contact" className="inline-flex items-center justify-center rounded-full bg-accent-on-dark px-6 py-3.5 text-sm font-medium text-fg transition-colors hover:bg-inverse-fg">
          相談する
        </Link>
      </Section>
    </>
  );
}
