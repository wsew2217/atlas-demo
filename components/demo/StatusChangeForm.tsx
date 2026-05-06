import { changeOrderStatusAction } from '@/app/demo/_actions/change-order-status'
import type { OrderStatus } from '@/lib/demo-data'
import { orderStatusLabel } from '@/lib/demo-data'

const STATUSES: OrderStatus[] = ['received', 'in_production', 'shipped', 'closed', 'on_hold']

export function StatusChangeForm({
  orderId,
  currentStatus,
}: {
  orderId: string
  currentStatus: OrderStatus
}) {
  const action = changeOrderStatusAction.bind(null, orderId)
  return (
    <form action={action} className="flex items-center gap-2">
      <label htmlFor={`status-${orderId}`} className="sr-only">
        Change status
      </label>
      <select
        id={`status-${orderId}`}
        name="status"
        defaultValue={currentStatus}
        className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5 text-xs text-[var(--ink)] outline-none focus:border-[var(--accent)]"
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {orderStatusLabel[s]}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="rounded-md bg-[var(--ink)] px-3 py-1.5 text-xs font-medium text-[var(--cream)] transition hover:opacity-90"
      >
        Update
      </button>
    </form>
  )
}
