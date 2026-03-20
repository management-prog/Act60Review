import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getBrandFromId, getAllBrands } from '@/config/brands'
import { getSeoPage, getAllSlugs, getPageTitle } from '@/data/seo-pages'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getBrandId(): Promise<string> {
  const h = await headers()
  return h.get('x-brand-id') ?? 'act60review'
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const brandId = await getBrandId()
  const brand = getBrandFromId(brandId)
  const page = getSeoPage(brandId, slug)

  if (!page) return { title: 'Not Found' }

  return {
    title: `${page.title} | ${brand.name}`,
    description: page.metaDescription,
    alternates: {
      canonical: `https://${brand.domain}/${slug}`,
    },
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      type: 'article',
      siteName: brand.name,
      images: [`/seo-images/${slug}.png`],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.metaDescription,
    },
  }
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

function getTopicCategory(slug: string): string {
  if (slug.startsWith('moving-from-')) return 'Relocation Guides'
  if (slug.startsWith('act-60-for-')) return 'Professional Guides'
  if (slug.startsWith('act-60-tax-advisor-')) return 'Local Advisors'
  if (slug.includes('-vs-')) return 'Comparisons'
  if (slug.includes('audit') || slug.includes('campaign-685') || slug.includes('penalty') || slug.includes('defense')) return 'Audit & Defense'
  if (slug.includes('fbar') || slug.includes('8938') || slug.includes('foreign-trust') || slug.includes('planilla') || slug.includes('form-480')) return 'Filing & Forms'
  if (slug.includes('presence-test') || slug.includes('residency') || slug.includes('closer-connection') || slug.includes('183-day') || slug.includes('tax-home')) return 'Residency & Compliance'
  return 'Tax Topics'
}

function getCrossSiteLinks(brandId: string, slug: string): { domain: string; name: string; label: string; targetSlug: string }[] {
  const allBrands = getAllBrands()
  const links: { domain: string; name: string; label: string; targetSlug: string }[] = []

  for (const other of allBrands) {
    if (other.id === brandId) continue

    const targetSlug = getSeoPage(other.id, slug) ? slug : ''

    if (other.id === 'decreecheck' && brandId !== 'decreecheck') {
      links.push({
        domain: other.domain,
        name: other.name,
        label: 'Run a quick compliance check',
        targetSlug,
      })
    }
    if (other.id === 'act60shield' && brandId !== 'act60shield') {
      if (slug.includes('audit') || slug.includes('campaign-685') || slug.includes('defense') || slug.includes('penalty')) {
        links.push({
          domain: other.domain,
          name: other.name,
          label: 'Get audit defense protection',
          targetSlug,
        })
      }
    }
    if (other.id === 'act60review' && brandId !== 'act60review') {
      links.push({
        domain: other.domain,
        name: other.name,
        label: 'Get a comprehensive AI review',
        targetSlug,
      })
    }
  }

  return links.slice(0, 2)
}

export default async function SeoPage({ params }: PageProps) {
  const { slug } = await params
  const brandId = await getBrandId()
  const brand = getBrandFromId(brandId)
  const page = getSeoPage(brandId, slug)

  if (!page) notFound()

  const category = getTopicCategory(slug)
  const crossSiteLinks = getCrossSiteLinks(brandId, slug)

  // All JSON-LD content is derived from trusted internal data (brand config + JSON data files), not user input
  const faqJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntityOfPage: `https://${brand.domain}/${slug}`,
    mainEntity: page.faqItems.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  })

  const breadcrumbJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${brand.domain}` },
      { '@type': 'ListItem', position: 2, name: category },
      { '@type': 'ListItem', position: 3, name: page.title },
    ],
  })

  const articleJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.h1,
    description: page.metaDescription,
    image: `https://${brand.domain}/seo-images/${slug}.png`,
    author: { '@type': 'Organization', name: 'Dis Optimus Capital LLC' },
    publisher: { '@id': `https://${brand.domain}/#organization` },
    mainEntityOfPage: `https://${brand.domain}/${slug}`,
    datePublished: '2026-03-17',
    dateModified: new Date().toISOString().split('T')[0],
  })

  return (
    <>
      {/* Structured Data - all from trusted internal data, not user input */}
      <script id={`faq-jsonld-${slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />
      <script id={`breadcrumb-jsonld-${slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }} />
      <script id={`article-jsonld-${slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleJsonLd }} />
      <Navbar brand={brand} />
      <main className="min-h-screen bg-navy-900">
        {/* Breadcrumb nav */}
        <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-2">
          <ol className="flex items-center gap-1.5 text-xs text-slate-600">
            <li><Link href="/" className="hover:text-accent transition-colors">{brand.name}</Link></li>
            <li>/</li>
            <li className="text-slate-500">{category}</li>
            <li>/</li>
            <li className="text-slate-400 truncate max-w-[200px]">{page.title}</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="relative pt-4 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,var(--color-accent)_0%,transparent_70%)] opacity-[0.06]" />
          <div className="noise absolute inset-0 pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-slate-100 mb-6 tracking-tight leading-tight">
              {page.h1}
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
              {page.heroIntro}
            </p>
          </div>
        </section>

        {/* Hero image */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="relative w-full aspect-[1200/630] rounded-lg overflow-hidden border border-white/[0.04]">
            <Image
              src={`/seo-images/${slug}.png`}
              alt={page.h1}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
              priority
            />
          </div>
        </div>

        {/* Content sections */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="space-y-12">
            {page.sections.map((section, i) => (
              <section key={i}>
                <h2 className="font-serif text-2xl text-slate-100 mb-4 tracking-tight">
                  {section.heading}
                </h2>
                <div className="text-slate-400 text-[15px] leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </section>
            ))}
          </div>

          {/* FAQ */}
          {page.faqItems.length > 0 && (
            <section className="mt-16 pt-12 border-t border-white/[0.05]">
              <h2 className="font-serif text-2xl text-slate-100 mb-8 tracking-tight">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {page.faqItems.map((faq, i) => (
                  <div key={i} className="border-b border-white/[0.04] pb-6">
                    <h3 className="text-base font-semibold text-slate-200 mb-2">{faq.question}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* CTA */}
          <section className="mt-16 p-8 border border-white/[0.04] bg-accent/[0.02] text-center">
            <h2 className="font-serif text-2xl text-slate-100 mb-3">Ready to Check Your Return?</h2>
            <p className="text-slate-400 mb-6 text-sm">{brand.description}</p>
            <a
              href="/#pricing"
              className="inline-flex items-center gap-2 bg-accent text-navy-900 font-semibold text-sm px-8 py-4 tracking-wide uppercase hover:bg-accent-light transition-all duration-300"
            >
              {page.ctaText}
            </a>
          </section>

          {/* Cross-site links — revenue ladder */}
          {crossSiteLinks.length > 0 && (
            <section className="mt-12">
              <p className="text-xs text-slate-500 uppercase tracking-[0.15em] font-medium mb-4">
                The Complete Protection Stack
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                {crossSiteLinks.map((link) => (
                  <a
                    key={link.domain}
                    href={`https://${link.domain}/${link.targetSlug}`}
                    className="flex-1 p-5 border border-white/[0.05] hover:border-accent/20 bg-accent/[0.01] hover:bg-accent/[0.03] transition-all duration-300 group"
                    rel="noopener"
                  >
                    <span className="text-xs text-accent/60 uppercase tracking-wider font-medium">{link.name}</span>
                    <span className="block text-sm text-slate-300 group-hover:text-accent transition-colors mt-1 font-medium">
                      {link.label} &rarr;
                    </span>
                    <span className="block text-xs text-slate-600 mt-1">
                      {link.domain === 'decreecheck.com' ? 'From $149' : link.domain === 'act60review.com' ? 'From $299' : 'From $799'}
                    </span>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Related */}
          {page.relatedSlugs.length > 0 && (
            <section className="mt-12">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-[0.15em] mb-4">Related Topics</h3>
              <div className="flex flex-wrap gap-2">
                {page.relatedSlugs.map((related) => (
                  <Link key={related} href={`/${related}`} className="text-sm text-slate-500 hover:text-accent border border-white/[0.05] px-3 py-1.5 hover:border-accent/20 transition-colors">
                    {getPageTitle(brandId, related)}
                  </Link>
                ))}
              </div>
            </section>
          )}

          <p className="mt-12 text-[11px] text-slate-600 leading-relaxed">{page.disclaimer}</p>
        </article>
      </main>
      <Footer brand={brand} />
    </>
  )
}
