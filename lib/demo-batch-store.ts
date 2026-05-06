import 'server-only'
import { cookies } from 'next/headers'
import type { Batch, MilestoneState } from './demo-data'
import { getBatchFactoryOverrides } from './demo-batch-factory-store'

const COOKIE = 'demo-milestones-v2'
const MAX_OVERRIDES = 100

export interface MilestoneOverride {
  batchId: string
  milestoneId: string
  date: string
}

export async function getMilestoneOverrides(): Promise<MilestoneOverride[]> {
  const c = await cookies()
  const raw = c.get(COOKIE)?.value
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? (parsed as MilestoneOverride[]) : []
  } catch {
    return []
  }
}

export async function appendMilestoneOverride(override: MilestoneOverride): Promise<void> {
  const c = await cookies()
  const existing = await getMilestoneOverrides()
  // Replace if the same milestone already has an override; otherwise append.
  const filtered = existing.filter(
    (o) => !(o.batchId === override.batchId && o.milestoneId === override.milestoneId),
  )
  const next = [...filtered, override].slice(-MAX_OVERRIDES)
  c.set(COOKIE, JSON.stringify(next), {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
  })
}

export function applyMilestoneOverridesToBatch(
  batch: Batch,
  overrides: MilestoneOverride[],
): Batch {
  const overrideMap = new Map(
    overrides
      .filter((o) => o.batchId === batch.id)
      .map((o) => [o.milestoneId, o] as const),
  )

  let firstUndoneSet = false
  return {
    ...batch,
    milestones: batch.milestones.map((m) => {
      const override = overrideMap.get(m.id)
      const isDoneFromFixture = m.state === 'done'
      const isDone = isDoneFromFixture || Boolean(override)

      if (isDone) {
        return {
          ...m,
          state: 'done' as MilestoneState,
          date: override?.date ?? m.date,
        }
      }

      if (!firstUndoneSet) {
        firstUndoneSet = true
        return { ...m, state: 'in_progress' as MilestoneState }
      }

      return { ...m, state: 'todo' as MilestoneState }
    }),
  }
}

export async function loadBatchesWithOverrides(batches: Batch[]): Promise<Batch[]> {
  const [milestoneOverrides, factoryOverrides] = await Promise.all([
    getMilestoneOverrides(),
    getBatchFactoryOverrides(),
  ])
  const factoryByBatchId = new Map(factoryOverrides.map((o) => [o.batchId, o.factory]))
  return batches.map((b) => {
    const withMilestones = applyMilestoneOverridesToBatch(b, milestoneOverrides)
    const factoryOverride = factoryByBatchId.get(b.id)
    return factoryOverride ? { ...withMilestones, factory: factoryOverride } : withMilestones
  })
}
