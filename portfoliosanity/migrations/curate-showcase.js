// One-off content migration for the curated portfolio (schemas/project.js).
//   npx sanity exec migrations/curate-showcase.js --with-user-token
// Marks the five showcase projects, fills missing card fields, and drops the
// retired `projectType` / `featured` fields. Hidden projects are not deleted.
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

const SHOWCASE = [
  {
    slug: 'quantum-gameware',
    role: 'Design, 3D and full-stack build',
  },
  {
    slug: 'give-back-jojo',
    role: 'Full-stack build for a nonprofit',
    tags: ['React', 'Firebase', 'Sanity', 'Stripe', 'Framer Motion'],
    alt: 'Give Back Jojo home page: the "Reach Out For Help" headline in pink over a blue sky, with a Hotlines button',
  },
  {
    slug: 'anakupto',
    role: '3D web build',
    tags: ['Three.js', 'WebGL'],
    alt: 'Anakupto home page: the "Transcend the screen" headline over a glossy black 3D knot on a starfield',
  },
  {
    slug: 'skatespot',
    role: 'Full-stack build',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'Leaflet', 'NextAuth.js'],
    alt: 'SkateSpot landing page: the SKATE SPOT wordmark over a field of red and grey 3D blocks',
  },
  {
    slug: 'dizc',
    role: 'Product design and build',
    alt: 'Dizc landing page: the "Your Music. Uncompromised." headline with Download for Windows and Open Web Player buttons',
  },
]

// sanity exec bundles to CJS, so no top-level await
async function run() {
  const docs = await client.fetch(
    `*[_type == "project"]{ _id, title, excerpt, tags, "slug": slug.current, "alt": image.alt }`,
  )

  const missing = SHOWCASE.filter((s) => !docs.some((d) => d.slug === s.slug))
  if (missing.length) throw new Error(`Not found: ${missing.map((s) => s.slug).join(', ')}`)

  const tx = client.transaction()

  for (const doc of docs) {
    const index = SHOWCASE.findIndex((s) => s.slug === doc.slug)
    const patch = client.patch(doc._id).unset(['projectType', 'featured'])

    if (index === -1) {
      tx.patch(patch.set({showcase: false}).unset(['order']))
      continue
    }

    const item = SHOWCASE[index]
    const set = {showcase: true, order: index + 1, role: item.role, title: doc.title.trim()}
    if (doc.excerpt) set.excerpt = doc.excerpt.replace(/\s+/g, ' ').trim()
    if (item.tags && !doc.tags?.length) set.tags = item.tags
    // Fill missing alts, and replace Anakupto's, which held marketing copy instead of a description
    if (item.alt && (!doc.alt || doc.slug === 'anakupto')) set['image.alt'] = item.alt
    tx.patch(patch.set(set))
  }

  await tx.commit()
  console.log(`Patched ${docs.length} projects; ${SHOWCASE.length} showcased.`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
