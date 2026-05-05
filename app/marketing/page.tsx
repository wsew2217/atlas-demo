import Link from 'next/link'

export const metadata = {
  title: 'Kuhler — Operational software for apparel manufacturers',
  description:
    'Atlas is the operational engine inside Kuhler. POs, batches, factories, and branded customer portals on one platform.',
}

const capabilities = [
  {
    eyebrow: '01',
    title: 'Purchase orders, parsed.',
    body: 'PDFs in. Structured POs out. Line items, ship-to, dates — sortable, queryable, exportable. No more re-keying email attachments at midnight.',
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

const personas = [
  {
    title: 'Manufacturers running multiple factories',
    body: 'You run cut-and-sew across two, three, five plants. Atlas pulls every batch, every milestone, into one view that doesn’t lie.',
  },
  {
    title: 'Brokers giving every customer a branded portal',
    body: 'Your customers ask for status six times a day. Hand them a branded portal under their own domain. They self-serve. You stop being a status switchboard.',
  },
  {
    title: 'Teams that have outgrown email and spreadsheets',
    body: 'You know the drill — 14 tabs, three "PO trackers," a Slack channel of screenshots. Atlas replaces all of it with one source of truth.',
  },
]

const verticals = [
  'Cut-and-sew apparel',
  'Performance & athletic',
  'Workwear & uniforms',
  'Premium menswear',
  'Promotional goods',
  'Custom team apparel',
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-12 md:pb-24 md:pt-20">
        <div className="max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            Kuhler · Operational software
          </p>
          <h1 className="mt-4 text-5xl font-semibold leading-[1.04] tracking-tight text-[var(--ink)] md:text-6xl lg:text-7xl">
            For the people running{' '}
            <span className="italic text-[var(--accent)]">apparel production.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted)] md:text-xl">
            Atlas pulls your POs, batches, factories, and customers into one platform —
            and gives every customer their own branded portal under their own domain.
            Without the spreadsheets. Without the email chains. Without the surprises.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-md bg-[var(--ink)] px-5 py-3 text-sm font-medium text-[var(--cream)] transition hover:opacity-90"
            >
              Book a 15-min walkthrough
            </Link>
            <Link
              href="https://demo.kuhler.com"
              className="inline-flex items-center rounded-md border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--cream)]"
            >
              See the live demo →
            </Link>
          </div>
        </div>
      </section>

      {/* Trust band */}
      <section className="border-y border-[var(--border)] bg-[var(--surface)]/50">
        <div className="mx-auto w-full max-w-6xl px-6 py-10">
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--muted)]">
            Built for apparel teams shipping
          </p>
          <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {verticals.map((v) => (
              <li
                key={v}
                className="font-display text-base italic text-[var(--ink)]/70 md:text-lg"
              >
                {v}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* See it in action — dashboard preview */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
              See it in action
            </p>
            <h2 className="mt-2 text-3xl font-semibold leading-tight text-[var(--ink)] md:text-4xl">
              One platform. <span className="italic text-[var(--accent)]">Two perspectives.</span>
            </h2>
            <p className="mt-3 max-w-2xl text-[var(--muted)]">
              The same data, rendered for whoever&rsquo;s looking. Manufacturer admins see
              operations. Customers see their orders, branded as their company.
            </p>
          </div>
          <Link
            href="https://demo.kuhler.com"
            className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent)] hover:text-[var(--ink)]"
          >
            Open the live demo →
          </Link>
        </div>
        <DashboardPreview />
      </section>

      {/* Capabilities */}
      <section className="border-y border-[var(--border)] bg-[var(--surface)]/40">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            What it does
          </p>
          <h2 className="mt-2 max-w-3xl text-3xl font-semibold leading-tight text-[var(--ink)] md:text-4xl">
            The operational stack for apparel,{' '}
            <span className="italic text-[var(--accent)]">on one platform.</span>
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
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
          </div>
          <div className="mt-8">
            <Link
              href="/product"
              className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent)] hover:text-[var(--ink)]"
            >
              Read the full product story →
            </Link>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
          Who it&rsquo;s for
        </p>
        <h2 className="mt-2 max-w-3xl text-3xl font-semibold leading-tight text-[var(--ink)] md:text-4xl">
          If you&rsquo;re running production,{' '}
          <span className="italic text-[var(--accent)]">we&rsquo;re built for you.</span>
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {personas.map((p) => (
            <article
              key={p.title}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6"
            >
              <h3 className="text-lg font-semibold leading-snug text-[var(--ink)]">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="border-y border-[var(--border)] bg-[var(--surface)]/40">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                Pricing
              </p>
              <h2 className="mt-2 max-w-2xl text-3xl font-semibold leading-tight text-[var(--ink)] md:text-4xl">
                Tailored to <span className="italic text-[var(--accent)]">your shape.</span>
              </h2>
              <p className="mt-3 max-w-xl text-[var(--muted)]">
                Foundation, Operator, Platform — pick the tier that fits your operation. We quote
                pricing on a 15-minute call so you don&rsquo;t pay for capacity you won&rsquo;t use.
              </p>
            </div>
            <Link
              href="/pricing"
              className="inline-flex items-center rounded-md border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--cream)]"
            >
              See pricing tiers →
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--ink)] px-8 py-12 text-[var(--cream)] md:px-12 md:py-16">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--cream)]/60">
            Ready when you are
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight md:text-4xl">
            Stop being the <span className="italic text-[var(--accent)]">status hotline.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--cream)]/70">
            Click through the live demo, or book a 15-minute walkthrough and we&rsquo;ll
            show you Atlas against your actual workflow.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-md bg-[var(--cream)] px-5 py-3 text-sm font-medium text-[var(--ink)] transition hover:opacity-90"
            >
              Book a walkthrough
            </Link>
            <Link
              href="https://demo.kuhler.com"
              className="inline-flex items-center rounded-md border border-[var(--cream)]/30 px-5 py-3 text-sm font-medium text-[var(--cream)] transition hover:bg-[var(--cream)]/10"
            >
              See the live demo →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

function DashboardPreview() {
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--cream)] shadow-sm">
      <div className="flex items-center gap-3 border-b border-[var(--border)] bg-[var(--surface)] px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--ink)]/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--ink)]/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--ink)]/15" />
        </div>
        <div className="flex-1 rounded-md border border-[var(--border)] bg-[var(--cream)] px-3 py-1 text-center font-mono text-[11px] text-[var(--muted)]">
          demo.kuhler.com
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">Live</span>
      </div>

      <div className="grid gap-0 md:grid-cols-2">
        <div className="border-b border-[var(--border)] p-6 md:border-b-0 md:border-r">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
            Manufacturer admin · /demo
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold text-[var(--ink)]">Dashboard</h3>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <PreviewKpi label="Open POs" value="4" />
            <PreviewKpi label="In production" value="3" />
            <PreviewKpi label="Units in flight" value="4,450" />
            <PreviewKpi label="Milestones / wk" value="4" />
          </div>
          <div className="mt-5 space-y-1.5">
            {[
              { code: 'PO-2417', brand: 'Summit Athletics', status: 'in_production' },
              { code: 'PO-2418', brand: 'Summit Athletics', status: 'in_production' },
              { code: 'PO-2421', brand: 'Meridian Apparel', status: 'in_production' },
              { code: 'PO-2425', brand: 'Meridian Apparel', status: 'received' },
            ].map((row) => (
              <div
                key={row.code}
                className="flex items-center justify-between rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs"
              >
                <span className="font-mono text-[var(--ink)]">{row.code}</span>
                <span className="text-[var(--muted)]">{row.brand}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    row.status === 'in_production'
                      ? 'bg-[var(--accent)]/15 text-[var(--accent)]'
                      : 'bg-[var(--ink)]/10 text-[var(--ink)]'
                  }`}
                >
                  {row.status === 'in_production' ? 'In production' : 'Received'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[var(--surface)] p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
            Customer portal · /portal/summit
          </p>
          <h3
            className="mt-2 font-display text-2xl font-semibold"
            style={{ color: '#14532D' }}
          >
            Summit Athletics
          </h3>
          <p className="mt-1 font-mono text-[11px] text-[var(--muted)]">
            Live status across 3 orders
          </p>
          <div className="mt-5 space-y-3">
            {[
              { code: 'PO-2417', label: 'Heavyweight hoodie', units: '2,400', progress: 40 },
              { code: 'PO-2418', label: 'Performance tee', units: '1,200', progress: 60 },
            ].map((row) => (
              <div
                key={row.code}
                className="rounded-md border border-[var(--border)] bg-[var(--cream)] px-4 py-3"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[11px] text-[var(--ink)]">{row.code}</span>
                  <span className="font-mono text-[10px] text-[var(--muted)]">{row.progress}%</span>
                </div>
                <p className="mt-0.5 text-sm font-medium text-[var(--ink)]">{row.label}</p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[var(--border)]">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${row.progress}%`, backgroundColor: '#14532D' }}
                  />
                </div>
                <p className="mt-1.5 font-mono text-[10px] text-[var(--muted)]">
                  {row.units} units · in production
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function PreviewKpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">{label}</p>
      <p className="mt-1 font-display text-xl font-semibold text-[var(--ink)]">{value}</p>
    </div>
  )
}
