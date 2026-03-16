import { headers } from 'next/headers'
import { getBrandFromId } from '@/config/brands'
import { getAllSlugs } from '@/data/seo-pages'

export async function GET() {
  const h = await headers()
  const host = h.get('host') ?? 'act60review.com'
  const brandId = h.get('x-brand-id') ?? 'act60review'
  const brand = getBrandFromId(brandId)
  const base = `https://${host}`
  const slugs = getAllSlugs()

  const content = `# ${brand.name}

> ${brand.tagline}

${brand.description}

## About
${brand.name} is an AI-powered tax return review service for Puerto Rico Act 60 decree holders. The service analyzes tax returns against 200+ compliance rules and provides CPA-verified findings reports. Operated by Dis Optimus Capital LLC.

## Key Pages
- Homepage: ${base}/
- Pricing: ${base}/#pricing
- Terms of Service: ${base}/terms
- Privacy Policy: ${base}/privacy
- Disclaimer: ${base}/disclaimer

## Topics Covered
${slugs.slice(0, 30).map((s) => `- ${base}/${s}`).join('\n')}

## Contact
- Email: support@act60review.com
- Entity: Dis Optimus Capital LLC, San Juan, Puerto Rico
`

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
