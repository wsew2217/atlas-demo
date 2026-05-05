import type { ArticleBlock } from '@/lib/articles'

export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        if (block.type === 'heading') {
          return (
            <h2
              key={i}
              className="font-display text-2xl font-semibold text-[var(--ink)] md:text-3xl"
              dangerouslySetInnerHTML={{ __html: block.content as string }}
            />
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
                  <span
                    className="leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                </li>
              ))}
            </ul>
          )
        }
        return (
          <p
            key={i}
            className="leading-relaxed text-[var(--muted)]"
            dangerouslySetInnerHTML={{ __html: block.content as string }}
          />
        )
      })}
    </div>
  )
}
