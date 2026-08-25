@AGENTS.md

# satochan-portfolio プロジェクトルール

SES営業・採用・AI活用・業務改善等の実務経験をまとめた個人ポートフォリオサイト。
実際の経験年数・実績数値は`src/content/site.ts`等のコンテンツデータを正本とする。
Next.js（`src/app/`構成）+ React + TypeScript + Tailwind CSS。

## 公開情報の事実性
- 未確認の実績・数値を追加しない。誇張表現を追加しない。
- 実装で確認できていない技術を掲載しない。
- 確定していない数字を推測で掲載しない。
- 概算値を掲載する場合は、その旨と根拠が分かる注記（footnote等）を維持する。
- 実績・経験年数などの具体的な値をこのファイルへ転記しない。数値は`src/content/`側を正本とする。

## 非公開情報
- 取引先企業名・担当者名・単価・契約条件・商流・営業記録原文は掲載しない
  （`src/content/works.ts`に既存ルールあり）。
- スクリーンショットや画像を新規追加・差し替えする場合は、企業名・個人情報・非公開の社内情報等が
  写っていないか確認する。

## Contact / 外部リンク
- 現時点でコード上確認されている公開外部リンクはGitHubのみ（`src/content/site.ts`の`contactChannels`）。
- メール・X等について、公開先が確認できていないものを推測して追加しない。架空のURL・アドレスを作らない。
- `contactChannels`のnull運用（正式な連絡先が確定するまでnullのまま維持する設計）を勝手に埋めない。
- Formspreeの`FORMSPREE_FORM_ID`はサーバー専用として扱い、クライアントへ公開しない。

## 外部依存
- 現在はDB・CMS・認証・アニメーションライブラリを使用していない。
- 新しい外部依存の導入は、必要性を説明しユーザー確認なく行わない。
- 単なる見た目の改善や小規模機能追加のために、不必要な依存を増やさない。

## SEO / metadata
- `getSiteUrl()`（`src/content/site.ts`）のnullガードを維持する。本番URLが確認できない状態で
  架空URLをハードコードしない。
- `layout.tsx`のmetadataBase / canonical、`sitemap.ts`、`robots.ts`の既存ガード構造
  （URL未確定時は出力しない）を壊さない。

## 参照ドキュメント
- README.md（プロジェクト概要・Notes）
- `src/content/site.ts` / `works.ts` / `caseStudies.ts`（事実性・非公開情報ルールの正本）
