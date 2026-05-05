import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--cream)] px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
        404 · not found
      </p>
      <h1 className="mt-3 font-display text-5xl font-semibold text-[var(--ink)] md:text-6xl">
        That page didn&rsquo;t make it{' '}
        <span className="italic text-[var(--accent)]">off the line.</span>
      </h1>
      <p className="mt-4 max-w-lg text-[var(--muted)]">
        The page you&rsquo;re looking for isn&rsquo;t here. It may have moved, or
        the URL might be a typo.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center rounded-md bg-[var(--ink)] px-5 py-2.5 text-sm font-medium text-[var(--cream)] transition hover:opacity-90"
        >
          Go home
        </Link>
        <Link
          href="https://demo.kuhler.com"
          className="inline-flex items-center rounded-md border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--cream)]"
        >
          See the demo →
        </Link>
      </div>
    </div>
  )
}
