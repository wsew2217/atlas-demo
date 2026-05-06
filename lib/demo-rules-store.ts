import 'server-only'
import { cookies } from 'next/headers'

const COOKIE = 'demo-customer-rules-v1'
const MAX_PER_CUSTOMER = 30

export interface CustomerRule {
  id: string
  customerSlug: string
  rule: string
  detail: string
  createdAt: string
  source: 'preset' | 'custom'
}

interface RulesState {
  // Per customer slug: list of fixture rule IDs that have been removed
  removedFixtures: Record<string, string[]>
  // Per customer slug: custom-added rules
  customRules: Record<string, CustomerRule[]>
}

const empty: RulesState = { removedFixtures: {}, customRules: {} }

export async function getRulesState(): Promise<RulesState> {
  const c = await cookies()
  const raw = c.get(COOKIE)?.value
  if (!raw) return empty
  try {
    const parsed = JSON.parse(raw) as Partial<RulesState>
    return {
      removedFixtures: parsed.removedFixtures ?? {},
      customRules: parsed.customRules ?? {},
    }
  } catch {
    return empty
  }
}

async function setRulesState(state: RulesState): Promise<void> {
  const c = await cookies()
  c.set(COOKIE, JSON.stringify(state), {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
  })
}

export async function addCustomRule(
  customerSlug: string,
  rule: string,
  detail: string,
): Promise<void> {
  const state = await getRulesState()
  const list = state.customRules[customerSlug] ?? []
  const next = [
    ...list,
    {
      id: `rule-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      customerSlug,
      rule: rule.trim(),
      detail: detail.trim(),
      createdAt: new Date().toISOString(),
      source: 'custom' as const,
    },
  ].slice(-MAX_PER_CUSTOMER)
  state.customRules[customerSlug] = next
  await setRulesState(state)
}

export async function removeCustomRule(customerSlug: string, ruleId: string): Promise<void> {
  const state = await getRulesState()
  const list = state.customRules[customerSlug] ?? []
  state.customRules[customerSlug] = list.filter((r) => r.id !== ruleId)
  await setRulesState(state)
}

export async function disableFixtureRule(customerSlug: string, ruleId: string): Promise<void> {
  const state = await getRulesState()
  const list = state.removedFixtures[customerSlug] ?? []
  if (!list.includes(ruleId)) {
    state.removedFixtures[customerSlug] = [...list, ruleId]
    await setRulesState(state)
  }
}

export async function enableFixtureRule(customerSlug: string, ruleId: string): Promise<void> {
  const state = await getRulesState()
  const list = state.removedFixtures[customerSlug] ?? []
  state.removedFixtures[customerSlug] = list.filter((id) => id !== ruleId)
  await setRulesState(state)
}

export async function isFixtureRuleDisabled(
  customerSlug: string,
  ruleId: string,
): Promise<boolean> {
  const state = await getRulesState()
  return (state.removedFixtures[customerSlug] ?? []).includes(ruleId)
}

export async function getCustomRulesForCustomer(customerSlug: string): Promise<CustomerRule[]> {
  const state = await getRulesState()
  return state.customRules[customerSlug] ?? []
}

export async function getRemovedFixtureIds(customerSlug: string): Promise<string[]> {
  const state = await getRulesState()
  return state.removedFixtures[customerSlug] ?? []
}
