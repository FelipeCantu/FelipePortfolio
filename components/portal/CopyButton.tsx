'use client'
import { useState } from 'react'
import { FiCheck, FiCopy } from 'react-icons/fi'

export default function CopyButton({ value, label, className = '' }: { value: string; label: string; className?: string }) {
  const [done, setDone] = useState(false)
  return (
    <button
      type="button"
      aria-label={`Copy ${label}`}
      title={`Copy ${label}`}
      className={`inline-flex h-7 items-center gap-1 rounded-pill px-2 text-[0.75rem] font-medium text-accent-light transition-colors hover:bg-accent/10 ${className}`}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value)
          setDone(true)
          setTimeout(() => setDone(false), 1500)
        } catch {
          /* clipboard blocked: the text is still visible to copy by hand */
        }
      }}
    >
      {done ? <FiCheck className="text-success" aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
      {done ? 'Copied' : 'Copy'}
    </button>
  )
}
