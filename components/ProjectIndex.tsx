import Image from 'next/image'
import Link from 'next/link'
import { FiArrowUpRight, FiGithub } from 'react-icons/fi'
import Reveal from '@/components/ui/Reveal'
import { STATUS_CONFIG } from '@/components/projectMeta'

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
  image?: { alt?: string; url?: string; lqip?: string; width?: number; height?: number }
}

const GITHUB_URL = 'https://github.com/FelipeCantu'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function hostname(url?: string) {
  if (!url) return null
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return null
  }
}

function yearRange(projects: ShowcaseProject[]) {
  const years = projects.map((p) => Number(p.date?.slice(0, 4))).filter(Boolean)
  if (years.length === 0) return null
  const [min, max] = [Math.min(...years), Math.max(...years)]
  return min === max ? `${min}` : `${min} to ${max}`
}

// ─── Status dot ───────────────────────────────────────────────────────────────

/** Live projects get a steady dot; work in progress keeps a slow pulse. */
function StatusDot({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.completed
  return (
    <span className="relative flex h-2 w-2 flex-shrink-0" aria-hidden="true">
      {status === 'inProgress' && (
        <span className={`absolute inset-0 animate-pulse-ring rounded-full ${cfg.dot}`} />
      )}
      <span className={`relative h-2 w-2 rounded-full ${cfg.dot}`} />
    </span>
  )
}

// ─── Card ─────────────────────────────────────────────────────────────────────

/**
 * One case study. The title link is stretched over the whole card (one tab
 * stop, valid HTML); the live-site link in the frame bar sits above it.
 * Phones get image-then-text, never text over the screenshot.
 */
function ProjectCard({ project, lead = false }: { project: ShowcaseProject; lead?: boolean }) {
  const status = project.status ?? 'completed'
  const domain = hostname(project.liveUrl)
  const year = project.date?.slice(0, 4)
  const meta = [project.role, project.place, year].filter(Boolean)
  const img = project.image

  return (
    <article
      className={[
        'group relative',
        'has-[.card-link:focus-visible]:outline has-[.card-link:focus-visible]:outline-2',
        'has-[.card-link:focus-visible]:outline-offset-[6px] has-[.card-link:focus-visible]:outline-accent-light',
        'rounded-card',
      ].join(' ')}
    >
      {/* Frame: browser-style bar carrying real info (live domain + status) above the screenshot */}
      <div
        className={[
          'overflow-hidden rounded-card border border-line/15 bg-surface shadow-card',
          'transition-[border-color,box-shadow] duration-[480ms] ease-out-expo',
          'group-hover:border-accent/45 group-hover:shadow-glow',
        ].join(' ')}
      >
        <div className="flex h-10 items-center gap-3 border-b border-line/10 px-4 font-mono text-[0.75rem] text-subtle">
          <StatusDot status={status} />
          {domain ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-[2] -my-2 inline-flex min-w-0 items-center gap-1 py-2 text-muted transition-colors duration-200 hover:text-fg"
              aria-label={`Visit ${domain} (opens in a new tab)`}
            >
              <span className="truncate">{domain}</span>
              <FiArrowUpRight className="flex-shrink-0" aria-hidden="true" />
            </a>
          ) : (
            <span className="truncate">{project.title}</span>
          )}
          <span className="ml-auto flex-shrink-0 uppercase tracking-[0.12em]">
            {STATUS_CONFIG[status]?.label ?? STATUS_CONFIG.completed.label}
          </span>
        </div>

        <div
          className={[
            'relative overflow-hidden bg-raised',
            // Screenshots are ~2:1. Lead shows nearly all of it; the rest crop a little; phones keep the centre.
            lead ? 'aspect-[16/10] md:aspect-[2/1]' : 'aspect-[16/10]',
          ].join(' ')}
        >
          {img?.url ? (
            <Image
              src={img.url}
              alt={img.alt ?? ''}
              fill
              priority={lead}
              sizes={lead ? '(min-width: 72rem) 68rem, 100vw' : '(min-width: 768px) 34rem, 100vw'}
              placeholder={img.lqip ? 'blur' : 'empty'}
              blurDataURL={img.lqip}
              className="object-cover object-center transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.035]"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-accent-dark/30 via-surface to-accent/10" />
          )}
          {/* Inner hairline keeps light screenshots from bleeding into the frame */}
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.04)]" aria-hidden="true" />
        </div>
      </div>

      {/* Text: below the image on every size; the lead splits into two columns on desktop */}
      <div className={['mt-5 sm:mt-6', lead ? 'md:grid md:grid-cols-12 md:gap-8' : ''].join(' ')}>
        <div className={lead ? 'md:col-span-7' : ''}>
          {meta.length > 0 && (
            <p className="m-0 flex flex-wrap gap-x-2 font-mono text-[0.75rem] uppercase tracking-[0.1em] text-subtle">
              {meta.map((m, i) => (
                <span key={i} className="inline-flex gap-2">
                  {i > 0 && <span aria-hidden="true">·</span>}
                  {m}
                </span>
              ))}
            </p>
          )}

          <h2 className={['mt-2 text-fg', lead ? 'text-h1' : 'text-h2'].join(' ')}>
            <Link
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
            </Link>
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
    <div className="page-top w-full pb-section">
      <header className="container-page mb-12 grid gap-5 md:mb-20 md:grid-cols-12 md:items-end md:gap-8">
        <h1 className="m-0 text-display text-fg md:col-span-7">Selected work</h1>
        <div className="md:col-span-5">
          <p className="lead m-0">
            A nonprofit platform, a 3D storefront, a music player and a home for skaters. Every one is live on the web,
            and each card opens the story of how it was built.
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
            <Reveal key={project._id} as="li" delay={(i % 2) * 0.08} className={i % 2 === 1 ? 'md:mt-24' : ''}>
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
