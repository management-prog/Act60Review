import type { MetadataRoute } from 'next'
import { headers } from 'next/headers'
import { getBrandFromId } from '@/config/brands'
import { getAllSlugs } from '@/data/seo-pages'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const h = await headers()
  const brandId = h.get('x-brand-id') ?? 'act60review'
  const brand = getBrandFromId(brandId)
  const base = `https://${brand.domain}`

  const staticPages = [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${base}/disclaimer`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
  ]

  const seoPages = getAllSlugs(brandId).map((slug) => ({
    url: `${base}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...seoPages]
}
