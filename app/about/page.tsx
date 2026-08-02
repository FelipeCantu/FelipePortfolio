import type { Metadata } from 'next'
import AboutContent from '@/components/AboutContent'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Felipe Cantu Jr — full-stack developer in Dallas, TX. My story, skills, and values.',
  alternates: { canonical: 'https://felipecantujr.com/about' },
  openGraph: {
    title: 'About | Felipe Cantu Jr',
    description: 'Learn about Felipe Cantu Jr — full-stack developer in Dallas, TX.',
    url: 'https://felipecantujr.com/about',
    images: [{ url: '/images/felipe.jpg' }],
  },
}

export default function AboutPage() {
  return <AboutContent />
}
