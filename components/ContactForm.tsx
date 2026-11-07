'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiAlertCircle, FiCheckCircle, FiX } from 'react-icons/fi'
import emailjs from '@emailjs/browser'
import { trackEvent } from '@/lib/analytics'
import { CONTACT_EMAILJS } from '@/lib/emailjs'
import { HoneypotField, isLikelyBot, trapValueOf } from '@/components/ui/Honeypot'

// ─── Validation messages ──────────────────────────────────────────────────────

type FieldName = 'user_name' | 'user_email' | 'message'

const MESSAGES: Record<FieldName, { missing: string; invalid?: string }> = {
  user_name: { missing: 'Please tell me your name.' },
  user_email: { missing: 'Please enter your email address.', invalid: "That email doesn't look right. Check for typos." },
  message: { missing: 'Please add a short message about your project.' },
}

/** Map the browser's constraint-validation state to a friendly message. */
function messageFor(name: FieldName, el: HTMLInputElement | HTMLTextAreaElement): string {
  if (el.validity.valueMissing) return MESSAGES[name].missing
  return MESSAGES[name].invalid ?? 'Please check this field.'
}

// ─── Toast ────────────────────────────────────────────────────────────────────

function Toast({
  tone,
  title,
  body,
  onDismiss,
}: {
  tone: 'success' | 'error'
  title: string
  body: string
  onDismiss: () => void
}) {
  const isSuccess = tone === 'success'
  const Icon = isSuccess ? FiCheckCircle : FiAlertCircle
  return (
    <motion.div
      role={isSuccess ? 'status' : 'alert'}
      initial={{ opacity: 0, y: -24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, transition: { duration: 0.18 } }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      className={`glass fixed right-5 top-[calc(var(--navbar-h)+0.75rem)] z-[1100] flex w-[min(24rem,calc(100vw-2.5rem))] items-start gap-3 rounded-card border p-4 shadow-lift max-md:inset-x-4 max-md:right-auto max-md:w-auto ${
        isSuccess ? 'border-success/40' : 'border-danger/40'
      }`}
    >
      <Icon size={22} aria-hidden="true" className={`mt-0.5 flex-shrink-0 ${isSuccess ? 'text-success' : 'text-danger'}`} />
      <div className="min-w-0 flex-1">
        <p className="m-0 font-semibold text-fg">{title}</p>
        <p className="m-0 mt-1 text-small text-muted">{body}</p>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss"
        className="-mr-2 -mt-2 flex h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full text-subtle transition-colors hover:bg-white/[0.08] hover:text-fg"
      >
        <FiX size={16} aria-hidden="true" />
      </button>
    </motion.div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null)
  const renderedAt = useRef(0)
  useEffect(() => {
    renderedAt.current = Date.now()
  }, [])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({})

  const setFieldError = (name: FieldName, message?: string) =>
    setErrors((prev) => {
      const next = { ...prev }
      if (message) next[name] = message
      else delete next[name]
      return next
    })

  // Validate on blur (once the visitor leaves a field) and clear as they fix it
  const handleBlur = (name: FieldName) => (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const el = e.currentTarget
    setFieldError(name, el.validity.valid ? undefined : messageFor(name, el))
  }
  const handleInput = (name: FieldName) => (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (errors[name] && e.currentTarget.validity.valid) setFieldError(name)
  }
  // Fires on a blocked submit: show our inline message instead of the native bubble
  const handleInvalid = (name: FieldName) => (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault()
    setFieldError(name, messageFor(name, e.currentTarget))
  }

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!form.current) return

    setIsSubmitting(true)
    setShowError(false)

    try {
      const formElements = form.current.elements as typeof form.current.elements & {
        user_name: HTMLInputElement
        user_email: HTMLInputElement
        message: HTMLTextAreaElement
      }

      const userName = formElements.user_name.value.trim().slice(0, 80)
      const userEmail = formElements.user_email.value.trim()

      // Bot check: real people never fill the hidden field, and can't finish
      // the form within a couple of seconds of it rendering. Pretend it worked
      // so the bot gets no signal, but send nothing.
      if (isLikelyBot(trapValueOf(form.current), renderedAt.current)) {
        setShowSuccess(true)
        form.current.reset()
        return
      }

      const { serviceId, publicKey } = CONTACT_EMAILJS

      // 1. Send the main email (to you)
      await emailjs.sendForm(serviceId, CONTACT_EMAILJS.templateId, form.current, publicKey)

      // 2. Send a fixed thank-you to the visitor. It deliberately does NOT echo
      //    their message: an auto-reply that repeats visitor text to any address
      //    they type can be used to send spam through this EmailJS account.
      await emailjs.send(
        serviceId,
        CONTACT_EMAILJS.replyTemplateId,
        {
          to_email: userEmail,
          to_name: userName,
          from_name: 'Felipe Cantu Jr',
        },
        publicKey
      )

      setShowSuccess(true)
      trackEvent('contact_form_submit')
      form.current.reset()
      setErrors({})
      setTimeout(() => setShowSuccess(false), 5000)
    } catch (error) {
      console.error('Failed to send email:', error)
      setShowError(true)
      setTimeout(() => setShowError(false), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const describedBy = (name: FieldName) => (errors[name] ? `cf-${name}-error` : undefined)

  return (
    <div className="relative w-full">
      <form ref={form} onSubmit={sendEmail} className="relative grid w-full gap-5">
        <HoneypotField />
        <div>
          <label htmlFor="cf-name" className="field-label">
            Name
          </label>
          <input
            id="cf-name"
            type="text"
            name="user_name"
            required
            maxLength={80}
            autoComplete="name"
            placeholder="Your name"
            className="field"
            aria-invalid={errors.user_name ? true : undefined}
            aria-describedby={describedBy('user_name')}
            onBlur={handleBlur('user_name')}
            onInput={handleInput('user_name')}
            onInvalid={handleInvalid('user_name')}
          />
          {errors.user_name && (
            <p id="cf-user_name-error" className="field-error">
              <FiAlertCircle size={15} className="mt-0.5 flex-shrink-0" aria-hidden="true" />
              {errors.user_name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="cf-email" className="field-label">
            Email
          </label>
          <input
            id="cf-email"
            type="email"
            name="user_email"
            required
            maxLength={254}
            autoComplete="email"
            placeholder="your@email.com"
            className="field"
            aria-invalid={errors.user_email ? true : undefined}
            aria-describedby={describedBy('user_email')}
            onBlur={handleBlur('user_email')}
            onInput={handleInput('user_email')}
            onInvalid={handleInvalid('user_email')}
          />
          {errors.user_email && (
            <p id="cf-user_email-error" className="field-error">
              <FiAlertCircle size={15} className="mt-0.5 flex-shrink-0" aria-hidden="true" />
              {errors.user_email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="cf-message" className="field-label">
            Message
          </label>
          <textarea
            id="cf-message"
            name="message"
            required
            maxLength={5000}
            rows={5}
            placeholder="Tell me about your project..."
            className="field"
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={describedBy('message')}
            onBlur={handleBlur('message')}
            onInput={handleInput('message')}
            onInvalid={handleInvalid('message')}
          />
          {errors.message && (
            <p id="cf-message-error" className="field-error">
              <FiAlertCircle size={15} className="mt-0.5 flex-shrink-0" aria-hidden="true" />
              {errors.message}
            </p>
          )}
        </div>

        <button type="submit" disabled={isSubmitting} className="btn btn-primary mt-1 w-full sm:w-auto sm:justify-self-start">
          {isSubmitting ? (
            <>
              <span
                className="h-4 w-4 flex-shrink-0 rounded-full border-2 border-accent-ink/30 border-t-accent-ink motion-safe:animate-spin"
                aria-hidden="true"
              />
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </button>
      </form>

      <AnimatePresence>
        {showSuccess && (
          <Toast
            key="success"
            tone="success"
            title="Message sent successfully!"
            body="Thank you for reaching out. I've received your message and will get back to you soon."
            onDismiss={() => setShowSuccess(false)}
          />
        )}
        {showError && (
          <Toast
            key="error"
            tone="error"
            title="Failed to send message"
            body="Sorry, there was an error sending your message. Please try again or email me directly."
            onDismiss={() => setShowError(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
