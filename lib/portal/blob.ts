/**
 * Files live in Vercel Blob. Private by default, so a file URL alone is
 * useless: every download goes through /api/portal/files/..., which checks
 * the viewer can see that project. Set PORTAL_BLOB_ACCESS=public only if
 * your Blob store was created as public.
 */
export const BLOB_ACCESS: 'private' | 'public' = process.env.PORTAL_BLOB_ACCESS === 'public' ? 'public' : 'private'

export const MAX_UPLOAD_BYTES = 500 * 1024 * 1024 // 500 MB

export function isBlobUrl(url: string) {
  try {
    const u = new URL(url)
    return u.protocol === 'https:' && u.hostname.endsWith('.blob.vercel-storage.com')
  } catch {
    return false
  }
}

/** URL the portal links to for a file (uploads are proxied; links open directly). */
export const fileHref = (f: { kind: 'upload' | 'link'; url: string; projectId: string; id: string }, download = false) =>
  f.kind === 'link' ? f.url : `/api/portal/files/${f.projectId}/${f.id}${download ? '?download=1' : ''}`
