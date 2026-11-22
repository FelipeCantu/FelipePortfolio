import Image from 'next/image'
import { FiArrowUpRight } from 'react-icons/fi'
import { STATUS_CONFIG, hostname, frameTransitionName, type ProjectImage } from '@/components/projectMeta'

interface ProjectFrameProps {
  slug: string
  title: string
  status?: string
  liveUrl?: string
  image?: ProjectImage
  /** Aspect classes for the screenshot box. `aspect-[var(--ar)]` keeps the image's own ratio. */
  aspectClassName: string
  sizes: string
  priority?: boolean
  className?: string
  imageClassName?: string
}

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

/**
 * A project's screenshot in a browser-style frame whose bar carries real info
 * (live domain + status). The work index card and the case-study hero both
 * render it under the same view-transition-name, so the card morphs into the
 * hero on navigation (components/ui/TransitionLink.tsx).
 */
export default function ProjectFrame({
  slug,
  title,
  status = 'completed',
  liveUrl,
  image,
  aspectClassName,
  sizes,
  priority = false,
  className = '',
  imageClassName = '',
}: ProjectFrameProps) {
  const domain = hostname(liveUrl)
  const ratio = image?.width && image?.height ? image.width / image.height : 2

  return (
    <div
      className={`overflow-hidden rounded-card border border-line/15 bg-surface shadow-card ${className}`}
      style={{ viewTransitionName: frameTransitionName(slug) } as React.CSSProperties}
    >
      <div className="flex h-10 items-center gap-3 border-b border-line/10 px-4 font-mono text-[0.75rem] text-subtle">
        <StatusDot status={status} />
        {domain ? (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/domain relative z-[2] -my-2 inline-flex min-w-0 items-center gap-1 py-2 text-muted transition-colors duration-200 hover:text-fg"
            aria-label={`Visit ${domain} (opens in a new tab)`}
          >
            <span className="truncate bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 ease-out-expo group-hover/domain:bg-[length:100%_1px]">
              {domain}
            </span>
            <FiArrowUpRight
              aria-hidden="true"
              className="flex-shrink-0 transition-transform duration-300 ease-out-expo group-hover/domain:-translate-y-0.5 group-hover/domain:translate-x-0.5"
            />
          </a>
        ) : (
          <span className="truncate">{title}</span>
        )}
        <span className="ml-auto flex-shrink-0 uppercase tracking-[0.12em]">
          {STATUS_CONFIG[status]?.label ?? STATUS_CONFIG.completed.label}
        </span>
      </div>

      <div
        className={`relative overflow-hidden bg-raised ${aspectClassName}`}
        style={{ '--ar': ratio } as React.CSSProperties}
      >
        {image?.url ? (
          <Image
            src={image.url}
            alt={image.alt ?? ''}
            fill
            priority={priority}
            sizes={sizes}
            placeholder={image.lqip ? 'blur' : 'empty'}
            blurDataURL={image.lqip}
            className={`object-cover object-center ${imageClassName}`}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-accent-dark/30 via-surface to-accent/10" />
        )}
        {/* Inner hairline keeps light screenshots from bleeding into the frame */}
        <div
          className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.04)]"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}
