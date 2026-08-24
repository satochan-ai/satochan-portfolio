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

export type Service = {
  no: string;
  title: string;
  problem: string;
  support: string;
  examples: string[];
  relatedWorks: string[];
};

export const services: Service[] = [
  {
    no: "01",
    title: "AI活用・業務改善",
    problem: "AIを業務に使いたいが、どこから始めればよいか分からない。",
    support:
      "業務フローを整理し、AIに任せる工程と人が判断する工程を切り分けます。繰り返し業務は、小さく試せる運用へ落とし込みます。",
    examples: ["業務棚卸し", "AI活用候補の整理", "判断工程の切り分け", "繰り返し業務の標準化"],
    relatedWorks: ["Obsidian × AI ナレッジ活用", "AI Workflow / Business Skills"],
  },
  {
    no: "02",
    title: "SES営業の仕組み化",
    problem: "営業情報や次のアクションが、担当者の記憶に依存している。",
    support:
      "営業フロー、KPI、商談・案件・BP情報、フォロー運用を整理し、状況と次の行動が見える形を設計します。",
    examples: ["営業フロー整理", "KPI設計", "BP営業", "商談 / 案件管理", "フォロー運用"],
    relatedWorks: ["MatchPilot", "MatchFollow"],
  },
  {
    no: "03",
    title: "採用業務改善",
    problem: "選考状況や評価理由が分散し、採用活動の停滞要因が分からない。",
    support:
      "募集から面談、選考、フォローまでを棚卸しし、管理項目や判断基準を標準化します。必要に応じてAI活用も組み込みます。",
    examples: ["採用フロー整理", "面談 / 選考情報整理", "判断基準の標準化", "採用状況の可視化"],
    relatedWorks: ["MatchHire"],
  },
  {
    no: "04",
    title: "改善に必要なWeb・業務ツール試作",
    problem: "表計算や手作業だけでは限界だが、大規模な開発を始める段階ではない。",
    support:
      "課題と必要機能を整理し、フォーム、Dashboard、管理ツールなどをPrototype / MVPとして小さく形にします。",
    examples: ["申込 / 入力フォーム", "Dashboard", "管理画面", "小規模業務ツール", "Prototype / MVP"],
    relatedWorks: ["SES営業交流会 申込サイト", "MeetRoute", "領収証生成ツール"],
  },
];

export const commonConsultationIssues = [
  "AIを使いたいが、対象業務を決められていない",
  "営業情報が人ごとに分かれ、次の行動が見えない",
  "採用フローや評価基準が担当者に依存している",
  "同じ入力・確認・転記を繰り返している",
  "既存ツールでは合わないが、大規模開発までは必要ない",
];

export const supportProcess = [
  "課題を伺う",
  "業務を整理する",
  "小さく試す",
  "必要なら実装する",
  "確認・改善する",
];
