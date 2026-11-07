import type { Metadata } from 'next'
import HomeHero from '@/components/HomeHero'
import FeaturedWork, { type FeaturedProject } from '@/components/FeaturedWork'
import Testimonials, { type Testimonial } from '@/components/Testimonials'
import HomeCta from '@/components/HomeCta'
import { sanity, FEATURED_PROJECTS_QUERY, TESTIMONIALS_QUERY } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'Felipe Cantu Jr — Full Stack Web Developer in Dallas, TX',
  description:
    'Dallas full-stack developer building fast, modern websites and web apps with React and Next.js that help businesses grow. Available for freelance.',
  alternates: { canonical: 'https://felipecantujr.com/' },
  openGraph: {
    title: 'Felipe Cantu Jr — Full Stack Web Developer',
    description: 'Full-stack developer in Dallas, TX helping businesses launch fast, modern websites.',
    url: 'https://felipecantujr.com/',
    images: [{ url: '/images/og.jpg', width: 1200, height: 630 }],
  },
}

// Same cadence as /portfolio: new Sanity content shows up within the hour
export const revalidate = 3600

/** A failed CMS request should hide a section, never take down the home page. */
async function safeFetch<T>(query: string): Promise<T[]> {
  try {
    return (await sanity.fetch<T[]>(query)) ?? []
  } catch (err) {
    console.error('[home] Sanity fetch failed', err)
    return []
  }
}

export default async function HomePage() {
  const [projects, testimonials] = await Promise.all([
    safeFetch<FeaturedProject>(FEATURED_PROJECTS_QUERY),
    safeFetch<Testimonial>(TESTIMONIALS_QUERY),
  ])

  return (
    <>
      <HomeHero />
      <FeaturedWork projects={projects} />
      <Testimonials items={testimonials} />
      <HomeCta />
    </>
  )
}
