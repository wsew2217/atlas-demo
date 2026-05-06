import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBrand } from '@/lib/demo-db'

export default async function PortalLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ brand: string }>
}) {
  const { brand: slug } = await params
  const brand = await getBrand(slug)
  if (!brand) notFound()

  return (
    <>
      <header
        className="border-b border-[var(--border)] bg-[var(--cream)]/80 backdrop-blur"
        style={{ ['--brand-primary' as string]: brand.primary }}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <Link href={`/demo/portal/${brand.slug}`} className="flex items-baseline gap-3">
            <span
              className="font-display text-xl font-semibold tracking-tight"
              style={{ color: brand.primary }}
            >
              {brand.name}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
              Portal
            </span>
          </Link>
          <nav className="flex items-center gap-1 text-sm">
            <Link
              href={`/demo/portal/${brand.slug}`}
              className="rounded-md px-3 py-1.5 text-[var(--ink)] transition hover:bg-[var(--ink)]/5"
            >
              Orders
            </Link>
            <Link
              href={`/demo/portal/${brand.slug}/updates`}
              className="rounded-md px-3 py-1.5 text-[var(--ink)] transition hover:bg-[var(--ink)]/5"
            >
              Updates
            </Link>
            <Link
              href={`/demo/portal/${brand.slug}/account`}
              className="rounded-md px-3 py-1.5 text-[var(--ink)] transition hover:bg-[var(--ink)]/5"
            >
              Account
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </>
  )
}
