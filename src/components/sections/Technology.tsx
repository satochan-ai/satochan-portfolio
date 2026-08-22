import { Section } from "@/components/ui/Section";

type TechGroup = {
  label: string;
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
    note: "課題に応じて必要な範囲で実装します",
    items: ["Next.js", "TypeScript", "JavaScript", "Python", "GAS"],
  },
  {
    label: "Data / Operations",
    note: "データの置き場と、日々の運用まわり",
    items: ["Google Sheets", "Supabase", "Obsidian"],
  },
  {
    label: "Platform / Workflow",
    note: "管理と公開",
    items: ["GitHub", "Vercel"],
  },
];

export function Technology() {
  return (
    <Section
      id="technology"
      eyebrow="Technology"
      title="使う技術は、目的に対して必要な分だけ。"
      lead="スキルレベルを並べるのではなく、実際に手を動かして使っているものを記載しています。"
      tone="surface"
    >
      <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((group) => (
          <div key={group.label} className="border-t border-line pt-5">
            <dt>
              <span className="text-eyebrow font-medium uppercase text-accent">
                {group.label}
              </span>
              <span className="mt-2 block text-xs leading-relaxed text-muted">
                {group.note}
              </span>
            </dt>
            <dd>
              <ul className="mt-5 space-y-2.5 text-sm font-medium text-fg">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
