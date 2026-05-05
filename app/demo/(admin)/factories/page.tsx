import Link from 'next/link'
import { listBatches, getOrderForBatch, getBrand } from '@/lib/demo-db'
import { loadBatchesWithOverrides } from '@/lib/demo-batch-store'
import type { Batch, Order, Brand } from '@/lib/demo-data'
import { milestoneStateLabel } from '@/lib/demo-data'

export const metadata = {
  title: 'Atlas Demo · Factories',
}

interface FactoryGroup {
  factory: string
  batches: Batch[]
  totalUnits: number
  inProgressMilestones: number
}

export default async function FactoriesPage() {
  const batchesRaw = await listBatches()
  const batches = await loadBatchesWithOverrides(batchesRaw)

  // Group by factory
  const groups = new Map<string, FactoryGroup>()
  for (const b of batches) {
    const existing = groups.get(b.factory) ?? {
      factory: b.factory,
      batches: [],
      totalUnits: 0,
      inProgressMilestones: 0,
    }
    existing.batches.push(b)
    existing.totalUnits += b.units
    existing.inProgressMilestones += b.milestones.filter((m) => m.state === 'in_progress').length
    groups.set(b.factory, existing)
  }
  const factoryGroups = [...groups.values()].sort((a, b) => a.factory.localeCompare(b.factory))

  // Pre-fetch order + brand per batch for the table
  const orderByBatchId = new Map<string, Order>()
  const brandByBatchId = new Map<string, Brand>()
  await Promise.all(
    batches.map(async (b) => {
      const o = await getOrderForBatch(b.id)
      if (!o) return
      orderByBatchId.set(b.id, o)
      const br = await getBrand(o.brandSlug)
      if (br) brandByBatchId.set(b.id, br)
    }),
  )

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-10">
      <header className="mb-8">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
          Manufacturer admin
        </p>
        <h1 className="mt-1 text-3xl font-semibold text-[var(--ink)]">Factories</h1>
        <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">
          {factoryGroups.length} active facilities · {batches.length} batches in flight ·{' '}
          {batches.reduce((sum, b) => sum + b.units, 0).toLocaleString()} units total
        </p>
      </header>

      <div className="space-y-6">
        {factoryGroups.map((g) => (
          <section
            key={g.factory}
            className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6"
          >
            <header className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                  Facility
                </p>
                <h2 className="mt-1 font-display text-2xl font-semibold text-[var(--ink)]">
                  {g.factory}
                </h2>
              </div>
              <div className="grid grid-cols-3 gap-4 text-right">
                <Stat label="Batches"          value={g.batches.length} />
                <Stat label="Units"            value={g.totalUnits.toLocaleString()} />
                <Stat label="In progress"      value={g.inProgressMilestones} />
              </div>
            </header>

            <div className="overflow-hidden rounded-md border border-[var(--border)]">
              <table className="w-full text-sm">
                <thead className="bg-[var(--cream)] text-left text-xs uppercase tracking-wider text-[var(--muted)]">
                  <tr>
                    <th className="px-4 py-3 font-medium">Batch</th>
                    <th className="px-4 py-3 font-medium">PO</th>
                    <th className="px-4 py-3 font-medium">Customer</th>
                    <th className="px-4 py-3 text-right font-medium">Units</th>
                    <th className="px-4 py-3 font-medium">Current milestone</th>
                  </tr>
                </thead>
                <tbody>
                  {g.batches.map((b) => {
                    const order = orderByBatchId.get(b.id)
                    const brand = brandByBatchId.get(b.id)
                    const inProgress = b.milestones.find((m) => m.state === 'in_progress')
                    const allDone = b.milestones.every((m) => m.state === 'done')
                    return (
                      <tr key={b.id} className="border-t border-[var(--border)] transition hover:bg-[var(--cream)]/50">
                        <td className="px-4 py-3 font-mono text-xs text-[var(--ink)]">{b.code}</td>
                        <td className="px-4 py-3">
                          {order ? (
                            <Link
                              href={`/demo/orders/${order.id}`}
                              className="font-mono text-xs text-[var(--ink)] underline-offset-2 hover:underline"
                            >
                              {order.code}
                            </Link>
                          ) : (
                            <span className="font-mono text-xs text-[var(--muted)]">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-[var(--muted)]">{brand?.name ?? '—'}</td>
                        <td className="px-4 py-3 text-right font-mono text-xs">
                          {b.units.toLocaleString()}
                        </td>
                        <td className="px-4 py-3">
                          {allDone ? (
                            <span className="rounded-full bg-[var(--good)]/15 px-2.5 py-0.5 text-xs text-[var(--good)]">
                              All complete
                            </span>
                          ) : inProgress ? (
                            <span className="text-sm text-[var(--ink)]">
                              {inProgress.label}
                              <span className="ml-2 font-mono text-xs text-[var(--muted)]">
                                · {milestoneStateLabel[inProgress.state]}
                              </span>
                            </span>
                          ) : (
                            <span className="text-xs text-[var(--muted)]">No active milestone</span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>

      <p className="mt-8 text-xs text-[var(--muted)]">
        Factory users mark milestones complete from the{' '}
        <Link href="/demo/factory" className="text-[var(--ink)] underline-offset-2 hover:underline">
          Plant A factory view
        </Link>{' '}
        — try the &ldquo;Mark complete&rdquo; button there to see updates propagate here, into the
        order detail, and into the customer portal.
      </p>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">{label}</p>
      <p className="mt-0.5 font-display text-xl font-semibold text-[var(--ink)]">{value}</p>
    </div>
  )
}
