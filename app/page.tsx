import type { Metadata } from 'next'
import HomeHero from '@/components/HomeHero'

export const metadata: Metadata = {
  title: 'Felipe Cantu Jr — Full Stack Web Developer in Dallas, TX',
  description:
    'Full-stack developer in Dallas, TX. I build fast, modern web apps and websites that help businesses grow — React, Next.js, Node.js, and clean design. Available for freelance.',
  alternates: { canonical: 'https://felipecantujr.com/' },
  openGraph: {
    title: 'Felipe Cantu Jr — Full Stack Web Developer',
    description: 'Full-stack developer in Dallas, TX helping businesses launch fast, modern websites.',
    url: 'https://felipecantujr.com/',
    images: [{ url: '/images/felipe.jpg' }],
  },
}

export default function HomePage() {
  return <HomeHero />
}
