import { notFound } from 'next/navigation'
import {
  getBrand,
  getOrdersForBrand,
  getActivityForBrand,
  getBatchesForOrder,
} from '@/lib/demo-data'
import { OrderStatusPill, MilestoneStatePill } from '@/components/demo/StatusPill'

export default async function PortalHome({ params }: { params: Promise<{ brand: string }> }) {
  const { brand: slug } = await params
  const brand = getBrand(slug)
  if (!brand) notFound()

  const brandOrders = getOrdersForBrand(slug)
  const brandActivity = getActivityForBrand(slug)
  const openOrders = brandOrders.filter((o) => o.status !== 'closed' && o.status !== 'shipped')
  const closedOrders = brandOrders.filter((o) => o.status === 'shipped' || o.status === 'closed')

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      <header className="mb-10">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
          Welcome back · {brand.contact}
        </p>
        <h1 className="mt-1 font-display text-4xl font-semibold text-[var(--ink)]">
          Your orders
        </h1>
        <p className="mt-2 max-w-2xl text-[var(--muted)]">
          Live status across {brandOrders.length} {brandOrders.length === 1 ? 'order' : 'orders'}.
          Updates post automatically as your production moves through each stage.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <section className="space-y-6">
          {openOrders.length === 0 && (
            <p className="rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
              No active orders right now.
            </p>
          )}

          {openOrders.map((o) => {
            const orderBatches = getBatchesForOrder(o)
            const totalSteps = orderBatches.reduce((n, b) => n + b.milestones.length, 0)
            const doneSteps = orderBatches.reduce(
              (n, b) => n + b.milestones.filter((m) => m.state === 'done').length,
              0,
            )
            const progress = totalSteps === 0 ? 0 : Math.round((doneSteps / totalSteps) * 100)

            return (
              <article
                key={o.id}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                      {o.code}
                    </p>
                    <h2 className="mt-1 font-display text-xl font-semibold text-[var(--ink)]">
                      {o.lineItems[0]?.description ?? 'Order'}
                    </h2>
                  </div>
                  <OrderStatusPill status={o.status} />
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <Stat label="Units"     value={o.totalUnits.toLocaleString()} />
                  <Stat label="Ship by"   value={o.shipBy} mono />
                  <Stat label="Progress"  value={`${progress}%`} mono />
                </div>

                <div className="mt-5">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--border)]">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${progress}%`, backgroundColor: brand.primary }}
                    />
                  </div>
                </div>

                {orderBatches.length > 0 && (
                  <div className="mt-5 space-y-2">
                    {orderBatches.flatMap((b) =>
                      b.milestones
                        .filter((m) => m.state === 'in_progress' || m.state === 'done')
                        .slice(-2)
                        .map((m) => (
                          <div
                            key={`${b.id}-${m.id}`}
                            className="flex items-center justify-between rounded-md border border-[var(--border)] px-3 py-2 text-xs"
                          >
                            <span className="text-[var(--ink)]">{m.label}</span>
                            <span className="flex items-center gap-2 text-[var(--muted)]">
                              {m.date && <span className="font-mono">{m.date}</span>}
                              <MilestoneStatePill state={m.state} />
                            </span>
                          </div>
                        )),
                    )}
                  </div>
                )}
              </article>
            )
          })}

          {closedOrders.length > 0 && (
            <section className="mt-10">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--muted)]">
                Recently shipped
              </h2>
              <ul className="space-y-2">
                {closedOrders.map((o) => (
                  <li
                    key={o.id}
                    className="flex items-center justify-between rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm"
                  >
                    <span className="font-mono text-xs text-[var(--ink)]">{o.code}</span>
                    <span className="text-[var(--muted)]">
                      {o.lineItems[0]?.description} · {o.totalUnits.toLocaleString()} units
                    </span>
                    <OrderStatusPill status={o.status} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </section>

        <aside>
          <h2 className="mb-3 text-lg font-semibold text-[var(--ink)]">Updates</h2>
          {brandActivity.length === 0 ? (
            <p className="rounded-md border border-dashed border-[var(--border)] bg-[var(--surface)] p-4 text-xs text-[var(--muted)]">
              No updates yet.
            </p>
          ) : (
            <ul className="space-y-2">
              {brandActivity.map((a) => (
                <li
                  key={a.id}
                  className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-xs"
                >
                  <p className="text-[var(--ink)]">{a.text}</p>
                  <p className="mt-1 font-mono text-[11px] text-[var(--muted)]">
                    {new Date(a.at).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </div>
  )
}

function Stat({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">{label}</p>
      <p className={`mt-1 text-base text-[var(--ink)] ${mono ? 'font-mono' : 'font-semibold'}`}>{value}</p>
    </div>
  )
}
