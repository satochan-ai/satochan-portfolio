import { businessImpactMetrics, proofPoints } from "@/content/site";

export function Proof() {
  const footnotes = proofPoints.filter((point) => point.footnote);

  return (
    <section
      id="proof"
      aria-label="実績サマリー"
      className="border-y border-line bg-surface py-14 sm:py-16"
    >
      <div className="mx-auto w-full max-w-page px-5 sm:px-8">
        <dl className="grid grid-cols-1 gap-y-8 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-0">
          {proofPoints.map((point, index) => (
            <div key={point.label} className="min-w-0">
              <dt className="flex items-baseline gap-2 text-sm font-medium text-fg">
                <span aria-hidden className="font-mono text-xs text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {point.label}
              </dt>
              <dd className="mt-2 text-stat font-bold tracking-tight text-accent">
                {point.value}
                {point.unit && (
                  <span className="ml-0.5 align-super text-[0.45em] font-semibold text-muted">
                    {point.unit}
                  </span>
                )}
                {point.footnote && (
                  <a
                    href="#proof-note"
                    aria-label={`※${index + 1} の注記へ`}
                    className="ml-1 align-super font-sans text-[0.3em] font-medium text-muted hover:text-fg"
                  >
                    ※{index + 1}
                  </a>
                )}
              </dd>
              {point.note && (
                <dd className="mt-2 text-xs leading-relaxed text-muted">
                  {point.note}
                </dd>
              )}
            </div>
          ))}
        </dl>

        {footnotes.length > 0 && (
          <ul id="proof-note" className="mt-8 space-y-1 scroll-mt-24">
            {footnotes.map((point) => (
              <li key={point.label} className="text-xs leading-relaxed text-muted">
                ※{proofPoints.indexOf(point) + 1} {point.footnote}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-14 border-t border-line pt-12 sm:mt-16 sm:pt-14">
          <p className="text-eyebrow font-medium uppercase text-accent">
            Business Impact
          </p>
          <h2 id="business-impact-title" className="mt-3 text-h3 font-bold">
            営業活動だけでなく、
            <br />
            立ち上げと仕組み化まで。
          </h2>
          <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted sm:text-base">
            新規開拓の立ち上げから、打ち合わせ創出、若手教育、KPI管理まで、営業が継続して動く状態をつくってきました。
          </p>

          <dl className="mt-8 grid grid-cols-1 gap-y-8 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-0">
            {businessImpactMetrics.map((metric) => (
              <div key={metric.label} className="min-w-0">
                <dt className="text-sm font-medium text-fg">{metric.label}</dt>
                <dd className="mt-2 text-xl font-bold tracking-tight text-accent sm:text-2xl">
                  {metric.value}
                </dd>
                <dd className="mt-2 text-xs leading-relaxed text-muted">
                  {metric.description}
                </dd>
              </div>
            ))}
          </dl>

        </div>
      </div>
    </section>
  );
}
