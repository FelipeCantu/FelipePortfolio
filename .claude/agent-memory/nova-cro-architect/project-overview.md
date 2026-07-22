---
name: project-overview
description: Felipe Cantu Jr portfolio site — confirmed tech stack, pages, and integrations as of July 2026
metadata:
  type: project
---

**Stack:** Create React App (CRA), React 17, React Router DOM v5, Styled Components v5, Sanity v3 (headless CMS), Framer Motion v6, EmailJS, Google Analytics (gtag), react-helmet-async for SEO. No TypeScript, no Tailwind, no React Query.

**Pages:** Home, About, Blog, Portfolio (carousel), Contact, GetStarted (/get-started — ClientIntakeWizard), Admin, SinglePost, SingleProject

**Why:** Personal portfolio / freelance lead-gen site for Felipe Cantu Jr (Full Stack Developer, Dallas TX). Domain: felipecantujr.com. Deployed to Vercel (vercel.json present).

**Sanity:** projectId `pnm3puk3`, dataset `production`. Schemas in `/portfoliosanity/schemas/`. Client in `/src/sanityClient.js` — uses deprecated `sanityClient()` constructor, apiVersion `2022-03-07`.

**Forms:** EmailJS with public key hardcoded in `Form.jsx` (not in .env). No server-side validation or rate limiting.

**Stripe:** API files in `/api/stripe/` — appears orphaned (no frontend integration visible).

**How to apply:** Use this to quickly orient to the project structure without re-reading files. Verify if files exist before referencing them.
