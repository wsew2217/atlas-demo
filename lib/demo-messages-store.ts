import { cookies } from 'next/headers'
import type { Message } from './demo-data'

const COOKIE = 'demo-messages'
const MAX_MESSAGES = 50

export async function getCustomMessages(): Promise<Message[]> {
  const c = await cookies()
  const raw = c.get(COOKIE)?.value
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? (parsed as Message[]) : []
  } catch {
    return []
  }
}

export async function appendCustomMessage(message: Message): Promise<void> {
  const c = await cookies()
  const existing = await getCustomMessages()
  const next = [...existing, message].slice(-MAX_MESSAGES)
  c.set(COOKIE, JSON.stringify(next), {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
  })
}

export async function loadMessagesForOrder(
  orderId: string,
  fixtures: Message[],
): Promise<Message[]> {
  const custom = (await getCustomMessages()).filter((m) => m.orderId === orderId)
  return [...fixtures, ...custom].sort((a, b) => a.at.localeCompare(b.at))
}
