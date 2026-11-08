import { FiDownload, FiExternalLink, FiFile, FiFileText, FiImage, FiLink, FiFilm, FiArchive } from 'react-icons/fi'
import type { FileItem, Role } from '@/lib/portal/types'
import { APPROVAL_STATUS, fileSize, fmtDate } from '@/lib/portal/format'
import { fileHref } from '@/lib/portal/blob'
import { Badge } from './ui'

function Icon({ f }: { f: FileItem }) {
  const t = f.contentType ?? ''
  if (f.kind === 'link') return <FiLink />
  if (t.startsWith('image/')) return <FiImage />
  if (t.startsWith('video/')) return <FiFilm />
  if (t.includes('pdf') || t.startsWith('text/') || t.includes('document')) return <FiFileText />
  if (t.includes('zip') || t.includes('compressed')) return <FiArchive />
  return <FiFile />
}

/**
 * Shared file table. `renderActions` lets each side add its own controls
 * (approve / request changes for clients, delete for Felipe).
 */
export default function FileList({
  files,
  viewer,
  clientName,
  renderActions,
}: {
  files: FileItem[]
  viewer: Role
  clientName: string
  renderActions?: (f: FileItem) => React.ReactNode
}) {
  return (
    <ul className="grid gap-2">
      {files.map((f) => {
        const by = f.uploadedBy === viewer ? 'You' : f.uploadedBy === 'admin' ? 'Felipe' : clientName
        const ap = f.approval && APPROVAL_STATUS[f.approval.status]
        return (
          <li key={f.id} className={`rounded-control border p-3 sm:p-4 ${f.approval?.status === 'pending' ? 'border-warning/30 bg-warning/[0.04]' : 'border-line/15 bg-bg/40'}`}>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-control bg-accent/10 text-accent-light" aria-hidden="true">
                <Icon f={f} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <a href={fileHref(f)} target="_blank" rel="noopener noreferrer" className="truncate font-medium text-fg no-underline hover:text-accent-light">
                    {f.name}
                  </a>
                  {ap && <Badge tone={ap.tone}>{viewer === 'admin' && f.approval?.status === 'pending' ? 'Awaiting client' : ap.label}</Badge>}
                </div>
                <p className="mt-0.5 text-[0.75rem] text-subtle">
                  {by} · {fmtDate(f.createdAt, { month: 'short', day: 'numeric' })}
                  {f.size ? ` · ${fileSize(f.size)}` : ''}
                  {f.kind === 'link' ? ' · link' : ''}
                </p>
                {f.note && <p className="mt-1.5 text-small text-muted">{f.note}</p>}
                {f.approval?.note && (
                  <p className="mt-2 rounded-control border-l-2 border-danger/60 bg-danger/[0.06] px-3 py-2 text-small text-fg/90">
                    <span className="font-semibold">{viewer === 'client' ? 'Your feedback' : `${clientName}'s feedback`}:</span> {f.approval.note}
                  </p>
                )}
                {renderActions?.(f)}
              </div>
              <a
                href={fileHref(f, true)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm !px-2.5"
                aria-label={f.kind === 'link' ? `Open ${f.name}` : `Download ${f.name}`}
              >
                {f.kind === 'link' ? <FiExternalLink aria-hidden="true" /> : <FiDownload aria-hidden="true" />}
              </a>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
