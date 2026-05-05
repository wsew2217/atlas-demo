import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  getBrand,
  getOrder,
  getBatchesForOrder,
  getMessagesForOrder,
} from '@/lib/demo-data'
import { loadMessagesForOrder } from '@/lib/demo-messages-store'
import { OrderStatusPill } from '@/components/demo/StatusPill'
import { MilestoneTimeline } from '@/components/demo/MilestoneTimeline'
import { MessageThread } from '@/components/demo/MessageThread'
import { ReplyForm } from '@/components/demo/ReplyForm'

export default async function PortalOrderDetail({
  params,
}: {
  params: Promise<{ brand: string; id: string }>
}) {
  const { brand: slug, id } = await params
  const brand = getBrand(slug)
  if (!brand) notFound()

  const order = getOrder(id)
  if (!order || order.brandSlug !== brand.slug) notFound()

  const orderBatches = getBatchesForOrder(order)
  const orderMessages = await loadMessagesForOrder(order.id, getMessagesForOrder(order.id))

  const totalSteps = orderBatches.reduce((n, b) => n + b.milestones.length, 0)
  const doneSteps = orderBatches.reduce(
    (n, b) => n + b.milestones.filter((m) => m.state === 'done').length,
    0,
  )
  const progress = totalSteps === 0 ? 0 : Math.round((doneSteps / totalSteps) * 100)

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      <Link
        href={`/demo/portal/${brand.slug}`}
        className="mb-6 inline-flex items-center gap-1 font-mono text-xs text-[var(--muted)] hover:text-[var(--ink)]"
      >
        ← Your orders
      </Link>

      <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
            {order.code} · created {order.createdAt}
          </p>
          <h1 className="mt-1 font-display text-4xl font-semibold text-[var(--ink)]">
            {order.lineItems[0]?.description ?? 'Order'}
          </h1>
        </div>
        <div className="flex flex-col items-end gap-2">
          <OrderStatusPill status={order.status} />
          <p className="font-mono text-xs text-[var(--muted)]">
            Ship by <span className="text-[var(--ink)]">{order.shipBy}</span> ·{' '}
            {order.totalUnits.toLocaleString()} units
          </p>
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <section>
          {/* Progress */}
          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
            <div className="flex items-baseline justify-between">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                Overall progress
              </p>
              <p className="font-display text-2xl font-semibold text-[var(--ink)]">
                {progress}%
              </p>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[var(--border)]">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${progress}%`, backgroundColor: brand.primary }}
              />
            </div>
          </div>

          {/* Line items */}
          <h2 className="mb-3 mt-10 text-lg font-semibold text-[var(--ink)]">Items</h2>
          <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
            <table className="w-full text-sm">
              <thead className="bg-[var(--cream)] text-left text-xs uppercase tracking-wider text-[var(--muted)]">
                <tr>
                  <th className="px-4 py-3 font-medium">Item</th>
                  <th className="px-4 py-3 font-medium">Color</th>
                  <th className="px-4 py-3 font-medium">Size</th>
                  <th className="px-4 py-3 font-medium text-right">Units</th>
                </tr>
              </thead>
              <tbody>
                {order.lineItems.map((li) => (
                  <tr key={li.id} className="border-t border-[var(--border)]">
                    <td className="px-4 py-3">
                      <span className="text-[var(--ink)]">{li.description}</span>
                      <span className="ml-2 font-mono text-xs text-[var(--muted)]">{li.sku}</span>
                    </td>
                    <td className="px-4 py-3 text-[var(--muted)]">{li.color}</td>
                    <td className="px-4 py-3 font-mono text-xs">{li.size}</td>
                    <td className="px-4 py-3 text-right font-mono text-xs">
                      {li.units.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-[var(--cream)]">
                <tr className="border-t border-[var(--border)]">
                  <td colSpan={3} className="px-4 py-3 text-right text-xs uppercase tracking-wider text-[var(--muted)]">
                    Total
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-sm font-semibold text-[var(--ink)]">
                    {order.totalUnits.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Production timeline */}
          <h2 className="mb-3 mt-10 text-lg font-semibold text-[var(--ink)]">Production</h2>
          {orderBatches.length === 0 ? (
            <p className="rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
              Awaiting factory allocation. We&rsquo;ll post here when production starts.
            </p>
          ) : (
            <div className="space-y-6">
              {orderBatches.map((b) => (
                <article
                  key={b.id}
                  className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6"
                >
                  <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-mono text-xs text-[var(--muted)]">
                      {b.factory} · {b.units.toLocaleString()} units
                    </p>
                  </div>
                  <MilestoneTimeline milestones={b.milestones} />
                </article>
              ))}
            </div>
          )}

          {/* Conversation */}
          <h2 className="mb-3 mt-10 text-lg font-semibold text-[var(--ink)]">Messages</h2>
          <p className="mb-4 text-xs text-[var(--muted)]">
            Direct line to your account team. Auto-updates from the production floor post here too.
          </p>
          <MessageThread messages={orderMessages} viewer="brand" brandColor={brand.primary} />
          <ReplyForm
            orderId={order.id}
            authorRole="brand"
            authorName={brand.contact}
            brandColor={brand.primary}
          />
        </section>

        <aside className="space-y-4">
          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
              Account contact
            </p>
            <p className="mt-2 text-sm font-medium text-[var(--ink)]">{brand.contact}</p>
            <p className="font-mono text-xs text-[var(--muted)]">{brand.contactEmail}</p>
          </div>

          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
              Order details
            </p>
            <dl className="mt-3 space-y-2 text-xs">
              <Row label="PO number"  value={order.code} mono />
              <Row label="Created"    value={order.createdAt} mono />
              <Row label="Ship by"    value={order.shipBy} mono />
              <Row label="Units"      value={order.totalUnits.toLocaleString()} mono />
              <Row label="Status"     value={<OrderStatusPill status={order.status} />} />
            </dl>
          </div>
        </aside>
      </div>
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
