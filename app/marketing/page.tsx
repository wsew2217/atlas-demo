import Link from 'next/link'

export const metadata = {
  title: 'Kuhler — Operational software for apparel manufacturers',
  description:
    'Atlas is the operational engine inside Kuhler. Built for the people running production from PO to packing list.',
}

const capabilities = [
  {
    eyebrow: '01',
    title: 'Purchase orders, parsed.',
    body: 'PDFs in. Structured POs out. Line items, ship-to, dates — all sortable, all queryable. No more re-keying email attachments at midnight.',
  },
  {
    eyebrow: '02',
    title: 'Batches and milestones.',
    body: 'Track every cut, sew, and pack milestone across factories. Buyers see what they need. Factories see what they need. Nobody waits on email.',
  },
  {
    eyebrow: '03',
    title: 'White-labeled per customer.',
    body: 'Atlas runs under each of your customers’ own domains, with their own brand. They see them. They never see us. You leave whenever you want.',
  },
]

export default function MarketingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />

      <main className="mx-auto w-full max-w-6xl px-6 pb-24 pt-16 md:pt-24">
        <section className="max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            Kuhler · Operational software
          </p>
          <h1 className="mt-4 text-5xl font-semibold leading-[1.05] tracking-tight text-[var(--ink)] md:text-6xl lg:text-7xl">
            Software for the people running{' '}
            <span className="italic text-[var(--accent)]">apparel production.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted)] md:text-xl">
            Atlas is our engine. Built for buyers, factories, and the operators between them —
            without the spreadsheets, the email chains, or the surprises.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="https://demo.kuhler.com"
              className="inline-flex items-center rounded-md bg-[var(--ink)] px-5 py-3 text-sm font-medium text-[var(--cream)] transition hover:opacity-90"
            >
              See Atlas in action →
            </Link>
            <Link
              href="mailto:hello@kuhler.com"
              className="inline-flex items-center rounded-md border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--cream)]"
            >
              Talk to us
            </Link>
          </div>
        </section>

        <section className="mt-24 grid gap-6 md:grid-cols-3">
          {capabilities.map((c) => (
            <article
              key={c.title}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:border-[var(--accent)]/40"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
                {c.eyebrow}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-[var(--ink)]">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{c.body}</p>
            </article>
          ))}
        </section>

        <section className="mt-24 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8 md:p-12">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-[var(--ink)] md:text-4xl">
            One platform. <span className="italic text-[var(--accent)]">Your customers’ brand.</span>
          </h2>
          <p className="mt-4 max-w-3xl text-[var(--muted)]">
            Each of your customers brings their own domain. They CNAME it at us. We render their
            portal under their identity. They get a clean, professional system without the cost of
            building one. You get a single platform to operate across all of them.
          </p>
        </section>
      </main>

      <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-6 text-xs text-[var(--muted)]">
          <span>© Kuhler</span>
          <span className="font-mono">hello@kuhler.com</span>
        </div>
      </footer>
    </div>
  )
}

function TopBar() {
  return (
    <header className="border-b border-[var(--border)] bg-[var(--cream)]/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight text-[var(--ink)]">
          Kuhler
        </Link>
        <nav className="flex items-center gap-2">
          <Link
            href="https://demo.kuhler.com"
            className="rounded-md px-3 py-1.5 text-sm text-[var(--muted)] transition hover:text-[var(--ink)]"
          >
            Demo
          </Link>
          <Link
            href="mailto:hello@kuhler.com"
            className="rounded-md bg-[var(--ink)] px-3 py-1.5 text-sm font-medium text-[var(--cream)] transition hover:opacity-90"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  )
}
