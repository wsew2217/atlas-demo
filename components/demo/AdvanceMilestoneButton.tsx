import { advanceMilestoneAction } from '@/app/demo/_actions/advance-milestone'

export function AdvanceMilestoneButton({
  batchId,
  milestoneId,
  label,
}: {
  batchId: string
  milestoneId: string
  label: string
}) {
  const action = advanceMilestoneAction.bind(null, batchId, milestoneId)
  return (
    <form action={action}>
      <button
        type="submit"
        className="inline-flex items-center gap-1.5 rounded-md bg-[var(--good)] px-3 py-1.5 text-xs font-medium text-[var(--cream)] transition hover:opacity-90"
      >
        ✓ Mark {label} complete
      </button>
    </form>
  )
}
