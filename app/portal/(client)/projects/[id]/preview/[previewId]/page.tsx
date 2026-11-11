import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FiArrowLeft, FiCheckCircle, FiEdit3, FiEyeOff } from 'react-icons/fi'
import { requireClientProject } from '@/lib/portal/session'
import { previews } from '@/lib/portal/db'
import { fmtDate } from '@/lib/portal/format'
import { Badge } from '@/components/portal/ui'
import PreviewFrame from '@/components/portal/PreviewFrame'
import DecisionForm from '@/components/portal/DecisionForm'
import { reviewPreviewAction } from '@/app/portal/actions'

export const metadata = { title: 'Preview' }

export default async function ClientPreviewPage({ params }: { params: Promise<{ id: string; previewId: string }> }) {
  const { id, previewId } = await params
  const { project } = await requireClientProject(id)
  const preview = project ? await previews.get(id, previewId) : null
  if (!project || !preview) notFound()
  const all = await previews.list(id)
  const newer = all[0] && all[0].id !== preview.id ? all[0] : null

  return (
    <div className="grid gap-5">
      <Link href={`/portal/projects/${id}#previews`} className="btn btn-ghost btn-sm w-fit !pl-2">
        <FiArrowLeft aria-hidden="true" /> Back to project
      </Link>
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="eyebrow">Preview · {project.name}</p>
          <h1 className="mt-2 text-h2 text-fg [overflow-wrap:anywhere]">{preview.title}</h1>
          <p className="mt-2 flex flex-wrap items-center gap-2 text-small text-muted">
            <Badge tone="neutral"><FiEyeOff aria-hidden="true" /> Not public yet</Badge>
            Shared {fmtDate(preview.createdAt)}. Only you and Felipe can see this version.
          </p>
        </div>
      </header>

      {newer && (
        <Link href={`/portal/projects/${id}/preview/${newer.id}`} className="rounded-card border border-accent/30 bg-accent/10 p-4 text-small text-fg no-underline">
          There’s a newer preview: <strong>{newer.title}</strong>. Open it →
        </Link>
      )}
      {preview.note && (
        <p className="rounded-card border border-line/20 bg-white/[0.03] p-4 text-small text-fg">
          <span className="font-semibold">What to look at: </span>
          <span className="whitespace-pre-line">{preview.note}</span>
        </p>
      )}

      <PreviewFrame url={preview.url} title={preview.title} />

      <section className="card p-5 sm:p-6" aria-labelledby="preview-answer">
        <h2 id="preview-answer" className="text-lg font-bold text-fg">What do you think?</h2>
        {preview.status === 'approved' ? (
          <p className="mt-2 flex items-center gap-2 text-small text-success" role="status">
            <FiCheckCircle aria-hidden="true" /> You approved this version{preview.decidedAt ? ` on ${fmtDate(preview.decidedAt)}` : ''}. Felipe can take it live.
          </p>
        ) : (
          <>
            {preview.status === 'changes_requested' && (
              <p className="mt-2 rounded-control border-l-2 border-danger/60 bg-danger/[0.06] px-3 py-2 text-small text-fg/90" role="status">
                <FiEdit3 className="mr-1 inline" aria-hidden="true" />
                <span className="font-semibold">Your feedback: </span>{preview.feedback}
              </p>
            )}
            <p className="mt-2 text-small text-muted">
              {preview.status === 'changes_requested'
                ? 'Felipe is working on your changes. You can still approve this version or add more feedback.'
                : 'Click around like a visitor would, then approve it to go live or tell Felipe what to change.'}
            </p>
            <DecisionForm
              action={reviewPreviewAction.bind(null, id, previewId)}
              approveLabel="Looks good, approve it"
              declineLabel="Request changes"
              notePrompt="What would you like changed? Mention the page and the part of it."
              declineSubmit="Send feedback"
              noteRequired
            />
          </>
        )}
      </section>
    </div>
  )
}
