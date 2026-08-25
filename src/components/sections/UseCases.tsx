import { useCaseCategories } from "@/content/services";

/**
 * /services の Use Case（4カテゴリ×3件）から、カテゴリごとの代表1件だけを見せる。
 * Home用のcopyを別途持たず、services.ts を単一のSource of Truthとして参照する。
 * Consultationと同じ軽量なpaddingにし、Selected Worksより視覚強度を下げる。
 */
export function UseCases() {
  const representativeCases = useCaseCategories.filter(
    (category) => category.homeCaseIndex !== undefined,
  );

  return (
    <section
      id="use-cases"
      aria-labelledby="use-cases-title"
      className="border-t border-line/70 bg-bg py-9 sm:py-9"
    >
      <div className="mx-auto w-full max-w-page px-5 sm:px-8">
        <div className="max-w-prose">
          <p className="font-mono text-eyebrow font-medium uppercase text-accent">
            {"// Use Case"}
          </p>
          <h2
            id="use-cases-title"
            className="mt-3 text-h2 font-bold [text-wrap:balance]"
          >
            こんな業務から、改善できます。
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
            ツールありきではなく、手間や属人化が起きている業務から整理します。ここでは代表的な4つを紹介します。
          </p>
        </div>

        <ul className="mt-4 grid grid-cols-2 gap-x-5 gap-y-5 border-t border-line pt-4 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-6">
          {representativeCases.map((category) => (
            <li key={category.no}>
              <span className="font-mono text-xs text-muted">{category.no}</span>
              <p className="mt-1 text-xs font-medium text-accent">
                {category.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-fg [word-break:auto-phrase]">
                {category.cases[category.homeCaseIndex as number]}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
