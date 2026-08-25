export type ConsultationProblem = {
  no: string;
  text: string;
};

export const consultationProblems: ConsultationProblem[] = [
  {
    no: "01",
    text: "AIを業務に使いたいが、どこから始めればよいか分からない。",
  },
  {
    no: "02",
    text: "営業情報や次のアクションが、担当者の記憶に依存している。",
  },
  {
    no: "03",
    text: "採用フローや評価基準が、担当者ごとにばらついている。",
  },
  {
    no: "04",
    text: "手作業では限界だが、大規模開発までは必要ない。",
  },
];

export type RelatedWork = {
  name: string;
  /** このServiceの根拠として何を示しているか。Works本文の転記はしない。 */
  reason: string;
  /** 参照先がSelected Works以外のSectionの場合のみ指定する（既定は /#works）。 */
  href?: string;
};

export type Service = {
  no: string;
  title: string;
  /** Before にあたる状態。after と対になる。 */
  problem: string;
  support: string;
  /** 整理後に目指す状態。成果保証ではなく、未実測の数値も含めない。 */
  after: string;
  /** AIと人の役割分担など、設計上の前提を明示したい場合のみ設定する。 */
  principle?: string;
  examples: string[];
  relatedWorks: RelatedWork[];
};

export const services: Service[] = [
  {
    no: "01",
    title: "AI活用・業務改善",
    problem: "AIを業務に使いたいが、どこから始めればよいか分からない。",
    support:
      "業務フローを整理し、AIに任せる工程と人が判断する工程を切り分けます。繰り返し業務は、小さく試せる運用へ落とし込みます。",
    after: "AIに任せる工程と人が判断する工程が、業務フローの中で切り分けられている。",
    examples: ["業務棚卸し", "AI活用候補の整理", "判断工程の切り分け", "繰り返し業務の標準化"],
    relatedWorks: [
      {
        name: "Obsidian × AI ナレッジ活用",
        reason: "記録をAIで分析できる形に整理した仕組み。",
      },
      {
        name: "AI Workflow / Business Skills",
        reason: "業務手順と判断基準をAI向けに整理した取り組み。",
        href: "/#ai-workflow",
      },
    ],
  },
  {
    no: "02",
    title: "SES営業の仕組み化",
    problem: "営業情報や次のアクションが、担当者の記憶に依存している。",
    support:
      "営業フロー、KPI、商談・案件・BP情報、フォロー運用を整理し、状況と次の行動が見える形を設計します。",
    after: "状況と次のアクションを、チームで同じ基準で追える。",
    examples: ["営業フロー整理", "KPI設計", "BP営業", "商談 / 案件管理", "フォロー運用"],
    relatedWorks: [
      {
        name: "MatchPilot",
        reason: "営業状況と次アクションを判断するための設計。",
      },
      {
        name: "MatchFollow",
        reason: "稼働後の契約・請求・フォローを扱う試作。",
      },
    ],
  },
  {
    no: "03",
    title: "採用業務改善",
    problem: "選考状況や評価理由が分散し、採用活動の停滞要因が分からない。",
    support:
      "募集から面談、選考、フォローまでを棚卸しし、管理項目や判断基準を標準化します。必要に応じてAI活用も組み込みます。",
    after: "採用フローと判断基準が整理され、停滞している箇所が見える。",
    principle:
      "AIは情報整理や比較を支援し、候補者との対話や最終判断は人が行う前提で設計します。",
    examples: ["採用フロー整理", "面談 / 選考情報整理", "判断基準の標準化", "採用状況の可視化"],
    relatedWorks: [
      {
        name: "MatchHire",
        reason: "採用の停滞とNG理由を可視化した公開デモ。",
        href: "/#matchhire",
      },
    ],
  },
  {
    no: "04",
    title: "改善に必要なWeb・業務ツール試作",
    problem: "表計算や手作業だけでは限界だが、大規模な開発を始める段階ではない。",
    support:
      "課題と必要機能を整理し、フォーム、Dashboard、管理ツールなどをPrototype / MVPとして小さく形にします。",
    after: "必要な機能だけを小さく試し、本格的に作るべきか判断できる。",
    examples: ["申込 / 入力フォーム", "Dashboard", "管理画面", "小規模業務ツール", "Prototype / MVP"],
    relatedWorks: [
      {
        name: "SES営業交流会 申込サイト",
        reason: "申込から当日運用までを実運用している事例。",
      },
      {
        name: "MeetRoute",
        reason: "候補日時の受付と承認を整理した試作。",
      },
      {
        name: "領収証生成ツール",
        reason: "手作業の発行業務を小さく形にした事例。",
      },
    ],
  },
];

export type UseCaseCategory = {
  no: string;
  title: string;
  cases: string[];
};

export const useCaseCategories: UseCaseCategory[] = [
  {
    no: "01",
    title: "営業・SES",
    cases: [
      "商談前の企業情報を整理する",
      "案件・人材情報を比較しやすくする",
      "BP企業との接点と次のアクションを管理する",
    ],
  },
  {
    no: "02",
    title: "採用・人事",
    cases: [
      "求人情報と候補者情報を整理する",
      "面談記録と選考・NG理由を整理する",
      "採用フローの進捗を見えるようにする",
    ],
  },
  {
    no: "03",
    title: "AI・ナレッジ活用",
    cases: [
      "過去の営業・商談記録を再利用する",
      "業務手順や判断基準をSkillとして整理する",
      "提案書やメールの下書きを支援する",
    ],
  },
  {
    no: "04",
    title: "業務運用・小規模ツール",
    cases: [
      "申込受付や日程調整を管理する",
      "同じ入力・確認・転記を減らす",
      "PDF・帳票やDashboardを小さく試す",
    ],
  },
];

export const supportProcess = [
  "課題を伺う",
  "業務を整理する",
  "小さく試す",
  "必要なら実装する",
  "確認・改善する",
];
