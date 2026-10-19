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

/**
 * 件数は業務スキル台帳（2026/10/20現在）の登録数。合計は内訳の和から求める。
 * 登録数であり、独自制作数・日常利用数ではない。個々のSkill名は一覧化しない。
 */
const skillBreakdown: SkillStat[] = [
  { value: "45", label: "業務・制作支援系" },
  { value: "12", label: "三国志武将型（助言）" },
  { value: "1", label: "外部導入" },
];

const skillTotal = skillBreakdown.reduce((sum, item) => sum + Number(item.value), 0);

const skillStats: SkillStat[] = [
  { value: String(skillTotal), label: "Claude Code Skills" },
  { value: "12", label: "Categories" },
];

/** 代表例として一部のみ表示。カテゴリ全12件は列挙しない。名称は台帳と一致させる。 */
const skillCategories = [
  "提案書・資料作成",
  "BP(協力会社)営業",
  "案件・人材マッチング",
  "面談・採用スクリーニング",
  "日報・報告・KPI分析",
];

/** 実在するSkillのみ。営業・採用・分析の幅が分かる範囲に絞り、一覧化はしない。 */
const skillExamples = [
  "BP営業",
  "採用スクリーニング",
  "KPI分析",
];

export function AiWorkflow() {
  return (
    <Section
      id="ai-workflow"
      eyebrow="// AI Workflow"
      eyebrowVariant="code"
      title="AIを使うこと自体は、目的にしない。"
      lead="業務改善の中で、情報整理・比較・下書き・傾向整理・試作支援にAIを使います。課題設定、判断、確認、合意形成と最終責任は人が担い、工程ごとに役割を切り分けています。"
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
                <span className="font-mono text-sm text-accent-on-dark/85">
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

      <div className="mt-16 border-t border-inverse-fg/15 pt-10 sm:mt-20 sm:pt-12">
        <p className="font-mono text-eyebrow font-medium uppercase text-accent-on-dark">
          {"// Claude Code Skills"}
        </p>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-16">
          <div className="max-w-prose">
            <h3 className="text-h3 font-bold text-inverse-fg">
              実務の判断基準と手順を、再利用できる形へ。
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-inverse-fg/70 sm:text-base">
              SES営業・採用の実務で繰り返す判断や文書作成を、Claude CodeのSkillsとして整理しています。業務・制作支援に加え、意思決定を補助する助言型のSkillsも管理しています。
            </p>

            <div className="mt-5">
              <p className="font-mono text-xs uppercase tracking-wide text-inverse-fg/50">
                Skill Examples
              </p>
              <ul className="mt-2.5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-inverse-fg/80">
                {skillExamples.map((example) => (
                  <li key={example} className="flex gap-2">
                    <span
                      aria-hidden
                      className="mt-2 size-1 shrink-0 rounded-full bg-inverse-fg/30"
                    />
                    {example}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-inverse-fg/60">
              ツールの利用そのものを目的とせず、業務プロセスや判断基準を再利用できる形で残すことを重視しています。
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
            <p className="mt-4 text-xs leading-relaxed text-inverse-fg/50">
              登録数には外部導入1件と制作元未確認1件を含みます。すべての独自制作・日常利用を示す数値ではありません。
            </p>
          </div>

          <div className="flex flex-col gap-6 lg:gap-8">
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
                  <dd className="mt-1 text-xl font-bold text-accent-on-dark">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>

            <dl className="border-t border-inverse-fg/15 pt-5">
              {skillBreakdown.map((item) => (
                <div
                  key={item.label}
                  className="flex items-baseline justify-between gap-6 py-1 text-sm"
                >
                  <dt className="text-inverse-fg/60">{item.label}</dt>
                  <dd className="font-mono font-medium text-inverse-fg/85">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </Section>
  );
}
