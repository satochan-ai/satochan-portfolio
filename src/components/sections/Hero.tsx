import { site } from "@/content/site";

import { HeroBackground } from "./HeroBackground";

const highlights = [
  "営業・商談接点 1,500+",
  "AI活用ミニ講座 登壇",
  "Web・業務ツール 実運用",
];

export function Hero() {
  return (
    <section
      id="hero"
      className="hero-surface relative isolate overflow-hidden lg:min-h-[42rem]"
    >
      <HeroBackground />

      <div className="relative mx-auto w-full max-w-page px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
        <p className="text-eyebrow font-medium uppercase text-accent-on-dark">
          {site.tagline}
        </p>

        <h1 className="mt-6 max-w-[19ch] whitespace-pre-line text-[clamp(2.25rem,5vw,4.5rem)] font-bold leading-[1.14] tracking-[-0.02em] text-inverse-fg [word-break:auto-phrase]">
          {site.hero.headline}
        </h1>

        <p className="mt-8 max-w-prose text-base leading-loose text-inverse-fg/80 sm:text-lg lg:max-w-[calc(100%-20rem)] xl:max-w-prose">
          {site.hero.sub}
        </p>

        <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <a
            href="#works"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-medium text-[#08111f] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            業務改善の事例を見る
          </a>
          <a
            href="#about"
            className="inline-flex items-center justify-center rounded-full border border-inverse-fg/30 px-6 py-3.5 text-sm font-medium text-inverse-fg transition-colors hover:border-inverse-fg/60 hover:bg-inverse-fg/10"
          >
            経歴を見る
          </a>
        </div>

        <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-inverse-fg/15 pt-6 text-sm text-inverse-fg/75">
          {highlights.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span
                aria-hidden
                className="inline-block size-1.5 rounded-full bg-accent-on-dark"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
