import { Section } from "@/components/ui/Section";

type Step = {
  key: string;
  label: string;
  jp: string;
  body: string;
};

const steps: Step[] = [
  {
    key: "research",
    label: "Research",
    jp: "情報収集・現状把握",
    body: "前提を揃えるために調べる。ここを短くして、判断に使う時間を残す。",
  },
  {
    key: "think",
    label: "Think",
    jp: "課題整理・仮説・質問設計",
    body: "論点を出し切り、考えの抜けを潰す。広げるのはAI、決めるのは自分。",
  },
  {
    key: "build",
    label: "Build",
    jp: "資料・仕組み・ツールへ形にする",
    body: "たたき台を早く出して、検討そのものの回数を増やす。",
  },
  {
    key: "verify",
    label: "Verify",
    jp: "事実確認・テスト・レビュー",
    body: "出てきたものを点検する。事実か、整合しているか、抜けはないか。",
  },
  {
    key: "operate",
    label: "Operate",
    jp: "実際の業務で使う",
    body: "作って終わりにせず、運用に乗せる。使って初めて不便が分かる。",
  },
  {
    key: "improve",
    label: "Improve",
    jp: "記録と結果を振り返り改善する",
    body: "分かったことを仕組み側へ戻す。次から同じ手間をかけない。",
  },
];

export function AiWorkflow() {
  return (
    <Section
      id="ai-workflow"
      eyebrow="AI Workflow"
      title="AIを使うこと自体は、目的にしない。"
      lead="ツールを並べるのではなく、業務の工程のどこに置くかを決めています。各工程の質と速度を上げるために配置し、判断と責任は人が持つ。この前提を崩さない使い方をしています。"
      tone="dark"
    >
      <ol className="grid gap-px overflow-hidden rounded-card bg-inverse-fg/15 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.key} className="bg-fg p-7">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-sm text-inverse-fg/65">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-h3 font-bold text-inverse-fg">
                {step.label}
              </h3>
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
    </Section>
  );
}
