'use client'
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { upload } from '@vercel/blob/client'
import { FiUploadCloud } from 'react-icons/fi'
import type { FormState } from '@/app/portal/actions'

type Recorder = (file: { url: string; name: string; size: number; contentType: string; note?: string; requiresApproval?: boolean }) => Promise<FormState>

/** Drag-and-drop uploader: browser → Vercel Blob directly, then records the file. */
export default function FileUploader({
  projectId,
  onUploaded,
  access,
  allowApproval = false,
}: {
  projectId: string
  onUploaded: Recorder
  access: 'public' | 'private'
  allowApproval?: boolean
}) {
  const input = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const [busy, setBusy] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [drag, setDrag] = useState(false)
  const [approval, setApproval] = useState(allowApproval)

  async function handle(files: FileList | null) {
    if (!files?.length) return
    setError(null)
    for (const file of Array.from(files)) {
      setBusy(file.name)
      setProgress(0)
      try {
        const safe = file.name.replace(/[^\w.\- ]+/g, '_')
        const blob = await upload(`portal/${projectId}/${safe}`, file, {
          access,
          handleUploadUrl: '/api/portal/upload',
          clientPayload: JSON.stringify({ projectId }),
          multipart: file.size > 50 * 1024 * 1024,
          onUploadProgress: (e) => setProgress(Math.round(e.percentage)),
        })
        const res = await onUploaded({
          url: blob.url,
          name: file.name,
          size: file.size,
          contentType: file.type || blob.contentType,
          requiresApproval: allowApproval && approval,
        })
        if (res?.error) throw new Error(res.error)
      } catch (err) {
        setError(`${file.name}: ${(err as Error).message || 'upload failed'}`)
        break
      }
    }
    setBusy(null)
    if (input.current) input.current.value = ''
    router.refresh()
  }

  return (
    <div>
      <label
        onDragOver={(e) => {
          e.preventDefault()
          setDrag(true)
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDrag(false)
          handle(e.dataTransfer.files)
        }}
        className={`flex cursor-pointer flex-col items-center justify-center gap-1 rounded-card border border-dashed px-4 py-6 text-center transition-colors focus-within:border-accent-light focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent-light ${
          drag ? 'border-accent-light bg-accent/10' : 'border-line/30 hover:border-accent/50 hover:bg-white/[0.02]'
        }`}
      >
        <FiUploadCloud size={22} className="text-accent-light" aria-hidden="true" />
        {busy ? (
          <span className="w-full max-w-xs" role="status">
            <span className="block truncate text-small text-fg">Uploading {busy}…</span>
            <span className="mt-2 block h-1.5 overflow-hidden rounded-pill bg-white/[0.08]">
              <span className="block h-full bg-accent-light transition-[width]" style={{ width: `${progress}%` }} />
            </span>
          </span>
        ) : (
          <>
            <span className="text-small font-medium text-fg">Drop files here or click to upload</span>
            <span className="text-[0.75rem] text-subtle">Images, PDFs, docs, zips, up to 500 MB each</span>
          </>
        )}
        <input ref={input} type="file" multiple className="sr-only" disabled={!!busy} onChange={(e) => handle(e.target.files)} />
      </label>
      {allowApproval && (
        <label className="mt-2 flex items-center gap-2 text-small text-muted">
          <input type="checkbox" checked={approval} onChange={(e) => setApproval(e.target.checked)} className="h-4 w-4 accent-[rgb(var(--c-accent))]" />
          Ask the client to approve these files
        </label>
      )}
      {error && <p className="mt-2 text-[0.8rem] text-danger" role="alert">{error}</p>}
    </div>
  )
}
