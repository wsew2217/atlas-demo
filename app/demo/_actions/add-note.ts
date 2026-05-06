'use server'

import { revalidatePath } from 'next/cache'
import { getOrder } from '@/lib/demo-db'
import { appendInternalNote } from '@/lib/demo-notes-store'

export async function addNoteAction(
  orderId: string,
  authorName: string,
  formData: FormData,
) {
  const raw = formData.get('body')
  const body = typeof raw === 'string' ? raw.trim() : ''
  if (!body) return
  if (body.length > 2000) return

  const order = await getOrder(orderId)
  if (!order) return

  await appendInternalNote({
    id: `note-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    orderId,
    at: new Date().toISOString(),
    authorName,
    body,
  })

  revalidatePath(`/demo/full/orders/${orderId}`)
}
