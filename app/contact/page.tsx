import type { Metadata } from 'next'
import ContactContent from '@/components/ContactContent'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    "Get in touch with Felipe Cantu Jr. Let's build something great together.",
  alternates: { canonical: 'https://felipecantujr.com/contact' },
  openGraph: {
    title: 'Contact | Felipe Cantu Jr',
    description: "Get in touch. Let's build something great together.",
    url: 'https://felipecantujr.com/contact',
    images: [{ url: '/images/felipe.jpg' }],
  },
}

export default function ContactPage() {
  return <ContactContent />
}
