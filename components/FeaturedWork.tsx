import Link from 'next/link'
import Image from 'next/image'
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi'
import Reveal from '@/components/ui/Reveal'
import { TYPE_BADGE, TYPE_LABELS } from '@/components/projectMeta'

export interface FeaturedProject {
  _id: string
  title: string
  slug?: { current: string }
  excerpt?: string
  projectType?: string | string[]
  techStack?: string[]
  mainImage?: { asset?: { _id: string; url: string }; alt?: string }
}

/** Sanity CDN image, resized and format-negotiated by Sanity itself. */
function sanityImage(url: string, width: number) {
  return `${url}?w=${width}&fit=crop&auto=format`
}

/**
 * Home page "Selected work": the first three projects from Sanity, so visitors
 * see real work without leaving the landing page. The first card spans wider
 * on large screens to give the strongest project the most room.
 */
export default function FeaturedWork({ projects }: { projects: FeaturedProject[] }) {
  if (!projects?.length) return null

  return (
    <section aria-labelledby="work-title" className="section-y">
      <div className="container-page">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4 max-md:mb-8">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 id="work-title" className="mt-3 text-h2 text-fg">
              Recent projects
            </h2>
          </div>
          <Link href="/portfolio" className="btn btn-secondary btn-sm group">
            All projects
            <FiArrowRight aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <ul className="m-0 grid list-none gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => {
            const href = project.slug?.current ? `/project/${project.slug.current}` : '/portfolio'
            const types = Array.isArray(project.projectType)
              ? project.projectType
              : project.projectType
              ? [project.projectType]
              : []
            const img = project.mainImage?.asset?.url
            const wide = i === 0 && projects.length === 3

            return (
              <Reveal as="li" key={project._id} delay={i * 0.08} className={wide ? 'md:col-span-2 lg:col-span-2' : ''}>
                <Link
                  href={href}
                  className="card-interactive group flex h-full flex-col overflow-hidden no-underline"
                >
                  <div className={`relative overflow-hidden bg-raised ${wide ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                    {img ? (
                      <Image
                        src={sanityImage(img, wide ? 1200 : 800)}
                        alt={project.mainImage?.alt || `${project.title} screenshot`}
                        fill
                        sizes={wide ? '(min-width: 1024px) 66vw, (min-width: 768px) 100vw, 100vw' : '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'}
                        className="object-cover object-top outline outline-1 -outline-offset-1 outline-white/10 transition-transform duration-500 ease-out-expo group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center font-display text-h3 text-subtle" aria-hidden="true">
                        {project.title}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col gap-3 p-6">
                    {types.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {types.map((t) => (
                          <span
                            key={t}
                            className={`inline-flex items-center rounded-pill border px-2 py-0.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.1em] ${TYPE_BADGE[t] ?? ''}`}
                          >
                            {TYPE_LABELS[t] ?? t}
                          </span>
                        ))}
                      </div>
                    )}
                    <h3 className="m-0 flex items-start justify-between gap-3 text-h3 text-fg">
                      {project.title}
                      <FiArrowUpRight
                        aria-hidden="true"
                        className="mt-1 flex-shrink-0 text-subtle transition-[color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-light"
                      />
                    </h3>
                    {project.excerpt && <p className="m-0 line-clamp-3 text-small text-muted">{project.excerpt}</p>}
                    {project.techStack && project.techStack.length > 0 && (
                      <p className="m-0 mt-auto pt-2 font-mono text-xs text-subtle">
                        {project.techStack.slice(0, 4).join(' · ')}
                      </p>
                    )}
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
