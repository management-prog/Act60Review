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

  const sections = pages.map((p) => {
    const faqText = p.faqItems
      .map((faq) => `Q: ${faq.question}\nA: ${faq.answer}`)
      .join('\n\n')

    const contentText = p.sections
      .map((s) => `### ${s.heading}\n${s.content}`)
      .join('\n\n')

    return `## ${p.title}
URL: ${base}/${p.slug}
${p.metaDescription}

${contentText}

${faqText ? `### FAQ\n${faqText}` : ''}
---`
  })

  const content = `# ${brand.name} — Full Content Index

> ${brand.tagline}

Total pages: ${pages.length}
Generated: ${new Date().toISOString().split('T')[0]}

${sections.join('\n\n')}
`

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
