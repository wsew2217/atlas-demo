import Link from 'next/link'

export const metadata = {
  title: 'Developers — API & webhooks',
  description:
    'Public REST API for Atlas — read orders, batches, and customers; receive webhook events for milestone changes. Bearer auth, JSON over HTTPS.',
}

interface Endpoint {
  method: 'GET' | 'POST'
  path: string
  summary: string
  description: string
  auth: 'bearer'
  exampleResponse: string
}

const endpoints: Endpoint[] = [
  {
    method: 'GET',
    path: '/api/v1/orders',
    summary: 'List orders',
    description: 'Returns all orders visible to the API key. Useful for ERP sync.',
    auth: 'bearer',
    exampleResponse: `{
  "data": [
    {
      "id": "ord-001",
      "code": "PO-2417",
      "brand_slug": "summit",
      "ship_by": "2026-06-10",
      "total_units": 2400,
      "status": "in_production",
      "created_at": "2026-04-12",
      "line_item_count": 4,
      "batch_ids": ["batch-001"]
    }
  ],
  "meta": { "count": 5, "total": 5 }
}`,
  },
  {
    method: 'GET',
    path: '/api/v1/orders/{id}',
    summary: 'Get order detail',
    description: 'Returns the order plus its line items and production batches with milestones.',
    auth: 'bearer',
    exampleResponse: `{
  "data": {
    "id": "ord-001",
    "code": "PO-2417",
    "brand_slug": "summit",
    "ship_by": "2026-06-10",
    "total_units": 2400,
    "status": "in_production",
    "line_items": [...],
    "batches": [
      {
        "id": "batch-001",
        "code": "B-2417-A",
        "factory": "Plant A · China",
        "milestones": [
          { "id": "m1", "label": "Materials sourced", "state": "done", "date": "2026-04-22" }
        ]
      }
    ]
  }
}`,
  },
  {
    method: 'POST',
    path: '/api/v1/orders',
    summary: 'Create order (intake)',
    description: 'Accepts a structured PO from an external system. Validates and accepts; in production, inserts into the orders table and triggers webhooks.',
    auth: 'bearer',
    exampleResponse: `{
  "data": {
    "id": "ord-q3k7m2",
    "code": "PO-9999",
    "brand_slug": "summit",
    "ship_by": "2026-09-01",
    "total_units": 1200,
    "status": "received",
    "line_items_received": 4,
    "created_at": "2026-05-06T18:42:00.000Z"
  }
}`,
  },
  {
    method: 'GET',
    path: '/api/v1/batches',
    summary: 'List batches',
    description: 'Returns all production batches. Useful for cross-factory KPI dashboards.',
    auth: 'bearer',
    exampleResponse: `{
  "data": [
    {
      "id": "batch-001",
      "code": "B-2417-A",
      "factory": "Plant A · China",
      "units": 2400,
      "order_id": "ord-001",
      "milestone_count": 5,
      "milestones": [...]
    }
  ],
  "meta": { "count": 4 }
}`,
  },
  {
    method: 'GET',
    path: '/api/v1/customers',
    summary: 'List customers',
    description: 'Returns all customer brands the API key can access, with portal URLs.',
    auth: 'bearer',
    exampleResponse: `{
  "data": [
    {
      "slug": "summit",
      "name": "Summit Athletics",
      "primary_color": "#14532D",
      "contact": "Mira Chen",
      "contact_email": "mira@summitathletics.com",
      "portal_url": "https://demo.kuhler.com/portal/summit"
    }
  ],
  "meta": { "count": 2 }
}`,
  },
]

const webhooks: Endpoint[] = [
  {
    method: 'POST',
    path: '/api/webhooks/milestone-completed',
    summary: 'Receive milestone completion event',
    description: 'Inbound webhook your factory MES (or your team) calls when a milestone is marked complete. Atlas advances the milestone, posts the auto-update to the order conversation, and notifies the customer portal.',
    auth: 'bearer',
    exampleResponse: `{
  "data": {
    "received": true,
    "batch_id": "batch-001",
    "milestone_id": "m3",
    "completed_at": "2026-05-08T14:30:00Z",
    "completed_by": "lin.wei@plantA.local"
  }
}`,
  },
]

const DEMO_KEY = 'atlas_demo_KuhlerExampleKey_2026'

export default function DevelopersPage() {
  return (
    <>
      <section className="mx-auto w-full max-w-5xl px-6 pb-12 pt-16 md:pt-24">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
          Developers
        </p>
        <h1 className="mt-3 text-4xl font-semibold leading-[1.05] tracking-tight text-[var(--ink)] md:text-6xl">
          A real API. <span className="italic text-[var(--accent)]">For real integrations.</span>
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[var(--muted)]">
          Atlas exposes a public REST API for ERP sync, BI integration, and factory MES
          connectivity. Bearer auth, JSON over HTTPS, real responses. Try it live with the demo
          key below.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href="#try-it"
            className="inline-flex items-center rounded-md bg-[var(--ink)] px-5 py-3 text-sm font-medium text-[var(--cream)] transition hover:opacity-90"
          >
            Try the API
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-md border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--cream)]"
          >
            Get a real API key →
          </Link>
        </div>
      </section>

      {/* Quickstart */}
      <section id="try-it" className="border-y border-[var(--border)] bg-[var(--surface)]/40">
        <div className="mx-auto w-full max-w-5xl px-6 py-16">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            Quickstart
          </p>
          <h2 className="mt-2 text-3xl font-semibold leading-tight text-[var(--ink)] md:text-4xl">
            Authenticate &amp; <span className="italic text-[var(--accent)]">make your first call.</span>
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <article className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
                1 · Use the demo key
              </p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Public read access for the demo dataset. For your own tenant, contact us.
              </p>
              <pre className="mt-4 overflow-x-auto rounded-md border border-[var(--border)] bg-[var(--cream)] p-4 font-mono text-xs leading-relaxed text-[var(--ink)]">
{`# Demo API key (read-only, shared)
${DEMO_KEY}`}
              </pre>
            </article>

            <article className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
                2 · Make a request
              </p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Authorization header is required on every protected endpoint.
              </p>
              <pre className="mt-4 overflow-x-auto rounded-md border border-[var(--border)] bg-[var(--cream)] p-4 font-mono text-xs leading-relaxed text-[var(--ink)]">
{`curl https://kuhler.com/api/v1/orders \\
  -H "Authorization: Bearer ${DEMO_KEY}"`}
              </pre>
            </article>
          </div>

          <p className="mt-6 text-xs text-[var(--muted)]">
            Both <code className="font-mono">kuhler.com</code> and{' '}
            <code className="font-mono">demo.kuhler.com</code> serve the same API. The data is
            shared (it&rsquo;s the demo dataset).
          </p>
        </div>
      </section>

      {/* Endpoints */}
      <section className="mx-auto w-full max-w-5xl px-6 py-20">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
          Endpoints
        </p>
        <h2 className="mt-2 text-3xl font-semibold leading-tight text-[var(--ink)] md:text-4xl">
          REST endpoints.
        </h2>

        <div className="mt-10 space-y-6">
          {endpoints.map((e) => (
            <EndpointCard key={`${e.method}-${e.path}`} endpoint={e} />
          ))}
        </div>
      </section>

      {/* Webhooks */}
      <section className="border-y border-[var(--border)] bg-[var(--surface)]/40">
        <div className="mx-auto w-full max-w-5xl px-6 py-20">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            Webhooks
          </p>
          <h2 className="mt-2 text-3xl font-semibold leading-tight text-[var(--ink)] md:text-4xl">
            Event hooks <span className="italic text-[var(--accent)]">in and out.</span>
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--muted)]">
            Inbound webhooks let your factory MES (or external systems) push events into Atlas.
            Outbound webhooks deliver Atlas events to your endpoints. Both use the same Bearer
            auth.
          </p>

          <div className="mt-10 space-y-6">
            {webhooks.map((e) => (
              <EndpointCard key={`${e.method}-${e.path}`} endpoint={e} />
            ))}
          </div>
        </div>
      </section>

      {/* Errors */}
      <section className="mx-auto w-full max-w-5xl px-6 py-20">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
          Errors
        </p>
        <h2 className="mt-2 text-3xl font-semibold leading-tight text-[var(--ink)] md:text-4xl">
          Standard HTTP status codes.
        </h2>

        <div className="mt-10 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
          <table className="w-full text-sm">
            <thead className="bg-[var(--cream)] text-left text-xs uppercase tracking-wider text-[var(--muted)]">
              <tr>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Meaning</th>
                <th className="px-4 py-3 font-medium">Body</th>
              </tr>
            </thead>
            <tbody className="font-mono text-xs">
              <ErrorRow code="200" label="OK" body="data + meta" />
              <ErrorRow code="201" label="Created" body="data" />
              <ErrorRow code="400" label="Bad request" body="invalid JSON or shape" />
              <ErrorRow code="401" label="Unauthorized" body="missing / invalid Bearer token" />
              <ErrorRow code="404" label="Not found" body="resource doesn't exist" />
              <ErrorRow code="422" label="Validation failed" body="error.details lists field errors" />
              <ErrorRow code="429" label="Rate limited" body="retry after Retry-After seconds" />
              <ErrorRow code="500" label="Server error" body="we'll get paged" />
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-5xl px-6 py-20">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--ink)] px-8 py-12 text-[var(--cream)] md:px-12 md:py-16">
          <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight md:text-4xl">
            Ready to wire <span className="italic text-[var(--accent)]">your ERP?</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--cream)]/70">
            We have prebuilt connectors for NetSuite and Microsoft Dynamics; for SAP and others
            we use the generic API. Onboarding includes a custom integration session with our
            engineering team.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-md bg-[var(--cream)] px-5 py-3 text-sm font-medium text-[var(--ink)] transition hover:opacity-90"
            >
              Get a real API key
            </Link>
            <Link
              href="/atlas-vs-erp"
              className="inline-flex items-center rounded-md border border-[var(--cream)]/30 px-5 py-3 text-sm font-medium text-[var(--cream)] transition hover:bg-[var(--cream)]/10"
            >
              Atlas + ERP guide →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

function EndpointCard({ endpoint: e }: { endpoint: Endpoint }) {
  const methodTone =
    e.method === 'GET'  ? 'bg-[var(--good)]/15 text-[var(--good)]' :
                          'bg-[var(--accent)]/15 text-[var(--accent)]'
  return (
    <article className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
      <div className="flex flex-wrap items-baseline gap-3">
        <span className={`rounded-md px-2.5 py-0.5 font-mono text-[11px] font-medium ${methodTone}`}>
          {e.method}
        </span>
        <code className="font-mono text-base text-[var(--ink)]">{e.path}</code>
        <span className="ml-auto rounded-full border border-[var(--border)] bg-[var(--cream)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
          {e.auth} auth
        </span>
      </div>
      <h3 className="mt-3 font-display text-lg font-semibold text-[var(--ink)]">{e.summary}</h3>
      <p className="mt-2 text-sm text-[var(--muted)]">{e.description}</p>
      <details className="mt-4">
        <summary className="cursor-pointer font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent)] hover:text-[var(--ink)]">
          Example response
        </summary>
        <pre className="mt-3 overflow-x-auto rounded-md border border-[var(--border)] bg-[var(--cream)] p-4 font-mono text-xs leading-relaxed text-[var(--ink)]">
          {e.exampleResponse}
        </pre>
      </details>
    </article>
  )
}

function ErrorRow({ code, label, body }: { code: string; label: string; body: string }) {
  return (
    <tr className="border-t border-[var(--border)]">
      <td className="px-4 py-3 text-[var(--ink)]">{code}</td>
      <td className="px-4 py-3 text-[var(--ink)]">{label}</td>
      <td className="px-4 py-3 text-[var(--muted)]">{body}</td>
    </tr>
  )
}
