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
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8 relative"
      style={{
        backgroundImage: 'linear-gradient(rgba(20,20,30,0.75),rgba(20,20,30,0.75)),url(/images/mainbg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="relative z-10 w-full max-w-2xl">
        <ClientIntakeWizard />
      </div>
    </div>
  )
}
