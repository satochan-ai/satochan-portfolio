import Image from "next/image";

import { Section } from "@/components/ui/Section";

/** プロフィール写真が用意できたらここにパスを設定する。null の間は表示しない。 */
const profilePhoto: { src: string; alt: string } | null = null;

const paragraphs = [
  "SES営業16年、採用10年。技術者と企業の間に立ち、提案・商談・面談を積み重ねてきました。数字を持つ立場で現場に立ち続けてきたことが、いまの仕事の土台になっています。",
  "途中からは個人の営業活動だけでなく、営業マネジメント、KPIの設計、採用フローの整理といった、チームと仕組みを見る役割へ広がりました。担当している範囲が「案件を決めること」から「決まる状態をつくること」へ移っていきました。",
  "生成AIが広く使われるようになってからは、AIを自分の業務へ取り入れるだけでなく、足りない仕組みは自分で作るようになりました。Webサイトや小規模な業務ツールを、要件整理から実装・公開まで通して手掛けています。",
  "現在は、現場課題の発見から、整理、AI活用、仕組み化、必要であれば実装までを一貫して扱っています。どこか1工程だけを切り出すのではなく、業務として動くところまで持っていくことを大事にしています。",
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
      lead="SES営業16年、採用10年。現場の判断がどこで詰まるかを知ったうえで、AI活用と業務改善に取り組んでいます。"
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
