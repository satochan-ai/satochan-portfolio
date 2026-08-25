import Link from "next/link";

import { consultationProblems } from "@/content/services";

export function Consultation() {
  return (
    <section
      id="consultation"
      aria-labelledby="consultation-title"
      className="border-t border-line/70 bg-surface py-12 sm:py-12"
    >
      <div className="mx-auto w-full max-w-page px-5 sm:px-8">
        <div className="max-w-prose">
          <p className="text-eyebrow font-medium uppercase text-accent">Consultation</p>
          <h2 id="consultation-title" className="mt-4 text-h2 font-bold [text-wrap:balance]">
            こんな課題から、
            <br />
            ご相談いただけます。
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            課題がまだ整理できていない段階でも構いません。現状を伺いながら、どこから手を付けるかを整理します。
          </p>
        </div>

        <ol className="mt-8 grid border-t border-line sm:grid-cols-2">
          {consultationProblems.map((problem) => (
            <li key={problem.no} className="flex gap-4 border-b border-line py-4 sm:pr-8 [&:nth-child(odd)]:sm:border-r [&:nth-child(odd)]:sm:pr-8 [&:nth-child(even)]:sm:pl-8 [&:nth-child(n+3)]:sm:border-b-0">
              <span className="pt-0.5 font-mono text-sm text-accent">{problem.no}</span>
              <p className="max-w-[28ch] text-sm font-medium leading-relaxed text-fg sm:text-base">
                {problem.text}
              </p>
            </li>
          ))}
        </ol>

        <Link
          href="/services"
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
        >
          相談内容を見る <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
