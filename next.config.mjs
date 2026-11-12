/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'felipecantujr.com' },
    ],
  },
  // robots.txt points crawlers at /sitemap.xml — serve the dynamic one
  // (includes every post and project from Sanity)
  async rewrites() {
    return [{ source: '/sitemap.xml', destination: '/api/sitemap' }]
  },
  // Stop other sites from embedding these pages (clickjacking) and from guessing file types
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Content-Security-Policy', value: "frame-ancestors 'self'" },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
  // URLs from the old CRA site, so existing links and search results keep working
  async redirects() {
    return [
      { source: '/home', destination: '/', permanent: true },
      { source: '/Home', destination: '/', permanent: true },
      { source: '/blogs', destination: '/blog', permanent: true },
      { source: '/Blogs', destination: '/blog', permanent: true },
      // Studio moved to Sanity hosting
      { source: '/studio/:path*', destination: 'https://felipeportfolio.sanity.studio/:path*', permanent: false },
    ]
  },
}

export default nextConfig
