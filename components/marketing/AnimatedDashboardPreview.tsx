'use client'

import { useEffect, useState } from 'react'

const liveUpdates = [
  { code: 'B-2417-A', text: 'reached production midpoint at Plant A', tone: 'progress' as const },
  { code: 'PO-2425',  text: 'received from Meridian Apparel · 1,800 units', tone: 'received' as const },
  { code: 'B-2421',   text: 'entered cut & sew at Plant A', tone: 'progress' as const },
  { code: 'B-2418',   text: 'inline QC photos uploaded by Lin Wei', tone: 'photo' as const },
  { code: 'PO-2417',  text: 'Mira Chen approved sample fit · cleared to keep going', tone: 'approval' as const },
]

export function AnimatedDashboardPreview() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % liveUpdates.length), 4500)
    return () => clearInterval(t)
  }, [])

  const update = liveUpdates[idx]

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--cream)] shadow-sm">
      <div className="flex items-center gap-3 border-b border-[var(--border)] bg-[var(--surface)] px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--ink)]/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--ink)]/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--ink)]/15" />
        </div>
        <div className="flex-1 rounded-md border border-[var(--border)] bg-[var(--cream)] px-3 py-1 text-center font-mono text-[11px] text-[var(--muted)]">
          demo.kuhler.com
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
          <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-[var(--good)]" />
          Live
        </span>
      </div>

      <div className="grid gap-0 md:grid-cols-2">
        <div className="border-b border-[var(--border)] p-6 md:border-b-0 md:border-r">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
            Manufacturer admin · /demo
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold text-[var(--ink)]">Dashboard</h3>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <PreviewKpi label="Open POs" value="4" />
            <PreviewKpi label="In production" value="3" />
            <PreviewKpi label="Units in flight" value="4,450" />
            <PreviewKpi label="Milestones / wk" value="4" />
          </div>
          <div className="mt-5 space-y-1.5">
            {[
              { code: 'PO-2417', brand: 'Summit Athletics', status: 'in_production' },
              { code: 'PO-2418', brand: 'Summit Athletics', status: 'in_production' },
              { code: 'PO-2421', brand: 'Meridian Apparel', status: 'in_production' },
              { code: 'PO-2425', brand: 'Meridian Apparel', status: 'received' },
            ].map((row) => (
              <div
                key={row.code}
                className="flex items-center justify-between rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs"
              >
                <span className="font-mono text-[var(--ink)]">{row.code}</span>
                <span className="text-[var(--muted)]">{row.brand}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    row.status === 'in_production'
                      ? 'bg-[var(--accent)]/15 text-[var(--accent)]'
                      : 'bg-[var(--ink)]/10 text-[var(--ink)]'
                  }`}
                >
                  {row.status === 'in_production' ? 'In production' : 'Received'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[var(--surface)] p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
            Customer portal · /portal/summit
          </p>
          <h3
            className="mt-2 font-display text-2xl font-semibold"
            style={{ color: '#14532D' }}
          >
            Summit Athletics
          </h3>
          <p className="mt-1 font-mono text-[11px] text-[var(--muted)]">
            Live status across 3 orders
          </p>
          <div className="mt-5 space-y-3">
            {[
              { code: 'PO-2417', label: 'Heavyweight hoodie', units: '2,400', progress: 40 },
              { code: 'PO-2418', label: 'Performance tee', units: '1,200', progress: 60 },
            ].map((row) => (
              <div
                key={row.code}
                className="rounded-md border border-[var(--border)] bg-[var(--cream)] px-4 py-3"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[11px] text-[var(--ink)]">{row.code}</span>
                  <span className="font-mono text-[10px] text-[var(--muted)]">{row.progress}%</span>
                </div>
                <p className="mt-0.5 text-sm font-medium text-[var(--ink)]">{row.label}</p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[var(--border)]">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${row.progress}%`, backgroundColor: '#14532D' }}
                  />
                </div>
                <p className="mt-1.5 font-mono text-[10px] text-[var(--muted)]">
                  {row.units} units · in production
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live update ticker */}
      <div className="border-t border-[var(--border)] bg-[var(--cream)] px-5 py-3">
        <div className="flex items-center gap-3 text-xs">
          <span className="pulse-dot inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--good)]" />
          <span className="font-mono uppercase tracking-[0.18em] text-[var(--muted)]">Auto-update</span>
          <span key={idx} className="ticker-fade flex-1 truncate text-[var(--ink)]">
            <span className="font-mono text-[var(--muted)]">{update.code}</span>
            <span className="mx-1.5 text-[var(--muted)]">·</span>
            <span>{update.text}</span>
          </span>
        </div>
      </div>
    </div>
  )
}

function PreviewKpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">{label}</p>
      <p className="mt-1 font-display text-xl font-semibold text-[var(--ink)]">{value}</p>
    </div>
  )
}
