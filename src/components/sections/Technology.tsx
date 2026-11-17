import { Section } from "@/components/ui/Section";

type TechGroup = {
  label: string;
  /** カテゴリの補足。現在は表示していない（掲載内容の根拠メモとして残す）。 */
  note: string;
  items: string[];
};

/** 自己評価レベル（上級・エキスパート等）は付けない。使っているものを並べるだけ。 */
const groups: TechGroup[] = [
  {
    label: "AI",
    note: "業務のどの工程で使うかを決めたうえで使い分けています",
    items: ["ChatGPT / GPTs", "Claude Code / Skills", "Gemini / Gem"],
  },
  {
    label: "Development",
    note: "Web・業務ツールの実装と、PDFの寸法・採番の検証",
    items: ["Next.js", "Vite", "TypeScript", "JavaScript", "Python", "GAS"],
  },
  {
    label: "Data / Operations",
    note: "データの置き場と、日々の運用まわり",
    items: ["Google Sheets", "Supabase", "Obsidian"],
  },
  {
    label: "Platform / Workflow",
    note: "Webサイト・公開ツールの公開と、ソースの管理",
    items: ["GitHub", "Vercel", "Cloudflare Pages"],
  },
];

export function Technology() {
  return (
    <Section
      id="technology"
      eyebrow="// Technology"
      eyebrowVariant="code"
      title="実際に使っている技術"
      lead="スキルレベルを並べるのではなく、実際に手を動かして使っているものを記載しています。"
      tone="surface"
    >
      <dl className="grid grid-cols-2 gap-x-5 gap-y-6 lg:grid-cols-4 lg:gap-x-8">
        {groups.map((group) => (
          <div key={group.label} className="min-w-0 border-t border-line pt-4">
            <dt className="text-eyebrow font-medium uppercase text-accent">
              {group.label}
            </dt>
            <dd>
              <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 text-sm font-medium text-fg">
                {group.items.map((item) => (
                  <li key={item} className="[word-break:auto-phrase]">{item}</li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
