import type { Metadata } from 'next'
import { sanity, ALL_POSTS_QUERY } from '@/lib/sanity'
import BlogGrid from '@/components/BlogGrid'

export const metadata: Metadata = {
  title: 'Web Development & Design Blog',
  description:
    'Practical articles on web development, React and Next.js, design and building websites that win clients, from a Dallas full-stack developer.',
  alternates: { canonical: 'https://felipecantujr.com/blog' },
  openGraph: {
    title: 'Web Development & Design Blog | Felipe Cantu Jr',
    description: 'Articles about web development, technology trends, and programming best practices.',
    url: 'https://felipecantujr.com/blog',
    images: [{ url: '/images/og.jpg', width: 1200, height: 630 }],
  },
}

export const revalidate = 3600 // revalidate every hour

export default async function BlogPage() {
  const posts = await sanity.fetch(ALL_POSTS_QUERY)
  return <BlogGrid posts={posts} />
}
