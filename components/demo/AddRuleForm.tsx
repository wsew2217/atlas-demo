import { addRuleAction } from '@/app/demo/_actions/manage-rules'

export function AddRuleForm({ customerSlug }: { customerSlug: string }) {
  const action = addRuleAction.bind(null, customerSlug)
  return (
    <form
      action={action}
      className="rounded-md border border-dashed border-[var(--accent)]/40 bg-[var(--cream)] p-4"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
        Add a custom rule
      </p>
      <div className="mt-3 space-y-2">
        <input
          type="text"
          name="rule"
          required
          maxLength={200}
          placeholder="Rule (e.g. 'No fabric substitutions without written approval')"
          className="w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--accent)]"
        />
        <textarea
          name="detail"
          rows={2}
          maxLength={500}
          placeholder="Detail (optional) — when does this apply, who enforces it"
          className="w-full resize-y rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--accent)]"
        />
      </div>
      <div className="mt-3 flex justify-end">
        <button
          type="submit"
          className="rounded-md bg-[var(--accent)] px-4 py-1.5 text-sm font-medium text-[var(--cream)] transition hover:opacity-90"
        >
          Add rule
        </button>
      </div>
    </form>
  )
}
