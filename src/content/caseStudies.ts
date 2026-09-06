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
  evidence?: { basis: string; limitation: string; nextMeasure: string };
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
        "申込受付、定員管理、受付連絡、キャンセル後の残席復元を一つの運用にまとめ、現在も実際のSES営業交流会で開催ごとに使用・改善しています。",
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
    evidence: {
      basis: "公開サイトと申込・キャンセルの運用フロー。主催する交流会で開催ごとに使用し、運営中に見つかった不便を改善している。",
      limitation: "自分が主催する交流会での運用事例。定量的な作業時間の削減値は未計測。",
      nextMeasure: "開催ごとの申込・キャンセル件数、手動修正・問い合わせ・例外対応の件数と作業時間を記録する。",
    },
  },
  {
    id: "case-recruitment-insight",
    title: "Recruitment Insight",
    category: "Recruiting Operations",
    statusLabel: "Demo / Recruiting Operations",
    lead: "候補者・求人・企業・選考を横断して確認する業務設計を、公開Demoとして検討できる形にしています。",
    problem: ["採用情報が分散すると、選考がどこで、なぜ止まり、次に誰が動くべきかを追いにくい。"],
    approach: ["人数集計だけでは停滞の背景が見えないため、候補者・求人・企業・選考ファネルをつなぎ、離脱理由と次回アクションを横断して確認する構造を選んだ。"],
    solution: ["採用ダッシュボード・KPI", "選考ファネル", "要対応・停滞の可視化", "離脱理由", "候補者・求人・企業の横断整理", "次回アクション"],
    impact: { body: ["採用業務の改善案を、実際の画面を見ながら検討できる状態にした。"], metrics: [] },
    stack: [],
    evidence: {
      basis: "公開Demoのダッシュボードと、候補者・求人・企業・選考情報の構造。画面でどの情報を横断して見るかを確認できる。",
      limitation: "正式導入前のDemo。採用成果と工数削減は未検証で、AIによる自動合否を示す事例ではない。",
      nextMeasure: "初見の採用担当者が停滞箇所と次の対応を特定できるか、迷う箇所や情報量を観察し、表計算での確認と比較する。",
    },
  },
  {
    id: "case-matchpilot",
    title: "MatchPilot",
    category: "Sales Operations / CRM",
    statusLabel: "Prototype / In Development",
    lead: "SES営業の管理項目を、触って検討できるPrototypeとして具体化した事例です。",
    problem: ["営業状況が記憶・個人メモ・接点履歴に分散すると、フォロー対象や停滞理由を継続して追いにくい。"],
    approach: ["KPIだけでは次の行動が決まらないため、企業との接点・関係値・NG理由・次回アクションを一緒に確認する設計を試作した。"],
    solution: ["KPIダッシュボード", "企業との接点", "関係値", "NG理由", "次回アクション"],
    impact: { body: ["KPI・接点・次回アクションを、一つの画面で確認する営業管理の仮説を試作した。"], metrics: [] },
    stack: ["JavaScript", "HTML", "CSS", "CSV"],
    evidence: {
      basis: "Prototype画面と、SES営業で扱うKPI・接点・理由・次回アクションの管理項目。掲載画像では今月のKPI画面を示している。",
      limitation: "営業成果、チーム定着、他者による継続利用は未検証。既存CRMの代替を証明したものではない。",
      nextMeasure: "入力負担、更新の継続、フォロー漏れ、会議で他者が理解できるかを検証する。既存CRMや表計算、運用変更で足りるなら自作を増やさない。",
    },
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
