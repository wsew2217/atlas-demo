import { addNoteAction } from '@/app/demo/_actions/add-note'

export function InternalNoteForm({
  orderId,
  authorName,
}: {
  orderId: string
  authorName: string
}) {
  const action = addNoteAction.bind(null, orderId, authorName)
  return (
    <form
      action={action}
      className="mt-4 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/5 p-4"
    >
      <label htmlFor={`note-${orderId}`} className="sr-only">
        Internal note
      </label>
      <textarea
        id={`note-${orderId}`}
        name="body"
        required
        minLength={1}
        maxLength={2000}
        placeholder="Add an internal note (visible to manufacturer team only)…"
        className="w-full resize-y rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--accent)]"
        rows={3}
      />
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[11px] text-[var(--muted)]">
          Adding as <span className="text-[var(--ink)]">{authorName}</span> · not visible to customer
        </p>
        <button
          type="submit"
          className="inline-flex items-center rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--cream)] transition hover:opacity-90"
        >
          Add internal note
        </button>
      </div>
    </form>
  )
}
