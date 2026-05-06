import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBrand, getOrdersForBrand } from '@/lib/demo-db'
import type { LineItem } from '@/lib/demo-data'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const brand = await getBrand(slug)
  if (!brand) return { title: 'SKU catalog' }
  return {
    title: `Atlas Full Demo · ${brand.name} SKU catalog`,
    robots: { index: false, follow: false },
  }
}

interface SkuRow {
  sku: string
  description: string
  color: string
  size: string
  totalUnits: number
  orderCount: number
  lastSeen: string
}

export default async function CustomerSkuCatalogPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const brand = await getBrand(slug)
  if (!brand) notFound()

  const orders = await getOrdersForBrand(slug)

  // Aggregate by SKU
  const map = new Map<string, SkuRow>()
  for (const o of orders) {
    for (const li of o.lineItems) {
      const existing = map.get(li.sku)
      if (existing) {
        existing.totalUnits += li.units
        existing.orderCount += 1
        if (o.createdAt > existing.lastSeen) existing.lastSeen = o.createdAt
      } else {
        map.set(li.sku, {
          sku: li.sku,
          description: li.description,
          color: li.color,
          size: li.size,
          totalUnits: li.units,
          orderCount: 1,
          lastSeen: o.createdAt,
        })
      }
    }
  }
  const rows = [...map.values()].sort((a, b) => a.sku.localeCompare(b.sku))

  // Group by description (parent product family) for the secondary view
  const byDescription = new Map<string, SkuRow[]>()
  for (const r of rows) {
    const list = byDescription.get(r.description) ?? []
    list.push(r)
    byDescription.set(r.description, list)
  }
  const families = [...byDescription.entries()].sort((a, b) => a[0].localeCompare(b[0]))

  const totalUnitsAcrossSkus = rows.reduce((sum, r) => sum + r.totalUnits, 0)

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-10">
      <Link
        href={`/demo/full/customers/${brand.slug}`}
        className="mb-6 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)] hover:text-[var(--ink)]"
      >
        ← {brand.name}
      </Link>

      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-start gap-4">
          <span
            className="mt-1 h-10 w-10 shrink-0 rounded-md ring-2 ring-[var(--surface)]"
            style={{ backgroundColor: brand.primary, boxShadow: `0 0 0 1px ${brand.primary}55` }}
            aria-hidden
          />
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
              {brand.name} · SKU catalog
            </p>
            <h1 className="mt-1 font-display text-3xl font-semibold text-[var(--ink)]">
              Catalog
            </h1>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {rows.length} SKUs · {families.length} product families · {totalUnitsAcrossSkus.toLocaleString()} units shipped lifetime
            </p>
          </div>
        </div>
        <span
          className="inline-flex cursor-not-allowed items-center rounded-md border border-dashed border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs text-[var(--muted)]"
          title="CSV import coming next round"
        >
          + Import SKUs from CSV (coming)
        </span>
      </header>

      {rows.length === 0 ? (
        <p className="rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface)] p-12 text-center text-[var(--muted)]">
          No SKUs in catalog yet. Run a PO to start populating.
        </p>
      ) : (
        <div className="space-y-8">
          {/* Family rollup */}
          <section>
            <h2 className="mb-3 font-display text-lg font-semibold text-[var(--ink)]">
              By product family
            </h2>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {families.map(([desc, items]) => {
                const familyUnits = items.reduce((sum, r) => sum + r.totalUnits, 0)
                const colors = [...new Set(items.map((r) => r.color))]
                const sizes = [...new Set(items.map((r) => r.size))]
                return (
                  <article
                    key={desc}
                    className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-4"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                      Product family · {items.length} {items.length === 1 ? 'SKU' : 'SKUs'}
                    </p>
                    <h3 className="mt-1 font-display text-base font-semibold text-[var(--ink)]">
                      {desc}
                    </h3>
                    <p className="mt-2 text-xs text-[var(--muted)]">
                      Colors: {colors.join(', ')}
                    </p>
                    <p className="mt-1 text-xs text-[var(--muted)]">
                      Sizes: {sizes.join(', ')}
                    </p>
                    <p className="mt-3 font-mono text-xs text-[var(--ink)]">
                      {familyUnits.toLocaleString()} units lifetime
                    </p>
                  </article>
                )
              })}
            </div>
          </section>

          {/* Full SKU table */}
          <section>
            <h2 className="mb-3 font-display text-lg font-semibold text-[var(--ink)]">
              All SKUs
            </h2>
            <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
              <table className="w-full text-sm">
                <thead className="bg-[var(--cream)] text-left text-xs uppercase tracking-wider text-[var(--muted)]">
                  <tr>
                    <th className="px-4 py-3 font-medium">SKU</th>
                    <th className="px-4 py-3 font-medium">Product</th>
                    <th className="px-4 py-3 font-medium">Color</th>
                    <th className="px-4 py-3 font-medium">Size</th>
                    <th className="px-4 py-3 text-right font-medium">Units shipped</th>
                    <th className="px-4 py-3 text-right font-medium">Orders</th>
                    <th className="px-4 py-3 font-medium">Last ordered</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.sku} className="border-t border-[var(--border)] transition hover:bg-[var(--cream)]/50">
                      <td className="px-4 py-3 font-mono text-xs text-[var(--ink)]">{r.sku}</td>
                      <td className="px-4 py-3">{r.description}</td>
                      <td className="px-4 py-3 text-[var(--muted)]">{r.color}</td>
                      <td className="px-4 py-3 font-mono text-xs">{r.size}</td>
                      <td className="px-4 py-3 text-right font-mono text-xs">
                        {r.totalUnits.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-xs text-[var(--muted)]">
                        {r.orderCount}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-[var(--muted)]">{r.lastSeen}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}

      <p className="mt-8 text-xs text-[var(--muted)]">
        Catalog is computed from the customer&rsquo;s order history. In production, customers can
        upload a master catalog via CSV; SKUs not yet ordered show with a &ldquo;Never ordered&rdquo;
        flag. Catalog edits, master imports, and per-SKU dimension/weight metadata are coming.
      </p>
    </div>
  )
}
