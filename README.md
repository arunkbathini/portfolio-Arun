# Arun Portfolio — Next.js rebuild

A custom, data-driven rebuild of the portfolio, positioned around **AWS/Azure Cloud DevOps, Kubernetes, infrastructure as code, and CI/CD automation**. Built so the site itself demonstrates a real CI/CD pipeline — fitting for a DevOps engineer.

## Stack

- **Next.js 16** (App Router, React 19, Turbopack)
- **Tailwind CSS v4** (CSS-first `@theme` config — no `tailwind.config.js`)
- **MDX** case studies via `next-mdx-remote` + `gray-matter`
- **next/font** — Space Grotesk (display), Inter (body), JetBrains Mono (labels/data)
- Zero heavy animation libraries — the signature grid is a hand-written canvas

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

Requires Node 20+ (22 LTS recommended).

## Where to edit things

| You want to change… | Edit this file |
| --- | --- |
| Your name, intro, stats, links | `content/site.ts` |
| Projects / work cards | `content/site.ts` → `projects` |
| Experience timeline | `content/site.ts` → `experience` |
| Skills | `content/site.ts` → `skillGroups` |
| Colors & fonts (design tokens) | `app/globals.css` → `@theme` |
| Layout/structure styles | `app/components.css` |
| Add a case study | new `.mdx` file in `content/case-studies/` |

**You never edit component markup for content changes** — it all flows from `content/site.ts`.

## The signature element

`components/blueprint-grid.tsx` draws a fixed blueprint grid behind the page. As you scroll, the grid parallaxes and a vertical pipeline of nodes lights up stage by stage — INT → QA → UAT → PROD — mapping scroll depth to a CI/CD promotion. It respects `prefers-reduced-motion` (renders static).

## Case studies (MDX)

Each `.mdx` file in `content/case-studies/` has frontmatter (`title`, `summary`, `role`, `date`, `stack`) and a Markdown body. They appear automatically on `/case-studies` and at `/case-studies/<filename>`. One example is included — edit or replace it.

> Optional: add syntax highlighting by passing a rehype plugin (e.g. `rehype-pretty-code`) to `compileMDX` in `app/case-studies/[slug]/page.tsx`.

## Opportunity Desk

The recruiter intake form (`components/opportunity-desk.tsx`) posts to `app/api/opportunity/route.ts`:

- **With email configured** — set `RESEND_API_KEY` and `FROM_EMAIL` in `.env.local` (see `.env.example`) and submissions email you directly.
- **Without it** — the form falls back to opening the visitor's mail app, pre-filled. It works either way. A honeypot field drops bots.

## CI/CD pipeline (the showcase)

`.github/workflows/ci.yml` runs on every PR and push to `main`:

1. **quality** — typecheck (`tsc --noEmit`), lint, and build.
2. **lighthouse** — builds, starts the server, and runs Lighthouse CI against the home and case-studies pages. Score thresholds in `lighthouserc.json` (performance ≥ 0.9, a11y/best-practices/SEO ≥ 0.95) **fail the build** if missed.

Deploy on **Vercel** (connect the GitHub repo) to get preview deploys per PR for free. The CI gates and preview deploys together are worth linking from the site itself — proof you ship through the same discipline you build for production orgs.

## Before you go live — replace these placeholders

- [ ] Set the real production domain in **one place**: `NEXT_PUBLIC_SITE_URL` (env var) or the fallback in `content/site.ts` → `siteUrl`. It feeds `app/layout.tsx`, `app/sitemap.ts`, and `app/robots.ts` automatically.
- [x] Drop your résumé at `public/Bathini-Arun-Kumar-Resume.docx` (the hero and contact CTA both link to it)
- [x] Update roles/titles in `content/site.ts` to match your current position
- [x] Favicon (`app/icon.svg`) and OG image (`app/opengraph-image.tsx`, generated from `content/site.ts` at build time) are already wired up
- [ ] If you want the "Opportunity Desk" form to email you directly instead of falling back to `mailto:`, set `RESEND_API_KEY` and `FROM_EMAIL` (see `.env.example`)
