'use client'

import { getBrandConfig } from '@/config/brands'
import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/landing/Hero'
import ThreatSection from '@/components/landing/ThreatSection'
import HowItWorks from '@/components/landing/HowItWorks'
import WhatWeCatch from '@/components/landing/WhatWeCatch'
import Pricing from '@/components/landing/Pricing'
import FAQ from '@/components/landing/FAQ'
import FinalCTA from '@/components/landing/FinalCTA'
import Footer from '@/components/layout/Footer'

export default function Home() {
  const brand = getBrandConfig()

  return (
    <>
      <Navbar brand={brand} />
      <main>
        <Hero brand={brand} />
        <ThreatSection />
        <HowItWorks brand={brand} />
        <WhatWeCatch />
        <Pricing brand={brand} />
        <FAQ />
        <FinalCTA brand={brand} />
      </main>
      <Footer brand={brand} />
    </>
  )
}
