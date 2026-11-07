import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'
import Reveal from '@/components/ui/Reveal'

/** Closing call to action at the bottom of the home page. */
export default function HomeCta() {
  return (
    <section aria-labelledby="cta-title" className="section-y">
      <div className="container-page">
        <Reveal className="card relative isolate overflow-hidden px-8 py-14 text-center max-md:px-6 max-md:py-10">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(40rem_20rem_at_50%_0%,rgb(var(--c-accent)/0.18),transparent_70%)]"
          />
          <p className="eyebrow">Have a project in mind?</p>
          <h2 id="cta-title" className="mx-auto mt-3 max-w-2xl text-h2 text-fg">
            Let&rsquo;s build something that brings you <span className="text-gradient">new clients</span>
          </h2>
          <p className="lead mx-auto mt-4 max-w-xl">
            Tell me about it in a few quick steps and I&rsquo;ll follow up within 24 hours.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/get-started" className="btn btn-primary group">
              Start a Project
              <FiArrowRight aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Just say hello
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
