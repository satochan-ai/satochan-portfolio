import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Tag } from "@/components/ui/Tag";
import { PortfolioVideo } from "@/components/sections/PortfolioVideo";
import {
  portfolioVideo,
  publicTools,
  works,
  type MiniCase as MiniCaseData,
  type Work,
} from "@/content/works";

/** PROBLEM → APPROACH → CHANGED STATE の要約。compact指定でカード内向けに視覚強度を下げる。 */
function MiniCase({
  data,
  compact,
}: {
  data: MiniCaseData;
  compact?: boolean;
}) {
  const items = [
    { label: "課題", text: data.problem },
    { label: "判断・設計", text: data.approach },
    { label: "現在確認できている状態", text: data.changedState },
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

/** 制作物から相談できる業務への関連付け。納品実績ではないことが分かるラベルで表示する。 */
function RelatedConsultation({ text }: { text: string }) {
  return (
    <p className="mt-3 text-xs leading-relaxed text-muted [word-break:auto-phrase]">
      <span className="mr-1.5 font-medium text-accent">関連するご相談</span>
      {text}
    </p>
  );
}

type CardOptions = {
  /** カードに付けるアンカーid。 */
  anchorId?: string;
  /** Case Studyへのリンクの前に付けるパス（トップでは "/works"、/works では空）。 */
  caseBase?: string;
};

/** Secondary Works（Featured以外）は一覧性を優先し、余白と本文量をやや抑えて表示する。 */
function WorkCard({ work, anchorId, caseBase = "" }: { work: Work } & CardOptions) {
  const cardStack = work.cardStack ?? work.stack.slice(0, 4);

  return (
    <li
      id={anchorId}
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

        {work.relatedConsultation && (
          <RelatedConsultation text={work.relatedConsultation} />
        )}

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
                  href={`${caseBase}${work.caseStudyHref}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                >
                  {work.caseStudyLabel ?? "Case Study を見る"}
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
function FeaturedWorkCard({ work, anchorId, caseBase = "" }: { work: Work } & CardOptions) {
  return (
    <li id={anchorId}>
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

          {work.relatedConsultation && (
            <RelatedConsultation text={work.relatedConsultation} />
          )}

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
                    href={`${caseBase}${work.caseStudyHref}`}
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
 * Selected Works の従属コンテンツ。実際に公開している小規模ツールを、
 * 画像なしの軽いカードで並べて Featured / Secondary Works の主役性を崩さない。
 */
function PublicTools() {
  return (
    <div className="mt-14 border-t border-line pt-10 sm:mt-16">
      <h3 className="font-mono text-eyebrow font-medium uppercase text-accent">
        {"// Public Tools"}
      </h3>
      <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted [word-break:auto-phrase]">
        営業・採用・AI活用の現場課題をもとに制作した、小規模な診断・チェックツールです。ブラウザ上で動作し、入力内容を外部へ送信しません。
      </p>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {publicTools.map((tool) => (
          <li key={tool.slug}>
            <article className="work-card flex h-full flex-col rounded-card border border-line bg-bg p-5 transition-[border-color,box-shadow] duration-200 hover:border-fg/40 hover:shadow-[0_6px_16px_rgb(14_16_19/0.06)] sm:p-6">
              <p className="text-xs font-medium text-accent [word-break:auto-phrase]">
                {tool.usedFor}
              </p>
              <h4 className="mt-2 text-base font-semibold text-fg [word-break:auto-phrase]">
                {tool.title}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-muted [word-break:auto-phrase]">
                {tool.description}
              </p>

              <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-3 pt-5">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full border border-line bg-surface px-2.5 py-0.5 font-mono text-[0.6875rem] text-muted">
                    {tool.statusLabel}
                  </span>
                  {tool.statusNote && (
                    <span className="inline-flex items-center rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.6875rem] text-muted">
                      {tool.statusNote}
                    </span>
                  )}
                </div>

                <a
                  href={tool.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 py-1 text-sm font-medium text-accent hover:underline"
                >
                  ツールを開く
                  <span className="sr-only">（{tool.title}・別タブで開く）</span>
                  <span aria-hidden className="work-card-arrow">
                    &#8599;
                  </span>
                </a>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}

const FEATURED_WORK_SLUG = "ses-meetup-site";

/** 先頭の大きなカード（Featured）と、それ以外の作品に分ける。順序は works.ts のまま。 */
function splitWorks(list: Work[]) {
  const featuredWork =
    list.find((work) => work.slug === FEATURED_WORK_SLUG) ?? list[0];
  return {
    featuredWork,
    secondaryWorks: list.filter((work) => work.slug !== featuredWork.slug),
  };
}

function PublicScopeNote() {
  return (
    <p className="mt-8 text-sm text-muted">
      ※ 掲載内容は公開可能な範囲に限定しています。
    </p>
  );
}

/** トップページ：代表作品だけを表示し、全件と事例は /works へ案内する。 */
export function SelectedWorks() {
  const featuredList = works.filter((work) => work.featured);
  const { featuredWork, secondaryWorks } = splitWorks(featuredList);

  return (
    <Section
      id="works"
      eyebrow="// Selected Works"
      eyebrowVariant="code"
      title="営業・採用の課題を、運用と試作で具体化。"
      lead={`交流会の実運用、採用・営業の業務設計DemoやPrototypeから、代表的な${featuredList.length}件を紹介します。ほかの制作物と詳しい取り組み事例は、制作物一覧のページにまとめています。`}
    >
      <PortfolioVideo
        summary={portfolioVideo.summary}
        src={portfolioVideo.src}
        poster={portfolioVideo.poster}
        posterAlt={portfolioVideo.posterAlt}
      >
        <p id="portfolio-video-description" className="text-sm leading-relaxed text-fg">
          {portfolioVideo.description}
        </p>
        <p className="mt-3 text-xs leading-relaxed text-muted">
          {portfolioVideo.note}
        </p>
      </PortfolioVideo>

      <ul className="grid gap-6 sm:grid-cols-2">
        <FeaturedWorkCard work={featuredWork} caseBase="/works" />
        {secondaryWorks.map((work) => (
          <WorkCard
            key={work.slug}
            work={work}
            caseBase="/works"
            anchorId={work.slug === "recruitment-insight" ? "recruitment-insight" : undefined}
          />
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link
          href="/works"
          className="inline-flex items-center gap-2 rounded-full border border-fg/20 px-5 py-3 text-sm font-medium text-fg transition-colors hover:border-fg/50"
        >
          すべての制作物と事例を見る
          <span aria-hidden>&rarr;</span>
        </Link>
        <Link
          href="/#contact"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
        >
          お問い合わせ
          <span aria-hidden>&rarr;</span>
        </Link>
      </div>

      <PublicScopeNote />
    </Section>
  );
}

/** /works：全作品を元の順序で表示し、公開ツールも続けて掲載する。 */
export function WorksList() {
  const { featuredWork, secondaryWorks } = splitWorks(works);

  return (
    <Section
      id="works"
      eyebrow="// Works"
      eyebrowVariant="code"
      title="制作物一覧"
      lead="交流会の実運用、採用・営業の業務設計DemoやPrototype、個人開発のツールやサイトを、公開状況とともに掲載しています。"
    >
      <ul className="grid gap-6 sm:grid-cols-2">
        <FeaturedWorkCard work={featuredWork} anchorId={`work-${featuredWork.slug}`} />
        {secondaryWorks.map((work) => (
          <WorkCard key={work.slug} work={work} anchorId={`work-${work.slug}`} />
        ))}
      </ul>

      <PublicTools />

      <PublicScopeNote />
    </Section>
  );
}
