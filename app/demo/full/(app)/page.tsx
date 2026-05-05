import Link from 'next/link'

export const metadata = {
  title: 'Atlas Full Demo · Dashboard',
  robots: { index: false, follow: false },
}

const upcoming = [
  {
    title: 'Orders',
    body: 'Full PO list with filters, search, batch creation, line-item editing, and PDF import.',
    href: '/demo/full/orders',
  },
  {
    title: 'Batches',
    body: 'Batch management across factories. Allocation, milestone updates, QC photos, ship tracking.',
    href: '/demo/full/batches',
  },
  {
    title: 'Customers',
    body: 'Customer (brand) management with per-customer SKU catalogs, custom rules, and portal configuration.',
    href: '/demo/full/customers',
  },
  {
    title: 'Factory',
    body: 'Multi-factory operator view. Batch assignment, capacity planning, weekly status reports.',
    href: '/demo/full/factory',
  },
]

export default function FullDemoDashboardPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-10">
      <header className="mb-10">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
          Full demo · welcome
        </p>
        <h1 className="mt-2 text-4xl font-semibold leading-tight text-[var(--ink)]">
          The deeper version of Atlas, <span className="italic text-[var(--accent)]">unlocked.</span>
        </h1>
        <p className="mt-4 max-w-3xl text-[var(--muted)]">
          The light demo on{' '}
          <Link href="/demo" className="text-[var(--ink)] underline-offset-2 hover:underline">
            /demo
          </Link>{' '}
          shows the two-sided narrative — manufacturer admin and customer portal flipping between
          perspectives. This full version goes deeper into each surface: filters, search,
          uploads, weekly reports, and the operational pages that match what TRG-style customers
          actually use day-to-day.
        </p>
      </header>

      <section className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/5 p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
          Build status
        </p>
        <p className="mt-2 text-sm text-[var(--ink)]">
          The gate is in place. The pages below are stubbed; we&rsquo;re porting them in over the
          next sessions. Each one will become a real, working page with Supabase-backed data.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="mb-4 text-lg font-semibold text-[var(--ink)]">Coming pages</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {upcoming.map((u) => (
            <article
              key={u.title}
              className="rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface)] p-6"
            >
              <h3 className="font-display text-xl font-semibold text-[var(--ink)]">{u.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{u.body}</p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
                Coming soon · {u.href}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="font-display text-lg font-semibold text-[var(--ink)]">
          Want to see the light demo?
        </h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          The public version stays at{' '}
          <Link href="/demo" className="text-[var(--ink)] underline-offset-2 hover:underline">
            demo.kuhler.com
          </Link>{' '}
          — manufacturer dashboard, customer portals, factory side, conversation thread, and
          working milestone advance with auto-update propagation. No sign-in required.
        </p>
      </section>
    </div>
  )
}
