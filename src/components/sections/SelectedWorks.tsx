import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Tag } from "@/components/ui/Tag";
import { works, type Work } from "@/content/works";

function WorkThumb({ work }: { work: Work }) {
  if (work.image) {
    return (
      <div className="relative aspect-16/10 w-full overflow-hidden border-b border-line bg-surface">
        <Image
          src={work.image}
          alt={work.imageAlt ?? work.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
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

function WorkCard({ work }: { work: Work }) {
  const cardStack = work.cardStack ?? work.stack.slice(0, 4);

  return (
    <li className="flex h-full flex-col overflow-hidden rounded-card border border-line bg-bg transition-colors hover:border-fg/40">
      <WorkThumb work={work} />

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-medium text-accent">{work.category}</p>
        <div className="mt-2">
          <StatusBadge kind={work.statusKind} label={work.statusLabel} />
        </div>

        <h3 className="mt-3 text-h3 font-bold">{work.title}</h3>

        <p className="mt-3 text-sm leading-relaxed text-muted">
          {work.summary}
        </p>

        <dl className="mt-5 border-t border-line pt-4 text-sm">
          <dt className="text-xs font-medium uppercase tracking-wide text-muted">
            Used for
          </dt>
          <dd className="mt-1 leading-relaxed text-fg">{work.usedFor}</dd>
        </dl>

        <ul className="mt-4 space-y-1.5 text-sm text-fg">
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

        <div className="mt-auto pt-5">
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
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
              {work.href && (
                <a
                  href={work.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                >
                  サイトを見る
                  <span className="sr-only">（{work.title}・別タブで開く）</span>
                  <span aria-hidden>&#8599;</span>
                </a>
              )}
              {work.caseStudyHref && (
                <a
                  href={work.caseStudyHref}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                >
                  Case Study を見る
                  <span className="sr-only">（{work.title}）</span>
                  <span aria-hidden>&rarr;</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export function SelectedWorks() {
  return (
    <Section
      id="works"
      eyebrow="Selected Works"
      title="実際に使われているものを、つくって、運用しています。"
      lead="学習用のモックではなく、自分やまわりの業務で実際に動いているものを中心に掲載しています。技術構成は、実装で確認できたものだけを記載しています。"
    >
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {works.map((work) => (
          <WorkCard key={work.slug} work={work} />
        ))}
      </ul>

      <p className="mt-8 text-sm text-muted">
        ※ 一部の実績はスクリーンショット・公開URLを順次追加します。掲載内容は公開可能な範囲に限定しています。
      </p>
    </Section>
  );
}
