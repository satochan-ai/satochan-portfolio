import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { qualityCheckCase } from "@/content/site";

import { AiRoleDiagram } from "./AiRoleDiagram";

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
    body: "AIに論点を出させ、抜けている観点を確認する。",
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
    body: "自分の業務で実際に使い、不便な点を記録する。",
    role: "Human decision",
  },
  {
    key: "improve",
    label: "Improve",
    jp: "記録と結果を振り返り改善する",
    body: "記録した不便をもとに、手順やツールを直す。",
    role: "Human decision",
  },
];

type SkillStat = {
  value: string;
  label: string;
};

/**
 * 件数は業務スキル台帳（2026/11/17現在）の登録数。合計は内訳の和から求める。
 * 登録数であり、独自制作数・日常利用数ではない。個々のSkill名は一覧化しない。
 */
const skillBreakdown: SkillStat[] = [
  { value: "49", label: "業務・制作支援系" },
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
      lead="情報整理や資料の下書きから、業務ツールの設計・実装・テスト・レビューまで、作業内容に応じて複数のAIを使い分けています。課題設定と品質基準の決定、出力の確認、合意形成、公開の判断と最終責任は人が担います。"
      leadId="philosophy"
      tone="dark"
    >
      <AiRoleDiagram />

      <div className="mt-12 border-t border-inverse-fg/15 pt-8 sm:mt-16 sm:pt-10">
        <p className="font-mono text-eyebrow font-medium uppercase text-gold">
          {"// How I Work"}
        </p>
        <h3 className="mt-2 text-h3 font-bold text-inverse-fg">仕事の進め方</h3>
      </div>

      <ol className="mt-6 grid gap-px overflow-hidden rounded-card bg-inverse-fg/15 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
          <li
            key={step.key}
            className="workflow-step bg-dark p-7"
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
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-gold">
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

      <aside
        aria-labelledby="quality-check-title"
        className="mt-8 rounded-card border border-gold/40 p-5 sm:p-7"
      >
        <p className="font-mono text-eyebrow font-medium uppercase text-gold">
          {"// Quality Check｜品質管理の実践例"}
        </p>
        <h3
          id="quality-check-title"
          className="mt-3 text-h3 font-bold text-inverse-fg [word-break:auto-phrase]"
        >
          {qualityCheckCase.title}
        </h3>
        <p className="mt-3 max-w-prose text-sm leading-relaxed text-inverse-fg/75 sm:text-base">
          {qualityCheckCase.body}
        </p>
        <dl className="mt-4 grid gap-x-8 gap-y-1 text-sm sm:grid-cols-3">
          {qualityCheckCase.roles.map((item) => (
            <div key={item.actor} className="flex flex-wrap gap-x-2 sm:block">
              <dt className="font-medium text-inverse-fg/90">{item.actor}</dt>
              <dd className="text-inverse-fg/65">{item.role}</dd>
            </div>
          ))}
        </dl>
        <Link
          href={qualityCheckCase.link.href}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-on-dark hover:underline"
        >
          {qualityCheckCase.link.label} <span aria-hidden>&rarr;</span>
        </Link>
      </aside>

      <div className="mt-16 border-t border-inverse-fg/15 pt-10 sm:mt-20 sm:pt-12">
        <p className="font-mono text-eyebrow font-medium uppercase text-gold">
          {"// Claude Code Skills"}
        </p>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-16">
          <div className="max-w-prose">
            <h3 className="text-h3 font-bold text-inverse-fg">
              実務の判断基準と手順を、再利用できる形へ。
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-inverse-fg/70 sm:text-base">
              Skillsは、AIに作業手順や判断基準を持たせる仕組みです。SES営業・採用の判断や文書作成をClaude CodeのSkillsとして整理し、業務・制作支援に加え、意思決定を補助する助言型も管理しています。
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
              2026年11月17日時点の登録数です。外部導入1件と制作元未確認1件を含みます。すべての独自制作・日常利用を示す数値ではありません。
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
