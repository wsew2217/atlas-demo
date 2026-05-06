import Link from 'next/link'
import { RoiCalculator } from '@/components/marketing/RoiCalculator'

export const metadata = {
  title: 'Pricing',
  description:
    'Pricing tailored to your operation — Foundation, Operator, and Scale tiers, plus Enterprise for 25+ customers. Quoted on a 15-minute call.',
}

const tiers = [
  {
    name: 'Foundation',
    band: '1–5 customer portals',
    eyebrow: 'For new and small operators',
    description:
      'You make product for a handful of customers. Each one matters. We onboard each of them with you, hands-on.',
    cta: 'Talk to us',
    features: [
      '1–5 branded portals under your customers\' domains',
      'Atlas operations dashboard for the manufacturer',
      'POs · batches · milestones · QC · ship',
      'Conversation thread per order',
      'Per-customer SKU and product catalog',
      'White-glove onboarding for every customer',
      'Standard email support · 1-business-day response',
    ],
  },
  {
    name: 'Operator',
    band: '6–10 customer portals',
    highlight: true,
    eyebrow: 'For growing operators with a playbook',
    description:
      'You\'ve onboarded enough customers to know the shape of the work. Pricing reflects faster onboarding and a real support cadence.',
    cta: 'Talk to us',
    features: [
      '6–10 branded portals under your customers\' domains',
      'Custom rules and workflows per customer',
      'Onboarding playbook with reusable customer templates',
      'Factory user accounts with mobile-friendly UI',
      'Priority support · 4-hour response · shared Slack channel',
      'Quarterly business review with the Kuhler team',
    ],
  },
  {
    name: 'Scale',
    band: '11–25 customer portals',
    eyebrow: 'For established operators with throughput',
    description:
      'You\'re running production at real volume. We dedicate a CSM, build out parallel onboarding capacity, and tighten the SLAs.',
    cta: 'Talk to us',
    features: [
      '11–25 branded portals under your customers\' domains',
      'Dedicated customer success manager',
      'Onboarding throughput: 3–4 new customers per quarter',
      'Custom integrations (ERP, BI, factory MES)',
      'API access + webhooks',
      '99.9% uptime SLA · 1-hour response',
      'Monthly business review',
    ],
  },
]

const faqs = [
  {
    q: 'Why are the customer bands tight?',
    a: 'Because each customer is real work. We onboard you and your customer together — SKU mapping, product catalog, per-customer rules, workflows, training. The bands reflect what we can actually deliver well. We&rsquo;d rather be honest about throughput than promise unlimited and underdeliver.',
  },
  {
    q: 'What if I&rsquo;m running more than 25 customers?',
    a: 'Talk to us about Enterprise. At that volume you need a dedicated onboarding team, custom contracts, and infrastructure choices that don&rsquo;t make sense to publish. We tailor every aspect of the engagement.',
  },
  {
    q: 'Why don&rsquo;t you list dollar prices?',
    a: 'Because pricing depends on more than customer count — number of factories, volume of POs, integration scope, support tier. We quote on a 15-minute call so you don&rsquo;t pay for capacity you won&rsquo;t use.',
  },
  {
    q: 'How does white-labeling actually work?',
    a: 'Each customer brings their own domain. They CNAME it at our Vercel project. We add a row to the tenants table mapping the domain to the customer&rsquo;s brand. SSL auto-issues via Let&rsquo;s Encrypt. Live within a business day, no engineering on either side.',
  },
  {
    q: 'Who owns the data?',
    a: 'You do. Your customers do for theirs. Atlas is the system of record while you&rsquo;re a customer; full export to CSV/Postgres dump available any time. Pull a CNAME and the portal goes dark — we never had hostage power over your customer relationships.',
  },
  {
    q: 'How long does onboarding take?',
    a: 'Foundation: about a week per customer. Operator: faster after the second or third (the playbook kicks in) — usually 3–4 days. Scale: we run 2–3 customers in parallel with the CSM. Enterprise: dedicated team, scoped per engagement.',
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
          Three tiers, sized by how many customers you&rsquo;re running. Each tier reflects the
          shape of the work — onboarding throughput, support cadence, and capacity dedicated to
          your operation. We quote on a 15-minute call so you don&rsquo;t pay for capacity you
          won&rsquo;t use.
        </p>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-12">
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
              <p className="mt-2 font-mono text-xs text-[var(--muted)]">{t.band}</p>
              <p className="mt-4 text-sm text-[var(--muted)]">{t.description}</p>

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

      {/* Enterprise strip */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--cream)] px-6 py-8 md:flex md:items-center md:justify-between md:gap-8 md:px-10 md:py-10">
          <div className="flex-1">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
              Enterprise · 25+ customer portals
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold leading-snug text-[var(--ink)] md:text-3xl">
              Running more than 25 customers? <span className="italic text-[var(--accent)]">Let&rsquo;s talk Enterprise.</span>
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-[var(--muted)]">
              At that volume, every aspect is custom: dedicated onboarding team, white-label
              everything, public API + webhooks, SSO via Clerk Organizations, custom contracts,
              negotiated SLAs, DPA on request. We tailor the engagement to your operation.
            </p>
          </div>
          <div className="mt-6 md:mt-0 md:shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-md bg-[var(--ink)] px-5 py-3 text-sm font-medium text-[var(--cream)] transition hover:opacity-90"
            >
              Talk to us about Enterprise →
            </Link>
          </div>
        </div>
      </section>

      {/* ROI calculator */}
      <section className="mx-auto w-full max-w-5xl px-6 py-16">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
          ROI
        </p>
        <h2 className="mt-2 text-3xl font-semibold leading-tight text-[var(--ink)] md:text-4xl">
          Estimate the <span className="italic text-[var(--accent)]">savings.</span>
        </h2>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">
          Time reclaimed from status coordination + auto PO intake. Adjust to your shape.
        </p>
        <div className="mt-8">
          <RoiCalculator />
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
            Tell us your shape — number of customers, factories, the kind of POs you&rsquo;re
            running. We&rsquo;ll tell you the tier, the timeline, and the price.
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
