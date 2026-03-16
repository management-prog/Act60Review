import act60reviewPages from './seo-pages-act60review.json'
import decreecheckPages from './seo-pages-decreecheck.json'
import act60shieldPages from './seo-pages-act60shield.json'

export interface SeoPage {
  slug: string
  title: string
  metaDescription: string
  h1: string
  heroIntro: string
  sections: { heading: string; content: string }[]
  faqItems: { question: string; answer: string }[]
  ctaText: string
  relatedSlugs: string[]
  disclaimer: string
}

const pagesByBrand: Record<string, SeoPage[]> = {
  act60review: act60reviewPages as SeoPage[],
  decreecheck: decreecheckPages as SeoPage[],
  act60shield: act60shieldPages as SeoPage[],
}

export function getSeoPage(brandId: string, slug: string): SeoPage | null {
  const pages = pagesByBrand[brandId] ?? pagesByBrand.act60review
  return pages.find((p) => p.slug === slug) ?? null
}

export function getAllSlugs(): string[] {
  const pages = pagesByBrand.act60review
  return pages.map((p) => p.slug)
}

export function getAllSeoPages(brandId: string): SeoPage[] {
  return pagesByBrand[brandId] ?? pagesByBrand.act60review
}
