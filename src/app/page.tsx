import { getBrandFromHeaders } from '@/config/brands.server'
import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/landing/Hero'
import CredentialBar from '@/components/landing/CredentialBar'
import SocialProof from '@/components/landing/SocialProof'
import ThreatSection from '@/components/landing/ThreatSection'
import HowItWorks from '@/components/landing/HowItWorks'
import WhatWeCatch from '@/components/landing/WhatWeCatch'
import Pricing from '@/components/landing/Pricing'
import FAQ from '@/components/landing/FAQ'
import CrossSellBanner from '@/components/landing/CrossSellBanner'
import FinalCTA from '@/components/landing/FinalCTA'
import Footer from '@/components/layout/Footer'
import LeadMagnetPopup from '@/components/landing/LeadMagnetPopup'

export default async function Home() {
  const brand = await getBrandFromHeaders()

  return (
    <>
      <Navbar brand={brand} />
      <main>
        <Hero brand={brand} />
        <CredentialBar brand={brand} />
        <SocialProof brand={brand} />
        <ThreatSection brand={brand} />
        <HowItWorks brand={brand} />
        <WhatWeCatch brand={brand} />
        <Pricing brand={brand} />
        <FAQ />
        <CrossSellBanner brand={brand} />
        <FinalCTA brand={brand} />
      </main>
      <Footer brand={brand} />
      <LeadMagnetPopup brand={brand} />
    </>
  )
}
