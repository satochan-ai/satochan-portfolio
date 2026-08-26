import Image from "next/image";

import { Section } from "@/components/ui/Section";

/** プロフィール写真が用意できたらここにパスを設定する。null の間は表示しない。 */
const profilePhoto: { src: string; alt: string } | null = null;

const paragraphs = [
  "個人の営業活動だけでなく、営業マネジメント、KPI設計、採用フローの整理へ役割を広げ、「案件を決めること」から「決まる状態をつくること」へ取り組み方が変わりました。",
  "現在は、現場課題を整理し、AIを業務へ組み込み、足りない仕組みはWeb・業務ツールとして実装しています。業務として使える状態まで一貫して扱います。",
];

const career = [
  {
    period: "16年",
    title: "SES営業",
    body: "提案・商談・BP開拓・営業マネジメント",
  },
  {
    period: "10年",
    title: "採用",
    body: "母集団形成・面談・入社後フォロー",
  },
  {
    period: "現在",
    title: "AI活用 / 業務改善 / 開発",
    body: "課題整理から仕組み化、Web・業務ツールの実装まで",
  },
];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="現場で数字を持ってきた人間が、そのまま仕組みをつくっています。"
      lead="営業・採用の現場判断を起点に、AI活用と業務改善へ取り組んでいます。"
      tone="surface"
    >
      <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-5">
          {paragraphs.map((text) => (
            <p key={text} className="text-sm leading-loose text-fg sm:text-base">
              {text}
            </p>
          ))}
        </div>

        <div className="space-y-8">
          {profilePhoto && (
            <div className="relative aspect-4/5 w-full max-w-64 overflow-hidden rounded-card border border-line bg-bg">
              <Image
                src={profilePhoto.src}
                alt={profilePhoto.alt}
                fill
                sizes="256px"
                className="object-cover"
              />
            </div>
          )}

          <div>
            <h3 className="text-eyebrow font-medium uppercase text-muted">
              Career
            </h3>
            <ul className="mt-4 border-t border-line">
              {career.map((item) => (
                <li
                  key={item.title}
                  className="grid grid-cols-[4.5rem_1fr] gap-4 border-b border-line py-5"
                >
                  <span className="font-mono text-sm text-muted">
                    {item.period}
                  </span>
                  <div>
                    <p className="font-bold">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
