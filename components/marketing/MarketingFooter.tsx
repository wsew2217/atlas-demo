import Link from 'next/link'

const product = [
  { href: '/product',         label: 'How it works' },
  { href: '/pricing',         label: 'Pricing' },
  { href: '/atlas-vs-erp',    label: 'Atlas vs ERP' },
  { href: '/developers',      label: 'Developers · API' },
  { href: 'https://demo.kuhler.com', label: 'Live demo' },
]

const company = [
  { href: '/about',     label: 'About' },
  { href: '/customers', label: 'Customers' },
  { href: '/resources', label: 'Resources' },
  { href: '/contact',   label: 'Contact' },
]

const legal = [
  { href: '/legal/privacy', label: 'Privacy' },
  { href: '/legal/terms',   label: 'Terms' },
]

export function MarketingFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-24 border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto w-full max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-semibold tracking-tight text-[var(--ink)]">
              Kuhler
            </p>
            <p className="mt-2 max-w-xs text-sm text-[var(--muted)]">
              Operational software for apparel manufacturers. Atlas is the engine inside.
            </p>
            <p className="mt-4 font-mono text-xs text-[var(--muted)]">
              hello@kuhler.com
            </p>
          </div>

          <FooterColumn title="Product" links={product} />
          <FooterColumn title="Company" links={company} />
          <FooterColumn title="Legal"   links={legal} />
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] pt-6 text-xs text-[var(--muted)]">
          <span>© {year} Kuhler.</span>
          <span className="font-mono">
            Built with Next.js · deployed on Vercel · powered by Atlas
          </span>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: { href: string; label: string }[]
}) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
        {title}
      </p>
      <ul className="mt-4 space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-sm text-[var(--ink)]/80 transition hover:text-[var(--ink)]"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
