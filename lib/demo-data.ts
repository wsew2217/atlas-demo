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

export const brands: Brand[] = [
  {
    slug: 'summit',
    name: 'Summit Athletics',
    primary: '#14532D',
    contact: 'Mira Chen',
    contactEmail: 'mira@summitathletics.com',
  },
  {
    slug: 'meridian',
    name: 'Meridian Apparel',
    primary: '#1E3A8A',
    contact: 'Jordan Pike',
    contactEmail: 'jordan@meridianapparel.com',
  },
]

export const batches: Batch[] = [
  {
    id: 'batch-001',
    code: 'B-2417-A',
    factory: 'Suzhou Plant 2 · China',
    units: 2400,
    milestones: [
      { id: 'm1', label: 'Materials sourced',   state: 'done',        date: '2026-04-22' },
      { id: 'm2', label: 'Cut & sew started',   state: 'done',        date: '2026-04-30' },
      { id: 'm3', label: 'Production midpoint', state: 'in_progress', date: '2026-05-08' },
      { id: 'm4', label: 'QC pass',             state: 'todo' },
      { id: 'm5', label: 'Pack & ship',         state: 'todo' },
    ],
  },
  {
    id: 'batch-002',
    code: 'B-2418',
    factory: 'Phnom Penh Plant 1 · Cambodia',
    units: 1200,
    milestones: [
      { id: 'm1', label: 'Materials sourced',   state: 'done',        date: '2026-04-15' },
      { id: 'm2', label: 'Cut & sew started',   state: 'done',        date: '2026-04-21' },
      { id: 'm3', label: 'Production midpoint', state: 'done',        date: '2026-04-29' },
      { id: 'm4', label: 'QC pass',             state: 'in_progress', date: '2026-05-05' },
      { id: 'm5', label: 'Pack & ship',         state: 'todo' },
    ],
  },
  {
    id: 'batch-003',
    code: 'B-2421',
    factory: 'Suzhou Plant 2 · China',
    units: 850,
    milestones: [
      { id: 'm1', label: 'Materials sourced',   state: 'done',         date: '2026-05-01' },
      { id: 'm2', label: 'Cut & sew started',   state: 'in_progress',  date: '2026-05-04' },
      { id: 'm3', label: 'Production midpoint', state: 'todo' },
      { id: 'm4', label: 'QC pass',             state: 'todo' },
      { id: 'm5', label: 'Pack & ship',         state: 'todo' },
    ],
  },
  {
    id: 'batch-004',
    code: 'B-2402',
    factory: 'Phnom Penh Plant 1 · Cambodia',
    units: 3200,
    milestones: [
      { id: 'm1', label: 'Materials sourced',   state: 'done', date: '2026-02-10' },
      { id: 'm2', label: 'Cut & sew started',   state: 'done', date: '2026-02-18' },
      { id: 'm3', label: 'Production midpoint', state: 'done', date: '2026-03-02' },
      { id: 'm4', label: 'QC pass',             state: 'done', date: '2026-03-15' },
      { id: 'm5', label: 'Pack & ship',         state: 'done', date: '2026-03-22' },
    ],
  },
]

export const orders: Order[] = [
  {
    id: 'ord-001',
    code: 'PO-2417',
    brandSlug: 'summit',
    shipBy: '2026-06-10',
    totalUnits: 2400,
    status: 'in_production',
    createdAt: '2026-04-12',
    lineItems: [
      { id: 'li-001', sku: 'SMT-HOOD-NV-S',  description: 'Heavyweight hoodie', size: 'S',  color: 'Navy', units: 600 },
      { id: 'li-002', sku: 'SMT-HOOD-NV-M',  description: 'Heavyweight hoodie', size: 'M',  color: 'Navy', units: 900 },
      { id: 'li-003', sku: 'SMT-HOOD-NV-L',  description: 'Heavyweight hoodie', size: 'L',  color: 'Navy', units: 600 },
      { id: 'li-004', sku: 'SMT-HOOD-NV-XL', description: 'Heavyweight hoodie', size: 'XL', color: 'Navy', units: 300 },
    ],
    batchIds: ['batch-001'],
  },
  {
    id: 'ord-002',
    code: 'PO-2418',
    brandSlug: 'summit',
    shipBy: '2026-05-22',
    totalUnits: 1200,
    status: 'in_production',
    createdAt: '2026-04-05',
    lineItems: [
      { id: 'li-005', sku: 'SMT-TEE-WH-S',  description: 'Performance tee', size: 'S',  color: 'White', units: 300 },
      { id: 'li-006', sku: 'SMT-TEE-WH-M',  description: 'Performance tee', size: 'M',  color: 'White', units: 450 },
      { id: 'li-007', sku: 'SMT-TEE-WH-L',  description: 'Performance tee', size: 'L',  color: 'White', units: 300 },
      { id: 'li-008', sku: 'SMT-TEE-WH-XL', description: 'Performance tee', size: 'XL', color: 'White', units: 150 },
    ],
    batchIds: ['batch-002'],
  },
  {
    id: 'ord-003',
    code: 'PO-2421',
    brandSlug: 'meridian',
    shipBy: '2026-07-04',
    totalUnits: 850,
    status: 'in_production',
    createdAt: '2026-04-26',
    lineItems: [
      { id: 'li-009', sku: 'MRD-COAT-CH-S', description: 'Charcoal trench',   size: 'S', color: 'Charcoal', units: 200 },
      { id: 'li-010', sku: 'MRD-COAT-CH-M', description: 'Charcoal trench',   size: 'M', color: 'Charcoal', units: 350 },
      { id: 'li-011', sku: 'MRD-COAT-CH-L', description: 'Charcoal trench',   size: 'L', color: 'Charcoal', units: 300 },
    ],
    batchIds: ['batch-003'],
  },
  {
    id: 'ord-004',
    code: 'PO-2425',
    brandSlug: 'meridian',
    shipBy: '2026-08-15',
    totalUnits: 1800,
    status: 'received',
    createdAt: '2026-05-02',
    lineItems: [
      { id: 'li-012', sku: 'MRD-SHRT-OX-S', description: 'Oxford shirt', size: 'S', color: 'Oxford Blue', units: 400 },
      { id: 'li-013', sku: 'MRD-SHRT-OX-M', description: 'Oxford shirt', size: 'M', color: 'Oxford Blue', units: 700 },
      { id: 'li-014', sku: 'MRD-SHRT-OX-L', description: 'Oxford shirt', size: 'L', color: 'Oxford Blue', units: 500 },
      { id: 'li-015', sku: 'MRD-SHRT-OX-XL',description: 'Oxford shirt', size: 'XL',color: 'Oxford Blue', units: 200 },
    ],
    batchIds: [],
  },
  {
    id: 'ord-005',
    code: 'PO-2402',
    brandSlug: 'summit',
    shipBy: '2026-04-01',
    totalUnits: 3200,
    status: 'shipped',
    createdAt: '2026-01-28',
    lineItems: [
      { id: 'li-016', sku: 'SMT-FLEECE-BK-M', description: 'Fleece pullover', size: 'M', color: 'Black', units: 1200 },
      { id: 'li-017', sku: 'SMT-FLEECE-BK-L', description: 'Fleece pullover', size: 'L', color: 'Black', units: 1100 },
      { id: 'li-018', sku: 'SMT-FLEECE-BK-XL',description: 'Fleece pullover', size: 'XL',color: 'Black', units: 900 },
    ],
    batchIds: ['batch-004'],
  },
]

export const activity: ActivityEvent[] = [
  { id: 'a-001', at: '2026-05-05T09:42:00Z', actor: 'system',     isSystem: true,  text: 'Batch B-2417-A reached production midpoint at Suzhou Plant 2.', brandSlug: 'summit',   orderId: 'ord-001' },
  { id: 'a-002', at: '2026-05-05T08:10:00Z', actor: 'Cici Yuan',  isSystem: false, text: 'Uploaded inline QC photos for batch B-2418.',                     brandSlug: 'summit',   orderId: 'ord-002' },
  { id: 'a-003', at: '2026-05-04T16:32:00Z', actor: 'system',     isSystem: true,  text: 'PO-2425 received from Meridian Apparel — 1,800 units.',           brandSlug: 'meridian', orderId: 'ord-004' },
  { id: 'a-004', at: '2026-05-04T11:15:00Z', actor: 'Mira Chen',  isSystem: false, text: 'Approved sample fit on PO-2417 hoodies.',                          brandSlug: 'summit',   orderId: 'ord-001' },
  { id: 'a-005', at: '2026-05-04T09:20:00Z', actor: 'system',     isSystem: true,  text: 'Batch B-2421 entered cut & sew at Suzhou Plant 2.',                brandSlug: 'meridian', orderId: 'ord-003' },
  { id: 'a-006', at: '2026-05-03T14:48:00Z', actor: 'Peter',      isSystem: false, text: 'Confirmed factory allocation for PO-2425 — assigning Phnom Penh.', brandSlug: 'meridian', orderId: 'ord-004' },
  { id: 'a-007', at: '2026-03-22T18:00:00Z', actor: 'system',     isSystem: true,  text: 'Batch B-2402 shipped from Phnom Penh — 3,200 units.',              brandSlug: 'summit',   orderId: 'ord-005' },
]

export const messages: Message[] = [
  // PO-2417 — Summit hoodies
  { id: 'msg-001', orderId: 'ord-001', at: '2026-04-22T14:10:00Z', authorRole: 'system',       authorName: 'system',     body: 'Materials sourced for batch B-2417-A at Suzhou Plant 2.' },
  { id: 'msg-002', orderId: 'ord-001', at: '2026-04-23T09:02:00Z', authorRole: 'manufacturer', authorName: 'Robert',     body: 'Materials in early — moving cut start up by ~24h. Heads up on slight color shift in the navy lot, sample en route.' },
  { id: 'msg-003', orderId: 'ord-001', at: '2026-04-23T16:48:00Z', authorRole: 'brand',        authorName: 'Mira Chen',  body: 'Thanks for the early call. Can we get a sample photo when the first 50 are off the line?' },
  { id: 'msg-004', orderId: 'ord-001', at: '2026-04-24T07:15:00Z', authorRole: 'manufacturer', authorName: 'Cici Yuan',  body: 'Will do. Photos posted by EOD tomorrow.' },
  { id: 'msg-005', orderId: 'ord-001', at: '2026-05-04T11:15:00Z', authorRole: 'brand',        authorName: 'Mira Chen',  body: 'Approved sample fit. Cleared to keep going.' },
  { id: 'msg-006', orderId: 'ord-001', at: '2026-05-05T09:42:00Z', authorRole: 'system',       authorName: 'system',     body: 'Batch B-2417-A reached production midpoint.' },

  // PO-2418 — Summit perf tee
  { id: 'msg-010', orderId: 'ord-002', at: '2026-04-21T08:30:00Z', authorRole: 'system',       authorName: 'system',     body: 'Cut & sew started at Phnom Penh Plant 1.' },
  { id: 'msg-011', orderId: 'ord-002', at: '2026-05-04T08:10:00Z', authorRole: 'manufacturer', authorName: 'Cici Yuan',  body: 'Inline QC photos uploaded — see attached batch record.' },
  { id: 'msg-012', orderId: 'ord-002', at: '2026-05-05T08:15:00Z', authorRole: 'system',       authorName: 'system',     body: 'Batch B-2418 entered final QC.' },

  // PO-2421 — Meridian trench
  { id: 'msg-020', orderId: 'ord-003', at: '2026-05-04T09:20:00Z', authorRole: 'system',       authorName: 'system',     body: 'Batch B-2421 entered cut & sew at Suzhou Plant 2.' },
  { id: 'msg-021', orderId: 'ord-003', at: '2026-05-04T15:00:00Z', authorRole: 'brand',        authorName: 'Jordan Pike',body: 'Confirming charcoal stays the spec — please don\'t substitute. Last season we got a different lot and it threw the color story.' },
  { id: 'msg-022', orderId: 'ord-003', at: '2026-05-04T18:42:00Z', authorRole: 'manufacturer', authorName: 'Robert',     body: 'Confirmed — same charcoal mill, same lot family. We\'ll send a swatch with the first run.' },

  // PO-2425 — Meridian oxford (just received)
  { id: 'msg-030', orderId: 'ord-004', at: '2026-05-04T16:32:00Z', authorRole: 'system',       authorName: 'system',     body: 'PO-2425 received — 1,800 units oxford shirt, ship by 2026-08-15.' },
  { id: 'msg-031', orderId: 'ord-004', at: '2026-05-03T14:48:00Z', authorRole: 'manufacturer', authorName: 'Peter',      body: 'Allocating Phnom Penh for this one — capacity confirmed for early July start.' },
]

export function getBrand(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug)
}

export function getOrder(id: string): Order | undefined {
  return orders.find((o) => o.id === id)
}

export function getOrdersForBrand(slug: string): Order[] {
  return orders.filter((o) => o.brandSlug === slug)
}

export function getBatch(id: string): Batch | undefined {
  return batches.find((b) => b.id === id)
}

export function getBatchesForOrder(order: Order): Batch[] {
  return order.batchIds.map((id) => getBatch(id)).filter((b): b is Batch => Boolean(b))
}

export function getActivityForBrand(slug: string): ActivityEvent[] {
  return activity.filter((a) => a.brandSlug === slug)
}

export function getMessagesForOrder(orderId: string): Message[] {
  return messages
    .filter((m) => m.orderId === orderId)
    .sort((a, b) => a.at.localeCompare(b.at))
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
