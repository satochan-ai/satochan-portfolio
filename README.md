# satochan-portfolio

SES営業・採用の現場経験をもとに、AI活用・業務改善・Web / 業務ツール開発に取り組む個人ポートフォリオサイト。

**Production:** https://satochan-portfolio.vercel.app

## このサイトの目的

「営業・採用の現場を理解した上で、AIを使って業務を改善し、必要なら自分で仕組みやツールまで作れる」という立ち位置を、実際に運用しているものを通して伝えることを目的としています。

制作物の一覧ではなく、`Problem → Approach → Solution → Impact` の流れで、何を課題と捉えてどう設計したかが分かる構成にしています。掲載しているのは公開可能な事実のみで、実装で確認できていない技術や、推測した数値は載せていません。

## Tech Stack

- Next.js (App Router) / React
- TypeScript
- Tailwind CSS
- Vercel

外部依存は最小限にしています。DB・CMS・認証・アニメーションライブラリは使用していません。

## Sections

| Section | 内容 |
| --- | --- |
| Hero | メインメッセージ |
| Proof | 実績サマリー（事実ベースの数値のみ） |
| Selected Works | 実運用中のサイト・ツールなど5件 |
| What I Do | 対応領域4つ |
| Case Study | SES営業交流会 申込サイト / Obsidian × AI |
| AI Workflow | Research → Think → Build → Verify → Operate → Improve |
| About | 経歴と現在の取り組み |
| Speaking | 登壇実績 |
| Technology | 使用している技術・サービス |
| Contact | 相談可能な内容と進め方 |

## Local Development

```bash
npm install
npm run dev
```

http://localhost:3000 で確認できます。

```bash
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run build      # 本番ビルド
```

## Notes

- 本番URLは `getSiteUrl()`（`src/content/site.ts`）で一元管理しています。Vercel では `VERCEL_PROJECT_PRODUCTION_URL` から自動解決され、独自ドメイン設定時は `NEXT_PUBLIC_SITE_URL` を設定すれば canonical / sitemap / OGP に反映されます。
- OGP画像とfaviconはコードから生成しており、画像生成AIは使用していません。
