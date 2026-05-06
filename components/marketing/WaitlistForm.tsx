'use client'

import { useActionState } from 'react'
import { joinWaitlist, type WaitlistState } from '@/app/marketing/_actions/waitlist'

const initialState: WaitlistState = {}

export function WaitlistForm() {
  const [state, action, pending] = useActionState(joinWaitlist, initialState)

  if (state.ok) {
    return (
      <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
          You&rsquo;re on the list
        </p>
        <h3 className="mt-2 font-display text-2xl font-semibold text-[var(--ink)]">
          See you soon.
        </h3>
        <p className="mt-3 text-[var(--muted)]">
          We&rsquo;re onboarding new operators in small batches and will reach out to you
          personally before opening your tenant. Watch for an email from{' '}
          <a
            href="mailto:hello@kuhler.com"
            className="text-[var(--ink)] underline-offset-2 hover:underline"
          >
            hello@kuhler.com
          </a>{' '}
          — sometimes a sandbox invite, sometimes a quick discovery call first.
        </p>
        {state.dev && (
          <p className="mt-4 rounded-md bg-[var(--cream)] px-3 py-2 font-mono text-[11px] text-[var(--muted)]">
            (dev: RESEND_API_KEY not configured — submission logged to server console)
          </p>
        )}
      </div>
    )
  }

  return (
    <form action={action} className="space-y-5">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] h-0 w-0"
        aria-hidden
      />

      <Field label="Work email" name="email" type="email" required placeholder="you@yourcompany.com" />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company" name="company" placeholder="Your company name" />
        <Field label="Your role" name="role" placeholder="e.g. Operations director" />
      </div>

      <div>
        <label htmlFor="volume" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
          Approx. monthly PO volume
        </label>
        <select
          id="volume"
          name="volume"
          defaultValue=""
          className="mt-2 w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--accent)]"
        >
          <option value="">Pick a range (optional)</option>
          <option value="<25">Fewer than 25 / month</option>
          <option value="25-100">25–100 / month</option>
          <option value="100-500">100–500 / month</option>
          <option value="500+">500+ / month</option>
        </select>
      </div>

      <div>
        <label htmlFor="note" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
          Anything you want us to know? <span className="normal-case text-[var(--muted)]/60">(optional)</span>
        </label>
        <textarea
          id="note"
          name="note"
          rows={3}
          maxLength={2000}
          placeholder="Factories, customers, current tools you’re trying to replace…"
          className="mt-2 w-full resize-y rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--accent)]"
        />
      </div>

      {state.error && (
        <p className="rounded-md border border-[var(--alert)]/30 bg-[var(--alert)]/10 px-3 py-2 text-sm text-[var(--alert)]">
          {state.error}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-[var(--muted)]">
          One email when your tenant&rsquo;s ready. No drip campaign. No spam.
        </p>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center rounded-md bg-[var(--ink)] px-5 py-2.5 text-sm font-medium text-[var(--cream)] transition hover:opacity-90 disabled:opacity-60"
        >
          {pending ? 'Adding you…' : 'Join the waitlist'}
        </button>
      </div>
    </form>
  )
}

function Field({
  label,
  name,
  type = 'text',
  required = false,
  placeholder,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  placeholder?: string
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]"
      >
        {label}
        {required && <span className="text-[var(--accent)]"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--accent)]"
      />
    </div>
  )
}
