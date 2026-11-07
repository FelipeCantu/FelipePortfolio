import type { Metadata } from 'next'
import AboutContent from '@/components/AboutContent'

export const metadata: Metadata = {
  title: 'About — Dallas Full-Stack Developer',
  description:
    'Meet Felipe Cantu Jr, a full-stack developer and designer in Dallas, TX: my story, the tools I use, and how I take websites from idea to launch.',
  alternates: { canonical: 'https://felipecantujr.com/about' },
  openGraph: {
    title: 'About — Dallas Full-Stack Developer | Felipe Cantu Jr',
    description: 'Learn about Felipe Cantu Jr — full-stack developer in Dallas, TX.',
    url: 'https://felipecantujr.com/about',
    images: [{ url: '/images/og.jpg', width: 1200, height: 630 }],
  },
}

export default function AboutPage() {
  return <AboutContent />
}
