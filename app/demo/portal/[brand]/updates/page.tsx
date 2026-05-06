import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBrand, getActivityForBrand, getOrdersForBrand } from '@/lib/demo-db'

export async function generateMetadata({ params }: { params: Promise<{ brand: string }> }) {
  const { brand: slug } = await params
  const brand = await getBrand(slug)
  if (!brand) return { title: 'Updates' }
  return {
    title: `${brand.name} · Updates`,
    description: `Live operational updates for ${brand.name}.`,
  }
}

function dateKey(iso: string): string {
  return iso.slice(0, 10)
}

function formatDateLabel(yyyymmdd: string): string {
  const d = new Date(yyyymmdd)
  return d.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function PortalUpdatesPage({
  params,
}: {
  params: Promise<{ brand: string }>
}) {
  const { brand: slug } = await params
  const brand = await getBrand(slug)
  if (!brand) notFound()

  const [activity, orders] = await Promise.all([
    getActivityForBrand(slug),
    getOrdersForBrand(slug),
  ])

  // Group by date desc
  const groups = new Map<string, typeof activity>()
  for (const a of activity) {
    const k = dateKey(a.at)
    const list = groups.get(k) ?? []
    list.push(a)
    groups.set(k, list)
  }
  const dateGroups = [...groups.entries()].sort((a, b) => b[0].localeCompare(a[0]))

  const ordersById = new Map(orders.map((o) => [o.id, o]))

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-10">
      <header className="mb-8">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
          {brand.name} · Updates
        </p>
        <h1 className="mt-1 font-display text-4xl font-semibold text-[var(--ink)]">
          Live updates
        </h1>
        <p className="mt-2 max-w-2xl text-[var(--muted)]">
          Everything that&rsquo;s happening across your orders, oldest at the bottom. System
          updates post automatically as production progresses; account-team notes appear when
          your manufacturer adds them.
        </p>
      </header>

      {dateGroups.length === 0 ? (
        <p className="rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface)] p-12 text-center text-[var(--muted)]">
          No updates yet. New activity will appear here as production progresses.
        </p>
      ) : (
        <div className="space-y-10">
          {dateGroups.map(([date, items]) => (
            <section key={date}>
              <p
                className="mb-3 border-b border-[var(--border)] pb-2 font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]"
                style={{ borderBottomColor: `${brand.primary}40` }}
              >
                {formatDateLabel(date)}
              </p>
              <ul className="space-y-3">
                {items.map((a) => {
                  const order = a.orderId ? ordersById.get(a.orderId) : undefined
                  return (
                    <li
                      key={a.id}
                      className="flex gap-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-5 py-4"
                    >
                      <span
                        className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: a.isSystem ? brand.primary : 'var(--muted)' }}
                      />
                      <div className="flex-1">
                        <p className="text-[var(--ink)]">{a.text}</p>
                        <p className="mt-1 font-mono text-xs text-[var(--muted)]">
                          {a.isSystem ? 'auto-update' : a.actor} ·{' '}
                          {new Date(a.at).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                          {order && (
                            <>
                              {' · '}
                              <Link
                                href={`/demo/portal/${brand.slug}/orders/${order.id}`}
                                className="text-[var(--ink)] underline-offset-2 hover:underline"
                              >
                                {order.code}
                              </Link>
                            </>
                          )}
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}
        </div>
      )}

      <p className="mt-12 text-xs text-[var(--muted)]">
        Want notifications? Configure email and SMS preferences on{' '}
        <Link
          href={`/demo/portal/${brand.slug}/account`}
          className="text-[var(--ink)] underline-offset-2 hover:underline"
        >
          your account page
        </Link>
        .
      </p>
    </div>
  )
}
