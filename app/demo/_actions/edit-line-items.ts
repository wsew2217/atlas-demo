'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getOrder } from '@/lib/demo-db'
import { setLineItemOverrides, type LineItemOverride } from '@/lib/demo-lineitem-store'
import { appendInternalNote } from '@/lib/demo-notes-store'

export async function editLineItemsAction(orderId: string, formData: FormData) {
  const order = await getOrder(orderId)
  if (!order) return

  const overrides: LineItemOverride[] = []
  const changed: string[] = []

  for (const li of order.lineItems) {
    const raw = formData.get(`units-${li.id}`)
    if (typeof raw !== 'string') continue
    const num = parseInt(raw, 10)
    if (isNaN(num) || num < 0) continue
    if (num !== li.units) {
      overrides.push({ lineItemId: li.id, units: num })
      changed.push(`${li.sku}: ${li.units} → ${num}`)
    }
  }

  if (overrides.length > 0) {
    await setLineItemOverrides(overrides)
    await appendInternalNote({
      id: `note-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      orderId,
      at: new Date().toISOString(),
      authorName: 'Operations',
      body: `Line item units updated:\n${changed.join('\n')}`,
    })
  }

  revalidatePath(`/demo/full/orders/${orderId}`)
  redirect(`/demo/full/orders/${orderId}`)
}
