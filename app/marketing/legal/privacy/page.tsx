export const metadata = {
  title: 'Privacy Policy',
  description: 'How Kuhler collects, uses, and protects information.',
}

const LAST_UPDATED = '2026-05-05'

export default function PrivacyPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-6 pb-20 pt-16 md:pt-24">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
        Legal
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-[var(--ink)] md:text-5xl">
        Privacy Policy
      </h1>
      <p className="mt-3 font-mono text-xs text-[var(--muted)]">
        Last updated: {LAST_UPDATED}
      </p>

      <div className="prose mt-10 space-y-6 text-[var(--muted)] [&_h2]:font-display [&_h2]:text-[var(--ink)] [&_h2]:font-semibold [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:leading-relaxed [&_a]:text-[var(--ink)] [&_a]:underline-offset-2 [&_a]:hover:underline [&_strong]:text-[var(--ink)] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5">
        <p className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-4 text-sm">
          <strong>Plain-language summary.</strong> We collect the minimum data we need to run the
          platform. We don&rsquo;t sell your data. We don&rsquo;t share it with advertisers. You
          can export everything we have on you, and pulling your CNAME deactivates your portal.
          The legal-ese below is the long form.
        </p>

        <h2>Who we are</h2>
        <p>
          &ldquo;Kuhler,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; and &ldquo;our&rdquo; refer to
          the operator of kuhler.com and the Atlas platform. Contact:{' '}
          <a href="mailto:hello@kuhler.com">hello@kuhler.com</a>.
        </p>

        <h2>What we collect</h2>
        <ul>
          <li>
            <strong>Account information.</strong> Name, email, organization, role — whatever you
            give us when you contact us, sign up, or are added by a tenant administrator.
          </li>
          <li>
            <strong>Operational data.</strong> POs, batches, milestones, line items, messages,
            attachments, and similar records you and your customers create on the platform.
          </li>
          <li>
            <strong>Usage data.</strong> Pages visited, feature interactions, error logs.
            We use this to improve the product. We don&rsquo;t track you across other sites.
          </li>
          <li>
            <strong>Cookies.</strong> Strictly functional (session, demo state) and basic
            analytics (Vercel Analytics). No third-party advertising cookies.
          </li>
        </ul>

        <h2>How we use it</h2>
        <ul>
          <li>To deliver the service you signed up for.</li>
          <li>To support you when you reach out.</li>
          <li>To improve the product based on aggregated usage patterns.</li>
          <li>To send service-related emails (security, billing, outages). No marketing spam.</li>
        </ul>

        <h2>How we share it</h2>
        <p>
          We share data only with vendors who help us run the platform — Supabase (database),
          Vercel (hosting), Resend (transactional email), Clerk (authentication). Each is bound by
          its own data processing agreement. We do not sell or share data with advertisers.
        </p>

        <h2>Where we store it</h2>
        <p>
          Customer data is stored in Supabase (PostgreSQL) with row-level security enforcing
          tenant isolation. Hosting and serverless functions run on Vercel. Default region is
          North America; enterprise tier customers can request EU regions.
        </p>

        <h2>Your rights</h2>
        <ul>
          <li><strong>Export.</strong> Request a full Postgres dump of your tenant&rsquo;s data at any time.</li>
          <li><strong>Delete.</strong> Pull your CNAME and request deletion. We delete within 30 days.</li>
          <li><strong>Correct.</strong> You and your tenant administrators can edit any record directly.</li>
          <li><strong>Object.</strong> Email us. We respond.</li>
        </ul>

        <h2>Security</h2>
        <p>
          HTTPS everywhere via auto-issued Let&rsquo;s Encrypt certificates. Postgres is encrypted
          at rest and in transit. Authentication via Clerk with multi-factor support. Row-level
          security policies are enforced at the database layer for every tenant-scoped table.
        </p>

        <h2>Children</h2>
        <p>
          Kuhler is a B2B platform. We do not knowingly collect data from children under 13.
        </p>

        <h2>Changes</h2>
        <p>
          We&rsquo;ll update this policy as the product evolves. Material changes are announced by
          email to administrators. The date at the top of this page reflects the last update.
        </p>

        <h2>Contact</h2>
        <p>
          Questions, requests, or concerns:{' '}
          <a href="mailto:hello@kuhler.com">hello@kuhler.com</a>.
        </p>
      </div>
    </article>
  )
}
