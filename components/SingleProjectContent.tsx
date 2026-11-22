'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { AnimatePresence, m as motion, type Variants } from 'framer-motion'
import { FiArrowLeft, FiZoomIn, FiX, FiArrowUpRight } from 'react-icons/fi'
import { FaGithub } from 'react-icons/fa'
import { PortableText } from '@portabletext/react'
import { portableTextComponents } from '@/components/portableTextComponents'
import { STATUS_CONFIG, type ProjectImage } from '@/components/projectMeta'
import ProjectFrame from '@/components/ProjectFrame'
import Reveal from '@/components/ui/Reveal'
import TransitionLink from '@/components/ui/TransitionLink'

// ─── Types ───────────────────────────────────────────────────────────────────

interface Project {
  _id: string
  title: string
  excerpt?: string
  description?: string
  body?: unknown[]
  role?: string
  status?: string
  date?: string
  place?: string
  techStack?: string[]
  githubUrl?: string
  liveUrl?: string
  image?: ProjectImage
  gallery?: Array<ProjectImage & { caption?: string }>
  next?: {
    title: string
    slug: string
    excerpt?: string
    role?: string
    status?: string
    liveUrl?: string
    image?: ProjectImage
  } | null
}

interface Props {
  project: Project
  slug: string
}

// ─── Motion ──────────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const

const heroStack: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}
const rise: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}

// ─── Small pieces ────────────────────────────────────────────────────────────

function ProjectLinks({ project, size = '' }: { project: Project; size?: string }) {
  return (
    <>
      {project.liveUrl && (
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={`btn btn-primary group ${size}`}>
          Visit live site
          <FiArrowUpRight
            aria-hidden="true"
            className="transition-transform duration-200 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      )}
      {project.githubUrl && (
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={`btn btn-secondary ${size}`}>
          Source
          <FaGithub aria-hidden="true" />
        </a>
      )}
    </>
  )
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function SingleProjectContent({ project, slug }: Props) {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  // Mobile link bar: only once the hero buttons have scrolled away, and gone
  // again at the end of the case study so it never covers what follows
  const heroLinksRef = useRef<HTMLDivElement>(null)
  const endRef = useRef<HTMLDivElement>(null)
  const [pastHero, setPastHero] = useState(false)
  const [atEnd, setAtEnd] = useState(false)

  useEffect(() => {
    const hero = heroLinksRef.current
    const end = endRef.current
    if (!hero || !end) return
    const heroObserver = new IntersectionObserver(([e]) =>
      setPastHero(!e.isIntersecting && e.boundingClientRect.top < 0),
    )
    const endObserver = new IntersectionObserver(([e]) =>
      setAtEnd(e.isIntersecting || e.boundingClientRect.top < 0),
    )
    heroObserver.observe(hero)
    endObserver.observe(end)
    return () => {
      heroObserver.disconnect()
      endObserver.disconnect()
    }
  }, [])

  const openLightbox = (src: string, alt: string) => setLightbox({ src, alt })
  const closeLightbox = () => setLightbox(null)

  // Scroll lock lives in the effect so it is released on unmount too
  // (e.g. navigating away while the lightbox is open)
  useEffect(() => {
    if (!lightbox) return
    document.body.style.overflow = 'hidden'
    const opener = document.activeElement as HTMLElement | null
    closeBtnRef.current?.focus()
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
      // The close button is the only control in the dialog: keep focus inside it
      if (e.key === 'Tab') {
        e.preventDefault()
        closeBtnRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
      // Return focus to the thumbnail that opened the lightbox
      opener?.focus?.()
    }
  }, [lightbox])

  const gallery = project.gallery ?? []
  const status = project.status ?? 'completed'
  const statusCfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.completed

  const formattedDate = project.date
    ? new Date(project.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : null

  const facts = [
    ['Role', project.role],
    ['Date', formattedDate],
    ['Context', project.place],
  ].filter((f): f is [string, string] => Boolean(f[1]))

  const hasLinks = Boolean(project.liveUrl || project.githubUrl)
  const hasBody = Array.isArray(project.body) && project.body.length > 0
  const showBar = hasLinks && pastHero && !atEnd

  return (
    // data-route: TransitionLink waits for it before finishing the card-to-hero morph
    <div data-route={`/project/${slug}`}>
      {/* ── Hero: same two-column header as the work index ── */}
      <header className="container-page page-top">
        <motion.div
          variants={heroStack}
          initial="hidden"
          animate="show"
          className="grid gap-5 md:grid-cols-12 md:items-end md:gap-8"
        >
          <motion.div variants={rise} className="md:col-span-12">
            <TransitionLink href="/portfolio" className="btn btn-ghost btn-sm group -ml-4">
              <FiArrowLeft
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:-translate-x-1"
              />
              All work
            </TransitionLink>
          </motion.div>

          <motion.h1 variants={rise} className="m-0 text-h1 text-fg sm:text-display md:col-span-7">
            {project.title}
          </motion.h1>

          <motion.div variants={rise} className="md:col-span-5">
            {project.excerpt && <p className="lead m-0">{project.excerpt}</p>}
            {hasLinks && (
              <div ref={heroLinksRef} className="mt-6 flex flex-wrap gap-3">
                <ProjectLinks project={project} />
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Outside the stagger: it must be on screen at once to receive the card morph */}
        <ProjectFrame
          slug={slug}
          title={project.title}
          status={status}
          liveUrl={project.liveUrl}
          image={project.image}
          priority
          aspectClassName="aspect-[var(--ar)]"
          sizes="(min-width: 72rem) 68rem, 100vw"
          className="mt-10 md:mt-14"
        />
      </header>

      {/* ── Body + facts ── */}
      <div className="container-page pb-section pt-14 md:pt-20">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <aside className="lg:sticky lg:order-2 lg:col-span-4" style={{ top: 'calc(var(--navbar-h) + 2rem)' }} aria-label="Project facts">
            <dl className="m-0 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-line/15 py-6 lg:grid-cols-1">
              {facts.map(([label, value]) => (
                <div key={label}>
                  <dt className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-subtle">{label}</dt>
                  <dd className="m-0 mt-1 text-small text-fg">{value}</dd>
                </div>
              ))}
              <div>
                <dt className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-subtle">Status</dt>
                <dd className="m-0 mt-1 flex items-center gap-2 text-small text-fg">
                  <span className={`h-1.5 w-1.5 rounded-full ${statusCfg.dot}`} aria-hidden="true" />
                  {statusCfg.label}
                </dd>
              </div>
              {project.techStack && project.techStack.length > 0 && (
                <div className="col-span-2 lg:col-span-1">
                  <dt className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-subtle">Stack</dt>
                  <dd className="m-0 mt-2">
                    <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
                      {project.techStack.map((tag, i) => (
                        <li
                          key={`${tag}-${i}`}
                          className="rounded-pill border border-line/20 px-2.5 py-1 font-mono text-[0.72rem] leading-none text-muted"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
            </dl>
            {hasLinks && (
              <div className="mt-6 hidden flex-col gap-2.5 lg:flex">
                <ProjectLinks project={project} size="btn-sm justify-between" />
              </div>
            )}
          </aside>

          <Reveal className="min-w-0 lg:order-1 lg:col-span-8">
            <article className="prose-pt max-w-prose-lg">
              {hasBody ? (
                <PortableText value={project.body as never} components={portableTextComponents} />
              ) : project.description ? (
                <p>{project.description}</p>
              ) : null}
            </article>
          </Reveal>
        </div>

        {/* Gallery */}
        {gallery.length > 0 && (
          <section className="mt-16 border-t border-line/15 pt-12" aria-labelledby="gallery-heading">
            <div className="mb-6 flex items-baseline gap-4">
              <h2 id="gallery-heading" className="text-h3 text-fg">
                Gallery
              </h2>
              <span className="text-small text-subtle">
                {gallery.length} image{gallery.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Screenshots are ~2:1, so tiles are too: 1 column on phones, 2 above (4 images make a 2x2) */}
            <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:gap-4">
              {gallery.map((img, i) => {
                const label = img.alt ?? `Gallery image ${i + 1}`
                return (
                  <li key={`${img.url}-${i}`}>
                    <button
                      type="button"
                      onClick={() => openLightbox(`${img.url}?w=2000&auto=format`, label)}
                      aria-label={`Open gallery image ${i + 1}${img.alt ? ': ' + img.alt : ''}`}
                      className="group relative block aspect-[2/1] w-full cursor-zoom-in overflow-hidden rounded-card border border-line/15 bg-surface p-0 text-left"
                    >
                      {img.url && (
                        <Image
                          src={img.url}
                          alt={label}
                          fill
                          sizes="(min-width: 72rem) 34rem, (min-width: 640px) 50vw, 100vw"
                          placeholder={img.lqip ? 'blur' : 'empty'}
                          blurDataURL={img.lqip}
                          className="object-cover object-left-top transition-transform duration-700 ease-out-expo group-hover:scale-[1.05]"
                        />
                      )}
                      <span
                        className="absolute inset-0 bg-gradient-to-t from-bg/85 via-bg/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                        aria-hidden="true"
                      />
                      <span
                        className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                        aria-hidden="true"
                      >
                        <span className="glass flex h-11 w-11 items-center justify-center rounded-full border border-line/40">
                          <FiZoomIn size={18} className="text-fg" />
                        </span>
                      </span>
                      {img.caption && (
                        <span className="absolute inset-x-0 bottom-0 translate-y-1 px-4 pb-4 pt-10 text-center text-[0.8rem] leading-snug text-fg opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                          {img.caption}
                        </span>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>
        )}

        {/* The mobile link bar hides once this reaches the screen */}
        <div ref={endRef} aria-hidden="true" />
      </div>

      {/* ── Next project: the same card language as the index, so it morphs too ── */}
      {project.next && (
        <section className="border-t border-line/15" aria-labelledby="next-project-label">
          <div className="container-page section-y">
            <p
              id="next-project-label"
              className="m-0 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-subtle"
            >
              Next project
            </p>
            <article
              className={[
                'group relative mt-6 grid items-center gap-6 rounded-card md:grid-cols-12 md:gap-8',
                'has-[.card-link:focus-visible]:outline has-[.card-link:focus-visible]:outline-2',
                'has-[.card-link:focus-visible]:outline-offset-[6px] has-[.card-link:focus-visible]:outline-accent-light',
              ].join(' ')}
            >
              <div className="md:order-2 md:col-span-7">
                <ProjectFrame
                  slug={project.next.slug}
                  title={project.next.title}
                  status={project.next.status}
                  liveUrl={project.next.liveUrl}
                  image={project.next.image}
                  aspectClassName="aspect-[var(--ar)] md:aspect-[16/10]"
                  sizes="(min-width: 768px) 40rem, 100vw"
                  className="transition-[border-color,box-shadow] duration-[480ms] ease-out-expo group-hover:border-accent/45 group-hover:shadow-glow"
                  imageClassName="transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.035]"
                />
              </div>
              <div className="md:order-1 md:col-span-5">
                {project.next.role && (
                  <p className="m-0 font-mono text-[0.75rem] uppercase tracking-[0.1em] text-subtle">
                    {project.next.role}
                  </p>
                )}
                <h2 className="mt-2 text-h1 text-fg">
                  <TransitionLink
                    href={`/project/${project.next.slug}`}
                    className="card-link inline-flex items-start gap-2 no-underline focus-visible:outline-none after:absolute after:inset-0 after:z-[1] after:rounded-card after:content-['']"
                  >
                    <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-[480ms] ease-out-expo group-hover:bg-[length:100%_2px]">
                      {project.next.title}
                    </span>
                    <FiArrowUpRight
                      aria-hidden="true"
                      className="mt-[0.15em] h-[0.8em] w-[0.8em] flex-shrink-0 text-accent-light transition-transform duration-[480ms] ease-out-expo group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </TransitionLink>
                </h2>
                {project.next.excerpt && <p className="m-0 mt-3 max-w-[34rem] text-muted">{project.next.excerpt}</p>}
              </div>
            </article>
          </div>
        </section>
      )}

      {/* ── Mobile link bar (the facts column holds the links on lg+) ── */}
      <AnimatePresence>
        {showBar && (
          <motion.div
            className="glass fixed inset-x-0 bottom-0 z-50 border-t border-line/20 lg:hidden"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="mx-auto flex max-w-lg gap-2.5 px-4 py-3 [&>a]:flex-1">
              <ProjectLinks project={project} size="btn-sm" />
            </div>
            {/* Safe-area inset for devices with a home indicator */}
            <div className="h-[env(safe-area-inset-bottom)]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Lightbox ── */}
      {lightbox && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-bg/95 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          onClick={closeLightbox}
        >
          <button
            ref={closeBtnRef}
            type="button"
            className="absolute right-4 top-4 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line/30 bg-white/[0.06] text-fg transition-colors hover:bg-white/[0.12] sm:right-6 sm:top-6"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <FiX size={18} aria-hidden="true" />
          </button>

          <motion.img
            src={lightbox.src}
            alt={lightbox.alt}
            className="max-h-[88vh] max-w-[92vw] rounded-card object-contain shadow-lift"
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          />

          <p className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 select-none text-[0.75rem] tracking-[0.1em] text-subtle">
            ESC to close
          </p>
        </motion.div>
      )}
    </div>
  )
}
