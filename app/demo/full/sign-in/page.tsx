import Link from 'next/link'
import { SignInForm } from '@/components/demo/SignInForm'

export const metadata = {
  title: 'Atlas Full Demo · Sign in',
  description: 'Sign in to access the full Atlas demo with deeper functionality.',
  robots: { index: false, follow: false },
}

export default function FullDemoSignInPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] w-full max-w-md flex-col justify-center px-6 py-16">
      <header className="mb-8">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
          Atlas Full Demo
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-[var(--ink)]">
          Sign in to see the <span className="italic text-[var(--accent)]">deep version.</span>
        </h1>
        <p className="mt-3 text-sm text-[var(--muted)]">
          The full demo has deeper pages, real interactions, and the full TRG-style
          operational stack. The light demo on{' '}
          <Link href="/demo" className="text-[var(--ink)] underline-offset-2 hover:underline">
            /demo
          </Link>{' '}
          stays public; this version is gated.
        </p>
      </header>

      <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
        <SignInForm />
      </div>

      <div className="mt-6 rounded-md border border-dashed border-[var(--border)] bg-[var(--cream)] p-4 text-xs text-[var(--muted)]">
        <p className="font-mono uppercase tracking-[0.22em] text-[var(--accent)]">
          Demo credentials
        </p>
        <p className="mt-2">
          Username: <span className="font-mono text-[var(--ink)]">demo</span>
        </p>
        <p>
          Password: <span className="font-mono text-[var(--ink)]">kuhler2026</span>
        </p>
        <p className="mt-2 text-[11px] text-[var(--muted)]/70">
          (Generic credentials — change via DEMO_USERNAME and DEMO_PASSWORD env vars in Vercel.)
        </p>
      </div>
    </div>
  )
}
