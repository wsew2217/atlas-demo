'use server'

import { revalidatePath } from 'next/cache'
import { getOrder } from '@/lib/demo-db'
import { appendCustomMessage } from '@/lib/demo-messages-store'

export async function addMessageAction(
  orderId: string,
  authorRole: 'manufacturer' | 'brand',
  authorName: string,
  formData: FormData,
) {
  const raw = formData.get('body')
  const body = typeof raw === 'string' ? raw.trim() : ''
  if (!body) return
  if (body.length > 2000) return

  const order = await getOrder(orderId)
  if (!order) return

  await appendCustomMessage({
    id: `usr-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    orderId,
    at: new Date().toISOString(),
    authorRole,
    authorName,
    body,
  })

  revalidatePath(`/demo/orders/${orderId}`)
  revalidatePath(`/demo/portal/${order.brandSlug}/orders/${orderId}`)
}
