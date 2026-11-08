import { get } from '@vercel/blob'
import { getFile, getProject } from '@/lib/portal/db'
import { currentClient, isAdminSession } from '@/lib/portal/session'
import { BLOB_ACCESS } from '@/lib/portal/blob'

/** Authenticated file download: only the project's client or Felipe. */
export async function GET(request: Request, { params }: { params: Promise<{ projectId: string; fileId: string }> }) {
  const { projectId, fileId } = await params
  const project = await getProject(projectId)
  if (!project) return new Response('Not found', { status: 404 })

  const admin = await isAdminSession()
  const client = admin ? null : await currentClient()
  if (!admin && client?.id !== project.clientId) return new Response('Not found', { status: 404 })

  const file = await getFile(projectId, fileId)
  if (!file || file.kind !== 'upload') return new Response('Not found', { status: 404 })

  const result = await get(file.url, { access: BLOB_ACCESS })
  if (!result || result.statusCode !== 200) return new Response('File unavailable', { status: 502 })

  const download = new URL(request.url).searchParams.has('download')
  const safeName = file.name.replace(/["\\\r\n]/g, '_')
  return new Response(result.stream, {
    headers: {
      'Content-Type': result.blob.contentType || 'application/octet-stream',
      'Content-Length': String(result.blob.size),
      'Content-Disposition': `${download ? 'attachment' : 'inline'}; filename="${safeName}"; filename*=UTF-8''${encodeURIComponent(file.name)}`,
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
      // Uploaded HTML/SVG must never run as this site
      'Content-Security-Policy': "default-src 'none'; img-src 'self' data:; media-src 'self'; style-src 'unsafe-inline'; sandbox",
    },
  })
}
