import { sanity } from '@/lib/sanity'

const BASE_URL = 'https://felipecantujr.com'

const STATIC_PAGES = [
  { loc: '/',            changefreq: 'monthly', priority: '1.0' },
  { loc: '/about',       changefreq: 'monthly', priority: '0.8' },
  { loc: '/portfolio',   changefreq: 'weekly',  priority: '0.9' },
  { loc: '/blog',        changefreq: 'weekly',  priority: '0.8' },
  { loc: '/contact',     changefreq: 'monthly', priority: '0.7' },
  { loc: '/get-started', changefreq: 'monthly', priority: '0.9' },
]

export async function GET() {
  try {
    const [posts, projects] = await Promise.all([
      sanity.fetch(`*[_type == "post" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`),
      sanity.fetch(`*[_type == "project" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`),
    ])

    const today = new Date().toISOString().split('T')[0]
    const toDate = (iso?: string) => iso ? iso.split('T')[0] : today

    const urlTags = [
      ...STATIC_PAGES.map(p =>
        `\n  <url>\n    <loc>${BASE_URL}${p.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`
      ),
      ...posts.map((p: { slug: string; _updatedAt?: string }) =>
        `\n  <url>\n    <loc>${BASE_URL}/post/${p.slug}</loc>\n    <lastmod>${toDate(p._updatedAt)}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`
      ),
      ...projects.map((p: { slug: string; _updatedAt?: string }) =>
        `\n  <url>\n    <loc>${BASE_URL}/project/${p.slug}</loc>\n    <lastmod>${toDate(p._updatedAt)}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>`
      ),
    ]

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlTags.join('')}\n</urlset>`

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch {
    return new Response('Error generating sitemap', { status: 500 })
  }
}
