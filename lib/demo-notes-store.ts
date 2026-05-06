import 'server-only'
import { cookies } from 'next/headers'

const COOKIE = 'demo-internal-notes-v1'
const MAX_NOTES = 50

export interface InternalNote {
  id: string
  orderId: string
  at: string
  authorName: string
  body: string
}

export async function getInternalNotes(): Promise<InternalNote[]> {
  const c = await cookies()
  const raw = c.get(COOKIE)?.value
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? (parsed as InternalNote[]) : []
  } catch {
    return []
  }
}

export async function appendInternalNote(note: InternalNote): Promise<void> {
  const c = await cookies()
  const existing = await getInternalNotes()
  const next = [...existing, note].slice(-MAX_NOTES)
  c.set(COOKIE, JSON.stringify(next), {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
  })
}

export async function getNotesForOrder(orderId: string): Promise<InternalNote[]> {
  const all = await getInternalNotes()
  return all
    .filter((n) => n.orderId === orderId)
    .sort((a, b) => a.at.localeCompare(b.at))
}
