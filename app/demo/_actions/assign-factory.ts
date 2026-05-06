'use server'

import { revalidatePath } from 'next/cache'
import { getOrder } from '@/lib/demo-db'
import { appendStatusOverride } from '@/lib/demo-status-store'
import { appendInternalNote } from '@/lib/demo-notes-store'
import { appendCustomMessage } from '@/lib/demo-messages-store'

export async function assignFactoryAction(orderId: string, formData: FormData) {
  const factoryRaw = formData.get('factory')
  const factory = typeof factoryRaw === 'string' ? factoryRaw.trim() : ''
  if (!factory) return

  const order = await getOrder(orderId)
  if (!order) return
  if (order.status !== 'received') return

  const nowIso = new Date().toISOString()
  const factoryShort = factory.split(' · ')[0]
  const batchCode = `B-${order.code.replace('PO-', '')}`

  // Update status: received → in_production
  await appendStatusOverride({
    orderId,
    status: 'in_production',
    at: nowIso,
  })

  // Internal note for the manufacturer team
  await appendInternalNote({
    id: `note-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    orderId,
    at: nowIso,
    authorName: 'Allocation',
    body: `Allocated to ${factory}. Batch ${batchCode} created. Production scheduled.`,
  })

  // System message to the customer-visible conversation
  await appendCustomMessage({
    id: `auto-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    orderId,
    at: nowIso,
    authorRole: 'system',
    authorName: 'system',
    body: `${order.code} allocated to ${factoryShort} — batch ${batchCode} created, production scheduled.`,
  })

  revalidatePath('/demo/full/factory')
  revalidatePath('/demo/full/orders')
  revalidatePath(`/demo/full/orders/${orderId}`)
  revalidatePath('/demo/full')
  revalidatePath(`/demo/full/customers/${order.brandSlug}`)
  revalidatePath(`/demo/portal/${order.brandSlug}`)
  revalidatePath(`/demo/portal/${order.brandSlug}/orders/${orderId}`)
}
