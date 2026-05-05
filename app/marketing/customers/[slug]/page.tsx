import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCaseStudy, listCaseStudies } from '@/lib/case-studies'

export async function generateStaticParams() {
  return listCaseStudies().map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) return { title: 'Case study not found' }
  return {
    title: `${study.customer} · Case study`,
    description: study.excerpt,
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) notFound()

  const otherStudies = listCaseStudies()
    .filter((c) => c.slug !== study.slug)
    .slice(0, 2)

  return (
    <>
      <article className="mx-auto w-full max-w-3xl px-6 pb-12 pt-12 md:pt-20">
        <Link
          href="/customers"
          className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)] hover:text-[var(--ink)]"
        >
          ← All customers
        </Link>

        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-[var(--accent)]/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent)]">
              Case study · {study.tier}
            </span>
            <span className="font-mono text-xs text-[var(--muted)]">
              {study.industry}
            </span>
          </div>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-[var(--ink)] md:text-5xl">
            {study.customer}
          </h1>
          <p className="mt-5 text-xl italic leading-snug text-[var(--accent)] md:text-2xl">
            {study.tagline}
          </p>
        </header>

        <div className="mt-10 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/5 p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
            Outcome
          </p>
          <p className="mt-2 font-display text-2xl font-semibold text-[var(--ink)]">
            {study.outcome}
          </p>
        </div>

        <div className="mt-12 space-y-6">
          {study.body.map((block, i) => {
            if (block.type === 'heading') {
              return (
                <h2
                  key={i}
                  className="font-display text-2xl font-semibold text-[var(--ink)] md:text-3xl"
                >
                  {block.content as string}
                </h2>
              )
            }
            if (block.type === 'pullquote') {
              return (
                <blockquote
                  key={i}
                  className="border-l-2 border-[var(--accent)] pl-6 py-2"
                >
                  <p
                    className="font-display text-xl italic leading-snug text-[var(--ink)] md:text-2xl"
                    dangerouslySetInnerHTML={{ __html: block.content as string }}
                  />
                </blockquote>
              )
            }
            if (block.type === 'list') {
              const items = block.content as string[]
              return (
                <ul key={i} className="space-y-2 pl-1">
                  {items.map((item, j) => (
                    <li key={j} className="flex gap-3 text-[var(--muted)]">
                      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              )
            }
            return (
              <p key={i} className="leading-relaxed text-[var(--muted)]">
                {block.content as string}
              </p>
            )
          })}
        </div>

        <p className="mt-12 rounded-md border border-dashed border-[var(--border)] bg-[var(--surface)] p-4 font-mono text-xs text-[var(--muted)]">
          Composite story from early-access conversations. Real customer name and full attribution
          coming as launches go public.
        </p>
      </article>

      {otherStudies.length > 0 && (
        <section className="mt-16 border-t border-[var(--border)] bg-[var(--surface)]/40">
          <div className="mx-auto w-full max-w-5xl px-6 py-16">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
              More case studies
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {otherStudies.map((c) => (
                <Link
                  key={c.slug}
                  href={`/customers/${c.slug}`}
                  className="lift block rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6"
                >
                  <span className="rounded-full bg-[var(--accent)]/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent)]">
                    {c.tier} · {c.industry}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-[var(--ink)]">
                    {c.customer}
                  </h3>
                  <p className="mt-2 text-sm italic text-[var(--accent)]">{c.tagline}</p>
                  <p className="mt-3 text-sm text-[var(--muted)]">{c.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto w-full max-w-5xl px-6 py-20">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--ink)] px-8 py-12 text-[var(--cream)] md:px-12 md:py-16">
          <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight md:text-4xl">
            Want to be a <span className="italic text-[var(--accent)]">named one?</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--cream)]/70">
            We&rsquo;re onboarding a handful of operators this quarter. Get in early; help us shape
            the product; get a flagship case study with your logo on it.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-md bg-[var(--cream)] px-5 py-3 text-sm font-medium text-[var(--ink)] transition hover:opacity-90"
            >
              Talk to us about early access
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
