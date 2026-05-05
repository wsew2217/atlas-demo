import Link from 'next/link'
import {
  getBatchesForFactory,
  getOrderForBatch,
  getBrand,
} from '@/lib/demo-data'
import { loadBatchesWithOverrides } from '@/lib/demo-batch-store'
import { MilestoneTimeline } from '@/components/demo/MilestoneTimeline'
import { AdvanceMilestoneButton } from '@/components/demo/AdvanceMilestoneButton'

const FACTORY_QUERY = 'Suzhou'
const FACTORY_NAME = 'Suzhou Plant 2'
const USER_NAME = 'Cici Yuan'

export default async function FactoryDashboard() {
  const fixtureBatches = getBatchesForFactory(FACTORY_QUERY)
  const batches = await loadBatchesWithOverrides(fixtureBatches)

  return (
    <>
      <header className="border-b border-[var(--border)] bg-[var(--cream)]/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/demo/factory" className="flex items-baseline gap-3">
            <span className="font-display text-xl font-semibold tracking-tight text-[var(--ink)]">
              Atlas
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
              Factory · {FACTORY_NAME}
            </span>
          </Link>
          <div className="flex items-center gap-3 text-xs">
            <span className="text-[var(--muted)]">Signed in as</span>
            <span className="font-medium text-[var(--ink)]">{USER_NAME}</span>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-6 py-10">
        <header className="mb-8">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
            Production floor · Today
          </p>
          <h1 className="mt-1 text-3xl font-semibold text-[var(--ink)]">My batches</h1>
          <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">
            Your assigned batches at {FACTORY_NAME}. Mark milestones complete as you finish them —
            updates post to the buyer&rsquo;s portal automatically.
          </p>
        </header>

        <div className="space-y-6">
          {batches.map((batch) => {
            const order = getOrderForBatch(batch.id)
            const brand = order ? getBrand(order.brandSlug) : undefined
            const nextMilestone = batch.milestones.find((m) => m.state === 'in_progress')
            const allDone = batch.milestones.every((m) => m.state === 'done')

            return (
              <article
                key={batch.id}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6"
              >
                <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                      Batch
                    </p>
                    <h2 className="mt-1 font-display text-2xl font-semibold text-[var(--ink)]">
                      {batch.code}
                    </h2>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-[var(--ink)]">
                      {brand?.name ?? '—'}
                    </p>
                    <p className="font-mono text-xs text-[var(--muted)]">
                      {order?.code} · {batch.units.toLocaleString()} units
                    </p>
                  </div>
                </div>

                <MilestoneTimeline milestones={batch.milestones} />

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] pt-4">
                  <p className="text-xs text-[var(--muted)]">
                    {allDone
                      ? 'All milestones complete.'
                      : nextMilestone
                      ? `Next: ${nextMilestone.label}`
                      : 'No active milestone.'}
                  </p>
                  {nextMilestone && (
                    <AdvanceMilestoneButton
                      batchId={batch.id}
                      milestoneId={nextMilestone.id}
                      label={nextMilestone.label}
                    />
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </main>
    </>
  )
}
