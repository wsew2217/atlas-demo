'use client'

import { useState } from 'react'
import Link from 'next/link'

// Defensible-but-conservative assumptions:
// - 3 hrs/week per customer portal saved on status coordination (chasing email + manual digests)
// - 15 minutes per PO saved on intake (PDF parsing + line-item entry)
// - 50 working weeks per year
// All editable in the calculator so prospects can re-run with their numbers.

const HOURS_PER_CUSTOMER_PER_WEEK = 3
const HOURS_PER_PO = 0.25
const WORKING_WEEKS_PER_YEAR = 50

export function RoiCalculator() {
  const [customers, setCustomers] = useState(8)
  const [posPerQuarter, setPos] = useState(60)
  const [hoursOnCoordination, setHours] = useState(20)
  const [hourlyCost, setHourlyCost] = useState(60)

  const posPerWeek = posPerQuarter / 13
  const coordHoursSaved = customers * HOURS_PER_CUSTOMER_PER_WEEK
  const intakeHoursSaved = posPerWeek * HOURS_PER_PO
  const totalWeeklyHoursSaved = Math.min(coordHoursSaved + intakeHoursSaved, hoursOnCoordination)
  const annualHoursSaved = totalWeeklyHoursSaved * WORKING_WEEKS_PER_YEAR
  const annualCostSaved = Math.round(annualHoursSaved * hourlyCost)

  const usd = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
        Estimate
      </p>
      <h3 className="mt-2 font-display text-2xl font-semibold leading-snug text-[var(--ink)] md:text-3xl">
        What would Atlas save your operation?
      </h3>
      <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">
        Conservative back-of-envelope. Adjust the inputs to your shape — every assumption is
        editable.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <NumberInput
          label="Customers (branded portals)"
          value={customers}
          onChange={setCustomers}
          min={1}
          max={50}
          step={1}
          suffix={customers === 1 ? 'customer' : 'customers'}
        />
        <NumberInput
          label="POs per quarter"
          value={posPerQuarter}
          onChange={setPos}
          min={5}
          max={500}
          step={5}
          suffix="POs / qtr"
        />
        <NumberInput
          label="Hours / week on status coordination today"
          value={hoursOnCoordination}
          onChange={setHours}
          min={2}
          max={40}
          step={1}
          suffix="hrs / wk"
        />
        <NumberInput
          label="Loaded hourly cost of the people doing it"
          value={hourlyCost}
          onChange={setHourlyCost}
          min={25}
          max={250}
          step={5}
          suffix="$ / hr"
          prefix="$"
        />
      </div>

      <div className="mt-7 grid gap-4 rounded-md border border-[var(--accent)]/30 bg-[var(--accent)]/5 p-6 sm:grid-cols-3">
        <ResultStat label="Hours / week saved" value={`${totalWeeklyHoursSaved.toFixed(1)} hrs`} />
        <ResultStat label="Hours / year saved" value={`${Math.round(annualHoursSaved).toLocaleString()} hrs`} />
        <ResultStat
          label="Cost / year saved"
          value={usd(annualCostSaved)}
          accent
        />
      </div>

      <details className="mt-5 text-xs text-[var(--muted)]">
        <summary className="cursor-pointer font-mono uppercase tracking-[0.18em] hover:text-[var(--ink)]">
          Show the math
        </summary>
        <ul className="mt-3 space-y-1.5 leading-relaxed">
          <li>
            <strong className="text-[var(--ink)]">Coordination savings:</strong>{' '}
            {customers} {customers === 1 ? 'customer' : 'customers'} × {HOURS_PER_CUSTOMER_PER_WEEK} hrs/wk = {coordHoursSaved} hrs/wk
            <span className="ml-1 text-[var(--muted)]/70">(industry-observation: branded portals drop status pings ~70%)</span>
          </li>
          <li>
            <strong className="text-[var(--ink)]">Intake savings:</strong>{' '}
            {posPerQuarter} POs/qtr → {posPerWeek.toFixed(1)} POs/wk × {HOURS_PER_PO} hr re-keying eliminated = {intakeHoursSaved.toFixed(1)} hrs/wk
            <span className="ml-1 text-[var(--muted)]/70">(PDF parsing + auto line-item extraction)</span>
          </li>
          <li>
            <strong className="text-[var(--ink)]">Capped at:</strong> hours/week you currently spend on coordination ({hoursOnCoordination} hrs/wk).
            We don&rsquo;t claim savings you can&rsquo;t book.
          </li>
          <li>
            <strong className="text-[var(--ink)]">Annualized:</strong> weekly savings × {WORKING_WEEKS_PER_YEAR} working weeks × ${hourlyCost}/hr loaded cost.
          </li>
        </ul>
      </details>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link
          href="/contact"
          className="inline-flex items-center rounded-md bg-[var(--ink)] px-4 py-2.5 text-sm font-medium text-[var(--cream)] transition hover:opacity-90"
        >
          Get a real quote in 15 minutes →
        </Link>
        <p className="text-xs text-[var(--muted)]">
          Real ROI is shaped by your specific operation. We&rsquo;ll model it with you on the call.
        </p>
      </div>
    </div>
  )
}

function NumberInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  suffix,
  prefix,
}: {
  label: string
  value: number
  onChange: (n: number) => void
  min: number
  max: number
  step: number
  suffix: string
  prefix?: string
}) {
  return (
    <div>
      <label className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
        {label}
      </label>
      <div className="mt-2 flex items-center gap-3">
        <div className="flex w-32 items-center rounded-md border border-[var(--border)] bg-[var(--cream)] px-3 py-2 focus-within:border-[var(--accent)]">
          {prefix && <span className="font-mono text-sm text-[var(--muted)]">{prefix}</span>}
          <input
            type="number"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(e) => {
              const n = Number(e.target.value)
              if (Number.isFinite(n)) onChange(Math.min(Math.max(n, min), max))
            }}
            className="w-full bg-transparent font-mono text-sm text-[var(--ink)] outline-none"
          />
        </div>
        <input
          type="range"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 accent-[var(--accent)]"
          aria-label={label}
        />
        <span className="font-mono text-xs text-[var(--muted)]">{suffix}</span>
      </div>
    </div>
  )
}

function ResultStat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">{label}</p>
      <p
        className={`mt-2 font-display text-2xl font-semibold md:text-3xl ${
          accent ? 'text-[var(--accent)]' : 'text-[var(--ink)]'
        }`}
      >
        {value}
      </p>
    </div>
  )
}
