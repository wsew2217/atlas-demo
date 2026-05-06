import 'server-only'
import { cookies } from 'next/headers'

const COOKIE = 'demo-onboarded-customers-v1'
const MAX_CUSTOMERS = 20

export interface DemoCustomer {
  slug: string
  customerName: string
  domain: string
  primaryColor: string
  contactName: string
  contactEmail: string
  contactRole: string
  rules: string[]
  createdAt: string
}

export async function getDemoCustomers(): Promise<DemoCustomer[]> {
  const c = await cookies()
  const raw = c.get(COOKIE)?.value
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? (parsed as DemoCustomer[]) : []
  } catch {
    return []
  }
}

export async function appendDemoCustomer(customer: DemoCustomer): Promise<void> {
  const c = await cookies()
  const existing = await getDemoCustomers()
  // Replace if same slug, otherwise append
  const filtered = existing.filter((d) => d.slug !== customer.slug)
  const next = [...filtered, customer].slice(-MAX_CUSTOMERS)
  c.set(COOKIE, JSON.stringify(next), {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
  })
}

export async function getDemoCustomer(slug: string): Promise<DemoCustomer | undefined> {
  const all = await getDemoCustomers()
  return all.find((d) => d.slug === slug)
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40)
}
