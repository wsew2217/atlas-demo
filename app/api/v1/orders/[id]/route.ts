import { NextRequest } from 'next/server'
import { getOrder, getBatchesForOrder } from '@/lib/demo-db'
import { checkApiAuth, authError } from '@/lib/api/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = checkApiAuth(request)
  if (!auth.ok) return authError(auth)

  const { id } = await params
  const order = await getOrder(id)
  if (!order) {
    return Response.json(
      { error: 'Order not found', code: 'not_found' },
      { status: 404 },
    )
  }

  const batches = await getBatchesForOrder(order)

  return Response.json({
    data: {
      id: order.id,
      code: order.code,
      brand_slug: order.brandSlug,
      ship_by: order.shipBy,
      total_units: order.totalUnits,
      status: order.status,
      created_at: order.createdAt,
      line_items: order.lineItems.map((li) => ({
        id: li.id,
        sku: li.sku,
        description: li.description,
        color: li.color,
        size: li.size,
        units: li.units,
      })),
      batches: batches.map((b) => ({
        id: b.id,
        code: b.code,
        factory: b.factory,
        units: b.units,
        milestones: b.milestones.map((m) => ({
          id: m.id,
          label: m.label,
          state: m.state,
          date: m.date ?? null,
        })),
      })),
    },
  })
}
