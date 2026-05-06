import { assignFactoryAction } from '@/app/demo/_actions/assign-factory'

const FACTORIES = [
  'Plant A · China',
  'Plant B · Cambodia',
]

export function AssignFactoryForm({ orderId }: { orderId: string }) {
  const action = assignFactoryAction.bind(null, orderId)
  return (
    <form action={action} className="flex items-center gap-2">
      <label htmlFor={`factory-${orderId}`} className="sr-only">
        Assign factory
      </label>
      <select
        id={`factory-${orderId}`}
        name="factory"
        defaultValue={FACTORIES[0]}
        className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5 text-xs text-[var(--ink)] outline-none focus:border-[var(--accent)]"
      >
        {FACTORIES.map((f) => (
          <option key={f} value={f}>{f}</option>
        ))}
      </select>
      <button
        type="submit"
        className="rounded-md bg-[var(--accent)] px-3 py-1.5 text-xs font-medium text-[var(--cream)] transition hover:opacity-90"
      >
        Assign →
      </button>
    </form>
  )
}
