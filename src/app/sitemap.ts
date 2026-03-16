import type { MetadataRoute } from 'next'
import { headers } from 'next/headers'
import { getAllSlugs } from '@/data/seo-pages'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const h = await headers()
  const host = h.get('host') ?? 'act60review.com'
  const base = `https://${host}`

  const staticPages = [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${base}/disclaimer`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
  ]

  const seoPages = getAllSlugs().map((slug) => ({
    url: `${base}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...seoPages]
}
