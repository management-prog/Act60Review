import type { Metadata } from 'next'
import { getAllBrands } from '@/config/brands'
import { getBrandFromHeaders } from '@/config/brands.server'
import CompareContent from './CompareContent'
import CompareJsonLd from './CompareJsonLd'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Compare Act 60 Protection Plans | DecreeCheck vs Act 60 Review vs Act 60 Shield',
  description:
    'Side-by-side comparison of all three Act 60 compliance tiers. Find the right protection level for your decree — from quick scans to full audit defense.',
  keywords:
    'Act 60 comparison, decree compliance plans, Act 60 review pricing, audit defense Puerto Rico, IRS Campaign 685 protection',
  openGraph: {
    title: 'Compare Act 60 Protection Plans',
    description:
      'Side-by-side comparison of DecreeCheck, Act 60 Review, and Act 60 Shield. Find the right protection level for your decree.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compare Act 60 Protection Plans',
    description:
      'Side-by-side comparison of all three Act 60 compliance tiers.',
  },
  robots: { index: true, follow: true },
}

export default async function ComparePage() {
  const brand = await getBrandFromHeaders()
  const allBrands = getAllBrands()

  return (
    <>
      <CompareJsonLd brands={allBrands} />
      <Navbar brand={brand} />
      <main>
        <CompareContent brands={allBrands} currentBrandId={brand.id} />
      </main>
      <Footer brand={brand} />
    </>
  )
}
