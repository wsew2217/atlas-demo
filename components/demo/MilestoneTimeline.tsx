import type { Milestone } from '@/lib/demo-data'
import { milestoneStateLabel } from '@/lib/demo-data'

export function MilestoneTimeline({ milestones }: { milestones: Milestone[] }) {
  return (
    <ol className="space-y-3">
      {milestones.map((m, i) => (
        <li key={m.id} className="flex items-start gap-4">
          <div className="flex flex-col items-center">
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full border-2 text-[11px] font-mono ${
                m.state === 'done'
                  ? 'border-[var(--good)] bg-[var(--good)] text-[var(--cream)]'
                  : m.state === 'in_progress'
                  ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--cream)]'
                  : m.state === 'blocked'
                  ? 'border-[var(--alert)] bg-[var(--alert)] text-[var(--cream)]'
                  : 'border-[var(--border)] bg-[var(--surface)] text-[var(--muted)]'
              }`}
            >
              {m.state === 'done' ? '✓' : i + 1}
            </span>
            {i < milestones.length - 1 && (
              <span
                className={`mt-1 h-8 w-px ${
                  m.state === 'done' ? 'bg-[var(--good)]' : 'bg-[var(--border)]'
                }`}
              />
            )}
          </div>
          <div className="flex-1 pb-3">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-sm font-medium text-[var(--ink)]">{m.label}</p>
              {m.date && (
                <p className="font-mono text-xs text-[var(--muted)]">{m.date}</p>
              )}
            </div>
            <p className="text-xs text-[var(--muted)]">{milestoneStateLabel[m.state]}</p>
            {m.note && (
              <p className="mt-1 text-xs text-[var(--muted)]">{m.note}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}
