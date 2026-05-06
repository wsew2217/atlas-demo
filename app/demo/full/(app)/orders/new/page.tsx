import Link from 'next/link'
import { PoImportWizard } from '@/components/demo/PoImportWizard'

export const metadata = {
  title: 'Atlas Full Demo · Import PO',
  robots: { index: false, follow: false },
}

export default function NewPoPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-10">
      <Link
        href="/demo/full/orders"
        className="mb-6 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)] hover:text-[var(--ink)]"
      >
        ← All orders
      </Link>

      <header className="mb-8">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
          Full demo · PO intake
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-[var(--ink)]">
          Import a purchase order
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">
          Drop in a PDF (Claude extracts line items + dates), use a sample PO to see the flow,
          or enter manually. Two steps: extract, then review.
        </p>
      </header>

      <PoImportWizard />
    </div>
  )
}
