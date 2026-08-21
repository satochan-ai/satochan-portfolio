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

/** 事実ベースの数字のみ。推測値・誇張値は載せない。 */
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
  {
    value: "登壇",
    label: "AI活用ミニ講座",
    note: "2026年8月 第1回実施 / 9月 第2回予定",
  },
  {
    value: "実運用",
    label: "Web・業務ツール",
    note: "モックではなく、実際に使われている状態で運用",
  },
];

export type ContactChannel = {
  label: string;
  /** 正式な連絡先が確定するまでは null。架空の連絡先は置かない。 */
  href: string | null;
  value: string | null;
};

/**
 * 公開前フェーズで正式情報を追加する。
 * href / value が null の間は UI 側で CTA を出さない。
 */
export const contactChannels: ContactChannel[] = [
  { label: "Email", href: null, value: null },
  { label: "お問い合わせフォーム", href: null, value: null },
];

export const contactTopics = [
  "生成AIの業務活用・社内導入のご相談",
  "営業・採用まわりの業務改善",
  "Webサイト・業務ツールの開発",
  "AI活用に関する講座・勉強会の登壇",
];
