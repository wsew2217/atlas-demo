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
  {
    slug: 'cname-portals-and-the-hostage-problem',
    title: 'Why CNAME-based portals matter (and the hostage problem most platforms create)',
    excerpt:
      'When your customers&rsquo; portals live on your domain, you hold their identity. That&rsquo;s leverage that&rsquo;s bad for them and bad for you long-term.',
    category: 'Industry',
    author: 'Kuhler',
    authorRole: 'Editorial',
    date: '2026-04-30',
    readTime: '5 min read',
    body: [
      { type: 'paragraph', content: 'There&rsquo;s a hidden choice in every B2B platform that serves end-customers: where does the end-customer&rsquo;s portal live? On your subdomain (manufacturer.io/customer-name), or on theirs (portal.customer.com)?' },
      { type: 'paragraph', content: 'It looks small. It isn&rsquo;t. The choice cascades into trust, leverage, and renewals.' },
      { type: 'heading', content: 'The hostage problem' },
      { type: 'paragraph', content: 'When your customer&rsquo;s portal lives on your subdomain, you hold their identity. They can&rsquo;t leave without their own customers noticing the URL change. They can&rsquo;t move to a competitor without breaking links and bookmarks. You have leverage at every renewal — and they know it.' },
      { type: 'paragraph', content: 'Some platforms exploit this. Renewal prices creep up. Feature gates appear. Migration paths get mysteriously complex. The platform&rsquo;s incentive isn&rsquo;t to delight you; it&rsquo;s to make leaving expensive.' },
      { type: 'pullquote', content: 'White-labeling under the customer&rsquo;s domain isn&rsquo;t a feature. It&rsquo;s a posture.' },
      { type: 'heading', content: 'Why CNAME flips the dynamic' },
      { type: 'paragraph', content: 'When the portal lives at portal.customer.com, the customer owns the URL. They&rsquo;ve told their own customers to bookmark it. They control the DNS record. Pulling the CNAME deactivates the portal in seconds — no one else needs to be involved.' },
      { type: 'paragraph', content: 'That&rsquo;s scary for vendors who built their business on lock-in. It&rsquo;s liberating for vendors who plan to earn renewals on the merits.' },
      { type: 'heading', content: 'What it takes to do this right' },
      { type: 'list', content: [
        'Auto-issued SSL via Let&rsquo;s Encrypt — manual cert management at scale doesn&rsquo;t work',
        'Real per-tenant branding — color, logo, contact info isolated per customer',
        'Postgres row-level security so one customer never sees another&rsquo;s data',
        'API + export — the customer can pull their data on the way out',
      ]},
      { type: 'paragraph', content: 'It also takes a posture decision: that you&rsquo;re willing to make leaving easy. That decision compounds over years. Customers who feel free to leave tend not to.' },
    ],
  },
  {
    slug: 'hidden-cost-of-email-po-intake',
    title: 'The hidden cost of email-based PO intake',
    excerpt:
      'PDF attachments arrive. Someone re-keys them into a system. The errors get caught (or don&rsquo;t) on the floor. Here&rsquo;s the cost most operators don&rsquo;t measure.',
    category: 'Operations',
    author: 'Kuhler Operations Team',
    authorRole: 'Operations',
    date: '2026-04-15',
    readTime: '6 min read',
    body: [
      { type: 'paragraph', content: 'Most apparel manufacturers we talk to have the same intake workflow: customer emails a PDF PO. Someone in operations opens it, eyeballs the line items, and types them into the production system. They take a coffee break. They make a typo on size XL. The factory ships 600 mediums.' },
      { type: 'paragraph', content: 'Most operators know this is bad. Few have measured how bad.' },
      { type: 'heading', content: 'The visible costs' },
      { type: 'list', content: [
        '15–30 minutes of intake labor per PO. At 200 POs/quarter, that&rsquo;s 50–100 hours per quarter just typing.',
        '2–5% line-item error rate on manual entry. Wrong sizes, wrong quantities, wrong colors.',
        '4–6 hours per error to remediate — production halts, rework, customer apology, fabric reorder.',
      ]},
      { type: 'pullquote', content: 'The intake step costs more than most operators realize. The errors cost more than that.' },
      { type: 'heading', content: 'The hidden costs' },
      { type: 'paragraph', content: 'The labor and errors are measurable. The hidden costs are bigger.' },
      { type: 'list', content: [
        '<strong>Customer trust:</strong> A wrong-size shipment to a major buyer can cost the relationship — measured in next-season POs that don&rsquo;t come.',
        '<strong>Cycle time:</strong> Manual intake adds 1–2 days to the time-from-PO-to-production-start. That&rsquo;s margin you give back to the customer who needs it sooner.',
        '<strong>Cognitive load:</strong> The intake person becomes a bottleneck. They can&rsquo;t take vacation. They can&rsquo;t train someone in a week. They are a single point of failure.',
        '<strong>Visibility:</strong> If the PO isn&rsquo;t structured, you can&rsquo;t answer "how many units of style X are in flight right now?" without reading PDFs.',
      ]},
      { type: 'heading', content: 'What automated intake looks like' },
      { type: 'paragraph', content: 'A modern PO intake pipeline: email arrives → PDF parsed by an LLM-trained extractor → line items, ship-to, dates, GTINs extracted into a structured PO → operations team reviews + approves rather than retyping → goes into production. The intake person becomes a reviewer; throughput goes up 4–10x; errors drop into the floor.' },
      { type: 'paragraph', content: 'Atlas does this with Claude. Customer-specific extraction rules per buyer (because every buyer formats their POs differently), inline review queue, and a feedback loop where corrections improve the extractor over time. The first PO from a new customer takes minutes to template; every subsequent one takes seconds.' },
    ],
  },
  {
    slug: 'milestone-schedules-that-predict-ship-dates',
    title: 'How to set milestone schedules that actually predict ship dates',
    excerpt:
      'Most milestone schedules are wishful thinking that gets discovered to be wrong two weeks before ship. Here&rsquo;s how to set ones that hold up.',
    category: 'Operations',
    author: 'Kuhler Operations Team',
    authorRole: 'Operations',
    date: '2026-04-02',
    readTime: '8 min read',
    body: [
      { type: 'paragraph', content: 'A milestone schedule is a contract with reality. Most apparel ones aren&rsquo;t — they&rsquo;re a salesperson&rsquo;s commitment with a factory&rsquo;s nodding. Real schedules need to predict ship dates, and most don&rsquo;t.' },
      { type: 'heading', content: 'Why most milestone schedules fail' },
      { type: 'list', content: [
        'They&rsquo;re back-cast from the customer&rsquo;s requested ship date, not forward-cast from material readiness',
        'Buffers are added at the end (right before ship) instead of distributed across the riskiest steps',
        'No measurement of past variance per step — same factory, same product, no learning',
        'Status is binary (on/off track) instead of probabilistic (90% / 70% / 50% likely)',
      ]},
      { type: 'pullquote', content: 'A schedule you can&rsquo;t miss isn&rsquo;t a schedule. It&rsquo;s a wish.' },
      { type: 'heading', content: 'The five-milestone backbone' },
      { type: 'paragraph', content: 'For most cut-and-sew apparel, five milestones cover 95% of the risk:' },
      { type: 'list', content: [
        '<strong>Materials sourced</strong> — fabric, trim, accessories all confirmed and en route to factory',
        '<strong>Cut & sew started</strong> — production has begun on the first piece',
        '<strong>Production midpoint</strong> — half the units off the line, QC inline, no fabric or process issues found',
        '<strong>QC pass</strong> — inspection complete, defects below threshold, ready to pack',
        '<strong>Pack & ship</strong> — packed by SKU, paperwork done, on the truck',
      ]},
      { type: 'paragraph', content: 'Each milestone has a target date AND a confidence level (high / medium / low). When a milestone slips, the schedule updates automatically — not by moving the ship date, but by re-estimating downstream confidence based on this slip&rsquo;s pattern.' },
      { type: 'heading', content: 'The 7-3-1 buffer rule' },
      { type: 'paragraph', content: 'Distribute schedule buffer across the three riskiest steps, not at the end:' },
      { type: 'list', content: [
        '<strong>7 days</strong> at materials sourced — international shipping, fabric mills, trim suppliers all have variance',
        '<strong>3 days</strong> at production midpoint — defect discovery, line speed adjustments, second-batch issues',
        '<strong>1 day</strong> at pack & ship — paperwork, customs, last-minute label changes',
      ]},
      { type: 'paragraph', content: 'Total: 11 days of buffer, distributed where slips actually happen. Most schedules put 14 days at the end and discover the slip is unrecoverable on day 13.' },
      { type: 'heading', content: 'Measure the variance' },
      { type: 'paragraph', content: 'Atlas tracks every milestone date — target, actual, slip days — by factory and by product family. After 10 batches you have a real distribution per step. The next schedule for that factory + product can be set against historical performance, not against the salesperson&rsquo;s optimism.' },
      { type: 'paragraph', content: 'After 50 batches, you have factory-specific predictability scores. You can quote ship dates with confidence intervals. You can spot the factory that&rsquo;s slipping ships before the customer does. That&rsquo;s the whole game.' },
    ],
  },
]

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export function listArticles(): Article[] {
  return [...articles].sort((a, b) => b.date.localeCompare(a.date))
}
