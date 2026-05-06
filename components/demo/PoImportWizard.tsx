'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { extractPoFromPdf, type ExtractionResult } from '@/app/demo/_actions/extract-po'
import { createDemoPoAction } from '@/app/demo/_actions/create-demo-po'
import type { ImportedLineItem } from '@/lib/demo-pos-store'

type Phase = 'upload' | 'extracting' | 'review' | 'saving'

export function PoImportWizard() {
  const [phase, setPhase] = useState<Phase>('upload')
  const [error, setError] = useState<string | null>(null)
  const [extraction, setExtraction] = useState<ExtractionResult | null>(null)
  const [poCode, setPoCode] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [shipBy, setShipBy] = useState('')
  const [lineItems, setLineItems] = useState<ImportedLineItem[]>([])
  const [pending, startTransition] = useTransition()

  const handleSubmitUpload = (formData: FormData, useSample = false) => {
    setError(null)
    setPhase('extracting')
    if (useSample) formData.set('useSample', 'true')
    startTransition(async () => {
      const result = await extractPoFromPdf(formData)
      setExtraction(result)
      if (result.ok && result.data) {
        setPoCode(result.data.poCode)
        setCustomerName(result.data.customerName)
        setShipBy(result.data.shipBy)
        setLineItems(result.data.lineItems)
        setPhase('review')
      } else {
        setError(result.error ?? 'Extraction failed.')
        setPhase('upload')
      }
    })
  }

  const handleManual = () => {
    setExtraction(null)
    setPoCode('')
    setCustomerName('')
    setShipBy('')
    setLineItems([
      { sku: '', description: '', color: '', size: '', units: 0 },
    ])
    setPhase('review')
  }

  const updateLineItem = (i: number, patch: Partial<ImportedLineItem>) => {
    setLineItems((items) => items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)))
  }
  const removeLineItem = (i: number) => {
    setLineItems((items) => items.filter((_, idx) => idx !== i))
  }
  const addLineItem = () => {
    setLineItems((items) => [...items, { sku: '', description: '', color: '', size: '', units: 0 }])
  }

  const handleConfirm = () => {
    setError(null)
    setPhase('saving')
    startTransition(async () => {
      try {
        const source: 'pdf' | 'sample' | 'manual' =
          extraction?.source === 'claude' ? 'pdf' :
          extraction?.source === 'stub-sample' || extraction?.source === 'stub-no-key' ? 'sample' :
          'manual'
        await createDemoPoAction({
          poCode,
          customerName,
          shipBy,
          lineItems,
          source,
        })
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Couldn’t save the PO.')
        setPhase('review')
      }
    })
  }

  if (phase === 'upload' || phase === 'extracting') {
    return (
      <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
          Step 1 — Upload PO
        </p>
        <h2 className="mt-2 font-display text-2xl font-semibold leading-snug text-[var(--ink)]">
          Drop a PDF, use the sample, or enter manually
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">
          The demo extracts line items, ship-to, dates, and SKUs automatically using Claude. If
          no <code className="font-mono">ANTHROPIC_API_KEY</code> is set, you&rsquo;ll get a
          sample extraction so the flow still works.
        </p>

        <form
          action={(fd) => handleSubmitUpload(fd, false)}
          className="mt-6 space-y-4"
        >
          <label className="block">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
              PDF file
            </span>
            <input
              type="file"
              name="file"
              accept="application/pdf"
              required
              className="mt-2 block w-full rounded-md border border-[var(--border)] bg-[var(--cream)] px-3 py-2.5 text-sm text-[var(--ink)] file:mr-3 file:rounded-md file:border-0 file:bg-[var(--ink)] file:px-3 file:py-1 file:text-xs file:text-[var(--cream)] hover:file:opacity-90"
            />
            <p className="mt-1 font-mono text-[11px] text-[var(--muted)]">PDF only, up to 5MB</p>
          </label>
          <button
            type="submit"
            disabled={pending}
            className="rounded-md bg-[var(--ink)] px-5 py-2.5 text-sm font-medium text-[var(--cream)] transition hover:opacity-90 disabled:opacity-60"
          >
            {phase === 'extracting' ? 'Extracting with Claude…' : 'Extract from PDF'}
          </button>
        </form>

        <div className="mt-6 border-t border-[var(--border)] pt-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
            Don&rsquo;t have a PDF?
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <form action={(fd) => handleSubmitUpload(fd, true)}>
              <button
                type="submit"
                disabled={pending}
                className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--ink)] transition hover:bg-[var(--cream)] disabled:opacity-60"
              >
                Use sample PO →
              </button>
            </form>
            <button
              type="button"
              onClick={handleManual}
              disabled={pending}
              className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--ink)] transition hover:bg-[var(--cream)] disabled:opacity-60"
            >
              Enter manually
            </button>
          </div>
        </div>

        {error && (
          <p className="mt-6 rounded-md border border-[var(--alert)]/30 bg-[var(--alert)]/10 px-3 py-2 text-sm text-[var(--alert)]">
            {error}
          </p>
        )}
      </div>
    )
  }

  // review phase
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
            Step 2 — Review &amp; confirm
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold leading-snug text-[var(--ink)]">
            Verify the extraction
          </h2>
        </div>
        {extraction && (
          <ExtractionBadge source={extraction.source} />
        )}
      </div>
      <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">
        Edit anything that needs correcting. Adding line items? Use the row at the bottom.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Field label="PO code" value={poCode} onChange={setPoCode} placeholder="PO-2417" />
        <Field label="Customer" value={customerName} onChange={setCustomerName} placeholder="Riverbend Outfitters" />
        <Field label="Ship by" value={shipBy} onChange={setShipBy} placeholder="2026-08-22" mono />
      </div>

      <div className="mt-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
          Line items
        </p>
        <div className="mt-3 overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--cream)]">
          <table className="w-full text-sm">
            <thead className="bg-[var(--surface)] text-left text-xs uppercase tracking-wider text-[var(--muted)]">
              <tr>
                <th className="px-3 py-2 font-medium">SKU</th>
                <th className="px-3 py-2 font-medium">Description</th>
                <th className="px-3 py-2 font-medium">Color</th>
                <th className="px-3 py-2 font-medium">Size</th>
                <th className="px-3 py-2 text-right font-medium">Units</th>
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {lineItems.map((li, i) => (
                <tr key={i} className="border-t border-[var(--border)]">
                  <td className="px-3 py-2"><RowInput value={li.sku} onChange={(v) => updateLineItem(i, { sku: v })} mono /></td>
                  <td className="px-3 py-2"><RowInput value={li.description} onChange={(v) => updateLineItem(i, { description: v })} /></td>
                  <td className="px-3 py-2"><RowInput value={li.color} onChange={(v) => updateLineItem(i, { color: v })} /></td>
                  <td className="px-3 py-2"><RowInput value={li.size} onChange={(v) => updateLineItem(i, { size: v })} mono /></td>
                  <td className="px-3 py-2"><RowInput value={String(li.units)} onChange={(v) => updateLineItem(i, { units: Number(v) || 0 })} mono align="right" type="number" /></td>
                  <td className="px-3 py-2 text-right">
                    <button
                      type="button"
                      onClick={() => removeLineItem(i)}
                      className="rounded-md px-2 py-1 text-xs text-[var(--alert)] hover:bg-[var(--alert)]/10"
                      title="Remove line item"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="border-t border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-right">
            <button
              type="button"
              onClick={addLineItem}
              className="rounded-md border border-[var(--border)] bg-[var(--cream)] px-2.5 py-1 text-xs text-[var(--ink)] transition hover:bg-[var(--surface)]"
            >
              + Add line item
            </button>
          </div>
        </div>
        <p className="mt-3 text-xs text-[var(--muted)]">
          Total: {lineItems.reduce((sum, li) => sum + (li.units || 0), 0).toLocaleString()} units across{' '}
          {lineItems.length} {lineItems.length === 1 ? 'item' : 'items'}
        </p>
      </div>

      {error && (
        <p className="mt-6 rounded-md border border-[var(--alert)]/30 bg-[var(--alert)]/10 px-3 py-2 text-sm text-[var(--alert)]">
          {error}
        </p>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] pt-6">
        <button
          type="button"
          onClick={() => {
            setPhase('upload')
            setExtraction(null)
          }}
          className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--muted)] transition hover:text-[var(--ink)]"
        >
          ← Start over
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={pending || lineItems.length === 0}
          className="rounded-md bg-[var(--accent)] px-5 py-2 text-sm font-medium text-[var(--cream)] transition hover:opacity-90 disabled:opacity-60"
        >
          {phase === 'saving' ? 'Saving…' : 'Confirm & import PO'}
        </button>
      </div>
    </div>
  )
}

function ExtractionBadge({ source }: { source: ExtractionResult['source'] }) {
  if (source === 'claude') {
    return (
      <span className="rounded-full bg-[var(--good)]/15 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--good)]">
        Extracted by Claude
      </span>
    )
  }
  if (source === 'stub-no-key') {
    return (
      <span className="rounded-full bg-[var(--accent)]/15 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent)]">
        Demo · sample (no API key)
      </span>
    )
  }
  if (source === 'stub-sample') {
    return (
      <span className="rounded-full bg-[var(--accent)]/15 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent)]">
        Sample PO
      </span>
    )
  }
  return null
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  mono,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  mono?: boolean
}) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`mt-2 w-full rounded-md border border-[var(--border)] bg-[var(--cream)] px-3 py-2 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--accent)] focus:bg-[var(--surface)] ${
          mono ? 'font-mono' : ''
        }`}
      />
    </label>
  )
}

function RowInput({
  value,
  onChange,
  mono,
  align,
  type = 'text',
}: {
  value: string
  onChange: (v: string) => void
  mono?: boolean
  align?: 'right'
  type?: 'text' | 'number'
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full rounded-md border border-transparent bg-transparent px-2 py-1 text-xs text-[var(--ink)] outline-none transition focus:border-[var(--accent)] focus:bg-[var(--surface)] ${
        mono ? 'font-mono' : ''
      } ${align === 'right' ? 'text-right' : ''}`}
    />
  )
}
