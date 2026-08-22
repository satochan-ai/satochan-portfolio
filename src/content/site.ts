export const site = {
  name: "satochan",
  tagline: "SES営業 × 採用 × AI活用 × 業務改善",
  description:
    "SES営業・採用の現場経験をもとに、AI活用、業務改善、Web・業務ツール開発まで。課題整理から設計、実装、運用まで一貫して取り組んでいます。",
  hero: {
    headline: "現場を知っているから、\nAIを実務に変えられる。",
    sub: "SES営業・採用の現場経験をもとに、AI活用、業務改善、Web・業務ツール開発まで。課題整理から設計、実装、運用まで一貫して取り組んでいます。",
  },
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
  { href: "#works", label: "Works" },
  { href: "#what-i-do", label: "What I Do" },
  { href: "#case-study", label: "Case Study" },
  { href: "#ai-workflow", label: "AI Workflow" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
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
    note: "提案・商談・BP開拓・営業マネジメント",
  },
  {
    value: "10",
    unit: "年",
    label: "採用",
    note: "母集団形成から面接・入社後フォローまで",
  },
  {
    value: "1,500",
    unit: "+",
    label: "営業・商談接点",
    note: "企業・技術者との接点の累計",
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
