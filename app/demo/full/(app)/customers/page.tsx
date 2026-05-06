import Link from 'next/link'
import { listBrands, listOrders } from '@/lib/demo-db'
import { getDemoCustomers } from '@/lib/demo-customers-store'

export const metadata = {
  title: 'Atlas Full Demo · Customers',
  robots: { index: false, follow: false },
}

function deriveDomain(email: string): string {
  const at = email.indexOf('@')
  return at >= 0 ? email.slice(at + 1) : email
}

export default async function FullDemoCustomersPage() {
  const [brands, orders, demoCustomers] = await Promise.all([
    listBrands(),
    listOrders(),
    getDemoCustomers(),
  ])

  const ordersByBrand = new Map<string, typeof orders>()
  for (const o of orders) {
    const list = ordersByBrand.get(o.brandSlug) ?? []
    list.push(o)
    ordersByBrand.set(o.brandSlug, list)
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-10">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
            Full demo · customer management
          </p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight text-[var(--ink)]">
            Customers
          </h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            {brands.length + demoCustomers.length} active customers · {orders.length} POs across all customers
            {demoCustomers.length > 0 && ` · ${demoCustomers.length} just onboarded this session`}
          </p>
        </div>
        <Link
          href="/demo/full/customers/new"
          className="inline-flex items-center rounded-md bg-[var(--ink)] px-4 py-2 text-sm font-medium text-[var(--cream)] transition hover:opacity-90"
        >
          + Onboard new customer
        </Link>
      </header>

      <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
        <table className="w-full text-sm">
          <thead className="bg-[var(--cream)] text-left text-xs uppercase tracking-wider text-[var(--muted)]">
            <tr>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Domain</th>
              <th className="px-4 py-3 font-medium">Primary contact</th>
              <th className="px-4 py-3 text-right font-medium">Open POs</th>
              <th className="px-4 py-3 text-right font-medium">Total units</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((b) => {
              const brandOrders = ordersByBrand.get(b.slug) ?? []
              const open = brandOrders.filter((o) => o.status !== 'closed' && o.status !== 'shipped').length
              const totalUnits = brandOrders.reduce((sum, o) => sum + o.totalUnits, 0)
              return (
                <tr
                  key={b.slug}
                  className="border-t border-[var(--border)] transition hover:bg-[var(--cream)]/50"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="h-3 w-3 shrink-0 rounded-full ring-2 ring-[var(--surface)]"
                        style={{ backgroundColor: b.primary, boxShadow: `0 0 0 1px ${b.primary}33` }}
                      />
                      <Link
                        href={`/demo/full/customers/${b.slug}`}
                        className="font-display text-base font-semibold text-[var(--ink)] underline-offset-2 hover:underline"
                      >
                        {b.name}
                      </Link>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-[var(--muted)]">
                    {deriveDomain(b.contactEmail)}
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-[var(--ink)]">{b.contact}</p>
                    <p className="font-mono text-xs text-[var(--muted)]">{b.contactEmail}</p>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-xs">{open}</td>
                  <td className="px-4 py-3 text-right font-mono text-xs">
                    {totalUnits.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-[var(--good)]/15 px-2.5 py-0.5 text-xs font-medium text-[var(--good)]">
                      Active
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/demo/full/customers/${b.slug}`}
                        className="rounded-md border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--ink)] transition hover:bg-[var(--cream)]"
                      >
                        Manage
                      </Link>
                      <Link
                        href={`/demo/portal/${b.slug}`}
                        className="rounded-md bg-[var(--ink)] px-2.5 py-1 text-xs text-[var(--cream)] transition hover:opacity-90"
                      >
                        View portal →
                      </Link>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {demoCustomers.length > 0 && (
        <section className="mt-8">
          <div className="mb-3 flex items-end justify-between">
            <h2 className="font-display text-lg font-semibold text-[var(--ink)]">
              Just onboarded this session
            </h2>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
              Stored in your browser cookie
            </span>
          </div>
          <div className="overflow-hidden rounded-lg border border-[var(--good)]/40 bg-[var(--good)]/5">
            <table className="w-full text-sm">
              <thead className="bg-[var(--good)]/10 text-left text-xs uppercase tracking-wider text-[var(--muted)]">
                <tr>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Domain</th>
                  <th className="px-4 py-3 font-medium">Contact</th>
                  <th className="px-4 py-3 font-medium">Rules</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[...demoCustomers].reverse().map((d) => (
                  <tr key={d.slug} className="border-t border-[var(--good)]/20">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span
                          className="h-3 w-3 shrink-0 rounded-full ring-2 ring-[var(--surface)]"
                          style={{ backgroundColor: d.primaryColor }}
                        />
                        <Link
                          href={`/demo/full/customers/onboarded/${d.slug}`}
                          className="font-display text-base font-semibold text-[var(--ink)] underline-offset-2 hover:underline"
                        >
                          {d.customerName}
                        </Link>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-[var(--muted)]">
                      portal.{d.domain}
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-[var(--ink)]">{d.contactName}</p>
                      <p className="font-mono text-xs text-[var(--muted)]">{d.contactEmail}</p>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-[var(--muted)]">
                      {d.rules.length}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-[var(--accent)]/15 px-2.5 py-0.5 text-xs font-medium text-[var(--accent)]">
                        Provisioning
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/demo/full/customers/onboarded/${d.slug}`}
                        className="rounded-md border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--ink)] transition hover:bg-[var(--cream)]"
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <p className="mt-6 text-xs text-[var(--muted)]">
        Click a customer name to manage their portal configuration, SKU catalog, and custom rules.
        Click &ldquo;View portal&rdquo; to see Atlas as that customer sees it (light demo).
      </p>
    </div>
  )
}
