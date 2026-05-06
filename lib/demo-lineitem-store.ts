import 'server-only'
import { cookies } from 'next/headers'
import type { LineItem } from './demo-data'

const COOKIE = 'demo-lineitem-v1'
const MAX_OVERRIDES = 200

export interface LineItemOverride {
  lineItemId: string
  units: number
}

export async function getLineItemOverrides(): Promise<LineItemOverride[]> {
  const c = await cookies()
  const raw = c.get(COOKIE)?.value
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? (parsed as LineItemOverride[]) : []
  } catch {
    return []
  }
}

export async function setLineItemOverrides(overrides: LineItemOverride[]): Promise<void> {
  const c = await cookies()
  const existing = await getLineItemOverrides()
  const overrideMap = new Map(overrides.map((o) => [o.lineItemId, o]))
  const merged = [
    ...existing.filter((o) => !overrideMap.has(o.lineItemId)),
    ...overrides,
  ].slice(-MAX_OVERRIDES)
  c.set(COOKIE, JSON.stringify(merged), {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
  })
}

export async function applyLineItemOverrides(items: LineItem[]): Promise<LineItem[]> {
  const overrides = await getLineItemOverrides()
  if (overrides.length === 0) return items
  const map = new Map(overrides.map((o) => [o.lineItemId, o]))
  return items.map((li) => {
    const override = map.get(li.id)
    if (!override) return li
    return { ...li, units: override.units }
  })
}
