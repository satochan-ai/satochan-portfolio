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
  usedFor: string;
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
  /** プロトタイプ等で「導入前後」を短く示したい場合のみ設定。デモ上の数値は含めない。 */
  beforeAfter?: {
    before: string;
    after: string;
  };
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
    usedFor: "SES営業交流会の申込受付・定員管理・受付連絡（本番運用中）",
    highlights: [
      "申込フォームと定員管理",
      "受付メール送信",
      "キャンセル時の残席復元",
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
  },
  {
    slug: "matchpilot",
    title: "MatchPilot",
    category: "Sales Operations / CRM",
    statusLabel: "Prototype / In Development",
    statusKind: "development",
    summary:
      "SES営業における企業・担当者との接点、打ち合わせ、関係値、次回アクションを整理・可視化し、営業活動を属人的な記憶だけに頼らない状態へ変えるための営業支援ツール。",
    usedFor: "SES営業の接点・関係値の可視化と、次アクションの判断",
    highlights: [
      "企業・担当者との接点・打ち合わせ履歴",
      "関係値の可視化と次回アクションの整理",
      "「管理すること」ではなく「次にどこへ動くべきか分かること」を基準に設計",
    ],
    stack: ["JavaScript", "HTML", "CSS", "CSV"],
    image: "/images/works/matchpilot.png",
    imageAlt: "MatchPilotの今月KPI画面。人材紹介数・案件提案数・打ち合わせ数の実績と達成率が並んでいる。",
    beforeAfter: {
      before: "感覚・記憶に依存し、停滞理由が見えにくい。",
      after: "KPI・NG理由・関係値から、注力先と次アクションを判断できる。",
    },
  },
  {
    slug: "ai-mini-seminar",
    title: "AI活用ミニ講座",
    category: "AI Enablement / Training",
    statusLabel: "Speaking",
    statusKind: "speaking",
    summary:
      "生成AI初心者向けに「明日から仕事で使える生成AI活用入門」をテーマとしたミニ講座を実施。自分が使えることではなく、聞いた人が翌日から業務で使える状態にすることを目的に構成しました。",
    usedFor: "生成AI活用の社内・社外向け教育",
    highlights: [
      "商談メモの整理",
      "営業業務へのAI活用",
      "AIを「相談相手」だけでなく「実務担当」として使う考え方",
    ],
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
      "2019年から蓄積している営業・打ち合わせ記録をObsidianへ集約し、AIから横断的に分析できる形へ変えている個人運用の仕組み。公開するのは仕組みと考え方のみで、記録の原文は非公開です。",
    usedFor: "商談準備・過去との比較・次回アクションの設計",
    highlights: [
      "過去記録の検索・比較・傾向分析",
      "次回アクションの設計に再利用",
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
      "交流会などで発生する領収証の発行業務を効率化するために作った小規模Webツール。大きな開発ではなく、小さな業務課題を見つけてから要件整理・実装・公開まで短期間で形にした事例です。",
    usedFor: "領収証発行まわりの手作業削減",
    highlights: [
      "入力内容からPDFの領収証を生成",
      "課題発見から公開まで短期間で完了",
      "GitHubで管理し、Vercelで公開",
    ],
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
      "稼働後の勤怠・契約更新・請求・フォロー状況を一元化し、見落としを防ぐSES業務管理プロトタイプ。",
    statusLabel: "Prototype",
  },
  {
    slug: "meetroute",
    title: "MeetRoute",
    category: "Meeting Operations",
    description:
      "オンライン・対面の候補日時を受け付け、移動条件を確認して承認する日程調整プロトタイプ。",
    statusLabel: "Prototype",
  },
  {
    slug: "matchhire",
    title: "MatchHire",
    category: "Recruiting Operations",
    description:
      "候補者・求人・応募・面接評価を横断し、採用ファネルの停滞とNG理由を可視化する公開デモ。",
    statusLabel: "Demo",
    demoHref: "https://satochan-ai.github.io/matchhire-demo/",
    repoHref: "https://github.com/satochan-ai/matchhire-demo",
  },
];
