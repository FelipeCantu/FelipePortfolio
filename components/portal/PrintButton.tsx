'use client'
import { FiPrinter } from 'react-icons/fi'

export default function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="btn btn-secondary btn-sm print:hidden">
      <FiPrinter aria-hidden="true" /> Print / Save PDF
    </button>
  )
}
