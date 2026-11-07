import type { Metadata } from 'next'
import ContactContent from '@/components/ContactContent'

export const metadata: Metadata = {
  title: 'Contact a Dallas Web Developer',
  description:
    "Contact Felipe Cantu Jr, a full-stack web developer in Dallas, TX. Ask about a new website, a redesign or a web app and get a reply within 24 hours.",
  alternates: { canonical: 'https://felipecantujr.com/contact' },
  openGraph: {
    title: 'Contact a Dallas Web Developer | Felipe Cantu Jr',
    description: "Get in touch. Let's build something great together.",
    url: 'https://felipecantujr.com/contact',
    images: [{ url: '/images/og.jpg', width: 1200, height: 630 }],
  },
}

export default function ContactPage() {
  return <ContactContent />
}
