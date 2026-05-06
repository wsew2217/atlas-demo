'use server'

import { Resend } from 'resend'

export interface WaitlistState {
  ok?: boolean
  error?: string
  dev?: boolean
}

const WAITLIST_TO = 'hello@kuhler.com'
const WAITLIST_FROM = 'Kuhler Waitlist <noreply@kuhler.com>'

export async function joinWaitlist(
  _prev: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  const email   = (formData.get('email')   ?? '').toString().trim()
  const company = (formData.get('company') ?? '').toString().trim()
  const role    = (formData.get('role')    ?? '').toString().trim()
  const volume  = (formData.get('volume')  ?? '').toString().trim()
  const note    = (formData.get('note')    ?? '').toString().trim()
  const honey   = (formData.get('website') ?? '').toString().trim()

  if (honey) return { ok: true }

  if (!email) {
    return { ok: false, error: 'Email is required.' }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'Please enter a valid email address.' }
  }
  if (note.length > 2000) {
    return { ok: false, error: 'Note is too long.' }
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.log('[waitlist] RESEND_API_KEY not set — would have emailed:', {
      email, company, role, volume, note,
    })
    return { ok: true, dev: true }
  }

  try {
    const resend = new Resend(apiKey)
    const subject = `[kuhler.com waitlist] ${email}${company ? ` · ${company}` : ''}`
    const body = [
      `Email: ${email}`,
      company ? `Company: ${company}` : null,
      role ? `Role: ${role}` : null,
      volume ? `Monthly PO volume: ${volume}` : null,
      '',
      note || '(no note)',
    ]
      .filter((l) => l !== null)
      .join('\n')

    await resend.emails.send({
      from: WAITLIST_FROM,
      to: WAITLIST_TO,
      replyTo: email,
      subject,
      text: body,
    })

    return { ok: true }
  } catch (err) {
    console.error('[waitlist] resend error', err)
    return { ok: false, error: 'Couldn’t add you right now. Email hello@kuhler.com directly.' }
  }
}
