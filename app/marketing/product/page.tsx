import Link from 'next/link'
import { WorkflowDiagram } from '@/components/marketing/WorkflowDiagram'

export const metadata = {
  title: 'Product · How Atlas works',
  description:
    'Atlas is the operational engine inside Kuhler — POs, batches, factories, and customer portals on one multi-tenant platform.',
}

const features = [
  {
    eyebrow: '01 · Intake',
    title: 'POs in any format, structured automatically.',
    body: 'Drop a PDF, a CSV, or forward an email. Atlas extracts line items, ship-to, dates, and SKUs into a structured PO that downstream systems can actually use. Manual re-keying disappears.',
    sub: 'PDF parsing · CSV import · email forwarding · GTIN/UPC extraction',
  },
  {
    eyebrow: '02 · Allocation',
    title: 'POs become production batches across factories.',
    body: 'Split a PO across multiple plants. Assign units. Pick fabric and trim sources. Atlas keeps the relationship intact — every batch knows which PO it serves and which lines it fulfills.',
    sub: 'Multi-factory · split allocation · capacity confirmations',
  },
  {
    eyebrow: '03 · Production',
    title: 'Milestones tracked at the batch level.',
    body: 'Materials sourced, cut & sew, midpoint, QC, pack & ship. Factory users mark milestones complete from a focused mobile-friendly view. Buyers see updates live in their portal — no email loop.',
    sub: 'Milestone timeline · automatic timestamps · factory mobile UX',
  },
  {
    eyebrow: '04 · Conversation',
    title: 'One thread. Two-sided.',
    body: 'Buyer asks a question on their portal. Manufacturer answers. Factory uploads a QC photo. System posts auto-updates as milestones change. Every order has its own thread; nothing gets lost in email forwards.',
    sub: 'Portal-side replies · system updates · attachments',
  },
  {
    eyebrow: '05 · White-label',
    title: 'Each customer gets their own portal under their own domain.',
    body: 'Customer brings their domain. They CNAME at us. We render their portal branded as them. They never see "Kuhler" or the manufacturer&rsquo;s competitors. They can leave at any time by pulling the CNAME — no hostage situations.',
    sub: 'Per-tenant CSS · custom domains · auto-issued SSL',
  },
  {
    eyebrow: '06 · Analytics',
    title: 'Operational metrics that mean something.',
    body: 'Open POs, in-production units, milestones this week, on-time rate per factory, mean time per milestone — surfaced on the dashboard, exportable to your BI tool.',
    sub: 'KPIs · per-factory rollups · CSV export',
  },
]

const architecture = [
  {
    title: 'Multi-tenant by design',
    body: 'One platform, many tenants. Each tenant&rsquo;s data is isolated by row-level security. New customer onboarding takes one INSERT and a CNAME — usually live within a business day.',
  },
  {
    title: 'Built on Postgres + Vercel',
    body: 'Serverless functions, edge-cached static assets, branded customer portals over HTTPS. SOC-2 ready posture from day one.',
  },
  {
    title: 'API-first',
    body: 'Every screen in Atlas is backed by a documented endpoint. Plug your own tools in — ERP, BI, factory MES — and we&rsquo;ll keep talking to all of them.',
  },
]

export default function ProductPage() {
  return (
    <>
      <section className="mx-auto w-full max-w-5xl px-6 pb-12 pt-16 md:pt-24">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
          Product
        </p>
        <h1 className="mt-3 text-4xl font-semibold leading-[1.05] tracking-tight text-[var(--ink)] md:text-6xl">
          How Atlas <span className="italic text-[var(--accent)]">actually works.</span>
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[var(--muted)]">
          Atlas is the operational engine inside Kuhler. It moves a purchase order from
          email attachment to packed pallet — without you copy-pasting it five times along
          the way. Below, end-to-end, what it actually does.
        </p>
      </section>

      {/* Workflow diagram */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="mb-6">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            Architecture
          </p>
          <h2 className="mt-2 text-2xl font-semibold leading-tight text-[var(--ink)] md:text-3xl">
            From PDF to packed, <span className="italic text-[var(--accent)]">on one platform.</span>
          </h2>
        </div>
        <WorkflowDiagram />
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 pb-20">
        <div className="space-y-10">
          {features.map((f) => (
            <article
              key={f.title}
              className="grid gap-6 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8 md:grid-cols-[200px_1fr] md:p-10"
            >
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
                  {f.eyebrow}
                </p>
              </div>
              <div>
                <h2 className="font-display text-2xl font-semibold leading-snug text-[var(--ink)] md:text-3xl">
                  {f.title}
                </h2>
                <p className="mt-3 text-[var(--muted)]">{f.body}</p>
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  {f.sub}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--surface)]/40">
        <div className="mx-auto w-full max-w-5xl px-6 py-20">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            Under the hood
          </p>
          <h2 className="mt-2 text-3xl font-semibold leading-tight text-[var(--ink)] md:text-4xl">
            Built like infrastructure, <span className="italic text-[var(--accent)]">priced like software.</span>
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {architecture.map((a) => (
              <article
                key={a.title}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6"
              >
                <h3 className="text-lg font-semibold leading-snug text-[var(--ink)]">
                  {a.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{a.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 py-20">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--ink)] px-8 py-12 text-[var(--cream)] md:px-12 md:py-16">
          <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight md:text-4xl">
            Want to see Atlas <span className="italic text-[var(--accent)]">on your data?</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--cream)]/70">
            We&rsquo;ll set up a sandbox tenant with a few of your real POs (under NDA) so you can
            see the workflow against your shape, not ours.
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
