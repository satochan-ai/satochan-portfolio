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
    en: "Workflow Design",
    title: "業務整理",
    body: "営業・採用の現場経験をもとに、業務の流れと関係者、詰まりや例外を把握し、課題と判断基準を整理します。",
    points: ["業務フローと課題の把握", "判断基準・例外の言語化"],
  },
  {
    no: "02",
    en: "AI Enablement",
    title: "AI活用設計",
    body: "情報整理や比較をAIが支援する工程と、人が判断・確認する工程を切り分けます。既存ツールや運用改善で対応できる場合は、そちらを優先します。",
    points: ["AIと既存手段の適用検討", "人が判断・確認する工程の設計"],
  },
  {
    no: "03",
    en: "Process & Prototyping",
    title: "仕組み化・試作",
    body: "改善案を、必要に応じて小さな業務ツールとして試作します。要件整理、AIを使った実装、テストを通じて、具体的に検討できる形にします。",
    points: ["必要な機能と要件の整理", "小規模な試作とテスト"],
  },
  {
    no: "04",
    en: "Verification & Improvement",
    title: "検証・改善",
    body: "実際の利用で課題や効果を確かめ、確認できたことと未検証のことを分けて改善します。手順や学びは、他者が使える形へ整理して共有します。",
    points: ["利用・確認結果をもとに改善", "手順・ナレッジの整理と共有"],
  },
];

export function WhatIDo() {
  return (
    <Section
      id="what-i-do"
      eyebrow="What I Do"
      title="業務を整理し、小さく試して改善する。"
      lead="現場理解を土台に、業務フローと判断基準を設計します。課題に合う手段を選び、必要な試作と検証につなげます。"
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
