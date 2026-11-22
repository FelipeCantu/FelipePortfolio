---
title: "How to Build a Web Developer Portfolio That Actually Gets Replies"
excerpt: "Fewer projects, real case studies, a fast and accessible site. How to build a developer portfolio that wins jobs and clients, plus a one-hour checklist."
---

Most developer portfolios fail in the first ten seconds. Someone lands on the page, sees a grid of fifteen thumbnails, a row of skill bars and a "Hi, I'm a passionate developer" headline, and leaves without clicking anything. Nobody told them what you're good at or what to do next.

The fix usually isn't more work. It's less work, explained better. Here's how I'd approach a portfolio today, for jobs or for freelance clients, with a checklist at the end you can get through in an hour.

## Decide who the site is for before you design anything

A hiring manager and a client read your portfolio with different questions in mind, and a site that tries to answer both equally usually answers neither.

A **hiring manager** (or the engineer screening for them) wants to know whether you can do the job and work on a team. They'll click through to GitHub and skim a README. They care about how you think: the trade-offs you made, how you structured the code, whether you tested anything.

A **client** mostly doesn't care whether you used Prisma or Drizzle. They want to know whether you can solve a problem like theirs, whether you'll be easy to work with, and what happens after they contact you. They judge you by the live site, by how clearly you explain things, and by how professional the process looks.

That choice changes the details:

- Headline: "Front-end engineer focused on React and TypeScript" for jobs, versus "I build fast websites and web apps for small businesses and nonprofits" for clients.
- Project write-ups: architecture and code for jobs, the problem and the outcome for clients.
- Call to action: "Download my résumé" or "Email me" for jobs, a clear way to start a project for clients.

If you want both, pick a primary audience for the homepage and give the other one its own page.

## Show three to five projects, not fifteen

Every weak project you add makes your strong ones look average. Reviewers don't average your work, they remember the worst thing they saw. A short list also signals judgment, which is a skill both employers and clients are paying for.

When I reworked my own portfolio at felipecantujr.com, I cut it down to five projects, each with its own case-study page: Quantum Gameware, Give Back Jojo, Anakupto, SkateSpot and Dizc. They were picked to cover different kinds of work, not to pad a count. Give Back Jojo is a nonprofit site with articles, a shop and Stripe donations. SkateSpot is a social app with maps and authentication. Anakupto is a Three.js and WebGL experience. Dizc is a desktop music player. A visitor can find the one closest to what they need and go deep on it.

Here's what I'd cut first:

- **Tutorial clones.** The to-do app, the weather app, the Netflix clone from a course. Reviewers have seen hundreds of them and can't tell what part was yours. If you learned something real building one, extend it until it's actually different, or leave it in a "practice" repo.
- **Skill bars and percentages.** "JavaScript 90%" means nothing. Ninety percent of what? It invites the reader to wonder about the missing ten. List the tools you use, grouped plainly (front end, back end, tooling), and let the projects prove the level.
- **Unfinished or broken projects.** A dead demo link costs you more than a missing project.

A good set of three to five covers the kind of work you want more of. If you want e-commerce clients, at least one project should take payments. If you want a front-end job at a product company, at least one should show a real app with state, data fetching and tests.

## Write every project as a case study

A screenshot and a list of technologies tell the reader what you built. A case study tells them why it was hard and how you handled it, which is the part they're actually trying to evaluate.

Keep the structure the same on every project page so people can scan them quickly:

1. **The problem.** One or two sentences in plain language. Who needed this and why?
2. **Constraints.** Budget, deadline, existing systems, content the client had to manage themselves, performance or accessibility requirements. Constraints are what make your decisions interesting.
3. **What you built.** The main features, and the one or two technical decisions that mattered most, with the reason for each.
4. **Your role.** Solo, or part of a team? Did you do design, front end, back end, deployment? Be precise. Overclaiming on a team project is the fastest way to lose trust in an interview.
5. **The result.** What changed, stated honestly. If you have real numbers, use them. If you don't, describe what the client or users can now do that they couldn't before.
6. **Links.** Live site and source code, near the top, not buried at the bottom.

Here's that outline as a skeleton, filled in for a made-up nonprofit project, that you can copy into your CMS or MDX file:

```md
## Problem
A nonprofit needed one place to publish articles, sell merchandise
and take donations, run by volunteers who don't write code.

## Constraints
- Non-technical editors had to update content on their own
- Payments had to go through a trusted processor
- Small budget, so low hosting and maintenance costs

## What I built
- Editable content in a headless CMS, so editors never touch code
- Checkout and donations through Stripe, so no card data hits our server
- [The decision you'd defend in an interview, and why]

## My role
Solo: design, front end, CMS setup, payments, deployment.

## Result
[Only what you can show: launched, now maintained by the team,
a measurable improvement if you actually measured one.]

## Links
Live site · Source code (or "private client repo, happy to walk through it")
```

That last line matters. Client work often can't be open source. Say so plainly and offer a walkthrough instead of leaving the link out without explanation.

Aim for 300 to 600 words per case study, plus two or three screenshots of the screens that matter, not ten of every page.

## Proof beats claims

Everyone says they write clean code and communicate well. The portfolios that get replies show it.

- **Live links that work.** Click every one before you send your portfolio to anyone. Sleeping free-tier databases and expired demo domains break more portfolios than bad code does.
- **Code a reviewer can read.** Pin your featured repos on GitHub. Each one needs a README that says what it is, how to run it locally, and what you'd improve next. Delete commented-out code and `console.log` leftovers. A small test suite on one project says more than "I value testing."
- **Testimonials, but only real ones.** A short quote from a client or teammate, with their name and role, is strong proof. A fabricated or anonymous "John D., CEO" quote does the opposite once anyone notices. If you don't have any yet, leave the section out. Ask your next client for two sentences when the project wraps, while they're happy.
- **Process, for clients.** Clients are nervous about what happens after they hire you. Showing the process helps: how a project starts, how they approve work, how they pay. On my site that's a "Get Started" intake form and a client portal where clients see proposals, sign agreements, pay invoices and approve files. You don't need to build a portal, but a clear page describing your process does a lot of the same work.

## Make the site itself part of the pitch

Your portfolio is the one project every visitor actually uses. If it's slow, jumps around while loading or can't be used with a keyboard, that's the work sample they'll remember.

### Core Web Vitals

Google's [Core Web Vitals](https://web.dev/articles/vitals) are currently three metrics, each judged at the 75th percentile of page loads:

- **Largest Contentful Paint (LCP)**: 2.5 seconds or less. How quickly the main content appears.
- **Interaction to Next Paint (INP)**: 200 milliseconds or less. How quickly the page responds to clicks and taps. INP replaced First Input Delay in 2024, so older guides that mention FID are out of date.
- **Cumulative Layout Shift (CLS)**: 0.1 or less. How much the layout jumps around.

Run your homepage and one case-study page through [PageSpeed Insights](https://pagespeed.web.dev/) on mobile. Portfolios rarely fail on server speed. They fail on a huge hero image, a background video, an animation library loaded for one fade-in, or a late-loading font that shifts the text.

### Images

Images are usually the biggest win. Serve modern formats (AVIF or WebP), size them for the space they fill, always set width and height so the browser can reserve space, and lazy-load everything below the fold. In Next.js, `next/image` handles most of this. As of Next.js 16 the `priority` prop is deprecated, so for your hero image use `preload` instead:

```tsx
// app/page.tsx
import Image from 'next/image'

export default function Home() {
  return (
    <Image
      src="/projects/skatespot-map.png"
      alt="SkateSpot map view showing skate spots pinned around a city"
      width={1200}
      height={750}
      sizes="(max-width: 768px) 100vw, 1200px"
      preload
    />
  )
}
```

Only one image per page should get `preload`: the one that is your LCP element.

### Accessibility

Write alt text that says what the screenshot shows ("Checkout page with donation amount options"), not "screenshot" or the file name. Make sure every link and button works with a keyboard and has a visible focus style, that text contrast meets the [WCAG](https://www.w3.org/TR/WCAG22/) AA minimum of 4.5:1 for body text, and that your contact form has real labels, not just placeholders. WCAG 2.2 is the current version, and it added a minimum target size of 24 by 24 CSS pixels for things like icon links, which is worth checking on social icons in your footer.

> Run an automated check (Lighthouse or axe), then put the mouse away and tab through your entire site. If you can't reach your own contact form with the keyboard, neither can some of the people reviewing you.

## Basic SEO that takes an afternoon

You won't outrank agencies for "web developer," and that isn't the goal. The goal is that people searching your name find you, that shared links show a sensible title and description, and that search engines can find every page.

**Titles and descriptions.** Every page needs a unique title and meta description. "Give Back Jojo case study | Your Name" beats "Project 2." In the Next.js App Router, export `metadata` (or `generateMetadata` for dynamic pages) from each `page.tsx` and set a `title.template` in the root layout so the suffix stays consistent. Add Open Graph images too, since that's what appears when someone pastes your link into Slack or LinkedIn.

**Structured data.** Google supports [ProfilePage markup](https://developers.google.com/search/docs/appearance/structured-data/profile-page) for an "About me" page. It requires a `mainEntity` (a Person, with a name), and `sameAs` links to your GitHub and LinkedIn are recommended. Following the [Next.js JSON-LD guide](https://nextjs.org/docs/app/guides/json-ld), render it as a plain script tag:

```tsx
// app/about/page.tsx
export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: 'Your Name',
      jobTitle: 'Full-stack web developer',
      url: 'https://yourdomain.com',
      sameAs: [
        'https://github.com/your-handle',
        'https://www.linkedin.com/in/your-handle',
      ],
    },
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      {/* About content */}
    </main>
  )
}
```

The `.replace` escapes `<` so a string can't break out of the script tag. Check the result with the [Rich Results Test](https://search.google.com/test/rich-results).

**Sitemap.** In the App Router, an `app/sitemap.ts` file generates `/sitemap.xml`:

```ts
// app/sitemap.ts
import type { MetadataRoute } from 'next'

const base = 'https://yourdomain.com'
const projects = ['give-back-jojo', 'skatespot', 'anakupto']

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, lastModified: new Date('2026-11-01') },
    { url: `${base}/about`, lastModified: new Date('2026-11-01') },
    ...projects.map((slug) => ({
      url: `${base}/projects/${slug}`,
      lastModified: new Date('2026-11-01'),
    })),
  ]
}
```

Skip `priority` and `changeFrequency`: Google [ignores both](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap). It does use `lastModified` when it's accurate, so set it to the date the page really changed rather than `new Date()` on every build. Then submit the sitemap in Google Search Console.

## Make the next step obvious

A visitor who's impressed and doesn't know what to do next is a lost lead. Every page should end with one clear action.

For job seekers that's an email address (as text, not only a mailto icon), a résumé link and your GitHub. For freelancers it's one specific way to start: a short project form that asks for the type of project, timeline and budget range. It also filters out bad fits before you spend an hour on a call. On my site that's the "Get Started" page.

Keep your About section short and human: what you do, who you do it for, where you're based, and a sentence or two of personality. Then put a reminder in your calendar to review the portfolio every few months. When you add a stronger project, remove a weaker one.

[IMAGE 1]

## A one-hour portfolio checklist

If you only have an hour this week, do these in order:

1. **Minutes 0–5:** Write one sentence saying who the site is for and what you want them to do. Rewrite your homepage headline to match.
2. **Minutes 5–15:** Pick your best three to five projects. Hide the rest, including tutorial clones. Delete skill bars.
3. **Minutes 15–30:** For your strongest project, write the six case-study sections: problem, constraints, what you built, your role, result, links.
4. **Minutes 30–35:** Click every live link and repo link. Fix or remove anything broken.
5. **Minutes 35–45:** Run PageSpeed Insights on mobile for the homepage. Fix the biggest image or the one heavy script it flags.
6. **Minutes 45–50:** Tab through the site with the keyboard. Add missing alt text and focus styles.
7. **Minutes 50–55:** Give every page a unique title and description. Check that `/sitemap.xml` exists.
8. **Minutes 55–60:** Make sure every page ends with one clear call to action, and send the link to one person whose opinion you trust.

## What to do next

Start with the cut, not the redesign. Removing your weakest projects and writing one honest case study will do more this week than a new color scheme. Then write the rest of your case studies, one per weekend, and fix performance and accessibility as you go.

If you'd rather have a developer build or rework your site for you, [get in touch](https://felipecantujr.com/get-started).
