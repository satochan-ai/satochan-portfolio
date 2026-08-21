import { knowledgeFlow } from "@/content/caseStudies";

/**
 * 紙 → テキスト → Obsidian → AI分析 → 比較 → 次回アクション → 再利用 の流れ。
 * 画像は使わず CSS / HTML のみで描画する。
 * モバイル・タブレットは縦のステップ、PC は横一列に切り替わる。
 */
export function KnowledgeFlow() {
  return (
    <figure className="rounded-card border border-line bg-bg p-6 sm:p-8">
      <figcaption className="text-eyebrow font-medium uppercase text-muted">
        記録が再利用されるまでの流れ
      </figcaption>

      {/* PC では gap を持たせず、各ステップ内の罫線をつなげて1本の線に見せる */}
      <ol className="mt-7 grid lg:grid-cols-7">
        {knowledgeFlow.map((step, index) => {
          const isLast = index === knowledgeFlow.length - 1;

          return (
            <li
              key={step.label}
              className="relative flex gap-4 pb-8 last:pb-0 lg:flex-col lg:gap-3 lg:pb-0 lg:pr-5 lg:last:pr-0"
            >
              {/* 縦の接続線（モバイル・タブレット） */}
              {!isLast && (
                <span
                  aria-hidden
                  className="absolute left-3.5 top-8 h-[calc(100%-2rem)] w-px bg-line lg:hidden"
                />
              )}

              {/* 番号と、PC 用の横の接続線 */}
              <div className="flex shrink-0 items-center lg:w-full">
                <span
                  aria-hidden
                  className="flex size-7 shrink-0 items-center justify-center rounded-full border border-line bg-bg font-mono text-xs text-muted"
                >
                  {index + 1}
                </span>
                {!isLast && (
                  <span
                    aria-hidden
                    className="hidden h-px flex-1 bg-line lg:block"
                  />
                )}
              </div>

              <div className="min-w-0 pt-1 lg:pt-0">
                <p className="text-sm font-bold leading-snug">{step.label}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">
                  {step.note}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
