import 'server-only'
import { cookies } from 'next/headers'

const COOKIE = 'demo-attachments-v1'
const MAX_ATTACHMENTS = 30

export interface DemoAttachment {
  id: string
  batchId: string
  milestoneId?: string
  sampleSlug: string  // references /public/demo/photos/[slug].svg
  caption: string
  uploadedBy: string
  uploadedAt: string
}

export const SAMPLE_PHOTOS = [
  { slug: 'fabric',     label: 'Materials · fabric received',      milestoneIdHint: 'm1' },
  { slug: 'cut-sew',    label: 'Cut & sew · operator on line',     milestoneIdHint: 'm2' },
  { slug: 'inspection', label: 'QC inspection · defect check',     milestoneIdHint: 'm4' },
  { slug: 'pack-ship',  label: 'Pack & ship · staged for pickup',  milestoneIdHint: 'm5' },
] as const

export function getSampleByslug(slug: string) {
  return SAMPLE_PHOTOS.find((p) => p.slug === slug)
}

export async function getAttachments(): Promise<DemoAttachment[]> {
  const c = await cookies()
  const raw = c.get(COOKIE)?.value
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? (parsed as DemoAttachment[]) : []
  } catch {
    return []
  }
}

export async function appendAttachment(att: DemoAttachment): Promise<void> {
  const c = await cookies()
  const existing = await getAttachments()
  const next = [...existing, att].slice(-MAX_ATTACHMENTS)
  c.set(COOKIE, JSON.stringify(next), {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
  })
}

export async function removeAttachment(id: string): Promise<void> {
  const c = await cookies()
  const existing = await getAttachments()
  const next = existing.filter((a) => a.id !== id)
  c.set(COOKIE, JSON.stringify(next), {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
  })
}

export async function getAttachmentsForBatch(batchId: string): Promise<DemoAttachment[]> {
  const all = await getAttachments()
  return all
    .filter((a) => a.batchId === batchId)
    .sort((a, b) => a.uploadedAt.localeCompare(b.uploadedAt))
}
