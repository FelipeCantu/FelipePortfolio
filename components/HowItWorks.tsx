import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'

// Plain-English process so a visitor knows exactly what happens after they click "Start a project".
// Only describes things that really exist: the intake form, the call, and the private client portal.
const STEPS = [
  { title: 'Tell me about your project', text: 'A short form, about 5 minutes. Not sure about an answer? Skip it and we’ll sort it out together.' },
  { title: 'We talk it through', text: 'A free call to go over what you need, what it takes, and what it costs. No pressure to commit.' },
  { title: 'I build it, you follow along', text: 'Track progress, share files and pay invoices in your private client portal, so you’re never left guessing.' },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-y border-t border-line/10" aria-labelledby="how-heading">
      <div className="container-page">
        <header className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">How it works</p>
          <h2 id="how-heading" className="mt-3 text-h2 text-fg">From first message to launch in three simple steps</h2>
        </header>

        <ol className="mt-12 grid list-none gap-4 p-0 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="card flex flex-col p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-ink" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-bold text-fg">{s.title}</h3>
              <p className="mt-2 text-small text-muted">{s.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex justify-center">
          <Link href="/get-started" className="btn btn-primary group">
            Start Your Project
            <FiArrowRight aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
