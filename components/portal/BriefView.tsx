import type { IntakeData } from '@/lib/portal/intake'
import { PROJECT_TYPE_LABELS, featureLabel } from '@/lib/portal/intake'
import { fmtDate } from '@/lib/portal/format'

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  if (children === null || children === undefined || children === '' || (Array.isArray(children) && !children.length)) return null
  return (
    <div className="grid gap-1 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-4">
      <dt className="text-[0.8rem] font-semibold text-subtle">{label}</dt>
      <dd className="m-0 whitespace-pre-line text-small text-fg [overflow-wrap:anywhere]">{children}</dd>
    </div>
  )
}

function Chips({ items }: { items: string[] }) {
  if (!items.length) return null
  return (
    <span className="flex flex-wrap gap-1.5">
      {items.map((i) => (
        <span key={i} className="chip !py-0.5 !text-[0.75rem]">{i}</span>
      ))}
    </span>
  )
}

/** The Get Started answers, laid out for reading. */
export default function BriefView({ data, showContact = true }: { data: IntakeData; showContact?: boolean }) {
  const links = (text: string) =>
    text.split(/(\s+)/).map((part, i) =>
      /^https?:\/\/\S+$/.test(part) ? (
        <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-accent-light underline decoration-accent/40 underline-offset-2 hover:text-white">{part}</a>
      ) : (
        part
      )
    )
  return (
    <dl className="m-0 grid gap-3">
      {showContact && (
        <>
          <Row label="Contact">{[data.name, data.email, data.phone].filter(Boolean).join(' · ')}</Row>
          <Row label="Company">{data.company}</Row>
          <Row label="Current website">{data.currentWebsite ? links(data.currentWebsite) : ''}</Row>
        </>
      )}
      <Row label="Project type">{PROJECT_TYPE_LABELS[data.projectType] ?? data.projectType}</Row>
      <Row label="Description">{data.description}</Row>
      <Row label="Success looks like">{data.goals}</Row>
      <Row label="Budget">{data.budget}</Row>
      <Row label="Timeline">{data.timeline}</Row>
      <Row label="Hard deadline">{data.deadline ? `${fmtDate(data.deadline)}${data.deadlineReason ? ` — ${data.deadlineReason}` : ''}` : ''}</Row>
      <Row label="Pages">{data.pages.length ? <Chips items={data.pages} /> : ''}</Row>
      <Row label="Features">{data.features.length ? <Chips items={data.features.map(featureLabel)} /> : ''}</Row>
      <Row label="Already has">{data.assets.length ? <Chips items={data.assets} /> : 'Nothing yet'}</Row>
      <Row label="Sites they like">{data.inspiration ? links(data.inspiration) : ''}</Row>
      <Row label="Tech notes">{data.techNotes}</Row>
      {showContact && (
        <Row label="Call preference">
          {[data.preferredDays.join(', '), data.preferredTime].filter(Boolean).join(' · ')}
        </Row>
      )}
      <Row label="Other notes">{data.additionalNotes}</Row>
    </dl>
  )
}
