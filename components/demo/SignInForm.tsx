'use client'

import { useActionState } from 'react'
import { signInAction, type SignInState } from '@/app/demo/_actions/sign-in'

const initialState: SignInState = {}

export function SignInForm() {
  const [state, action, pending] = useActionState(signInAction, initialState)

  return (
    <form action={action} className="space-y-4">
      <Field label="Username" name="username" autoComplete="username" />
      <Field label="Password" name="password" type="password" autoComplete="current-password" />

      {state.error && (
        <p className="rounded-md border border-[var(--alert)]/30 bg-[var(--alert)]/10 px-3 py-2 text-sm text-[var(--alert)]">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-[var(--ink)] px-4 py-2.5 text-sm font-medium text-[var(--cream)] transition hover:opacity-90 disabled:opacity-60"
      >
        {pending ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}

function Field({
  label,
  name,
  type = 'text',
  autoComplete,
}: {
  label: string
  name: string
  type?: string
  autoComplete?: string
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        className="mt-2 w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--accent)]"
      />
    </div>
  )
}
