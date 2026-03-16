import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'
import { getBrandFromId } from '@/config/brands'
import { getSeoPage, getAllSlugs } from '@/data/seo-pages'
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

export default async function SeoPage({ params }: PageProps) {
  const { slug } = await params
  const brandId = await getBrandId()
  const brand = getBrandFromId(brandId)
  const page = getSeoPage(brandId, slug)

  if (!page) notFound()

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqItems.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  })

  return (
    <>
      <Navbar brand={brand} />
      <main className="min-h-screen bg-navy-900">
        {/* Hero */}
        <section className="relative pt-28 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,var(--color-accent)_0%,transparent_70%)] opacity-[0.06]" />
          <div className="noise absolute inset-0 pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/" className="text-accent/60 text-sm hover:text-accent transition-colors mb-6 inline-block">
              &larr; {brand.name}
            </Link>

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

          {/* Related */}
          {page.relatedSlugs.length > 0 && (
            <section className="mt-12">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-[0.15em] mb-4">Related Topics</h3>
              <div className="flex flex-wrap gap-2">
                {page.relatedSlugs.map((related) => (
                  <Link key={related} href={`/${related}`} className="text-sm text-slate-500 hover:text-accent border border-white/[0.05] px-3 py-1.5 hover:border-accent/20 transition-colors">
                    {related.replace(/-/g, ' ')}
                  </Link>
                ))}
              </div>
            </section>
          )}

          <p className="mt-12 text-[11px] text-slate-600 leading-relaxed">{page.disclaimer}</p>
        </article>

        <Script id={`faq-jsonld-${slug}`} type="application/ld+json" strategy="afterInteractive">
          {jsonLd}
        </Script>
      </main>
      <Footer brand={brand} />
    </>
  )
}
