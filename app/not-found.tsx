import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container-page page-top section-y flex min-h-[70dvh] flex-col items-center justify-center text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-3 text-display text-gradient">Page not found</h1>
      <p className="lead mx-auto mt-4 max-w-md">
        The page you're looking for doesn't exist or has moved. Let's get you back on track.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-primary">
          Back home
        </Link>
        <Link href="/portfolio" className="btn btn-secondary">
          View my work
        </Link>
        <Link href="/blog" className="btn btn-secondary">
          Read the blog
        </Link>
      </div>
    </div>
  )
}
