import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getArticle, listArticles } from '@/lib/articles'
import { ArticleBody } from '@/components/marketing/ArticleBody'

export async function generateStaticParams() {
  return listArticles().map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return { title: 'Resource not found' }
  return {
    title: article.title,
    description: article.excerpt,
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const otherArticles = listArticles()
    .filter((a) => a.slug !== article.slug)
    .slice(0, 2)

  return (
    <>
      <article className="mx-auto w-full max-w-3xl px-6 pb-12 pt-12 md:pt-20">
        <Link
          href="/resources"
          className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)] hover:text-[var(--ink)]"
        >
          ← All resources
        </Link>

        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-[var(--accent)]/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent)]">
              {article.category}
            </span>
            <span className="font-mono text-xs text-[var(--muted)]">
              {article.date} · {article.readTime}
            </span>
          </div>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-[var(--ink)] md:text-5xl">
            {article.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[var(--muted)] md:text-xl">
            {article.excerpt}
          </p>
          <p className="mt-6 font-mono text-xs text-[var(--muted)]">
            By {article.author} · {article.authorRole}
          </p>
        </header>

        <div className="mt-12">
          <ArticleBody blocks={article.body} />
        </div>
      </article>

      {otherArticles.length > 0 && (
        <section className="mt-16 border-t border-[var(--border)] bg-[var(--surface)]/40">
          <div className="mx-auto w-full max-w-5xl px-6 py-16">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
              Keep reading
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {otherArticles.map((a) => (
                <Link
                  key={a.slug}
                  href={`/resources/${a.slug}`}
                  className="lift block rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6"
                >
                  <span className="rounded-full bg-[var(--accent)]/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent)]">
                    {a.category}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-[var(--ink)]">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--muted)]">{a.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto w-full max-w-5xl px-6 py-20">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--ink)] px-8 py-12 text-[var(--cream)] md:px-12 md:py-16">
          <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight md:text-4xl">
            Want this <span className="italic text-[var(--accent)]">running for you?</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--cream)]/70">
            Book a 15-minute walkthrough and we&rsquo;ll show you Atlas against your actual
            workflow.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-md bg-[var(--cream)] px-5 py-3 text-sm font-medium text-[var(--ink)] transition hover:opacity-90"
            >
              Book a walkthrough
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
