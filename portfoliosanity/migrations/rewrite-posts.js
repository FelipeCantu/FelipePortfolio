// Loads the rewritten blog posts in migrations/blog-rewrites/*.md into Sanity as DRAFTS.
//
//   cd portfoliosanity
//   npx sanity exec migrations/rewrite-posts.js --with-user-token             # save drafts
//   npx sanity exec migrations/rewrite-posts.js --with-user-token -- --dry-run # preview only
//
// - Each <slug>.md replaces the post with that slug (title, excerpt, body, date).
// - The live posts are not touched: you review each draft in Sanity Studio and click Publish.
// - A backup of every live post is written to migrations/blog-rewrites/backup-<time>.json first.
// - Running it again replaces the drafts it made before (handy after editing a .md file).
//
// The .md files use a small Markdown subset (see .claude/agents/expert-article-writer.md):
// ## / ### headings, paragraphs, - and 1. lists, > callouts, ```lang code blocks,
// **bold**, *italic*, `code`, [links](https://…) and [IMAGE n] markers that keep the
// post's existing inline images.
import fs from 'node:fs'
import path from 'node:path'
import {getCliClient} from 'sanity/cli'
import {convert} from './markdown-to-pt.js'

const DIR = path.join(process.cwd(), 'migrations', 'blog-rewrites')
const DRY_RUN = process.argv.includes('--dry-run')

/* ───────────── run ───────────── */

async function run() {
  const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.md') && !f.endsWith('.notes.md'))
  if (!files.length) throw new Error(`No .md files in ${DIR}`)
  const slugs = files.map((f) => f.replace(/\.md$/, ''))

  const client = getCliClient({apiVersion: '2024-01-01'})
  const live = await client.fetch(
    `*[_type == "post" && slug.current in $slugs && !(_id in path("drafts.**"))]`,
    {slugs},
  )
  const missing = slugs.filter((s) => !live.some((p) => p.slug?.current === s))
  if (missing.length) throw new Error(`No published post with slug: ${missing.join(', ')}`)

  // Keep the blog's current order, newest first, but date everything today
  live.sort((a, b) => (b.publishedAt ?? b._createdAt).localeCompare(a.publishedAt ?? a._createdAt))
  const now = Date.now()

  const drafts = live.map((post, i) => {
    const slug = post.slug.current
    const images = (post.body ?? []).filter((b) => b._type === 'image')
    let converted
    try {
      converted = convert(fs.readFileSync(path.join(DIR, `${slug}.md`), 'utf8'), images)
    } catch (err) {
      throw new Error(`${slug}.md: ${err.message}`)
    }
    // eslint-disable-next-line no-unused-vars
    const {_rev, _createdAt, _updatedAt, ...rest} = post
    return {
      ...rest,
      _id: `drafts.${post._id}`,
      title: converted.title,
      excerpt: converted.excerpt,
      body: converted.body,
      publishedAt: new Date(now - i * 60_000).toISOString(),
    }
  })

  const stamp = new Date().toISOString().replace(/[:.]/g, '-')
  if (DRY_RUN) {
    const out = path.join(DIR, `dry-run-${stamp}.json`)
    fs.writeFileSync(out, JSON.stringify(drafts, null, 2))
    for (const d of drafts) console.log(`✓ ${d.slug.current}: ${d.body.length} blocks — "${d.title}"`)
    console.log(`\nDry run: nothing was saved to Sanity. Converted drafts are in ${out}`)
    return
  }

  const backup = path.join(DIR, `backup-${stamp}.json`)
  fs.writeFileSync(backup, JSON.stringify(live, null, 2))
  console.log(`Backed up ${live.length} live posts to ${backup}`)

  const existing = await client.fetch(`*[_id in $ids]._id`, {ids: drafts.map((d) => d._id)})
  const tx = client.transaction()
  for (const d of drafts) tx.createOrReplace(d)
  await tx.commit()

  for (const d of drafts) {
    console.log(`✓ ${existing.includes(d._id) ? 'Replaced draft' : 'Draft saved'}: ${d.slug.current} — "${d.title}"`)
  }
  console.log('\nNothing is live yet. Open Sanity Studio → Post, review each draft and click Publish.')
}

run().catch((err) => {
  console.error(`\n✗ ${err.message}`)
  process.exit(1)
})
