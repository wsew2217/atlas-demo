'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import {
  appendImportedPo,
  slugifyPoCode,
  type ImportedLineItem,
  type ImportedPo,
} from '@/lib/demo-pos-store'

export interface CreatePoInput {
  poCode: string
  customerName: string
  shipBy: string
  lineItems: ImportedLineItem[]
  source: 'pdf' | 'sample' | 'manual'
}

export async function createDemoPoAction(input: CreatePoInput) {
  const poCode = input.poCode.trim() || `PO-${Date.now().toString().slice(-5)}`
  const customerName = input.customerName.trim() || 'New customer'
  const shipBy = input.shipBy.trim() || new Date().toISOString().slice(0, 10)
  const lineItems = (input.lineItems ?? [])
    .map((li) => ({
      sku: (li.sku ?? '').toString().trim(),
      description: (li.description ?? '').toString().trim(),
      color: (li.color ?? '').toString().trim(),
      size: (li.size ?? '').toString().trim(),
      units: typeof li.units === 'number' ? Math.max(0, Math.floor(li.units)) : 0,
    }))
    .filter((li) => li.sku || li.description)

  if (lineItems.length === 0) {
    throw new Error('Add at least one line item before importing.')
  }

  const totalUnits = lineItems.reduce((sum, li) => sum + li.units, 0)
  const slug = `${slugifyPoCode(poCode)}-${Date.now().toString(36).slice(-4)}`

  const po: ImportedPo = {
    slug,
    poCode,
    customerName,
    shipBy,
    lineItems,
    totalUnits,
    importedAt: new Date().toISOString(),
    source: input.source,
  }

  await appendImportedPo(po)

  revalidatePath('/demo/full/orders')
  revalidatePath('/demo/full')
  redirect(`/demo/full/orders/imported/${slug}`)
}
