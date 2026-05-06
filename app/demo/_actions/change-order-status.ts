'use server'

import { revalidatePath } from 'next/cache'
import { getOrder } from '@/lib/demo-db'
import { appendStatusOverride } from '@/lib/demo-status-store'
import type { OrderStatus } from '@/lib/demo-data'

const ALLOWED: OrderStatus[] = ['received', 'in_production', 'shipped', 'closed', 'on_hold']

export async function changeOrderStatusAction(orderId: string, formData: FormData) {
  const raw = formData.get('status')
  const status = typeof raw === 'string' ? (raw as OrderStatus) : null
  if (!status || !ALLOWED.includes(status)) return

  const order = await getOrder(orderId)
  if (!order) return

  await appendStatusOverride({
    orderId,
    status,
    at: new Date().toISOString(),
  })

  revalidatePath(`/demo/full/orders/${orderId}`)
  revalidatePath(`/demo/full/orders`)
  revalidatePath(`/demo/full`)
  revalidatePath(`/demo/full/customers/${order.brandSlug}`)
}
