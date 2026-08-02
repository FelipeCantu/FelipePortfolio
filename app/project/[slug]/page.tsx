import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanity, PROJECT_BY_SLUG_QUERY, ALL_PROJECTS_SLUGS_QUERY } from '@/lib/sanity'
import SingleProjectContent from '@/components/SingleProjectContent'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const projects: Array<{ slug: string }> = await sanity.fetch(ALL_PROJECTS_SLUGS_QUERY)
  return projects.map((p) => ({ slug: p.slug }))
}

export const revalidate = 3600

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await sanity.fetch(PROJECT_BY_SLUG_QUERY, { slug })
  if (!project) return { title: 'Project Not Found' }

  const description =
    project.excerpt ?? project.description ?? `View the ${project.title} project by Felipe Cantu Jr.`

  return {
    title: project.title,
    description,
    alternates: { canonical: `https://felipecantujr.com/project/${slug}` },
    openGraph: {
      title: `${project.title} | Felipe Cantu Jr`,
      description,
      url: `https://felipecantujr.com/project/${slug}`,
      images: project.mainImage?.asset?.url ? [{ url: project.mainImage.asset.url }] : [],
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = await sanity.fetch(PROJECT_BY_SLUG_QUERY, { slug })
  if (!project) notFound()
  return <SingleProjectContent project={project} slug={slug} />
}
