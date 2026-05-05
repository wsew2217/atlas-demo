// Type definitions for the atlas-demo data model.
// Live data lives in Supabase (demo_* tables); query helpers are in lib/demo-db.ts.

export type OrderStatus = 'received' | 'in_production' | 'shipped' | 'closed' | 'on_hold'
export type MilestoneState = 'done' | 'in_progress' | 'todo' | 'blocked'

export interface Brand {
  slug: string
  name: string
  primary: string
  contact: string
  contactEmail: string
}

export interface LineItem {
  id: string
  sku: string
  description: string
  size: string
  color: string
  units: number
}

export interface Milestone {
  id: string
  label: string
  state: MilestoneState
  date?: string
  note?: string
}

export interface Batch {
  id: string
  code: string
  factory: string
  units: number
  milestones: Milestone[]
}

export interface Order {
  id: string
  code: string
  brandSlug: string
  shipBy: string
  totalUnits: number
  status: OrderStatus
  lineItems: LineItem[]
  batchIds: string[]
  createdAt: string
}

export interface ActivityEvent {
  id: string
  at: string
  actor: string
  isSystem: boolean
  text: string
  brandSlug?: string
  orderId?: string
}

export type MessageAuthorRole = 'manufacturer' | 'brand' | 'system'

export interface Message {
  id: string
  orderId: string
  at: string
  authorRole: MessageAuthorRole
  authorName: string
  body: string
}

export const orderStatusLabel: Record<OrderStatus, string> = {
  received: 'Received',
  in_production: 'In production',
  shipped: 'Shipped',
  closed: 'Closed',
  on_hold: 'On hold',
}

export const milestoneStateLabel: Record<MilestoneState, string> = {
  done: 'Done',
  in_progress: 'In progress',
  todo: 'Upcoming',
  blocked: 'Blocked',
}
