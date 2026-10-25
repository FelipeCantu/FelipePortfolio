'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import {
  FiArrowLeft,
  FiExternalLink,
  FiCalendar,
  FiMapPin,
  FiZoomIn,
  FiX,
  FiArrowUpRight,
} from 'react-icons/fi'
import { FaGithub } from 'react-icons/fa'
import { PortableText } from '@portabletext/react'
import { portableTextComponents } from '@/components/portableTextComponents'
import { TYPE_LABELS, TYPE_BADGE, STATUS_CONFIG } from '@/components/projectMeta'
import Reveal from '@/components/ui/Reveal'

// ─── Types ───────────────────────────────────────────────────────────────────

interface GalleryItem {
  asset: { _id: string; url: string }
  alt?: string
  caption?: string
}

interface Project {
  _id: string
  title: string
  excerpt?: string
  description?: string
  body?: unknown[]
  projectType?: string | string[]
  status?: string
  featured?: boolean
  date?: string
  place?: string
  techStack?: string[]
  githubUrl?: string
  liveUrl?: string
  mainImage?: { asset: { _id: string; url: string }; alt?: string }
  gallery?: GalleryItem[]
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

function SectionHeading({ title, count }: { title: string; count: string }) {
  return (
    <div className="mb-6 flex items-baseline gap-4">
      <h2 className="text-h3 text-fg">{title}</h2>
      <span className="text-small text-subtle">{count}</span>
    </div>
  )
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function SingleProjectContent({ project }: Props) {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  const openLightbox = (src: string, alt: string) => setLightbox({ src, alt })
  const closeLightbox = () => setLightbox(null)

  // Scroll lock lives in the effect so it is released on unmount too
  // (e.g. navigating away while the lightbox is open)
  useEffect(() => {
    if (!lightbox) return
    document.body.style.overflow = 'hidden'
    closeBtnRef.current?.focus()
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
    }
    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [lightbox])

  // Sanity allows gallery entries with no uploaded asset: skip them
  const gallery = (project.gallery ?? []).filter((img) => img.asset?.url)

  const types = Array.isArray(project.projectType)
    ? project.projectType
    : project.projectType
    ? [project.projectType]
    : []

  const statusCfg = STATUS_CONFIG[project.status ?? 'completed'] ?? STATUS_CONFIG.completed

  const formattedDate = project.date
    ? new Date(project.date + 'T12:00:00').toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })
    : null

  const hasLinks = Boolean(project.liveUrl || project.githubUrl)
  const hasBody = Array.isArray(project.body) && project.body.length > 0

  return (
    <>
      {/* ── Hero ── */}
      <header className="container-page page-top pb-10 sm:pb-14">
        <motion.div variants={heroStack} initial="hidden" animate="show">
          <motion.div variants={rise}>
            <Link href="/portfolio" className="btn btn-ghost btn-sm group -ml-4 mb-6">
              <FiArrowLeft
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:-translate-x-1"
              />
              Portfolio
            </Link>
          </motion.div>

          <div className="max-w-3xl">
            {/* Badges */}
            <motion.ul variants={rise} className="mb-6 flex list-none flex-wrap gap-2 p-0">
              {types
                .filter((t) => TYPE_LABELS[t])
                .map((t) => (
                  <li
                    key={t}
                    className={`rounded-pill border px-3 py-1 font-mono text-[0.7rem] font-medium uppercase tracking-[0.1em] ${TYPE_BADGE[t]}`}
                  >
                    {TYPE_LABELS[t]}
                  </li>
                ))}
              <li
                className={`inline-flex items-center gap-1.5 rounded-pill border px-3 py-1 font-mono text-[0.7rem] font-medium uppercase tracking-[0.1em] ${statusCfg.badge}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${statusCfg.dot}`} aria-hidden="true" />
                {statusCfg.label}
              </li>
              {project.featured && (
                <li className="rounded-pill border border-gold/35 bg-gold/10 px-3 py-1 font-mono text-[0.7rem] font-medium uppercase tracking-[0.1em] text-gold">
                  Featured
                </li>
              )}
            </motion.ul>

            <motion.h1 variants={rise} className="text-h1 text-fg sm:text-display">
              {project.title}
            </motion.h1>

            {project.excerpt && (
              <motion.p variants={rise} className="lead mt-5 max-w-2xl">
                {project.excerpt}
              </motion.p>
            )}

            {hasLinks && (
              <motion.div variants={rise} className="mt-8 flex flex-wrap gap-3">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    <FiArrowUpRight aria-hidden="true" />
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                    <FaGithub aria-hidden="true" />
                    GitHub
                  </a>
                )}
              </motion.div>
            )}
          </div>

          {/* Project image */}
          {project.mainImage?.asset?.url && (
            <motion.figure
              variants={rise}
              className="mt-12 overflow-hidden rounded-card border border-line/15 shadow-lift"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.mainImage.asset.url}
                alt={project.mainImage.alt ?? project.title}
                className="w-full object-cover"
              />
            </motion.figure>
          )}
        </motion.div>
      </header>

      {/* ── Metadata strip ── */}
      {(formattedDate || project.place) && (
        <div className="border-y border-line/15 bg-white/[0.02]">
          <dl className="container-page m-0 flex flex-wrap items-center gap-x-8 gap-y-2 py-4">
            {formattedDate && (
              <div className="flex items-center gap-2">
                <dt className="sr-only">Date</dt>
                <FiCalendar size={14} className="flex-shrink-0 text-accent-light" aria-hidden="true" />
                <dd className="m-0 text-small font-medium text-muted">{formattedDate}</dd>
              </div>
            )}
            {project.place && (
              <div className="flex items-center gap-2">
                <dt className="sr-only">Context</dt>
                <FiMapPin size={14} className="flex-shrink-0 text-accent-light" aria-hidden="true" />
                <dd className="m-0 text-small font-medium text-muted">{project.place}</dd>
              </div>
            )}
            <span className="eyebrow ml-auto hidden text-accent-light/70 md:block">Case study</span>
          </dl>
        </div>
      )}

      {/* ── Body ── */}
      <div className="container-page pb-28 pt-14 lg:pb-section">
        <div className="flex flex-col items-start gap-12 lg:flex-row lg:gap-16">
          <Reveal className="min-w-0 max-w-prose-lg flex-1">
            <article className="prose-pt">
              {hasBody ? (
                <PortableText value={project.body as never} components={portableTextComponents} />
              ) : project.description ? (
                <p>{project.description}</p>
              ) : null}
            </article>
          </Reveal>

          {/* Desktop side column: sticky links */}
          {hasLinks && (
            <aside
              className="hidden w-[15rem] flex-shrink-0 lg:sticky lg:block"
              style={{ top: 'calc(var(--navbar-h) + 2rem)' }}
              aria-label="Project links"
            >
              <div className="card overflow-hidden">
                <div className="h-0.5 bg-gradient-to-r from-accent to-accent-light" aria-hidden="true" />
                <div className="flex flex-col gap-2.5 p-4">
                  <p className="eyebrow mb-1 !text-subtle">View project</p>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm justify-between"
                    >
                      Live Demo
                      <FiExternalLink aria-hidden="true" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm justify-between"
                    >
                      GitHub
                      <FaGithub aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </aside>
          )}
        </div>

        {/* Tech stack */}
        {project.techStack && project.techStack.length > 0 && (
          <Reveal className="mt-16 border-t border-line/15 pt-12">
            <SectionHeading title="Tech Stack" count={`${project.techStack.length} technologies`} />
            <ul className="m-0 flex list-none flex-wrap gap-2.5 p-0">
              {project.techStack.map((tag, i) => (
                <li
                  key={`${tag}-${i}`}
                  className="rounded-control border border-accent/25 bg-accent/[0.07] px-3.5 py-1.5 font-mono text-[0.8rem] font-medium text-accent-light transition-colors duration-200 hover:border-accent-light/60 hover:bg-accent/15"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {/* Gallery */}
        {gallery.length > 0 && (
          <section className="mt-16 border-t border-line/15 pt-12" aria-label="Gallery">
            <SectionHeading title="Gallery" count={`${gallery.length} image${gallery.length !== 1 ? 's' : ''}`} />

            {/* 1 / 2 / 3 columns; every 4th tile spans two columns on sm+ for rhythm */}
            <ul className="m-0 grid list-none auto-rows-[16rem] grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
              {gallery.map((img, i) => {
                const label = img.alt ?? `Gallery image ${i + 1}`
                return (
                  <li key={`${img.asset._id}-${i}`} className="sm:[&:nth-child(4n)]:col-span-2">
                    <button
                      type="button"
                      onClick={() => openLightbox(img.asset.url, label)}
                      aria-label={`Open gallery image ${i + 1}${img.alt ? ': ' + img.alt : ''}`}
                      className="group relative block h-full w-full cursor-zoom-in overflow-hidden rounded-card border border-line/15 bg-surface p-0 text-left"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.asset.url}
                        alt={label}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.05]"
                      />
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
      </div>

      {/* ── Mobile floating CTA bar (sidebar links are hidden below lg) ── */}
      {hasLinks && (
        <motion.div
          className="glass fixed inset-x-0 bottom-0 z-50 border-t border-line/20 lg:hidden"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.45, delay: 0.8, ease: EASE }}
        >
          <div className="mx-auto flex max-w-lg gap-2.5 px-4 py-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm flex-1"
              >
                <FiArrowUpRight aria-hidden="true" />
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm flex-1"
              >
                <FaGithub aria-hidden="true" />
                GitHub
              </a>
            )}
          </div>
          {/* Safe-area inset for devices with a home indicator */}
          <div className="h-[env(safe-area-inset-bottom)]" />
        </motion.div>
      )}

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
    </>
  )
}
