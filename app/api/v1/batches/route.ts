import { NextRequest } from 'next/server'
import { listBatches, getOrderForBatch } from '@/lib/demo-db'
import { checkApiAuth, authError } from '@/lib/api/auth'

export async function GET(request: NextRequest) {
  const auth = checkApiAuth(request)
  if (!auth.ok) return authError(auth)

  const batches = await listBatches()
  const orderIdByBatchId = new Map<string, string | null>()
  await Promise.all(
    batches.map(async (b) => {
      const o = await getOrderForBatch(b.id)
      orderIdByBatchId.set(b.id, o?.id ?? null)
    }),
  )

  return Response.json({
    data: batches.map((b) => ({
      id: b.id,
      code: b.code,
      factory: b.factory,
      units: b.units,
      order_id: orderIdByBatchId.get(b.id),
      milestone_count: b.milestones.length,
      milestones: b.milestones.map((m) => ({
        id: m.id,
        label: m.label,
        state: m.state,
        date: m.date ?? null,
      })),
    })),
    meta: { count: batches.length },
  })
}
