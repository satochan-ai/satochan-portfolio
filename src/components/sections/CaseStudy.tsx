import { KnowledgeFlow } from "@/components/sections/KnowledgeFlow";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { caseStudies, type CaseStudy as CaseStudyType } from "@/content/caseStudies";

function Block({
  index,
  label,
  emphasis,
  children,
}: {
  index: number;
  label: string;
  emphasis?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={
        emphasis
          ? "rounded-card border border-line bg-surface p-6 sm:p-7"
          : undefined
      }
    >
      <h4 className="flex items-baseline gap-2 font-mono text-eyebrow font-medium uppercase text-accent">
        <span aria-hidden className="text-muted">
          {String(index).padStart(2, "0")}
        </span>
        {label}
      </h4>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="space-y-3">
      {items.map((text) => (
        <p key={text} className="text-sm leading-relaxed text-muted">
          {text}
        </p>
      ))}
    </div>
  );
}

function CaseStudyArticle({
  study,
  index,
  children,
}: {
  study: CaseStudyType;
  index: number;
  children?: React.ReactNode;
}) {
  return (
    <article
      id={study.id}
      aria-labelledby={`${study.id}-title`}
      className="scroll-mt-24 border-t border-line pt-10 first:border-t-0 first:pt-0"
    >
      <header className="max-w-prose">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          <span className="font-mono text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-medium text-accent">{study.category}</span>
          <span aria-hidden className="h-3 w-px bg-line" />
          <span className="text-muted">{study.statusLabel}</span>
        </div>
        <h3
          id={`${study.id}-title`}
          className="mt-3 text-h2 font-bold [text-wrap:balance]"
        >
          {study.title}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-muted">
          {study.lead}
        </p>
      </header>

      {children && <div className="mt-10">{children}</div>}

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-8 border-l-2 border-line pl-6 sm:pl-8">
          <Block index={1} label="Problem">
            <Paragraphs items={study.problem} />
          </Block>

          <Block index={2} label="Approach">
            <Paragraphs items={study.approach} />
          </Block>

          <Block index={3} label="Solution">
            <ul className="grid gap-x-6 gap-y-2.5 text-sm text-fg sm:grid-cols-2">
              {study.solution.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span
                    aria-hidden
                    className="mt-2 size-1 shrink-0 rounded-full bg-accent"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </Block>

          <Block index={4} label="Impact" emphasis>
            <Paragraphs items={study.impact.body} />
            {study.impact.metrics.length > 0 && (
              <dl className="mt-5 grid grid-cols-2 gap-6 border-t border-line pt-5 sm:grid-cols-3">
                {study.impact.metrics.map((metric) => (
                  <div key={metric.label}>
                    <dt className="text-xs text-muted">{metric.label}</dt>
                    <dd className="mt-1 text-h3 font-bold">{metric.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </Block>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-card border border-line bg-surface p-7">
            <h4 className="text-eyebrow font-medium uppercase text-muted">
              Stack
            </h4>
            <ul className="mt-4 flex flex-wrap gap-2">
              {study.stack.map((item) => (
                <li key={item}>
                  <Tag>{item}</Tag>
                </li>
              ))}
            </ul>

          </div>
        </aside>
      </div>
    </article>
  );
}

export function CaseStudy() {
  return (
    <Section
      id="case-study"
      eyebrow="Case Study"
      title="何を課題と捉え、どう設計し、実際にどう使われているか。"
      lead="実際に作って運用しているものと、情報・業務の設計思想。この2つが分かる事例を選んでいます。"
    >
      <div className="space-y-16">
        {caseStudies.map((study, index) => (
          <CaseStudyArticle key={study.id} study={study} index={index}>
            {study.id === "case-obsidian-ai" ? <KnowledgeFlow /> : null}
          </CaseStudyArticle>
        ))}
      </div>
    </Section>
  );
}
