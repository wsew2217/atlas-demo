import Link from 'next/link'
import { listOrders, listBrands, listBatches } from '@/lib/demo-db'
import { loadBatchesWithOverrides } from '@/lib/demo-batch-store'
import { OrderStatusPill } from '@/components/demo/StatusPill'
import type { Order, Batch } from '@/lib/demo-data'

export const metadata = {
  title: 'Atlas Demo · Orders',
}

export default async function OrdersListPage() {
  const [allOrders, brands, batchesRaw] = await Promise.all([
    listOrders(),
    listBrands(),
    listBatches(),
  ])
  const batches = await loadBatchesWithOverrides(batchesRaw)
  const batchesById = new Map(batches.map((b) => [b.id, b]))
  const brandsBySlug = new Map(brands.map((b) => [b.slug, b]))

  const progress = (o: Order) => {
    const ob = o.batchIds.map((id) => batchesById.get(id)).filter((b): b is Batch => Boolean(b))
    const total = ob.reduce((n, b) => n + b.milestones.length, 0)
    const done = ob.reduce((n, b) => n + b.milestones.filter((m) => m.state === 'done').length, 0)
    return total === 0 ? 0 : Math.round((done / total) * 100)
  }

  const sorted = [...allOrders].sort((a, b) => a.shipBy.localeCompare(b.shipBy))
  const openCount = sorted.filter((o) => o.status !== 'closed' && o.status !== 'shipped').length
  const totalUnits = sorted.reduce((sum, o) => sum + o.totalUnits, 0)

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-10">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
            Manufacturer admin
          </p>
          <h1 className="mt-1 text-3xl font-semibold text-[var(--ink)]">Orders</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            {sorted.length} POs · {openCount} open · {totalUnits.toLocaleString()} units across all customers
          </p>
        </div>
        <Link
          href="/demo/full/orders"
          className="inline-flex items-center rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--cream)]"
        >
          Open the full demo with filters & search →
        </Link>
      </header>

      <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
        <table className="w-full text-sm">
          <thead className="bg-[var(--cream)] text-left text-xs uppercase tracking-wider text-[var(--muted)]">
            <tr>
              <th className="px-4 py-3 font-medium">PO</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Items</th>
              <th className="px-4 py-3 font-medium">Ship by</th>
              <th className="px-4 py-3 text-right font-medium">Units</th>
              <th className="px-4 py-3 font-medium">Progress</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((o) => {
              const brand = brandsBySlug.get(o.brandSlug)
              const desc = o.lineItems[0]?.description ?? '—'
              const factories = [...new Set(
                o.batchIds
                  .map((id) => batchesById.get(id)?.factory.split(' · ')[0])
                  .filter(Boolean),
              )]
              const pct = progress(o)
              return (
                <tr
                  key={o.id}
                  className="border-t border-[var(--border)] transition hover:bg-[var(--cream)]/50"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/demo/orders/${o.id}`}
                      className="font-mono text-xs text-[var(--ink)] underline-offset-2 hover:underline"
                    >
                      {o.code}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-[var(--ink)]">{brand?.name ?? o.brandSlug}</td>
                  <td className="px-4 py-3">
                    <p className="text-[var(--ink)]">{desc}</p>
                    <p className="font-mono text-xs text-[var(--muted)]">
                      {o.lineItems.length} line items
                      {factories.length > 0 ? ` · ${factories.join(', ')}` : ''}
                    </p>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-[var(--muted)]">{o.shipBy}</td>
                  <td className="px-4 py-3 text-right font-mono text-xs">
                    {o.totalUnits.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-[var(--border)]">
                        <div
                          className="h-full rounded-full bg-[var(--accent)]"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="font-mono text-xs text-[var(--muted)]">{pct}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <OrderStatusPill status={o.status} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-xs text-[var(--muted)]">
        Click any PO code to open the order detail with milestone timeline, conversation thread,
        and reply form. For filters, search, and sortable columns, open the{' '}
        <Link href="/demo/full/orders" className="text-[var(--ink)] underline-offset-2 hover:underline">
          full demo
        </Link>
        .
      </p>
    </div>
  )
}
