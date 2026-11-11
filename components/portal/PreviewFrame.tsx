'use client'
import { useState } from 'react'
import clsx from 'clsx'
import { FiExternalLink, FiMonitor, FiRefreshCw, FiSmartphone, FiTablet } from 'react-icons/fi'

const SIZES = [
  { key: 'desktop', label: 'Computer', icon: FiMonitor, width: '100%', height: 720 },
  { key: 'tablet', label: 'Tablet', icon: FiTablet, width: '768px', height: 900 },
  { key: 'phone', label: 'Phone', icon: FiSmartphone, width: '390px', height: 760 },
] as const

/**
 * Shows a not-yet-live site inside the portal at computer, tablet or phone
 * width. Some sites refuse to load inside another page, so "Open in a new
 * tab" is always offered next to it.
 */
export default function PreviewFrame({ url, title }: { url: string; title: string }) {
  const [size, setSize] = useState<(typeof SIZES)[number]['key']>('desktop')
  const [nonce, setNonce] = useState(0)
  const current = SIZES.find((s) => s.key === size)!

  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-1 rounded-pill border border-line/20 bg-bg/60 p-1" role="group" aria-label="Screen size">
          {SIZES.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setSize(s.key)}
              aria-pressed={size === s.key}
              className={clsx(
                'inline-flex min-h-[2.25rem] items-center gap-2 rounded-pill px-3 text-[0.85rem] font-medium transition-colors',
                size === s.key ? 'bg-accent/20 text-fg' : 'text-muted hover:bg-white/[0.05] hover:text-fg'
              )}
            >
              <s.icon aria-hidden="true" /> {s.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => setNonce((n) => n + 1)}>
            <FiRefreshCw aria-hidden="true" /> Reload
          </button>
          <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
            <FiExternalLink aria-hidden="true" /> Open in a new tab
          </a>
        </div>
      </div>
      <div className="overflow-x-auto rounded-card border border-line/20 bg-black/30 p-2 sm:p-3">
        <iframe
          key={`${size}-${nonce}`}
          src={url}
          title={`Preview: ${title}`}
          className="mx-auto block max-w-none rounded-control bg-white transition-[width] duration-300"
          style={{ width: current.width, height: current.height }}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </div>
      <p className="text-[0.8rem] text-subtle">
        Blank or asking you to sign in? Some sites can’t be shown inside another page. Use “Open in a new tab” instead.
      </p>
    </div>
  )
}
