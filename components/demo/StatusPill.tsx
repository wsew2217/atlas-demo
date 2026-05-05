import type { OrderStatus, MilestoneState } from '@/lib/demo-data'
import { orderStatusLabel, milestoneStateLabel } from '@/lib/demo-data'

const orderTone: Record<OrderStatus, string> = {
  received:      'bg-[var(--ink)]/10 text-[var(--ink)]',
  in_production: 'bg-[var(--accent)]/15 text-[var(--accent)]',
  shipped:       'bg-[var(--good)]/15 text-[var(--good)]',
  closed:        'bg-[var(--ink)]/10 text-[var(--muted)]',
  on_hold:       'bg-[var(--alert)]/15 text-[var(--alert)]',
}

const milestoneTone: Record<MilestoneState, string> = {
  done:        'bg-[var(--good)]/15 text-[var(--good)]',
  in_progress: 'bg-[var(--accent)]/15 text-[var(--accent)]',
  todo:        'bg-[var(--ink)]/10 text-[var(--muted)]',
  blocked:     'bg-[var(--alert)]/15 text-[var(--alert)]',
}

export function OrderStatusPill({ status }: { status: OrderStatus }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${orderTone[status]}`}
    >
      {orderStatusLabel[status]}
    </span>
  )
}

export function MilestoneStatePill({ state }: { state: MilestoneState }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${milestoneTone[state]}`}
    >
      {milestoneStateLabel[state]}
    </span>
  )
}
