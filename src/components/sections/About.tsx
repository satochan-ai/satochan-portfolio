import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { about } from "@/content/site";

/** プロフィール写真が用意できたらここにパスを設定する。null の間は表示しない。 */
const profilePhoto: { src: string; alt: string } | null = null;

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="SES営業・採用の経験を、業務改善と仕組みづくりに。"
      lead="これまでの中心的な経験、最近取り組み始めた業務、個人での活動を分けて紹介します。"
      tone="surface"
    >
      <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-5">
          {about.paragraphs.map((text) => (
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
              {about.career.map((item) => (
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
