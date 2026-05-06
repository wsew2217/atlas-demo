import 'server-only'
import { cookies } from 'next/headers'

const COOKIE = 'demo-imported-pos-v1'
const MAX_POS = 20

export interface ImportedLineItem {
  sku: string
  description: string
  color: string
  size: string
  units: number
}

export interface ImportedPo {
  slug: string
  poCode: string
  customerName: string
  shipBy: string
  lineItems: ImportedLineItem[]
  totalUnits: number
  importedAt: string
  source: 'pdf' | 'sample' | 'manual'
}

export async function getImportedPos(): Promise<ImportedPo[]> {
  const c = await cookies()
  const raw = c.get(COOKIE)?.value
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? (parsed as ImportedPo[]) : []
  } catch {
    return []
  }
}

export async function appendImportedPo(po: ImportedPo): Promise<void> {
  const c = await cookies()
  const existing = await getImportedPos()
  const filtered = existing.filter((p) => p.slug !== po.slug)
  const next = [...filtered, po].slice(-MAX_POS)
  c.set(COOKIE, JSON.stringify(next), {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
  })
}

export async function getImportedPo(slug: string): Promise<ImportedPo | undefined> {
  const all = await getImportedPos()
  return all.find((p) => p.slug === slug)
}

export function slugifyPoCode(code: string): string {
  return code
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40)
}
