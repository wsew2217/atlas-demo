import Link from 'next/link'
import { orders, brands, batches, activity, getBrand } from '@/lib/demo-data'
import { OrderStatusPill } from '@/components/demo/StatusPill'

export default function DemoDashboard() {
  const openOrders = orders.filter((o) => o.status !== 'closed' && o.status !== 'shipped')
  const inProduction = orders.filter((o) => o.status === 'in_production')
  const unitsInProduction = inProduction.reduce((sum, o) => sum + o.totalUnits, 0)
  const milestonesThisWeek = batches.flatMap((b) => b.milestones)
    .filter((m) => m.state === 'in_progress' || (m.state === 'done' && m.date && m.date >= '2026-05-01'))
    .length

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-10">
      <header className="mb-8">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
          Today · {new Date('2026-05-05').toLocaleDateString(undefined, { dateStyle: 'medium' })}
        </p>
        <h1 className="mt-1 text-3xl font-semibold text-[var(--ink)]">Dashboard</h1>
      </header>

      <section className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Open POs"             value={openOrders.length} />
        <Kpi label="Batches in production" value={batches.filter((b) => b.milestones.some((m) => m.state === 'in_progress')).length} />
        <Kpi label="Units in production"   value={unitsInProduction.toLocaleString()} />
        <Kpi label="Milestones this week"  value={milestonesThisWeek} />
      </section>

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-[var(--ink)]">Open orders</h2>
          <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
            <table className="w-full text-sm">
              <thead className="bg-[var(--cream)] text-left text-xs uppercase tracking-wider text-[var(--muted)]">
                <tr>
                  <th className="px-4 py-3 font-medium">PO</th>
                  <th className="px-4 py-3 font-medium">Brand</th>
                  <th className="px-4 py-3 font-medium">Ship by</th>
                  <th className="px-4 py-3 font-medium text-right">Units</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {openOrders.map((o) => {
                  const brand = getBrand(o.brandSlug)
                  return (
                    <tr
                      key={o.id}
                      className="border-t border-[var(--border)] transition hover:bg-[var(--cream)]/40"
                    >
                      <td className="px-4 py-3 font-mono text-xs">
                        <Link href={`/demo/orders/${o.id}`} className="text-[var(--ink)] underline-offset-2 hover:underline">
                          {o.code}
                        </Link>
                      </td>
                      <td className="px-4 py-3">{brand?.name ?? o.brandSlug}</td>
                      <td className="px-4 py-3 font-mono text-xs text-[var(--muted)]">{o.shipBy}</td>
                      <td className="px-4 py-3 text-right font-mono text-xs">{o.totalUnits.toLocaleString()}</td>
                      <td className="px-4 py-3"><OrderStatusPill status={o.status} /></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <h2 className="mb-3 mt-10 text-lg font-semibold text-[var(--ink)]">Brands</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {brands.map((b) => {
              const brandOrders = orders.filter((o) => o.brandSlug === b.slug)
              const open = brandOrders.filter((o) => o.status !== 'closed' && o.status !== 'shipped').length
              return (
                <Link
                  key={b.slug}
                  href={`/demo/portal/${b.slug}`}
                  className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:border-[var(--accent)]/40"
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
                    Brand · view portal
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-[var(--ink)]">{b.name}</h3>
                  <p className="mt-2 text-xs text-[var(--muted)]">{b.contact} · {b.contactEmail}</p>
                  <p className="mt-3 font-mono text-xs text-[var(--muted)]">
                    {open} open · {brandOrders.length} total
                  </p>
                </Link>
              )
            })}
          </div>
        </section>

        <aside>
          <h2 className="mb-3 text-lg font-semibold text-[var(--ink)]">Recent activity</h2>
          <ul className="space-y-2">
            {activity.slice(0, 6).map((a) => (
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
        </aside>
      </div>
    </div>
  )
}

function Kpi({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold text-[var(--ink)]">{value}</p>
    </div>
  )
}
