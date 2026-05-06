import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBrand, getOrdersForBrand } from '@/lib/demo-db'

export async function generateMetadata({ params }: { params: Promise<{ brand: string }> }) {
  const { brand: slug } = await params
  const brand = await getBrand(slug)
  if (!brand) return { title: 'Account' }
  return {
    title: `${brand.name} · Account`,
    description: `Account settings for ${brand.name}.`,
  }
}

function deriveDomain(email: string): string {
  const at = email.indexOf('@')
  return at >= 0 ? email.slice(at + 1) : email
}

const notificationPrefs = [
  { id: 'email-milestones', label: 'Email me on every milestone change',  defaultOn: true  },
  { id: 'email-conversation', label: 'Email me on new conversation messages', defaultOn: true  },
  { id: 'email-shipped',  label: 'Email me when an order ships',           defaultOn: true  },
  { id: 'sms-urgent',     label: 'Text me on urgent issues only',          defaultOn: false },
  { id: 'weekly-digest',  label: 'Weekly summary digest (Mondays)',         defaultOn: true  },
]

export default async function PortalAccountPage({
  params,
}: {
  params: Promise<{ brand: string }>
}) {
  const { brand: slug } = await params
  const brand = await getBrand(slug)
  if (!brand) notFound()

  const orders = await getOrdersForBrand(slug)
  const totalUnits = orders.reduce((sum, o) => sum + o.totalUnits, 0)
  const domain = deriveDomain(brand.contactEmail)

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-10">
      <header className="mb-8">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
          {brand.name} · Account
        </p>
        <h1 className="mt-1 font-display text-4xl font-semibold text-[var(--ink)]">
          Account settings
        </h1>
      </header>

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <section className="space-y-8">
          {/* Profile */}
          <article className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
              Profile
            </p>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Field label="Company" value={brand.name} />
              <Field label="Primary contact" value={brand.contact} />
              <Field label="Email" value={brand.contactEmail} mono />
              <Field label="Domain" value={domain} mono />
            </div>
            <p className="mt-5 text-xs text-[var(--muted)]">
              Profile changes go through your account team. Email{' '}
              <a
                href={`mailto:${brand.contactEmail}`}
                className="text-[var(--ink)] underline-offset-2 hover:underline"
              >
                them
              </a>{' '}
              to update.
            </p>
          </article>

          {/* Notification preferences */}
          <article className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
              Notification preferences
            </p>
            <ul className="mt-5 space-y-3">
              {notificationPrefs.map((p) => (
                <li
                  key={p.id}
                  className="flex items-center justify-between gap-4 rounded-md border border-[var(--border)] bg-[var(--cream)] px-4 py-3"
                >
                  <span className="text-sm text-[var(--ink)]">{p.label}</span>
                  <span
                    className={`flex h-6 w-11 shrink-0 items-center rounded-full transition ${
                      p.defaultOn ? 'bg-[var(--good)]/30' : 'bg-[var(--ink)]/10'
                    }`}
                    style={{ backgroundColor: p.defaultOn ? `${brand.primary}33` : undefined }}
                  >
                    <span
                      className="h-5 w-5 rounded-full bg-[var(--surface)] shadow transition"
                      style={{
                        marginLeft: p.defaultOn ? '20px' : '2px',
                        backgroundColor: p.defaultOn ? brand.primary : 'var(--surface)',
                      }}
                    />
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-[var(--muted)]">
              Notification editing is read-only in this demo. Production lets you toggle each
              preference and add additional recipients.
            </p>
          </article>

          {/* Team */}
          <article className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
                Team members
              </p>
              <span className="cursor-not-allowed font-mono text-[11px] text-[var(--muted)]">
                + Invite teammate (coming)
              </span>
            </div>
            <ul className="mt-5 space-y-2">
              <li className="flex items-center justify-between rounded-md border border-[var(--border)] bg-[var(--cream)] px-4 py-3">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full font-display text-sm text-[var(--cream)]"
                    style={{ backgroundColor: brand.primary }}
                  >
                    {brand.contact.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-[var(--ink)]">{brand.contact}</p>
                    <p className="font-mono text-xs text-[var(--muted)]">{brand.contactEmail}</p>
                  </div>
                </div>
                <span className="rounded-full bg-[var(--accent)]/15 px-2.5 py-0.5 text-xs font-medium text-[var(--accent)]">
                  Admin
                </span>
              </li>
            </ul>
          </article>
        </section>

        <aside className="space-y-4">
          <article className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
              Account stats
            </p>
            <dl className="mt-3 space-y-2 text-xs">
              <Row label="Total POs"         value={String(orders.length)} />
              <Row label="Total units"        value={totalUnits.toLocaleString()} mono />
              <Row label="Member since"       value="2026-02-14" mono />
              <Row label="Last sign-in"       value="2 hours ago" mono />
              <Row label="Subscription"       value="Active" />
            </dl>
          </article>

          <article className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
              Need help?
            </p>
            <p className="mt-2 text-sm text-[var(--ink)]">
              Email your account team:
            </p>
            <a
              href={`mailto:${brand.contactEmail}`}
              className="mt-2 block font-mono text-sm text-[var(--ink)] underline-offset-2 hover:underline"
            >
              {brand.contactEmail}
            </a>
          </article>

          <article className="rounded-lg border border-[var(--alert)]/30 bg-[var(--alert)]/5 p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--alert)]">
              Danger zone
            </p>
            <p className="mt-2 text-sm text-[var(--ink)]">
              Pulling your CNAME deactivates this portal immediately. Your manufacturer retains
              your operational data on their Atlas tenant.
            </p>
            <span className="mt-3 inline-flex cursor-not-allowed rounded-md border border-[var(--alert)]/30 bg-[var(--surface)] px-3 py-1.5 text-xs text-[var(--alert)]">
              Request CNAME deactivation (coming)
            </span>
          </article>
        </aside>
      </div>
    </div>
  )
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
        {label}
      </p>
      <p className={`mt-2 ${mono ? 'font-mono' : ''} text-sm text-[var(--ink)]`}>
        {value}
      </p>
    </div>
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
