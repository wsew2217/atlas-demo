import Link from 'next/link'
import { signOutAction } from '@/app/demo/_actions/sign-out'

const navLinks = [
  { href: '/demo/full', label: 'Dashboard' },
  { href: '/demo/full/orders', label: 'Orders' },
  { href: '/demo/full/batches', label: 'Batches' },
  { href: '/demo/full/customers', label: 'Customers' },
  { href: '/demo/full/factory', label: 'Factories' },
]

export default function FullDemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="border-b border-[var(--border)] bg-[var(--cream)]/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-3">
          <Link href="/demo/full" className="flex items-baseline gap-3">
            <span className="font-display text-xl font-semibold tracking-tight text-[var(--ink)]">
              Atlas
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
              Full demo · authenticated
            </span>
          </Link>
          <div className="flex items-center gap-1">
            <nav className="hidden items-center gap-0.5 md:flex">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-md px-2.5 py-1.5 text-sm text-[var(--muted)] transition hover:bg-[var(--ink)]/5 hover:text-[var(--ink)]"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <form action={signOutAction} className="ml-2">
              <button
                type="submit"
                className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--muted)] transition hover:text-[var(--ink)]"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </>
  )
}
