import { addMessageAction } from '@/app/demo/_actions/add-message'

export function ReplyForm({
  orderId,
  authorRole,
  authorName,
  brandColor,
}: {
  orderId: string
  authorRole: 'manufacturer' | 'brand'
  authorName: string
  brandColor?: string
}) {
  const action = addMessageAction.bind(null, orderId, authorRole, authorName)
  const buttonStyle =
    authorRole === 'brand' && brandColor
      ? { backgroundColor: brandColor }
      : undefined

  return (
    <form
      action={action}
      className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4"
    >
      <label htmlFor={`reply-${orderId}`} className="sr-only">
        Reply
      </label>
      <textarea
        id={`reply-${orderId}`}
        name="body"
        required
        minLength={1}
        maxLength={2000}
        placeholder="Write a reply…"
        className="w-full resize-y rounded-md border border-[var(--border)] bg-[var(--cream)] px-3 py-2 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--accent)] focus:bg-[var(--surface)]"
        rows={3}
      />
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[11px] text-[var(--muted)]">
          Posting as <span className="text-[var(--ink)]">{authorName}</span>
        </p>
        <button
          type="submit"
          className="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-[var(--cream)] transition hover:opacity-90"
          style={buttonStyle ?? { backgroundColor: 'var(--ink)' }}
        >
          Send reply
        </button>
      </div>
    </form>
  )
}
