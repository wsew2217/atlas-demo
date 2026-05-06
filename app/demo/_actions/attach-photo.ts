'use server'

import { revalidatePath } from 'next/cache'
import { getBatch, getOrderForBatch } from '@/lib/demo-db'
import {
  appendAttachment,
  removeAttachment,
  SAMPLE_PHOTOS,
  getSampleByslug,
} from '@/lib/demo-attachments-store'
import { appendCustomMessage } from '@/lib/demo-messages-store'

export async function attachPhotoAction(
  batchId: string,
  milestoneId: string | null,
  uploadedBy: string,
  formData: FormData,
) {
  const slugRaw = formData.get('sampleSlug')
  const captionRaw = formData.get('caption')
  const sampleSlug = typeof slugRaw === 'string' ? slugRaw : ''
  const sample = getSampleByslug(sampleSlug)
  if (!sample) return

  const batch = await getBatch(batchId)
  if (!batch) return

  const order = await getOrderForBatch(batchId)
  if (!order) return

  const caption =
    typeof captionRaw === 'string' && captionRaw.trim()
      ? captionRaw.trim().slice(0, 200)
      : sample.label

  const nowIso = new Date().toISOString()
  await appendAttachment({
    id: `att-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    batchId,
    milestoneId: milestoneId ?? undefined,
    sampleSlug,
    caption,
    uploadedBy,
    uploadedAt: nowIso,
  })

  // Auto-post to the order conversation so customer sees it
  await appendCustomMessage({
    id: `auto-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    orderId: order.id,
    at: nowIso,
    authorRole: 'system',
    authorName: 'system',
    body: `${batch.code}: photo uploaded by ${uploadedBy} — ${caption}`,
  })

  revalidatePath(`/demo/full/orders/${order.id}`)
  revalidatePath(`/demo/orders/${order.id}`)
  revalidatePath(`/demo/portal/${order.brandSlug}/orders/${order.id}`)
  revalidatePath(`/demo/factory`)
  revalidatePath(`/demo/factory/plant-b`)
}

export async function removeAttachmentAction(
  attachmentId: string,
  batchId: string,
) {
  await removeAttachment(attachmentId)
  const order = await getOrderForBatch(batchId)
  revalidatePath(`/demo/full/orders/${order?.id ?? ''}`)
  revalidatePath(`/demo/orders/${order?.id ?? ''}`)
  if (order) {
    revalidatePath(`/demo/portal/${order.brandSlug}/orders/${order.id}`)
  }
}

export { SAMPLE_PHOTOS }
