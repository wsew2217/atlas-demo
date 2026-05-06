import type { InternalNote } from '@/lib/demo-notes-store'

export function InternalNotesThread({ notes }: { notes: InternalNote[] }) {
  if (notes.length === 0) {
    return (
      <p className="rounded-md border border-dashed border-[var(--border)] bg-[var(--surface)] p-4 text-xs text-[var(--muted)]">
        No internal notes yet. Add one below — only the manufacturer team sees these.
      </p>
    )
  }

  return (
    <div className="space-y-3">
      {notes.map((n) => (
        <article
          key={n.id}
          className="rounded-md border border-[var(--accent)]/30 bg-[var(--accent)]/5 px-4 py-3"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent)]">
            {n.authorName} · {formatTime(n.at)}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink)]">{n.body}</p>
        </article>
      ))}
    </div>
  )
}

function formatTime(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
}
