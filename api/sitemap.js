const { createClient } = require('@sanity/client');

const sanity = createClient({
  projectId: 'pnm3puk3',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
});

const BASE_URL = 'https://felipecantujr.com';

const STATIC_PAGES = [
  { loc: '/',            changefreq: 'monthly', priority: '1.0' },
  { loc: '/about',       changefreq: 'monthly', priority: '0.8' },
  { loc: '/portfolio',   changefreq: 'weekly',  priority: '0.9' },
  { loc: '/blog',        changefreq: 'weekly',  priority: '0.8' },
  { loc: '/contact',     changefreq: 'monthly', priority: '0.7' },
  { loc: '/get-started', changefreq: 'monthly', priority: '0.9' },
];

module.exports = async (req, res) => {
  try {
    const [posts, projects] = await Promise.all([
      sanity.fetch(`*[_type == "post" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`),
      sanity.fetch(`*[_type == "project" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`),
    ]);

    const today = new Date().toISOString().split('T')[0];

    const toDate = (iso) => (iso ? iso.split('T')[0] : today);

    const urlTags = [
      ...STATIC_PAGES.map(
        (p) => `\n  <url>\n    <loc>${BASE_URL}${p.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`
      ),
      ...posts.map(
        (p) => `\n  <url>\n    <loc>${BASE_URL}/post/${p.slug}</loc>\n    <lastmod>${toDate(p._updatedAt)}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`
      ),
      ...projects.map(
        (p) => `\n  <url>\n    <loc>${BASE_URL}/project/${p.slug}</loc>\n    <lastmod>${toDate(p._updatedAt)}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>`
      ),
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlTags.join('')}\n</urlset>`;

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).send(xml);
  } catch (err) {
    console.error('Sitemap generation failed:', err);
    return res.status(500).send('Error generating sitemap');
  }
};
