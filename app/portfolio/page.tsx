import type { Metadata } from 'next'
import { sanity, ALL_PROJECTS_QUERY } from '@/lib/sanity'
import ProjectCarousel from '@/components/ProjectCarousel'

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Browse my web development portfolio — React, Next.js, Node.js, and full-stack projects built for real businesses.',
  alternates: { canonical: 'https://felipecantujr.com/portfolio' },
  openGraph: {
    title: 'Portfolio | Felipe Cantu Jr',
    description: 'Web development portfolio — React, Next.js, Node.js projects.',
    url: 'https://felipecantujr.com/portfolio',
    images: [{ url: '/images/felipe.jpg' }],
  },
}

export const revalidate = 3600

export default async function PortfolioPage() {
  const projects = await sanity.fetch(ALL_PROJECTS_QUERY)
  return (
    <div className="h-[calc(100vh-var(--navbar-h))] overflow-y-auto">
      <ProjectCarousel initialProjects={projects} />
    </div>
  )
}
