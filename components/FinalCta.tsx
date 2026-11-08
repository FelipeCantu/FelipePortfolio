import Link from 'next/link'
import { FiArrowRight, FiCalendar } from 'react-icons/fi'
import { DEFAULT_BOOKING_URL } from '@/lib/portal/booking'

// Closing call to action: gives a scrolling visitor two ways in, one for each level of readiness.
export default function FinalCta() {
  return (
    <section className="section-y border-t border-line/10" aria-labelledby="final-cta-heading">
      <div className="container-page">
        <div className="card mx-auto max-w-3xl p-8 text-center sm:p-12">
          <h2 id="final-cta-heading" className="text-h2 text-fg">Ready to get your project moving?</h2>
          <p className="lead mx-auto mt-4 max-w-xl">
            Tell me what you have in mind and I’ll reply within 24 hours. Prefer to talk first? Grab a free time on my calendar.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/get-started" className="btn btn-primary group">
              Start Your Project
              <FiArrowRight aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <a href={DEFAULT_BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <FiCalendar aria-hidden="true" />
              Book a Free Call
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
