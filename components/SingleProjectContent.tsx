'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiArrowLeft, FiExternalLink, FiCalendar, FiMapPin, FiZoomIn } from 'react-icons/fi'
import { FaGithub } from 'react-icons/fa'
import { PortableText } from '@portabletext/react'
import { urlFor } from '@/lib/sanity'

const TYPE_COLORS: Record<string, string> = {
  web: '#3498db', mobile: '#9b59b6', design: '#e67e22', desktop: '#1abc9c',
}
const TYPE_LABELS: Record<string, string> = {
  web: 'Web', mobile: 'Mobile', design: 'Design', desktop: 'Desktop App',
}
const STATUS_CONFIG: Record<string, { bg: string; text: string; border: string; label: string }> = {
  inProgress: { bg: 'rgba(243,156,18,0.15)', text: '#f39c12', border: 'rgba(243,156,18,0.35)', label: 'In Progress' },
  completed:  { bg: 'rgba(46,204,113,0.15)',  text: '#2ecc71', border: 'rgba(46,204,113,0.35)',  label: 'Completed' },
  archived:   { bg: 'rgba(149,165,166,0.15)', text: '#95a5a6', border: 'rgba(149,165,166,0.35)', label: 'Archived' },
}

const portableComponents = {
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => <h1 className="text-white font-extrabold text-3xl mt-8 mb-4 leading-tight">{children}</h1>,
    h2: ({ children }: { children?: React.ReactNode }) => <h2 className="text-white font-bold text-2xl mt-7 mb-3 leading-snug">{children}</h2>,
    h3: ({ children }: { children?: React.ReactNode }) => <h3 className="text-white font-semibold text-xl mt-6 mb-3">{children}</h3>,
    h4: ({ children }: { children?: React.ReactNode }) => <h4 className="text-white font-semibold text-lg mt-5 mb-2">{children}</h4>,
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-accent px-6 py-4 my-6 italic text-white/70 bg-white/5 rounded-r-lg">{children}</blockquote>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => <p className="mb-5 last:mb-0 leading-[1.8] text-white/80">{children}</p>,
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => <strong className="font-bold text-white">{children}</strong>,
    em: ({ children }: { children?: React.ReactNode }) => <em className="italic text-white/70">{children}</em>,
    link: ({ children, value }: { children?: React.ReactNode; value?: { href: string } }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-light underline transition-colors">{children}</a>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => <ul className="my-5 pl-6 space-y-2">{children}</ul>,
    number: ({ children }: { children?: React.ReactNode }) => <ol className="my-5 pl-6 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => <li className="relative text-white/80 leading-[1.7] before:content-['•'] before:text-accent before:absolute before:-left-4">{children}</li>,
    number: ({ children }: { children?: React.ReactNode }) => <li className="text-white/80 leading-[1.7] [&::marker]:text-accent">{children}</li>,
  },
  types: {
    image: ({ value }: { value: { asset: never; alt?: string; caption?: string } }) => (
      <div className="my-8 text-center">
        <img src={urlFor(value.asset).url()} alt={value.alt ?? 'Project image'} className="max-w-full rounded-xl shadow-lg mx-auto" />
        {value.caption && <span className="block text-sm text-white/50 italic mt-3">{value.caption}</span>}
      </div>
    ),
  },
}

interface GalleryItem { asset: { _id: string; url: string }; alt?: string; caption?: string }

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

export default function SingleProjectContent({ project, slug }: Props) {
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
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeLightbox() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox])

  const primaryType = Array.isArray(project.projectType) ? project.projectType[0] : project.projectType
  const statusCfg = STATUS_CONFIG[project.status ?? 'completed'] ?? STATUS_CONFIG.completed
  const formattedDate = project.date
    ? new Date(project.date + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : null

  return (
    <div
      className="relative min-h-screen w-full pt-[80px]"
      style={{
        backgroundImage: 'linear-gradient(rgba(10,12,22,0.9),rgba(10,12,22,0.9)),url(/images/mainbg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="relative z-10 max-w-[1000px] mx-auto px-8 pb-16 max-md:px-4">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-white/90 no-underline font-medium mb-8 px-6 py-3 bg-white/10 backdrop-blur-[10px] rounded-[25px] border border-white/20 transition-all duration-300 hover:bg-white/20 hover:-translate-x-1"
        >
          <FiArrowLeft /> Back to Portfolio
        </Link>

        <div className="bg-white/[0.05] backdrop-blur-[20px] rounded-[20px] border border-white/10 overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)] animate-[fadeInUp_0.65s_ease-out]">
          {/* Hero image */}
          {project.mainImage?.asset?.url && (
            <div
              className="relative w-full h-[400px] overflow-hidden cursor-pointer group max-md:h-[250px]"
              onClick={() => openLightbox(project.mainImage!.asset.url, project.mainImage!.alt ?? project.title)}
            >
              <img src={project.mainImage.asset.url} alt={project.mainImage.alt ?? project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-black/50 rounded-full p-3 text-white"><FiZoomIn size={24} /></div>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="p-8 max-md:p-6">
            <div className="w-12 h-1 bg-accent rounded-full mb-6" />

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {(Array.isArray(project.projectType) ? project.projectType : project.projectType ? [project.projectType] : [])
                .filter(t => TYPE_LABELS[t])
                .map((t, i) => (
                  <span key={i} className="px-3 py-1 rounded-full text-white text-xs font-semibold" style={{ background: TYPE_COLORS[t] + '26', border: `1px solid ${TYPE_COLORS[t]}66`, color: TYPE_COLORS[t] }}>
                    {TYPE_LABELS[t]}
                  </span>
                ))}
              <span className="px-3 py-1 rounded-full text-xs font-semibold border" style={{ background: statusCfg.bg, color: statusCfg.text, borderColor: statusCfg.border }}>
                {statusCfg.label}
              </span>
              {project.featured && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[rgba(247,171,10,0.15)] text-gold border border-[rgba(247,171,10,0.35)]">
                  Featured
                </span>
              )}
            </div>

            <h1 className="font-display font-extrabold text-[2.5rem] text-white leading-tight mb-4 max-md:text-[2rem]">{project.title}</h1>

            {project.excerpt && <p className="text-white/70 text-lg leading-relaxed mb-6">{project.excerpt}</p>}

            {/* Meta */}
            <div className="flex flex-wrap gap-6 mb-6 text-white/50 text-sm">
              {formattedDate && <span className="flex items-center gap-2"><FiCalendar size={14} className="text-accent" />{formattedDate}</span>}
              {project.place && <span className="flex items-center gap-2"><FiMapPin size={14} className="text-accent" />{project.place}</span>}
            </div>

            {/* Tech stack */}
            {project.techStack && project.techStack.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack.map((tag, i) => (
                  <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-white/[0.08] text-white/70 border border-white/[0.12]">{tag}</span>
                ))}
              </div>
            )}

            {/* Action links */}
            <div className="flex flex-wrap gap-3">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-[0.6rem] rounded-full border border-white/20 text-white/80 text-sm font-medium no-underline transition-all duration-[220ms] hover:bg-white/10 hover:border-white/40">
                  <FaGithub /> GitHub
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-[0.6rem] rounded-full bg-accent border border-accent text-white text-sm font-semibold no-underline transition-all duration-[220ms] hover:bg-accent-dark">
                  <FiExternalLink /> Live Demo
                </a>
              )}
            </div>
          </div>

          {/* Body */}
          {project.body && (
            <div className="px-8 pb-10 border-t border-white/[0.08] pt-8 max-md:px-6">
              <PortableText value={project.body as never} components={portableComponents} />
            </div>
          )}

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="px-8 pb-10 border-t border-white/[0.08] pt-8 max-md:px-6">
              <h2 className="font-display font-bold text-xl text-white mb-6">
                Gallery <span className="text-white/40 font-normal text-base ml-2">{project.gallery.length} images</span>
              </h2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {project.gallery.map((img, i) => (
                  <div
                    key={img.asset._id}
                    className="relative overflow-hidden rounded-xl cursor-pointer group aspect-video"
                    onClick={() => openLightbox(img.asset.url, img.alt ?? `Gallery image ${i + 1}`)}
                  >
                    <img src={img.asset.url} alt={img.alt ?? `Gallery image ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end justify-start p-3">
                      {img.caption && <span className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">{img.caption}</span>}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-black/60 rounded-full p-2"><FiZoomIn size={18} className="text-white" /></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white text-4xl leading-none bg-transparent border-none cursor-pointer transition-colors"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            ×
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}
