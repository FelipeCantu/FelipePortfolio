import type { Metadata } from 'next'
import { sanity, ALL_POSTS_QUERY } from '@/lib/sanity'
import BlogGrid from '@/components/BlogGrid'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Explore insightful articles about web development, technology trends, and programming best practices.',
  alternates: { canonical: 'https://felipecantujr.com/blog' },
  openGraph: {
    title: 'Blog | Felipe Cantu Jr',
    description: 'Articles about web development, technology trends, and programming best practices.',
    url: 'https://felipecantujr.com/blog',
    images: [{ url: '/images/felipe.jpg' }],
  },
}

export const revalidate = 3600 // revalidate every hour

export default async function BlogPage() {
  const posts = await sanity.fetch(ALL_POSTS_QUERY)
  return <BlogGrid posts={posts} />
}
