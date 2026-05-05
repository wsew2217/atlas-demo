import { projects, tasks } from '@/lib/dummy-data'

const stateLabel: Record<string, string> = {
  todo: 'To do',
  in_progress: 'In progress',
  done: 'Done',
  blocked: 'Blocked',
}

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12">
      <header className="mb-10">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
          Atlas Demo
        </p>
        <h1 className="mt-2 text-4xl font-semibold text-[var(--ink)]">
          A fresh canvas — <span className="italic text-[var(--accent)]">just dummy data.</span>
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">
          Same stack as TRG Compliance: Next.js 16, Supabase, Clerk, Tailwind. New paint:
          Fraunces display, IBM Plex Sans body, IBM Plex Mono numeric.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">Projects</h2>
        <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
          <table className="w-full text-sm">
            <thead className="bg-[var(--cream)] text-left text-xs uppercase tracking-wider text-[var(--muted)]">
              <tr>
                <th className="px-4 py-3 font-medium">Code</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Owner</th>
                <th className="px-4 py-3 font-medium">Due</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-t border-[var(--border)]">
                  <td className="px-4 py-3 font-mono text-xs text-[var(--ink)]">{p.code}</td>
                  <td className="px-4 py-3">{p.name}</td>
                  <td className="px-4 py-3 text-[var(--muted)]">{p.owner}</td>
                  <td className="px-4 py-3 font-mono text-xs text-[var(--muted)]">{p.due}</td>
                  <td className="px-4 py-3">
                    <StatusPill status={p.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Recent activity</h2>
        <ul className="space-y-2">
          {tasks.map((t) => (
            <li
              key={t.id}
              className="flex items-center justify-between rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
            >
              <div className="min-w-0">
                <div className="truncate text-sm">{t.title}</div>
                <div className="font-mono text-xs text-[var(--muted)]">
                  {t.assignee} · {new Date(t.updated_at).toLocaleString()}
                </div>
              </div>
              <StatePill state={t.state} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

function StatusPill({ status }: { status: string }) {
  const tone =
    status === 'active'   ? 'bg-[var(--good)]/15 text-[var(--good)]' :
    status === 'paused'   ? 'bg-[var(--alert)]/15 text-[var(--alert)]' :
                            'bg-[var(--ink)]/10 text-[var(--ink)]'
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${tone}`}>
      {status}
    </span>
  )
}

function StatePill({ state }: { state: string }) {
  const tone =
    state === 'done'        ? 'bg-[var(--good)]/15 text-[var(--good)]'   :
    state === 'in_progress' ? 'bg-[var(--accent)]/15 text-[var(--accent)]' :
    state === 'blocked'     ? 'bg-[var(--alert)]/15 text-[var(--alert)]'  :
                              'bg-[var(--ink)]/10 text-[var(--ink)]'
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${tone}`}>
      {stateLabel[state] ?? state}
    </span>
  )
}
