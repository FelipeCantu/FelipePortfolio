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
}

export default nextConfig
