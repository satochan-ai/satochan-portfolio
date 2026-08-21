import { Section } from "@/components/ui/Section";

type Service = {
  no: string;
  en: string;
  title: string;
  body: string;
  points: string[];
};

const services: Service[] = [
  {
    no: "01",
    en: "Sales & Recruiting Operations",
    title: "営業・採用のオペレーション改善",
    body: "SES営業・採用の現場に立ってきた前提で、営業・採用プロセスを整理します。個人の勘に依存している動きを、誰でも追える形に変えることが目的です。",
    points: ["営業・採用プロセスの整理", "属人化している判断の言語化", "現場が続けられる運用へ落とし込み"],
  },
  {
    no: "02",
    en: "AI Enablement",
    title: "AI活用の設計",
    body: "生成AIを導入して終わりにしません。実際の業務フローのどこで使うか、どこは人が判断するかを切り分けたうえで組み込みます。",
    points: ["業務フローの棚卸し", "AIを入れる工程の選定", "使い続けられる形での定着"],
  },
  {
    no: "03",
    en: "Web & Business Tools",
    title: "Web・業務ツール開発",
    body: "現場の課題に合わせて、Webサイトや小規模な業務ツールを企画から実装まで行います。大きく作らず、必要な範囲で早く形にします。",
    points: ["課題整理と要件定義", "Next.js / TypeScript での実装", "公開後の運用と改善"],
  },
  {
    no: "04",
    en: "Training & Knowledge Sharing",
    title: "教育・ナレッジ共有",
    body: "AI活用や業務改善を、人が実践できる形まで整理します。自分が使えることと、人が使えるようになることは別だと考えています。",
    points: ["社内・社外向けの講座と登壇", "手順とナレッジの整理", "実務で再現できる形での共有"],
  },
];

export function WhatIDo() {
  return (
    <Section
      id="what-i-do"
      eyebrow="What I Do"
      title="課題の発見から、整理・設計・実装・運用まで。"
      lead="どれか1つだけを担当するのではなく、つながった形で取り組めることを強みにしています。"
      tone="surface"
    >
      <ul className="grid gap-6 sm:grid-cols-2">
        {services.map((service) => (
          <li
            key={service.no}
            className="flex flex-col rounded-card border border-line bg-bg p-7"
          >
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-sm text-accent">
                {service.no}
              </span>
              <span className="text-xs font-medium text-muted">
                {service.en}
              </span>
            </div>
            <h3 className="mt-4 text-h3 font-bold">{service.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {service.body}
            </p>
            <ul className="mt-6 space-y-2 border-t border-line pt-5 text-sm text-fg">
              {service.points.map((point) => (
                <li key={point} className="flex gap-2.5">
                  <span
                    aria-hidden
                    className="mt-2 size-1 shrink-0 rounded-full bg-muted"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}
