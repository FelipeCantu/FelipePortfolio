import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import SidebarShell from '@/components/SidebarShell'
import Footer from '@/components/Footer'
import MotionProvider from '@/components/MotionProvider'
import ScrollParallax from '@/components/ScrollParallax'

// Display: variable font, so one file covers every weight we use (500-800)
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#0a0c16',
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  title: {
    default: 'Felipe Cantu Jr — Full Stack Web Developer in Dallas, TX',
    template: '%s | Felipe Cantu Jr',
  },
  description:
    'Full-stack developer in Dallas, TX. I build fast, modern web apps and websites that help businesses grow — React, Next.js, Node.js, and clean design. Available for freelance.',
  metadataBase: new URL('https://felipecantujr.com'),
  openGraph: {
    type: 'website',
    url: 'https://felipecantujr.com',
    title: 'Felipe Cantu Jr — Full Stack Web Developer',
    description:
      'Full-stack developer in Dallas, TX helping businesses launch fast, modern websites.',
    images: [{ url: '/images/avatarpic.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Felipe Cantu Jr — Full Stack Web Developer',
    description: 'Full-stack developer in Dallas, TX. Building fast, modern web apps for businesses.',
    images: ['/images/avatarpic.png'],
  },
  authors: [{ name: 'Felipe Cantu Jr', url: 'https://felipecantujr.com' }],
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-DRHEYW3LR9" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-DRHEYW3LR9');`,
          }}
        />
        {/* JSON-LD: Person + WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Person',
                  name: 'Felipe Cantu Jr',
                  url: 'https://felipecantujr.com',
                  image: 'https://felipecantujr.com/images/avatarpic.png',
                  jobTitle: 'Full Stack Web Developer',
                  description:
                    'Full Stack Developer based in Dallas, TX. Building modern web apps with React, Next.js, Node.js, and clean design.',
                  email: 'cantujr.felipe@gmail.com',
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Dallas',
                    addressRegion: 'TX',
                    addressCountry: 'US',
                  },
                  sameAs: [
                    'https://github.com/FelipeCantu',
                    'https://www.linkedin.com/in/felipe-cantu-jr/',
                    'https://www.instagram.com/son_of_robot_/',
                    'https://www.facebook.com/profile.php?id=100064306140476',
                  ],
                },
                {
                  '@type': 'WebSite',
                  name: 'Felipe Cantu Jr',
                  url: 'https://felipecantujr.com',
                },
              ],
            }),
          }}
        />
      </head>
      <body className="font-body">
        <a
          href="#main"
          className="fixed left-4 top-4 z-[2000] -translate-y-24 rounded-pill bg-accent px-5 py-2.5 font-semibold text-accent-ink no-underline transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <ScrollParallax />
        <MotionProvider>
          <SidebarShell>
            <div className="flex min-h-dvh flex-col">
              <Navbar />
              <main id="main" className="relative w-full flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </SidebarShell>
        </MotionProvider>
      </body>
    </html>
  )
}
