import Link from "next/link";

import {
  aiWorkflowLayers,
  aiWorkflowNotes,
  aiWorkflowSupports,
  aiWorkflowTools,
  type AiWorkflowActor,
} from "@/content/site";

/** 役割は色だけで区別しない。ラベル文字と枠線の色の両方で示す。 */
const actorStyle: Record<AiWorkflowActor, { label: string; badge: string; card: string }> = {
  human: {
    label: "人",
    badge: "border-gold/60 text-gold",
    card: "border-gold/45",
  },
  ai: {
    label: "AI",
    badge: "border-accent-on-dark/45 text-accent-on-dark",
    card: "border-accent-on-dark/25",
  },
  both: {
    label: "人 + AI",
    badge: "border-inverse-fg/40 text-inverse-fg/90",
    card: "border-inverse-fg/30",
  },
};

/**
 * Human-led AI Workflow の概念図。HTML / CSS のみで描画する。
 * - 1280px 未満: 層を縦に並べる（640px 以上は見出しと内容を左右に分ける）
 * - 1280px 以上: 5層を横一列に並べ、戻り工程を破線で示す
 * 矢印・破線は装飾（aria-hidden）。戻り先は各層の文章でも説明する。
 */
export function AiRoleDiagram() {
  return (
    <figure className="sm:rounded-card sm:border sm:border-inverse-fg/15 sm:p-8">
      <figcaption>
        <h3 className="text-h3 font-bold text-inverse-fg">Human-led AI Workflow</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-inverse-fg/70">
          人が判断し、複数のAIを使い分ける仕事の進め方
        </p>
      </figcaption>

      <ol className="mt-6 grid xl:grid-cols-5 xl:gap-7">
        {aiWorkflowLayers.map((layer, index) => {
          const style = actorStyle[layer.actor];
          const isLast = index === aiWorkflowLayers.length - 1;

          return (
            <li key={layer.no} className="relative">
              <div
                className={`rounded-card border ${style.card} p-4 sm:grid sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-6 sm:p-5 xl:block xl:h-full`}
              >
                <div>
                  {/* スマホでは番号・役割・英語名を1行に並べ、640px以上で英語名を改行する */}
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <span className="font-mono text-xs text-accent-on-dark/85">{layer.no}</span>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[0.6875rem] font-medium leading-none ${style.badge}`}
                    >
                      {style.label}
                    </span>
                    <p className="text-base font-bold leading-snug text-inverse-fg sm:mt-1 sm:basis-full">
                      {layer.label}
                    </p>
                  </div>
                  <p className="mt-0.5 text-sm text-inverse-fg/80">{layer.jp}</p>
                </div>

                <div className="mt-2.5 sm:mt-0 xl:mt-4">
                  <ul className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-inverse-fg/70 xl:flex-col">
                    {layer.items.map((item) => (
                      <li key={item} className="flex gap-1.5">
                        <span
                          aria-hidden
                          className="mt-2 size-1 shrink-0 rounded-full bg-inverse-fg/35"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {layer.tools && (
                    <p className="mt-3 flex flex-wrap items-center gap-1.5">
                      <span className="text-xs text-inverse-fg/60">主なAI：</span>
                      {layer.tools.map((tool) => (
                        <span
                          key={tool}
                          className="whitespace-nowrap rounded-full border border-inverse-fg/20 px-2 py-0.5 font-mono text-xs text-inverse-fg/85"
                        >
                          {tool}
                        </span>
                      ))}
                    </p>
                  )}

                  {layer.returnNote && (
                    <p className="mt-3 flex gap-1.5 text-xs leading-relaxed text-inverse-fg/75">
                      <span aria-hidden className="text-gold">
                        ↩
                      </span>
                      {layer.returnNote}
                    </p>
                  )}
                </div>
              </div>

              {!isLast && (
                <span
                  aria-hidden
                  className="flex h-5 items-center justify-center text-sm text-inverse-fg/40 xl:absolute xl:-right-7 xl:top-1/2 xl:h-auto xl:w-7 xl:-translate-y-1/2"
                >
                  <span className="xl:hidden">↓</span>
                  <span className="hidden xl:inline">→</span>
                </span>
              )}
            </li>
          );
        })}
      </ol>

      {/* 1280px以上のみ: 戻り工程の破線。中心位置は5列・gap 1.75rem から算出する */}
      <div aria-hidden className="relative mt-3 hidden h-14 xl:block">
        <div className="absolute inset-x-[calc((100%-7rem)*0.3+1.75rem)] top-0 h-5 rounded-b-md border-x border-b border-dashed border-gold/45">
          <span className="absolute -left-[0.3125rem] -top-2 text-[0.5rem] text-gold">▲</span>
          <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-dark px-2 text-xs text-inverse-fg/65">
            問題があれば必要な工程へ戻る
          </span>
        </div>
        <div className="absolute inset-x-[calc((100%-7rem)*0.1)] top-0 h-11 rounded-b-md border-x border-b border-dashed border-gold/45">
          <span className="absolute -left-[0.3125rem] -top-2 text-[0.5rem] text-gold">▲</span>
          <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-dark px-2 text-xs text-inverse-fg/65">
            実運用の課題は課題設定へ戻る
          </span>
        </div>
      </div>

      <div className="mt-6 grid gap-5 border-t border-inverse-fg/15 pt-5 sm:mt-8 sm:pt-6 md:grid-cols-2 md:gap-10">
        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-inverse-fg/60">主なAIツール</p>
          <dl className="mt-3 space-y-2.5">
            {aiWorkflowTools.map((tool) => (
              <div key={tool.name} className="text-sm leading-relaxed">
                <dt className="font-medium text-inverse-fg/90 max-sm:inline">{tool.name}</dt>
                <dd className="text-inverse-fg/65 max-sm:inline max-sm:before:content-['：']">{tool.role}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-inverse-fg/60">
            補助ツール（AIモデルではありません）
          </p>
          <dl className="mt-3 space-y-2.5">
            {aiWorkflowSupports.map((support) => (
              <div key={support.name} className="text-sm leading-relaxed">
                <dt className="max-sm:inline">
                  <Link
                    href={support.href}
                    className="font-medium text-inverse-fg/90 underline decoration-inverse-fg/30 underline-offset-4 hover:decoration-gold"
                  >
                    {support.name}
                  </Link>
                </dt>
                <dd className="text-inverse-fg/65 max-sm:inline max-sm:before:content-['：']">{support.role}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <ul className="mt-6 space-y-1 text-xs leading-relaxed text-inverse-fg/60">
        {aiWorkflowNotes.map((note) => (
          <li key={note} className="flex gap-1">
            <span aria-hidden>※</span>
            {note}
          </li>
        ))}
      </ul>
    </figure>
  );
}
