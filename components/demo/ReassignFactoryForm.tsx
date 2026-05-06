import { reassignFactoryAction } from '@/app/demo/_actions/reassign-factory'

const FACTORIES = [
  'Plant A · China',
  'Plant B · Cambodia',
]

export function ReassignFactoryForm({
  batchId,
  currentFactory,
}: {
  batchId: string
  currentFactory: string
}) {
  const action = reassignFactoryAction.bind(null, batchId)
  return (
    <form action={action} className="flex items-center gap-2">
      <label htmlFor={`reassign-${batchId}`} className="sr-only">
        Reassign factory
      </label>
      <select
        id={`reassign-${batchId}`}
        name="factory"
        defaultValue={currentFactory}
        className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-xs text-[var(--ink)] outline-none focus:border-[var(--accent)]"
      >
        {FACTORIES.map((f) => (
          <option key={f} value={f}>{f}</option>
        ))}
      </select>
      <button
        type="submit"
        className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-xs font-medium text-[var(--ink)] transition hover:bg-[var(--cream)]"
      >
        Reassign
      </button>
    </form>
  )
}
