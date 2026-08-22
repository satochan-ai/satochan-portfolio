import { proofPoints } from "@/content/site";

export function Proof() {
  const footnotes = proofPoints.filter((point) => point.footnote);

  return (
    <section
      id="proof"
      aria-label="実績サマリー"
      className="border-y border-line bg-surface py-14 sm:py-16"
    >
      <div className="mx-auto w-full max-w-page px-5 sm:px-8">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {proofPoints.map((point, index) => (
            <div key={point.label} className="min-w-0">
              <dt className="text-sm font-medium text-fg">{point.label}</dt>
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
          <ul id="proof-note" className="mt-10 space-y-1 scroll-mt-24">
            {footnotes.map((point) => (
              <li key={point.label} className="text-xs leading-relaxed text-muted">
                ※{proofPoints.indexOf(point) + 1} {point.footnote}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
