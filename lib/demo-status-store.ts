import 'server-only'
import { cookies } from 'next/headers'
import type { Order, OrderStatus } from './demo-data'

const COOKIE = 'demo-order-status-v1'
const MAX_OVERRIDES = 50

export interface OrderStatusOverride {
  orderId: string
  status: OrderStatus
  at: string
}

export async function getStatusOverrides(): Promise<OrderStatusOverride[]> {
  const c = await cookies()
  const raw = c.get(COOKIE)?.value
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? (parsed as OrderStatusOverride[]) : []
  } catch {
    return []
  }
}

export async function appendStatusOverride(override: OrderStatusOverride): Promise<void> {
  const c = await cookies()
  const existing = await getStatusOverrides()
  // Replace any prior override for the same order, keeping the newest
  const filtered = existing.filter((o) => o.orderId !== override.orderId)
  const next = [...filtered, override].slice(-MAX_OVERRIDES)
  c.set(COOKIE, JSON.stringify(next), {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
  })
}

export async function applyStatusOverride<T extends Order>(order: T): Promise<T> {
  const overrides = await getStatusOverrides()
  const override = overrides.find((o) => o.orderId === order.id)
  if (!override) return order
  return { ...order, status: override.status }
}

export async function getStatusHistoryForOrder(orderId: string): Promise<OrderStatusOverride[]> {
  const all = await getStatusOverrides()
  return all
    .filter((o) => o.orderId === orderId)
    .sort((a, b) => a.at.localeCompare(b.at))
}
