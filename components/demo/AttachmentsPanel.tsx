'use client'

import { useState, useTransition } from 'react'
import {
  attachPhotoAction,
  removeAttachmentAction,
  SAMPLE_PHOTOS,
} from '@/app/demo/_actions/attach-photo'
import type { DemoAttachment } from '@/lib/demo-attachments-store'

export function AttachmentsPanel({
  batchId,
  uploadedBy,
  attachments,
  canRemove = true,
}: {
  batchId: string
  uploadedBy: string
  attachments: DemoAttachment[]
  canRemove?: boolean
}) {
  const [picking, setPicking] = useState(false)
  const [pendingRemoveId, setPendingRemoveId] = useState<string | null>(null)
  const [, startTransition] = useTransition()

  const handleAttach = (slug: string) => {
    const action = attachPhotoAction.bind(null, batchId, null, uploadedBy)
    const fd = new FormData()
    fd.set('sampleSlug', slug)
    setPicking(false)
    startTransition(async () => {
      await action(fd)
    })
  }

  const handleRemove = (id: string) => {
    setPendingRemoveId(id)
    startTransition(async () => {
      await removeAttachmentAction(id, batchId)
      setPendingRemoveId(null)
    })
  }

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
          Attachments {attachments.length > 0 && `· ${attachments.length}`}
        </p>
        {!picking ? (
          <button
            type="button"
            onClick={() => setPicking(true)}
            className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs text-[var(--ink)] transition hover:bg-[var(--cream)]"
          >
            📎 Attach photo
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setPicking(false)}
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] hover:text-[var(--ink)]"
          >
            Cancel
          </button>
        )}
      </div>

      {picking && (
        <div className="mt-3 rounded-md border border-[var(--accent)]/30 bg-[var(--accent)]/5 p-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
            Pick a sample photo
          </p>
          <p className="mt-1 text-xs text-[var(--muted)]">
            In production, this would be a file picker uploading to Supabase Storage. For the
            demo, pick one of these stand-ins.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {SAMPLE_PHOTOS.map((p) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => handleAttach(p.slug)}
                className="overflow-hidden rounded-md border border-[var(--border)] bg-[var(--surface)] transition hover:border-[var(--accent)] hover:shadow"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/demo/photos/${p.slug}.svg`}
                  alt={p.label}
                  className="block aspect-[4/3] w-full object-cover"
                />
                <p className="px-3 py-2 text-left text-xs text-[var(--ink)]">{p.label}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {attachments.length === 0 ? (
        !picking && (
          <p className="mt-2 text-xs text-[var(--muted)]">
            No attachments yet. Attaching a photo also posts an auto-update to the customer&rsquo;s portal.
          </p>
        )
      ) : (
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {attachments.map((a) => (
            <article
              key={a.id}
              className="overflow-hidden rounded-md border border-[var(--border)] bg-[var(--surface)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/demo/photos/${a.sampleSlug}.svg`}
                alt={a.caption}
                className="block aspect-[4/3] w-full object-cover"
              />
              <div className="px-3 py-2.5">
                <p className="text-xs font-medium text-[var(--ink)]">{a.caption}</p>
                <p className="mt-1 font-mono text-[10px] text-[var(--muted)]">
                  {a.uploadedBy} · {new Date(a.uploadedAt).toLocaleString(undefined, {
                    month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
                  })}
                </p>
                {canRemove && (
                  <button
                    type="button"
                    onClick={() => handleRemove(a.id)}
                    disabled={pendingRemoveId === a.id}
                    className="mt-2 rounded-md px-2 py-0.5 text-[10px] text-[var(--alert)] transition hover:bg-[var(--alert)]/10 disabled:opacity-60"
                  >
                    {pendingRemoveId === a.id ? 'Removing…' : 'Remove'}
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
