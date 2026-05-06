import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getImportedPo } from '@/lib/demo-pos-store'

export const metadata = {
  title: 'Atlas Full Demo · PO imported',
  robots: { index: false, follow: false },
}

const sourceLabel: Record<'pdf' | 'sample' | 'manual', string> = {
  pdf: 'Claude · PDF extraction',
  sample: 'Sample PO',
  manual: 'Manual entry',
}

export default async function ImportedPoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const po = await getImportedPo(slug)
  if (!po) notFound()

  const created = new Date(po.importedAt)

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-10">
      <Link
        href="/demo/full/orders"
        className="mb-6 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)] hover:text-[var(--ink)]"
      >
        ← All orders
      </Link>

      <div className="rounded-lg border border-[var(--good)]/40 bg-[var(--good)]/5 p-8">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--good)]">
          ✓ PO imported
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-[var(--ink)]">
          {po.poCode}
        </h1>
        <p className="mt-2 text-[var(--muted)]">
          From <span className="text-[var(--ink)]">{po.customerName}</span> · ship by{' '}
          <span className="font-mono">{po.shipBy}</span> · {po.totalUnits.toLocaleString()} units
        </p>
        <p className="mt-3 font-mono text-xs text-[var(--muted)]">
          Imported {created.toLocaleString()} · {sourceLabel[po.source]}
        </p>
      </div>

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold text-[var(--ink)]">Line items</h2>
        <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
          <table className="w-full text-sm">
            <thead className="bg-[var(--cream)] text-left text-xs uppercase tracking-wider text-[var(--muted)]">
              <tr>
                <th className="px-4 py-3 font-medium">SKU</th>
                <th className="px-4 py-3 font-medium">Description</th>
                <th className="px-4 py-3 font-medium">Color</th>
                <th className="px-4 py-3 font-medium">Size</th>
                <th className="px-4 py-3 font-medium text-right">Units</th>
              </tr>
            </thead>
            <tbody>
              {po.lineItems.map((li, i) => (
                <tr key={i} className="border-t border-[var(--border)]">
                  <td className="px-4 py-3 font-mono text-xs">{li.sku}</td>
                  <td className="px-4 py-3">{li.description}</td>
                  <td className="px-4 py-3 text-[var(--muted)]">{li.color}</td>
                  <td className="px-4 py-3 font-mono text-xs">{li.size}</td>
                  <td className="px-4 py-3 text-right font-mono text-xs">{li.units.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-[var(--cream)]">
              <tr className="border-t border-[var(--border)]">
                <td colSpan={4} className="px-4 py-3 text-right text-xs uppercase tracking-wider text-[var(--muted)]">
                  Total
                </td>
                <td className="px-4 py-3 text-right font-mono text-sm font-semibold text-[var(--ink)]">
                  {po.totalUnits.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      <section className="mt-8 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
          What happens next (in production)
        </p>
        <ol className="mt-4 space-y-3 text-sm">
          <Step n={1} text="The PO would be inserted into the orders table and tied to the customer." />
          <Step n={2} text="An auto-message would post to the customer's portal: 'PO received, allocation pending.'" />
          <Step n={3} text="Operations would assign a factory + create batches for the production line." />
          <Step n={4} text="Milestones would auto-schedule based on the customer's rules (default workflow + their custom rules)." />
        </ol>
        <p className="mt-4 text-xs text-[var(--muted)]">
          Demo note: the imported PO is stored in your browser cookie only. In production this
          would persist to Supabase, trigger Resend notifications, and appear immediately on the
          customer&rsquo;s portal.
        </p>
      </section>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link
          href="/demo/full/orders"
          className="rounded-md bg-[var(--ink)] px-4 py-2 text-sm font-medium text-[var(--cream)] transition hover:opacity-90"
        >
          ← Back to orders
        </Link>
        <Link
          href="/demo/full/orders/new"
          className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--cream)]"
        >
          Import another
        </Link>
      </div>
    </div>
  )
}

function Step({ n, text }: { n: number; text: string }) {
  return (
    <li className="flex gap-3">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--ink)] font-mono text-xs text-[var(--cream)]">
        {n}
      </span>
      <span className="text-[var(--ink)]">{text}</span>
    </li>
  )
}
