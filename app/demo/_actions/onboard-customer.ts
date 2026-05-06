'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { appendDemoCustomer, slugify, type DemoCustomer } from '@/lib/demo-customers-store'

export interface OnboardInput {
  customerName: string
  domain: string
  primaryColor: string
  contactName: string
  contactEmail: string
  contactRole: string
  rules: string[]
}

export async function onboardCustomerAction(input: OnboardInput) {
  const customerName = input.customerName.trim()
  const domain = input.domain.trim().toLowerCase()
  const primaryColor = input.primaryColor.trim()
  const contactName = input.contactName.trim()
  const contactEmail = input.contactEmail.trim().toLowerCase()
  const contactRole = input.contactRole.trim()

  if (!customerName || !domain || !contactName || !contactEmail) {
    throw new Error('Missing required onboarding fields.')
  }

  const slug = slugify(customerName) || `customer-${Date.now().toString(36)}`

  const customer: DemoCustomer = {
    slug,
    customerName,
    domain,
    primaryColor: /^#[0-9a-f]{6}$/i.test(primaryColor) ? primaryColor : '#1A1A1A',
    contactName,
    contactEmail,
    contactRole,
    rules: input.rules.filter((r) => typeof r === 'string' && r.trim().length > 0).slice(0, 20),
    createdAt: new Date().toISOString(),
  }

  await appendDemoCustomer(customer)

  revalidatePath('/demo/full/customers')
  revalidatePath(`/demo/full/customers/onboarded/${slug}`)
  redirect(`/demo/full/customers/onboarded/${slug}`)
}
