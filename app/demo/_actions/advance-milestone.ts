'use server'

import { revalidatePath } from 'next/cache'
import { getBatch, getOrderForBatch } from '@/lib/demo-data'
import { appendMilestoneOverride } from '@/lib/demo-batch-store'
import { appendCustomMessage } from '@/lib/demo-messages-store'

export async function advanceMilestoneAction(batchId: string, milestoneId: string) {
  const batch = getBatch(batchId)
  if (!batch) return

  const milestone = batch.milestones.find((m) => m.id === milestoneId)
  if (!milestone) return

  const order = getOrderForBatch(batchId)
  if (!order) return

  const todayDate = new Date().toISOString().slice(0, 10)
  const nowIso = new Date().toISOString()

  await appendMilestoneOverride({
    batchId,
    milestoneId,
    date: todayDate,
  })

  await appendCustomMessage({
    id: `auto-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    orderId: order.id,
    at: nowIso,
    authorRole: 'system',
    authorName: 'system',
    body: `${batch.code}: ${milestone.label} complete.`,
  })

  revalidatePath('/demo/factory')
  revalidatePath(`/demo/orders/${order.id}`)
  revalidatePath(`/demo/portal/${order.brandSlug}/orders/${order.id}`)
  revalidatePath(`/demo/portal/${order.brandSlug}`)
  revalidatePath('/demo')
}
