import { Section } from "@/components/ui/Section";

type Step = {
  key: string;
  label: string;
  jp: string;
  body: string;
  role: "AI assist" | "Human decision";
};

const steps: Step[] = [
  {
    key: "research",
    label: "Research",
    jp: "情報収集・現状把握",
    body: "前提を揃えるために調べる。ここを短くして、判断に使う時間を残す。",
    role: "AI assist",
  },
  {
    key: "think",
    label: "Think",
    jp: "課題整理・仮説・質問設計",
    body: "論点を出し切り、考えの抜けを潰す。広げるのはAI、決めるのは自分。",
    role: "Human decision",
  },
  {
    key: "build",
    label: "Build",
    jp: "資料・仕組み・ツールへ形にする",
    body: "たたき台を早く出して、検討そのものの回数を増やす。",
    role: "AI assist",
  },
  {
    key: "verify",
    label: "Verify",
    jp: "事実確認・テスト・レビュー",
    body: "出てきたものを点検する。事実か、整合しているか、抜けはないか。",
    role: "Human decision",
  },
  {
    key: "operate",
    label: "Operate",
    jp: "実際の業務で使う",
    body: "作って終わりにせず、運用に乗せる。使って初めて不便が分かる。",
    role: "Human decision",
  },
  {
    key: "improve",
    label: "Improve",
    jp: "記録と結果を振り返り改善する",
    body: "分かったことを仕組み側へ戻す。次から同じ手間をかけない。",
    role: "Human decision",
  },
];

type SkillStat = {
  value: string;
  label: string;
};

/** 事実ベースの規模のみ。個々のSkill名は一覧化しない。 */
const skillStats: SkillStat[] = [
  { value: "40", label: "Business Skills" },
  { value: "10", label: "Categories" },
];

/** 代表例として一部のみ表示。カテゴリ全10件は列挙しない。 */
const skillCategories = ["Sales", "Recruiting", "Matching", "KPI Analysis", "Knowledge"];

export function AiWorkflow() {
  return (
    <Section
      id="ai-workflow"
      eyebrow="// AI Workflow"
      eyebrowVariant="code"
      title="AIを使うこと自体は、目的にしない。"
      lead="ツールを並べるのではなく、業務の工程のどこに置くかを決めています。各工程の質と速度を上げるために配置し、判断と責任は人が持つ。この前提を崩さない使い方をしています。"
      tone="dark"
    >
      <ol className="grid gap-px overflow-hidden rounded-card bg-inverse-fg/15 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
          <li
            key={step.key}
            className="workflow-step bg-fg p-7"
            style={{ "--workflow-index": index } as React.CSSProperties}
          >
            <div className="flex items-baseline justify-between gap-3">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-sm text-inverse-fg/65">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-h3 font-bold text-inverse-fg">
                  {step.label}
                </h3>
              </div>
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-accent-on-dark/80">
                {step.role}
              </span>
            </div>
            <p className="mt-2 text-sm font-medium text-inverse-fg/85">
              {step.jp}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-inverse-fg/60">
              {step.body}
            </p>
          </li>
        ))}
      </ol>

      <p className="mt-8 max-w-prose text-sm leading-relaxed text-inverse-fg/60">
        AIはすべてを任せる相手ではなく、それぞれの工程を加速させる実務パートナーとして使っています。
      </p>

      <div className="mt-16 border-t border-inverse-fg/15 pt-10 sm:mt-20 sm:pt-12">
        <p className="font-mono text-eyebrow font-medium uppercase text-accent-on-dark">
          {"// Business Skills"}
        </p>

        <p className="mt-3 font-mono text-xs tracking-wide text-inverse-fg/45">
          skills.registry · 40 entries · 10 categories
        </p>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-16">
          <div className="max-w-prose">
            <h3 className="text-h3 font-bold text-inverse-fg">
              現場の知識を、再利用できるSkillへ。
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-inverse-fg/70 sm:text-base">
              SES営業・採用の実務で繰り返し発生する業務を、AIが再利用できる形に整理しています。提案書作成、BP営業、案件・人材マッチング、採用スクリーニング、KPI分析など、現場で培った判断基準や手順を業務Skillとして体系化しています。
            </p>
            <p className="mt-4 text-sm leading-relaxed text-inverse-fg/60">
              特定のAIサービスに依存するのではなく、業務プロセスや判断基準そのものを再利用できる形で残すことを重視しています。Claude Code Skillsに加え、業務用途に合わせたGPTs・Gemの設計・作成にも取り組んでいます。
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {skillCategories.map((category, index) => (
                <li key={category}>
                  <span
                    className="skill-tag rounded-full border border-inverse-fg/20 px-2.5 py-1 text-xs font-medium text-inverse-fg/70"
                    style={{ "--skill-index": index } as React.CSSProperties}
                  >
                    {category}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <dl className="flex gap-10 sm:gap-12 lg:flex-col lg:gap-6">
            {skillStats.map((stat, index) => (
              <div
                key={stat.label}
                className="skill-stat"
                style={{ "--stat-index": index } as React.CSSProperties}
              >
                <dt className="text-sm font-medium text-inverse-fg/70">
                  {stat.label}
                </dt>
                <dd className="mt-1 text-stat font-bold text-inverse-fg">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
