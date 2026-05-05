'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const links = [
  { href: '/product',   label: 'Product' },
  { href: '/pricing',   label: 'Pricing' },
  { href: '/customers', label: 'Customers' },
  { href: '/resources', label: 'Resources' },
  { href: '/about',     label: 'About' },
]

export function MarketingNav() {
  const pathname = usePathname() ?? ''
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header
      className={`sticky top-0 z-40 transition-colors ${
        scrolled
          ? 'border-b border-[var(--border)] bg-[var(--cream)]/85 backdrop-blur'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display text-xl font-semibold tracking-tight text-[var(--ink)]"
        >
          Kuhler
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + '/')
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-md px-3 py-1.5 text-sm transition ${
                  active
                    ? 'text-[var(--ink)]'
                    : 'text-[var(--muted)] hover:text-[var(--ink)]'
                }`}
              >
                {l.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/contact"
            className="rounded-md bg-[var(--ink)] px-3.5 py-1.5 text-sm font-medium text-[var(--cream)] transition hover:opacity-90"
          >
            Book a demo
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="sr-only">Menu</span>
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
            {open ? (
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" />
            ) : (
              <>
                <path d="M2 4h12" stroke="currentColor" strokeWidth="1.5" />
                <path d="M2 8h12" stroke="currentColor" strokeWidth="1.5" />
                <path d="M2 12h12" stroke="currentColor" strokeWidth="1.5" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--border)] bg-[var(--cream)] md:hidden">
          <nav className="mx-auto flex w-full max-w-6xl flex-col px-6 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="border-b border-[var(--border)] py-3 text-base text-[var(--ink)]"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center justify-center rounded-md bg-[var(--ink)] px-4 py-2.5 text-sm font-medium text-[var(--cream)]"
            >
              Book a demo
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
