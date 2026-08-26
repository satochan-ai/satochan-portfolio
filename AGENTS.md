<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project Purpose and Positioning

This portfolio is not merely a software-engineering showcase. Its core positioning is the combination of SES sales and recruiting experience, practical AI use, business improvement, and implementation when needed.

Keep domain knowledge, problem definition, workflow improvement, implementation, and knowledge sharing connected. Do not rewrite the site toward generic labels such as “AI Engineer” or “Full-Stack Developer” unless that positioning is explicitly requested.

## Content Sources of Truth

Treat these files as the primary sources for public content:

- `src/content/site.ts`
- `src/content/works.ts`
- `src/content/services.ts`
- `src/content/caseStudies.ts`

Do not create unnecessary duplicate hard-coded facts in presentation components. When changing numbers, statuses, links, descriptions, or claims, check the content source and every affected section together. README files and internal notes are references, not automatically the sole source of truth.

## Audience and Messaging

The site addresses business owners and company representatives seeking AI or workflow improvement, SES sales or recruiting leaders, people requesting Web or business-tool work, hiring or work contacts, and AI training or speaking organizers.

Explain value through the business problem, how AI or implementation is used, and what changed. Do not let tool names or technical terms replace the practical outcome.

## Hero and Brand Positioning

The Hero is a positioning-critical area. Preserve the relationship between field experience, AI, business improvement, and implementation. Shortening copy must not erase the value of understanding real work and applying improvements in practice.

## Business Skills and AI Tools

Present AI tools and technologies with their purpose, target work, workflow, role, or demonstrated outcome where possible. Do not treat a tool name as an achievement by itself.

Technology and service names change over time. Add only tools that are actually used or explainable from the implementation, and do not make the portfolio dependent on a temporary product or model name.

## Works and Evidence

Manage works as factual evidence. Verify project status, production status, technology, role, business value, quantitative results, live URLs, repository links, and public availability before changing them.

Preserve distinctions such as Prototype, Demo, Live / Production, Speaking, and Personal. Do not present unpublished, in-development, or planned work as completed or production-ready. Prefer a clear Problem → Approach → Solution → Impact explanation for new work.

## Factuality and Publication Status

Do not guess or embellish experience years, project counts, skill counts, speaking history, qualifications, revenue, time savings, user counts, conversion results, or other metrics. Preserve notes explaining estimates and distinguish planned events from completed ones.

Do not add a claim merely because it sounds plausible or is common for a similar project. “The AI suggested it” is not evidence; verify public claims against the implementation, source content, or an appropriate primary record.

## Image and Confidential Information Safety

Before adding or replacing images, verify that they are approved for publication and contain no customer names, unapproved company names, personal names, email addresses, phone numbers, internal sales data, contract information, or confidential UI data.

Do not reverse masking or anonymization, restore information from an original image, or treat a sanitized screenshot as permission to publish the underlying data.

## Contact and External Links

Use only contact channels and external links explicitly confirmed in repository content. Do not infer or recreate email, X, LinkedIn, or other personal contact details from memory or older context. For a new link, verify that it exists, is public, and belongs to the intended project.

## Contact Form Safety

The contact form uses a Next.js Route Handler and an external form service. Preserve server-side validation, payload-size limits, the honeypot field, generic error responses, timeout/error handling, and server-only handling of the form service identifier.

Do not expose the form service identifier or other server configuration in client bundles, public content, logs, or examples.

## SEO and Metadata

Do not exaggerate a title, role, experience, or result for SEO. When changing metadata or routes, check title, description, canonical, Open Graph, Twitter card, sitemap, and robots behavior together.

Preserve the null guard in `getSiteUrl()`. Do not generate fictional canonical, sitemap, or social URLs when the site URL is unresolved, and do not hard-code environment-specific production values in this file.

## Responsive UX

UI changes are incomplete until both desktop and mobile behavior have been considered. Check mobile navigation, Hero copy, works cards, long text, CTA layout, images, forms, and external links. Do not rely on a desktop-only visual review.

## Dependency and Architecture Boundary

The current site intentionally has a lightweight architecture without a database, CMS, authentication system, or animation framework. Do not add dependencies or new infrastructure for a cosmetic improvement or small content change. Treat any such addition as an architecture decision requiring a clear reason.

## Validation and Verification

Choose checks according to the change:

- UI or TypeScript: `npm run lint`, `npm run typecheck`, and `npm run build` as appropriate
- content or works: verify facts, status, links, evidence, and wording
- image: inspect for confidential information and masking integrity
- metadata or route: verify canonical, OGP, sitemap, and robots behavior
- contact: verify validation, honeypot, server handling, external submission, and error behavior
- any diff: `git diff --check`

Where practical, use representative desktop and mobile viewports and verify external links. Never report a check that was not actually run.

## Deployment and Environment Safety

Vercel is part of the deployment model, but repository contents alone do not establish the production branch, automatic deployment rules, or current external settings. Verify those facts when they matter.

Do not expand a local implementation or content task into deployment or external configuration changes. Treat a push as potentially production-relevant when the repository's deployment integration indicates that risk.

## Completion Checks

For portfolio work, report the relevant impact on:

- positioning and audience
- content-source consistency
- factual accuracy and publication status
- confidential information and image masking
- external links and contact form
- SEO metadata and indexing
- mobile UX
- deployment behavior
