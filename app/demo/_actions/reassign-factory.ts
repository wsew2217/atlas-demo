'use server'

import { revalidatePath } from 'next/cache'
import { getBatch, getOrderForBatch } from '@/lib/demo-db'
import { appendBatchFactoryOverride } from '@/lib/demo-batch-factory-store'
import { appendInternalNote } from '@/lib/demo-notes-store'
import { appendCustomMessage } from '@/lib/demo-messages-store'

export async function reassignFactoryAction(batchId: string, formData: FormData) {
  const factoryRaw = formData.get('factory')
  const factory = typeof factoryRaw === 'string' ? factoryRaw.trim() : ''
  if (!factory) return

  const [batch, order] = await Promise.all([
    getBatch(batchId),
    getOrderForBatch(batchId),
  ])
  if (!batch || !order) return
  if (batch.factory === factory) return

  const nowIso = new Date().toISOString()
  const oldShort = batch.factory.split(' · ')[0]
  const newShort = factory.split(' · ')[0]

  await appendBatchFactoryOverride({
    batchId,
    factory,
    at: nowIso,
  })

  await appendInternalNote({
    id: `note-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    orderId: order.id,
    at: nowIso,
    authorName: 'Operations',
    body: `Batch ${batch.code} reassigned: ${oldShort} → ${newShort}. Notify both factory leads of the handoff.`,
  })

  await appendCustomMessage({
    id: `auto-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    orderId: order.id,
    at: nowIso,
    authorRole: 'system',
    authorName: 'system',
    body: `Batch ${batch.code} reassigned from ${oldShort} to ${newShort}.`,
  })

  revalidatePath(`/demo/full/orders/${order.id}`)
  revalidatePath(`/demo/orders/${order.id}`)
  revalidatePath('/demo/full/factory')
  revalidatePath('/demo/full/batches')
  revalidatePath('/demo/factories')
  revalidatePath('/demo/factory')
  revalidatePath('/demo/factory/plant-b')
  revalidatePath(`/demo/portal/${order.brandSlug}/orders/${order.id}`)
}
