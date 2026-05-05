'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const USER = process.env.DEMO_USERNAME ?? 'demo'
const PASS = process.env.DEMO_PASSWORD ?? 'kuhler2026'

export interface SignInState {
  error?: string
}

export async function signInAction(
  _prev: SignInState,
  formData: FormData,
): Promise<SignInState> {
  const username = (formData.get('username') ?? '').toString().trim()
  const password = (formData.get('password') ?? '').toString()

  if (!username || !password) {
    return { error: 'Username and password are required.' }
  }

  if (username !== USER || password !== PASS) {
    return { error: 'Invalid credentials. Try again.' }
  }

  const c = await cookies()
  c.set('demo-full-auth', '1', {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: 'lax',
  })

  redirect('/demo/full')
}
