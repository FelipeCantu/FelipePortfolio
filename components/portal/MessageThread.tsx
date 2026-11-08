import clsx from 'clsx'
import type { Message, Role } from '@/lib/portal/types'
import { fmtDate } from '@/lib/portal/format'

export default function MessageThread({ messages, viewer, clientName }: { messages: Message[]; viewer: Role; clientName: string }) {
  if (!messages.length) {
    return <p className="rounded-control bg-white/[0.03] px-4 py-6 text-center text-small text-muted">No messages yet. Say hello!</p>
  }
  return (
    <ol className="grid max-h-[28rem] gap-3 overflow-y-auto pr-1" aria-label="Messages" tabIndex={0}>
      {messages.map((m) => {
        const mine = m.from === viewer
        const name = m.from === 'admin' ? 'Felipe' : clientName
        return (
          <li key={m.id} className={clsx('flex flex-col', mine ? 'items-end' : 'items-start')}>
            <div
              className={clsx(
                'max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-small [overflow-wrap:anywhere]',
                mine ? 'rounded-br-md bg-accent/20 text-fg' : 'rounded-bl-md bg-white/[0.06] text-fg'
              )}
            >
              {m.body}
            </div>
            <p className="mt-1 px-1 text-[0.7rem] text-subtle">
              {mine ? 'You' : name} · {fmtDate(m.at, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
            </p>
          </li>
        )
      })}
    </ol>
  )
}
