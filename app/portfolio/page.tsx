import type { Metadata } from 'next'
import { sanity, SHOWCASE_PROJECTS_QUERY } from '@/lib/sanity'
import ProjectIndex, { type ShowcaseProject } from '@/components/ProjectIndex'
import FinalCta from '@/components/FinalCta'

export const metadata: Metadata = {
  title: 'Selected Work',
  description:
    'Five live projects by Felipe Cantu Jr: a nonprofit donation platform, a 3D e-commerce store, a music player and more, built with React, Next.js and Sanity.',
  alternates: { canonical: 'https://felipecantujr.com/portfolio' },
  openGraph: {
    title: 'Selected Work | Felipe Cantu Jr',
    description: 'Five live projects built with React, Next.js and Sanity, each with a case study.',
    url: 'https://felipecantujr.com/portfolio',
    images: [{ url: '/images/felipe.jpg' }],
  },
}

export const revalidate = 3600

export default async function PortfolioPage() {
  const projects: ShowcaseProject[] = await sanity.fetch(SHOWCASE_PROJECTS_QUERY)
  return (
    <>
      <ProjectIndex projects={projects} />
      <FinalCta />
    </>
  )
}
