import { site } from "@/content/site";

const highlights = [
  "SES営業 16年",
  "採用 10年",
  "営業・商談接点 1,500+",
  "AI活用ミニ講座 登壇",
  "Web・業務ツール 実運用",
];

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-bg">
      <div className="mx-auto w-full max-w-page px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
        <p className="text-eyebrow font-medium uppercase text-accent">
          Sales &middot; Recruiting &middot; AI &middot; Build
        </p>

        <h1 className="mt-6 max-w-[19ch] whitespace-pre-line text-display font-bold [word-break:auto-phrase]">
          {site.hero.headline}
        </h1>

        <p className="mt-8 max-w-prose text-base leading-loose text-muted sm:text-lg">
          {site.hero.sub}
        </p>

        <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <a
            href="#works"
            className="inline-flex items-center justify-center rounded-full bg-fg px-6 py-3.5 text-sm font-medium text-bg transition-opacity hover:opacity-85"
          >
            実績を見る
          </a>
          <a
            href="#about"
            className="inline-flex items-center justify-center rounded-full border border-line px-6 py-3.5 text-sm font-medium text-fg transition-colors hover:border-fg"
          >
            プロフィールを見る
          </a>
        </div>

        <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-6 text-sm text-muted">
          {highlights.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span
                aria-hidden
                className="inline-block size-1.5 rounded-full bg-accent"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
