import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FiArrowLeft, FiCheckCircle } from 'react-icons/fi'
import { requireClient } from '@/lib/portal/session'
import { getContract } from '@/lib/portal/db'
import ContractDocument from '@/components/portal/ContractDocument'
import SignForm from '@/components/portal/SignForm'
import PrintButton from '@/components/portal/PrintButton'
import { signContractAction } from '@/app/portal/actions'

export const metadata = { title: 'Agreement' }

export default async function ClientContractPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const client = await requireClient()
  const contract = await getContract(id)
  if (!contract || contract.clientId !== client.id || contract.status === 'draft') notFound()

  return (
    <div className="mx-auto grid max-w-3xl gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link href={`/portal/projects/${contract.projectId}`} className="btn btn-ghost btn-sm !pl-2">
          <FiArrowLeft aria-hidden="true" /> Back to project
        </Link>
        <PrintButton />
      </div>
      {contract.status === 'signed' && (
        <div className="flex items-center gap-3 rounded-card border border-success/30 bg-success/10 p-4 text-success print:hidden" role="status">
          <FiCheckCircle size={20} aria-hidden="true" />
          <p className="text-small font-medium">Signed. A copy has been emailed to you, and it stays here in your portal.</p>
        </div>
      )}
      <ContractDocument contract={contract} client={client} />
      {contract.status === 'sent' && <SignForm action={signContractAction.bind(null, contract.id)} defaultName={client.name} />}
    </div>
  )
}
