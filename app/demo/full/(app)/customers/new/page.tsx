import Link from 'next/link'
import { OnboardingWizard } from '@/components/demo/OnboardingWizard'

export const metadata = {
  title: 'Atlas Full Demo · Onboard new customer',
  robots: { index: false, follow: false },
}

export default function OnboardCustomerPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-10">
      <Link
        href="/demo/full/customers"
        className="mb-6 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)] hover:text-[var(--ink)]"
      >
        ← All customers
      </Link>

      <header className="mb-8">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
          Full demo · onboarding
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-[var(--ink)]">
          Onboard a new customer
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">
          Four steps. Domain, brand, rules, review. We provision their branded portal under their
          domain on submit. Real production flow takes about a business day, mostly waiting on
          DNS.
        </p>
      </header>

      <OnboardingWizard />
    </div>
  )
}
