import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getOrder, getBrand, getBatchesForOrder, activity, getMessagesForOrder } from '@/lib/demo-data'
import { loadMessagesForOrder } from '@/lib/demo-messages-store'
import { loadBatchesWithOverrides } from '@/lib/demo-batch-store'
import { OrderStatusPill } from '@/components/demo/StatusPill'
import { MilestoneTimeline } from '@/components/demo/MilestoneTimeline'
import { MessageThread } from '@/components/demo/MessageThread'
import { ReplyForm } from '@/components/demo/ReplyForm'

export default async function OrderDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const order = getOrder(id)
  if (!order) notFound()

  const brand = getBrand(order.brandSlug)
  const orderBatches = await loadBatchesWithOverrides(getBatchesForOrder(order))
  const orderActivity = activity.filter((a) => a.orderId === order.id)
  const orderMessages = await loadMessagesForOrder(order.id, getMessagesForOrder(order.id))

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      <Link
        href="/demo"
        className="mb-6 inline-flex items-center gap-1 font-mono text-xs text-[var(--muted)] hover:text-[var(--ink)]"
      >
        ← Dashboard
      </Link>

      <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
            {brand?.name} · created {order.createdAt}
          </p>
          <h1 className="mt-1 font-display text-4xl font-semibold text-[var(--ink)]">
            {order.code}
          </h1>
        </div>
        <div className="flex flex-col items-end gap-2">
          <OrderStatusPill status={order.status} />
          <p className="font-mono text-xs text-[var(--muted)]">
            Ship by <span className="text-[var(--ink)]">{order.shipBy}</span> · {order.totalUnits.toLocaleString()} units
          </p>
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <section>
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
                {order.lineItems.map((li) => (
                  <tr key={li.id} className="border-t border-[var(--border)]">
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
                    {order.totalUnits.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <h2 className="mb-3 mt-10 text-lg font-semibold text-[var(--ink)]">Conversation</h2>
          <p className="mb-4 text-xs text-[var(--muted)]">
            Visible to {brand?.name} on their portal. System updates post automatically as
            milestones change.
          </p>
          <MessageThread messages={orderMessages} viewer="manufacturer" brandColor={brand?.primary} />
          <ReplyForm orderId={order.id} authorRole="manufacturer" authorName="Carter Webb" />

          <h2 className="mb-3 mt-10 text-lg font-semibold text-[var(--ink)]">Production batches</h2>
          {orderBatches.length === 0 ? (
            <p className="rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
              No batches assigned yet. Order is awaiting factory allocation.
            </p>
          ) : (
            <div className="space-y-6">
              {orderBatches.map((b) => (
                <article key={b.id} className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
                  <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                        Batch
                      </p>
                      <h3 className="mt-1 font-display text-xl font-semibold text-[var(--ink)]">{b.code}</h3>
                    </div>
                    <p className="font-mono text-xs text-[var(--muted)]">
                      {b.units.toLocaleString()} units · {b.factory}
                    </p>
                  </div>
                  <MilestoneTimeline milestones={b.milestones} />
                </article>
              ))}
            </div>
          )}
        </section>

        <aside>
          <h2 className="mb-3 text-lg font-semibold text-[var(--ink)]">Activity</h2>
          {orderActivity.length === 0 ? (
            <p className="rounded-md border border-dashed border-[var(--border)] bg-[var(--surface)] p-4 text-xs text-[var(--muted)]">
              No activity yet.
            </p>
          ) : (
            <ul className="space-y-2">
              {orderActivity.map((a) => (
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
          )}

          <div className="mt-6 rounded-md border border-[var(--border)] bg-[var(--surface)] p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
              Customer contact
            </p>
            <p className="mt-2 text-sm font-medium text-[var(--ink)]">{brand?.contact}</p>
            <p className="font-mono text-xs text-[var(--muted)]">{brand?.contactEmail}</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
