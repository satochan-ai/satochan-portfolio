import { Section } from "@/components/ui/Section";

type Talk = {
  date: string;
  title: string;
  category: string;
  audience: string;
  topics: string[];
  upcoming: boolean;
};

const talks: Talk[] = [
  {
    date: "2025.01.16",
    title: "SES営業勉強会",
    category: "SES Sales Training",
    audience: "社外向け / SES営業経験 約1年",
    topics: [
      "SESの基礎・契約形態",
      "新規開拓・営業フロー",
      "案件・人材マッチング",
      "案件情報の読み解き・信頼関係",
    ],
    upcoming: false,
  },
  {
    date: "2026.08.18",
    title: "明日から仕事で使える生成AI活用入門",
    category: "Generative AI Training",
    audience: "生成AI初心者向けミニ講座",
    topics: [
      "生成AIの基本",
      "商談メモの整理",
      "営業業務へのAI活用",
      "AIを「相談相手」だけでなく「実務担当」として使う考え方",
    ],
    upcoming: false,
  },
  {
    date: "2026.09.15",
    title: "仕事で使える生成AI活用 実践編",
    category: "Generative AI Training",
    audience: "第2回",
    topics: [],
    upcoming: true,
  },
];

export function Speaking() {
  return (
    <Section
      id="speaking"
      eyebrow="Speaking / Writing"
      title={
        <>
          使えるだけでなく、
          <br className="sm:hidden xl:block" />
          人に伝えられること。
        </>
      }
      lead="AI活用に限らず、実務で培った知識は、自分が使えて終わりではありません。聞いた人が翌日から業務で使える状態にするところまでを対象にしています。"
    >
      <ul className="border-t border-line">
        {talks.map((talk) => (
          <li
            key={talk.title}
            className="grid gap-3 border-b border-line py-7 sm:grid-cols-[8.5rem_1fr] sm:gap-8"
          >
            <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-2">
              <span className="font-mono text-sm text-muted">{talk.date}</span>
              <span
                className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  talk.upcoming
                    ? "bg-accent-soft text-accent"
                    : "bg-surface text-muted"
                }`}
              >
                {talk.upcoming ? "開催予定" : "実施済み"}
              </span>
            </div>

            <div>
              <p className="text-xs font-medium text-accent">{talk.category}</p>
              <h3 className="mt-1 text-h3 font-bold">{talk.title}</h3>
              <p className="mt-1.5 text-sm text-muted">{talk.audience}</p>

              {talk.topics.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
                  {talk.topics.map((topic) => (
                    <li key={topic} className="flex gap-2">
                      <span
                        aria-hidden
                        className="mt-2 size-1 shrink-0 rounded-full bg-line"
                      />
                      {topic}
                    </li>
                  ))}
                </ul>
              )}

              {talk.upcoming && (
                <p className="mt-4 text-sm text-muted">
                  内容は調整中です。確定しだい掲載します。
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
