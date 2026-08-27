<!-- BEGIN:nextjs-agent-rules -->

# これは、あなたが知っているNext.jsとは異なる

このversionにはbreaking changeがあり、API、規約、ファイル構成が学習データと異なる場合がある。コードを書く前に、`node_modules/next/dist/docs/`の関連guideを読むこと（このファイルのdirectoryから解決する。monorepoでは`next` packageがrepository rootから見えない場合がある）。deprecation noticeに従うこと。

このblockは`next dev`が書き込み、再追加する。`node_modules/next/dist/server/lib/generate-agent-files.js`で確認すること。diffから削除しても未commit変更が再作成されるだけなので、作業とともにcommitするとtreeをcleanに保てる。

<!-- END:nextjs-agent-rules -->

## Projectの目的とpositioning

このportfolioは単なるsoftware engineeringの実績紹介ではない。中心となるpositioningは、SES営業・採用の経験、実務でのAI活用、業務改善、必要に応じた実装の組み合わせである。

domain knowledge、課題定義、workflow改善、実装、知識共有をつなげて見せること。明示的に依頼されない限り、「AI Engineer」や「Full-Stack Developer」のような一般的な肩書きへsiteを書き換えないこと。

## Contentのsource of truth

公開contentの主要なsourceとして、次のファイルを扱うこと。

- `src/content/site.ts`
- `src/content/works.ts`
- `src/content/services.ts`
- `src/content/caseStudies.ts`

presentation componentに不要な重複hard-coded factを作らないこと。数値、status、link、説明、主張を変更する場合は、content sourceと影響を受けるすべてのsectionをまとめて確認すること。READMEとinternal noteはreferenceであり、自動的に唯一のsource of truthとはしないこと。

## Audienceとmessage

このsiteの対象は、AIまたはworkflow改善を求める経営者・企業担当者、SES営業・採用責任者、Webまたは業務toolの依頼者、採用・業務の相談者、AI研修・登壇の主催者である。

業務課題、AIまたは実装の使い方、何が変わったかを通じて価値を説明すること。tool名やtechnical termで実務上の成果を置き換えないこと。

## Heroとbrand positioning

Heroはpositioning上重要な領域である。現場経験、AI、業務改善、実装の関係を維持すること。copyを短縮する場合も、実際の業務を理解し、改善を実践する価値を消さないこと。

## Business skillとAI tool

可能な範囲で、AI toolやtechnologyを目的、対象業務、workflow、役割、実証された成果とともに示すこと。tool名だけを実績として扱わないこと。

technologyやserviceの名称は時間とともに変わる。実際に使用しているか、実装から説明できるtoolだけを追加し、一時的なproduct名やmodel名にportfolioを依存させないこと。

## Worksと根拠

Worksは事実に基づく根拠として管理すること。変更前にproject status、production status、technology、role、business value、quantitative result、live URL、repository link、public availabilityを確認すること。

Prototype、Demo、Live / Production、Speaking、Personalなどの区別を維持すること。未公開、開発中、計画中のworkを完了済みまたはproduction-readyとして示さないこと。新しいworkでは、Problem → Approach → Solution → Impactの明確な説明を優先すること。

## 事実性と公開status

経験年数、project数、skill数、登壇歴、資格、売上、時間削減、user数、conversion結果、その他のmetricを推測または誇張しないこと。見積もりを説明するnoteを保持し、予定されたeventと完了したeventを区別すること。

もっともらしい、または似たprojectでは一般的という理由だけでclaimを追加しないこと。「AIが提案した」は根拠ではない。公開する主張は、実装、source content、または適切なprimary recordに照らして確認すること。

## Imageと機密情報の安全

画像を追加・置換する前に、公開承認済みであり、顧客名、未承認の会社名、個人名、email address、phone number、internal sales data、contract information、confidential UI dataを含まないことを確認すること。

maskingやanonymizationを元に戻したり、original imageから情報を復元したり、sanitized screenshotを元データ公開の許可とみなしたりしないこと。

## Contactと外部link

repository contentで明示的に確認できるcontact channelとexternal linkだけを使うこと。記憶や古いcontextからemail、X、LinkedIn、その他の個人contact情報を推測・再作成しないこと。新しいlinkは、存在し、公開され、意図したprojectに属することを確認すること。

## Contact formの安全

contact formはNext.js Route Handlerとexternal form serviceを使う。server-side validation、payload-size limit、honeypot field、generic error response、timeout/error handling、form service identifierのserver-only handlingを維持すること。

form service identifierやその他のserver configurationをclient bundle、public content、log、exampleに公開しないこと。

## SEOとmetadata

SEOのためにtitle、role、experience、resultを誇張しないこと。metadataやrouteを変更する場合は、title、description、canonical、Open Graph、Twitter card、sitemap、robots behaviorをまとめて確認すること。

`getSiteUrl()`のnull guardを維持すること。site URLを解決できない場合に架空のcanonical、sitemap、social URLを生成せず、このファイルにenvironment-specificなproduction valueをhard-codeしないこと。

## Responsive UX

UI変更はdesktopとmobileの両方を考慮するまで未完了である。mobile navigation、Hero copy、works card、long text、CTA layout、image、form、external linkを確認すること。desktopだけのvisual reviewに依存しないこと。

## Dependencyとarchitectureの境界

現行siteは、database、CMS、authentication system、animation frameworkを持たない軽量なarchitectureとして意図的に構成されている。見た目の改善や小さなcontent変更のためにdependencyやnew infrastructureを追加しないこと。その追加は、明確な理由を要するarchitecture decisionとして扱うこと。

## validationと検証

変更内容に応じて確認を選ぶこと。

- UIまたはTypeScript: 必要に応じて`npm run lint`、`npm run typecheck`、`npm run build`
- contentまたはworks: fact、status、link、evidence、wordingを確認
- image: confidential informationとmasking integrityを確認
- metadataまたはroute: canonical、OGP、sitemap、robots behaviorを確認
- contact: validation、honeypot、server handling、external submission、error behaviorを確認
- すべてのdiff: `git diff --check`

可能な場合は、代表的なdesktopおよびmobile viewportを使い、external linkを確認すること。実際に実行していない確認を報告しないこと。

## Deploymentとenvironmentの安全

Vercelはdeployment modelの一部だが、repository内容だけではproduction branch、automatic deployment rule、現在のexternal settingは確定しない。重要な場合は事実を確認すること。

local implementationやcontent taskをdeploymentまたはexternal configuration変更へ拡張しないこと。repositoryのdeployment integrationがリスクを示す場合、pushはproductionに関係する可能性があるものとして扱うこと。

## 完了時の確認

portfolio作業では、次への関連する影響を報告すること。

- positioningとaudience
- content sourceの整合性
- factual accuracyとpublication status
- confidential informationとimage masking
- external linkとcontact form
- SEO metadataとindexing
- mobile UX
- deployment behavior
