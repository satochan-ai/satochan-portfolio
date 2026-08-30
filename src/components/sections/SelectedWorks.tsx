import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Tag } from "@/components/ui/Tag";
import {
  supportingProjects,
  works,
  type MiniCase as MiniCaseData,
  type Work,
} from "@/content/works";

/** PROBLEM → APPROACH → CHANGED STATE の要約。compact指定でMore Projects向けに視覚強度を下げる。 */
function MiniCase({
  data,
  compact,
}: {
  data: MiniCaseData;
  compact?: boolean;
}) {
  const items = [
    { label: "PROBLEM", text: data.problem },
    { label: "APPROACH", text: data.approach },
    { label: "CHANGED STATE", text: data.changedState },
  ];

  return (
    <dl
      className={
        compact
          ? "mt-2.5 space-y-1.5 border-t border-line pt-2.5"
          : "mt-3 space-y-2 border-t border-line pt-3"
      }
    >
      {items.map((item) => (
        <div key={item.label}>
          <dt
            className={`font-mono text-[0.6875rem] uppercase tracking-wide ${
              compact ? "text-muted" : "text-accent"
            }`}
          >
            {item.label}
          </dt>
          <dd
            className={`mt-1 leading-relaxed text-fg [word-break:auto-phrase] ${
              compact ? "text-xs" : "text-sm"
            }`}
          >
            {item.text}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function WorkThumb({ work }: { work: Work }) {
  if (work.image) {
    return (
      <div className="relative aspect-16/10 w-full overflow-hidden border-b border-line bg-surface">
        <Image
          src={work.image}
          alt={work.imageAlt ?? work.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="work-card-image object-cover"
        />
      </div>
    );
  }

  // 画像未設定のカードは、テキストを重複させない静かなカバーを表示する
  // （実物のスクリーンショットが用意でき次第、image を設定するだけで差し替わる）
  return (
    <div
      aria-hidden
      className="flex aspect-16/10 w-full flex-col justify-end border-b border-line bg-surface p-6"
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, transparent 0 11px, var(--color-line) 11px 12px)",
      }}
    >
      <span className="block h-1 w-10 bg-accent" />
    </div>
  );
}

/** Secondary Works（Featured以外）は一覧性を優先し、余白と本文量をやや抑えて表示する。 */
function WorkCard({ work }: { work: Work }) {
  const cardStack = work.cardStack ?? work.stack.slice(0, 4);

  return (
    <li
      id={work.slug === "recruitment-insight" ? "recruitment-insight" : undefined}
      className="work-card flex h-full flex-col overflow-hidden rounded-card border border-line bg-bg transition-[border-color,box-shadow] duration-200 hover:border-fg/40 hover:shadow-[0_6px_16px_rgb(14_16_19/0.06)]"
    >
      <WorkThumb work={work} />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-medium text-accent">{work.category}</p>
        <div className="mt-2">
          <StatusBadge kind={work.statusKind} label={work.statusLabel} />
        </div>

        <h3 className="mt-3 text-h3 font-bold">{work.title}</h3>

        <p className="mt-2.5 text-sm leading-relaxed text-muted">
          {work.summary}
        </p>

        {work.usedFor && (
          <dl className="mt-4 border-t border-line pt-3.5 text-sm">
            <dt className="text-xs font-medium uppercase tracking-wide text-muted">
              Used for
            </dt>
            <dd className="mt-1 leading-relaxed text-fg">{work.usedFor}</dd>
          </dl>
        )}

        {work.highlights.length > 0 && (
          <ul className="mt-3.5 space-y-1.5 text-sm text-fg">
            {work.highlights.map((item) => (
              <li key={item} className="flex gap-2.5">
                <span
                  aria-hidden
                  className="mt-2 size-1 shrink-0 rounded-full bg-line"
                />
                <span className="text-muted">{item}</span>
              </li>
            ))}
          </ul>
        )}

        {work.miniCase && <MiniCase data={work.miniCase} compact />}

        <div className="mt-auto pt-4">
          {cardStack.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {cardStack.map((item) => (
                <li key={item}>
                  <Tag>{item}</Tag>
                </li>
              ))}
            </ul>
          )}

          {(work.href || work.caseStudyHref) && (
            <div className="mt-3.5 flex flex-wrap items-center gap-x-5 gap-y-2">
              {work.href && (
                <a
                  href={work.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                >
                  {work.hrefLabel ?? "サイトを見る"}
                  <span className="sr-only">（{work.title}・別タブで開く）</span>
                  <span aria-hidden className="work-card-arrow">&#8599;</span>
                </a>
              )}
              {work.caseStudyHref && (
                <a
                  href={work.caseStudyHref}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                >
                  Case Study を見る
                  <span className="sr-only">（{work.title}）</span>
                  <span aria-hidden className="work-card-arrow">&rarr;</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

/**
 * Featured Work（代表作）。Featuredラベルで差を出しつつ、他のWorkと同じグリッドの1枠に置く。
 */
function FeaturedWorkCard({ work }: { work: Work }) {
  return (
    <li>
      <article className="work-card flex h-full flex-col overflow-hidden rounded-card border border-line bg-bg transition-[border-color,box-shadow] duration-200 hover:border-fg/40 hover:shadow-[0_6px_16px_rgb(14_16_19/0.06)]">
        <div className="relative aspect-16/10 w-full overflow-hidden border-b border-line bg-surface">
          {work.image ? (
            <Image
              src={work.image}
              alt={work.imageAlt ?? work.title}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="work-card-image object-cover"
            />
          ) : (
            <div
              aria-hidden
              className="flex h-full w-full flex-col justify-end p-6"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(135deg, transparent 0 11px, var(--color-line) 11px 12px)",
              }}
            >
              <span className="block h-1 w-10 bg-accent" />
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-7 lg:p-10">
          <span className="inline-flex w-fit items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-accent">
            <span aria-hidden className="h-1 w-1 rounded-full bg-accent" />
            {"01 · Featured Work"}
          </span>

          <p className="mt-3 text-xs font-medium text-accent">
            {work.category}
          </p>
          <div className="mt-2">
            <StatusBadge kind={work.statusKind} label={work.statusLabel} />
          </div>

          <h3 className="mt-3 text-h2 font-bold lg:mt-4">{work.title}</h3>

          <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted lg:mt-4 lg:text-base">
            {work.summary}
          </p>

          {work.usedFor && (
            <dl className="mt-5 border-t border-line pt-4 text-sm lg:mt-6 lg:pt-5">
              <dt className="text-xs font-medium uppercase tracking-wide text-muted">
                Used for
              </dt>
              <dd className="mt-1 leading-relaxed text-fg">{work.usedFor}</dd>
            </dl>
          )}

          {work.highlights.length > 0 && (
            <ul className="mt-4 space-y-1.5 text-sm text-fg lg:mt-5">
              {work.highlights.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span
                    aria-hidden
                    className="mt-2 size-1 shrink-0 rounded-full bg-line"
                  />
                  <span className="text-muted">{item}</span>
                </li>
              ))}
            </ul>
          )}

          {work.miniCase && <MiniCase data={work.miniCase} />}

          <div className="mt-auto pt-6 lg:pt-7">
            {work.stack.length > 0 && (
              <ul className="flex flex-wrap gap-2">
                {work.stack.map((item) => (
                  <li key={item}>
                    <Tag>{item}</Tag>
                  </li>
                ))}
              </ul>
            )}

            {(work.href || work.caseStudyHref) && (
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                {work.href && (
                  <a
                    href={work.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                  >
                    サイトを見る
                    <span className="sr-only">
                      （{work.title}・別タブで開く）
                    </span>
                    <span aria-hidden className="work-card-arrow">
                      &#8599;
                    </span>
                  </a>
                )}
                {work.caseStudyHref && (
                  <a
                    href={work.caseStudyHref}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                  >
                    Case Study を見る
                    <span className="sr-only">（{work.title}）</span>
                    <span aria-hidden className="work-card-arrow">
                      &rarr;
                    </span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </article>
    </li>
  );
}

/**
 * Selected Works の従属コンテンツ。画像やカードを使わず、行として静かに並べることで
 * Featured / Secondary Works の主役性を崩さない。
 */
function MoreProjects() {
  return (
    <div className="mt-14 border-t border-line pt-10 sm:mt-16">
      <h3 className="font-mono text-eyebrow font-medium uppercase text-accent">
        {"// More Projects"}
      </h3>
      <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted [word-break:auto-phrase]">
        代表的な制作物以外にも、営業・採用・業務運用の課題をもとに、小さなツールを設計・試作しています。
      </p>

      <ul className="mt-6 border-t border-line">
        {supportingProjects.map((project, index) => (
          <li
            key={project.slug}
            className="scroll-mt-24 border-b border-line py-5"
          >
            <div className="grid gap-x-6 gap-y-2 lg:grid-cols-[2rem_10.5rem_1fr_auto] lg:items-baseline lg:gap-y-0">
              <span aria-hidden className="font-mono text-xs text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div>
                <h4 className="text-sm font-semibold text-fg">{project.title}</h4>
                <p className="mt-1 text-xs font-medium text-accent">
                  {project.category}
                </p>
              </div>

              <p className="text-sm leading-relaxed text-muted">
                {project.description}
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 lg:justify-end">
                <span className="inline-flex items-center rounded-full border border-line bg-surface px-2.5 py-0.5 font-mono text-[0.6875rem] text-muted">
                  {project.statusLabel}
                </span>

                {project.demoHref && (
                  <a
                    href={project.demoHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:underline"
                  >
                    Live Demo
                    <span className="sr-only">（{project.title}・別タブで開く）</span>
                    <span aria-hidden className="work-card-arrow">
                      &#8599;
                    </span>
                  </a>
                )}
                {project.repoHref && (
                  <a
                    href={project.repoHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:underline"
                  >
                    GitHub
                    <span className="sr-only">（{project.title}・別タブで開く）</span>
                    <span aria-hidden className="work-card-arrow">
                      &#8599;
                    </span>
                  </a>
                )}
              </div>
            </div>

            {project.miniCase && (
              <div className="lg:pl-[calc(2rem+1.5rem)]">
                <MiniCase data={project.miniCase} compact />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

const FEATURED_WORK_SLUG = "ses-meetup-site";

export function SelectedWorks() {
  const featuredWork =
    works.find((work) => work.slug === FEATURED_WORK_SLUG) ?? works[0];
  const secondaryWorks = works.filter(
    (work) => work.slug !== featuredWork.slug,
  );

  return (
    <Section
      id="works"
      eyebrow="// Selected Works"
      eyebrowVariant="code"
      title="実際に使われているものを、つくって、運用しています。"
      lead="学習用のモックではなく、自分やまわりの業務で実際に動いているものを中心に掲載しています。技術構成は、実装で確認できたものだけを記載しています。"
    >
      <ul className="grid gap-6 sm:grid-cols-2">
        <FeaturedWorkCard work={featuredWork} />
        {secondaryWorks.map((work) => (
          <WorkCard key={work.slug} work={work} />
        ))}
      </ul>

      <MoreProjects />

      <p className="mt-8 text-sm text-muted">
        ※ 一部の実績はスクリーンショット・公開URLを順次追加します。掲載内容は公開可能な範囲に限定しています。
      </p>
    </Section>
  );
}
