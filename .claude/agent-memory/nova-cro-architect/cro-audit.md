---
name: cro-audit
description: Full CRO and technical audit of felipecantujr.com conducted July 2026 — hero, social proof, SEO, security, and performance gaps
metadata:
  type: project
---

Audit conducted July 2026. Core findings below.

**Why:** User asked for a comprehensive review to improve conversions and identify what to add.

**How to apply:** Use as baseline for prioritizing improvements. Re-audit after testimonials, hero CTA, and OG image are added.

## Critical CRO Gaps

**Hero section (Home.jsx):**
- Headline "Full Stack Web Developer" is a job title, not a value proposition. No Big Promise, no client outcome.
- Sub-headline is resume language ("highly motivated tech enthusiast...") — doesn't address visitor pain points.
- Only CTA is "Learn more →" linking to /about. No "View My Work" or "Book a Call" CTA above the fold.
- Zero social proof in hero (no client count, no star rating, no testimonial teaser).

**Missing social proof entirely:**
- No testimonials section anywhere on the site. This is the single highest-ROI missing element.
- No client logos or "trusted by" bar.

**No services section:**
- Visitors don't know what they can hire Felipe to build, what it costs, or who it's for.

**Portfolio lacks outcomes:**
- Projects are shown but no business results ("shipped in 6 weeks", "increased conversions by X%").

## SEO Gaps

- **og:image missing** from every page. Social shares show no preview image.
- **twitter:card meta tags missing** on all pages.
- **No JSON-LD structured data** (Person, LocalBusiness, or Service schemas).
- Blog meta description is generic ("Explore insightful articles...") — not keyword-targeted.

## Security Issues

- EmailJS public key (`sfy94T_0JRB3qPReX`) and service IDs hardcoded in `Form.jsx` — should be `.env` variables.
- No server-side rate limiting on contact form — spam risk.
- No input sanitization beyond HTML `required` attribute.

## Performance Issues

- Home page runs 12+ simultaneous CSS animations (orbit circles, rings, dots). Heavy GPU compositor load.
- `background-attachment: fixed` in Blog.jsx and Portfolio.jsx — disables hardware acceleration on mobile, causes repaints.
- CRA produces larger bundles vs Vite or Next.js.
- Artificial 1-second loading screen on every route change hurts perceived performance.

## Technical Debt

- `sanityClient.js` uses deprecated `sanityClient()` constructor (should be `createClient()`). apiVersion `2022-03-07` is stale.
- `Form.jsx` uses hardcoded colors (#3498db, #0077b5) that conflict with the CSS custom property design system — Contact.jsx overrides them with `!important` rules.
- React 17 (React 18+ is stable, 19 available). React Router DOM v5 (v6+ is stable).
- `@material-ui/core` v4 listed in deps but may not be actively used (should audit).
- Stripe API files in `/api/stripe/` with no apparent frontend integration — orphaned code.
- No 404 route configured in App.js Switch.
