'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function signOutAction() {
  const c = await cookies()
  c.delete('demo-full-auth')
  redirect('/demo')
}
