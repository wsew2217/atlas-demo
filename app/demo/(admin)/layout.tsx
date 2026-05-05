import Link from 'next/link'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="border-b border-[var(--border)] bg-[var(--cream)]/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/demo" className="flex items-baseline gap-3">
            <span className="font-display text-xl font-semibold tracking-tight text-[var(--ink)]">
              Atlas
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
              Manufacturer admin
            </span>
          </Link>
          <nav className="flex items-center gap-1 text-sm">
            <Link
              href="/demo"
              className="rounded-md px-3 py-1.5 text-[var(--ink)] transition hover:bg-[var(--ink)]/5"
            >
              Dashboard
            </Link>
            <Link
              href="/demo/orders"
              className="rounded-md px-3 py-1.5 text-[var(--ink)] transition hover:bg-[var(--ink)]/5"
            >
              Orders
            </Link>
            <Link
              href="/demo/factories"
              className="rounded-md px-3 py-1.5 text-[var(--ink)] transition hover:bg-[var(--ink)]/5"
            >
              Factories
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </>
  )
}
