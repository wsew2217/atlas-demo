import Link from 'next/link'
import { ContactForm } from '@/components/marketing/ContactForm'

export const metadata = {
  title: 'Contact',
  description:
    'Book a 15-minute walkthrough or send us a note. We read every message.',
}

const CALENDLY_URL = 'https://calendly.com/kuhler/demo'

export default function ContactPage() {
  return (
    <>
      <section className="mx-auto w-full max-w-5xl px-6 pb-12 pt-16 md:pt-24">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
          Contact
        </p>
        <h1 className="mt-3 text-4xl font-semibold leading-[1.05] tracking-tight text-[var(--ink)] md:text-6xl">
          Talk to <span className="italic text-[var(--accent)]">us.</span>
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[var(--muted)]">
          Book a 15-minute walkthrough and we&rsquo;ll show you Atlas against your actual
          workflow — or send us a note and we&rsquo;ll get back within one business day.
        </p>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
              Send a note
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-[var(--ink)] md:text-3xl">
              Tell us about your operation.
            </h2>
            <p className="mt-3 text-[var(--muted)]">
              The more shape we have, the better the first call goes.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
                Or book directly
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold text-[var(--ink)]">
                Skip the form. Pick a time.
              </h3>
              <p className="mt-3 text-sm text-[var(--muted)]">
                15 minutes on the calendar. We&rsquo;ll come prepared with questions about your
                operation; you come with whatever&rsquo;s on your mind.
              </p>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener"
                className="mt-5 inline-flex items-center rounded-md bg-[var(--ink)] px-4 py-2.5 text-sm font-medium text-[var(--cream)] transition hover:opacity-90"
              >
                Book on Calendly →
              </a>
            </div>

            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
                Direct email
              </p>
              <a
                href="mailto:hello@kuhler.com"
                className="mt-2 block font-mono text-sm text-[var(--ink)] underline-offset-2 hover:underline"
              >
                hello@kuhler.com
              </a>
              <p className="mt-3 text-xs text-[var(--muted)]">
                We read every email. We don&rsquo;t auto-respond. We don&rsquo;t add you to a list.
              </p>
            </div>

            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
                Already a customer
              </p>
              <p className="mt-2 text-sm text-[var(--ink)]">
                Open a support ticket from inside your Atlas portal. We respond within one
                business day on Foundation, four hours on Operator, one hour on Platform.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 pb-20">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--cream)] px-8 py-10 md:px-12">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            Just kicking the tires?
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-[var(--ink)] md:text-3xl">
            <Link
              href="https://demo.kuhler.com"
              className="inline-flex items-center gap-2 hover:text-[var(--accent)]"
            >
              Click around the live demo first.
              <span className="text-[var(--accent)]">→</span>
            </Link>
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--muted)]">
            Manufacturer admin, two customer portals, a factory user view, with a working
            conversation thread between them. No signup required.
          </p>
        </div>
      </section>
    </>
  )
}
