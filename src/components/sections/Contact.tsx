import { Section } from "@/components/ui/Section";
import { contactChannels, contactTopics } from "@/content/site";

import { ContactForm } from "./ContactForm";

export function Contact() {
  const availableChannels = contactChannels.filter(
    (channel) => channel.href !== null && channel.value !== null,
  );

  return (
    <Section
      id="contact"
      eyebrow="// Contact"
      eyebrowVariant="code"
      title="仕事やAI活用について、お気軽にご相談ください。"
      lead="採用、営業・業務改善、AI活用、Web・業務ツール制作についてのご相談を受け付けています。課題がまだ整理できていない段階でも構いません。"
      tone="dark"
    >
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-10">
        <div className="space-y-6">
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
          </div>

          {availableChannels.length > 0 && (
            <div className="rounded-card border border-inverse-fg/15 p-7">
              <h3 className="text-eyebrow font-medium uppercase text-accent-on-dark">
                Works / Code
              </h3>
              <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-4">
                {availableChannels.map((channel) => (
                  <li key={channel.label}>
                    <a
                      href={channel.href as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-baseline gap-2 py-1 text-sm text-inverse-fg hover:underline"
                    >
                      <span className="font-medium">{channel.label}</span>
                      <span className="text-inverse-fg/70">{channel.value}</span>
                      <span className="sr-only">（別タブで開きます）</span>
                      <span aria-hidden className="text-inverse-fg/70">
                        &#8599;
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <ContactForm />
      </div>
    </Section>
  );
}
