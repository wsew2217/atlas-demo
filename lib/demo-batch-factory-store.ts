import 'server-only'
import { cookies } from 'next/headers'

const COOKIE = 'demo-batch-factory-v1'
const MAX_OVERRIDES = 50

export interface BatchFactoryOverride {
  batchId: string
  factory: string
  at: string
}

export async function getBatchFactoryOverrides(): Promise<BatchFactoryOverride[]> {
  const c = await cookies()
  const raw = c.get(COOKIE)?.value
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? (parsed as BatchFactoryOverride[]) : []
  } catch {
    return []
  }
}

export async function appendBatchFactoryOverride(override: BatchFactoryOverride): Promise<void> {
  const c = await cookies()
  const existing = await getBatchFactoryOverrides()
  const filtered = existing.filter((o) => o.batchId !== override.batchId)
  const next = [...filtered, override].slice(-MAX_OVERRIDES)
  c.set(COOKIE, JSON.stringify(next), {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
  })
}
