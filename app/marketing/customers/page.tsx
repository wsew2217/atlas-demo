import Link from 'next/link'

export const metadata = {
  title: 'Customers',
  description:
    'Apparel manufacturers and brokers running production on Atlas — from cut-and-sew to white-labeled customer portals.',
}

const verticals = [
  {
    title: 'Cut-and-sew apparel',
    body: 'Multi-factory manufacturers running production for athletic, performance, and lifestyle brands.',
  },
  {
    title: 'Workwear & uniforms',
    body: 'Operators serving school districts, athletic programs, and corporate uniform programs at scale.',
  },
  {
    title: 'Premium menswear',
    body: 'Boutique manufacturers serving heritage brands with high QC requirements and tight margins.',
  },
  {
    title: 'Promotional goods',
    body: 'Aggregators handling hundreds of small POs across dozens of customer brands every month.',
  },
]

const useCases = [
  {
    title: 'From email to ERP-grade',
    body: 'A 40-person manufacturer was running their entire PO pipeline through 14 Outlook tabs and a shared Excel. After six weeks on Atlas, every PO is structured, every batch tracked, and customer status questions dropped 80%.',
    metric: '80% fewer status pings',
  },
  {
    title: 'White-label portals replace status calls',
    body: 'A broker handling six brand customers used to spend mornings answering "where&rsquo;s my PO?" Now each brand has a portal under their own domain. Status pings dropped to near zero. The principal got their mornings back.',
    metric: 'Mornings reclaimed',
  },
  {
    title: 'One platform, two countries, three factories',
    body: 'A manufacturer with cut-and-sew in China and Cambodia consolidated three factory tracking systems into one Atlas instance. Factory users mark milestones from their phones. Buyers see updates live. No more "I&rsquo;ll check with the factory and get back to you."',
    metric: '3 factories · 1 platform',
  },
]

export default function CustomersPage() {
  return (
    <>
      <section className="mx-auto w-full max-w-5xl px-6 pb-12 pt-16 md:pt-24">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
          Customers
        </p>
        <h1 className="mt-3 text-4xl font-semibold leading-[1.05] tracking-tight text-[var(--ink)] md:text-6xl">
          Built with the people <span className="italic text-[var(--accent)]">running production.</span>
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[var(--muted)]">
          Kuhler is in early access — we&rsquo;re onboarding select apparel manufacturers and
          brokers. Customer logos and named case studies will live here as those launches go
          public. In the meantime, here&rsquo;s the shape of who&rsquo;s with us.
        </p>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--surface)]/40">
        <div className="mx-auto w-full max-w-6xl px-6 py-12">
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--muted)]">
            Customer logos · coming as launches go public
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex h-20 items-center justify-center rounded-md border border-dashed border-[var(--border)] bg-[var(--surface)]/60"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]/60">
                  Logo
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
          What we hear from operators
        </p>
        <h2 className="mt-2 max-w-3xl text-3xl font-semibold leading-tight text-[var(--ink)] md:text-4xl">
          The shape of <span className="italic text-[var(--accent)]">the wins.</span>
        </h2>
        <div className="mt-10 space-y-6">
          {useCases.map((u) => (
            <article
              key={u.title}
              className="grid gap-6 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8 md:grid-cols-[1fr_240px] md:p-10"
            >
              <div>
                <h3 className="font-display text-2xl font-semibold leading-snug text-[var(--ink)]">
                  {u.title}
                </h3>
                <p className="mt-3 text-[var(--muted)]">{u.body}</p>
              </div>
              <div className="flex md:flex-col md:items-end md:justify-center md:text-right">
                <div className="rounded-md border border-[var(--accent)]/30 bg-[var(--accent)]/5 px-4 py-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
                    Outcome
                  </p>
                  <p className="mt-1 font-display text-xl font-semibold text-[var(--ink)]">
                    {u.metric}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 text-xs text-[var(--muted)]">
          Composite stories from early-access conversations. Named case studies will publish as
          we go GA with each launch.
        </p>
      </section>

      {/* Testimonial */}
      <section className="border-y border-[var(--border)] bg-[var(--cream)]">
        <div className="mx-auto w-full max-w-4xl px-6 py-20 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            What an early customer said
          </p>
          <blockquote className="mt-8">
            <p className="font-display text-2xl leading-snug text-[var(--ink)] md:text-3xl lg:text-4xl">
              <span className="text-[var(--accent)]">&ldquo;</span>
              Atlas replaced 14 Outlook tabs and a shared spreadsheet. We onboarded our first
              three customers on it in two weeks. The branded portal piece is the hook for{' '}
              <em className="text-[var(--accent)]">them</em> — but the operator side is the hook
              for <em className="text-[var(--accent)]">us</em>.
              <span className="text-[var(--accent)]">&rdquo;</span>
            </p>
            <footer className="mt-8 flex items-center justify-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--ink)] font-display text-lg text-[var(--cream)]">
                ◆
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-[var(--ink)]">
                  Operations leader · Operator-tier customer
                </p>
                <p className="font-mono text-xs text-[var(--muted)]">
                  Real customer quote · attribution coming as launches go public
                </p>
              </div>
            </footer>
          </blockquote>
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--surface)]/40">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            Verticals served
          </p>
          <h2 className="mt-2 max-w-3xl text-3xl font-semibold leading-tight text-[var(--ink)] md:text-4xl">
            We know <span className="italic text-[var(--accent)]">your category.</span>
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {verticals.map((v) => (
              <article
                key={v.title}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6"
              >
                <h3 className="text-lg font-semibold leading-snug text-[var(--ink)]">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{v.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 py-20">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--ink)] px-8 py-12 text-[var(--cream)] md:px-12 md:py-16">
          <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight md:text-4xl">
            Want to be one of the <span className="italic text-[var(--accent)]">named ones?</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--cream)]/70">
            We&rsquo;re onboarding a handful of operators this quarter. Get in early; help us
            shape the product; get a flagship case study with your logo on it.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-md bg-[var(--cream)] px-5 py-3 text-sm font-medium text-[var(--ink)] transition hover:opacity-90"
            >
              Talk to us about early access
            </Link>
            <Link
              href="https://demo.kuhler.com"
              className="inline-flex items-center rounded-md border border-[var(--cream)]/30 px-5 py-3 text-sm font-medium text-[var(--cream)] transition hover:bg-[var(--cream)]/10"
            >
              See the demo →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
