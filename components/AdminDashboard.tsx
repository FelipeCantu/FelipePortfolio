'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaPlus, FaCopy, FaCheck, FaExternalLinkAlt,
  FaChevronDown, FaChevronUp, FaSignOutAlt, FaSync, FaLock,
} from 'react-icons/fa'

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (n: number | null | undefined) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n ?? 0)

const timeAgo = (unix: number) => {
  const diff = Date.now() / 1000 - unix
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface StripeAccount {
  id: string
  name?: string
  email?: string
  created: number
  country?: string
  detailsSubmitted: boolean
  chargesEnabled: boolean
  payoutsEnabled: boolean
}

interface BalanceData {
  available?: number
  pending?: number
}

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden:  { opacity: 0, y: 28, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

// ─── Password Gate ────────────────────────────────────────────────────────────

function PasswordGate({ onAuth }: { onAuth: (key: string) => void }) {
  const [pw,      setPw]      = useState('')
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/stripe/balance', {
        headers: { 'x-admin-key': pw },
      })
      if (res.ok) {
        onAuth(pw)
      } else {
        setError('Incorrect password.')
      }
    } catch {
      setError('Could not connect. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-6 py-12 overflow-hidden"
      style={{ marginTop: 'var(--navbar-h, 60px)' }}
    >
      <img src="/images/mainbg.jpg" alt="" className="fixed inset-0 w-full h-full object-cover object-center z-0 pointer-events-none" />
      <div className="fixed inset-0 bg-black/[0.78] z-[1] pointer-events-none" />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="relative z-[2] w-full max-w-[440px] text-center flex flex-col items-center"
      >
        <p
          className="text-[0.72rem] font-bold tracking-[0.18em] uppercase m-0 mb-[0.6rem]"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--color-accent-light)' }}
        >
          Anakupto Platform
        </p>
        <h1
          className="font-extrabold text-white leading-[1.1] tracking-[-0.02em] m-0 mb-3"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,5vw,3rem)' }}
        >
          Admin Dashboard
        </h1>
        <p className="text-[0.95rem] text-white/55 leading-[1.75] m-0 mb-8">
          Enter your password to access the client dashboard.
        </p>

        {/* Glass card */}
        <div
          className="w-full rounded-[20px] p-10"
          style={{
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.10)',
            boxShadow: '0 25px 50px rgba(0,0,0,0.45)',
          }}
        >
          {/* Lock icon with pulse */}
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{
              border: '1px solid rgba(14,165,233,0.4)',
              color: 'var(--color-accent-light)',
              animation: 'adminPulse 2.5s ease-in-out infinite',
            }}
          >
            <FaLock size={18} />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-[0.85rem] text-left">
            <input
              type="password"
              placeholder="Password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              autoFocus
              className="w-full px-4 py-[0.8rem] rounded-[10px] text-white text-[0.95rem] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-white/30"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                fontFamily: 'var(--font-body)',
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(14,165,233,0.18)' }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.boxShadow = '' }}
            />
            {error && <p className="text-[0.8rem] text-[#f87171] m-0">{error}</p>}
            <button
              type="submit"
              disabled={loading || !pw}
              className="inline-flex items-center gap-[0.4rem] justify-center px-7 py-[0.85rem] rounded-[10px] text-[0.9rem] font-semibold text-white cursor-pointer transition-[background,transform] duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: 'var(--color-accent)', border: 'none', fontFamily: 'var(--font-body)' }}
              onMouseEnter={(e) => { if (!e.currentTarget.disabled) { e.currentTarget.style.background = 'var(--color-accent-dark)'; e.currentTarget.style.transform = 'translateY(-1px)' } }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-accent)'; e.currentTarget.style.transform = '' }}
            >
              {loading ? 'Verifying…' : 'Enter Dashboard →'}
            </button>
          </form>
        </div>
      </motion.div>

      <style>{`
        @keyframes adminPulse {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

// ─── New Client Modal ─────────────────────────────────────────────────────────

function NewClientModal({ adminKey, onClose, onCreated }: { adminKey: string; onClose: () => void; onCreated: () => void }) {
  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [loading, setLoading] = useState(false)
  const [result,  setResult]  = useState<{ accountId: string; onboardingUrl: string } | null>(null)
  const [copied,  setCopied]  = useState(false)
  const [error,   setError]   = useState('')

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/stripe/create-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
        body: JSON.stringify({ clientName: name, clientEmail: email, appUrl: window.location.origin }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setResult(data)
      onCreated()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const copyLink = async () => {
    if (!result) return
    await navigator.clipboard.writeText(result.onboardingUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const inputClass = 'w-full px-4 py-[0.8rem] rounded-[10px] text-white text-[0.95rem] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-white/30'
  const inputStyle = { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', fontFamily: 'var(--font-body)' }

  return (
    <motion.div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-[480px] rounded-[20px] p-8"
        style={{
          background: 'rgba(13,15,26,0.95)',
          border: '1px solid rgba(255,255,255,0.10)',
          boxShadow: '0 32px 64px rgba(0,0,0,0.6)',
        }}
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {!result ? (
          <>
            <p className="text-[0.68rem] font-bold tracking-[0.16em] uppercase m-0 mb-1.5" style={{ color: 'var(--color-accent-light)' }}>New Client</p>
            <h2 className="text-[1.5rem] font-extrabold text-white m-0 mb-2" style={{ fontFamily: 'var(--font-display)' }}>Add a Client</h2>
            <p className="text-[0.875rem] text-white/45 leading-[1.7] m-0 mb-6">
              Creates a Stripe account and generates an onboarding link you can send them. They only need an email to get started.
            </p>
            <form onSubmit={handleCreate} className="flex flex-col gap-[0.85rem] text-left">
              <label className="text-[0.72rem] font-bold tracking-[0.12em] uppercase text-white/45 -mb-[0.35rem]">Business / Client Name</label>
              <input className={inputClass} style={inputStyle} placeholder="e.g. Angel Face Studio" value={name} onChange={e => setName(e.target.value)} onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(14,165,233,0.18)' }} onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.boxShadow = '' }} />
              <label className="text-[0.72rem] font-bold tracking-[0.12em] uppercase text-white/45 -mb-[0.35rem]">Email <span className="font-normal normal-case tracking-normal opacity-60">(optional)</span></label>
              <input type="email" className={inputClass} style={inputStyle} placeholder="client@example.com" value={email} onChange={e => setEmail(e.target.value)} onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(14,165,233,0.18)' }} onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.boxShadow = '' }} />
              {error && <p className="text-[0.8rem] text-[#f87171] m-0">{error}</p>}
              <div className="flex gap-3 justify-end mt-2.5">
                <button type="button" onClick={onClose} className="px-5 py-3 rounded-[10px] text-[0.88rem] text-white/55 cursor-pointer transition-[border-color,color] duration-200 hover:border-white/30 hover:text-white" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', fontFamily: 'var(--font-body)' }}>Cancel</button>
                <button type="submit" disabled={loading || !name} className="inline-flex items-center gap-[0.4rem] px-7 py-3 rounded-[10px] text-[0.9rem] font-semibold text-white cursor-pointer transition-[background,transform] duration-200 disabled:opacity-40 disabled:cursor-not-allowed" style={{ background: 'var(--color-accent)', border: 'none', fontFamily: 'var(--font-body)' }}>
                  {loading ? 'Creating…' : 'Create Account →'}
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="inline-flex items-center gap-[0.4rem] text-[0.72rem] font-bold tracking-[0.12em] uppercase text-[#34d399] bg-[rgba(52,211,153,0.1)] border border-[rgba(52,211,153,0.25)] rounded-full px-[0.85rem] py-[0.3rem] mb-4">
              ✓ Account Created
            </div>
            <h2 className="text-[1.5rem] font-extrabold text-white m-0 mb-2" style={{ fontFamily: 'var(--font-display)' }}>{name}</h2>
            <p className="text-[0.875rem] text-white/45 leading-[1.7] m-0 mb-6">
              Copy the link below and send it to your client. They'll complete the rest directly with Stripe.
            </p>
            <div className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 mb-3 break-all">
              <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)' }}>
                {result.accountId}
              </code>
            </div>
            <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 flex-wrap mb-6">
              <span className="flex-1 break-all" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)' }}>{result.onboardingUrl}</span>
              <button
                onClick={copyLink}
                className="inline-flex items-center gap-[0.35rem] px-[0.65rem] py-[0.3rem] rounded-[6px] text-[0.75rem] font-semibold cursor-pointer whitespace-nowrap flex-shrink-0 transition-all duration-200"
                style={{
                  background: copied ? 'rgba(52,211,153,0.15)' : 'transparent',
                  color: copied ? '#34d399' : 'var(--color-accent-light)',
                  border: `1px solid ${copied ? 'rgba(52,211,153,0.3)' : 'rgba(14,165,233,0.35)'}`,
                  fontFamily: 'var(--font-body)',
                }}
              >
                {copied ? <><FaCheck size={11} /> Copied!</> : <><FaCopy size={11} /> Copy Link</>}
              </button>
            </div>
            <div className="flex justify-end">
              <button onClick={onClose} className="inline-flex items-center gap-[0.4rem] px-7 py-3 rounded-[10px] text-[0.9rem] font-semibold text-white cursor-pointer" style={{ background: 'var(--color-accent)', border: 'none', fontFamily: 'var(--font-body)' }}>Done</button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}

// ─── Client Row ───────────────────────────────────────────────────────────────

function ClientRow({ account, adminKey }: { account: StripeAccount; adminKey: string }) {
  const [expanded,      setExpanded]      = useState(false)
  const [linkLoading,   setLinkLoading]   = useState(false)
  const [onboardingUrl, setOnboardingUrl] = useState('')
  const [copied,        setCopied]        = useState(false)

  const generateLink = async () => {
    setLinkLoading(true)
    try {
      const res = await fetch('/api/stripe/account-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
        body: JSON.stringify({ accountId: account.id, appUrl: window.location.origin }),
      })
      const data = await res.json()
      setOnboardingUrl(data.onboardingUrl)
    } finally {
      setLinkLoading(false)
    }
  }

  const copyLink = async () => {
    await navigator.clipboard.writeText(onboardingUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const allGood = account.chargesEnabled && account.payoutsEnabled

  return (
    <div
      className="rounded-[14px] overflow-hidden transition-[border-color] duration-200 hover:border-white/[0.18]"
      style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.09)' }}
    >
      <div
        className="flex items-center justify-between px-5 py-4 cursor-pointer"
        onClick={() => setExpanded(p => !p)}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{
              background: allGood ? '#34d399' : 'rgba(255,255,255,0.25)',
              boxShadow: allGood ? '0 0 8px rgba(52,211,153,0.5)' : 'none',
            }}
          />
          <div>
            <p className="font-bold text-white text-[0.95rem] m-0 mb-[0.1rem]" style={{ fontFamily: 'var(--font-display)' }}>
              {account.name || '(unnamed)'}
            </p>
            <p className="text-[0.75rem] text-white/40 m-0">{account.email || account.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-white/30">
          <span className="text-[0.72rem] text-white/30">{timeAgo(account.created)}</span>
          {expanded ? <FaChevronUp size={11} /> : <FaChevronDown size={11} />}
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="px-5 pb-5 border-t border-white/[0.07] overflow-hidden"
          >
            {/* Status pills */}
            <div className="flex gap-2 flex-wrap my-4 mb-3">
              {[
                { label: 'Details submitted', ok: account.detailsSubmitted },
                { label: 'Charges enabled',   ok: account.chargesEnabled },
                { label: 'Payouts enabled',    ok: account.payoutsEnabled },
              ].map(({ label, ok }) => (
                <span
                  key={label}
                  className="text-[0.7rem] font-semibold px-[0.7rem] py-[0.25rem] rounded-full"
                  style={{
                    background: ok ? 'rgba(52,211,153,0.12)' : 'rgba(255,255,255,0.06)',
                    color: ok ? '#34d399' : 'rgba(255,255,255,0.35)',
                    border: `1px solid ${ok ? 'rgba(52,211,153,0.3)' : 'rgba(255,255,255,0.1)'}`,
                  }}
                >
                  {label}
                </span>
              ))}
            </div>

            {/* Account ID row */}
            <div className="flex items-center gap-4 mb-[0.4rem]">
              <span className="text-[0.68rem] font-bold tracking-[0.12em] uppercase text-white/35 w-[110px] flex-shrink-0">Account ID</span>
              <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'rgba(255,255,255,0.55)', wordBreak: 'break-all' }}>
                {account.id}
              </code>
            </div>

            {account.country && (
              <div className="flex items-center gap-4 mb-[0.4rem]">
                <span className="text-[0.68rem] font-bold tracking-[0.12em] uppercase text-white/35 w-[110px] flex-shrink-0">Country</span>
                <span className="text-[0.82rem] text-white/65">{account.country.toUpperCase()}</span>
              </div>
            )}

            {/* Onboarding link section */}
            <div className="mt-4">
              {!onboardingUrl ? (
                <button
                  onClick={generateLink}
                  disabled={linkLoading}
                  className="inline-flex items-center gap-[0.4rem] px-[0.9rem] py-[0.45rem] rounded-lg text-[0.78rem] font-medium cursor-pointer transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[rgba(14,165,233,0.1)] hover:border-[var(--color-accent)]"
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(14,165,233,0.35)',
                    color: 'var(--color-accent-light)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  <FaExternalLinkAlt size={11} />
                  {linkLoading ? 'Generating…' : 'Get Onboarding Link'}
                </button>
              ) : (
                <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 flex-wrap">
                  <span className="flex-1 break-all" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)' }}>
                    {onboardingUrl}
                  </span>
                  <button
                    onClick={copyLink}
                    className="inline-flex items-center gap-[0.35rem] px-[0.65rem] py-[0.3rem] rounded-[6px] text-[0.7rem] font-semibold cursor-pointer whitespace-nowrap flex-shrink-0 transition-all duration-200"
                    style={{
                      background: copied ? 'rgba(52,211,153,0.15)' : 'transparent',
                      color: copied ? '#34d399' : 'var(--color-accent-light)',
                      border: `1px solid ${copied ? 'rgba(52,211,153,0.3)' : 'rgba(14,165,233,0.35)'}`,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {copied ? <><FaCheck size={10} /> Copied!</> : <><FaCopy size={10} /> Copy</>}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function Dashboard({ adminKey, onLogout }: { adminKey: string; onLogout: () => void }) {
  const [balance,    setBalance]    = useState<BalanceData | null>(null)
  const [accounts,   setAccounts]   = useState<StripeAccount[]>([])
  const [loading,    setLoading]    = useState(true)
  const [showModal,  setShowModal]  = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const fetchAll = useCallback(async () => {
    setRefreshing(true)
    try {
      const [balRes, accRes] = await Promise.all([
        fetch('/api/stripe/balance',  { headers: { 'x-admin-key': adminKey } }),
        fetch('/api/stripe/accounts', { headers: { 'x-admin-key': adminKey } }),
      ])
      // A stored key that no longer matches ADMIN_SECRET — send back to the gate
      if (balRes.status === 401 || accRes.status === 401) {
        onLogout()
        return
      }
      const [balData, accData] = await Promise.all([balRes.json(), accRes.json()])
      setBalance(balData)
      setAccounts(accData.accounts || [])
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [adminKey, onLogout])

  useEffect(() => { fetchAll() }, [fetchAll])

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-6 py-12 overflow-hidden"
      style={{ marginTop: 'var(--navbar-h, 60px)' }}
    >
      <img src="/images/mainbg.jpg" alt="" className="fixed inset-0 w-full h-full object-cover object-center z-0 pointer-events-none" />
      <div className="fixed inset-0 bg-black/[0.78] z-[1] pointer-events-none" />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="relative z-[2] w-full max-w-[860px] self-start pt-4"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-[0.72rem] font-bold tracking-[0.18em] uppercase m-0 mb-[0.6rem]" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-accent-light)' }}>
              Anakupto Platform
            </p>
            <h1 className="font-extrabold text-white leading-[1.1] tracking-[-0.02em] m-0" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem,4vw,2.75rem)' }}>
              Client Dashboard
            </h1>
          </div>
          <div className="flex gap-2 pt-[0.25rem]">
            {[
              { onClick: fetchAll, disabled: refreshing, title: 'Refresh', icon: <FaSync size={13} style={{ opacity: refreshing ? 0.4 : 1 }} /> },
              { onClick: onLogout, disabled: false,      title: 'Sign out', icon: <FaSignOutAlt size={13} /> },
            ].map(({ onClick, disabled, title, icon }) => (
              <button
                key={title}
                onClick={onClick}
                disabled={disabled}
                title={title}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-white/50 cursor-pointer transition-all duration-200 hover:border-white/25 hover:text-white disabled:opacity-35 disabled:cursor-not-allowed"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid gap-4 mb-10" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          {[
            { label: 'Available Balance', value: loading ? '—' : fmt(balance?.available), sub: 'Ready to payout' },
            { label: 'Pending',           value: loading ? '—' : fmt(balance?.pending),   sub: 'In transit' },
            { label: 'Connected Clients', value: loading ? '—' : accounts.length,         sub: 'Active accounts' },
          ].map(({ label, value, sub }) => (
            <div
              key={label}
              className="rounded-2xl p-6 transition-[border-color] duration-200 hover:border-[rgba(14,165,233,0.3)]"
              style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.10)' }}
            >
              <p className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-white/40 m-0 mb-2">{label}</p>
              <p className="text-[1.9rem] font-bold text-white m-0 mb-[0.25rem] tracking-[-0.02em]" style={{ fontFamily: 'var(--font-display)' }}>
                {value}
              </p>
              <p className="text-[0.75rem] font-medium m-0" style={{ color: 'var(--color-gold)' }}>{sub}</p>
            </div>
          ))}
        </div>

        {/* Client list */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-white text-[1.15rem] m-0" style={{ fontFamily: 'var(--font-display)' }}>
            Connected Clients
          </h2>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-[0.4rem] px-4 py-2 rounded-[10px] text-[0.8rem] font-semibold text-white cursor-pointer transition-[background,transform] duration-200"
            style={{ background: 'var(--color-accent)', border: 'none', fontFamily: 'var(--font-body)' }}
          >
            <FaPlus size={10} /> Add Client
          </button>
        </div>

        {loading ? (
          <div
            className="rounded-[14px] py-12 px-4 text-center text-[0.9rem] text-white/35"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px dashed rgba(255,255,255,0.1)' }}
          >
            Loading clients…
          </div>
        ) : accounts.length === 0 ? (
          <div
            className="rounded-[14px] py-12 px-4 text-center text-[0.9rem] text-white/35"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px dashed rgba(255,255,255,0.1)' }}
          >
            No clients yet.{' '}
            <span
              className="cursor-pointer hover:underline"
              style={{ color: 'var(--color-gold)' }}
              onClick={() => setShowModal(true)}
            >
              Add your first client →
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {accounts.map((acc) => (
              <ClientRow key={acc.id} account={acc} adminKey={adminKey} />
            ))}
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <NewClientModal
            adminKey={adminKey}
            onClose={() => setShowModal(false)}
            onCreated={fetchAll}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Root export ──────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  // sessionStorage is only available client-side — must be read inside useEffect
  const [adminKey,  setAdminKey]  = useState<string>('')
  const [hydrated,  setHydrated]  = useState(false)

  useEffect(() => {
    // Safe to access sessionStorage here (client only)
    const stored = sessionStorage.getItem('admin_key') ?? ''
    setAdminKey(stored)
    setHydrated(true)
  }, [])

  const handleAuth = (key: string) => {
    sessionStorage.setItem('admin_key', key)
    setAdminKey(key)
  }

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem('admin_key')
    setAdminKey('')
  }, [])

  // Don't flash the gate before sessionStorage is read
  if (!hydrated) return null

  return (
    <AnimatePresence mode="wait">
      {!adminKey
        ? <PasswordGate key="gate" onAuth={handleAuth} />
        : <Dashboard    key="dash" adminKey={adminKey} onLogout={handleLogout} />
      }
    </AnimatePresence>
  )
}
