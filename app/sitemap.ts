import type { MetadataRoute } from 'next'
import { listArticles } from '@/lib/articles'
import { listCaseStudies } from '@/lib/case-studies'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const base = 'https://kuhler.com'

  const articleUrls = listArticles().map((a) => ({
    url: `${base}/resources/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const caseStudyUrls = listCaseStudies().map((c) => ({
    url: `${base}/customers/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    { url: `${base}`,                lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/product`,        lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/pricing`,        lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/customers`,      lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/atlas-vs-erp`,   lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/developers`,     lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/resources`,      lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/about`,          lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contact`,        lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/waitlist`,       lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${base}/legal/privacy`,  lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${base}/legal/terms`,    lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: 'https://demo.kuhler.com', lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    ...articleUrls,
    ...caseStudyUrls,
  ]
}
