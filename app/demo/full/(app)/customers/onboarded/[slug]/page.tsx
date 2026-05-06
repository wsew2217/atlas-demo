import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDemoCustomer } from '@/lib/demo-customers-store'

export const metadata = {
  title: 'Atlas Full Demo · Customer onboarded',
  robots: { index: false, follow: false },
}

export default async function OnboardedCustomerPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const customer = await getDemoCustomer(slug)
  if (!customer) notFound()

  const created = new Date(customer.createdAt)

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-10">
      <Link
        href="/demo/full/customers"
        className="mb-6 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)] hover:text-[var(--ink)]"
      >
        ← All customers
      </Link>

      <div className="rounded-lg border border-[var(--good)]/40 bg-[var(--good)]/5 p-8">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--good)]">
          ✓ Customer onboarded
        </p>
        <div className="mt-4 flex items-center gap-4">
          <span
            className="h-12 w-12 rounded-md ring-2 ring-[var(--surface)]"
            style={{ backgroundColor: customer.primaryColor, boxShadow: `0 0 0 1px ${customer.primaryColor}55` }}
          />
          <div>
            <h1 className="font-display text-3xl font-semibold text-[var(--ink)]">
              {customer.customerName}
            </h1>
            <p className="font-mono text-xs text-[var(--muted)]">
              Provisioned {created.toLocaleString()}
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm text-[var(--ink)]">
          Their portal is being set up at{' '}
          <span className="font-mono text-[var(--accent)]">portal.{customer.domain}</span>. SSL is
          being issued in the background — typically live within an hour of the CNAME being added
          at their registrar.
        </p>
      </div>

      <section className="mt-8 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
          What happens next
        </h2>
        <ol className="mt-4 space-y-4">
          <Step
            n={1}
            label="Tell the customer to add a CNAME"
            body={
              <>
                They add this DNS record at their registrar:
                <p className="mt-2 rounded-md bg-[var(--cream)] px-3 py-2 font-mono text-xs text-[var(--ink)]">
                  portal.{customer.domain} → cname.vercel-dns.com
                </p>
                <p className="mt-2 text-xs text-[var(--muted)]">
                  Usually a 2-minute job for their IT person.
                </p>
              </>
            }
          />
          <Step
            n={2}
            label="SSL auto-issues"
            body={
              <p className="text-xs text-[var(--muted)]">
                Once Vercel detects the CNAME, Let&rsquo;s Encrypt issues the cert. Typically 5–60
                minutes after the DNS record propagates.
              </p>
            }
          />
          <Step
            n={3}
            label="Their portal goes live"
            body={
              <p className="text-xs text-[var(--muted)]">
                {customer.contactName} can sign in at{' '}
                <span className="font-mono">portal.{customer.domain}</span> using their email
                ({customer.contactEmail}). They&rsquo;ll see Atlas branded as {customer.customerName}.
              </p>
            }
          />
        </ol>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
            Configuration captured
          </p>
          <dl className="mt-4 space-y-2 text-xs">
            <Row label="Customer"      value={customer.customerName} />
            <Row label="Domain"        value={customer.domain} mono />
            <Row label="Brand color"   value={customer.primaryColor} mono />
            <Row label="Contact"       value={`${customer.contactName}${customer.contactRole ? ` · ${customer.contactRole}` : ''}`} />
            <Row label="Email"         value={customer.contactEmail} mono />
            <Row label="Custom rules"  value={`${customer.rules.length} configured`} />
          </dl>
        </div>

        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
            Custom rules
          </p>
          {customer.rules.length === 0 ? (
            <p className="mt-3 text-xs text-[var(--muted)]">
              No custom rules. Defaults apply.
            </p>
          ) : (
            <ul className="mt-3 space-y-1.5">
              {customer.rules.map((r, i) => (
                <li key={i} className="flex gap-2 text-xs text-[var(--ink)]">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link
          href="/demo/full/customers"
          className="rounded-md bg-[var(--ink)] px-4 py-2 text-sm font-medium text-[var(--cream)] transition hover:opacity-90"
        >
          ← Back to customers
        </Link>
        <Link
          href="/demo/full/customers/new"
          className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--cream)]"
        >
          Onboard another
        </Link>
      </div>

      <p className="mt-6 text-xs text-[var(--muted)]">
        Demo note: this customer is stored in your browser cookie only — no Supabase write or real
        DNS provisioning happens. The flow above mirrors what production onboarding actually does.
      </p>
    </div>
  )
}

function Step({ n, label, body }: { n: number; label: string; body: React.ReactNode }) {
  return (
    <li className="flex gap-4">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--ink)] font-mono text-xs text-[var(--cream)]">
        {n}
      </span>
      <div className="flex-1">
        <p className="text-sm font-semibold text-[var(--ink)]">{label}</p>
        <div className="mt-1.5">{body}</div>
      </div>
    </li>
  )
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-[var(--muted)]">{label}</dt>
      <dd className={mono ? 'font-mono text-[var(--ink)]' : 'text-[var(--ink)]'}>{value}</dd>
    </div>
  )
}
