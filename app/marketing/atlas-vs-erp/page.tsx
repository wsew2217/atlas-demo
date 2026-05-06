import Link from 'next/link'

export const metadata = {
  title: 'Atlas vs ERP — when to use which',
  description:
    'Atlas isn\'t replacing your ERP. It\'s replacing the email chains and spreadsheets that surround it. A side-by-side decision guide for apparel manufacturers.',
}

interface CompareRow {
  capability: string
  detail: string
  atlas: 'best' | 'good' | 'partial' | 'no'
  erp: 'best' | 'good' | 'partial' | 'no'
}

const rows: CompareRow[] = [
  {
    capability: 'Purchase order intake (PDFs, emails)',
    detail: 'PDF parsing into structured POs; line items, ship-to, dates extracted automatically',
    atlas: 'best', erp: 'no',
  },
  {
    capability: 'Production batch tracking',
    detail: 'Cut & sew, milestones, factory allocation, batch-level QC records',
    atlas: 'best', erp: 'partial',
  },
  {
    capability: 'White-labeled customer portals',
    detail: 'Each customer sees their orders under their own domain, branded as them',
    atlas: 'best', erp: 'no',
  },
  {
    capability: 'Factory floor mobile UX',
    detail: 'Operators mark milestones from their phones on the floor',
    atlas: 'best', erp: 'no',
  },
  {
    capability: 'Real-time conversation per order',
    detail: 'Two-sided thread — buyer asks, manufacturer answers, system auto-posts',
    atlas: 'best', erp: 'no',
  },
  {
    capability: 'Financial system of record',
    detail: 'GL entries, AP/AR, month-end close, audit trail',
    atlas: 'no', erp: 'best',
  },
  {
    capability: 'Inventory of record',
    detail: 'Canonical inventory balance, costing, reconciliation',
    atlas: 'partial', erp: 'best',
  },
  {
    capability: 'Tax & compliance reports',
    detail: 'VAT, sales tax, customs documentation, statutory filings',
    atlas: 'no', erp: 'best',
  },
  {
    capability: 'Multi-tenant per-customer config',
    detail: 'SKUs, rules, workflows scoped per customer with isolation',
    atlas: 'best', erp: 'partial',
  },
  {
    capability: 'Onboarding speed',
    detail: 'New deployment from contract to live',
    atlas: 'best', erp: 'no',
  },
]

const ratingTone: Record<CompareRow['atlas'], string> = {
  best: 'bg-[var(--good)]/15 text-[var(--good)]',
  good: 'bg-[var(--good)]/10 text-[var(--good)]',
  partial: 'bg-[var(--accent)]/15 text-[var(--accent)]',
  no: 'bg-[var(--alert)]/10 text-[var(--alert)]/80',
}

const ratingLabel: Record<CompareRow['atlas'], string> = {
  best: '✓ Built for it',
  good: '✓ Supported',
  partial: '~ Partial',
  no: '— Not its job',
}

const atlasWins = [
  {
    title: 'Operations workflow',
    body: 'POs out of email, batches off spreadsheets, status off the phone. The day-to-day of running production.',
  },
  {
    title: 'Customer-facing portals',
    body: 'Each customer wants their own branded portal. Atlas does this in a business day; ERPs don\'t do it at all.',
  },
  {
    title: 'Factory floor adoption',
    body: 'Mobile-first interfaces operators actually use. Most ERPs were designed for desks; this one was designed for shifts.',
  },
  {
    title: 'Speed of change',
    body: 'New customer? New rule? New workflow? Atlas changes ship in days. ERP changes ship in quarters.',
  },
]

const erpWins = [
  {
    title: 'Financial books',
    body: 'AP/AR, GL, month-end close. Tax compliance. Audit trail. Atlas writes structured data; the ERP owns the books.',
  },
  {
    title: 'Inventory at scale',
    body: 'Canonical balance across warehouses, costing methods (FIFO/LIFO), inventory reconciliation. Atlas tracks WIP; the ERP tracks finished goods.',
  },
  {
    title: 'Statutory and audit',
    body: 'Tax filings, customs paperwork, regulatory exports. Compliance teams know how to use ERPs.',
  },
  {
    title: 'Cross-business processes',
    body: 'If your business is more than apparel manufacturing — distribution, retail, services — your ERP can span all of it. Atlas is apparel-specific by design.',
  },
]

const bothWins = [
  {
    title: 'Most apparel manufacturers',
    body: 'Atlas owns the workflow, the ERP owns the books. They sync. Your operators live in Atlas; your accountants live in the ERP. Each tool is loved by the right people.',
  },
  {
    title: 'How the integration works',
    body: 'Atlas writes structured outcomes (completed batches, shipped quantities, milestone timestamps) back to the ERP via API or scheduled CSV sync. Your accountants see what they need; nobody fights over which screen is "right."',
  },
  {
    title: 'When to add Atlas',
    body: 'You already have an ERP, but operations is still in spreadsheets and email. Atlas slots in next to the ERP without replacing it.',
  },
]

const faqs = [
  {
    q: 'Do I need an ERP if I have Atlas?',
    a: 'Probably yes if your operation is large enough to need formal financial books. Atlas handles the operational workflow but doesn\'t do GL accounting. Many smaller operators run on QuickBooks + Atlas; mid-sized run on NetSuite + Atlas; enterprise run on SAP + Atlas.',
  },
  {
    q: 'Can Atlas write back to my ERP?',
    a: 'Yes. Atlas exposes a public API + webhooks. We can post completed batches, shipped quantities, milestone timestamps, and PO closure events to your ERP after each milestone change. We have prebuilt connectors for NetSuite and Microsoft Dynamics; for SAP and others we use generic API or scheduled CSV.',
  },
  {
    q: 'We use NetSuite. Does it integrate?',
    a: 'NetSuite has a prebuilt connector. Atlas pushes completed PO and batch data to NetSuite as Sales Orders / Item Receipts; pulls product master and customer master. Two-way sync, configurable in onboarding.',
  },
  {
    q: 'What if our ERP doesn\'t have an API?',
    a: 'We fall back to scheduled CSV exports. Atlas drops a daily / hourly CSV in an S3 bucket or SFTP your ERP can pick up. Less elegant than API but works for legacy systems.',
  },
  {
    q: 'What if I want to eventually replace my ERP?',
    a: 'Then Atlas isn\'t the place to do it. Atlas is operational workflow software; ERPs are systems of record. They\'re different categories. If you\'re ERP-shopping, look at NetSuite, Microsoft Dynamics, or apparel-specific suites like ApparelMagic or AIMS360.',
  },
]

export default function AtlasVsErpPage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto w-full max-w-5xl px-6 pb-12 pt-16 md:pt-24">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
          Compare
        </p>
        <h1 className="mt-3 text-4xl font-semibold leading-[1.05] tracking-tight text-[var(--ink)] md:text-6xl">
          Atlas <span className="italic text-[var(--accent)]">or</span> ERP?{' '}
          <span className="italic text-[var(--accent)]">Or both?</span>
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[var(--muted)]">
          A common question on first calls: &ldquo;we already have an ERP — do we need Atlas?&rdquo;
          The short answer is yes, because they solve different problems. The long answer is below.
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
            See the demo →
          </Link>
        </div>
      </section>

      {/* Quick decision matrix */}
      <section className="border-y border-[var(--border)] bg-[var(--surface)]/40">
        <div className="mx-auto w-full max-w-5xl px-6 py-16">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            Quick answer
          </p>
          <h2 className="mt-2 max-w-3xl text-3xl font-semibold leading-tight text-[var(--ink)] md:text-4xl">
            They&rsquo;re different categories. <span className="italic text-[var(--accent)]">Use them together.</span>
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <DecisionCard label="Atlas" tone="accent">
              The operational workflow — POs, batches, factories, customer portals. Where the work
              gets done day-to-day.
            </DecisionCard>
            <DecisionCard label="ERP">
              The financial system of record — GL, AP/AR, inventory of record, month-end close.
              Where the books live.
            </DecisionCard>
            <DecisionCard label="Together" tone="good">
              Atlas writes structured outcomes back to the ERP via API or CSV. Operators in Atlas;
              accountants in the ERP. Both are loved by the right people.
            </DecisionCard>
          </div>
        </div>
      </section>

      {/* Detailed comparison table */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
          Side-by-side
        </p>
        <h2 className="mt-2 text-3xl font-semibold leading-tight text-[var(--ink)] md:text-4xl">
          Capability by capability.
        </h2>

        <div className="mt-10 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
          <table className="w-full text-sm">
            <thead className="bg-[var(--cream)] text-left text-xs uppercase tracking-wider text-[var(--muted)]">
              <tr>
                <th className="px-5 py-3 font-medium">Capability</th>
                <th className="px-5 py-3 text-center font-medium">Atlas</th>
                <th className="px-5 py-3 text-center font-medium">ERP</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.capability} className="border-t border-[var(--border)]">
                  <td className="px-5 py-4">
                    <p className="font-medium text-[var(--ink)]">{r.capability}</p>
                    <p className="mt-1 text-xs text-[var(--muted)]">{r.detail}</p>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${ratingTone[r.atlas]}`}>
                      {ratingLabel[r.atlas]}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${ratingTone[r.erp]}`}>
                      {ratingLabel[r.erp]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* When each wins */}
      <section className="border-y border-[var(--border)] bg-[var(--surface)]/40">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            Real-world fit
          </p>
          <h2 className="mt-2 max-w-3xl text-3xl font-semibold leading-tight text-[var(--ink)] md:text-4xl">
            When each one <span className="italic text-[var(--accent)]">earns its place.</span>
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <WinCard title="When Atlas wins" tone="accent" items={atlasWins} />
            <WinCard title="When ERP wins"   tone="ink"    items={erpWins} />
            <WinCard title="When you need both" tone="good" items={bothWins} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-4xl px-6 py-20">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
          ERP integration FAQ
        </p>
        <h2 className="mt-2 text-3xl font-semibold leading-tight text-[var(--ink)] md:text-4xl">
          The questions that come up.
        </h2>
        <dl className="mt-10 space-y-8">
          {faqs.map((f) => (
            <div key={f.q} className="border-b border-[var(--border)] pb-7">
              <dt className="font-display text-xl font-semibold text-[var(--ink)]">{f.q}</dt>
              <dd className="mt-3 text-[var(--muted)]">{f.a}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-10 rounded-md border border-[var(--border)] bg-[var(--surface)] p-5 text-sm text-[var(--muted)]">
          Want the longer-form essay version of this comparison?{' '}
          <Link
            href="/resources/atlas-vs-erp-when-to-use-which"
            className="text-[var(--ink)] underline-offset-2 hover:underline"
          >
            Read the full piece in Resources →
          </Link>
        </p>
      </section>

      {/* Final CTA */}
      <section className="mx-auto w-full max-w-5xl px-6 py-20">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--ink)] px-8 py-12 text-[var(--cream)] md:px-12 md:py-16">
          <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight md:text-4xl">
            Most operators don&rsquo;t pick. <span className="italic text-[var(--accent)]">They use both.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--cream)]/70">
            We&rsquo;ll walk you through how Atlas fits next to your existing ERP — what data
            flows where, what it costs, and how fast we can stand it up.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-md bg-[var(--cream)] px-5 py-3 text-sm font-medium text-[var(--ink)] transition hover:opacity-90"
            >
              Book a 15-min walkthrough
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

function DecisionCard({
  label,
  tone,
  children,
}: {
  label: string
  tone?: 'accent' | 'good'
  children: React.ReactNode
}) {
  const border =
    tone === 'accent' ? 'border-[var(--accent)] bg-[var(--accent)]/5' :
    tone === 'good'   ? 'border-[var(--good)]/40 bg-[var(--good)]/5' :
                        'border-[var(--border)] bg-[var(--surface)]'
  return (
    <article className={`rounded-lg border p-6 ${border}`}>
      <p
        className={`font-mono text-[11px] uppercase tracking-[0.22em] ${
          tone === 'accent' ? 'text-[var(--accent)]' :
          tone === 'good'   ? 'text-[var(--good)]'  :
                              'text-[var(--muted)]'
        }`}
      >
        {label}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-[var(--ink)]">{children}</p>
    </article>
  )
}

function WinCard({
  title,
  tone,
  items,
}: {
  title: string
  tone: 'accent' | 'ink' | 'good'
  items: { title: string; body: string }[]
}) {
  const accent =
    tone === 'accent' ? 'text-[var(--accent)]' :
    tone === 'good'   ? 'text-[var(--good)]'  :
                        'text-[var(--ink)]'
  return (
    <article className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
      <h3 className={`font-display text-xl font-semibold ${accent}`}>{title}</h3>
      <ul className="mt-5 space-y-4 text-sm">
        {items.map((it) => (
          <li key={it.title} className="border-t border-[var(--border)] pt-4 first:border-t-0 first:pt-0">
            <p className="font-semibold text-[var(--ink)]">{it.title}</p>
            <p className="mt-1 leading-relaxed text-[var(--muted)]">{it.body}</p>
          </li>
        ))}
      </ul>
    </article>
  )
}
