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
    body: "SES営業・採用の現場理解をもとに、属人的な業務を、チームで追えて続けられる運用へ整理します。",
    points: ["営業・採用プロセスの整理", "判断基準の言語化と運用定着"],
  },
  {
    no: "02",
    en: "AI Enablement",
    title: "AI活用の設計",
    body: "業務フローを整理し、AIに任せる工程と人が判断する工程を切り分けて組み込みます。",
    points: ["業務フローの棚卸し", "AI活用の設計と定着"],
  },
  {
    no: "03",
    en: "Web & Business Tools",
    title: "Web・業務ツール開発",
    body: "現場の課題に合わせ、Webサイトや小規模な業務ツールを必要な範囲で実装します。",
    points: ["課題整理と要件定義", "実装・公開後の改善"],
  },
  {
    no: "04",
    en: "Training & Knowledge Sharing",
    title: "教育・ナレッジ共有",
    body: "AI活用や業務改善の知識を、聞いた人が実務で再現できる形へ整理して共有します。",
    points: ["講座・勉強会での共有", "手順とナレッジの整理"],
  },
];

export function WhatIDo() {
  return (
    <Section
      id="what-i-do"
      eyebrow="What I Do"
      title="課題の発見から、整理・設計・実装・運用まで。"
      lead="現場理解を起点に、業務整理・AI活用・実装をつなげて扱えることを強みにしています。"
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
