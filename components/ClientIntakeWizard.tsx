'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { trackEvent } from '@/lib/analytics'
import { INTAKE_EMAILJS } from '@/lib/emailjs'
import {
  FaLaptopCode, FaGlobe, FaMobileAlt, FaShoppingCart,
  FaPaintBrush, FaTools, FaArrowLeft, FaArrowRight, FaCheck, FaCheckCircle,
} from 'react-icons/fa'

// ─── Static data ──────────────────────────────────────────────────────────────

const PROJECT_TYPES = [
  { id: 'web-app',   icon: FaLaptopCode,   label: 'Web Application',      sub: 'Full-stack web platform' },
  { id: 'website',   icon: FaGlobe,        label: 'Website / Landing Page', sub: 'Marketing or portfolio site' },
  { id: 'mobile',    icon: FaMobileAlt,    label: 'Mobile App',            sub: 'iOS / Android application' },
  { id: 'ecommerce', icon: FaShoppingCart, label: 'E-Commerce',            sub: 'Online store or marketplace' },
  { id: 'design',    icon: FaPaintBrush,   label: 'UI/UX Design',          sub: 'Design system or prototype' },
  { id: 'other',     icon: FaTools,        label: 'Something Else',        sub: "Let's talk about it" },
]

const BUDGET_OPTIONS   = ['Under $1,000', '$1k–$5k', '$5k–$15k', '$15k+', "Let's Discuss"]
const TIMELINE_OPTIONS = ['ASAP', '1–3 Months', '3–6 Months', '6+ Months', 'Flexible']
const FEATURE_OPTIONS  = [
  'User Authentication', 'Admin Dashboard', 'Payment Integration',
  'API Integration', 'Real-time Features', 'Database Design',
  'Mobile Responsive', 'SEO Optimization', 'CMS Integration',
  'Analytics', 'Email Notifications', '3rd-Party Integrations',
]
const DAY_OPTIONS  = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const TIME_OPTIONS = ['Morning (9am–12pm)', 'Afternoon (12pm–5pm)', 'Evening (5pm–8pm)']

const STEP_LABELS = ['About You', 'Project Type', 'Scope', 'Requirements', 'Schedule']
const TOTAL_STEPS = 5

// ─── Framer Motion variants ───────────────────────────────────────────────────

const slideVariants = {
  enter:  (dir: number) => ({ x: dir > 0 ? 50 : -50, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  exit:   (dir: number) => ({ x: dir > 0 ? -50 : 50, opacity: 0, transition: { duration: 0.18 } }),
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface WizardData {
  name: string; email: string; company: string
  projectType: string
  description: string; budget: string; timeline: string
  features: string[]; techNotes: string
  preferredDays: string[]; preferredTime: string; additionalNotes: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildEmailMessage(data: WizardData): string {
  const featureList = data.features.length ? data.features.join(', ') : 'None selected'
  const dayList     = data.preferredDays.length ? data.preferredDays.join(', ') : 'No preference'
  return `
CLIENT INTAKE SUMMARY
─────────────────────────────────────────
ABOUT
Name:     ${data.name}
Email:    ${data.email}
Company:  ${data.company || '—'}

PROJECT
Type:     ${data.projectType}

SCOPE
Description:
${data.description}

Budget:   ${data.budget}
Timeline: ${data.timeline}

REQUIREMENTS
Features: ${featureList}
Tech Notes:
${data.techNotes || '—'}

SCHEDULING
Preferred Days: ${dayList}
Preferred Time: ${data.preferredTime || 'No preference'}
Additional Notes:
${data.additionalNotes || '—'}
─────────────────────────────────────────
  `.trim()
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
    <div
      className="flex items-start justify-center px-6 pt-6 pb-7 gap-0"
      role="list"
      aria-label="Wizard progress"
    >
      {STEP_LABELS.map((label, idx) => {
        const num       = idx + 1
        const completed = num < step
        const active    = num === step
        return (
          <div key={num} className="contents">
            {idx > 0 && (
              <div
                className="h-0.5 flex-1 min-w-5 max-w-20 mt-[15px] transition-[background] duration-[400ms]"
                style={{ background: completed ? '#3498db' : 'rgba(255,255,255,0.1)' }}
                aria-hidden="true"
              />
            )}
            <div
              className="flex flex-col items-center gap-[0.45rem] flex-shrink-0 p-1"
              role="listitem"
              aria-current={active ? 'step' : undefined}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all duration-300"
                aria-hidden="true"
                style={
                  completed
                    ? { background: '#3498db', color: 'white' }
                    : active
                    ? { background: '#3498db', color: 'white', border: '2px solid rgba(255,255,255,0.5)', boxShadow: 'inset 0 0 0 2px #3498db' }
                    : { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.12)' }
                }
              >
                {completed ? <FaCheck size={10} /> : num}
              </div>
              <span
                className="text-[0.6rem] sm:text-[0.65rem] font-medium tracking-[0.04em] text-center whitespace-nowrap transition-[color] duration-300 max-[479px]:hidden"
                style={{
                  color: active ? '#3498db' : completed ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.3)',
                }}
              >
                {label}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── Step 1 ───────────────────────────────────────────────────────────────────

function Step1({ data, set }: { data: WizardData; set: (f: keyof WizardData, v: string) => void }) {
  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <h2 className="text-[1.2rem] sm:text-[1.4rem] font-bold text-white m-0 leading-[1.25]">About You</h2>
      <p className="text-[0.875rem] sm:text-[0.9rem] text-white/55 -mt-3 leading-[1.5] m-0">Let's start with some basic information.</p>
      <FieldGroup label="Full Name" id="wizard-name" required>
        <FieldInput id="wizard-name" type="text" placeholder="e.g. Jane Smith" value={data.name} onChange={e => set('name', e.target.value)} autoComplete="name" required />
      </FieldGroup>
      <FieldGroup label="Email Address" id="wizard-email" required>
        <FieldInput id="wizard-email" type="email" placeholder="e.g. jane@company.com" value={data.email} onChange={e => set('email', e.target.value)} autoComplete="email" required />
      </FieldGroup>
      <FieldGroup label="Company / Organization" id="wizard-company" optional>
        <FieldInput id="wizard-company" type="text" placeholder="e.g. Acme Inc." value={data.company} onChange={e => set('company', e.target.value)} autoComplete="organization" />
      </FieldGroup>
    </div>
  )
}

// ─── Step 2 ───────────────────────────────────────────────────────────────────

function Step2({ data, set }: { data: WizardData; set: (f: keyof WizardData, v: string) => void }) {
  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <h2 className="text-[1.2rem] sm:text-[1.4rem] font-bold text-white m-0 leading-[1.25]">What Are You Building?</h2>
      <p className="text-[0.875rem] sm:text-[0.9rem] text-white/55 -mt-3 leading-[1.5] m-0">Select the option that best describes your project.</p>
      <div
        className="grid gap-3 overflow-visible p-1 -m-1"
        style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}
        role="radiogroup"
        aria-label="Project type"
      >
        <style>{`@media (min-width: 600px) { .type-grid { grid-template-columns: repeat(3, 1fr) !important; } }`}</style>
        {PROJECT_TYPES.map(({ id, icon: Icon, label, sub }) => {
          const selected = data.projectType === id
          return (
            <div
              key={id}
              className="type-grid flex flex-col items-center text-center gap-2 p-4 px-3 rounded-[10px] cursor-pointer transition-all duration-200 select-none hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-[#3498db] focus-visible:outline-offset-[2px]"
              style={{
                border: `1.5px solid ${selected ? '#3498db' : 'rgba(255,255,255,0.08)'}`,
                background: selected ? 'rgba(52,152,219,0.12)' : 'rgba(255,255,255,0.04)',
              }}
              onClick={() => set('projectType', id)}
              role="radio"
              aria-checked={selected}
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); set('projectType', id) } }}
            >
              <div
                className="w-10 h-10 rounded-[10px] flex items-center justify-center text-[1.1rem] transition-all duration-200"
                style={{
                  background: selected ? 'linear-gradient(135deg, rgba(52,152,219,0.3), rgba(155,89,182,0.3))' : 'rgba(255,255,255,0.07)',
                  color: selected ? '#3498db' : 'rgba(255,255,255,0.55)',
                }}
              >
                <Icon />
              </div>
              <span className="text-[0.78rem] font-semibold text-white/90 leading-[1.2]">{label}</span>
              <span className="text-[0.68rem] text-white/38 leading-[1.3]">{sub}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Step 3 ───────────────────────────────────────────────────────────────────

function Step3({ data, set }: { data: WizardData; set: (f: keyof WizardData, v: string) => void }) {
  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <h2 className="text-[1.2rem] sm:text-[1.4rem] font-bold text-white m-0 leading-[1.25]">Project Scope</h2>
      <p className="text-[0.875rem] sm:text-[0.9rem] text-white/55 -mt-3 leading-[1.5] m-0">Help me understand what you need built.</p>
      <FieldGroup label="Project Description" id="wizard-desc" required>
        <FieldTextarea id="wizard-desc" rows={4} placeholder="Describe what you want to build, who it's for, and what problem it solves…" value={data.description} onChange={e => set('description', e.target.value)} required />
      </FieldGroup>
      <FieldGroup label="Budget Range" required>
        <PillRow options={BUDGET_OPTIONS} selected={data.budget} onSelect={v => set('budget', v)} radioGroup aria-label="Budget range" />
      </FieldGroup>
      <FieldGroup label="Timeline" required>
        <PillRow options={TIMELINE_OPTIONS} selected={data.timeline} onSelect={v => set('timeline', v)} radioGroup aria-label="Timeline" />
      </FieldGroup>
    </div>
  )
}

// ─── Step 4 ───────────────────────────────────────────────────────────────────

function Step4({ data, set, toggleArrayItem }: { data: WizardData; set: (f: keyof WizardData, v: string) => void; toggleArrayItem: (f: keyof WizardData, v: string) => void }) {
  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <h2 className="text-[1.2rem] sm:text-[1.4rem] font-bold text-white m-0 leading-[1.25]">Key Requirements</h2>
      <p className="text-[0.875rem] sm:text-[0.9rem] text-white/55 -mt-3 leading-[1.5] m-0">Select every feature or capability your project needs.</p>
      <FieldGroup label="Features & Capabilities">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Feature selection">
          {FEATURE_OPTIONS.map(feat => {
            const active = data.features.includes(feat)
            return (
              <div
                key={feat}
                className="inline-flex items-center gap-[0.3rem] px-[0.85rem] py-[0.4rem] rounded-[6px] text-[0.78rem] font-medium cursor-pointer select-none transition-all duration-[180ms] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-[#3498db] focus-visible:outline-offset-[2px]"
                style={{
                  border: `1.5px solid ${active ? 'rgba(52,152,219,0.6)' : 'rgba(255,255,255,0.1)'}`,
                  background: active ? 'rgba(52,152,219,0.15)' : 'rgba(255,255,255,0.04)',
                  color: active ? '#5dade2' : 'rgba(255,255,255,0.6)',
                }}
                onClick={() => toggleArrayItem('features', feat)}
                role="checkbox"
                aria-checked={active}
                tabIndex={0}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleArrayItem('features', feat) } }}
              >
                {active && <FaCheck size={9} style={{ flexShrink: 0 }} />}
                {feat}
              </div>
            )
          })}
        </div>
      </FieldGroup>
      <FieldGroup label="Technical Notes" id="wizard-tech" optional>
        <FieldTextarea id="wizard-tech" rows={3} placeholder="Preferred stack, existing systems to integrate with, specific constraints…" value={data.techNotes} onChange={e => set('techNotes', e.target.value)} />
      </FieldGroup>
    </div>
  )
}

// ─── Step 5 ───────────────────────────────────────────────────────────────────

function Step5({ data, set, toggleArrayItem }: { data: WizardData; set: (f: keyof WizardData, v: string) => void; toggleArrayItem: (f: keyof WizardData, v: string) => void }) {
  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <h2 className="text-[1.2rem] sm:text-[1.4rem] font-bold text-white m-0 leading-[1.25]">Schedule a Call</h2>
      <p className="text-[0.875rem] sm:text-[0.9rem] text-white/55 -mt-3 leading-[1.5] m-0">Tell me when you're generally available and I'll reach out to confirm.</p>
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
      <FieldGroup label="Anything else?" id="wizard-notes" optional>
        <FieldTextarea id="wizard-notes" rows={3} placeholder="Specific questions, context, or anything I should know before our call…" value={data.additionalNotes} onChange={e => set('additionalNotes', e.target.value)} />
      </FieldGroup>
    </div>
  )
}

// ─── Shared field primitives ──────────────────────────────────────────────────

const fieldInputClass = [
  'w-full h-[44px] px-[0.875rem] py-[0.65rem] rounded-lg outline-none box-border',
  'bg-white/[0.06] border border-white/10 text-white text-[0.9rem] placeholder:text-white/28',
  'transition-[border-color,background,box-shadow] duration-200',
  'focus:border-[#3498db] focus:bg-[rgba(52,152,219,0.08)] focus:shadow-[0_0_0_3px_rgba(52,152,219,0.18)]',
].join(' ')

const fieldTextareaClass = [
  'w-full px-[0.875rem] py-[0.7rem] rounded-lg outline-none box-border resize-y',
  'bg-white/[0.06] border border-white/10 text-white text-[0.9rem] placeholder:text-white/28',
  'leading-[1.55] min-h-[80px] font-inherit',
  'transition-[border-color,background,box-shadow] duration-200',
  'focus:border-[#3498db] focus:bg-[rgba(52,152,219,0.08)] focus:shadow-[0_0_0_3px_rgba(52,152,219,0.18)]',
].join(' ')

function FieldGroup({
  label, id, required, optional, children,
}: { label: string; id?: string; required?: boolean; optional?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-[0.8rem] font-semibold text-white/80 tracking-[0.03em] uppercase"
      >
        {label}
        {required && <span className="text-[#e74c3c] ml-0.5">*</span>}
        {optional && <span className="font-normal normal-case text-white/35 text-[0.75rem] ml-1">(optional)</span>}
      </label>
      {children}
    </div>
  )
}

function FieldInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={fieldInputClass} />
}

function FieldTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={fieldTextareaClass} />
}

interface PillRowProps {
  options: string[]
  selected: string | string[]
  onSelect?: (v: string) => void
  onToggle?: (v: string) => void
  multiSelect?: boolean
  radioGroup?: boolean
  'aria-label'?: string
}

function PillRow({ options, selected, onSelect, onToggle, multiSelect, radioGroup, 'aria-label': ariaLabel }: PillRowProps) {
  return (
    <div className="flex flex-wrap gap-2" role={radioGroup ? 'radiogroup' : 'group'} aria-label={ariaLabel}>
      {options.map(opt => {
        const active = Array.isArray(selected) ? selected.includes(opt) : selected === opt
        return (
          <div
            key={opt}
            className="px-4 py-[0.45rem] rounded-full text-[0.8rem] font-medium cursor-pointer select-none transition-all duration-[180ms] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-[#3498db] focus-visible:outline-offset-[2px]"
            style={{
              border: `1.5px solid ${active ? '#3498db' : 'rgba(255,255,255,0.12)'}`,
              background: active ? 'rgba(52,152,219,0.2)' : 'rgba(255,255,255,0.05)',
              color: active ? '#5dade2' : 'rgba(255,255,255,0.65)',
            }}
            onClick={() => {
              if (multiSelect && onToggle) onToggle(opt)
              else if (onSelect) onSelect(opt)
            }}
            role={radioGroup ? 'radio' : 'checkbox'}
            aria-checked={active}
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                if (multiSelect && onToggle) onToggle(opt)
                else if (onSelect) onSelect(opt)
              }
            }}
          >
            {opt}
          </div>
        )
      })}
    </div>
  )
}

// ─── Success screen ───────────────────────────────────────────────────────────

function SuccessScreen({ firstName }: { firstName: string }) {
  return (
    <motion.div
      className="flex flex-col items-center text-center py-10 sm:py-14 px-4 sm:px-8 gap-5"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
    >
      <style>{`
        @keyframes orbPulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.05); }
        }
      `}</style>
      <div
        className="w-[90px] h-[90px] rounded-full flex items-center justify-center flex-shrink-0"
        style={{
          background: 'linear-gradient(135deg, rgba(52,152,219,0.25), rgba(155,89,182,0.25))',
          border: '1.5px solid rgba(52,152,219,0.35)',
          color: '#3498db',
          animation: 'orbPulse 2.5s ease-in-out infinite',
        }}
      >
        <FaCheckCircle size={52} />
      </div>
      <h2 className="text-[1.6rem] sm:text-[1.9rem] font-bold text-white m-0 leading-[1.2]">
        You're all set, {firstName}!
      </h2>
      <p className="text-[0.95rem] text-white/70 leading-[1.65] m-0 max-w-[420px]">
        Your intake form has been received. I'll review your project details and follow up within{' '}
        <strong className="text-white/90 font-semibold">24 hours</strong> to confirm a time that works for both of us.
      </p>
      <p className="text-[0.8rem] text-white/35 m-0 leading-[1.5]">
        Check your inbox — a confirmation copy has been sent to you.
      </p>
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
  const [data,         setData]         = useState<WizardData>({
    name: '', email: '', company: '',
    projectType: '',
    description: '', budget: '', timeline: '',
    features: [], techNotes: '',
    preferredDays: [], preferredTime: '', additionalNotes: '',
  })

  const set = (field: keyof WizardData, value: string) =>
    setData(prev => ({ ...prev, [field]: value }))

  const toggleArrayItem = (field: keyof WizardData, item: string) => {
    setData(prev => {
      const arr = prev[field] as string[]
      return { ...prev, [field]: arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item] }
    })
  }

  const goNext = () => {
    if (!isStepValid(step, data)) return
    setDir(1)
    setStep(s => s + 1)
  }

  const goBack = () => {
    setDir(-1)
    setStep(s => s - 1)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError('')
    try {
      await emailjs.send(
        INTAKE_EMAILJS.serviceId,
        INTAKE_EMAILJS.templateId,
        { user_name: data.name, user_email: data.email, message: buildEmailMessage(data) },
        INTAKE_EMAILJS.publicKey
      )
      setSubmitted(true)
      trackEvent('get_started_submit', { project_type: data.projectType })
    } catch (err) {
      console.error('EmailJS error:', err)
      setError('Something went wrong. Please try again or email me directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const firstName = data.name.trim().split(' ')[0] || 'there'

  if (submitted) return <SuccessScreen firstName={firstName} />

  return (
    <div className="w-full flex flex-col overflow-visible">
      <style>{`
        @keyframes wizardSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>

      <ProgressBar step={step} />

      {/* Step area */}
      <div className="pb-2">
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
            {step === 1 && <Step1 data={data} set={set} />}
            {step === 2 && <Step2 data={data} set={set} />}
            {step === 3 && <Step3 data={data} set={set} />}
            {step === 4 && <Step4 data={data} set={set} toggleArrayItem={toggleArrayItem} />}
            {step === 5 && <Step5 data={data} set={set} toggleArrayItem={toggleArrayItem} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Error banner */}
      {error && (
        <div
          className="my-2 px-4 py-[0.65rem] rounded-lg text-[0.83rem] leading-[1.45]"
          style={{
            background: 'rgba(231,76,60,0.15)',
            border: '1px solid rgba(231,76,60,0.35)',
            color: '#e74c3c',
          }}
          role="alert"
        >
          {error}
        </div>
      )}

      {/* Nav row */}
      <div className="flex items-center justify-between pt-5 mt-4 border-t border-white/[0.08] gap-3">
        <button
          onClick={goBack}
          disabled={step === 1}
          aria-label="Go back"
          className="inline-flex items-center gap-[0.45rem] px-5 py-[0.625rem] rounded-lg text-[0.875rem] font-semibold cursor-pointer transition-all duration-200 min-h-[42px] disabled:opacity-[0.38] disabled:cursor-not-allowed disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-[#3498db] focus-visible:outline-offset-[2px]"
          style={{
            background: 'transparent',
            border: '1.5px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.7)',
            fontFamily: 'inherit',
          }}
          onMouseEnter={(e) => { if (!e.currentTarget.disabled) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'white' } }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
        >
          <FaArrowLeft />
          Back
        </button>

        {step < TOTAL_STEPS ? (
          <button
            onClick={goNext}
            disabled={!isStepValid(step, data)}
            aria-label="Continue to next step"
            className="inline-flex items-center gap-[0.45rem] px-5 py-[0.625rem] rounded-lg text-[0.875rem] font-semibold cursor-pointer transition-all duration-200 min-h-[42px] ml-auto disabled:opacity-[0.38] disabled:cursor-not-allowed disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-[#3498db] focus-visible:outline-offset-[2px]"
            style={{
              background: 'linear-gradient(135deg, #3498db, #2980b9)',
              color: 'white',
              border: 'none',
              fontFamily: 'inherit',
            }}
            onMouseEnter={(e) => { if (!e.currentTarget.disabled) { e.currentTarget.style.background = 'linear-gradient(135deg, #2eaadc, #2471a3)'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(52,152,219,0.38)' } }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, #3498db, #2980b9)'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
          >
            Next
            <FaArrowRight />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            aria-label="Submit and book a call"
            className="inline-flex items-center gap-[0.45rem] px-6 py-[0.625rem] rounded-[30px] text-[0.875rem] font-semibold cursor-pointer transition-all duration-200 min-h-[42px] ml-auto disabled:opacity-[0.38] disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[#3498db] focus-visible:outline-offset-[2px]"
            style={{
              background: '#3498db',
              color: 'white',
              border: '2px solid #3498db',
              fontFamily: 'inherit',
            }}
            onMouseEnter={(e) => { if (!e.currentTarget.disabled) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#3498db'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)' } }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#3498db'; e.currentTarget.style.color = 'white'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
          >
            {isSubmitting ? (
              <>
                <span
                  className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full flex-shrink-0"
                  style={{ animation: 'wizardSpin 0.7s linear infinite' }}
                />
                Sending…
              </>
            ) : (
              <>
                Book a Call
                <FaCheck />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
