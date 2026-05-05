import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const base = 'https://kuhler.com'
  return [
    { url: `${base}`,                lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/product`,        lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/pricing`,        lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/customers`,      lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/about`,          lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contact`,        lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/legal/privacy`,  lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${base}/legal/terms`,    lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: 'https://demo.kuhler.com', lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
  ]
}
