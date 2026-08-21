export type CaseStudyMetric = {
  value: string;
  label: string;
};

export type CaseStudy = {
  id: string;
  title: string;
  category: string;
  statusLabel: string;
  lead: string;
  problem: string[];
  approach: string[];
  solution: string[];
  impact: {
    body: string[];
    /**
     * 公開してよい実数値が確定してから追加する。
     * 現時点では推測値を入れないため空配列。
     */
    metrics: CaseStudyMetric[];
  };
  stack: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    id: "case-ses-meetup",
    title: "SES営業交流会 申込サイト",
    category: "Web Application / Event Operations",
    statusLabel: "Live / Production",
    lead: "自分が主催するSES営業交流会で、申込受付から当日運用までを実際に動かしているサイトです。",
    problem: [
      "イベント運営では、申込受付・定員管理・受付連絡・キャンセル対応・残席管理・イベントごとの情報公開といった業務が同時に発生する。",
      "告知用のLPを作るだけでは、これらの運営業務は手元に残ったままになる。実際の運営まで含めて支える仕組みが必要だった。",
    ],
    approach: [
      "Webサイト単体で考えず、申込から当日運用までを一つの業務フローとして設計した。",
      "参加者が触れる画面はNext.jsで作り、申込データの保管と受付メールの送信はGASとGoogle Spreadsheetに任せる構成にした。運営側が普段から使えるツールの上にデータを置くことを優先している。",
    ],
    solution: [
      "イベント別ページ",
      "申込フォーム",
      "定員管理",
      "受付メール送信",
      "キャンセル受付",
      "キャンセル時の残席復元",
      "プライバシーポリシーページ",
      "SEO改善",
    ],
    impact: {
      body: [
        "学習用のモックではなく、実際のSES営業交流会で本番運用しています。",
        "開催のたびに運営側で気づいた不便を反映し、継続的に改善しています。作って終わりではなく、使いながら直している状態です。",
      ],
      metrics: [],
    },
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "GAS Web App",
      "Google Spreadsheet",
      "Vercel",
    ],
  },
  {
    id: "case-obsidian-ai",
    title: "Obsidian × AI ナレッジ活用",
    category: "Knowledge Management / AI Workflow",
    statusLabel: "Personal Knowledge System",
    lead: "2019年から蓄積している営業・打ち合わせ記録を、あとから使えるナレッジへ変えるための個人運用です。",
    problem: [
      "営業記録は、蓄積しても後から検索・比較・活用できなければ、記録しただけで終わる。",
      "紙のノートやばらばらのテキストのままでは、過去の打ち合わせで何を話したかを、必要なタイミングで引き出せない。",
    ],
    approach: [
      "長期間の営業記録をObsidianへ集約し、AIから横断的に読める形に整理した。",
      "AIには読み取り専用で分析させ、判断と記録そのものは自分が持つ運用にしている。記録の原文は公開しない。",
    ],
    solution: [
      "過去記録の検索",
      "過去の打ち合わせとの比較",
      "傾向の分析",
      "商談前後の振り返り",
      "次回アクションの設計",
    ],
    impact: {
      body: [
        "過去の記録が「保管しているだけのデータ」から「意思決定に使えるナレッジ」へ変わりました。",
        "記録することではなく、記録した情報を再利用できる状態にしておくことに価値がある、という前提で運用しています。",
      ],
      metrics: [],
    },
    stack: ["Obsidian", "生成AI", "ナレッジ設計"],
  },
];

export type KnowledgeFlowStep = {
  label: string;
  note: string;
};

/** Case Study B のフロー図。CSS/HTML で描画する。 */
export const knowledgeFlow: KnowledgeFlowStep[] = [
  { label: "紙のノート", note: "商談・打ち合わせの手書き記録" },
  { label: "PC上のテキスト記録", note: "検索できる形へ書き起こし" },
  { label: "Obsidianへ集約", note: "一か所にまとめ、つながりを持たせる" },
  { label: "AIによる横断分析", note: "読み取り専用で全体を俯瞰する" },
  { label: "過去との比較", note: "前回までの経緯と照らし合わせる" },
  { label: "次回アクション", note: "次に何を話すかを決める" },
  { label: "ナレッジ再利用", note: "次の商談・別の相手にも活きる" },
];
