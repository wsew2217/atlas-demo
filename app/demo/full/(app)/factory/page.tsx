import Link from 'next/link'
import { listBatches, getOrderForBatch, listOrders, listBrands } from '@/lib/demo-db'
import { loadBatchesWithOverrides } from '@/lib/demo-batch-store'
import { AdvanceMilestoneButton } from '@/components/demo/AdvanceMilestoneButton'
import type { Batch, Order, Brand } from '@/lib/demo-data'

export const metadata = {
  title: 'Atlas Full Demo · Factories',
  robots: { index: false, follow: false },
}

interface FactoryStats {
  factory: string
  batches: Batch[]
  totalUnits: number
  inProgressMilestones: number
  doneMilestones: number
  totalMilestones: number
  capacityUnits: number
  utilizationPct: number
  onTimePct: number
  hasFactoryUserView: boolean
}

const factoryCapacity: Record<string, number> = {
  'Plant A · China': 4500,
  'Plant B · Cambodia': 6000,
}

const factoryOnTime: Record<string, number> = {
  'Plant A · China': 96,
  'Plant B · Cambodia': 92,
}

const factoryUserViews: Record<string, string | undefined> = {
  'Plant A · China': '/demo/factory',
}

export default async function FullDemoFactoryPage() {
  const [batchesRaw, allOrders, brands] = await Promise.all([
    listBatches(),
    listOrders(),
    listBrands(),
  ])
  const batches = await loadBatchesWithOverrides(batchesRaw)

  // Pre-fetch order + brand for each batch
  const orderByBatchId = new Map<string, Order>()
  const brandByBatchId = new Map<string, Brand>()
  const brandsBySlug = new Map(brands.map((b) => [b.slug, b]))
  await Promise.all(
    batches.map(async (b) => {
      const o = await getOrderForBatch(b.id)
      if (!o) return
      orderByBatchId.set(b.id, o)
      const br = brandsBySlug.get(o.brandSlug)
      if (br) brandByBatchId.set(b.id, br)
    }),
  )

  // Group by factory
  const groups = new Map<string, FactoryStats>()
  for (const b of batches) {
    const existing = groups.get(b.factory) ?? {
      factory: b.factory,
      batches: [],
      totalUnits: 0,
      inProgressMilestones: 0,
      doneMilestones: 0,
      totalMilestones: 0,
      capacityUnits: factoryCapacity[b.factory] ?? 5000,
      utilizationPct: 0,
      onTimePct: factoryOnTime[b.factory] ?? 90,
      hasFactoryUserView: Boolean(factoryUserViews[b.factory]),
    }
    existing.batches.push(b)
    existing.totalUnits += b.units
    existing.inProgressMilestones += b.milestones.filter((m) => m.state === 'in_progress').length
    existing.doneMilestones += b.milestones.filter((m) => m.state === 'done').length
    existing.totalMilestones += b.milestones.length
    groups.set(b.factory, existing)
  }
  for (const g of groups.values()) {
    g.utilizationPct = Math.round((g.totalUnits / g.capacityUnits) * 100)
  }
  const factoryGroups = [...groups.values()].sort((a, b) => a.factory.localeCompare(b.factory))

  // Cross-facility totals
  const totalBatches = batches.length
  const totalUnitsInFlight = batches.reduce((sum, b) => sum + b.units, 0)
  const totalCapacity = factoryGroups.reduce((sum, g) => sum + g.capacityUnits, 0)
  const orgUtilization = Math.round((totalUnitsInFlight / totalCapacity) * 100)
  const orgOnTime = Math.round(
    factoryGroups.reduce((sum, g) => sum + g.onTimePct * g.batches.length, 0) / Math.max(totalBatches, 1),
  )

  // Pending allocations
  const pendingAllocations = allOrders.filter(
    (o) => o.status === 'received' && o.batchIds.length === 0,
  )
  const pendingUnits = pendingAllocations.reduce((sum, o) => sum + o.totalUnits, 0)

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-10">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
            Full demo · multi-factory operations
          </p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight text-[var(--ink)]">
            Factories
          </h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            {factoryGroups.length} active facilities · {totalBatches} batches · {totalUnitsInFlight.toLocaleString()} units in flight
          </p>
        </div>
      </header>

      {/* Org-wide KPIs */}
      <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Active facilities"   value={factoryGroups.length} sub={`${totalBatches} batches across all`} />
        <Kpi label="Units in flight"     value={totalUnitsInFlight.toLocaleString()} sub={`of ${totalCapacity.toLocaleString()} capacity`} />
        <Kpi label="Org utilization"     value={`${orgUtilization}%`} sub="weighted across facilities" highlight={orgUtilization > 80} />
        <Kpi label="On-time rate"        value={`${orgOnTime}%`} sub="weighted by batch count" />
      </section>

      {/* Pending allocations */}
      {pendingAllocations.length > 0 && (
        <section className="mb-8 rounded-lg border border-[var(--accent)]/40 bg-[var(--accent)]/5 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
                Awaiting factory allocation
              </p>
              <p className="mt-1 text-sm text-[var(--ink)]">
                {pendingAllocations.length} {pendingAllocations.length === 1 ? 'PO' : 'POs'} ·{' '}
                {pendingUnits.toLocaleString()} units pending. Assign each one to a facility to
                start production.
              </p>
            </div>
            <span className="inline-flex cursor-not-allowed items-center rounded-md border border-dashed border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs text-[var(--muted)]">
              Assign factory (coming)
            </span>
          </div>
          <ul className="mt-4 space-y-1.5">
            {pendingAllocations.map((o) => {
              const brand = brandsBySlug.get(o.brandSlug)
              return (
                <li
                  key={o.id}
                  className="flex items-center justify-between rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-xs"
                >
                  <Link
                    href={`/demo/orders/${o.id}`}
                    className="font-mono text-[var(--ink)] underline-offset-2 hover:underline"
                  >
                    {o.code}
                  </Link>
                  <span className="text-[var(--muted)]">{brand?.name ?? o.brandSlug}</span>
                  <span className="text-[var(--muted)]">{o.lineItems[0]?.description ?? '—'}</span>
                  <span className="font-mono text-[var(--muted)]">{o.totalUnits.toLocaleString()} units</span>
                  <span className="font-mono text-[var(--muted)]">ship by {o.shipBy}</span>
                </li>
              )
            })}
          </ul>
        </section>
      )}

      {/* Per-factory sections */}
      <section className="space-y-6">
        {factoryGroups.map((g) => {
          const [name, location] = g.factory.split(' · ')
          const utilizationTone =
            g.utilizationPct > 90 ? 'bg-[var(--alert)]' :
            g.utilizationPct > 70 ? 'bg-[var(--accent)]' :
            'bg-[var(--good)]'
          return (
            <article
              key={g.factory}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6"
            >
              <header className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                    Facility · {location}
                  </p>
                  <h2 className="mt-1 font-display text-2xl font-semibold text-[var(--ink)]">
                    {name}
                  </h2>
                </div>
                {g.hasFactoryUserView && (
                  <Link
                    href={factoryUserViews[g.factory] ?? '#'}
                    className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent)] hover:text-[var(--ink)]"
                  >
                    Open factory user view →
                  </Link>
                )}
              </header>

              {/* Per-factory KPIs */}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <FacilityKpi label="Batches"          value={g.batches.length} />
                <FacilityKpi label="Units in flight"  value={g.totalUnits.toLocaleString()} sub={`of ${g.capacityUnits.toLocaleString()} cap`} />
                <FacilityKpi label="On-time rate"     value={`${g.onTimePct}%`} />
                <FacilityKpi label="Milestones · in progress" value={g.inProgressMilestones} />
              </div>

              {/* Utilization bar */}
              <div className="mt-5">
                <div className="flex items-baseline justify-between">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
                    Capacity utilization
                  </p>
                  <p className="font-mono text-xs text-[var(--ink)]">{g.utilizationPct}%</p>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[var(--border)]">
                  <div
                    className={`h-full rounded-full transition-all ${utilizationTone}`}
                    style={{ width: `${Math.min(g.utilizationPct, 100)}%` }}
                  />
                </div>
              </div>

              {/* Active batches table */}
              <div className="mt-6 overflow-hidden rounded-md border border-[var(--border)]">
                <table className="w-full text-sm">
                  <thead className="bg-[var(--cream)] text-left text-xs uppercase tracking-wider text-[var(--muted)]">
                    <tr>
                      <th className="px-4 py-3 font-medium">Batch</th>
                      <th className="px-4 py-3 font-medium">PO · Customer</th>
                      <th className="px-4 py-3 text-right font-medium">Units</th>
                      <th className="px-4 py-3 font-medium">Current milestone</th>
                      <th className="px-4 py-3 font-medium text-right">Action</th>
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
                            <span className="ml-2 text-[var(--muted)]">{brand?.name ?? '—'}</span>
                          </td>
                          <td className="px-4 py-3 text-right font-mono text-xs">
                            {b.units.toLocaleString()}
                          </td>
                          <td className="px-4 py-3">
                            {allDone ? (
                              <span className="text-xs text-[var(--good)]">All complete</span>
                            ) : inProgress ? (
                              <span className="text-sm text-[var(--ink)]">{inProgress.label}</span>
                            ) : (
                              <span className="text-xs text-[var(--muted)]">Not started</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-right">
                            {inProgress ? (
                              <AdvanceMilestoneButton
                                batchId={b.id}
                                milestoneId={inProgress.id}
                                label={inProgress.label}
                              />
                            ) : (
                              <span className="font-mono text-[11px] text-[var(--muted)]">—</span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </article>
          )
        })}
      </section>

      <p className="mt-8 text-xs text-[var(--muted)]">
        Capacity numbers are demo placeholders. In production, capacity is configured per
        facility and updated weekly based on shift schedules. The factory user view lets
        operators on the floor mark milestones from a mobile-friendly UI — try{' '}
        <Link href="/demo/factory" className="text-[var(--ink)] underline-offset-2 hover:underline">
          Plant A
        </Link>{' '}
        for a working example.
      </p>
    </div>
  )
}

function Kpi({ label, value, sub, highlight }: { label: string; value: string | number; sub?: string; highlight?: boolean }) {
  return (
    <div
      className={`rounded-lg border p-5 ${
        highlight
          ? 'border-[var(--accent)] bg-[var(--accent)]/5'
          : 'border-[var(--border)] bg-[var(--surface)]'
      }`}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold text-[var(--ink)]">{value}</p>
      {sub && <p className="mt-1 font-mono text-[11px] text-[var(--muted)]">{sub}</p>}
    </div>
  )
}

function FacilityKpi({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="rounded-md border border-[var(--border)] bg-[var(--cream)]/40 p-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">{label}</p>
      <p className="mt-1 font-display text-xl font-semibold text-[var(--ink)]">{value}</p>
      {sub && <p className="mt-0.5 font-mono text-[10px] text-[var(--muted)]">{sub}</p>}
    </div>
  )
}
