import { headers } from 'next/headers'
import { getBrandFromId } from '@/config/brands'
import { getAllSeoPages } from '@/data/seo-pages'

export async function GET() {
  const h = await headers()
  const host = h.get('host') ?? 'act60review.com'
  const brandId = h.get('x-brand-id') ?? 'act60review'
  const brand = getBrandFromId(brandId)
  const base = `https://${host}`
  const pages = getAllSeoPages(brandId)

  const taxTopics = pages.filter((p) => !p.slug.startsWith('moving-from-') && !p.slug.startsWith('act-60-for-') && !p.slug.startsWith('act-60-tax-advisor-') && !p.slug.includes('-vs-'))
  const relocation = pages.filter((p) => p.slug.startsWith('moving-from-'))
  const professional = pages.filter((p) => p.slug.startsWith('act-60-for-'))
  const localAdvisors = pages.filter((p) => p.slug.startsWith('act-60-tax-advisor-'))
  const comparisons = pages.filter((p) => p.slug.includes('-vs-'))

  const formatSection = (title: string, items: typeof pages) => {
    if (items.length === 0) return ''
    return `## ${title}\n${items.map((p) => `- [${p.title}](${base}/${p.slug}): ${p.metaDescription}`).join('\n')}\n`
  }

  const content = `# ${brand.name}

> ${brand.tagline}

${brand.description}

## About
${brand.name} is an AI-powered tax return review service for Puerto Rico Act 60 decree holders. The service analyzes tax returns against 200+ compliance rules and provides CPA-verified findings reports. Operated by Dis Optimus Capital LLC, San Juan, Puerto Rico.

## Service Tiers
${brand.tiers.map((t) => `- ${t.name} ($${t.price}): ${t.description}`).join('\n')}

## Key Pages
- Homepage: ${base}/
- Pricing: ${base}/#pricing
- Terms of Service: ${base}/terms
- Privacy Policy: ${base}/privacy
- Disclaimer: ${base}/disclaimer

${formatSection('Tax Topics', taxTopics)}
${formatSection('Relocation Guides', relocation)}
${formatSection('Professional Guides', professional)}
${formatSection('Local Tax Advisors', localAdvisors)}
${formatSection('Comparisons', comparisons)}
## Sister Sites
- [Act 60 Review](https://act60review.com): Comprehensive AI-powered tax return review
- [DecreeCheck](https://decreecheck.com): Quick compliance check and instant scoring
- [Act 60 Shield](https://act60shield.com): Audit defense intelligence and preparation

## Contact
- Email: support@${brand.domain}
- Entity: Dis Optimus Capital LLC, San Juan, Puerto Rico

## Optional
- Full content index: ${base}/llms-full.txt
`

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
