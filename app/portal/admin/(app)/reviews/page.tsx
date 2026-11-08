import Link from 'next/link'
import { FiStar, FiTrash2 } from 'react-icons/fi'
import { getClient, getProject, listReviews } from '@/lib/portal/db'
import { fmtDate } from '@/lib/portal/format'
import { Badge, Empty, PageHeader } from '@/components/portal/ui'
import { deleteReviewAction, setReviewPublishedAction } from '@/app/portal/admin/actions'

export const metadata = { title: 'Reviews' }

export default async function ReviewsPage() {
  const reviews = await listReviews()
  const rows = await Promise.all(reviews.map(async (r) => ({ r, client: await getClient(r.clientId), project: await getProject(r.projectId) })))
  const avg = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : null

  return (
    <div className="grid gap-6">
      <PageHeader eyebrow="Portal admin" title="Client reviews">
        {avg ? `${reviews.length} review${reviews.length > 1 ? 's' : ''} · ${avg} average` : 'Reviews from finished projects show up here.'}
        <span className="mt-1 block text-small">Published reviews appear in the testimonials section of your site, next to the ones in Sanity.</span>
      </PageHeader>
      {rows.length ? (
        <ul className="grid gap-3">
          {rows.map(({ r, client, project }) => (
            <li key={r.id} className="card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-lg text-gold" aria-label={`${r.rating} out of 5 stars`}>
                    {'★'.repeat(r.rating)}
                    <span className="text-line/30">{'★'.repeat(5 - r.rating)}</span>
                  </p>
                  <p className="text-[0.8rem] text-subtle">
                    {client?.name ?? 'Former client'}
                    {project ? (
                      <>
                        {' · '}
                        <Link href={`/portal/admin/projects/${project.id}`} className="text-subtle underline-offset-2 hover:text-fg">{project.name}</Link>
                      </>
                    ) : null}
                    {' · '}
                    {fmtDate(r.createdAt)}
                  </p>
                </div>
                {r.published ? <Badge tone="success">On your website</Badge> : r.allowPublish ? <Badge tone="accent">OK to publish</Badge> : <Badge tone="muted">Private</Badge>}
              </div>
              <p className="mt-3 whitespace-pre-line text-fg">“{r.text}”</p>
              <p className="mt-2 text-small text-muted">— {r.displayName}{r.role ? `, ${r.role}` : ''}{r.company ? `, ${r.company}` : ''}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {r.allowPublish && (
                  <form action={setReviewPublishedAction.bind(null, r.id, !r.published)}>
                    <button className={`btn btn-sm ${r.published ? 'btn-secondary' : 'btn-primary'}`}>{r.published ? 'Remove from website' : 'Show on website'}</button>
                  </form>
                )}
                <form action={deleteReviewAction.bind(null, r.id)}>
                  <button className="btn btn-ghost btn-sm hover:!text-danger"><FiTrash2 aria-hidden="true" /> Delete</button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <Empty icon={<FiStar />} title="No reviews yet">When you mark a project Completed, the client is asked for a quick review.</Empty>
      )}
    </div>
  )
}
