// Content Security Policy. Inline scripts are still allowed because Next.js,
// the GA bootstrap and the JSON-LD blocks are inline, and nonces would force
// every page to render dynamically. The rest still blocks the big risks:
// no framing (clickjacking), no plugins, no <base> hijacking, forms can only
// post here, and the page can only talk to the services listed below.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn.sanity.io https://www.googletagmanager.com https://*.google-analytics.com",
  "font-src 'self'",
  "connect-src 'self' https://*.sanity.io https://api.emailjs.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  'upgrade-insecure-requests',
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      // Admin and its API should never be cached by browsers or shared caches
      { source: '/admin', headers: [{ key: 'Cache-Control', value: 'no-store' }, { key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      { source: '/api/stripe/:path*', headers: [{ key: 'Cache-Control', value: 'no-store' }] },
    ]
  },
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
