import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FiArrowLeft, FiSlash, FiTrash2 } from 'react-icons/fi'
import { getClient, getContract, getProject } from '@/lib/portal/db'
import ContractDocument from '@/components/portal/ContractDocument'
import ContractEditor from '@/components/portal/admin/ContractEditor'
import PrintButton from '@/components/portal/PrintButton'
import { deleteContractAction, updateContractAction, voidContractAction } from '@/app/portal/admin/actions'

export const metadata = { title: 'Agreement' }

export default async function AdminContractPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const contract = await getContract(id)
  if (!contract) notFound()
  const [client, project] = await Promise.all([getClient(contract.clientId), getProject(contract.projectId)])
  if (!client) notFound()

  return (
    <div className="mx-auto grid max-w-3xl gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link href={`/portal/admin/projects/${contract.projectId}`} className="btn btn-ghost btn-sm !pl-2">
          <FiArrowLeft aria-hidden="true" /> {project?.name ?? 'Project'}
        </Link>
        <div className="flex flex-wrap gap-2">
          {contract.status === 'sent' && (
            <form action={voidContractAction.bind(null, id)}>
              <button className="btn btn-ghost btn-sm" title="Withdraw it; the client can no longer sign"><FiSlash aria-hidden="true" /> Void</button>
            </form>
          )}
          {contract.status !== 'signed' && (
            <form action={deleteContractAction.bind(null, id)}>
              <button className="btn btn-ghost btn-sm hover:!text-danger"><FiTrash2 aria-hidden="true" /> Delete</button>
            </form>
          )}
          <PrintButton />
        </div>
      </div>

      {contract.status === 'draft' ? (
        <div className="card p-5 sm:p-8">
          <p className="mb-4 text-small text-muted">Draft: {client.name} can&apos;t see this until you send it. Once sent, it can&apos;t be edited (void it and make a new version instead).</p>
          <ContractEditor action={updateContractAction.bind(null, id)} title={contract.title} body={contract.body} />
        </div>
      ) : (
        <>
          {contract.status === 'sent' && <p className="text-small text-muted print:hidden">Sent {new Date(contract.sentAt!).toLocaleDateString('en-US')} · waiting for {client.name} to sign.</p>}
          <ContractDocument contract={contract} client={client} />
        </>
      )}
    </div>
  )
}
