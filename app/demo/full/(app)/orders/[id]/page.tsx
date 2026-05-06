import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getOrder, getBrand, getBatchesForOrder } from '@/lib/demo-db'
import { loadMessagesForOrder } from '@/lib/demo-messages-store'
import { loadBatchesWithOverrides } from '@/lib/demo-batch-store'
import { getNotesForOrder } from '@/lib/demo-notes-store'
import { applyStatusOverride, getStatusHistoryForOrder } from '@/lib/demo-status-store'
import { OrderStatusPill } from '@/components/demo/StatusPill'
import { MilestoneTimeline } from '@/components/demo/MilestoneTimeline'
import { MessageThread } from '@/components/demo/MessageThread'
import { ReplyForm } from '@/components/demo/ReplyForm'
import { InternalNotesThread } from '@/components/demo/InternalNotesThread'
import { InternalNoteForm } from '@/components/demo/InternalNoteForm'
import { StatusChangeForm } from '@/components/demo/StatusChangeForm'
import { orderStatusLabel } from '@/lib/demo-data'

export const metadata = {
  title: 'Atlas Full Demo · Order detail',
  robots: { index: false, follow: false },
}

const MANUFACTURER_NAME = 'Carter Webb'

export default async function FullDemoOrderDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const orderRaw = await getOrder(id)
  if (!orderRaw) notFound()
  const order = await applyStatusOverride(orderRaw)

  const [brand, orderBatchesRaw, orderMessages, internalNotes, statusHistory] = await Promise.all([
    getBrand(order.brandSlug),
    getBatchesForOrder(order),
    loadMessagesForOrder(order.id),
    getNotesForOrder(order.id),
    getStatusHistoryForOrder(order.id),
  ])
  const orderBatches = await loadBatchesWithOverrides(orderBatchesRaw)

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-10">
      <Link
        href="/demo/full/orders"
        className="mb-6 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)] hover:text-[var(--ink)]"
      >
        ← All orders
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
        <div className="flex flex-col items-end gap-3">
          <div className="flex items-center gap-2">
            <OrderStatusPill status={order.status} />
            <StatusChangeForm orderId={order.id} currentStatus={order.status} />
          </div>
          <p className="font-mono text-xs text-[var(--muted)]">
            Ship by <span className="text-[var(--ink)]">{order.shipBy}</span> · {order.totalUnits.toLocaleString()} units
          </p>
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <section className="space-y-10">
          {/* Line items */}
          <div>
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-lg font-semibold text-[var(--ink)]">Line items</h2>
              <span
                className="cursor-not-allowed font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]"
                title="Line item editing coming next round"
              >
                ✎ edit (coming)
              </span>
            </div>
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
          </div>

          {/* Customer-visible conversation */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <h2 className="text-lg font-semibold text-[var(--ink)]">Conversation</h2>
              <span className="rounded-full bg-[var(--good)]/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--good)]">
                Customer-visible
              </span>
            </div>
            <p className="mb-4 text-xs text-[var(--muted)]">
              Visible to {brand?.name} on their portal. System updates post automatically as
              milestones change.
            </p>
            <MessageThread messages={orderMessages} viewer="manufacturer" brandColor={brand?.primary} />
            <ReplyForm orderId={order.id} authorRole="manufacturer" authorName={MANUFACTURER_NAME} />
          </div>

          {/* Internal notes */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <h2 className="text-lg font-semibold text-[var(--ink)]">Internal notes</h2>
              <span className="rounded-full bg-[var(--accent)]/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent)]">
                Manufacturer team only
              </span>
            </div>
            <p className="mb-4 text-xs text-[var(--muted)]">
              Notes here never reach the customer portal. Use them for internal coordination —
              factory chatter, billing notes, escalations.
            </p>
            <InternalNotesThread notes={internalNotes} />
            <InternalNoteForm orderId={order.id} authorName={MANUFACTURER_NAME} />
          </div>

          {/* Production batches */}
          <div>
            <h2 className="mb-3 text-lg font-semibold text-[var(--ink)]">Production batches</h2>
            {orderBatches.length === 0 ? (
              <div className="flex items-center justify-between rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface)] p-6">
                <p className="text-sm text-[var(--muted)]">
                  No batches assigned yet. Awaiting factory allocation.
                </p>
                <span className="cursor-not-allowed rounded-md border border-dashed border-[var(--border)] bg-[var(--cream)] px-3 py-1.5 text-xs text-[var(--muted)]">
                  + Create batch (coming)
                </span>
              </div>
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
                      <div className="flex items-center gap-3">
                        <p className="font-mono text-xs text-[var(--muted)]">
                          {b.units.toLocaleString()} units · {b.factory}
                        </p>
                        <span
                          className="cursor-not-allowed rounded-md border border-dashed border-[var(--border)] bg-[var(--cream)] px-2.5 py-1 text-xs text-[var(--muted)]"
                          title="Factory reassignment coming next round"
                        >
                          Reassign factory (coming)
                        </span>
                      </div>
                    </div>
                    <MilestoneTimeline milestones={b.milestones} />
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <aside className="space-y-4">
          {/* Customer contact */}
          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
              Customer contact
            </p>
            <p className="mt-2 text-sm font-medium text-[var(--ink)]">{brand?.contact}</p>
            <p className="font-mono text-xs text-[var(--muted)]">{brand?.contactEmail}</p>
            {brand && (
              <div className="mt-4 border-t border-[var(--border)] pt-4">
                <Link
                  href={`/demo/full/customers/${brand.slug}`}
                  className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent)] hover:text-[var(--ink)]"
                >
                  Manage customer →
                </Link>
              </div>
            )}
          </div>

          {/* Status history */}
          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
              Status history
            </p>
            {statusHistory.length === 0 ? (
              <p className="mt-3 text-xs text-[var(--muted)]">
                No status changes yet. Current status: {orderStatusLabel[order.status]}.
              </p>
            ) : (
              <ul className="mt-3 space-y-2">
                {[...statusHistory].reverse().map((h) => (
                  <li
                    key={h.at}
                    className="rounded-md border border-[var(--border)] bg-[var(--cream)] px-3 py-2 text-xs"
                  >
                    <p className="text-[var(--ink)]">
                      Changed to {orderStatusLabel[h.status]}
                    </p>
                    <p className="mt-0.5 font-mono text-[11px] text-[var(--muted)]">
                      {new Date(h.at).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Quick actions */}
          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
              Quick actions
            </p>
            <ul className="mt-3 space-y-1 text-xs">
              <li className="cursor-not-allowed text-[var(--muted)]">📄 Export PO PDF (coming)</li>
              <li className="cursor-not-allowed text-[var(--muted)]">📤 Email PO to factory (coming)</li>
              <li className="cursor-not-allowed text-[var(--muted)]">🔁 Reorder (coming)</li>
              <li className="cursor-not-allowed text-[var(--muted)]">📥 Download attachments (coming)</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
