export interface CaseStudyBlock {
  type: 'paragraph' | 'heading' | 'pullquote' | 'list'
  content: string | string[]
}

export interface CaseStudy {
  slug: string
  customer: string
  customerType: string
  tagline: string
  excerpt: string
  outcome: string
  tier: 'Foundation' | 'Operator' | 'Scale' | 'Enterprise'
  industry: string
  /** Composite/anonymized story drawn from early-access conversations. Real, named customers (e.g. TRG) should set false. */
  composite?: boolean
  /** Real customer URL — only set on named, non-composite case studies. */
  customerUrl?: string
  /** Person we can attribute on-the-record (named customers only). */
  attributedTo?: { name: string; role: string }
  /** Surface this study first on the index. */
  featured?: boolean
  body: CaseStudyBlock[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'trg-apparel',
    customer: 'TRG Apparel',
    customerType: 'Apparel manufacturer',
    tagline: 'Six trackers, ten years, gone in three months.',
    excerpt:
      'TRG Apparel — a multi-country apparel manufacturer — replaced six legacy trackers built up over a decade with a single Atlas tenant. Their customers see status under their own brand. TRG sees operations on one screen.',
    outcome: '6 trackers → 1 platform · branded customer portals · daily “where’s my PO?” calls eliminated',
    tier: 'Operator',
    industry: 'Cut-and-sew apparel · multi-country',
    composite: false,
    customerUrl: 'https://trgapparel.com',
    attributedTo: { name: 'Robert', role: 'Owner, TRG Apparel' },
    featured: true,
    body: [
      { type: 'heading', content: 'The situation' },
      { type: 'paragraph', content: 'Over ten years of growth, TRG had built up six different ways to track the same thing — a purchase order moving through production. Two spreadsheets for two of their largest customers. A homegrown tool for legacy accounts. A weekly status doc emailed out on Mondays. WhatsApp threads with each factory partner. A paper folder system for finished-goods inspections. None of them talked to each other.' },
      { type: 'paragraph', content: 'Every Monday, someone on the TRG team spent half a day stitching the six sources together into a single status email. Customers didn’t have direct visibility — they had to ask. The “where’s my PO?” calls came in every day.' },
      { type: 'heading', content: 'What we did' },
      { type: 'list', content: [
        'Migrated all six legacy trackers into one Atlas tenant',
        'Stood up branded customer portals — one per customer — under each customer’s own domain',
        'Connected TRG’s factory partners in China and Cambodia with mobile-friendly milestone-tracking accounts',
        'Replaced the Monday status email with a portal customers open whenever they want',
        'Kept TRG’s existing PO numbering and customer naming conventions — Atlas adapted to the operation, not the other way around',
      ]},
      { type: 'pullquote', content: 'Atlas replaced six trackers we’d built over a decade and made the daily “where’s my PO?” calls go away. Three months in, our customers see status under their <em>own brand</em>. We see operations on <em>one screen</em>. Won’t go back.' },
      { type: 'heading', content: 'The outcome' },
      { type: 'paragraph', content: 'Within three months, TRG retired all six legacy trackers. The Monday status compilation dropped from a half-day exercise to a fifteen-minute review of exceptions. Customer “where’s my PO?” calls effectively stopped — customers self-serve through their portals now, and the conversations that do happen are about the things that actually need a conversation: rerouting, expediting, change orders.' },
      { type: 'paragraph', content: 'TRG used the branded portal as part of their pitch on new accounts in the following quarter. The point isn’t just that operations got cleaner — it’s that the customer experience itself became a differentiator. Their customers see TRG’s service through TRG’s brand, on TRG’s domain.' },
      { type: 'heading', content: 'What’s next' },
      { type: 'paragraph', content: 'TRG is rolling Atlas out to additional customer portals through 2026, and is the design partner for several Atlas features in development — including deeper analytics, factory-side capacity dashboards, and customer-side approval workflows.' },
    ],
  },
  {
    slug: 'apparel-broker-onboarding-portals-fast',
    customer: 'Mid-size apparel broker',
    customerType: 'Apparel broker',
    tagline: 'From spreadsheets to six branded portals in six weeks.',
    excerpt:
      'A broker serving six brands consolidated three tracking systems into Atlas, gave each brand its own portal under their own domain, and cut weekly status calls by 80%.',
    outcome: '6 branded portals · 80% fewer status calls',
    tier: 'Operator',
    industry: 'Performance & athletic apparel',
    composite: true,
    body: [
      { type: 'heading', content: 'The situation' },
      { type: 'paragraph', content: 'Before Atlas, this broker tracked production across three different systems: an Excel sheet for one big brand, a shared Google Doc for two mid-tier brands, and a homegrown PHP app for the rest. The principal spent two hours every Monday compiling a weekly status update by hand.' },
      { type: 'paragraph', content: 'Each brand wanted a portal. None of them wanted to use the broker&rsquo;s "ManufacturerCo Tracker" — they wanted something that felt like their own.' },
      { type: 'heading', content: 'What we did' },
      { type: 'list', content: [
        'Migrated the existing three trackers into a single Atlas tenant',
        'Stood up six branded portals — one per brand — each under the brand&rsquo;s own domain',
        'Trained two of the broker&rsquo;s team on the operator side over two afternoons',
        'Trained one champion at each customer over a 30-minute call',
      ]},
      { type: 'pullquote', content: 'Atlas replaced 14 Outlook tabs and a shared spreadsheet. The portal piece is the hook for them — but the operator side is the hook for us.' },
      { type: 'heading', content: 'The outcome' },
      { type: 'paragraph', content: 'Six weeks after kickoff, every brand had a live portal under their own domain. The principal&rsquo;s Monday status compilation went from two hours to fifteen minutes (export from Atlas, paste into the email template). Status pings from buyers dropped roughly 80% — they self-serve now.' },
      { type: 'paragraph', content: 'The broker won two new brand customers in the following quarter, citing the branded portal as a differentiator on the sales pitch.' },
    ],
  },
  {
    slug: 'manufacturer-multi-country-consolidation',
    customer: 'Multi-country apparel manufacturer',
    customerType: 'Cut-and-sew manufacturer',
    tagline: 'One platform across two countries, three factories.',
    excerpt:
      'A manufacturer running cut-and-sew in China and Cambodia consolidated three factory tracking systems into Atlas, with mobile-friendly UX for factory users.',
    outcome: '3 factories · 1 platform · mobile factory UX',
    tier: 'Scale',
    industry: 'Cut-and-sew apparel',
    composite: true,
    body: [
      { type: 'heading', content: 'The situation' },
      { type: 'paragraph', content: 'Three factories. Two countries. Three different tracking systems. The operations director spent every morning chasing status updates across WhatsApp, WeChat, and a custom-built dashboard that nobody on the factory floor used because it was built for desktops.' },
      { type: 'paragraph', content: 'Buyers wanted live status. Factories wanted a way to log milestones from the floor without going back to a desk. Operations wanted one screen instead of three.' },
      { type: 'heading', content: 'What we did' },
      { type: 'list', content: [
        'Migrated all three factory trackers into one Atlas tenant',
        'Built mobile-first factory user accounts so operators could mark milestones from their phones on the floor',
        'Connected the operations dashboard to all three factories with consolidated KPIs',
        'Set up automated buyer notifications when milestones complete',
      ]},
      { type: 'pullquote', content: 'My factory users mark a milestone done from the floor. The buyer&rsquo;s portal updates in seconds. I never see the email anymore.' },
      { type: 'heading', content: 'The outcome' },
      { type: 'paragraph', content: 'Within the first month, the operations director&rsquo;s morning status routine dropped from two hours to fifteen minutes. Factory users adopted the mobile interface immediately — measured by the number of milestones marked complete from mobile devices, which hit 92% by week three.' },
      { type: 'paragraph', content: 'Customer status pings dropped by approximately 70%. The remaining pings tend to be about complex changes (rerouting, expediting) that aren&rsquo;t about basic status — exactly the conversations the operations team should be having.' },
    ],
  },
  {
    slug: 'workwear-supplier-pdf-import',
    customer: 'Workwear and uniforms supplier',
    customerType: 'Workwear supplier',
    tagline: 'POs out of email, POs into a system.',
    excerpt:
      'A workwear supplier processing 200+ POs per quarter automated PDF intake with Atlas, eliminating manual re-keying and the errors that came with it.',
    outcome: '200 POs/quarter · zero manual re-keying',
    tier: 'Operator',
    industry: 'Workwear and uniforms',
    composite: true,
    body: [
      { type: 'heading', content: 'The situation' },
      { type: 'paragraph', content: 'School districts. Athletic programs. Corporate uniform programs. Each one sent POs as PDF attachments in 12 different formats. The intake team spent four hours per day re-keying line items into the production system. Errors at the line-item level cost real money — wrong sizes, wrong quantities, wrong colors.' },
      { type: 'heading', content: 'What we did' },
      { type: 'list', content: [
        'Wired Atlas&rsquo;s PDF parsing to the company&rsquo;s shared inbox',
        'Built customer-specific extraction rules for the top 12 PO formats',
        'Set up a review queue where the intake team verifies extraction before pushing to production',
        'Connected the verified POs to the existing production scheduling system via API',
      ]},
      { type: 'pullquote', content: 'The intake team became reviewers instead of typists. Same headcount, four times the throughput.' },
      { type: 'heading', content: 'The outcome' },
      { type: 'paragraph', content: 'Manual re-keying went to zero on the top 12 formats, which represented 87% of inbound volume. Line-item error rate dropped from approximately 4% to under 0.5% on extracted POs. The intake team scaled from handling 50 POs per quarter to handling 200+ without adding headcount.' },
    ],
  },
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug)
}

export function listCaseStudies(): CaseStudy[] {
  return caseStudies
}
