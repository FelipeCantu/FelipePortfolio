import { FiArrowUpRight, FiGithub } from 'react-icons/fi'
import Reveal from '@/components/ui/Reveal'
import TransitionLink from '@/components/ui/TransitionLink'
import ProjectFrame from '@/components/ProjectFrame'
import type { ProjectImage } from '@/components/projectMeta'

// ─── Types ────────────────────────────────────────────────────────────────────

/** Shape returned by SHOWCASE_PROJECTS_QUERY (lib/sanity.ts). */
export interface ShowcaseProject {
  _id: string
  title: string
  slug: string
  excerpt?: string
  role?: string
  status?: string
  techStack?: string[]
  date?: string
  place?: string
  liveUrl?: string
  image?: ProjectImage
}

const GITHUB_URL = 'https://github.com/FelipeCantu'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function yearRange(projects: ShowcaseProject[]) {
  const years = projects.map((p) => Number(p.date?.slice(0, 4))).filter(Boolean)
  if (years.length === 0) return null
  const [min, max] = [Math.min(...years), Math.max(...years)]
  return min === max ? `${min}` : `${min} to ${max}`
}

// ─── Card ─────────────────────────────────────────────────────────────────────

/**
 * One case study. The title link is stretched over the whole card (one tab
 * stop, valid HTML); the live-site link in the frame bar sits above it.
 * Phones get image-then-text, never text over the screenshot, and see the
 * whole screenshot instead of a crop.
 */
function ProjectCard({ project, lead = false }: { project: ShowcaseProject; lead?: boolean }) {
  const year = project.date?.slice(0, 4)
  const meta = [project.role, project.place, year].filter(Boolean)

  return (
    <article
      className={[
        'group relative',
        'has-[.card-link:focus-visible]:outline has-[.card-link:focus-visible]:outline-2',
        'has-[.card-link:focus-visible]:outline-offset-[6px] has-[.card-link:focus-visible]:outline-accent-light',
        'rounded-card',
      ].join(' ')}
    >
      {/* Same frame as the case-study hero: clicking the card morphs one into the other */}
      <ProjectFrame
        slug={project.slug}
        title={project.title}
        status={project.status}
        liveUrl={project.liveUrl}
        image={project.image}
        priority={lead}
        // Screenshots are ~2:1. Lead shows nearly all of it on desktop; the rest crop a little
        aspectClassName={lead ? 'aspect-[var(--ar)] md:aspect-[2/1]' : 'aspect-[var(--ar)] md:aspect-[16/10]'}
        sizes={lead ? '(min-width: 72rem) 68rem, 100vw' : '(min-width: 768px) 34rem, 100vw'}
        className="transition-[border-color,box-shadow] duration-[480ms] ease-out-expo group-hover:border-accent/45 group-hover:shadow-glow"
        imageClassName="transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.035]"
      />

      {/* Text: below the image on every size; the lead splits into two columns on desktop */}
      <div className={['mt-5 sm:mt-6', lead ? 'md:grid md:grid-cols-12 md:gap-8' : ''].join(' ')}>
        <div className={lead ? 'md:col-span-7' : ''}>
          {meta.length > 0 && (
            <p className="m-0 flex flex-wrap gap-x-2 font-mono text-[0.75rem] uppercase tracking-[0.1em] text-subtle">
              {/* Each separator trails its item, so a wrapped line never starts with "·" */}
              {meta.map((m, i) => (
                <span key={i} className="inline-flex gap-2">
                  {m}
                  {i < meta.length - 1 && <span aria-hidden="true">·</span>}
                </span>
              ))}
            </p>
          )}

          <h2 className={['mt-2 text-fg', lead ? 'text-h1' : 'text-h2'].join(' ')}>
            <TransitionLink
              href={`/project/${project.slug}`}
              className="card-link inline-flex items-start gap-2 no-underline focus-visible:outline-none after:absolute after:inset-0 after:z-[1] after:rounded-card after:content-['']"
            >
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-[480ms] ease-out-expo group-hover:bg-[length:100%_2px]">
                {project.title}
              </span>
              <FiArrowUpRight
                aria-hidden="true"
                className="mt-[0.15em] h-[0.8em] w-[0.8em] flex-shrink-0 text-accent-light transition-transform duration-[480ms] ease-out-expo group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </TransitionLink>
          </h2>
        </div>

        <div className={lead ? 'md:col-span-5 md:pt-6' : ''}>
          {project.excerpt && (
            <p className={['m-0 mt-3 max-w-[38rem] text-muted', lead ? 'md:mt-0 md:text-lead' : 'text-body'].join(' ')}>
              {project.excerpt}
            </p>
          )}

          {project.techStack && project.techStack.length > 0 && (
            <ul className="m-0 mt-4 flex list-none flex-wrap gap-1.5 p-0" aria-label="Stack">
              {project.techStack.map((tag) => (
                <li
                  key={tag}
                  className="rounded-pill border border-line/20 px-2.5 py-1 font-mono text-[0.72rem] leading-none text-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </article>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProjectIndex({ projects }: { projects: ShowcaseProject[] }) {
  const [lead, ...rest] = projects
  const years = yearRange(projects)

  return (
    // data-route: TransitionLink waits for it before finishing a morph back here
    <div className="page-top w-full pb-section" data-route="/portfolio">
      <header className="container-page mb-12 grid gap-5 md:mb-20 md:grid-cols-12 md:items-end md:gap-8">
        <h1 className="m-0 text-display text-fg md:col-span-7">Selected work</h1>
        <div className="md:col-span-5">
          <p className="lead m-0">
            A nonprofit platform, a 3D storefront, a 3D world for music artists, a music player and a home for skaters.
            Every one is live on the web, and each card opens the story of how it was built.
          </p>
          <p className="m-0 mt-4 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-subtle">
            {projects.length} projects{years ? ` · ${years}` : ''}
          </p>
        </div>
      </header>

      {projects.length === 0 ? (
        <p className="container-page py-16 text-lead text-muted">New case studies are on the way.</p>
      ) : (
        <ol className="container-page grid list-none grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-x-8 md:gap-y-24 lg:gap-x-12">
          <li className="md:col-span-2">
            <ProjectCard project={lead} lead />
          </li>
          {rest.map((project, i) => (
            // Right column drops a step for an editorial rhythm instead of a flat grid
            <Reveal key={project._id} as="li" delay={(i % 2) * 0.08} className={i % 2 === 1 ? 'md:mt-12' : ''}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </ol>
      )}

      <div className="container-page mt-20 md:mt-28">
        <div className="flex flex-col gap-4 border-t border-line/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0 text-muted">Older experiments, clones and design studies live on GitHub.</p>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm self-start sm:self-auto">
            <FiGithub aria-hidden="true" />
            github.com/FelipeCantu
          </a>
        </div>
      </div>
    </div>
  )
}
