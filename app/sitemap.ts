import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: 'https://kuhler.com',      lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: 'https://www.kuhler.com',  lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: 'https://demo.kuhler.com', lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
  ]
}
