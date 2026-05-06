import Link from 'next/link'
import { listBatches, listBrands, getOrderForBatch } from '@/lib/demo-db'
import { loadBatchesWithOverrides } from '@/lib/demo-batch-store'
import { AdvanceMilestoneButton } from '@/components/demo/AdvanceMilestoneButton'
import type { Batch, Order, Brand } from '@/lib/demo-data'
import { milestoneStateLabel } from '@/lib/demo-data'

export const metadata = {
  title: 'Atlas Full Demo · Batches',
  robots: { index: false, follow: false },
}

type BatchStatus = 'in_progress' | 'complete' | 'todo'

function deriveStatus(b: Batch): BatchStatus {
  if (b.milestones.every((m) => m.state === 'done')) return 'complete'
  if (b.milestones.some((m) => m.state === 'in_progress')) return 'in_progress'
  return 'todo'
}

function progressPct(b: Batch): number {
  if (b.milestones.length === 0) return 0
  const done = b.milestones.filter((m) => m.state === 'done').length
  return Math.round((done / b.milestones.length) * 100)
}

const statusLabel: Record<BatchStatus, string> = {
  in_progress: 'In progress',
  complete: 'Complete',
  todo: 'Not started',
}

const statusTone: Record<BatchStatus, string> = {
  in_progress: 'bg-[var(--accent)]/15 text-[var(--accent)]',
  complete: 'bg-[var(--good)]/15 text-[var(--good)]',
  todo: 'bg-[var(--ink)]/10 text-[var(--muted)]',
}

interface SearchParams {
  factory?: string
  customer?: string
  status?: string
  sort?: string
  dir?: string
}

type SortKey = 'code' | 'factory' | 'units' | 'progress' | 'status'
type SortDir = 'asc' | 'desc'

export default async function FullDemoBatchesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const sp = await searchParams
  const [batchesRaw, brands] = await Promise.all([listBatches(), listBrands()])
  const batches = await loadBatchesWithOverrides(batchesRaw)
  const brandsBySlug = new Map(brands.map((b) => [b.slug, b]))

  // Pre-fetch order + brand for each batch (parallel)
  const orderByBatchId = new Map<string, Order>()
  const brandByBatchId = new Map<string, Brand>()
  await Promise.all(
    batches.map(async (b) => {
      const o = await getOrderForBatch(b.id)
      if (!o) return
      orderByBatchId.set(b.id, o)
      const br = brandsBySlug.get(o.brandSlug)
      if (br) brandByBatchId.set(b.id, br)
    }),
  )

  const factories = [...new Set(batches.map((b) => b.factory))].sort()

  // Filter
  const factoryFilter = sp.factory || ''
  const customerFilter = sp.customer || ''
  const statusFilter = (sp.status as BatchStatus) || ''

  const filtered = batches.filter((b) => {
    if (factoryFilter && b.factory !== factoryFilter) return false
    if (statusFilter && deriveStatus(b) !== statusFilter) return false
    if (customerFilter) {
      const o = orderByBatchId.get(b.id)
      if (!o || o.brandSlug !== customerFilter) return false
    }
    return true
  })

  // Sort
  const sortKey = (sp.sort as SortKey) || 'code'
  const sortDir: SortDir = sp.dir === 'desc' ? 'desc' : 'asc'
  const dir = sortDir === 'asc' ? 1 : -1

  const sorted = [...filtered].sort((a, b) => {
    if (sortKey === 'code')     return a.code.localeCompare(b.code) * dir
    if (sortKey === 'factory')  return a.factory.localeCompare(b.factory) * dir
    if (sortKey === 'units')    return (a.units - b.units) * dir
    if (sortKey === 'progress') return (progressPct(a) - progressPct(b)) * dir
    if (sortKey === 'status') {
      const order: Record<BatchStatus, number> = { in_progress: 0, todo: 1, complete: 2 }
      return (order[deriveStatus(a)] - order[deriveStatus(b)]) * dir
    }
    return 0
  })

  const totalUnits = sorted.reduce((sum, b) => sum + b.units, 0)
  const inProgressCount = sorted.filter((b) => deriveStatus(b) === 'in_progress').length
  const completeCount = sorted.filter((b) => deriveStatus(b) === 'complete').length

  const filtersActive = Boolean(factoryFilter || customerFilter || statusFilter)
  const buildHref = (overrides: Partial<SearchParams>) => {
    const params = new URLSearchParams()
    const next: SearchParams = { ...sp, ...overrides }
    if (next.factory)  params.set('factory', next.factory)
    if (next.customer) params.set('customer', next.customer)
    if (next.status)   params.set('status', next.status)
    if (next.sort)     params.set('sort', next.sort)
    if (next.dir)      params.set('dir', next.dir)
    const qs = params.toString()
    return qs ? `/demo/full/batches?${qs}` : '/demo/full/batches'
  }
  const removeParam = (key: keyof SearchParams) => buildHref({ [key]: undefined })

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-10">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
            Full demo · production batches
          </p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight text-[var(--ink)]">
            Batches
          </h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            {sorted.length} of {batches.length} batches · {totalUnits.toLocaleString()} units · {inProgressCount} in progress · {completeCount} complete
          </p>
        </div>
      </header>

      {/* Filters */}
      <section className="mb-6 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">Factory</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <FilterChip label="All" href={buildHref({ factory: undefined })} active={!factoryFilter} />
              {factories.map((f) => (
                <FilterChip
                  key={f}
                  label={f.split(' · ')[0]}
                  href={buildHref({ factory: f })}
                  active={factoryFilter === f}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">Customer</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <FilterChip label="All" href={buildHref({ customer: undefined })} active={!customerFilter} />
              {brands.map((b) => (
                <FilterChip
                  key={b.slug}
                  label={b.name}
                  href={buildHref({ customer: b.slug })}
                  active={customerFilter === b.slug}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">Status</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <FilterChip label="All" href={buildHref({ status: undefined })} active={!statusFilter} />
              <FilterChip label="In progress" href={buildHref({ status: 'in_progress' })} active={statusFilter === 'in_progress'} />
              <FilterChip label="Complete"    href={buildHref({ status: 'complete' })}    active={statusFilter === 'complete'} />
              <FilterChip label="Not started" href={buildHref({ status: 'todo' })}        active={statusFilter === 'todo'} />
            </div>
          </div>
        </div>

        {filtersActive && (
          <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-[var(--border)] pt-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">Active:</p>
            {factoryFilter && (
              <ActiveFilter label={`Factory · ${factoryFilter.split(' · ')[0]}`} href={removeParam('factory')} />
            )}
            {customerFilter && (
              <ActiveFilter
                label={`Customer · ${brandsBySlug.get(customerFilter)?.name ?? customerFilter}`}
                href={removeParam('customer')}
              />
            )}
            {statusFilter && (
              <ActiveFilter label={`Status · ${statusLabel[statusFilter as BatchStatus]}`} href={removeParam('status')} />
            )}
            <Link
              href="/demo/full/batches"
              className="ml-auto font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent)] hover:text-[var(--ink)]"
            >
              Clear all
            </Link>
          </div>
        )}
      </section>

      {/* Table */}
      {sorted.length === 0 ? (
        <div className="rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface)] p-12 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            No batches match these filters
          </p>
          <p className="mt-3 text-[var(--muted)]">
            Try{' '}
            <Link href="/demo/full/batches" className="text-[var(--ink)] underline-offset-2 hover:underline">
              clearing filters
            </Link>
            .
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
          <table className="w-full text-sm">
            <thead className="bg-[var(--cream)] text-left text-xs uppercase tracking-wider text-[var(--muted)]">
              <tr>
                <SortHeader label="Batch"    col="code"     {...{ sortKey, sortDir, buildHref }} />
                <SortHeader label="Factory"  col="factory"  {...{ sortKey, sortDir, buildHref }} />
                <th className="px-4 py-3 font-medium">PO · Customer</th>
                <SortHeader label="Units"    col="units"    {...{ sortKey, sortDir, buildHref }} align="right" />
                <th className="px-4 py-3 font-medium">Current milestone</th>
                <SortHeader label="Progress" col="progress" {...{ sortKey, sortDir, buildHref }} />
                <SortHeader label="Status"   col="status"   {...{ sortKey, sortDir, buildHref }} />
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((b) => {
                const order = orderByBatchId.get(b.id)
                const brand = brandByBatchId.get(b.id)
                const inProgress = b.milestones.find((m) => m.state === 'in_progress')
                const status = deriveStatus(b)
                const pct = progressPct(b)
                return (
                  <tr
                    key={b.id}
                    className="border-t border-[var(--border)] transition hover:bg-[var(--cream)]/50"
                  >
                    <td className="px-4 py-3 font-mono text-xs text-[var(--ink)]">{b.code}</td>
                    <td className="px-4 py-3">
                      <span className="text-[var(--ink)]">{b.factory.split(' · ')[0]}</span>
                      <span className="ml-2 font-mono text-xs text-[var(--muted)]">
                        {b.factory.split(' · ')[1]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {order ? (
                        <Link
                          href={`/demo/full/orders/${order.id}`}
                          className="font-mono text-xs text-[var(--ink)] underline-offset-2 hover:underline"
                        >
                          {order.code}
                        </Link>
                      ) : (
                        <span className="font-mono text-xs text-[var(--muted)]">—</span>
                      )}
                      <span className="ml-2 text-[var(--muted)]">{brand?.name ?? '—'}</span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-xs">
                      {b.units.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      {status === 'complete' ? (
                        <span className="text-xs text-[var(--good)]">All complete</span>
                      ) : inProgress ? (
                        <span className="text-sm text-[var(--ink)]">{inProgress.label}</span>
                      ) : (
                        <span className="text-xs text-[var(--muted)]">Not started</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-[var(--border)]">
                          <div
                            className="h-full rounded-full bg-[var(--accent)]"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="font-mono text-xs text-[var(--muted)]">{pct}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusTone[status]}`}>
                        {statusLabel[status]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {inProgress ? (
                        <AdvanceMilestoneButton
                          batchId={b.id}
                          milestoneId={inProgress.id}
                          label={inProgress.label}
                        />
                      ) : (
                        <span className="font-mono text-[11px] text-[var(--muted)]">—</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-6 text-xs text-[var(--muted)]">
        Click any PO code to drill into the order detail. Click &ldquo;Mark complete&rdquo; on the
        next milestone to advance the batch — the change propagates to the order detail and the
        customer portal, and posts an automatic update to the conversation thread.
      </p>
    </div>
  )
}

function FilterChip({
  label,
  href,
  active,
}: {
  label: string
  href: string
  active: boolean
}) {
  return (
    <Link
      href={href}
      className={`rounded-full border px-3 py-1 text-xs transition ${
        active
          ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--cream)]'
          : 'border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--ink)]/40 hover:text-[var(--ink)]'
      }`}
    >
      {label}
    </Link>
  )
}

function ActiveFilter({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent)]/10 px-2.5 py-0.5 text-xs text-[var(--accent)] hover:bg-[var(--accent)]/20"
    >
      <span>{label}</span>
      <span aria-hidden>×</span>
    </Link>
  )
}

function SortHeader({
  label,
  col,
  sortKey,
  sortDir,
  buildHref,
  align,
}: {
  label: string
  col: SortKey
  sortKey: SortKey
  sortDir: SortDir
  buildHref: (overrides: Partial<SearchParams>) => string
  align?: 'right'
}) {
  const isActive = sortKey === col
  const nextDir: SortDir = isActive && sortDir === 'asc' ? 'desc' : 'asc'
  const indicator = isActive ? (sortDir === 'asc' ? '↑' : '↓') : ''
  return (
    <th className={`px-4 py-3 font-medium ${align === 'right' ? 'text-right' : ''}`}>
      <Link
        href={buildHref({ sort: col, dir: nextDir })}
        className={`inline-flex items-center gap-1 transition hover:text-[var(--ink)] ${
          isActive ? 'text-[var(--ink)]' : ''
        }`}
      >
        <span>{label}</span>
        {indicator && <span className="font-mono text-[10px]">{indicator}</span>}
      </Link>
    </th>
  )
}
