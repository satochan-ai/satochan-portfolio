export function Philosophy() {
  return (
    <section
      id="philosophy"
      aria-labelledby="philosophy-title"
      className="border-t border-line/70 bg-bg py-10 sm:py-12"
    >
      <div className="mx-auto w-full max-w-page px-5 sm:px-8">
        <p className="font-mono text-eyebrow font-medium uppercase text-accent">
          {"// Philosophy"}
        </p>

        <div className="mt-4 h-px w-12 bg-line" aria-hidden />

        <h2
          id="philosophy-title"
          className="mt-5 max-w-2xl text-[clamp(1.75rem,3.6vw,2.625rem)] font-bold leading-tight [text-wrap:balance]"
        >
          広げるのはAI、決めるのは自分。
        </h2>

        <p className="mt-4 max-w-prose text-base leading-relaxed text-muted">
          AIは、情報を広げ、整理し、比較するために使います。判断と責任は人が持ち、実務で改善します。
        </p>
      </div>
    </section>
  );
}
