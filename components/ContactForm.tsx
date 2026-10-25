'use client'

import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { trackEvent } from '@/lib/analytics'
import { CONTACT_EMAILJS } from '@/lib/emailjs'

// ─── Component ────────────────────────────────────────────────────────────────

export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

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

      const userName = formElements.user_name.value
      const userEmail = formElements.user_email.value
      const userMessage = formElements.message.value

      const { serviceId, publicKey } = CONTACT_EMAILJS

      // 1. Send the main email (to you)
      await emailjs.sendForm(
        serviceId,
        CONTACT_EMAILJS.templateId,
        form.current,
        publicKey
      )

      // 2. Send thank-you email to the user
      await emailjs.send(
        serviceId,
        CONTACT_EMAILJS.replyTemplateId,
        {
          to_email: userEmail,
          to_name: userName,
          from_name: 'Felipe Cantu Jr',
          user_message: userMessage,
        },
        publicKey
      )

      setShowSuccess(true)
      trackEvent('contact_form_submit')
      form.current.reset()
      setTimeout(() => setShowSuccess(false), 5000)
    } catch (error) {
      console.error('Failed to send email:', error)
      setShowError(true)
      setTimeout(() => setShowError(false), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full relative">
      {/* Slide-in animation */}
      <style>{`
        @keyframes slideInAlert {
          from { transform: translateY(-100px); opacity: 0; }
          to   { transform: translateY(0);      opacity: 1; }
        }
        @keyframes alertPulse {
          0%   { transform: scale(1); }
          50%  { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>

      <form ref={form} onSubmit={sendEmail} className="grid w-full gap-[15px]">
        <label
          htmlFor="cf-name"
          className="font-semibold text-white/[0.82] text-[0.88rem] tracking-[0.02em]"
        >
          Name
        </label>
        <input
          id="cf-name"
          type="text"
          name="user_name"
          required
          placeholder="Your name"
          className="w-full h-[45px] px-3 py-3 bg-white/[0.07] border border-white/[0.14] rounded-[6px] text-white text-base placeholder:text-white/35 transition-[border-color,background,box-shadow] duration-200 outline-none focus:border-[var(--color-accent,#0ea5e9)] focus:shadow-[0_0_0_3px_rgba(14,165,233,0.18)] focus:bg-white/10"
        />

        <label
          htmlFor="cf-email"
          className="font-semibold text-white/[0.82] text-[0.88rem] tracking-[0.02em]"
        >
          Email
        </label>
        <input
          id="cf-email"
          type="email"
          name="user_email"
          required
          placeholder="your@email.com"
          className="w-full h-[45px] px-3 py-3 bg-white/[0.07] border border-white/[0.14] rounded-[6px] text-white text-base placeholder:text-white/35 transition-[border-color,background,box-shadow] duration-200 outline-none focus:border-[var(--color-accent,#0ea5e9)] focus:shadow-[0_0_0_3px_rgba(14,165,233,0.18)] focus:bg-white/10"
        />

        <label
          htmlFor="cf-message"
          className="font-semibold text-white/[0.82] text-[0.88rem] tracking-[0.02em]"
        >
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          placeholder="Tell me about your project..."
          rows={5}
          className="w-full px-3 py-3 bg-white/[0.07] border border-white/[0.14] rounded-[6px] text-white text-base placeholder:text-white/35 transition-[border-color,background,box-shadow] duration-200 outline-none resize-vertical font-inherit focus:border-[var(--color-accent,#0ea5e9)] focus:shadow-[0_0_0_3px_rgba(14,165,233,0.18)] focus:bg-white/10"
          style={{ minHeight: '120px' }}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2.5 px-[30px] py-3 rounded-full text-base font-bold cursor-pointer transition-all duration-[250ms] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          style={{
            fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)",
            background: 'var(--color-accent, #0ea5e9)',
            color: 'white',
            border: '2px solid var(--color-accent, #0ea5e9)',
            letterSpacing: '0.03em',
          }}
          onMouseEnter={(e) => {
            if (isSubmitting) return
            const el = e.currentTarget
            el.style.background = 'transparent'
            el.style.color = 'var(--color-accent-light, #38bdf8)'
            el.style.transform = 'translateY(-2px)'
            el.style.boxShadow = '0 6px 16px rgba(14,165,233,0.22)'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget
            el.style.background = 'var(--color-accent, #0ea5e9)'
            el.style.color = 'white'
            el.style.transform = ''
            el.style.boxShadow = ''
          }}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      {/* Success alert */}
      {showSuccess && (
        <div
          className="fixed top-5 right-5 max-md:top-2.5 max-md:right-2.5 max-md:left-2.5 flex items-center gap-3 px-5 py-4 rounded-xl z-[1000] max-w-[400px] min-w-[300px] max-md:max-w-none max-md:min-w-0"
          style={{
            background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
            color: 'white',
            borderLeft: '5px solid #2e7d32',
            boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
            animation: 'slideInAlert 0.5s ease-out',
          }}
          role="alert"
        >
          <div
            className="text-2xl font-bold mr-3 min-w-[24px]"
            style={{ animation: 'alertPulse 2s infinite' }}
          >
            ✓
          </div>
          <div className="flex-1">
            <h4 className="m-0 mb-1 text-base font-semibold">Message Sent Successfully!</h4>
            <p className="m-0 text-sm opacity-90 leading-[1.4]">
              Thank you for reaching out. We've received your message and will get back to you soon.
            </p>
          </div>
          <button
            onClick={() => setShowSuccess(false)}
            className="bg-none border-none text-white text-2xl cursor-pointer p-0 ml-3 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      )}

      {/* Error alert */}
      {showError && (
        <div
          className="fixed top-5 right-5 max-md:top-2.5 max-md:right-2.5 max-md:left-2.5 flex items-center gap-3 px-5 py-4 rounded-xl z-[1000] max-w-[400px] min-w-[300px] max-md:max-w-none max-md:min-w-0"
          style={{
            background: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)',
            color: 'white',
            borderLeft: '5px solid #c62828',
            boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
            animation: 'slideInAlert 0.5s ease-out',
          }}
          role="alert"
        >
          <div
            className="text-2xl font-bold mr-3 min-w-[24px]"
            style={{ animation: 'alertPulse 2s infinite' }}
          >
            ⚠
          </div>
          <div className="flex-1">
            <h4 className="m-0 mb-1 text-base font-semibold">Failed to Send Message</h4>
            <p className="m-0 text-sm opacity-90 leading-[1.4]">
              Sorry, there was an error sending your message. Please try again or contact us directly.
            </p>
          </div>
          <button
            onClick={() => setShowError(false)}
            className="bg-none border-none text-white text-2xl cursor-pointer p-0 ml-3 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      )}
    </div>
  )
}
