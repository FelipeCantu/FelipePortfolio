'use client'
import { useState } from 'react'
import { FiCheck, FiCopy } from 'react-icons/fi'

function Copy({ value, label }: { value: string; label: string }) {
  const [done, setDone] = useState(false)
  return (
    <button
      type="button"
      className="btn btn-ghost btn-sm !px-2.5"
      aria-label={`Copy ${label}`}
      onClick={async () => {
        await navigator.clipboard.writeText(value)
        setDone(true)
        setTimeout(() => setDone(false), 1500)
      }}
    >
      {done ? <FiCheck className="text-success" aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
    </button>
  )
}

/** Shown once, right after creating a client or resetting their code. */
export default function CredentialCard({ email, code, link }: { email: string; code: string; link: string }) {
  const message = `Hi! Your project portal is ready. Open this link to set your password:\n${link}\n\nOr go to ${link.split('/portal')[0]}/portal/login and sign in once with\nEmail: ${email}\nAccess code: ${code}`
  return (
    <div className="rounded-card border border-success/30 bg-success/[0.06] p-4" role="status">
      <p className="text-small font-semibold text-success">Send this to your client. They use it once to create their own password. It won&apos;t be shown again.</p>
      <dl className="mt-3 grid gap-2 text-small">
        <div className="flex items-center justify-between gap-2 rounded-control bg-bg/60 px-3 py-1.5">
          <dt className="text-subtle">One-time code</dt>
          <dd className="flex items-center gap-1 font-mono text-base tracking-widest text-fg">
            {code} <Copy value={code} label="access code" />
          </dd>
        </div>
        <div className="flex items-center justify-between gap-2 rounded-control bg-bg/60 px-3 py-1.5">
          <dt className="flex-shrink-0 text-subtle">Invite link</dt>
          <dd className="flex min-w-0 items-center gap-1">
            <span className="truncate font-mono text-[0.75rem] text-muted">{link}</span> <Copy value={link} label="sign-in link" />
          </dd>
        </div>
      </dl>
      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="text-[0.75rem] text-subtle">Ready-to-send text message</span>
        <Copy value={message} label="invite message" />
      </div>
    </div>
  )
}
