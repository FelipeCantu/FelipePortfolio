# Notes: crafting-an-impressive-web-developer-portfolio-your-gateway-to-success

Word count: about 2,130 words of prose, about 2,415 including the code samples.

## (a) Claims to double-check

1. **Your own site, described as fact.** The article says felipecantujr.com was cut to five projects (Quantum Gameware, Give Back Jojo, Anakupto, SkateSpot, Dizc), each with a case-study page, and that it has a "Get Started" intake form and a client portal (proposals, agreements with e-signature, invoices, file approvals). Source: the brief and the agent's fact list. Please confirm each project really has its own case-study page, and that "Get Started" is a form asking about the type of project, timeline and budget. The article implies the form asks for those, so adjust that sentence if it doesn't. I did not say it's linked from every case study, and I made no claims about your site's own Core Web Vitals, structured data or sitemap. Don't add any you haven't checked.
2. **Core Web Vitals.** The three metrics are LCP ≤ 2.5 s, INP ≤ 200 ms and CLS ≤ 0.1, measured at the 75th percentile, and INP replaced FID in 2024. Source: https://web.dev/articles/vitals (checked Nov 22, 2026).
3. **Next.js 16 `priority` is deprecated in favor of `preload`.** Source: https://nextjs.org/docs/app/api-reference/components/image (version history: v16.0.0 added `preload` and deprecated `priority`). If your site is still on Next.js 15, `priority` is still the prop to use there.
4. **Google ignores `<priority>` and `<changefreq>` in sitemaps, and uses `<lastmod>` only when it is consistently accurate.** Source: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap (the version fetched through the guides/create-URLs redirect).
5. **`app/sitemap.ts` shape and the `MetadataRoute.Sitemap` type.** Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
6. **JSON-LD as a plain `<script>` tag with `.replace(/</g, '\\u003c')`.** Source: https://nextjs.org/docs/app/guides/json-ld
7. **ProfilePage structured data.** It requires `mainEntity` (a Person or Organization, with a name), recommends `sameAs`, and is valid for an "About me" page. Source: https://developers.google.com/search/docs/appearance/structured-data/profile-page. `jobTitle` and `url` are valid schema.org Person properties but aren't listed in Google's ProfilePage docs. They're harmless, but optional.
8. **WCAG 2.2.** It's the current Recommendation (published Oct 5, 2023) and added 2.5.8 Target Size (Minimum), which requires 24 × 24 CSS pixels at level AA. Source: https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/. The 4.5:1 contrast ratio for body text is WCAG 1.4.3 (AA). This is well established but I didn't re-fetch it.
9. **The `next/image` example uses the path `/projects/skatespot-map.png`.** It's illustrative. Change the path or alt text to an image that really exists, or keep it as a generic example.
10. **"AVIF or WebP".** This is general advice. `next/image` serves WebP by default, and AVIF has to be turned on in `images.formats` (from the same Next.js Image docs page). The article doesn't go into that detail.
11. **The case-study skeleton is a made-up nonprofit example and is labeled as such.** It's close in spirit to Give Back Jojo, but it deliberately doesn't claim any constraints or results for that project. If you'd rather show your real Give Back Jojo case study as the example, swap it in using only facts you can stand behind.
12. **No statistics, traffic numbers, client counts or testimonials were used.**

## (b) Dropped or changed from the original

- **The 15-point numbered list structure.** I replaced it with eight sections organized by what the reader needs to decide. Every original topic is either merged in or dropped, as follows.
- **"Domain name."** Dropped as its own point. It's too obvious to deserve a section, and the code examples assume you have one.
- **"Skills list."** Turned into "don't use skill bars or percentages; list tools plainly and let projects prove the level."
- **"Design."** Dropped as a generic point. The article argues that focus (fewer projects, clear call to action) matters more than visuals, and says so in the wrap-up.
- **"Blog."** Dropped. It's optional and off-topic for the core pitch, and recommending a blog in a blog post felt like padding.
- **"Get feedback" and "launch and promote."** Reduced to one step in the checklist ("send the link to one person whose opinion you trust"). The generic promotion advice (share on social media, etc.) added nothing specific.
- **"Mobile and accessibility."** Kept and made specific (WCAG 2.2, contrast, keyboard, target size, alt text). Mobile-first testing is covered through PageSpeed Insights on mobile.
- **[IMAGE 1].** Kept once, placed just before the checklist section (roughly where it sat originally, before the conclusion).
