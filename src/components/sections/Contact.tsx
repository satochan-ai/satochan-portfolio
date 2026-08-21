import { Section } from "@/components/ui/Section";
import { contactChannels, contactTopics } from "@/content/site";

export function Contact() {
  const availableChannels = contactChannels.filter(
    (channel) => channel.href !== null && channel.value !== null,
  );

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="AI活用・業務改善・ツール開発のご相談はこちらから。"
      lead="AI活用・業務改善・Web / ツール制作・営業 / 採用支援などについて、お話しできる機会があればお気軽にご連絡ください。課題がまだ整理できていない段階でも構いません。まず現状をうかがったうえで、どこから手を付けるかを一緒に決めます。"
      tone="dark"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-card border border-inverse-fg/15 p-7">
          <h3 className="text-h3 font-bold text-inverse-fg">
            ご相談いただける内容
          </h3>
          <ul className="mt-5 space-y-2.5 text-sm text-inverse-fg/75">
            {contactTopics.map((topic) => (
              <li key={topic} className="flex gap-2.5">
                <span
                  aria-hidden
                  className="mt-2 size-1 shrink-0 rounded-full bg-inverse-fg/50"
                />
                {topic}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-card border border-inverse-fg/15 p-7">
          <h3 className="text-h3 font-bold text-inverse-fg">進め方</h3>
          <p className="mt-4 text-sm leading-relaxed text-inverse-fg/70">
            現状のヒアリングから始めます。いきなりツールを作る前に、どこに手間がかかっているのか、AIに任せる工程と人が判断する工程をどう分けるのかを整理するところからご一緒します。
          </p>

          {availableChannels.length > 0 && (
            <ul className="mt-7 flex flex-wrap gap-3">
              {availableChannels.map((channel) => (
                <li key={channel.label}>
                  <a
                    href={channel.href as string}
                    className="inline-flex items-center justify-center rounded-full bg-inverse-fg px-6 py-3.5 text-sm font-medium text-fg transition-opacity hover:opacity-85"
                  >
                    {channel.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Section>
  );
}
