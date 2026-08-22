import type { ReactNode } from "react";

type SectionTone = "default" | "surface" | "dark";

const toneClass: Record<SectionTone, string> = {
  default: "bg-bg text-fg",
  surface: "bg-surface text-fg",
  dark: "bg-fg text-inverse-fg",
};

type SectionProps = {
  id: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  tone?: SectionTone;
  eyebrowVariant?: "default" | "code";
  children: ReactNode;
};

export function Section({
  id,
  eyebrow,
  title,
  lead,
  tone = "default",
  eyebrowVariant = "default",
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={title ? `${id}-title` : undefined}
      className={`${toneClass[tone]} border-t border-line/70 py-20 sm:py-28`}
    >
      <div className="mx-auto w-full max-w-page px-5 sm:px-8">
        {(eyebrow || title || lead) && (
          <header className="max-w-prose">
            {eyebrow && (
              <p
                className={`text-eyebrow font-medium uppercase ${
                  eyebrowVariant === "code" ? "font-mono" : ""
                } ${
                  tone === "dark" ? "text-accent-on-dark" : "text-accent"
                }`}
              >
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                id={`${id}-title`}
                className="mt-4 text-h2 font-bold [text-wrap:balance]"
              >
                {title}
              </h2>
            )}
            {lead && (
              <p
                className={`mt-5 text-base leading-relaxed sm:text-lg ${
                  tone === "dark" ? "text-inverse-fg/70" : "text-muted"
                }`}
              >
                {lead}
              </p>
            )}
          </header>
        )}
        <div className={eyebrow || title || lead ? "mt-12 sm:mt-16" : ""}>
          {children}
        </div>
      </div>
    </section>
  );
}
