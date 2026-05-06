import Link from 'next/link'
import { listOrders, listBatches, listBrands, listActivity } from '@/lib/demo-db'
import { loadBatchesWithOverrides } from '@/lib/demo-batch-store'

export const metadata = {
  title: 'Atlas Full Demo · Dashboard',
  robots: { index: false, follow: false },
}

const upcoming = [
  { title: 'Customers', body: 'Per-customer SKU catalogs, custom rules, portal configuration, and onboarding workflows.', href: '/demo/full/customers', status: 'coming' as const },
  { title: 'Factory',   body: 'Multi-factory operator view with capacity planning, weekly status reports, and shift handoffs.',   href: '/demo/full/factory',   status: 'coming' as const },
]

export default async function FullDemoDashboardPage() {
  const [orders, brands, batchesRaw, activity] = await Promise.all([
    listOrders(),
    listBrands(),
    listBatches(),
    listActivity(8),
  ])
  const batches = await loadBatchesWithOverrides(batchesRaw)

  const open = orders.filter((o) => o.status !== 'closed' && o.status !== 'shipped')
  const inProduction = orders.filter((o) => o.status === 'in_production')
  const unitsInProduction = inProduction.reduce((sum, o) => sum + o.totalUnits, 0)
  const milestonesInProgress = batches.flatMap((b) => b.milestones).filter((m) => m.state === 'in_progress').length
  const awaitingAllocation = orders.filter((o) => o.status === 'received' && o.batchIds.length === 0).length

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-10">
      <header className="mb-8">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
          Full demo · operations overview
        </p>
        <h1 className="mt-2 text-3xl font-semibold leading-tight text-[var(--ink)]">
          Today across <span className="italic text-[var(--accent)]">your operation.</span>
        </h1>
      </header>

      <section className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Open POs"               value={open.length} sub={`${orders.length} total`} />
        <Kpi label="Batches in production"  value={batches.filter((b) => b.milestones.some((m) => m.state === 'in_progress')).length} sub={`${batches.length} active`} />
        <Kpi label="Units in production"    value={unitsInProduction.toLocaleString()} sub="across all factories" />
        <Kpi label="Awaiting allocation"    value={awaitingAllocation} sub={awaitingAllocation === 0 ? 'all clear' : 'needs factory assignment'} highlight={awaitingAllocation > 0} />
      </section>

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <section>
          <h2 className="mb-4 text-lg font-semibold text-[var(--ink)]">Surfaces</h2>
          <div className="space-y-3">
            <Link
              href="/demo/full/orders"
              className="lift flex items-center justify-between rounded-lg border border-[var(--accent)]/40 bg-[var(--surface)] p-5"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-[var(--accent)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--cream)]">
                    Live
                  </span>
                  <h3 className="font-display text-xl font-semibold text-[var(--ink)]">Orders</h3>
                </div>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Full PO list with filter, search, sort, and drill-down. {orders.length} POs in the
                  system across {brands.length} customers.
                </p>
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
                Open →
              </span>
            </Link>

            <Link
              href="/demo/full/batches"
              className="lift flex items-center justify-between rounded-lg border border-[var(--accent)]/40 bg-[var(--surface)] p-5"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-[var(--accent)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--cream)]">
                    Live
                  </span>
                  <h3 className="font-display text-xl font-semibold text-[var(--ink)]">Batches</h3>
                </div>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Cross-factory batch view with filters by factory, customer, and status. Advance
                  milestones from this view; updates propagate to orders and portals.
                </p>
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
                Open →
              </span>
            </Link>

            {upcoming.map((u) => (
              <article
                key={u.href}
                className="flex items-center justify-between rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface)]/60 p-5"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-[var(--border)] bg-[var(--cream)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                      Coming
                    </span>
                    <h3 className="font-display text-xl font-semibold text-[var(--ink)]">{u.title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-[var(--muted)]">{u.body}</p>
                </div>
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  Soon
                </span>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-md border border-[var(--border)] bg-[var(--cream)] p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
              Light demo
            </p>
            <p className="mt-2 text-sm text-[var(--ink)]">
              The public version on{' '}
              <Link href="/demo" className="underline-offset-2 hover:underline">
                /demo
              </Link>{' '}
              shows the two-sided narrative — manufacturer admin, customer portal, factory user,
              conversation thread, milestone advance with auto-update propagation. No sign-in
              required.
            </p>
          </div>
        </section>

        <aside>
          <h2 className="mb-4 text-lg font-semibold text-[var(--ink)]">Recent activity</h2>
          <ul className="space-y-2">
            {activity.map((a) => (
              <li
                key={a.id}
                className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-xs"
              >
                <p className="text-[var(--ink)]">{a.text}</p>
                <p className="mt-1 font-mono text-[11px] text-[var(--muted)]">
                  {a.isSystem ? 'system' : a.actor} · {new Date(a.at).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-md border border-[var(--border)] bg-[var(--surface)] p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
              Open milestones in progress
            </p>
            <p className="mt-2 font-display text-2xl font-semibold text-[var(--ink)]">
              {milestonesInProgress}
            </p>
            <p className="mt-1 text-xs text-[var(--muted)]">
              Across {batches.length} batches at {[...new Set(batches.map((b) => b.factory.split(' · ')[0]))].length} factories
            </p>
          </div>
        </aside>
      </div>
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
