import Link from 'next/link'

export const metadata = {
  title: 'About',
  description:
    'Kuhler is built by operators who&rsquo;ve run apparel production. Atlas exists because we got tired of email chains.',
}

const values = [
  {
    title: 'Customers own their identity.',
    body: 'No hostage situations. Each customer brings their own domain; pulling the CNAME goes dark. We earn the relationship every renewal — we don&rsquo;t lock you in by holding your data or your buyer relationships.',
  },
  {
    title: 'Operations beats features.',
    body: 'We don&rsquo;t ship features for the changelog. Every screen earns its place by replacing a workflow that was costing you mornings — POs out of email, batches off spreadsheets, status off the phone.',
  },
  {
    title: 'Real factories. Real plants. Real shifts.',
    body: 'Atlas is shaped by people working second shift in cut-and-sew, not by a product manager who&rsquo;s never been on a factory floor. The factory UX is mobile-first because Cici works from her phone.',
  },
  {
    title: 'Boring infrastructure.',
    body: 'Postgres. Vercel. HTTPS. Boring is reliable. We don&rsquo;t innovate on the layers that need to never break. We innovate on the layers that move your operation forward.',
  },
]

const team = [
  {
    name: 'Founder name',
    role: 'CEO · Founder',
    bio: 'Twenty years operating apparel manufacturers across China and Cambodia. Started Kuhler after running the same workflow on email and spreadsheets one too many seasons.',
    initials: 'F',
  },
  {
    name: 'Co-founder name',
    role: 'Operations · Co-founder',
    bio: 'Factory floor for fifteen years. Knows what a good QC photo looks like. Knows when a batch is going to slip before the milestone date.',
    initials: 'C',
  },
  {
    name: 'Engineering lead',
    role: 'Engineering',
    bio: 'Builds the platform. Cares about the parts you don&rsquo;t see — RLS, multi-tenancy, performance. The reason Atlas onboards in a business day.',
    initials: 'E',
  },
]

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto w-full max-w-5xl px-6 pb-12 pt-16 md:pt-24">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
          About Kuhler
        </p>
        <h1 className="mt-3 text-4xl font-semibold leading-[1.05] tracking-tight text-[var(--ink)] md:text-6xl">
          We got tired of <span className="italic text-[var(--accent)]">the email chains.</span>
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[var(--muted)]">
          Kuhler exists because apparel production runs on email and spreadsheets that fall over
          the moment a buyer asks the wrong question on the wrong day. Atlas is the engine inside
          Kuhler — the operational stack we wished existed when we were running production
          ourselves.
        </p>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 pb-20">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8 md:p-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
            Why we&rsquo;re building this
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold leading-snug text-[var(--ink)] md:text-3xl">
            The platform we wished existed when we were the operators.
          </h2>
          <div className="mt-6 space-y-4 text-[var(--muted)]">
            <p>
              Apparel production has had software for thirty years. ERPs. PLMs. WMSs. None of
              them were built for the manufacturer between the brand and the factory — the broker
              running cut-and-sew across two plants in Jiangsu and one in Phnom Penh, with a
              customer in Texas asking three times a day where their PO is.
            </p>
            <p>
              That seat — operations at the manufacturer — is where the workflow lives. It&rsquo;s
              also where every existing tool fails. Atlas is built for that seat first. Customers
              and factories get views into Atlas; the operator owns the system of record.
            </p>
            <p>
              We white-label every customer portal under the customer&rsquo;s own domain because
              we&rsquo;ve been on the other side. We never wanted our suppliers to hold our buyer
              relationships hostage. We don&rsquo;t do that to ours.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--surface)]/40">
        <div className="mx-auto w-full max-w-5xl px-6 py-20">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            What we believe
          </p>
          <h2 className="mt-2 max-w-3xl text-3xl font-semibold leading-tight text-[var(--ink)] md:text-4xl">
            Four things we won&rsquo;t <span className="italic text-[var(--accent)]">compromise on.</span>
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {values.map((v) => (
              <article
                key={v.title}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6"
              >
                <h3 className="text-lg font-semibold leading-snug text-[var(--ink)]">
                  {v.title}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed text-[var(--muted)]"
                  dangerouslySetInnerHTML={{ __html: v.body }}
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 py-20">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
          Team
        </p>
        <h2 className="mt-2 max-w-3xl text-3xl font-semibold leading-tight text-[var(--ink)] md:text-4xl">
          The people <span className="italic text-[var(--accent)]">behind Kuhler.</span>
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {team.map((t) => (
            <article
              key={t.name}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--ink)] font-display text-2xl text-[var(--cream)]">
                {t.initials}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--ink)]">{t.name}</h3>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
                {t.role}
              </p>
              <p
                className="mt-3 text-sm leading-relaxed text-[var(--muted)]"
                dangerouslySetInnerHTML={{ __html: t.bio }}
              />
            </article>
          ))}
        </div>
        <p className="mt-6 text-xs text-[var(--muted)]">
          Real names and photos go here once we&rsquo;re ready to put faces on the page.
        </p>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 py-20">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--ink)] px-8 py-12 text-[var(--cream)] md:px-12 md:py-16">
          <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight md:text-4xl">
            Let&rsquo;s talk <span className="italic text-[var(--accent)]">operations.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--cream)]/70">
            If you&rsquo;re running production and tired of the email chain, we want to meet you.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-md bg-[var(--cream)] px-5 py-3 text-sm font-medium text-[var(--ink)] transition hover:opacity-90"
            >
              Book a 15-min walkthrough
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
