import type { Metadata } from 'next'
import { sanity, ALL_PROJECTS_QUERY } from '@/lib/sanity'
import ProjectCarousel from '@/components/ProjectCarousel'

export const metadata: Metadata = {
  title: 'Web Developer Portfolio & Case Studies',
  description:
    'Web development portfolio of Felipe Cantu Jr: React, Next.js and full-stack websites and apps built for real businesses, with case studies for each project.',
  alternates: { canonical: 'https://felipecantujr.com/portfolio' },
  openGraph: {
    title: 'Web Developer Portfolio & Case Studies | Felipe Cantu Jr',
    description: 'Web development portfolio — React, Next.js, Node.js projects.',
    url: 'https://felipecantujr.com/portfolio',
    images: [{ url: '/images/og.jpg', width: 1200, height: 630 }],
  },
}

export const revalidate = 3600

export default async function PortfolioPage() {
  const projects = await sanity.fetch(ALL_PROJECTS_QUERY)
  return <ProjectCarousel initialProjects={projects} />
}
