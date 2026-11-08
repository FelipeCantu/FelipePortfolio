import type { Metadata } from 'next'
import HomeHero from '@/components/HomeHero'
import Services from '@/components/Services'
import HowItWorks from '@/components/HowItWorks'
import Testimonials from '@/components/Testimonials'
import FinalCta from '@/components/FinalCta'

export const metadata: Metadata = {
  title: { absolute: 'Felipe Cantu Jr — Full Stack Web Developer in Dallas, TX' },
  description:
    'Full-stack developer in Dallas, TX. I build fast, modern web apps and websites that help businesses grow — React, Next.js, Node.js, and clean design. Available for freelance.',
  alternates: { canonical: 'https://felipecantujr.com/' },
  openGraph: {
    type: 'website',
    siteName: 'Felipe Cantu Jr',
    title: 'Felipe Cantu Jr — Full Stack Web Developer',
    description: 'Full-stack developer in Dallas, TX helping businesses launch fast, modern websites.',
    url: 'https://felipecantujr.com/',
    images: [{ url: '/images/felipe.jpg', alt: 'Felipe Cantu Jr, full stack web developer in Dallas, TX' }],
  },
}

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HowItWorks />
      <Services />
      {/* Renders nothing until real testimonials exist (Sanity or published portal reviews). */}
      {/* TODO(Felipe): add real client testimonials in Sanity, or publish portal reviews, so this section appears. */}
      <Testimonials />
      <FinalCta />
    </>
  )
}
