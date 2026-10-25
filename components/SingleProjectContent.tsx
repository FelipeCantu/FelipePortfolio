'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
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
import { urlFor } from '@/lib/sanity'

// ─── Design tokens (keep in sync with tailwind.config.ts) ──────────────────

const TYPE_COLORS: Record<string, string> = {
  web: '#3498db',
  mobile: '#9b59b6',
  design: '#e67e22',
  desktop: '#1abc9c',
}
const TYPE_LABELS: Record<string, string> = {
  web: 'Web',
  mobile: 'Mobile',
  design: 'Design',
  desktop: 'Desktop App',
}
const STATUS_CONFIG: Record<
  string,
  { bg: string; text: string; border: string; dot: string; label: string }
> = {
  inProgress: {
    bg: 'rgba(243,156,18,0.12)',
    text: '#f39c12',
    border: 'rgba(243,156,18,0.30)',
    dot: '#f39c12',
    label: 'In Progress',
  },
  completed: {
    bg: 'rgba(46,204,113,0.12)',
    text: '#2ecc71',
    border: 'rgba(46,204,113,0.30)',
    dot: '#2ecc71',
    label: 'Completed',
  },
  archived: {
    bg: 'rgba(149,165,166,0.12)',
    text: '#95a5a6',
    border: 'rgba(149,165,166,0.30)',
    dot: '#95a5a6',
    label: 'Archived',
  },
}

// ─── Portable Text Components ────────────────────────────────────────────────

const portableComponents = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-display font-bold text-white leading-[1.15] tracking-[-0.025em] mb-4 mt-12 first:mt-0"
          style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)' }}>
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-display font-semibold text-white/90 text-xl leading-snug mb-3 mt-9 first:mt-0">
        {children}
      </h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="font-display font-semibold text-white/85 text-lg mb-2 mt-7 first:mt-0">
        {children}
      </h4>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="relative my-8 pl-6 pr-5 py-4 rounded-r-2xl italic text-white/60 text-[1.05rem] leading-[1.8]"
                  style={{ borderLeft: '3px solid var(--color-accent,#0ea5e9)', background: 'rgba(14,165,233,0.05)' }}>
        {children}
      </blockquote>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-[1.4em] last:mb-0 leading-[1.9] text-white/70 text-[1rem]">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-white">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic text-white/65">{children}</em>
    ),
    link: ({ children, value }: { children?: React.ReactNode; value?: { href: string } }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent-light underline underline-offset-[3px] decoration-accent/40 hover:decoration-accent hover:text-white transition-colors duration-150"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="my-6 space-y-2.5 pl-1">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="my-6 space-y-2.5 pl-5 list-decimal">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="flex gap-3 items-start text-white/70 leading-[1.75]">
        <span className="mt-[0.55em] w-1 h-1 rounded-full flex-shrink-0"
              style={{ background: 'var(--color-accent,#0ea5e9)' }} />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className="text-white/70 leading-[1.75] pl-1 [&::marker]:text-accent [&::marker]:font-semibold">
        {children}
      </li>
    ),
  },
  types: {
    image: ({
      value,
    }: {
      value: { asset: never; alt?: string; caption?: string }
    }) => (
      <figure className="my-10">
        <img
          src={urlFor(value.asset).url()}
          alt={value.alt ?? 'Project image'}
          className="w-full rounded-2xl shadow-[0_12px_48px_rgba(0,0,0,0.5)]"
        />
        {value.caption && (
          <figcaption className="text-center text-sm text-white/35 italic mt-3 leading-relaxed">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
}

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

// ─── Component ───────────────────────────────────────────────────────────────

export default function SingleProjectContent({ project }: Props) {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)

  const openLightbox = (src: string, alt: string) => {
    setLightbox({ src, alt })
    document.body.style.overflow = 'hidden'
  }
  const closeLightbox = () => {
    setLightbox(null)
    document.body.style.overflow = ''
  }

  useEffect(() => {
    if (!lightbox) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox])

  const types = Array.isArray(project.projectType)
    ? project.projectType
    : project.projectType
    ? [project.projectType]
    : []

  const statusCfg =
    STATUS_CONFIG[project.status ?? 'completed'] ?? STATUS_CONFIG.completed

  const formattedDate = project.date
    ? new Date(project.date + 'T12:00:00').toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })
    : null


  return (
    <>
      {/*
        All keyframes defined here keep the component self-contained
        and avoid relying on arbitrary Tailwind JIT generation for
        the one-off stagger delays used throughout.
      */}
      <style>{`
        @keyframes spc-fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spc-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes spc-slide-right {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes spc-scale-up {
          from { opacity: 0; transform: scale(0.94); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes spc-line-grow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
@keyframes spc-badge-pop {
          from { opacity: 0; transform: translateY(8px) scale(0.9); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes spc-float-cta {
          from { opacity: 0; transform: translateY(100%); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .spc-animate-fade-up {
          animation: spc-fade-up 0.75s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .spc-animate-fade-in {
          animation: spc-fade-in 0.6s ease both;
        }
        .spc-animate-scale-up {
          animation: spc-scale-up 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
.spc-animate-badge {
          animation: spc-badge-pop 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .spc-animate-slide-right {
          animation: spc-slide-right 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .spc-animate-float-cta {
          animation: spc-float-cta 0.45s cubic-bezier(0.22, 1, 0.36, 1) 0.8s both;
        }
        .spc-line-grow {
          animation: spc-line-grow 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.4s both;
          transform-origin: left;
        }

/* Gallery masonry rhythm: every 4th item is wide */
        .spc-gallery-item:nth-child(4n) {
          grid-column: span 2;
        }
        @media (max-width: 639px) {
          .spc-gallery-item:nth-child(4n) {
            grid-column: span 1;
          }
        }

        /* Tech stack pill hover shimmer */
        .spc-tech-pill {
          position: relative;
          overflow: hidden;
        }
        .spc-tech-pill::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(56,189,248,0.15) 50%, transparent 60%);
          transform: translateX(-100%);
          transition: transform 0.4s ease;
        }
        .spc-tech-pill:hover::before {
          transform: translateX(100%);
        }

        /* Body prose horizontal rule */
        .spc-prose hr {
          border: none;
          height: 1px;
          background: rgba(255,255,255,0.07);
          margin: 2.5rem 0;
        }
      `}</style>

      {/* ── Fixed site background ───────────────────────────────────────────── */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#0a0c16]" />

      <div className="relative z-10 min-h-screen">

        {/* ── Hero ── */}
        <div
          className="px-6 sm:px-12 pb-12 sm:pb-16"
          style={{ paddingTop: 'calc(var(--navbar-h, 60px) + 2rem)' }}
        >
          {/* Back link */}
          <div className="mb-8 spc-animate-slide-right" style={{ animationDelay: '80ms' }}>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-white/65 no-underline text-[0.8rem] font-medium px-3.5 py-1.5 rounded-full border border-white/[0.12] transition-all duration-200 hover:text-white hover:border-white/25 hover:-translate-x-0.5"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              <FiArrowLeft size={12} />
              Portfolio
            </Link>
          </div>

          <div className="max-w-[820px]">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {types.filter((t) => TYPE_LABELS[t]).map((t, i) => (
                <span
                  key={t}
                  className="spc-animate-badge px-3 py-1 rounded-full text-[0.68rem] font-bold tracking-[0.08em] uppercase"
                  style={{
                    background: TYPE_COLORS[t] + '1a',
                    border: `1px solid ${TYPE_COLORS[t]}44`,
                    color: TYPE_COLORS[t],
                    animationDelay: `${160 + i * 55}ms`,
                  }}
                >
                  {TYPE_LABELS[t]}
                </span>
              ))}
              <span
                className="spc-animate-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.68rem] font-bold tracking-[0.08em] uppercase border"
                style={{
                  background: statusCfg.bg,
                  color: statusCfg.text,
                  borderColor: statusCfg.border,
                  animationDelay: `${160 + types.length * 55}ms`,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: statusCfg.dot, boxShadow: `0 0 6px ${statusCfg.dot}` }}
                />
                {statusCfg.label}
              </span>
              {project.featured && (
                <span
                  className="spc-animate-badge px-3 py-1 rounded-full text-[0.68rem] font-bold tracking-[0.08em] uppercase border border-[rgba(247,171,10,0.35)] text-gold"
                  style={{
                    background: 'rgba(247,171,10,0.12)',
                    animationDelay: `${160 + (types.length + 1) * 55}ms`,
                  }}
                >
                  Featured
                </span>
              )}
            </div>

            {/* Accent rule */}
            <div
              className="w-10 h-[2px] mb-5 rounded-full spc-line-grow"
              style={{ background: 'var(--color-accent,#0ea5e9)' }}
            />

            {/* Title */}
            <h1
              className="font-display font-extrabold text-white leading-[1.02] tracking-[-0.04em] mb-5 spc-animate-fade-up"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.75rem)', animationDelay: '260ms' }}
            >
              {project.title}
            </h1>

            {project.excerpt && (
              <p
                className="text-white/60 leading-[1.8] mb-8 spc-animate-fade-up"
                style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)', animationDelay: '340ms' }}
              >
                {project.excerpt}
              </p>
            )}

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 spc-animate-fade-up" style={{ animationDelay: '420ms' }}>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold no-underline transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0"
                  style={{ background: 'var(--color-accent,#0ea5e9)', boxShadow: '0 4px 20px rgba(14,165,233,0.30)' }}
                >
                  <FiArrowUpRight size={14} />
                  Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white/80 text-sm font-medium no-underline border border-white/[0.15] transition-all duration-200 hover:bg-white/[0.10] hover:text-white hover:-translate-y-0.5 active:translate-y-0"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                >
                  <FaGithub size={14} />
                  GitHub
                </a>
              )}
            </div>
          </div>

          {/* Project image — shown as a contained preview below the title block */}
          {project.mainImage?.asset?.url && (
            <div
              className="mt-10 rounded-2xl overflow-hidden border border-white/[0.07] spc-animate-fade-up"
              style={{ animationDelay: '500ms', maxWidth: '900px' }}
            >
              <img
                src={project.mainImage.asset.url}
                alt={project.mainImage.alt ?? project.title}
                className="w-full object-cover"
              />
            </div>
          )}
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            METADATA STRIP
            Full-width horizontal byline that runs between hero and body.
            Replaces the generic squeezed sidebar with a scannable row.
        ════════════════════════════════════════════════════════════════════ */}
        <div
          className="relative border-y border-white/[0.06] spc-animate-fade-in"
          style={{
            background: 'rgba(255,255,255,0.025)',
            backdropFilter: 'blur(16px)',
            animationDelay: '550ms',
          }}
        >
          <div className="max-w-[1200px] mx-auto px-6 sm:px-12 py-4 flex flex-wrap items-center gap-x-8 gap-y-3">

            {formattedDate && (
              <div className="flex items-center gap-2">
                <FiCalendar size={12} className="text-accent flex-shrink-0 opacity-70" />
                <span className="text-[0.78rem] text-white/45 font-medium tracking-[0.03em]">
                  {formattedDate}
                </span>
              </div>
            )}

            {project.place && (
              <>
                {formattedDate && <div className="hidden sm:block w-px h-3.5 bg-white/10" />}
                <div className="flex items-center gap-2">
                  <FiMapPin size={12} className="text-accent flex-shrink-0 opacity-70" />
                  <span className="text-[0.78rem] text-white/45 font-medium tracking-[0.03em]">
                    {project.place}
                  </span>
                </div>
              </>
            )}

            {/* Spacer — pushes the project number label to the far right */}
            <div className="flex-1" />

            <span
              className="hidden md:block font-display font-bold text-[0.65rem] tracking-[0.14em] uppercase"
              style={{ color: 'rgba(14,165,233,0.4)' }}
            >
              Case Study
            </span>
          </div>

          {/* Bottom accent line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px spc-line-grow"
            style={{
              background:
                'linear-gradient(to right, var(--color-accent,#0ea5e9), transparent)',
              opacity: 0.3,
            }}
          />
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            BODY
            Two-column at lg+: wide article | narrow supplementary column.
            The supplementary column is NOT a generic card — it's whitespace
            with a floating sticky link strip anchored to the top.
        ════════════════════════════════════════════════════════════════════ */}
        <div className="max-w-[1200px] mx-auto px-6 sm:px-12 pt-14 pb-28">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

            {/* Article */}
            <article
              className="flex-1 min-w-0 spc-prose spc-animate-fade-up"
              style={{ animationDelay: '620ms' }}
            >
              {project.body && Array.isArray(project.body) && project.body.length > 0 ? (
                <PortableText value={project.body as never} components={portableComponents} />
              ) : project.description ? (
                <p className="text-white/65 leading-[1.9] text-[1rem]">{project.description}</p>
              ) : null}
            </article>

            {/* Supplementary column — sticky link + meta strip */}
            <aside
              className="w-full lg:w-[220px] flex-shrink-0 lg:sticky"
              style={{ top: 'calc(var(--navbar-h,60px) + 2rem)' }}
            >
              {/* Link card */}
              {(project.liveUrl || project.githubUrl) && (
                <div
                  className="rounded-2xl border border-white/[0.08] overflow-hidden mb-5 spc-animate-scale-up"
                  style={{
                    background: 'rgba(255,255,255,0.035)',
                    backdropFilter: 'blur(18px)',
                    animationDelay: '680ms',
                  }}
                >
                  {/* Accent cap */}
                  <div
                    className="h-[2px]"
                    style={{
                      background:
                        'linear-gradient(90deg, var(--color-accent,#0ea5e9), var(--color-accent-light,#38bdf8))',
                    }}
                  />
                  <div className="p-4 flex flex-col gap-2.5">
                    <p className="text-[0.62rem] font-bold tracking-[0.14em] uppercase text-white/25 mb-1">
                      View Project
                    </p>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-white text-[0.82rem] font-semibold no-underline transition-all duration-200 hover:brightness-110 hover:-translate-y-px"
                        style={{ background: 'var(--color-accent,#0ea5e9)' }}
                      >
                        Live Demo
                        <FiExternalLink size={12} />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-white/75 text-[0.82rem] font-medium no-underline border border-white/[0.10] transition-all duration-200 hover:bg-white/[0.08] hover:text-white hover:-translate-y-px"
                        style={{ background: 'rgba(255,255,255,0.04)' }}
                      >
                        GitHub
                        <FaGithub size={12} />
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Meta details */}
              {(formattedDate || project.place) && (
                <div
                  className="rounded-2xl border border-white/[0.06] p-4 flex flex-col gap-4 spc-animate-scale-up"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    backdropFilter: 'blur(12px)',
                    animationDelay: '720ms',
                  }}
                >
                  {formattedDate && (
                    <div>
                      <p className="text-[0.6rem] font-bold tracking-[0.14em] uppercase text-white/20 mb-1.5">
                        Date
                      </p>
                      <p className="flex items-center gap-2 text-white/65 text-[0.82rem]">
                        <FiCalendar size={11} className="text-accent/60 flex-shrink-0" />
                        {formattedDate}
                      </p>
                    </div>
                  )}
                  {project.place && (
                    <div>
                      <p className="text-[0.6rem] font-bold tracking-[0.14em] uppercase text-white/20 mb-1.5">
                        Context
                      </p>
                      <p className="flex items-center gap-2 text-white/65 text-[0.82rem]">
                        <FiMapPin size={11} className="text-accent/60 flex-shrink-0" />
                        {project.place}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </aside>
          </div>

          {/* ══════════════════════════════════════════════════════════════
              TECH STACK — full-width section below article
              Rendered as a generous tag grid with stagger animation,
              not squeezed into a 260px sidebar column.
          ══════════════════════════════════════════════════════════════ */}
          {project.techStack && project.techStack.length > 0 && (
            <div
              className="mt-14 pt-12 border-t border-white/[0.06] spc-animate-fade-up"
              style={{ animationDelay: '0ms' }}
            >
              <div className="flex items-baseline gap-4 mb-6">
                <h2 className="font-display font-bold text-white tracking-[-0.02em]"
                    style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)' }}>
                  Tech Stack
                </h2>
                <span className="text-white/20 text-sm">
                  {project.techStack.length} technologies
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {project.techStack.map((tag, i) => (
                  <span
                    key={i}
                    className="spc-tech-pill spc-animate-badge px-3.5 py-1.5 rounded-xl text-[0.78rem] font-semibold text-accent-light border border-[rgba(14,165,233,0.22)] tracking-[0.02em] cursor-default"
                    style={{
                      background: 'rgba(14,165,233,0.07)',
                      animationDelay: `${i * 45}ms`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════
              GALLERY
              Rhythmic grid: 3 columns, every 4th item spans 2 columns for
              visual relief. Lightbox on click, keyboard Escape to close.
          ══════════════════════════════════════════════════════════════ */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="mt-14 pt-12 border-t border-white/[0.06]">
              <div className="flex items-baseline gap-4 mb-8">
                <h2
                  className="font-display font-bold text-white tracking-[-0.02em]"
                  style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)' }}
                >
                  Gallery
                </h2>
                <span className="text-white/20 text-sm">
                  {project.gallery.length} image{project.gallery.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Grid — 2 cols sm, 3 cols lg, with span-2 promotion via CSS class */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 auto-rows-[260px]">
                {project.gallery.map((img, i) => (
                  <div
                    key={img.asset._id}
                    className="spc-gallery-item relative overflow-hidden rounded-2xl cursor-pointer group border border-white/[0.06]"
                    style={{ background: 'rgba(255,255,255,0.03)' }}
                    onClick={() =>
                      openLightbox(img.asset.url, img.alt ?? `Gallery image ${i + 1}`)
                    }
                    role="button"
                    tabIndex={0}
                    aria-label={`Open gallery image ${i + 1}${img.alt ? ': ' + img.alt : ''}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        openLightbox(img.asset.url, img.alt ?? `Gallery image ${i + 1}`)
                      }
                    }}
                  >
                    <img
                      src={img.asset.url}
                      alt={img.alt ?? `Gallery image ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    />

                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                      style={{
                        background:
                          'linear-gradient(to top, rgba(10,12,22,0.85) 0%, rgba(10,12,22,0.35) 60%, transparent 100%)',
                      }}
                    />

                    {/* Zoom icon + caption */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-2 p-4">
                      <div
                        className="w-10 h-10 flex items-center justify-center rounded-full border border-white/25 backdrop-blur-[10px]"
                        style={{ background: 'rgba(255,255,255,0.1)' }}
                      >
                        <FiZoomIn size={16} className="text-white" />
                      </div>
                    </div>

                    {/* Caption strip at bottom */}
                    {img.caption && (
                      <div className="absolute bottom-0 inset-x-0 px-4 pb-4 pt-10 translate-y-1 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <p className="text-white/80 text-xs leading-relaxed text-center drop-shadow">
                          {img.caption}
                        </p>
                      </div>
                    )}

                    {/* Subtle index number — editorial detail */}
                    <span
                      className="absolute top-3 right-3 font-display font-bold text-white/15 text-[0.65rem] tracking-[0.1em] select-none"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          MOBILE FLOATING CTA BAR
          On small screens the sidebar links are hidden; this sticky bottom bar
          surfaces the primary actions without polluting the article flow.
      ══════════════════════════════════════════════════════════════════════ */}
      {(project.liveUrl || project.githubUrl) && (
        <div
          className="lg:hidden fixed bottom-0 inset-x-0 z-50 spc-animate-float-cta border-t border-white/[0.08]"
          style={{ background: 'rgba(10,12,22,0.92)', backdropFilter: 'blur(20px)' }}
        >
          <div className="flex gap-2.5 px-4 py-3 max-w-lg mx-auto">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-semibold no-underline transition-opacity duration-200 hover:opacity-90"
                style={{ background: 'var(--color-accent,#0ea5e9)' }}
              >
                <FiArrowUpRight size={14} />
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-white/80 text-sm font-medium no-underline border border-white/[0.12] transition-all duration-200 hover:bg-white/[0.08] hover:text-white"
                style={{ background: 'rgba(255,255,255,0.05)' }}
              >
                <FaGithub size={14} />
                GitHub
              </a>
            )}
          </div>
          {/* Safe-area inset for devices with home indicator */}
          <div className="h-[env(safe-area-inset-bottom)]" />
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          LIGHTBOX
      ══════════════════════════════════════════════════════════════════════ */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 spc-animate-fade-in"
          style={{
            background: 'rgba(5,7,15,0.97)',
            backdropFilter: 'blur(8px)',
            animationDuration: '0.2s',
          }}
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 flex items-center justify-center rounded-full border border-white/[0.15] text-white/70 hover:text-white hover:bg-white/[0.1] transition-all duration-150 cursor-pointer"
            style={{ background: 'rgba(255,255,255,0.06)' }}
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <FiX size={16} />
          </button>

          {/* Image */}
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="max-w-[92vw] max-h-[88vh] object-contain rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.7)] spc-animate-scale-up"
            style={{ animationDuration: '0.3s' }}
            onClick={(e) => e.stopPropagation()}
          />

          {/* Keyboard hint */}
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/20 text-[0.7rem] tracking-[0.1em] font-medium select-none">
            ESC to close
          </p>
        </div>
      )}
    </>
  )
}
