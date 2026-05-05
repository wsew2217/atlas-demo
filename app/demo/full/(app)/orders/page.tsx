import Link from 'next/link'
import { listOrders, listBrands, listBatches } from '@/lib/demo-db'
import { loadBatchesWithOverrides } from '@/lib/demo-batch-store'
import { OrderStatusPill } from '@/components/demo/StatusPill'
import type { Order, OrderStatus, Batch } from '@/lib/demo-data'
import { orderStatusLabel } from '@/lib/demo-data'

export const metadata = {
  title: 'Atlas Full Demo · Orders',
  robots: { index: false, follow: false },
}

const STATUSES: OrderStatus[] = ['received', 'in_production', 'shipped', 'closed', 'on_hold']

type SortKey = 'code' | 'brand' | 'ship_by' | 'units' | 'progress' | 'status'
type SortDir = 'asc' | 'desc'

interface SearchParams {
  status?: string
  brand?: string
  q?: string
  sort?: string
  dir?: string
}

export default async function FullDemoOrdersPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const sp = await searchParams
  const [allOrders, brands, batchesRaw] = await Promise.all([
    listOrders(),
    listBrands(),
    listBatches(),
  ])
  const batches = await loadBatchesWithOverrides(batchesRaw)
  const batchesById = new Map(batches.map((b) => [b.id, b]))

  const orderProgress = (o: Order) => {
    const ob = o.batchIds.map((id) => batchesById.get(id)).filter((b): b is Batch => Boolean(b))
    const total = ob.reduce((n, b) => n + b.milestones.length, 0)
    const done = ob.reduce((n, b) => n + b.milestones.filter((m) => m.state === 'done').length, 0)
    return total === 0 ? 0 : Math.round((done / total) * 100)
  }

  // Filter
  const status = (sp.status as OrderStatus) || ''
  const brandSlug = sp.brand || ''
  const q = (sp.q || '').trim().toLowerCase()

  const filtered = allOrders.filter((o) => {
    if (status && o.status !== status) return false
    if (brandSlug && o.brandSlug !== brandSlug) return false
    if (q) {
      const hay = [
        o.code,
        o.brandSlug,
        ...o.lineItems.map((li) => li.description),
        ...o.lineItems.map((li) => li.sku),
      ]
        .join(' ')
        .toLowerCase()
      if (!hay.includes(q)) return false
    }
    return true
  })

  // Enrich with progress, then sort
  const sortKey = (sp.sort as SortKey) || 'ship_by'
  const sortDir: SortDir = sp.dir === 'desc' ? 'desc' : 'asc'
  const dir = sortDir === 'asc' ? 1 : -1
  const rows = filtered
    .map((o) => ({ ...o, _progress: orderProgress(o) }))
    .sort((a, b) => {
      if (sortKey === 'code')     return a.code.localeCompare(b.code) * dir
      if (sortKey === 'brand')    return a.brandSlug.localeCompare(b.brandSlug) * dir
      if (sortKey === 'ship_by')  return a.shipBy.localeCompare(b.shipBy) * dir
      if (sortKey === 'units')    return (a.totalUnits - b.totalUnits) * dir
      if (sortKey === 'progress') return (a._progress - b._progress) * dir
      if (sortKey === 'status')   return a.status.localeCompare(b.status) * dir
      return 0
    })

  const totalUnits = rows.reduce((sum, o) => sum + o.totalUnits, 0)
  const brandsBySlug = new Map(brands.map((b) => [b.slug, b]))

  const filtersActive = Boolean(status || brandSlug || q)
  const buildHref = (overrides: Partial<SearchParams>) => {
    const params = new URLSearchParams()
    const next: SearchParams = { ...sp, ...overrides }
    if (next.status) params.set('status', next.status)
    if (next.brand) params.set('brand', next.brand)
    if (next.q) params.set('q', next.q)
    if (next.sort) params.set('sort', next.sort)
    if (next.dir) params.set('dir', next.dir)
    const qs = params.toString()
    return qs ? `/demo/full/orders?${qs}` : '/demo/full/orders'
  }
  const removeParam = (key: keyof SearchParams) => buildHref({ [key]: undefined })

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-10">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
            Full demo · purchase orders
          </p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight text-[var(--ink)]">
            Orders
          </h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            {rows.length} of {allOrders.length} POs · {totalUnits.toLocaleString()} units shown
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="inline-flex cursor-not-allowed items-center rounded-md border border-dashed border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs text-[var(--muted)]"
            title="PDF upload coming in next round"
          >
            + New PO (coming)
          </span>
        </div>
      </header>

      {/* Filter / search bar */}
      <section className="mb-6 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
        <form action="/demo/full/orders" method="GET" className="flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-[240px]">
            <label
              htmlFor="orders-q"
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]"
            >
              Search
            </label>
            <input
              id="orders-q"
              type="search"
              name="q"
              defaultValue={sp.q ?? ''}
              placeholder="PO code, SKU, item description…"
              className="mt-2 w-full rounded-md border border-[var(--border)] bg-[var(--cream)] px-3 py-2 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--accent)] focus:bg-[var(--surface)]"
            />
          </div>
          {/* Preserve other filters when submitting search */}
          {sp.status && <input type="hidden" name="status" value={sp.status} />}
          {sp.brand && <input type="hidden" name="brand" value={sp.brand} />}
          {sp.sort && <input type="hidden" name="sort" value={sp.sort} />}
          {sp.dir && <input type="hidden" name="dir" value={sp.dir} />}
          <button
            type="submit"
            className="rounded-md bg-[var(--ink)] px-4 py-2 text-sm font-medium text-[var(--cream)] transition hover:opacity-90"
          >
            Search
          </button>
        </form>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
              Status
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <FilterChip label="All" href={buildHref({ status: undefined })} active={!status} />
              {STATUSES.map((s) => (
                <FilterChip
                  key={s}
                  label={orderStatusLabel[s]}
                  href={buildHref({ status: s })}
                  active={status === s}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
              Customer
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <FilterChip label="All" href={buildHref({ brand: undefined })} active={!brandSlug} />
              {brands.map((b) => (
                <FilterChip
                  key={b.slug}
                  label={b.name}
                  href={buildHref({ brand: b.slug })}
                  active={brandSlug === b.slug}
                />
              ))}
            </div>
          </div>
        </div>

        {filtersActive && (
          <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-[var(--border)] pt-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
              Active filters:
            </p>
            {status && (
              <ActiveFilter
                label={`Status · ${orderStatusLabel[status as OrderStatus]}`}
                href={removeParam('status')}
              />
            )}
            {brandSlug && (
              <ActiveFilter
                label={`Customer · ${brandsBySlug.get(brandSlug)?.name ?? brandSlug}`}
                href={removeParam('brand')}
              />
            )}
            {q && <ActiveFilter label={`Search · "${q}"`} href={removeParam('q')} />}
            <Link
              href="/demo/full/orders"
              className="ml-auto font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent)] hover:text-[var(--ink)]"
            >
              Clear all
            </Link>
          </div>
        )}
      </section>

      {/* Table */}
      {rows.length === 0 ? (
        <div className="rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface)] p-12 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            No POs match your filters
          </p>
          <p className="mt-3 text-[var(--muted)]">
            Try{' '}
            <Link href="/demo/full/orders" className="text-[var(--ink)] underline-offset-2 hover:underline">
              clearing filters
            </Link>{' '}
            or adjusting your search.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
          <table className="w-full text-sm">
            <thead className="bg-[var(--cream)] text-left text-xs uppercase tracking-wider text-[var(--muted)]">
              <tr>
                <SortHeader label="PO"        col="code"     {...{ sortKey, sortDir, buildHref }} />
                <SortHeader label="Customer"  col="brand"    {...{ sortKey, sortDir, buildHref }} />
                <th className="px-4 py-3 font-medium">Items</th>
                <SortHeader label="Ship by"   col="ship_by"  {...{ sortKey, sortDir, buildHref }} />
                <SortHeader label="Units"     col="units"    {...{ sortKey, sortDir, buildHref }} align="right" />
                <SortHeader label="Progress"  col="progress" {...{ sortKey, sortDir, buildHref }} />
                <SortHeader label="Status"    col="status"   {...{ sortKey, sortDir, buildHref }} />
              </tr>
            </thead>
            <tbody>
              {rows.map((o) => {
                const brand = brandsBySlug.get(o.brandSlug)
                const desc = o.lineItems[0]?.description ?? '—'
                const factories = [...new Set(
                  o.batchIds
                    .map((id) => batchesById.get(id)?.factory.split(' · ')[0])
                    .filter(Boolean)
                )]
                return (
                  <tr
                    key={o.id}
                    className="border-t border-[var(--border)] transition hover:bg-[var(--cream)]/50"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/demo/orders/${o.id}`}
                        className="font-mono text-xs text-[var(--ink)] underline-offset-2 hover:underline"
                      >
                        {o.code}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-[var(--ink)]">{brand?.name ?? o.brandSlug}</td>
                    <td className="px-4 py-3">
                      <p className="text-[var(--ink)]">{desc}</p>
                      <p className="font-mono text-xs text-[var(--muted)]">
                        {o.lineItems.length} line items
                        {factories.length > 0 ? ` · ${factories.join(', ')}` : ''}
                      </p>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-[var(--muted)]">{o.shipBy}</td>
                    <td className="px-4 py-3 text-right font-mono text-xs">
                      {o.totalUnits.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-[var(--border)]">
                          <div
                            className="h-full rounded-full bg-[var(--accent)]"
                            style={{ width: `${o._progress}%` }}
                          />
                        </div>
                        <span className="font-mono text-xs text-[var(--muted)]">{o._progress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <OrderStatusPill status={o.status} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-6 text-xs text-[var(--muted)]">
        Click any PO code to drill into the order detail (light-demo view for now). Richer
        order detail with internal notes, status changes, and factory reassignment lands in a
        future round.
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
