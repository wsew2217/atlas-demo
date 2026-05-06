import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  getBrand,
  getOrdersForBrand,
  getActivityForBrand,
  getBatchesForOrder,
} from '@/lib/demo-db'
import { loadBatchesWithOverrides } from '@/lib/demo-batch-store'
import { OrderStatusPill } from '@/components/demo/StatusPill'
import type { Batch } from '@/lib/demo-data'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const brand = await getBrand(slug)
  if (!brand) return { title: 'Customer not found' }
  return {
    title: `Atlas Full Demo · ${brand.name}`,
    robots: { index: false, follow: false },
  }
}

function deriveDomain(email: string): string {
  const at = email.indexOf('@')
  return at >= 0 ? email.slice(at + 1) : email
}

const customRulesByBrand: Record<string, { rule: string; detail: string }[]> = {
  summit: [
    { rule: 'Production midpoint requires customer QC approval', detail: 'Inline QC photos shared, customer must approve before next milestone advances.' },
    { rule: 'Auto-notify on every milestone change',              detail: 'Email + portal notification to Mira Chen for all status updates.' },
    { rule: 'All POs must include GTIN at line-item level',       detail: 'Validated on intake; rejected if missing.' },
    { rule: 'Charcoal/navy color spec — hold lot family',         detail: 'Must source from same mill across reorders for color consistency.' },
  ],
  meridian: [
    { rule: 'No fabric substitutions without written approval', detail: 'Lot-family lock on charcoal; requires email confirm before any swap.' },
    { rule: 'QC pass requires photo evidence per batch',        detail: 'Minimum 3 photos uploaded to batch record.' },
    { rule: 'Ship 3 business days before customer ship-by',     detail: 'Built-in cushion; flag if not on track 7 days out.' },
  ],
}

const skuCounts: Record<string, number> = {
  summit: 47,
  meridian: 23,
}

export default async function CustomerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const brand = await getBrand(slug)
  if (!brand) notFound()

  const [brandOrders, brandActivity] = await Promise.all([
    getOrdersForBrand(slug),
    getActivityForBrand(slug),
  ])

  const open = brandOrders.filter((o) => o.status !== 'closed' && o.status !== 'shipped')
  const inProduction = brandOrders.filter((o) => o.status === 'in_production')
  const shipped = brandOrders.filter((o) => o.status === 'shipped')
  const totalUnits = brandOrders.reduce((sum, o) => sum + o.totalUnits, 0)
  const inProductionUnits = inProduction.reduce((sum, o) => sum + o.totalUnits, 0)

  // Pre-fetch batches for progress bars
  const batchesByOrderId = new Map<string, Batch[]>()
  await Promise.all(
    open.map(async (o) => {
      const raw = await getBatchesForOrder(o)
      const withOverrides = await loadBatchesWithOverrides(raw)
      batchesByOrderId.set(o.id, withOverrides)
    }),
  )

  const rules = customRulesByBrand[slug] ?? []
  const skus = skuCounts[slug] ?? 0
  const domain = deriveDomain(brand.contactEmail)

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-10">
      <Link
        href="/demo/full/customers"
        className="mb-6 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)] hover:text-[var(--ink)]"
      >
        ← All customers
      </Link>

      <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <span
            className="mt-1 h-12 w-12 shrink-0 rounded-md ring-2 ring-[var(--surface)]"
            style={{ backgroundColor: brand.primary, boxShadow: `0 0 0 1px ${brand.primary}55` }}
            aria-hidden
          />
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
              Customer · Operator-tier
            </p>
            <h1 className="mt-1 font-display text-4xl font-semibold text-[var(--ink)]">
              {brand.name}
            </h1>
            <p className="mt-2 font-mono text-xs text-[var(--muted)]">
              {domain} · primary contact: {brand.contact} ·{' '}
              <a
                href={`mailto:${brand.contactEmail}`}
                className="text-[var(--ink)] underline-offset-2 hover:underline"
              >
                {brand.contactEmail}
              </a>
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="rounded-full bg-[var(--good)]/15 px-2.5 py-0.5 text-xs font-medium text-[var(--good)]">
            Active customer
          </span>
          <Link
            href={`/demo/portal/${brand.slug}`}
            className="inline-flex items-center rounded-md bg-[var(--ink)] px-4 py-2 text-sm font-medium text-[var(--cream)] transition hover:opacity-90"
          >
            View their portal →
          </Link>
        </div>
      </header>

      {/* KPIs */}
      <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Total POs" value={brandOrders.length} />
        <Kpi label="Open" value={open.length} sub={`${inProduction.length} in production`} />
        <Kpi label="Units in production" value={inProductionUnits.toLocaleString()} />
        <Kpi label="Shipped to date" value={shipped.length} sub={`${totalUnits.toLocaleString()} units lifetime`} />
      </section>

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <section className="space-y-8">
          {/* Their orders */}
          <div>
            <div className="mb-3 flex items-end justify-between gap-3">
              <h2 className="text-lg font-semibold text-[var(--ink)]">Their orders</h2>
              <Link
                href={`/demo/full/orders?customer=${brand.slug}`}
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent)] hover:text-[var(--ink)]"
              >
                Open in orders view →
              </Link>
            </div>
            <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
              <table className="w-full text-sm">
                <thead className="bg-[var(--cream)] text-left text-xs uppercase tracking-wider text-[var(--muted)]">
                  <tr>
                    <th className="px-4 py-3 font-medium">PO</th>
                    <th className="px-4 py-3 font-medium">Items</th>
                    <th className="px-4 py-3 font-medium">Ship by</th>
                    <th className="px-4 py-3 text-right font-medium">Units</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {brandOrders.map((o) => (
                    <tr
                      key={o.id}
                      className="border-t border-[var(--border)] transition hover:bg-[var(--cream)]/50"
                    >
                      <td className="px-4 py-3">
                        <Link
                          href={`/demo/full/orders/${o.id}`}
                          className="font-mono text-xs text-[var(--ink)] underline-offset-2 hover:underline"
                        >
                          {o.code}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-[var(--ink)]">
                        {o.lineItems[0]?.description ?? '—'}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-[var(--muted)]">{o.shipBy}</td>
                      <td className="px-4 py-3 text-right font-mono text-xs">
                        {o.totalUnits.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <OrderStatusPill status={o.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Custom rules */}
          <div>
            <div className="mb-3 flex items-end justify-between gap-3">
              <h2 className="text-lg font-semibold text-[var(--ink)]">Custom rules</h2>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
                {rules.length} rules
              </span>
            </div>
            <div className="space-y-2">
              {rules.length === 0 ? (
                <p className="rounded-md border border-dashed border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--muted)]">
                  No custom rules configured. All POs follow the default workflow.
                </p>
              ) : (
                rules.map((r) => (
                  <article
                    key={r.rule}
                    className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
                  >
                    <p className="text-sm font-medium text-[var(--ink)]">{r.rule}</p>
                    <p className="mt-1 text-xs text-[var(--muted)]">{r.detail}</p>
                  </article>
                ))
              )}
            </div>
            <p className="mt-3 text-xs text-[var(--muted)]">
              Rule editor coming in a future round. For now, rules are managed in the platform
              admin database.
            </p>
          </div>

          {/* SKU catalog stub */}
          <div>
            <h2 className="mb-3 text-lg font-semibold text-[var(--ink)]">SKU catalog</h2>
            <article className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-display text-2xl font-semibold text-[var(--ink)]">
                    {skus} SKUs
                  </p>
                  <p className="mt-1 text-xs text-[var(--muted)]">
                    Last updated 2026-04-30 · imported via CSV
                  </p>
                </div>
                <span className="inline-flex cursor-not-allowed items-center rounded-md border border-dashed border-[var(--border)] bg-[var(--cream)] px-3 py-1.5 text-xs text-[var(--muted)]">
                  Open catalog (coming)
                </span>
              </div>
            </article>
          </div>
        </section>

        <aside className="space-y-4">
          {/* Portal config */}
          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
              Portal configuration
            </p>
            <dl className="mt-4 space-y-3 text-sm">
              <Row label="Domain" value={`portal.${domain}`} mono />
              <Row label="Status" value={<span className="rounded-full bg-[var(--good)]/15 px-2 py-0.5 text-xs text-[var(--good)]">Live · SSL valid</span>} />
              <Row
                label="Brand color"
                value={
                  <span className="flex items-center gap-2">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: brand.primary }}
                      aria-hidden
                    />
                    <span className="font-mono text-xs">{brand.primary}</span>
                  </span>
                }
              />
              <Row label="Onboarded" value="2026-02-14" mono />
              <Row label="Last login" value="2 hours ago" mono />
            </dl>
            <Link
              href={`/demo/portal/${brand.slug}`}
              className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-[var(--ink)] px-4 py-2 text-sm font-medium text-[var(--cream)] transition hover:opacity-90"
            >
              Open their portal →
            </Link>
          </div>

          {/* Recent activity */}
          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
              Recent activity
            </p>
            {brandActivity.length === 0 ? (
              <p className="mt-3 text-xs text-[var(--muted)]">No activity yet.</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {brandActivity.slice(0, 6).map((a) => (
                  <li key={a.id} className="rounded-md border border-[var(--border)] bg-[var(--cream)] px-3 py-2 text-xs">
                    <p className="text-[var(--ink)]">{a.text}</p>
                    <p className="mt-1 font-mono text-[11px] text-[var(--muted)]">
                      {a.isSystem ? 'system' : a.actor} · {new Date(a.at).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}

function Kpi({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold text-[var(--ink)]">{value}</p>
      {sub && <p className="mt-1 font-mono text-[11px] text-[var(--muted)]">{sub}</p>}
    </div>
  )
}

function Row({
  label,
  value,
  mono,
}: {
  label: string
  value: React.ReactNode
  mono?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-[var(--muted)]">{label}</dt>
      <dd className={mono ? 'font-mono text-[var(--ink)]' : 'text-[var(--ink)]'}>{value}</dd>
    </div>
  )
}
