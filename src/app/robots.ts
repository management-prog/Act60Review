import type { MetadataRoute } from 'next'
import { headers } from 'next/headers'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const h = await headers()
  const host = h.get('host') ?? 'act60review.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/upload'],
      },
    ],
    sitemap: `https://${host}/sitemap.xml`,
  }
}
