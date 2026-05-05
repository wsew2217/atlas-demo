export interface ArticleBlock {
  type: 'paragraph' | 'heading' | 'pullquote' | 'list'
  content: string | string[]
}

export interface Article {
  slug: string
  title: string
  excerpt: string
  category: 'Operations' | 'Industry' | 'Technical' | 'Company'
  author: string
  authorRole: string
  date: string
  readTime: string
  body: ArticleBlock[]
}

export const articles: Article[] = [
  {
    slug: 'onboarding-customer-portal-24-hours',
    title: 'How to onboard a new customer portal in under 24 hours',
    excerpt:
      'A step-by-step playbook for going from "we want a portal under our brand" to "live and operational" in a single business day.',
    category: 'Operations',
    author: 'Kuhler Operations Team',
    authorRole: 'Operations',
    date: '2026-04-22',
    readTime: '6 min read',
    body: [
      { type: 'paragraph', content: 'Customer portals used to be a six-week project — a custom subdomain, a copy of your software stamped with their logo, an SSL cert, training, the whole exercise. Atlas runs differently. The actual mechanics of standing up a new customer portal take about an hour of work spread across one business day, and most of that hour is waiting on DNS to propagate.' },
      { type: 'heading', content: 'The shape of the work' },
      { type: 'paragraph', content: 'Each new customer portal needs three things: a domain to live under, a brand identity to render in, and a tenant row in your database that maps the two together. Atlas handles all three through the same control panel — your customer brings their domain, you add the brand info, the platform issues SSL automatically.' },
      { type: 'list', content: [
        'Step 1 — Customer CNAMEs their domain at us. Two-minute job at their registrar.',
        'Step 2 — You add a tenants table row mapping their domain to their brand profile (color, logo, contact).',
        'Step 3 — Vercel auto-issues SSL via Let&rsquo;s Encrypt. Usually within an hour.',
        'Step 4 — Their portal goes live, branded as them.',
      ]},
      { type: 'pullquote', content: 'The bottleneck isn&rsquo;t the platform. It&rsquo;s the customer&rsquo;s registrar.' },
      { type: 'heading', content: 'Why this matters for your sales motion' },
      { type: 'paragraph', content: 'When a prospect asks "how long does setup take?" the honest answer used to be weeks. With Atlas it&rsquo;s a business day — you can demo their actual portal during the sales call. That changes the close rate.' },
      { type: 'paragraph', content: 'More importantly, the speed compounds. Operators who used to onboard one customer per quarter can onboard one per week. The platform stops being the constraint; your sales pipeline does.' },
    ],
  },
  {
    slug: 'case-for-white-labeling',
    title: 'The case for white-labeling your customer portals',
    excerpt:
      'Why running each customer&rsquo;s portal under their own domain — not yours — is the difference between being a vendor and being infrastructure.',
    category: 'Industry',
    author: 'Kuhler',
    authorRole: 'Editorial',
    date: '2026-04-08',
    readTime: '5 min read',
    body: [
      { type: 'paragraph', content: 'Every apparel manufacturer eventually faces the same question: do customer-facing tools live under your brand, or theirs? Most platforms default to the vendor brand because it&rsquo;s easier to build and easier to upsell. Atlas defaults to the customer brand because it&rsquo;s the right answer.' },
      { type: 'heading', content: 'What the customer sees matters' },
      { type: 'paragraph', content: 'When your customer logs into a portal called "ManufacturerCo Portal" they see your brand. When they log into a portal at their own domain, branded as them, they see themselves. The first treats the customer as an end-user of your software. The second treats them as the principal of their own operation.' },
      { type: 'pullquote', content: 'White-labeling isn&rsquo;t a feature. It&rsquo;s a posture.' },
      { type: 'heading', content: 'No hostage situations' },
      { type: 'paragraph', content: 'When a customer&rsquo;s portal lives under your domain, you hold their identity. They can&rsquo;t leave without their customers noticing the URL change. That&rsquo;s leverage you can use to extract higher renewal prices or block competitive bids.' },
      { type: 'paragraph', content: 'When the portal lives under their domain, they can leave whenever they want. They pull the CNAME, the portal goes dark, life moves on. You earn renewals by being good at your job — not by holding their identity hostage.' },
      { type: 'heading', content: 'The infrastructure framing' },
      { type: 'paragraph', content: 'Stripe doesn&rsquo;t put its logo on the checkout page of every site that uses it. AWS doesn&rsquo;t require companies to put "Powered by AWS" in their app navigation. Real infrastructure stays out of the way. Atlas is infrastructure for apparel operations — your customers run on it; they don&rsquo;t see it.' },
    ],
  },
  {
    slug: 'atlas-vs-erp-when-to-use-which',
    title: 'Atlas vs ERP: when to use which',
    excerpt:
      'Atlas isn&rsquo;t replacing your ERP. It&rsquo;s replacing the email chains and spreadsheet trackers that surround it. Here&rsquo;s how to think about the boundary.',
    category: 'Technical',
    author: 'Kuhler Engineering',
    authorRole: 'Engineering',
    date: '2026-03-26',
    readTime: '7 min read',
    body: [
      { type: 'paragraph', content: 'A common question on first calls: "we already have an ERP — do we need Atlas?" The short answer is yes, because they solve different problems. The longer answer is below.' },
      { type: 'heading', content: 'What ERPs do well' },
      { type: 'paragraph', content: 'ERPs are systems of record. They store the canonical version of who owes whom what, when goods physically moved, and what the inventory balance is at month-end. They&rsquo;re built for accountants, controllers, and supply chain planners.' },
      { type: 'heading', content: 'What ERPs do badly' },
      { type: 'paragraph', content: 'ERPs are not built for the people running production day-to-day. The factory user marking a milestone complete doesn&rsquo;t want to log into NetSuite. The buyer asking "where&rsquo;s my PO?" doesn&rsquo;t want a SAP login. The operator coordinating cut-and-sew across two plants doesn&rsquo;t want to wait for the IT team to build a custom report.' },
      { type: 'pullquote', content: 'The ERP is the source of truth. Atlas is where the work happens.' },
      { type: 'heading', content: 'The clean handoff' },
      { type: 'paragraph', content: 'The pattern that works: Atlas handles operational workflow (POs, batches, milestones, customer communication, factory floor). It writes the structured outcomes back to the ERP via API or scheduled sync — completed batches, shipped quantities, milestone completion timestamps. Your accountants see what they need in the ERP. Your operators see what they need in Atlas. Nobody fights about which screen to use.' },
      { type: 'list', content: [
        'Atlas owns: PO intake, batch allocation, milestone tracking, customer communication, factory UX',
        'ERP owns: financial books, inventory of record, accounts receivable/payable, month-end close',
        'They talk: structured API sync after milestones change',
      ]},
      { type: 'paragraph', content: 'If your ERP can&rsquo;t accept inbound API calls, we have CSV export to fall back on. If you don&rsquo;t have an ERP yet, Atlas can carry the operational load while you decide which system you want for the books.' },
    ],
  },
]

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export function listArticles(): Article[] {
  return [...articles].sort((a, b) => b.date.localeCompare(a.date))
}
