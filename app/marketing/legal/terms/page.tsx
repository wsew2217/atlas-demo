export const metadata = {
  title: 'Terms of Service',
  description: 'Terms governing your use of the Kuhler platform.',
}

const LAST_UPDATED = '2026-05-05'

export default function TermsPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-6 pb-20 pt-16 md:pt-24">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
        Legal
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-[var(--ink)] md:text-5xl">
        Terms of Service
      </h1>
      <p className="mt-3 font-mono text-xs text-[var(--muted)]">
        Last updated: {LAST_UPDATED}
      </p>

      <div className="prose mt-10 space-y-6 text-[var(--muted)] [&_h2]:font-display [&_h2]:text-[var(--ink)] [&_h2]:font-semibold [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:leading-relaxed [&_a]:text-[var(--ink)] [&_a]:underline-offset-2 [&_a]:hover:underline [&_strong]:text-[var(--ink)] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5">
        <p className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-4 text-sm">
          <strong>Plain-language summary.</strong> Use Atlas for legitimate business operations.
          Don&rsquo;t do illegal things on it. We&rsquo;ll keep it running and back you up.
          Either side can end the relationship — we&rsquo;ll send you your data on the way out.
        </p>

        <h2>1. Agreement</h2>
        <p>
          By accessing or using Kuhler (kuhler.com, demo.kuhler.com, the Atlas platform, and any
          customer portals deployed via Kuhler) you agree to these Terms. If you&rsquo;re accepting
          on behalf of an organization, you represent that you have authority to bind that
          organization.
        </p>

        <h2>2. The service</h2>
        <p>
          Kuhler provides Atlas, a multi-tenant operational platform for apparel manufacturers,
          and white-labeled customer portals delivered under tenant-controlled domains. Specific
          capabilities, limits, and pricing are described in your order form or referenced on
          our pricing page.
        </p>

        <h2>3. Your responsibilities</h2>
        <ul>
          <li>Keep your credentials private. You&rsquo;re responsible for activity under your account.</li>
          <li>Don&rsquo;t use Atlas for illegal purposes, infringement, or abuse of others.</li>
          <li>Don&rsquo;t reverse-engineer, resell, or sublicense the platform without written agreement.</li>
          <li>You&rsquo;re responsible for the data you and your tenant users put into the platform.</li>
        </ul>

        <h2>4. Our responsibilities</h2>
        <ul>
          <li>Operate the platform with commercially reasonable security and uptime.</li>
          <li>Notify you of incidents that affect your data within 72 hours of confirmation.</li>
          <li>Maintain a current Privacy Policy describing data handling.</li>
          <li>Provide support per your tier&rsquo;s SLA.</li>
        </ul>

        <h2>5. Pricing and payment</h2>
        <p>
          Pricing is set out in your order form. Invoices are issued monthly or annually depending
          on tier. Late payments may suspend service after written notice; we&rsquo;ll always tell
          you before turning anything off.
        </p>

        <h2>6. Customer data</h2>
        <p>
          You retain ownership of all data you and your tenants put into Atlas. We hold a limited
          license to operate the platform on your behalf. You can export your data at any time.
        </p>

        <h2>7. Termination</h2>
        <p>
          Either side can terminate with 30 days&rsquo; written notice. Termination triggers an
          export window during which we&rsquo;ll deliver a Postgres dump of your tenant data.
          After the export window we delete the data per our Privacy Policy. Pulling your CNAME
          immediately deactivates customer portals; data is retained until the export is complete.
        </p>

        <h2>8. Disclaimers</h2>
        <p>
          The service is provided &ldquo;as is.&rdquo; We don&rsquo;t guarantee uninterrupted
          operation, fitness for a specific purpose, or absence of bugs. We&rsquo;ll fix things;
          we won&rsquo;t pretend they don&rsquo;t happen.
        </p>

        <h2>9. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, our total liability under these Terms is limited
          to the amount you paid us in the twelve months preceding the claim. Neither side is
          liable for indirect, consequential, or punitive damages.
        </p>

        <h2>10. Changes</h2>
        <p>
          We&rsquo;ll update these Terms as the platform evolves. Material changes are announced
          to administrators by email; continued use after the change date constitutes acceptance.
        </p>

        <h2>11. Governing law</h2>
        <p>
          These Terms are governed by the laws of the jurisdiction where Kuhler is incorporated.
          Disputes go to the courts of that jurisdiction unless we mutually agree to arbitration.
        </p>

        <h2>12. Contact</h2>
        <p>
          Questions or notice required by these Terms:{' '}
          <a href="mailto:hello@kuhler.com">hello@kuhler.com</a>.
        </p>
      </div>
    </article>
  )
}
