'use server'

import Anthropic from '@anthropic-ai/sdk'
import type { ImportedLineItem } from '@/lib/demo-pos-store'

export interface ExtractionResult {
  ok: boolean
  source: 'claude' | 'stub-no-key' | 'stub-sample' | 'error'
  error?: string
  data?: {
    poCode: string
    customerName: string
    shipBy: string
    lineItems: ImportedLineItem[]
  }
}

const SAMPLE_EXTRACTION: ExtractionResult['data'] = {
  poCode: `PO-${2400 + Math.floor(Math.random() * 100)}`,
  customerName: 'Riverbend Outfitters',
  shipBy: '2026-08-22',
  lineItems: [
    { sku: 'RBO-JACKET-FOR-S',  description: 'Forest jacket', color: 'Forest',   size: 'S',  units: 200 },
    { sku: 'RBO-JACKET-FOR-M',  description: 'Forest jacket', color: 'Forest',   size: 'M',  units: 350 },
    { sku: 'RBO-JACKET-FOR-L',  description: 'Forest jacket', color: 'Forest',   size: 'L',  units: 300 },
    { sku: 'RBO-JACKET-FOR-XL', description: 'Forest jacket', color: 'Forest',   size: 'XL', units: 150 },
  ],
}

export async function extractPoFromPdf(formData: FormData): Promise<ExtractionResult> {
  const useSample = formData.get('useSample') === 'true'

  if (useSample) {
    return { ok: true, source: 'stub-sample', data: SAMPLE_EXTRACTION }
  }

  const file = formData.get('file')
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, source: 'error', error: 'Please select a PDF file or use the sample option.' }
  }
  if (file.type !== 'application/pdf') {
    return { ok: false, source: 'error', error: 'File must be a PDF.' }
  }
  if (file.size > 5 * 1024 * 1024) {
    return { ok: false, source: 'error', error: 'PDF must be under 5MB for the demo.' }
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return {
      ok: true,
      source: 'stub-no-key',
      data: SAMPLE_EXTRACTION,
    }
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer())
    const base64 = buffer.toString('base64')

    const anthropic = new Anthropic({ apiKey })
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      tools: [
        {
          name: 'submit_po_extraction',
          description: 'Submit the extracted purchase order data from the PDF.',
          input_schema: {
            type: 'object',
            properties: {
              poCode: {
                type: 'string',
                description: 'The PO number/code (e.g. PO-2417, PO-12345).',
              },
              customerName: {
                type: 'string',
                description: 'The buyer / customer organization name.',
              },
              shipBy: {
                type: 'string',
                description: 'Ship-by date in YYYY-MM-DD format.',
              },
              lineItems: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    sku:         { type: 'string' },
                    description: { type: 'string' },
                    color:       { type: 'string' },
                    size:        { type: 'string' },
                    units:       { type: 'number' },
                  },
                  required: ['sku', 'description', 'color', 'size', 'units'],
                },
              },
            },
            required: ['poCode', 'customerName', 'shipBy', 'lineItems'],
          },
        },
      ],
      tool_choice: { type: 'tool', name: 'submit_po_extraction' },
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'document',
              source: {
                type: 'base64',
                media_type: 'application/pdf',
                data: base64,
              },
            },
            {
              type: 'text',
              text:
                'Extract the purchase order data from this PDF using the submit_po_extraction tool. ' +
                'Each color/size variant is a separate line item. For ship-by dates use YYYY-MM-DD format. ' +
                'If a field is genuinely unclear from the PDF, use a sensible default rather than failing.',
            },
          ],
        },
      ],
    })

    const toolUse = response.content.find((c) => c.type === 'tool_use')
    if (!toolUse || toolUse.type !== 'tool_use') {
      return { ok: false, source: 'error', error: 'Claude did not return structured data.' }
    }

    const data = toolUse.input as ExtractionResult['data']
    if (!data) {
      return { ok: false, source: 'error', error: 'No data extracted.' }
    }

    return { ok: true, source: 'claude', data }
  } catch (err) {
    console.error('[extract-po] error', err)
    return {
      ok: false,
      source: 'error',
      error: err instanceof Error ? err.message : 'Extraction failed.',
    }
  }
}
