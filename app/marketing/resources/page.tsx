import Link from 'next/link'
import { listArticles } from '@/lib/articles'

export const metadata = {
  title: 'Resources',
  description:
    'Operational playbooks, industry perspective, and technical deep-dives from the Kuhler team.',
}

export default function ResourcesPage() {
  const articles = listArticles()

  return (
    <>
      <section className="mx-auto w-full max-w-5xl px-6 pb-12 pt-16 md:pt-24">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
          Resources
        </p>
        <h1 className="mt-3 text-4xl font-semibold leading-[1.05] tracking-tight text-[var(--ink)] md:text-6xl">
          Reading on <span className="italic text-[var(--accent)]">apparel operations.</span>
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[var(--muted)]">
          Operational playbooks, industry perspective, and technical deep-dives from the Kuhler
          team. Written for the operators running production, not the people selling them
          software.
        </p>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 pb-20">
        <div className="space-y-6">
          {articles.map((a) => (
            <Link
              key={a.slug}
              href={`/resources/${a.slug}`}
              className="lift block rounded-lg border border-[var(--border)] bg-[var(--surface)] p-7"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[var(--accent)]/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent)]">
                  {a.category}
                </span>
                <span className="font-mono text-xs text-[var(--muted)]">
                  {a.date} · {a.readTime}
                </span>
              </div>
              <h2 className="mt-3 font-display text-2xl font-semibold leading-snug text-[var(--ink)] md:text-3xl">
                {a.title}
              </h2>
              <p className="mt-3 text-[var(--muted)]">{a.excerpt}</p>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
                Read article →
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--surface)]/40">
        <div className="mx-auto w-full max-w-3xl px-6 py-16 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            Get new pieces in your inbox
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold leading-tight text-[var(--ink)] md:text-3xl">
            We&rsquo;re publishing as we go.
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            Email us at{' '}
            <a
              href="mailto:hello@kuhler.com?subject=Subscribe%20to%20Resources"
              className="text-[var(--ink)] underline-offset-2 hover:underline"
            >
              hello@kuhler.com
            </a>{' '}
            to get notified when new pieces land.
          </p>
        </div>
      </section>
    </>
  )
}
