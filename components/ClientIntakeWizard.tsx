'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { trackEvent } from '@/lib/analytics'
import { INTAKE_EMAILJS } from '@/lib/emailjs'
import {
  FaLaptopCode, FaGlobe, FaMobileAlt, FaShoppingCart, FaPaintBrush, FaTools, FaArrowLeft, FaArrowRight, FaCheck, FaCheckCircle,
  FaRocket, FaRobot, FaPlug, FaSyncAlt, FaWrench, FaCloud, FaHeartbeat,
} from 'react-icons/fa'
import { FiAlertCircle, FiCalendar } from 'react-icons/fi'
import {
  ASSET_OPTIONS, BUDGET_OPTIONS, DAY_OPTIONS, EMPTY_INTAKE, NO_PAGES_TYPES, PAGE_OPTIONS, PROJECT_TYPES, PROJECT_TYPE_GROUPS, TIME_OPTIONS, featuresFor,
  TIMELINE_OPTIONS, intakeSummary, type IntakeData, ASSET_INFO, FEATURE_INFO, PAGE_INFO,
} from '@/lib/portal/intake'
import { DEFAULT_BOOKING_URL } from '@/lib/portal/booking'

// ─── Static data ──────────────────────────────────────────────────────────────

const TYPE_ICONS: Record<string, React.ComponentType> = {
  website: FaGlobe, 'web-app': FaLaptopCode, saas: FaRocket, mobile: FaMobileAlt, ecommerce: FaShoppingCart, ai: FaRobot,
  api: FaPlug, design: FaPaintBrush, rebuild: FaSyncAlt, fix: FaWrench, devops: FaCloud, care: FaHeartbeat, other: FaTools,
}

// Options and answer shape are shared with the client portal (lib/portal/intake.ts)
const STEP_LABELS = ['About You', 'Project Type', 'Scope', 'What You Need', 'What You Have', 'Schedule']
const TOTAL_STEPS = 6

// ─── Framer Motion variants ───────────────────────────────────────────────────

const slideVariants = {
  enter:  (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 300, damping: 30 } },
  exit:   (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0, transition: { duration: 0.16 } }),
}

// ─── Types ────────────────────────────────────────────────────────────────────

type WizardData = IntakeData

type SetField = (f: keyof WizardData, v: string) => void
type ToggleItem = (f: keyof WizardData, v: string) => void

interface StepProps {
  data: WizardData
  set: SetField
  /** True after the visitor tried to continue with required fields missing. */
  showErrors: boolean
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildEmailMessage(data: WizardData): string {
  return `CLIENT INTAKE SUMMARY\n─────────────────────────────────────────\n${intakeSummary(data)}`
}

function isStepValid(step: number, data: WizardData): boolean {
  if (step === 1) return data.name.trim() !== '' && data.email.trim() !== ''
  if (step === 2) return data.projectType !== ''
  if (step === 3) return data.description.trim() !== '' && data.budget !== '' && data.timeline !== ''
  return true
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

function ProgressBar({ step }: { step: number }) {
  return (
    <ol
      className="m-0 mb-8 flex list-none items-start justify-center gap-0 p-0"
      aria-label="Wizard progress"
    >
      {STEP_LABELS.map((label, idx) => {
        const num       = idx + 1
        const completed = num < step
        const active    = num === step
        return (
          <li key={num} className="contents">
            {idx > 0 && (
              <span
                className={`mt-[15px] h-0.5 min-w-4 max-w-20 flex-1 rounded-full transition-colors duration-[400ms] ${completed ? 'bg-accent' : 'bg-line/25'}`}
                aria-hidden="true"
              />
            )}
            <span
              className="flex flex-shrink-0 flex-col items-center gap-2 p-1"
              aria-current={active ? 'step' : undefined}
            >
              <span
                className={[
                  'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-300',
                  completed
                    ? 'bg-accent text-accent-ink'
                    : active
                    ? 'bg-accent text-accent-ink ring-4 ring-accent/25'
                    : 'border border-line/30 bg-white/[0.04] text-subtle',
                ].join(' ')}
                aria-hidden="true"
              >
                {completed ? <FaCheck size={10} /> : num}
              </span>
              {/* Visible label on sm+, always available to screen readers */}
              <span
                className={[
                  'whitespace-nowrap text-center text-[0.72rem] font-medium tracking-[0.02em] transition-colors duration-300 max-[479px]:sr-only',
                  active ? 'text-accent-light' : completed ? 'text-muted' : 'text-subtle',
                ].join(' ')}
              >
                {label}
                {active && <span className="sr-only"> (current step)</span>}
              </span>
            </span>
          </li>
        )
      })}
    </ol>
  )
}

// ─── Step shell ───────────────────────────────────────────────────────────────

function StepHeading({ title, sub }: { title: string; sub: string }) {
  return (
    <div>
      <h2 className="text-h3 text-fg" tabIndex={-1} data-step-heading>{title}</h2>
      <p className="mt-1.5 text-small text-muted">{sub}</p>
    </div>
  )
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="field-error" role="alert">
      <FiAlertCircle size={15} className="mt-0.5 flex-shrink-0" aria-hidden="true" />
      {children}
    </p>
  )
}

// ─── Step 1 ───────────────────────────────────────────────────────────────────

function Step1({ data, set, showErrors }: StepProps) {
  const nameErr  = showErrors && data.name.trim() === ''
  const emailErr = showErrors && data.email.trim() === ''
  return (
    <div className="flex flex-col gap-6">
      <StepHeading title="About You" sub="Let's start with some basic information." />
      <FieldGroup label="Full Name" id="wizard-name" required>
        <FieldInput id="wizard-name" type="text" placeholder="e.g. Jane Smith" value={data.name} onChange={e => set('name', e.target.value)} autoComplete="name" required invalid={nameErr} />
        {nameErr && <FieldError id="wizard-name-error">Please enter your name.</FieldError>}
      </FieldGroup>
      <FieldGroup label="Email Address" id="wizard-email" required>
        <FieldInput id="wizard-email" type="email" placeholder="e.g. jane@company.com" value={data.email} onChange={e => set('email', e.target.value)} autoComplete="email" required invalid={emailErr} />
        {emailErr && <FieldError id="wizard-email-error">Please enter your email address.</FieldError>}
      </FieldGroup>
      <FieldGroup label="Company / Organization" id="wizard-company" optional>
        <FieldInput id="wizard-company" type="text" placeholder="e.g. Acme Inc." value={data.company} onChange={e => set('company', e.target.value)} autoComplete="organization" />
      </FieldGroup>
      <div className="grid gap-6 sm:grid-cols-2">
        <FieldGroup label="Phone" id="wizard-phone" optional>
          <FieldInput id="wizard-phone" type="tel" placeholder="(214) 555-0123" value={data.phone} onChange={e => set('phone', e.target.value)} autoComplete="tel" />
        </FieldGroup>
        <FieldGroup label="Current website" id="wizard-site" optional>
          <FieldInput id="wizard-site" type="url" inputMode="url" placeholder="https://" value={data.currentWebsite} onChange={e => set('currentWebsite', e.target.value)} autoComplete="url" />
        </FieldGroup>
      </div>
    </div>
  )
}

// ─── Step 2 ───────────────────────────────────────────────────────────────────

function Step2({ data, set, showErrors }: StepProps) {
  const missing = showErrors && data.projectType === ''
  return (
    <div className="flex flex-col gap-6">
      <StepHeading title="What Are You Building?" sub="Select the option that best describes your project." />
      <div>
        <div className="grid gap-5" role="radiogroup" aria-label="Project type" aria-describedby={missing ? 'wizard-type-error' : undefined}>
          {PROJECT_TYPE_GROUPS.map((g) => (
            <div key={g.id}>
              <p className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-subtle">{g.label}</p>
              <div className="grid grid-cols-2 gap-3 min-[600px]:grid-cols-3">
          {PROJECT_TYPES.filter((t) => t.group === g.id).map(({ id, label, sub }) => {
            const Icon = TYPE_ICONS[id] ?? FaTools
            const selected = data.projectType === id
            return (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => set('projectType', id)}
                className={[
                  'flex cursor-pointer select-none flex-col items-center gap-2 rounded-card border-[1.5px] px-3 py-4 text-center',
                  'transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5',
                  selected
                    ? 'border-accent-light bg-accent/[0.12]'
                    : missing
                    ? 'border-danger/50 bg-white/[0.03] hover:border-accent-light/60'
                    : 'border-line/20 bg-white/[0.03] hover:border-accent-light/50 hover:bg-white/[0.06]',
                ].join(' ')}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-control text-[1.1rem] transition-colors duration-200 ${selected ? 'bg-accent/25 text-accent-light' : 'bg-white/[0.07] text-muted'}`}
                  aria-hidden="true"
                >
                  <Icon />
                </span>
                <span className="text-[0.82rem] font-semibold leading-tight text-fg">{label}</span>
                <span className="text-[0.74rem] leading-snug text-subtle">{sub}</span>
              </button>
            )
          })}
              </div>
            </div>
          ))}
        </div>
        {missing && <FieldError id="wizard-type-error">Please choose a project type.</FieldError>}
      </div>
    </div>
  )
}

// ─── Step 3 ───────────────────────────────────────────────────────────────────

function Step3({ data, set, showErrors }: StepProps) {
  const descErr     = showErrors && data.description.trim() === ''
  const budgetErr   = showErrors && data.budget === ''
  const timelineErr = showErrors && data.timeline === ''
  return (
    <div className="flex flex-col gap-6">
      <StepHeading title="Project Scope" sub="Help me understand what you need built." />
      <FieldGroup label="Project Description" id="wizard-desc" required>
        <FieldTextarea id="wizard-desc" rows={4} placeholder="Describe what you want to build, who it's for, and what problem it solves…" value={data.description} onChange={e => set('description', e.target.value)} required invalid={descErr} />
        {descErr && <FieldError id="wizard-desc-error">Please describe your project.</FieldError>}
      </FieldGroup>
      <FieldGroup label="What would make this project a success?" id="wizard-goals" optional>
        <FieldTextarea id="wizard-goals" rows={2} placeholder="e.g. More bookings, look more professional, sell online, save time on admin…" value={data.goals} onChange={e => set('goals', e.target.value)} />
      </FieldGroup>
      <FieldGroup label="Budget Range" required>
        <PillRow options={BUDGET_OPTIONS} selected={data.budget} onSelect={v => set('budget', v)} radioGroup aria-label="Budget range" />
        {budgetErr && <FieldError id="wizard-budget-error">Please select a budget range.</FieldError>}
      </FieldGroup>
      <FieldGroup label="Timeline" required>
        <PillRow options={TIMELINE_OPTIONS} selected={data.timeline} onSelect={v => set('timeline', v)} radioGroup aria-label="Timeline" />
        {timelineErr && <FieldError id="wizard-timeline-error">Please select a timeline.</FieldError>}
      </FieldGroup>
      <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <FieldGroup label="Hard deadline?" id="wizard-deadline" optional>
          <FieldInput id="wizard-deadline" type="date" value={data.deadline} onChange={e => set('deadline', e.target.value)} />
        </FieldGroup>
        <FieldGroup label="What's the deadline for?" id="wizard-deadline-why" optional>
          <FieldInput id="wizard-deadline-why" type="text" placeholder="e.g. Grand opening, product launch" value={data.deadlineReason} onChange={e => set('deadlineReason', e.target.value)} />
        </FieldGroup>
      </div>
    </div>
  )
}

// ─── Step 4 ───────────────────────────────────────────────────────────────────

function Step4({ data, set, toggleArrayItem }: Pick<StepProps, 'data' | 'set'> & { toggleArrayItem: ToggleItem }) {
  return (
    <div className="flex flex-col gap-6">
      <StepHeading title="What You Need" sub="Pick everything that sounds useful. Not sure? Leave it — we'll figure it out together on the call." />
      {!NO_PAGES_TYPES.includes(data.projectType) && (
        <FieldGroup label={data.projectType === 'mobile' ? 'Screens / Sections' : 'Pages / Sections'}>
          <PillRow options={PAGE_OPTIONS} hints={PAGE_INFO} selected={data.pages} onToggle={v => toggleArrayItem('pages', v)} multiSelect aria-label="Pages needed" />
        </FieldGroup>
      )}
      <FieldGroup label="Features">
        <OptionCards
          options={featuresFor(data.projectType).map(v => ({ value: v, label: FEATURE_INFO[v]?.label ?? v, hint: FEATURE_INFO[v]?.hint }))}
          selected={data.features}
          onToggle={v => toggleArrayItem('features', v)}
          aria-label="Features"
        />
      </FieldGroup>
      <FieldGroup label="Anything else I should know?" id="wizard-tech" optional>
        <FieldTextarea id="wizard-tech" rows={3} placeholder="e.g. “We already use Square for payments” or “It has to work with our booking app.” Leave blank if you're not sure." value={data.techNotes} onChange={e => set('techNotes', e.target.value)} />
      </FieldGroup>
    </div>
  )
}

// ─── Step 5: what they already have ───────────────────────────────────────────

function StepAssets({ data, set, toggleArrayItem }: Pick<StepProps, 'data' | 'set'> & { toggleArrayItem: ToggleItem }) {
  return (
    <div className="flex flex-col gap-6">
      <StepHeading title="What You Already Have" sub="No worries if the answer is “nothing yet” — this just tells me where to start." />
      <FieldGroup label="I already have…">
        <OptionCards
          options={ASSET_OPTIONS.map(v => ({ value: v, label: v, hint: ASSET_INFO[v] }))}
          selected={data.assets}
          onToggle={v => toggleArrayItem('assets', v)}
          aria-label="What you already have"
        />
      </FieldGroup>
      <FieldGroup label="Websites you like" id="wizard-inspo" optional>
        <FieldTextarea id="wizard-inspo" rows={3} placeholder={'Links to sites (competitors or not) you like, and what you like about them\ne.g. https://example.com — clean, easy to book'} value={data.inspiration} onChange={e => set('inspiration', e.target.value)} />
      </FieldGroup>
    </div>
  )
}

// ─── Step 5 ───────────────────────────────────────────────────────────────────

function Step5({ data, set, toggleArrayItem }: Pick<StepProps, 'data' | 'set'> & { toggleArrayItem: ToggleItem }) {
  return (
    <div className="flex flex-col gap-6">
      <StepHeading title="Schedule a Call" sub="Tell me when you're generally available and I'll reach out to confirm." />
      <FieldGroup label="Preferred Days">
        <PillRow
          options={DAY_OPTIONS}
          selected={data.preferredDays}
          onToggle={v => toggleArrayItem('preferredDays', v)}
          multiSelect
          aria-label="Preferred days"
        />
      </FieldGroup>
      <FieldGroup label="Preferred Time">
        <PillRow
          options={TIME_OPTIONS}
          selected={data.preferredTime}
          onSelect={v => set('preferredTime', data.preferredTime === v ? '' : v)}
          radioGroup
          aria-label="Preferred time of day"
        />
      </FieldGroup>
      <p className="-mt-2 text-small text-muted">
        Prefer to pick a time yourself?{' '}
        <a href={DEFAULT_BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-accent-light underline decoration-accent/40 underline-offset-4 hover:text-white">
          <FiCalendar aria-hidden="true" /> Book a call now
        </a>
      </p>
      <FieldGroup label="Anything else?" id="wizard-notes" optional>
        <FieldTextarea id="wizard-notes" rows={3} placeholder="Specific questions, context, or anything I should know before our call…" value={data.additionalNotes} onChange={e => set('additionalNotes', e.target.value)} />
      </FieldGroup>
    </div>
  )
}

// ─── Shared field primitives ──────────────────────────────────────────────────

function FieldGroup({
  label, id, required, optional, children,
}: { label: string; id?: string; required?: boolean; optional?: boolean; children: React.ReactNode }) {
  // Without a control id (pill groups) the label is a plain caption, not a <label for>
  const Label = id ? 'label' : 'p'
  return (
    <div>
      <Label {...(id ? { htmlFor: id } : {})} className="field-label">
        {label}
        {required && <span className="ml-0.5 text-danger" aria-hidden="true">*</span>}
        {required && <span className="sr-only"> (required)</span>}
        {optional && <span className="ml-1.5 text-[0.78rem] font-normal text-subtle">(optional)</span>}
      </Label>
      {children}
    </div>
  )
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }
function FieldInput({ invalid, ...props }: InputProps) {
  return (
    <input
      {...props}
      className="field"
      aria-invalid={invalid ? true : undefined}
      aria-describedby={invalid && props.id ? `${props.id}-error` : undefined}
    />
  )
}

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }
function FieldTextarea({ invalid, ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      className="field"
      aria-invalid={invalid ? true : undefined}
      aria-describedby={invalid && props.id ? `${props.id}-error` : undefined}
    />
  )
}

interface PillRowProps {
  options: string[]
  /** Optional plain-English note per option, shown under the row for the last one touched */
  hints?: Record<string, string>
  selected: string | string[]
  onSelect?: (v: string) => void
  onToggle?: (v: string) => void
  multiSelect?: boolean
  radioGroup?: boolean
  'aria-label'?: string
}

function PillRow({ options, hints, selected, onSelect, onToggle, multiSelect, radioGroup, 'aria-label': ariaLabel }: PillRowProps) {
  const [focus, setFocus] = useState<string | null>(null)
  const note = hints && focus ? hints[focus] : null
  return (
    <>
    <div className="flex flex-wrap gap-2" role={radioGroup ? 'radiogroup' : 'group'} aria-label={ariaLabel}>
      {options.map(opt => {
        const active = Array.isArray(selected) ? selected.includes(opt) : selected === opt
        return (
          <button
            key={opt}
            type="button"
            role={radioGroup ? 'radio' : 'checkbox'}
            aria-checked={active}
            title={hints?.[opt]}
            onMouseEnter={() => hints && setFocus(opt)}
            onFocus={() => hints && setFocus(opt)}
            onClick={() => {
              if (hints) setFocus(opt)
              if (multiSelect && onToggle) onToggle(opt)
              else if (onSelect) onSelect(opt)
            }}
            className={[
              'min-h-[2.5rem] cursor-pointer select-none rounded-pill border-[1.5px] px-4 py-1.5 text-[0.85rem] font-medium',
              'transition-[border-color,background-color,color] duration-200',
              active
                ? 'border-accent-light/70 bg-accent/20 text-accent-light'
                : 'border-line/25 bg-white/[0.03] text-muted hover:border-accent-light/40 hover:text-fg',
            ].join(' ')}
          >
            {opt}
          </button>
        )
      })}
    </div>
    {hints && (
      <p className="mt-2 min-h-[1.25rem] text-[0.8rem] text-subtle" aria-live="polite">
        {note ? <><span className="font-semibold text-muted">{focus}:</span> {note}</> : 'Hover or tap an option to see what it means.'}
      </p>
    )}
    </>
  )
}

// Checkbox cards with a short plain-English explanation under each option
function OptionCards({
  options, selected, onToggle, 'aria-label': ariaLabel,
}: { options: { value: string; label: string; hint?: string }[]; selected: string[]; onToggle: (v: string) => void; 'aria-label'?: string }) {
  return (
    <div className="grid grid-cols-1 gap-2 min-[520px]:grid-cols-2" role="group" aria-label={ariaLabel}>
      {options.map(({ value, label, hint }) => {
        const active = selected.includes(value)
        return (
          <button
            key={value}
            type="button"
            role="checkbox"
            aria-checked={active}
            onClick={() => onToggle(value)}
            className={[
              'flex cursor-pointer select-none items-start gap-3 rounded-control border-[1.5px] px-3.5 py-3 text-left',
              'transition-[border-color,background-color] duration-200',
              active ? 'border-accent-light/70 bg-accent/[0.12]' : 'border-line/20 bg-white/[0.03] hover:border-accent-light/40 hover:bg-white/[0.05]',
            ].join(' ')}
          >
            <span
              className={`mt-0.5 flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-[5px] border-[1.5px] ${active ? 'border-accent-light bg-accent text-accent-ink' : 'border-line/40'}`}
              aria-hidden="true"
            >
              {active && <FaCheck size={9} />}
            </span>
            <span className="min-w-0">
              <span className={`block text-[0.88rem] font-semibold leading-snug ${active ? 'text-fg' : 'text-fg/90'}`}>{label}</span>
              {hint && <span className="mt-0.5 block text-[0.78rem] leading-snug text-subtle">{hint}</span>}
            </span>
          </button>
        )
      })}
    </div>
  )
}


// ─── Success screen ───────────────────────────────────────────────────────────

function SuccessScreen({ firstName }: { firstName: string }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-5 px-2 py-8 text-center sm:py-12"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      role="status"
    >
      <div className="relative flex h-[90px] w-[90px] flex-shrink-0 items-center justify-center rounded-full border border-success/40 bg-success/10 text-success">
        <span className="absolute inset-0 rounded-full border border-success/40 motion-safe:animate-pulse-ring" aria-hidden="true" />
        <FaCheckCircle size={52} aria-hidden="true" />
      </div>
      <h2 className="text-h2 text-fg">You're all set, {firstName}!</h2>
      <p className="m-0 max-w-[26rem] text-muted">
        Your intake form has been received. I'll review your project details and follow up within{' '}
        <strong className="font-semibold text-fg">24 hours</strong> to confirm a time that works for both of us.
      </p>
      <p className="m-0 text-small text-subtle">Check your inbox — a confirmation copy has been sent to you.</p>
    </motion.div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ClientIntakeWizard() {
  const [step,         setStep]         = useState(1)
  const [dir,          setDir]          = useState(1)
  const [submitted,    setSubmitted]    = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error,        setError]        = useState('')
  const [showErrors,   setShowErrors]   = useState(false)
  const stepRef = useRef<HTMLDivElement>(null)
  const [data,         setData]         = useState<WizardData>(EMPTY_INTAKE)
  // Hidden field only bots fill in
  const [trap,         setTrap]         = useState('')

  // /get-started?type=mobile (from the Services section) pre-selects the project type
  useEffect(() => {
    const type = new URLSearchParams(window.location.search).get('type')
    if (type && PROJECT_TYPES.some(t => t.id === type)) setData(prev => (prev.projectType ? prev : { ...prev, projectType: type }))
  }, [])

  // Move focus to the new step's heading so keyboard / screen-reader users land in context
  useEffect(() => {
    if (step === 1) return
    stepRef.current?.querySelector<HTMLElement>('[data-step-heading]')?.focus({ preventScroll: true })
  }, [step])

  const set = (field: keyof WizardData, value: string) =>
    setData(prev => ({ ...prev, [field]: value }))

  const toggleArrayItem = (field: keyof WizardData, item: string) => {
    setData(prev => {
      const arr = prev[field] as string[]
      return { ...prev, [field]: arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item] }
    })
  }

  const goNext = () => {
    if (!isStepValid(step, data)) {
      // Reveal inline errors and send focus to the first problem
      setShowErrors(true)
      requestAnimationFrame(() => {
        stepRef.current?.querySelector<HTMLElement>('[aria-invalid="true"], [role="radiogroup"]')?.focus()
      })
      return
    }
    setShowErrors(false)
    setDir(1)
    setStep(s => s + 1)
  }

  const goBack = () => {
    setShowErrors(false)
    setDir(-1)
    setStep(s => s - 1)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError('')
    try {
      // 1) Save to the client portal (shows up as a new request for Felipe)
      // 2) EmailJS sends the visitor their confirmation copy, as before
      // Either one succeeding counts: the request isn't lost.
      const [portal, mail] = await Promise.allSettled([
        fetch('/api/portal/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, website_url: trap }),
        }).then(async (r) => {
          if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error ?? 'Could not save')
        }),
        emailjs.send(
          INTAKE_EMAILJS.serviceId,
          INTAKE_EMAILJS.templateId,
          { user_name: data.name, user_email: data.email, message: buildEmailMessage(data) },
          INTAKE_EMAILJS.publicKey
        ),
      ])
      if (portal.status === 'rejected' && mail.status === 'rejected') throw portal.reason
      setSubmitted(true)
      trackEvent('get_started_submit', { project_type: data.projectType })
    } catch (err) {
      console.error('Intake submit error:', err)
      setError('Something went wrong. Please try again or email me directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const firstName = data.name.trim().split(' ')[0] || 'there'

  if (submitted) return <SuccessScreen firstName={firstName} />

  return (
    <div className="flex w-full flex-col">
      <ProgressBar step={step} />

      {/* Honeypot: invisible to people, tempting to spam bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website URL
          <input tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
        </label>
      </div>

      {/* Step area */}
      <div ref={stepRef} className="min-h-[18rem] pb-2">
        <AnimatePresence custom={dir} mode="wait">
          <motion.div
            key={step}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{ width: '100%' }}
          >
            {step === 1 && <Step1 data={data} set={set} showErrors={showErrors} />}
            {step === 2 && <Step2 data={data} set={set} showErrors={showErrors} />}
            {step === 3 && <Step3 data={data} set={set} showErrors={showErrors} />}
            {step === 4 && <Step4 data={data} set={set} toggleArrayItem={toggleArrayItem} />}
            {step === 5 && <StepAssets data={data} set={set} toggleArrayItem={toggleArrayItem} />}
            {step === 6 && <Step5 data={data} set={set} toggleArrayItem={toggleArrayItem} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Submit error banner */}
      {error && (
        <div
          className="my-3 flex items-start gap-2.5 rounded-control border border-danger/40 bg-danger/10 px-4 py-3 text-small text-danger"
          role="alert"
        >
          <FiAlertCircle size={18} className="mt-0.5 flex-shrink-0" aria-hidden="true" />
          {error}
        </div>
      )}

      {/* Nav row */}
      <div className="mt-6 flex items-center justify-between gap-3 border-t border-line/15 pt-6">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 1}
          aria-label="Go back"
          className="btn btn-secondary"
        >
          <FaArrowLeft aria-hidden="true" />
          Back
        </button>

        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={goNext}
            aria-label="Continue to next step"
            className="btn btn-primary ml-auto"
          >
            Next
            <FaArrowRight aria-hidden="true" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            aria-label="Submit and book a call"
            className="btn btn-primary ml-auto"
          >
            {isSubmitting ? (
              <>
                <span
                  className="h-3.5 w-3.5 flex-shrink-0 rounded-full border-2 border-accent-ink/30 border-t-accent-ink motion-safe:animate-spin"
                  aria-hidden="true"
                />
                Sending…
              </>
            ) : (
              <>
                Book a Call
                <FaCheck aria-hidden="true" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
