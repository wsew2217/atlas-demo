import type { Message } from '@/lib/demo-data'

type Viewer = 'manufacturer' | 'brand'

export function MessageThread({
  messages,
  viewer,
  brandColor,
}: {
  messages: Message[]
  viewer: Viewer
  brandColor?: string
}) {
  if (messages.length === 0) {
    return (
      <p className="rounded-md border border-dashed border-[var(--border)] bg-[var(--surface)] p-4 text-xs text-[var(--muted)]">
        No messages yet.
      </p>
    )
  }

  return (
    <div className="space-y-3">
      {messages.map((m) => {
        if (m.authorRole === 'system') {
          return (
            <div
              key={m.id}
              className="flex items-center justify-center gap-2 rounded-md border border-dashed border-[var(--border)] bg-[var(--cream)] px-3 py-2 text-xs text-[var(--muted)]"
            >
              <span className="font-mono uppercase tracking-[0.18em] text-[10px]">auto</span>
              <span>{m.body}</span>
              <span className="font-mono text-[10px]">{formatTime(m.at)}</span>
            </div>
          )
        }

        const isViewer =
          (viewer === 'manufacturer' && m.authorRole === 'manufacturer') ||
          (viewer === 'brand' && m.authorRole === 'brand')

        return (
          <div
            key={m.id}
            className={`flex ${isViewer ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg border px-4 py-3 text-sm shadow-sm ${
                isViewer
                  ? 'border-transparent text-[var(--cream)]'
                  : 'border-[var(--border)] bg-[var(--surface)] text-[var(--ink)]'
              }`}
              style={
                isViewer
                  ? { backgroundColor: brandColor ?? 'var(--ink)' }
                  : undefined
              }
            >
              <p
                className={`font-mono text-[10px] uppercase tracking-[0.18em] ${
                  isViewer ? 'text-[var(--cream)]/70' : 'text-[var(--muted)]'
                }`}
              >
                {m.authorName} · {formatTime(m.at)}
              </p>
              <p className="mt-1.5 leading-relaxed">{m.body}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function formatTime(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
}
