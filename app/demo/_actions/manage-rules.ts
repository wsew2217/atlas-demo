'use server'

import { revalidatePath } from 'next/cache'
import {
  addCustomRule,
  removeCustomRule,
  disableFixtureRule,
  enableFixtureRule,
} from '@/lib/demo-rules-store'

export async function addRuleAction(customerSlug: string, formData: FormData) {
  const rule = (formData.get('rule') ?? '').toString().trim()
  const detail = (formData.get('detail') ?? '').toString().trim()
  if (!rule) return
  if (rule.length > 200) return
  if (detail.length > 500) return
  await addCustomRule(customerSlug, rule, detail)
  revalidatePath(`/demo/full/customers/${customerSlug}`)
}

export async function removeCustomRuleAction(customerSlug: string, ruleId: string) {
  await removeCustomRule(customerSlug, ruleId)
  revalidatePath(`/demo/full/customers/${customerSlug}`)
}

export async function toggleFixtureRuleAction(
  customerSlug: string,
  ruleId: string,
  formData: FormData,
) {
  const action = (formData.get('action') ?? '').toString()
  if (action === 'disable') {
    await disableFixtureRule(customerSlug, ruleId)
  } else if (action === 'enable') {
    await enableFixtureRule(customerSlug, ruleId)
  }
  revalidatePath(`/demo/full/customers/${customerSlug}`)
}
