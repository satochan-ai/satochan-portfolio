# Cloudflare Backup Deploy Runbook

このドキュメントはサイトの一部ではなく、Cloudflare Pages（Backup）へ deploy するための運用手順です。

---

## 位置づけ

| 項目 | 内容 |
|---|---|
| Primary hosting | Vercel（https://satochan-portfolio.vercel.app/） |
| Backup hosting | Cloudflare Pages（https://satochan-portfolio.pages.dev/） |
| Git の正本 | local repository |
| Cloudflare deploy | GitHub 非依存（local の commit から Direct Upload） |

- Validated with: Wrangler 4.141.0（手順中のコマンドもこの version で固定している）。将来の version 更新は禁止しないが、更新時は Pages project・Pages Functions・Direct Upload・Secret・deploy の挙動を再確認する。
- Cloudflare 版は Backup。canonical / sitemap / OGP は常に Vercel Primary を指す。
- GitHub が使えない間も、commit 済みの local repository があれば Cloudflare へ deploy できる。これが Backup 運用の主目的。

---

## 現在の構成

| | Vercel（Primary） | Cloudflare Pages（Backup） |
|---|---|---|
| build | 通常の Next.js build（`npm run build`） | Next.js static export（`npm run build:cloudflare`） |
| 画像 | `next/image` 標準最適化 | `images.unoptimized` |
| `/api/contact` | Next.js Route Handler（`src/app/api/contact/route.ts`） | Pages Functions（`functions/api/contact.ts`） |
| 公開方法 | GitHub 連携の自動 deploy | Direct Upload（GitHub integration なし） |

---

## 関連ファイル

| ファイル | 役割 |
|---|---|
| `cloudflare/wrangler.toml` | Cloudflare Pages の Wrangler 設定（project 名・出力先・compatibility_date の正本）。 |
| `scripts/build-cloudflare.mjs` | 元の作業ツリーを変えずに隔離コピーで static export し、Functions compile と成果物検査まで行う。 |
| `functions/api/contact.ts` | Cloudflare 用のお問い合わせ受け口（Pages Functions）。Formspree へ転送する。 |
| `src/app/api/contact/route.ts` | Vercel 用のお問い合わせ受け口（Route Handler）。Cloudflare build では隔離コピーから除外される。 |
| `src/lib/contact.ts` | 入力 validation。Vercel / Cloudflare の両方から使う。 |
| `next.config.ts` | `CLOUDFLARE_STATIC_EXPORT=1` のときだけ `output: "export"` / `images.unoptimized` を有効にする。 |
| `package.json` | `build:cloudflare` script。通常の `build` は Vercel 用のまま。 |

---

## Wrangler 設定

`cloudflare/wrangler.toml` の重要項目:

- `name = "satochan-portfolio"`
- `pages_build_output_dir = "out"`
- `compatibility_date = "2026-09-25"`

このファイルは build script が隔離 build root（`.next/cloudflare-build/`）へ `wrangler.toml` としてコピーする。`pages_build_output_dir` は隔離 build root 基準の値なので、**repository root から deploy しない**。

---

## Secret

| KEY | 用途 |
|---|---|
| `FORMSPREE_FORM_ID` | Pages Functions から Formspree へ送信するためのフォーム ID |

- Secret の値そのものは、docs・Git・チャット等に書かない。
- 値は Formspree のエンドポイント URL（`https://formspree.io/f/XXXXXXXX`）全体ではなく、末尾の `XXXXXXXX` 部分のみ。

### 登録時の注意（2026-09 の実例）

`wrangler pages secret put FORMSPREE_FORM_ID` で登録した際、`pages secret list` や Pages API では KEY（`secret_text`）が存在していたのに、Functions の実行時には未設定扱い（503）になったことがある。

- `pages secret list` で KEY が見えるだけでは、値が入っている証明にならない。
- Dashboard から値を手入力して保存し直し、新しい deployment を作った後に成功した。
- 正常 POST が `200 {"success":true}` になって初めて、Secret binding を確認できた。

CLI が必ず失敗するという意味ではなく、今回確認された事実として記録する。

### 推奨の更新手順

1. Cloudflare Dashboard → `satochan-portfolio` → Settings → Variables and Secrets → Production
2. `FORMSPREE_FORM_ID` を編集し、値を入力して Encrypt のまま保存
3. 新しい deployment を作る（Secret の変更は、変更後に作成した deployment から反映される）
4. 「Contact API QA」と「実送信確認」を行う

---

## Deploy 前提条件

- [ ] tracked working tree が clean（`git status`）
- [ ] deploy 対象の commit を確認（`git log --oneline -1`）
- [ ] Cloudflare に login 済み（`npx wrangler@4.141.0 whoami`）
- [ ] `satochan-portfolio` project が存在する
- [ ] `FORMSPREE_FORM_ID` が Production に登録済み
- [ ] Primary URL が `https://satochan-portfolio.vercel.app` のまま
- [ ] GitHub の状態は Cloudflare deploy に影響しない

未追跡の `docs/research/` や `tmp/` があっても、build はコミット（`--ref`）から取り出すため deploy 対象には含まれない。

---

## Cloudflare build

`NEXT_PUBLIC_SITE_URL`（Primary URL）の指定は必須。未設定、`http://`、localhost、`*.pages.dev` を指定すると build script が失敗する。

PowerShell:

```powershell
$env:NEXT_PUBLIC_SITE_URL = "https://satochan-portfolio.vercel.app"
npm run build:cloudflare -- --ref=HEAD
Remove-Item Env:NEXT_PUBLIC_SITE_URL
```

Git Bash:

```bash
NEXT_PUBLIC_SITE_URL=https://satochan-portfolio.vercel.app npm run build:cloudflare -- --ref=HEAD
```

成功条件（script の出力で確認）:

- `ソース: git archive <commit>` が deploy 対象の commit
- 成果物検査が 14 項目すべて `PASS`
- `Compiled Worker successfully`（Functions compile）
- `元リポジトリのソース・git status に変化がないことを確認しました。`

### build の順序

通常の `npm run build` を Cloudflare build の後に実行すると、`.next/` 配下の Cloudflare 成果物が消える。

**deploy 直前の最後の build は必ず `npm run build:cloudflare -- --ref=HEAD`（または対象 commit）にする。**

### build 成果物

隔離 build root `.next/cloudflare-build/` に次の 3 つがそろっていること:

- `wrangler.toml`
- `out/`
- `functions/`

---

## Deploy 手順

deploy は必ず `.next/cloudflare-build/` から行う。project 名と出力先（`out`）は `wrangler.toml` から読まれる。

```powershell
git rev-parse HEAD
cd .next/cloudflare-build
npx wrangler@4.141.0 pages deploy --branch main --commit-hash <FULL_COMMIT_HASH> --commit-message "<commit message>"
cd ../..
```

- `--branch main` で Production deployment になる（production branch は `main`）。
- `--commit-dirty=true` は通常使用しない。「uncommitted changes」の警告が出た場合は、まず `git status` で原因を確認する。deploy 対象と無関係な既知の未追跡ファイル（`docs/research/`・`tmp/` など）だけであることを確認できた場合に限り、使用を検討する。警告を単に消す目的では使用しない。
- deploy 後、`npx wrangler@4.141.0 pages deployment list --project-name satochan-portfolio` で、新しい deployment が `Production / main / <commit>` になっていることを確認する。

### deploy してはいけない場所

repository root から deploy しない。root の `out/` は古い成果物の可能性があり、誤公開の危険がある。

---

## Production 確認

### Static

- [ ] `GET /` → 200
- [ ] `GET /services` → 200
- [ ] 存在しない URL → 404
- [ ] CSS / JS（`/_next/static/...`）→ 200
- [ ] Works 画像 → 200
- [ ] OG 画像（`/opengraph-image.png`, `/twitter-image.png`）→ 200

### UI

- [ ] 1440px / 375px で Hero と ContactForm が表示される
- [ ] 横スクロールがない

### SEO

- [ ] canonical: TOP は `https://satochan-portfolio.vercel.app`、services は `https://satochan-portfolio.vercel.app/services`
- [ ] sitemap / robots / `og:url` / `og:image` / `twitter:image` が Primary URL を指す
- [ ] `localhost` / `127.0.0.1` を含まない
- [ ] `pages.dev` が canonical に使われていない

### `/icon`（Known issue / Non-blocking）

Cloudflare では `/icon` が `Content-Type: application/octet-stream` + `nosniff` で返る。HTTP 200 で、ブラウザでは favicon として 64×64 で読み込めるため、現状は問題としない。毎回の確認は不要で、大きな変更時だけ確認する。

---

## Contact API QA

Formspree へ実送信されない確認（毎 deploy で実施してよい）:

| リクエスト | 期待 |
|---|---|
| `GET /api/contact` | 405（`Allow: POST`） |
| 不正な JSON（`Content-Type: application/json`） | 400 |
| 必須項目欠落など | 400（項目別エラー） |
| 16KiB 超 | 413 |
| honeypot（`website` に値あり） | 200 `{"success":true}`（Formspree へは送らない） |

### 実送信確認

新規環境の構築時と Secret 更新時のみ、正常 POST を **1 回だけ** 行う。

- 期待: `200 {"success":true}`（Formspree が受け付けた場合のみ 200 になる）
- テスト用と分かる内容にする（例: 名前 `Cloudflare Production Test`、内容 `No response required.`）。個人情報や機密情報は使わない。
- 失敗しても追加送信を繰り返さない。
- 通常の deploy では毎回実送信しなくてよい。

Functions のログを見る場合は、**完全な deployment ID** を指定する（短縮 ID では失敗する）:

```bash
npx wrangler@4.141.0 pages deployment tail <FULL_DEPLOYMENT_ID> --project-name satochan-portfolio --format pretty
```

### 503 のとき

`503` で、ログに `FORMSPREE_FORM_ID is not configured.` が出る場合:

1. KEY の有無だけでなく、値が正しく保存されているかを疑う
2. Dashboard の Production → Variables and Secrets から `FORMSPREE_FORM_ID` を保存し直す
3. 新しい deployment を作成する
4. 新しい deployment で確認する

---

## 過去のトラブル事例

1. **`spawnSync` ENOBUFS**: `git archive` の出力（約 2.2MB）が Node の既定 `maxBuffer`（1MB）を超えて失敗した。build script で `maxBuffer` を拡大済み。
2. **wrangler.toml と Secret の関係を疑った件**: Secret が読めなかったため `wrangler.toml` なしの deploy も検証したが、503 は変わらなかった。設定ファイルは原因ではなかった。
3. **Secret の KEY はあるのに値が空**: API 上は `FORMSPREE_FORM_ID`（`secret_text`）が project と deployment に存在していたが、実行時は未設定扱いだった。Dashboard から値を保存し直した後、`200 {"success":true}` になった。
4. **Windows で wrangler 停止後にプロセスが残る**: `pages dev` を止めても `node` / `workerd` が残り、`.next/` がロックされて `npm run build` が EBUSY になることがあった。自分で起動した wrangler / workerd を確実に停止してから再 build する。
5. **tail は完全な deployment ID が必要**: 短縮 ID では API エラーになる。

---

## Deploy 後の Git 確認

Cloudflare deploy は source を変更しない。`git status` で tracked working tree が clean のままであることを確認する。

---

## Vercel

Cloudflare deploy では Vercel を変更しない。GitHub が使える状態になったら、local `main` の commit を push し、Vercel の自動 deploy を確認する。

---

## Recovery 用途

GitHub が使えない場合でも、commit 済みの local repository があれば次の流れで Cloudflare へ deploy できる。

1. `npm run build:cloudflare -- --ref=<commit>`（Primary URL を指定）
2. `.next/cloudflare-build/` から `pages deploy --branch main --commit-hash <commit>`
3. Production 確認・Contact API QA

---

## 安全ルール

- repository root から deploy しない
- Secret の値を Git・docs に書かない
- Formspree のフォーム ID を公開しない
- deploy 前に commit hash を確認する
- Cloudflare build の後に通常の build をしない（成果物が消える）
- 実送信テストを繰り返さない
- Production は `main` branch
- Vercel を Primary として維持する
