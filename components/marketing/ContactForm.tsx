'use client'

import { useActionState } from 'react'
import { submitContact, type ContactState } from '@/app/marketing/_actions/contact'

const initialState: ContactState = {}

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initialState)

  if (state.ok) {
    return (
      <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
          Got it
        </p>
        <h3 className="mt-2 font-display text-2xl font-semibold text-[var(--ink)]">
          Message received.
        </h3>
        <p className="mt-3 text-[var(--muted)]">
          We&rsquo;ll get back to you at the email you provided within one business day.
          If it&rsquo;s urgent, email{' '}
          <a
            href="mailto:hello@kuhler.com"
            className="text-[var(--ink)] underline-offset-2 hover:underline"
          >
            hello@kuhler.com
          </a>{' '}
          directly.
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

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Company" name="company" />
        <Field label="Your role" name="role" placeholder="e.g. Operations lead" />
      </div>

      <div>
        <label htmlFor="message" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
          What&rsquo;s on your mind?
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={5000}
          placeholder="Tell us about your operation — how many factories, how many customers, what's the pain point you&rsquo;re looking to solve."
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
          We read every message. We don&rsquo;t share, sell, or spam.
        </p>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center rounded-md bg-[var(--ink)] px-5 py-2.5 text-sm font-medium text-[var(--cream)] transition hover:opacity-90 disabled:opacity-60"
        >
          {pending ? 'Sending…' : 'Send message'}
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
