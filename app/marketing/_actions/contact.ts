'use server'

import { Resend } from 'resend'

export interface ContactState {
  ok?: boolean
  error?: string
  dev?: boolean
}

const CONTACT_TO = 'hello@kuhler.com'
const CONTACT_FROM = 'Kuhler Contact <noreply@kuhler.com>'

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name    = (formData.get('name')    ?? '').toString().trim()
  const email   = (formData.get('email')   ?? '').toString().trim()
  const company = (formData.get('company') ?? '').toString().trim()
  const role    = (formData.get('role')    ?? '').toString().trim()
  const message = (formData.get('message') ?? '').toString().trim()
  const honey   = (formData.get('website') ?? '').toString().trim()

  if (honey) return { ok: true }

  if (!name || !email || !message) {
    return { ok: false, error: 'Name, email, and message are required.' }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'Please enter a valid email address.' }
  }
  if (message.length > 5000) {
    return { ok: false, error: 'Message is too long.' }
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.log('[contact] RESEND_API_KEY not set — would have emailed:', {
      name,
      email,
      company,
      role,
      message,
    })
    return { ok: true, dev: true }
  }

  try {
    const resend = new Resend(apiKey)
    const subject = `[kuhler.com] ${name}${company ? ` from ${company}` : ''}`
    const body = [
      `From: ${name} <${email}>`,
      company ? `Company: ${company}` : null,
      role ? `Role: ${role}` : null,
      '',
      message,
    ]
      .filter(Boolean)
      .join('\n')

    await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      replyTo: email,
      subject,
      text: body,
    })

    return { ok: true }
  } catch (err) {
    console.error('[contact] resend error', err)
    return { ok: false, error: 'Couldn’t send right now. Email hello@kuhler.com directly.' }
  }
}
