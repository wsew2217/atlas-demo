'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { resetDemoAction } from '@/app/demo/_actions/reset-demo'

const links = [
  { href: '/demo',                   label: 'Manufacturer admin' },
  { href: '/demo/portal/summit',     label: 'Summit Athletics' },
  { href: '/demo/portal/meridian',   label: 'Meridian Apparel' },
  { href: '/demo/factory',           label: 'Factory · Plant A' },
]

export function DemoBar() {
  const pathname = usePathname() ?? ''

  const activeHref =
    pathname.startsWith('/demo/factory')         ? '/demo/factory' :
    pathname.startsWith('/demo/portal/meridian') ? '/demo/portal/meridian' :
    pathname.startsWith('/demo/portal/summit')   ? '/demo/portal/summit'   :
    '/demo'

  return (
    <div className="bg-[var(--ink)] text-[var(--cream)]">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2 text-xs">
        <span className="font-mono uppercase tracking-[0.22em] text-[var(--cream)]/60">
          Demo · view as
        </span>
        <nav className="flex flex-wrap items-center gap-1">
          {links.map((l) => {
            const active = l.href === activeHref
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded px-2.5 py-1 font-mono transition ${
                  active
                    ? 'bg-[var(--cream)] text-[var(--ink)]'
                    : 'text-[var(--cream)]/80 hover:bg-[var(--cream)]/10 hover:text-[var(--cream)]'
                }`}
              >
                {l.label}
              </Link>
            )
          })}
          <span aria-hidden className="mx-1 text-[var(--cream)]/30">·</span>
          <form action={resetDemoAction}>
            <button
              type="submit"
              className="rounded px-2.5 py-1 font-mono text-[var(--cream)]/60 transition hover:bg-[var(--cream)]/10 hover:text-[var(--cream)]"
              title="Wipe your replies and milestone advances; reset the demo"
            >
              Reset
            </button>
          </form>
        </nav>
      </div>
    </div>
  )
}
