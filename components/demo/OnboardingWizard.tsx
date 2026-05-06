'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { onboardCustomerAction } from '@/app/demo/_actions/onboard-customer'

const RULE_PRESETS = [
  'Production midpoint requires customer QC approval',
  'Auto-notify on every milestone change',
  'All POs must include GTIN at line-item level',
  'Photo evidence required for QC pass',
  'No fabric substitutions without written approval',
  'Ship 3 business days before customer ship-by',
]

const COLOR_PRESETS = [
  '#14532D', '#1E3A8A', '#9F1239', '#854D0E', '#5B21B6',
  '#0F766E', '#B45309', '#1F2937', '#0E7490', '#6D28D9',
]

interface WizardData {
  domain: string
  customerName: string
  primaryColor: string
  contactName: string
  contactEmail: string
  contactRole: string
  rules: string[]
  customRule: string
}

const STEPS = [
  { n: 1, label: 'Domain' },
  { n: 2, label: 'Brand' },
  { n: 3, label: 'Rules' },
  { n: 4, label: 'Review' },
]

export function OnboardingWizard() {
  const [step, setStep] = useState(1)
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<WizardData>({
    domain: '',
    customerName: '',
    primaryColor: '#14532D',
    contactName: '',
    contactEmail: '',
    contactRole: '',
    rules: [],
    customRule: '',
  })

  const update = (patch: Partial<WizardData>) => setData((d) => ({ ...d, ...patch }))
  const toggleRule = (rule: string) =>
    update({
      rules: data.rules.includes(rule)
        ? data.rules.filter((r) => r !== rule)
        : [...data.rules, rule],
    })

  const validate = (s: number): string | null => {
    if (s === 1) {
      if (!data.domain.trim()) return 'Customer domain is required.'
      if (!/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(data.domain.trim())) return 'Enter a valid domain (e.g. acmeapparel.com).'
    }
    if (s === 2) {
      if (!data.customerName.trim()) return 'Customer name is required.'
      if (!/^#[0-9a-f]{6}$/i.test(data.primaryColor)) return 'Pick a brand color.'
      if (!data.contactName.trim()) return 'Primary contact name is required.'
      if (!data.contactEmail.trim()) return 'Primary contact email is required.'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contactEmail)) return 'Enter a valid email.'
    }
    return null
  }

  const next = () => {
    const err = validate(step)
    if (err) {
      setError(err)
      return
    }
    setError(null)
    setStep((s) => Math.min(s + 1, 4))
  }
  const back = () => {
    setError(null)
    setStep((s) => Math.max(s - 1, 1))
  }

  const submit = () => {
    const allRules = data.customRule.trim()
      ? [...data.rules, data.customRule.trim()]
      : data.rules
    startTransition(async () => {
      try {
        await onboardCustomerAction({
          customerName: data.customerName,
          domain: data.domain,
          primaryColor: data.primaryColor,
          contactName: data.contactName,
          contactEmail: data.contactEmail,
          contactRole: data.contactRole,
          rules: allRules,
        })
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Onboarding failed.')
      }
    })
  }

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8">
      {/* Progress */}
      <ol className="mb-8 flex items-center gap-2">
        {STEPS.map((s, i) => (
          <li key={s.n} className="flex flex-1 items-center gap-2">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full font-mono text-xs ${
                step === s.n
                  ? 'bg-[var(--ink)] text-[var(--cream)]'
                  : step > s.n
                  ? 'bg-[var(--good)] text-[var(--cream)]'
                  : 'bg-[var(--cream)] text-[var(--muted)] ring-1 ring-[var(--border)]'
              }`}
            >
              {step > s.n ? '✓' : s.n}
            </span>
            <span
              className={`hidden font-mono text-xs uppercase tracking-[0.18em] sm:inline ${
                step === s.n ? 'text-[var(--ink)]' : 'text-[var(--muted)]'
              }`}
            >
              {s.label}
            </span>
            {i < STEPS.length - 1 && <span className="h-px flex-1 bg-[var(--border)]" />}
          </li>
        ))}
      </ol>

      {step === 1 && (
        <div>
          <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">
            What domain will the customer&rsquo;s portal live at?
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            They bring their own domain. They CNAME it at us. SSL auto-issues. Live in a business
            day.
          </p>
          <div className="mt-6">
            <label htmlFor="domain" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
              Customer domain
            </label>
            <input
              id="domain"
              type="text"
              value={data.domain}
              onChange={(e) => update({ domain: e.target.value })}
              placeholder="acmeapparel.com"
              className="mt-2 w-full rounded-md border border-[var(--border)] bg-[var(--cream)] px-3 py-2.5 text-base text-[var(--ink)] outline-none transition focus:border-[var(--accent)] focus:bg-[var(--surface)]"
              autoFocus
            />
          </div>
          <div className="mt-6 rounded-md border border-dashed border-[var(--border)] bg-[var(--cream)] p-4 text-xs">
            <p className="font-mono uppercase tracking-[0.22em] text-[var(--muted)]">
              What they&rsquo;ll do
            </p>
            <p className="mt-2 text-[var(--ink)]">
              Add a CNAME record at their registrar:
            </p>
            <p className="mt-2 font-mono text-[var(--ink)]">
              {data.domain || 'their-domain.com'} → cname.vercel-dns.com
            </p>
            <p className="mt-2 text-[var(--muted)]">
              SSL auto-issues via Let&rsquo;s Encrypt. Usually live within an hour.
            </p>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">
            Brand and primary contact
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            How they want to appear on their portal, and who runs point on their side.
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <label htmlFor="customerName" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
                Customer name
              </label>
              <input
                id="customerName"
                type="text"
                value={data.customerName}
                onChange={(e) => update({ customerName: e.target.value })}
                placeholder="Acme Apparel"
                className="mt-2 w-full rounded-md border border-[var(--border)] bg-[var(--cream)] px-3 py-2.5 text-base text-[var(--ink)] outline-none transition focus:border-[var(--accent)] focus:bg-[var(--surface)]"
              />
            </div>

            <div>
              <label className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
                Brand primary color
              </label>
              <div className="mt-2 flex items-center gap-3">
                <input
                  type="color"
                  value={data.primaryColor}
                  onChange={(e) => update({ primaryColor: e.target.value })}
                  className="h-10 w-14 cursor-pointer rounded-md border border-[var(--border)] bg-[var(--cream)]"
                />
                <input
                  type="text"
                  value={data.primaryColor}
                  onChange={(e) => update({ primaryColor: e.target.value })}
                  className="w-32 rounded-md border border-[var(--border)] bg-[var(--cream)] px-3 py-2 font-mono text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)] focus:bg-[var(--surface)]"
                />
                <div className="flex flex-wrap gap-1">
                  {COLOR_PRESETS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => update({ primaryColor: c })}
                      className="h-7 w-7 rounded-full ring-1 ring-[var(--border)] transition hover:scale-110"
                      style={{ backgroundColor: c }}
                      aria-label={`Use ${c}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contactName" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
                  Primary contact name
                </label>
                <input
                  id="contactName"
                  type="text"
                  value={data.contactName}
                  onChange={(e) => update({ contactName: e.target.value })}
                  placeholder="Mira Chen"
                  className="mt-2 w-full rounded-md border border-[var(--border)] bg-[var(--cream)] px-3 py-2.5 text-base text-[var(--ink)] outline-none transition focus:border-[var(--accent)] focus:bg-[var(--surface)]"
                />
              </div>
              <div>
                <label htmlFor="contactRole" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
                  Their role
                </label>
                <input
                  id="contactRole"
                  type="text"
                  value={data.contactRole}
                  onChange={(e) => update({ contactRole: e.target.value })}
                  placeholder="Head of Operations"
                  className="mt-2 w-full rounded-md border border-[var(--border)] bg-[var(--cream)] px-3 py-2.5 text-base text-[var(--ink)] outline-none transition focus:border-[var(--accent)] focus:bg-[var(--surface)]"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="contactEmail" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
                  Contact email
                </label>
                <input
                  id="contactEmail"
                  type="email"
                  value={data.contactEmail}
                  onChange={(e) => update({ contactEmail: e.target.value })}
                  placeholder="mira@acmeapparel.com"
                  className="mt-2 w-full rounded-md border border-[var(--border)] bg-[var(--cream)] px-3 py-2.5 text-base text-[var(--ink)] outline-none transition focus:border-[var(--accent)] focus:bg-[var(--surface)]"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">
            Custom rules for this customer
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Optional. Toggle the rules that apply, or write your own. You can edit these later
            from the customer page.
          </p>

          <div className="mt-6 space-y-2">
            {RULE_PRESETS.map((rule) => {
              const checked = data.rules.includes(rule)
              return (
                <label
                  key={rule}
                  className={`flex cursor-pointer items-start gap-3 rounded-md border px-4 py-3 transition ${
                    checked
                      ? 'border-[var(--accent)] bg-[var(--accent)]/5'
                      : 'border-[var(--border)] bg-[var(--cream)] hover:border-[var(--ink)]/30'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleRule(rule)}
                    className="mt-0.5 h-4 w-4 cursor-pointer accent-[var(--accent)]"
                  />
                  <span className="text-sm text-[var(--ink)]">{rule}</span>
                </label>
              )
            })}
          </div>

          <div className="mt-6">
            <label htmlFor="customRule" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
              Custom rule (optional)
            </label>
            <textarea
              id="customRule"
              rows={2}
              value={data.customRule}
              onChange={(e) => update({ customRule: e.target.value })}
              placeholder="Anything specific to this customer that doesn't match the presets…"
              className="mt-2 w-full resize-y rounded-md border border-[var(--border)] bg-[var(--cream)] px-3 py-2 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--accent)] focus:bg-[var(--surface)]"
            />
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">
            Review and confirm
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Last look before we provision the portal. You can edit any of this from the customer
            page after.
          </p>

          <div className="mt-6 space-y-4">
            <ReviewCard label="Customer">
              <div className="flex items-center gap-3">
                <span
                  className="h-6 w-6 rounded ring-1 ring-[var(--border)]"
                  style={{ backgroundColor: data.primaryColor }}
                />
                <span className="font-display text-lg font-semibold text-[var(--ink)]">
                  {data.customerName || '—'}
                </span>
              </div>
              <p className="mt-2 font-mono text-xs text-[var(--muted)]">
                Portal at: portal.{data.domain || 'their-domain.com'}
              </p>
            </ReviewCard>

            <ReviewCard label="Primary contact">
              <p className="text-sm font-medium text-[var(--ink)]">
                {data.contactName || '—'}
                {data.contactRole && (
                  <span className="ml-2 font-mono text-xs text-[var(--muted)]">
                    · {data.contactRole}
                  </span>
                )}
              </p>
              <p className="font-mono text-xs text-[var(--muted)]">
                {data.contactEmail || '—'}
              </p>
            </ReviewCard>

            <ReviewCard label={`Rules · ${data.rules.length + (data.customRule.trim() ? 1 : 0)}`}>
              {data.rules.length === 0 && !data.customRule.trim() ? (
                <p className="text-sm text-[var(--muted)]">
                  No custom rules. Defaults apply.
                </p>
              ) : (
                <ul className="space-y-1">
                  {data.rules.map((r) => (
                    <li key={r} className="flex gap-2 text-sm text-[var(--ink)]">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                      <span>{r}</span>
                    </li>
                  ))}
                  {data.customRule.trim() && (
                    <li className="flex gap-2 text-sm text-[var(--ink)]">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                      <span>{data.customRule.trim()}</span>
                    </li>
                  )}
                </ul>
              )}
            </ReviewCard>
          </div>
        </div>
      )}

      {error && (
        <p className="mt-6 rounded-md border border-[var(--alert)]/30 bg-[var(--alert)]/10 px-3 py-2 text-sm text-[var(--alert)]">
          {error}
        </p>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] pt-6">
        {step > 1 ? (
          <button
            type="button"
            onClick={back}
            className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--cream)]"
          >
            ← Back
          </button>
        ) : (
          <Link
            href="/demo/full/customers"
            className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--muted)] transition hover:text-[var(--ink)]"
          >
            Cancel
          </Link>
        )}
        {step < 4 ? (
          <button
            type="button"
            onClick={next}
            className="rounded-md bg-[var(--ink)] px-5 py-2 text-sm font-medium text-[var(--cream)] transition hover:opacity-90"
          >
            Next →
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={pending}
            className="rounded-md bg-[var(--accent)] px-5 py-2 text-sm font-medium text-[var(--cream)] transition hover:opacity-90 disabled:opacity-60"
          >
            {pending ? 'Provisioning…' : 'Confirm & onboard customer'}
          </button>
        )}
      </div>
    </div>
  )
}

function ReviewCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-[var(--border)] bg-[var(--cream)] p-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
        {label}
      </p>
      <div className="mt-2">{children}</div>
    </div>
  )
}
