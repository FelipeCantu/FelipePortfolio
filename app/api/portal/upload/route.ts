import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { getProject } from '@/lib/portal/db'
import { currentClient, isAdminSession } from '@/lib/portal/session'
import { MAX_UPLOAD_BYTES } from '@/lib/portal/blob'

/**
 * Issues short-lived Vercel Blob upload tokens so the browser can upload
 * large files straight to storage (no 4.5 MB serverless body limit).
 * The finished upload is recorded by a server action that re-checks access.
 */
export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody
  try {
    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        const { projectId } = JSON.parse(clientPayload ?? '{}') as { projectId?: string }
        const project = projectId ? await getProject(projectId) : null
        if (!project) throw new Error('Project not found')

        const admin = await isAdminSession()
        const client = admin ? null : await currentClient()
        if (!admin && client?.id !== project.clientId) throw new Error('Not allowed')
        if (!pathname.startsWith(`portal/${project.id}/`)) throw new Error('Bad path')

        return {
          addRandomSuffix: true,
          maximumSizeInBytes: MAX_UPLOAD_BYTES,
          validUntil: Date.now() + 60 * 60 * 1000,
        }
      },
    })
    return Response.json(json)
  } catch (err) {
    return Response.json({ error: (err as Error).message }, { status: 400 })
  }
}
