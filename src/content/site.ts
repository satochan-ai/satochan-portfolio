export const site = {
  name: "satochan",
  tagline: "営業・採用の業務改善 / AI活用",
  description:
    "SES営業・採用の現場経験をもとに、AI活用、業務改善、Web・業務ツール開発まで。課題整理から設計、実装、運用まで一貫して取り組んでいます。",
  hero: {
    headline: "現場の課題を整理し、\nAIと仕組みで改善する。",
    sub: "SES営業・採用の現場経験をもとに、業務の整理からAI活用、小規模なWeb・業務ツール制作まで対応しています。営業情報の管理、採用状況の確認、申込受付や転記作業。日々の手間を整理し、必要な部分から改善します。",
  },
} as const;

export const about = {
  paragraphs: [
    "SES営業16年、採用業務約10年の経験があります。提案・商談や採用実務に加え、営業体制の立ち上げ、若手営業の教育、KPI・営業進捗管理、営業・採用業務の仕組み化に取り組んできました。",
    "最近は勤務先で、受託開発営業と自社パッケージ営業にも取り組み始めています。異業種企業との接点づくりや業務課題のヒアリング、開発相談の整理に加え、パッケージの案内や活用方法の検討を進めています。",
    "個人では、生成AIを活用した業務改善とWeb・業務ツール制作を続けています。Claude Code・CodexによるAI駆動開発や、生成AI活用講座・登壇にも取り組んでいます。",
  ],
  career: [
    { period: "中心経験", title: "SES営業16年 / 採用業務約10年", body: "営業体制づくり・若手教育・KPIと進捗管理・業務の仕組み化" },
    { period: "最近", title: "受託開発営業 / 自社パッケージ営業", body: "新たに取り組む領域として、異業種企業へのヒアリング・関係構築" },
    { period: "個人活動", title: "AI活用 / ツール制作 / 教育", body: "生成AIによる業務改善、AI駆動開発、講座・登壇" },
  ],
} as const;

/**
 * 本番URLは未確定。架空のドメインはハードコードしない。
 * - ローカル / URL未設定: null を返し、canonical・sitemap を出力しない
 * - Vercel: VERCEL_PROJECT_PRODUCTION_URL から自動解決
 * - 独自ドメイン確定後: NEXT_PUBLIC_SITE_URL を設定すれば全体へ反映される
 */
export function getSiteUrl(): string | null {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) {
    return explicit.replace(/\/+$/, "");
  }

  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelHost) {
    return `https://${vercelHost}`;
  }

  return null;
}

export type NavItem = {
  href: string;
  label: string;
};

export const navItems: NavItem[] = [
  { href: "/#works", label: "Works" },
  { href: "/#what-i-do", label: "対応できること" },
  { href: "/#case-study", label: "Case Study" },
  { href: "/#ai-workflow", label: "AI Workflow" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export type ProofPoint = {
  value: string;
  unit?: string;
  label: string;
  note?: string;
  /** 数字の前提を明示する小さな注記 */
  footnote?: string;
};

/**
 * 事実ベースの数字のみ。推測値・誇張値は載せない。
 * 「AI活用ミニ講座 登壇」「Web・業務ツール 実運用」は Speaking / Selected Works で
 * より具体的に証明済みのため、Career Evidence（数字の実績）に絞る。
 */
export const proofPoints: ProofPoint[] = [
  {
    value: "16",
    unit: "年",
    label: "SES営業",
    note: "顧客需要・提案・接点・フォローの流れを理解する土台",
  },
  {
    value: "10",
    unit: "年",
    label: "採用（約）",
    note: "候補者・求人・評価・選考進捗の流れを理解する土台",
  },
  {
    value: "1,500",
    unit: "+",
    label: "営業・商談接点",
    note: "企業・技術者との打ち合わせ・商談の累計",
    footnote: "長期間保存している営業・打ち合わせ記録をもとにした概算です。",
  },
];

export type BusinessImpactMetric = {
  value: string;
  label: string;
  description: string;
};

/** 個人の活動量だけでなく、立ち上げ・仕組み化まで担った範囲を示す。確定していない数字（社数の集計等）は含めない。 */
export const businessImpactMetrics: BusinessImpactMetric[] = [
  {
    value: "0→1",
    label: "営業立ち上げ",
    description: "営業基盤がない状態から、BPネットワークと提案導線を構築",
  },
  {
    value: "月50〜60社規模",
    label: "打ち合わせ創出",
    description: "新規商談・情報収集を継続的に創出",
  },
  {
    value: "若手教育 / KPI管理",
    label: "営業運用の仕組み化",
    description: "教育・進捗管理まで横断して担当",
  },
];

export type ContactChannel = {
  label: string;
  /** 正式な連絡先が確定するまでは null。架空の連絡先は置かない。 */
  href: string | null;
  /** 表示するアカウント名やアドレス */
  value: string | null;
};

/**
 * href / value が揃っているものだけ UI に表示される。
 * 公開先が確認できていない連絡手段（メール・X など）は、
 * 確定するまで追加しない。推測でURLを作らないこと。
 */
export const contactChannels: ContactChannel[] = [
  {
    label: "GitHub",
    href: "https://github.com/satochan-ai",
    value: "satochan-ai",
  },
];

export const contactTopics = [
  "生成AIの業務活用・社内導入のご相談",
  "営業・採用まわりの業務改善",
  "Webサイト・業務ツールの開発",
  "AI活用に関する講座・勉強会の登壇",
];

export const contactSteps = [
  {
    title: "フォームからご相談",
    description: "困っていることや、作りたいものを簡単にご記入ください。原則3営業日以内に返信します。",
  },
  {
    title: "初回30分の無料相談",
    description: "現状とご希望をうかがい、対応できる範囲を確認します。",
  },
  {
    title: "お見積もり・開始",
    description: "実作業が必要な場合は、内容・費用・進め方をご提示し、合意いただいてから開始します。",
  },
];

export type AiWorkflowActor = "human" | "ai" | "both";

export type AiWorkflowLayer = {
  no: string;
  label: string;
  jp: string;
  actor: AiWorkflowActor;
  /** 層の担当内容を一文で要約する。詳細なツールの役割は折りたたみ側に置く。 */
  summary: string;
  /** その層で主に使うAIツール。利用実態を確認できたものだけを載せる。 */
  tools?: string[];
  /** 戻り工程の説明。矢印は装飾のため、戻り先は必ず文章でも示す。 */
  returnNote?: string;
};

/**
 * Human-led AI Workflow の5層。現在のAI活用方法を一般化した概念図で、
 * 各工程が自動で連携・実行される仕組みを示すものではない。
 */
export const aiWorkflowLayers: AiWorkflowLayer[] = [
  {
    no: "01",
    label: "Human Director",
    jp: "課題設定・意思決定",
    actor: "human",
    summary: "目的・要件・優先順位・最終責任",
  },
  {
    no: "02",
    label: "AI Strategic Partner",
    jp: "調査・設計・計画",
    actor: "ai",
    summary: "課題整理・要件定義支援・作業指示",
    tools: ["ChatGPT"],
  },
  {
    no: "03",
    label: "AI Development Agents",
    jp: "制作・実装・検証",
    actor: "ai",
    summary: "技術設計・実装・テスト・動作検証",
    tools: ["Claude Code", "Codex"],
  },
  {
    no: "04",
    label: "Quality Assurance",
    jp: "品質管理",
    actor: "both",
    summary: "事実確認・レビュー・テスト・修正・停止",
    returnNote: "問題があれば必要な工程へ戻る",
  },
  {
    no: "05",
    label: "Human Approval",
    jp: "最終承認・運用・改善",
    actor: "human",
    summary: "成果物の確認・公開判断・継続改善",
    returnNote: "運用後の課題は01の課題設定へ戻る",
  },
];

/**
 * 掲載するAIツールと役割（折りたたみ内に表示）。開発記録・運用で確認できた範囲に限る。
 * Claude（チャット版）・Gemini・Antigravity は、この図解での役割を確認できるまで載せない。
 * 本番公開そのものはVercel等が行うため、AIが単独で本番公開する表現にしない。
 */
export const aiWorkflowTools = [
  { name: "ChatGPT", role: "課題整理・要件定義支援・作業指示・レビュー支援" },
  { name: "Claude Code", role: "技術設計・実装・テスト・リリース作業" },
  { name: "Codex", role: "実装・テスト・コードレビュー・検証" },
];

/** AIモデルではない補助ツール。公開済みの説明範囲を超える内容（内部構成・構想）は載せない。 */
export const aiWorkflowSupports = [
  { name: "Obsidian", role: "記録・ナレッジ管理", href: "/works#case-obsidian-ai" },
  {
    name: "AI Development Hub",
    role: "複数AIの開発状況・進捗確認",
    href: "/works#work-ai-development-hub",
  },
];

export const aiWorkflowNotes = [
  "ツールは作業内容や難易度に応じて使い分けています。",
  "現在のAI活用方法を一般化した概念図です。すべてのAIが同時に稼働し、各工程が自動で連携していることを示すものではありません。",
];

/**
 * 品質管理の実践例（2026年11月24〜25日のポートフォリオ更新）。
 * AI Development Hub が自動で検出・停止・再開した事例ではない。
 * 事実確認時と再開時の担当AIを記録で特定できないため「開発担当AI」と表記する。
 */
export const qualityCheckCase = {
  title: "事実と指示に矛盾があれば止める。未確認事項は明示し、人が判断する。",
  body: "ポートフォリオの更新時に、本番反映済みという指示と開発記録の食い違いをAIが検出したため、実装を保留しました。リリース確認後に作業を再開し、テスト・レビュー・人間による承認を経て公開しました。",
  roles: [
    { actor: "人間", role: "掲載判断・最終承認" },
    { actor: "ChatGPT", role: "掲載設計・作業指示・レビュー支援" },
    { actor: "開発担当AI", role: "事実確認・実装・テスト" },
  ],
  link: { label: "関連するCase Study：SES営業交流会 申込サイト", href: "/works#case-ses-meetup" },
};
