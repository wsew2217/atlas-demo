import Link from 'next/link'

export const metadata = {
  title: 'Pricing',
  description:
    'Pricing tailored to your operation — Foundation, Operator, and Platform tiers. Quoted on a 15-minute call.',
}

const tiers = [
  {
    name: 'Foundation',
    eyebrow: 'For single-customer manufacturers',
    description:
      'You make product for one buyer. You want POs out of email and into a system that won&rsquo;t lose a line item.',
    cta: 'Talk to us',
    features: [
      'One customer portal under your domain',
      'Atlas operations dashboard for the manufacturer',
      'POs · batches · milestones · QC · ship',
      'Conversation thread per order',
      'Standard email support',
      'Onboarded in under a week',
    ],
  },
  {
    name: 'Operator',
    eyebrow: 'For multi-customer manufacturers and brokers',
    highlight: true,
    description:
      'You make product for many buyers. Each customer wants their own portal, branded as them. You want one platform.',
    cta: 'Talk to us',
    features: [
      'Up to 25 branded customer portals',
      'Custom CSS variables per tenant',
      'Factory user accounts with mobile-friendly UI',
      'Per-customer conversation threads',
      'Priority support · Slack channel',
      'Concierge onboarding for each new customer',
    ],
  },
  {
    name: 'Platform',
    eyebrow: 'For high-volume operators and aggregators',
    description:
      'You run hundreds of customers across dozens of factories. You need API access, custom integrations, and dedicated support.',
    cta: 'Talk to us',
    features: [
      'Unlimited branded portals',
      'White-label everything · zero Kuhler branding visible',
      'Public API + webhooks for ERP/BI integration',
      'SSO via Clerk Organizations',
      'Dedicated customer success manager',
      'Custom SLAs · DPA on request',
    ],
  },
]

const faqs = [
  {
    q: 'Why don&rsquo;t you list prices?',
    a: 'Because pricing depends on your shape — number of customers, number of factories, volume of POs. We quote on a call so you don&rsquo;t pay for capacity you won&rsquo;t use. The call takes 15 minutes.',
  },
  {
    q: 'How does white-labeling actually work?',
    a: 'Each customer brings their own domain. They CNAME it at our Vercel project. We add a row to the tenants table mapping the domain to the customer&rsquo;s brand. SSL auto-issues via Let&rsquo;s Encrypt. Live within a business day, no engineering on either side.',
  },
  {
    q: 'Who owns the data?',
    a: 'You do. Your customers do for theirs. Atlas is the system of record while you&rsquo;re a customer; full export to CSV/Postgres dump available any time. Pull the CNAME and the portal goes dark — we never had hostage power over your customer relationships.',
  },
  {
    q: 'How long does onboarding take?',
    a: 'Foundation: 3–5 business days. Operator: about a week including the first two customer portals. Platform: about two weeks including SSO, API integration, and DPA review. We do white-glove onboarding on every tier — you&rsquo;re not figuring out a checklist alone.',
  },
  {
    q: 'What if I want to leave?',
    a: 'Export your data and pull the CNAMEs. We&rsquo;ll send you a Postgres dump, line by line. Your customers can then point their domains anywhere they want. We mean it about no hostage situations.',
  },
  {
    q: 'Is there a free trial?',
    a: 'No, but there&rsquo;s a sandbox: book a walkthrough and we&rsquo;ll set up a tenant with a few of your real POs (under NDA). You see Atlas against your shape, not ours, before signing anything.',
  },
]

export default function PricingPage() {
  return (
    <>
      <section className="mx-auto w-full max-w-5xl px-6 pb-12 pt-16 md:pt-24">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
          Pricing
        </p>
        <h1 className="mt-3 text-4xl font-semibold leading-[1.05] tracking-tight text-[var(--ink)] md:text-6xl">
          Tailored to <span className="italic text-[var(--accent)]">your shape.</span>
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[var(--muted)]">
          Three tiers, picked to match how you actually run production. We quote on a 15-minute
          call so you don&rsquo;t pay for capacity you won&rsquo;t use.
        </p>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((t) => (
            <article
              key={t.name}
              className={`flex flex-col rounded-lg border bg-[var(--surface)] p-7 ${
                t.highlight
                  ? 'border-[var(--accent)] shadow-md'
                  : 'border-[var(--border)]'
              }`}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
                {t.eyebrow}
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-[var(--ink)]">
                {t.name}
              </h2>
              <p className="mt-3 text-sm text-[var(--muted)]">{t.description}</p>

              <ul className="mt-6 flex-1 space-y-2.5 border-t border-[var(--border)] pt-6 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex gap-2 text-[var(--ink)]">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className={`mt-7 inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium transition ${
                  t.highlight
                    ? 'bg-[var(--ink)] text-[var(--cream)] hover:opacity-90'
                    : 'border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--cream)]'
                }`}
              >
                {t.cta} →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--surface)]/40">
        <div className="mx-auto w-full max-w-4xl px-6 py-20">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            FAQ
          </p>
          <h2 className="mt-2 text-3xl font-semibold leading-tight text-[var(--ink)] md:text-4xl">
            The honest <span className="italic text-[var(--accent)]">questions.</span>
          </h2>
          <dl className="mt-10 space-y-8">
            {faqs.map((f) => (
              <div key={f.q} className="border-b border-[var(--border)] pb-7">
                <dt
                  className="font-display text-xl font-semibold text-[var(--ink)]"
                  dangerouslySetInnerHTML={{ __html: f.q }}
                />
                <dd
                  className="mt-3 text-[var(--muted)]"
                  dangerouslySetInnerHTML={{ __html: f.a }}
                />
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 py-20">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--ink)] px-8 py-12 text-[var(--cream)] md:px-12 md:py-16">
          <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight md:text-4xl">
            Get a quote in <span className="italic text-[var(--accent)]">15 minutes.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--cream)]/70">
            Tell us your shape. We&rsquo;ll tell you the tier, the timeline, and the price.
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
