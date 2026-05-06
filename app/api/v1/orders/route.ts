import { NextRequest } from 'next/server'
import { listOrders } from '@/lib/demo-db'
import { checkApiAuth, authError } from '@/lib/api/auth'

export async function GET(request: NextRequest) {
  const auth = checkApiAuth(request)
  if (!auth.ok) return authError(auth)

  const orders = await listOrders()
  return Response.json({
    data: orders.map((o) => ({
      id: o.id,
      code: o.code,
      brand_slug: o.brandSlug,
      ship_by: o.shipBy,
      total_units: o.totalUnits,
      status: o.status,
      created_at: o.createdAt,
      line_item_count: o.lineItems.length,
      batch_ids: o.batchIds,
    })),
    meta: {
      count: orders.length,
      total: orders.length,
    },
  })
}

interface CreateOrderBody {
  code?: string
  brand_slug?: string
  ship_by?: string
  line_items?: { sku: string; description: string; color: string; size: string; units: number }[]
}

export async function POST(request: NextRequest) {
  const auth = checkApiAuth(request)
  if (!auth.ok) return authError(auth)

  let body: CreateOrderBody
  try {
    body = (await request.json()) as CreateOrderBody
  } catch {
    return Response.json(
      { error: 'Invalid JSON body.', code: 'invalid_request' },
      { status: 400 },
    )
  }

  const errors: string[] = []
  if (!body.code) errors.push('code is required')
  if (!body.brand_slug) errors.push('brand_slug is required')
  if (!body.ship_by) errors.push('ship_by is required (YYYY-MM-DD)')
  if (!Array.isArray(body.line_items) || body.line_items.length === 0) {
    errors.push('line_items must be a non-empty array')
  }
  if (errors.length > 0) {
    return Response.json(
      { error: 'Validation failed', code: 'invalid_request', details: errors },
      { status: 422 },
    )
  }

  const totalUnits = (body.line_items ?? []).reduce((sum, li) => sum + (li.units ?? 0), 0)

  // Demo: this endpoint validates and returns "would-create" response without persisting.
  // In production this would INSERT into demo_orders + demo_line_items and trigger webhooks.
  return Response.json(
    {
      data: {
        id: `ord-${Date.now().toString(36)}`,
        code: body.code,
        brand_slug: body.brand_slug,
        ship_by: body.ship_by,
        total_units: totalUnits,
        status: 'received',
        line_items_received: body.line_items?.length ?? 0,
        created_at: new Date().toISOString(),
      },
      demo_note: 'Order validated and accepted. In production this would persist; in the demo no DB write occurs.',
    },
    { status: 201 },
  )
}
