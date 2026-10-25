import type { Metadata } from 'next'
import ClientIntakeWizard from '@/components/ClientIntakeWizard'

export const metadata: Metadata = {
  title: 'Get Started',
  description:
    "Ready to build something? Fill out the project intake form and let's get started.",
  alternates: { canonical: 'https://felipecantujr.com/get-started' },
}

export default function GetStartedPage() {
  return (
    <div className="container-page page-top pb-section">
      <div className="mx-auto w-full max-w-2xl">
        <header className="mb-8 text-center">
          <p className="eyebrow">Get started</p>
          <h1 className="mt-3 text-h1 text-fg">Plan your project</h1>
        </header>
        <div className="card p-6 sm:p-8 lg:p-10">
          <ClientIntakeWizard />
        </div>
      </div>
    </div>
  )
}
