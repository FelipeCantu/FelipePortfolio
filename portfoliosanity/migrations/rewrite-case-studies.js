// Loads the restructured case studies in migrations/case-rewrites/*.md into Sanity as DRAFTS.
//
//   cd portfoliosanity
//   npx sanity exec migrations/rewrite-case-studies.js --with-user-token             # save drafts
//   npx sanity exec migrations/rewrite-case-studies.js --with-user-token -- --dry-run # preview only
//
// - Each <slug>.md replaces the project with that slug (title, excerpt, case study body).
// - Live projects are not touched: review each draft in Sanity Studio and click Publish.
// - A backup of every live project is written to migrations/case-rewrites/backup-<time>.json first.
// - Running it again replaces the drafts it made before.
//
// Same Markdown subset as the blog loader (markdown-to-pt.js); project bodies allow
// ## / ### headings, - lists, **bold**, *italic* and [links](https://…).
import fs from 'node:fs'
import path from 'node:path'
import {getCliClient} from 'sanity/cli'
import {convert} from './markdown-to-pt.js'

const DIR = path.join(process.cwd(), 'migrations', 'case-rewrites')
const DRY_RUN = process.argv.includes('--dry-run')

async function run() {
  const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.md'))
  if (!files.length) throw new Error(`No .md files in ${DIR}`)
  const slugs = files.map((f) => f.replace(/\.md$/, ''))

  const client = getCliClient({apiVersion: '2024-01-01'})
  const live = await client.fetch(
    `*[_type == "project" && slug.current in $slugs && !(_id in path("drafts.**"))]`,
    {slugs},
  )
  const missing = slugs.filter((s) => !live.some((p) => p.slug?.current === s))
  if (missing.length) throw new Error(`No published project with slug: ${missing.join(', ')}`)

  const drafts = live.map((project) => {
    const slug = project.slug.current
    const images = (project.body ?? []).filter((b) => b._type === 'image')
    let converted
    try {
      converted = convert(fs.readFileSync(path.join(DIR, `${slug}.md`), 'utf8'), images)
    } catch (err) {
      throw new Error(`${slug}.md: ${err.message}`)
    }
    // eslint-disable-next-line no-unused-vars
    const {_rev, _createdAt, _updatedAt, ...rest} = project
    return {
      ...rest,
      _id: `drafts.${project._id}`,
      title: converted.title,
      excerpt: converted.excerpt,
      body: converted.body,
    }
  })

  const stamp = new Date().toISOString().replace(/[:.]/g, '-')
  if (DRY_RUN) {
    const out = path.join(DIR, `dry-run-${stamp}.json`)
    fs.writeFileSync(out, JSON.stringify(drafts, null, 2))
    for (const d of drafts)
      console.log(`✓ ${d.slug.current}: ${d.body.length} blocks — "${d.title}"`)
    console.log(`\nDry run: nothing was saved to Sanity. Converted drafts are in ${out}`)
    return
  }

  const backup = path.join(DIR, `backup-${stamp}.json`)
  fs.writeFileSync(backup, JSON.stringify(live, null, 2))
  console.log(`Backed up ${live.length} live projects to ${backup}`)

  const existing = await client.fetch(`*[_id in $ids]._id`, {ids: drafts.map((d) => d._id)})
  const tx = client.transaction()
  for (const d of drafts) tx.createOrReplace(d)
  await tx.commit()

  for (const d of drafts) {
    console.log(
      `✓ ${existing.includes(d._id) ? 'Replaced draft' : 'Draft saved'}: ${d.slug.current} — "${
        d.title
      }"`,
    )
  }
  console.log(
    '\nNothing is live yet. Open Sanity Studio → Project, review each draft and click Publish.',
  )
}

run().catch((err) => {
  console.error(`\n✗ ${err.message}`)
  process.exit(1)
})
