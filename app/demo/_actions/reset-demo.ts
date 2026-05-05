'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function resetDemoAction() {
  const c = await cookies()
  c.delete('demo-messages-v2')
  c.delete('demo-milestones-v2')
  revalidatePath('/', 'layout')
  redirect('/demo')
}
