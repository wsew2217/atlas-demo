import Link from 'next/link'
import { WaitlistForm } from '@/components/marketing/WaitlistForm'

export const metadata = {
  title: 'Join the waitlist · Kuhler',
  description:
    'Kuhler is in early access. Join the waitlist and we’ll reach out as new operator tenants open up.',
}

const what = [
  {
    eyebrow: '01',
    title: 'A real tenant, not a sales call.',
    body: 'When your slot opens, we provision an Atlas tenant with your data shape (we can ingest a few of your real POs under NDA so you’re seeing your work, not ours).',
  },
  {
    eyebrow: '02',
    title: 'Help shape the product.',
    body: 'Early operators get direct access to the team building Atlas — and meaningful input on what we build next. TRG Apparel, our first beta customer, already drives several roadmap items.',
  },
  {
    eyebrow: '03',
    title: 'Pricing locked at early-access rates.',
    body: 'Founding customers keep their pricing as we grow. The list price will change. Yours won’t.',
  },
]

export default function WaitlistPage() {
  return (
    <>
      <section className="mx-auto w-full max-w-3xl px-6 pb-12 pt-16 md:pt-24">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
          ● Early access · limited slots
        </p>
        <h1 className="mt-3 text-4xl font-semibold leading-[1.05] tracking-tight text-[var(--ink)] md:text-6xl">
          Join the <span className="italic text-[var(--accent)]">waitlist.</span>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-[var(--muted)]">
          We&rsquo;re onboarding operators in small batches so each one gets the time and the
          tenant they actually need. <Link href="/customers/trg-apparel" className="text-[var(--ink)] underline-offset-2 hover:underline">TRG Apparel</Link>{' '}
          is our first beta customer; the next slots open as we&rsquo;re ready.
        </p>
        <p className="mt-3 text-sm text-[var(--muted)]">
          Need to talk to someone now?{' '}
          <Link href="/contact" className="text-[var(--ink)] underline-offset-2 hover:underline">
            Book a discovery call →
          </Link>
        </p>
      </section>

      <section className="mx-auto w-full max-w-3xl px-6 pb-20">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 md:p-10">
          <WaitlistForm />
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--cream)]">
        <div className="mx-auto w-full max-w-5xl px-6 py-16">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            What you get
          </p>
          <h2 className="mt-2 max-w-3xl text-3xl font-semibold leading-tight text-[var(--ink)] md:text-4xl">
            Early access is <span className="italic text-[var(--accent)]">not a beta program.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--muted)]">
            It&rsquo;s a small group of real operators running production on Atlas — with the
            attention and pricing that come with being first.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {what.map((w) => (
              <article
                key={w.title}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
                  {w.eyebrow}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-[var(--ink)]">
                  {w.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{w.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 py-16">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--ink)] px-8 py-12 text-[var(--cream)] md:px-12">
          <h2 className="max-w-3xl font-display text-2xl font-semibold leading-tight md:text-3xl">
            Want to see it before joining the list?
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--cream)]/70">
            The light demo is open at{' '}
            <a
              href="https://demo.kuhler.com"
              className="text-[var(--accent)] underline-offset-2 hover:underline"
            >
              demo.kuhler.com
            </a>{' '}
            — no signup needed.
          </p>
        </div>
      </section>
    </>
  )
}
