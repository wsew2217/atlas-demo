import 'server-only'
import { supabase } from './supabase'
import type {
  ActivityEvent,
  Batch,
  Brand,
  LineItem,
  Message,
  MessageAuthorRole,
  Milestone,
  MilestoneState,
  Order,
  OrderStatus,
} from './demo-data'

// ---------- row mappers ----------

interface BrandRow {
  slug: string
  name: string
  primary_color: string
  contact: string
  contact_email: string
}
function rowToBrand(r: BrandRow): Brand {
  return {
    slug: r.slug,
    name: r.name,
    primary: r.primary_color,
    contact: r.contact,
    contactEmail: r.contact_email,
  }
}

interface LineItemRow {
  id: string
  sku: string
  description: string
  size: string
  color: string
  units: number
}
function rowToLineItem(r: LineItemRow): LineItem {
  return {
    id: r.id,
    sku: r.sku,
    description: r.description,
    size: r.size,
    color: r.color,
    units: r.units,
  }
}

interface OrderRow {
  id: string
  code: string
  brand_slug: string
  ship_by: string
  total_units: number
  status: OrderStatus
  created_at: string
}
function rowToOrder(r: OrderRow, lineItems: LineItem[], batchIds: string[]): Order {
  return {
    id: r.id,
    code: r.code,
    brandSlug: r.brand_slug,
    shipBy: r.ship_by,
    totalUnits: r.total_units,
    status: r.status,
    createdAt: r.created_at,
    lineItems,
    batchIds,
  }
}

interface MilestoneRow {
  id: string
  batch_id: string
  label: string
  state: MilestoneState
  date: string | null
  note: string | null
  seq: number
}
function rowToMilestone(r: MilestoneRow): Milestone {
  return {
    id: r.id,
    label: r.label,
    state: r.state,
    date: r.date ?? undefined,
    note: r.note ?? undefined,
  }
}

interface BatchRow {
  id: string
  code: string
  factory: string
  units: number
}
function rowToBatch(r: BatchRow, milestones: Milestone[]): Batch {
  return { id: r.id, code: r.code, factory: r.factory, units: r.units, milestones }
}

interface MessageRow {
  id: string
  order_id: string
  at: string
  author_role: MessageAuthorRole
  author_name: string
  body: string
}
function rowToMessage(r: MessageRow): Message {
  return {
    id: r.id,
    orderId: r.order_id,
    at: r.at,
    authorRole: r.author_role,
    authorName: r.author_name,
    body: r.body,
  }
}

interface ActivityRow {
  id: string
  at: string
  actor: string
  is_system: boolean
  body: string
  brand_slug: string | null
  order_id: string | null
}
function rowToActivity(r: ActivityRow): ActivityEvent {
  return {
    id: r.id,
    at: r.at,
    actor: r.actor,
    isSystem: r.is_system,
    text: r.body,
    brandSlug: r.brand_slug ?? undefined,
    orderId: r.order_id ?? undefined,
  }
}

// ---------- brands ----------

export async function getBrand(slug: string): Promise<Brand | undefined> {
  const { data } = await supabase
    .from('demo_brands')
    .select('*')
    .eq('slug', slug)
    .maybeSingle<BrandRow>()
  return data ? rowToBrand(data) : undefined
}

export async function listBrands(): Promise<Brand[]> {
  const { data } = await supabase
    .from('demo_brands')
    .select('*')
    .order('name')
    .returns<BrandRow[]>()
  return (data ?? []).map(rowToBrand)
}

// ---------- orders ----------

async function getLineItemsForOrder(orderId: string): Promise<LineItem[]> {
  const { data } = await supabase
    .from('demo_line_items')
    .select('*')
    .eq('order_id', orderId)
    .order('seq')
    .returns<LineItemRow[]>()
  return (data ?? []).map(rowToLineItem)
}

async function getBatchIdsForOrder(orderId: string): Promise<string[]> {
  const { data } = await supabase
    .from('demo_order_batches')
    .select('batch_id')
    .eq('order_id', orderId)
    .order('seq')
    .returns<{ batch_id: string }[]>()
  return (data ?? []).map((r) => r.batch_id)
}

async function fetchBatchIdsByOrder(orderIds: string[]): Promise<Map<string, string[]>> {
  const map = new Map<string, string[]>()
  if (orderIds.length === 0) return map
  const { data } = await supabase
    .from('demo_order_batches')
    .select('order_id, batch_id, seq')
    .in('order_id', orderIds)
    .order('seq')
    .returns<{ order_id: string; batch_id: string; seq: number }[]>()
  for (const r of data ?? []) {
    const list = map.get(r.order_id) ?? []
    list.push(r.batch_id)
    map.set(r.order_id, list)
  }
  return map
}

async function fetchLineItemsByOrder(orderIds: string[]): Promise<Map<string, LineItem[]>> {
  const map = new Map<string, LineItem[]>()
  if (orderIds.length === 0) return map
  const { data } = await supabase
    .from('demo_line_items')
    .select('*')
    .in('order_id', orderIds)
    .order('seq')
    .returns<(LineItemRow & { order_id: string })[]>()
  for (const r of data ?? []) {
    const list = map.get(r.order_id) ?? []
    list.push(rowToLineItem(r))
    map.set(r.order_id, list)
  }
  return map
}

export async function getOrder(id: string): Promise<Order | undefined> {
  const { data } = await supabase
    .from('demo_orders')
    .select('*')
    .eq('id', id)
    .maybeSingle<OrderRow>()
  if (!data) return undefined
  const [lineItems, batchIds] = await Promise.all([
    getLineItemsForOrder(id),
    getBatchIdsForOrder(id),
  ])
  return rowToOrder(data, lineItems, batchIds)
}

async function enrichOrders(rows: OrderRow[]): Promise<Order[]> {
  if (rows.length === 0) return []
  const ids = rows.map((r) => r.id)
  const [batchIdsByOrder, lineItemsByOrder] = await Promise.all([
    fetchBatchIdsByOrder(ids),
    fetchLineItemsByOrder(ids),
  ])
  return rows.map((r) =>
    rowToOrder(r, lineItemsByOrder.get(r.id) ?? [], batchIdsByOrder.get(r.id) ?? []),
  )
}

export async function listOrders(): Promise<Order[]> {
  const { data } = await supabase
    .from('demo_orders')
    .select('*')
    .order('created_at', { ascending: false })
    .returns<OrderRow[]>()
  return enrichOrders(data ?? [])
}

export async function getOrdersForBrand(slug: string): Promise<Order[]> {
  const { data } = await supabase
    .from('demo_orders')
    .select('*')
    .eq('brand_slug', slug)
    .order('created_at', { ascending: false })
    .returns<OrderRow[]>()
  return enrichOrders(data ?? [])
}

export async function getOrderForBatch(batchId: string): Promise<Order | undefined> {
  const { data } = await supabase
    .from('demo_order_batches')
    .select('order_id')
    .eq('batch_id', batchId)
    .maybeSingle<{ order_id: string }>()
  if (!data) return undefined
  return getOrder(data.order_id)
}

// ---------- batches ----------

async function fetchMilestonesByBatchIds(
  batchIds: string[],
): Promise<Map<string, Milestone[]>> {
  const map = new Map<string, Milestone[]>()
  if (batchIds.length === 0) return map
  const { data } = await supabase
    .from('demo_milestones')
    .select('*')
    .in('batch_id', batchIds)
    .order('seq')
    .returns<MilestoneRow[]>()
  for (const row of data ?? []) {
    const list = map.get(row.batch_id) ?? []
    list.push(rowToMilestone(row))
    map.set(row.batch_id, list)
  }
  return map
}

export async function getBatch(id: string): Promise<Batch | undefined> {
  const { data } = await supabase
    .from('demo_batches')
    .select('*')
    .eq('id', id)
    .maybeSingle<BatchRow>()
  if (!data) return undefined
  const milestonesMap = await fetchMilestonesByBatchIds([id])
  return rowToBatch(data, milestonesMap.get(id) ?? [])
}

export async function getBatchesForOrder(order: Order): Promise<Batch[]> {
  if (order.batchIds.length === 0) return []
  const [{ data }, milestonesMap] = await Promise.all([
    supabase
      .from('demo_batches')
      .select('*')
      .in('id', order.batchIds)
      .returns<BatchRow[]>(),
    fetchMilestonesByBatchIds(order.batchIds),
  ])
  const byId = new Map((data ?? []).map((r) => [r.id, r]))
  return order.batchIds
    .map((id) => byId.get(id))
    .filter((r): r is BatchRow => Boolean(r))
    .map((r) => rowToBatch(r, milestonesMap.get(r.id) ?? []))
}

export async function listBatches(): Promise<Batch[]> {
  const { data } = await supabase
    .from('demo_batches')
    .select('*')
    .order('code')
    .returns<BatchRow[]>()
  if (!data) return []
  const milestonesMap = await fetchMilestonesByBatchIds(data.map((r) => r.id))
  return data.map((r) => rowToBatch(r, milestonesMap.get(r.id) ?? []))
}

export async function getBatchesForFactory(factoryQuery: string): Promise<Batch[]> {
  const { data } = await supabase
    .from('demo_batches')
    .select('*')
    .ilike('factory', `%${factoryQuery}%`)
    .order('code')
    .returns<BatchRow[]>()
  if (!data) return []
  const milestonesMap = await fetchMilestonesByBatchIds(data.map((r) => r.id))
  return data.map((r) => rowToBatch(r, milestonesMap.get(r.id) ?? []))
}

// ---------- messages ----------

export async function getMessagesForOrder(orderId: string): Promise<Message[]> {
  const { data } = await supabase
    .from('demo_messages')
    .select('*')
    .eq('order_id', orderId)
    .order('at')
    .returns<MessageRow[]>()
  return (data ?? []).map(rowToMessage)
}

// ---------- activity ----------

export async function getActivityForBrand(slug: string): Promise<ActivityEvent[]> {
  const { data } = await supabase
    .from('demo_activity')
    .select('*')
    .eq('brand_slug', slug)
    .order('at', { ascending: false })
    .returns<ActivityRow[]>()
  return (data ?? []).map(rowToActivity)
}

export async function listActivity(limit = 6): Promise<ActivityEvent[]> {
  const { data } = await supabase
    .from('demo_activity')
    .select('*')
    .order('at', { ascending: false })
    .limit(limit)
    .returns<ActivityRow[]>()
  return (data ?? []).map(rowToActivity)
}
