export type WorkStatusKind = "live" | "development" | "speaking" | "personal";

export type Work = {
  slug: string;
  title: string;
  /** 英語のカテゴリ表記（Web Application / Event Operations など） */
  category: string;
  statusLabel: string;
  statusKind: WorkStatusKind;
  /** カードに出す2〜3行の説明 */
  summary: string;
  /** 何の業務で使われているか。技術より先に見せる。 */
  usedFor?: string;
  /** 公開可能な機能・要素。事実のみ。 */
  highlights: string[];
  /**
   * 実装で確認できた技術のみ。推測は入れない。
   * 未確認の場合は空配列にして UI 側で非表示にする。
   */
  stack: string[];
  /** 一覧カードでは比較しやすい主要技術だけを表示する。 */
  cardStack?: string[];
  /** public/images/works/ 配下のパス。未用意の間は null。 */
  image: string | null;
  imageAlt: string | null;
  /** 詳細な Case Study がある場合、そのアンカー */
  caseStudyHref?: string;
  href?: string;
  /** 公開リンクの表示名。未指定時は既定の文言を使う。 */
  hrefLabel?: string;
  /** 代表的な事例のみ設定する要約。未実測の成果数値は含めない。 */
  miniCase?: MiniCase;
};

export type MiniCase = {
  problem: string;
  approach: string;
  changedState: string;
};

/**
 * 掲載情報は公開可能な事実のみ。
 * 取引先企業名 / 担当者名 / 単価 / 契約条件 / 商流 / 営業記録原文は一切載せない。
 * stack は各リポジトリの実装で確認できたものだけを記載している。
 */
export const works: Work[] = [
  {
    slug: "ses-meetup-site",
    title: "SES営業交流会 申込サイト",
    category: "Web Application / Event Operations",
    statusLabel: "Live / Production",
    statusKind: "live",
    summary:
      "自分が運営しているSES営業交流会の、申込から当日運用までを支えるWebサイト。イベント告知ページではなく、定員管理・受付メール・キャンセル・残席復元まで、運営に必要な仕組みを実装しています。",
    highlights: [
      "申込フォームと定員管理",
      "受付メールとキャンセル後の残席復元",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "GAS Web App",
      "Google Spreadsheet",
      "Vercel",
    ],
    cardStack: ["Next.js", "TypeScript", "GAS Web App", "Google Spreadsheet"],
    image: "/images/works/ses-meetup-site.png",
    imageAlt:
      "SES営業交流会 申込サイトのトップページ。開催中の回の申込ボタンと、現在・前回の開催情報が並んでいる。",
    caseStudyHref: "#case-ses-meetup",
    href: "https://event-entry-site.vercel.app/",
    miniCase: {
      problem:
        "申込受付・定員管理・受付連絡・キャンセル対応が別々に残ると、告知サイトだけでは運営を支えられない。",
      approach:
        "申込から当日運用までを一つのフローとして設計し、Next.js、GAS、Google Spreadsheetで役割を分けた。",
      changedState:
        "申込受付、定員管理、受付連絡、キャンセル後の残席復元を一つの運用で進められ、開催ごとに使用・改善できる状態。",
    },
  },
  {
    slug: "matchpilot",
    title: "MatchPilot",
    category: "Sales Operations / CRM",
    statusLabel: "Prototype / In Development",
    statusKind: "development",
    summary:
      "SES営業における企業・担当者との接点、打ち合わせ、関係値、次回アクションを整理・可視化し、営業活動を属人的な記憶だけに頼らない状態へ変えるための営業支援ツール。",
    highlights: [],
    stack: ["JavaScript", "HTML", "CSS", "CSV"],
    image: "/images/works/matchpilot.png",
    imageAlt: "MatchPilotの今月KPI画面。人材紹介数・案件提案数・打ち合わせ数の実績と達成率が並んでいる。",
    miniCase: {
      problem: "営業状況が感覚や記憶に依存し、停滞理由が見えにくい。",
      approach:
        "KPI・NG理由・企業との接点・関係値・次アクションを一つのDashboardへ整理。",
      changedState: "注力先と次に動くべき相手を、情報から判断できる状態へ。",
    },
  },
  {
    slug: "recruitment-insight",
    title: "Recruitment Insight",
    category: "Recruiting Operations",
    statusLabel: "Demo / Recruiting Operations",
    statusKind: "development",
    summary:
      "候補者・求人・企業・選考情報を横断し、採用ファネル、停滞、離脱理由、次回アクションを可視化する採用業務デモ。",
    highlights: [],
    // 実装を確認できるリポジトリがこの作業環境にないため、推測で技術名は載せない。
    stack: [],
    image: "/images/works/recruitment-insight-dashboard.webp",
    imageAlt:
      "候補者・選考ファネル・要対応を可視化したRecruitment Insightのダッシュボード",
    href: "https://recruitment-insight-demo.vercel.app/",
    hrefLabel: "Live Demo",
    miniCase: {
      problem:
        "候補者・求人・面接評価・選考状況が分散すると、停滞箇所や離脱理由を把握しにくい。",
      approach:
        "候補者・求人・企業・選考履歴をつなぎ、ファネル・停滞・離脱理由・次回アクションを横断して確認できる構成に整理。",
      changedState:
        "採用状況を候補者単位だけでなく、企業・求人・選考ファネルの視点から確認できるDemoとして可視化。",
    },
  },
  {
    slug: "ai-mini-seminar",
    title: "AI活用ミニ講座",
    category: "AI Enablement / Training",
    statusLabel: "Speaking",
    statusKind: "speaking",
    summary:
      "2026年8月18日に、生成AI初心者向けの約30分のミニ講座を実施。翌日から業務で試せる入門内容に絞って構成しました。",
    highlights: [],
    stack: ["生成AI活用", "業務適用の設計", "登壇・教育"],
    image: "/images/works/ai-mini-seminar.png",
    imageAlt: "AI活用ミニ講座「明日から仕事で使える 生成AI活用入門」のスライド表紙。2026.08.18 実施。",
  },
  {
    slug: "obsidian-ai-knowledge",
    title: "Obsidian × AI ナレッジ活用",
    category: "Knowledge Management / AI Workflow",
    statusLabel: "Personal Knowledge System",
    statusKind: "personal",
    summary:
      "2019年からの営業・打ち合わせ記録をObsidianへ集約し、AIで横断分析できる形にした個人運用の仕組み。記録の原文は非公開です。",
    highlights: [
      "過去記録の検索・比較・傾向分析",
      "AIからは読み取り専用で分析する運用",
    ],
    stack: ["Obsidian", "生成AI", "ナレッジ設計"],
    image: null,
    imageAlt: null,
    caseStudyHref: "#case-obsidian-ai",
  },
  {
    slug: "receipt-generator",
    title: "領収証生成ツール",
    category: "Business Tool / Automation",
    statusLabel: "Live",
    statusKind: "live",
    summary:
      "交流会の領収証発行業務を、必要な範囲で小さく形にして実装・公開したWebツール。",
    highlights: ["入力内容からPDFの領収証を生成"],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "React PDF",
      "GitHub",
      "Vercel",
    ],
    cardStack: ["Next.js", "TypeScript", "React PDF"],
    image: "/images/works/receipt-generator.png",
    imageAlt:
      "領収証生成ツールの入力画面。左側にイベント情報と発行会社情報の入力欄、右側に領収証のプレビューが表示されている。",
  },
];

export type SupportingProject = {
  slug: string;
  title: string;
  category: string;
  description: string;
  /** 完成度を正直に伝えるラベル。Production の実績と誤認させない。 */
  statusLabel: string;
  /** 公開が確認できているものだけ設定する。未確認ならリンクを持たせない。 */
  demoHref?: string;
  repoHref?: string;
  /** 代表的な事例のみ設定する要約。未実測の成果数値は含めない。 */
  miniCase?: MiniCase;
};

/**
 * Selected Works の従属コンテンツ。代表作ではなく、業務課題から試作したものを補足として並べる。
 * 未接続・将来機能は書かない。公開URLが確認できたものだけリンクを付ける。
 */
export const supportingProjects: SupportingProject[] = [
  {
    slug: "matchfollow",
    title: "MatchFollow",
    category: "Follow-up Operations",
    description:
      "勤怠・契約更新・請求・フォロー状況を一元化するSES業務管理プロトタイプ。",
    statusLabel: "Prototype",
  },
  {
    slug: "meetroute",
    title: "MeetRoute",
    category: "Meeting Operations",
    description:
      "候補日時と移動条件を確認・承認する日程調整プロトタイプ。",
    statusLabel: "Prototype",
  },
];
