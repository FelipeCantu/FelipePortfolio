import { listReviews } from '@/lib/portal/db'

export const dynamic = 'force-dynamic'

/**
 * Public: reviews the client allowed and Felipe chose to publish. Only the
 * display fields go out (no emails, project names or IDs beyond the review's).
 */
export async function GET() {
  try {
    const reviews = (await listReviews()).filter((r) => r.published && r.allowPublish).slice(0, 6)
    return Response.json(
      {
        testimonials: reviews.map((r) => ({
          _id: `portal-${r.id}`,
          name: r.displayName,
          role: r.role,
          company: r.company,
          quote: r.text.length > 400 ? `${r.text.slice(0, 397)}…` : r.text,
          rating: r.rating,
        })),
      },
      { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600' } }
    )
  } catch {
    // Portal storage not configured (e.g. local dev): just no portal reviews
    return Response.json({ testimonials: [] })
  }
}
