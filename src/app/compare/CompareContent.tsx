'use client'

import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { Check, X, ArrowRight, Shield, Search, FileCheck } from 'lucide-react'
import type { BrandConfig } from '@/config/brands'

interface CompareContentProps {
  brands: BrandConfig[]
  currentBrandId: string
}

const brandOrder: BrandConfig['id'][] = ['decreecheck', 'act60review', 'act60shield']

const comparisonFeatures = [
  { name: 'AI Compliance Score', decreecheck: true, act60review: true, act60shield: true },
  { name: 'Missing Form Detection', decreecheck: true, act60review: true, act60shield: true },
  { name: 'Transfer Pricing Flags', decreecheck: true, act60review: true, act60shield: true },
  { name: 'Actionable Recommendations', decreecheck: true, act60review: true, act60shield: true },
  { name: 'PDF Report', decreecheck: true, act60review: true, act60shield: true },
  { name: 'Full 200+ Rule Analysis', decreecheck: false, act60review: true, act60shield: true },
  { name: 'FBAR & Form 8938 Cross-Check', decreecheck: false, act60review: true, act60shield: true },
  { name: 'IRC 933 Exclusion Verification', decreecheck: false, act60review: true, act60shield: true },
  { name: 'Residency Test Review', decreecheck: false, act60review: true, act60shield: true },
  { name: 'CPA-Verified Report', decreecheck: false, act60review: true, act60shield: true },
  { name: 'CPA Consultation Call', decreecheck: false, act60review: true, act60shield: true },
  { name: 'Campaign 685 Risk Mapping', decreecheck: false, act60review: true, act60shield: true },
  { name: 'Documentation Completeness Audit', decreecheck: false, act60review: false, act60shield: true },
  { name: 'Presence Test Gap Analysis', decreecheck: false, act60review: false, act60shield: true },
  { name: 'TP Study Evaluation', decreecheck: false, act60review: false, act60shield: true },
  { name: 'Pre-Audit Response Preparation', decreecheck: false, act60review: false, act60shield: true },
  { name: 'Audit Risk Assessment', decreecheck: false, act60review: false, act60shield: true },
  { name: 'Annual Compliance Monitoring', decreecheck: false, act60review: false, act60shield: true },
  { name: 'Emergency Audit Response Kit', decreecheck: false, act60review: false, act60shield: true },
  { name: 'Priority Support', decreecheck: false, act60review: true, act60shield: true },
]

const scenarios = [
  {
    targetId: 'decreecheck' as const,
    icon: Search,
    headline: 'Just filed and want peace of mind',
    description:
      'You filed your return and want a quick sanity check. No red flags yet — just want to make sure nothing obvious was missed before you move on.',
    cta: 'Run a Quick Scan',
  },
  {
    targetId: 'act60review' as const,
    icon: FileCheck,
    headline: 'Received IRS notice or want thorough review',
    description:
      'You got a letter, changed CPAs, or have complex income streams. You need a full 200+ rule analysis with CPA verification and Campaign 685 mapping.',
    cta: 'Get Full Review',
  },
  {
    targetId: 'act60shield' as const,
    icon: Shield,
    headline: 'Under audit or high-risk profile',
    description:
      'You are under active audit, have received a deficiency notice, or have a high-risk profile with multiple entities and complex transfer pricing.',
    cta: 'Activate Your Shield',
  },
]

function getBrandAccentClass(brandId: string): string {
  switch (brandId) {
    case 'decreecheck':
      return 'text-emerald-400'
    case 'act60review':
      return 'text-[#C9A96E]'
    case 'act60shield':
      return 'text-violet-400'
    default:
      return 'text-slate-400'
  }
}

function getBrandAccentBg(brandId: string): string {
  switch (brandId) {
    case 'decreecheck':
      return 'bg-emerald-500/10 border-emerald-500/20'
    case 'act60review':
      return 'bg-[#C9A96E]/10 border-[#C9A96E]/20'
    case 'act60shield':
      return 'bg-violet-500/10 border-violet-500/20'
    default:
      return 'bg-slate-500/10 border-slate-500/20'
  }
}

function getBrandCheckColor(brandId: string): string {
  switch (brandId) {
    case 'decreecheck':
      return 'text-emerald-400/70'
    case 'act60review':
      return 'text-[#C9A96E]/70'
    case 'act60shield':
      return 'text-violet-400/70'
    default:
      return 'text-slate-500'
  }
}

function getBrandButtonClass(brandId: string): string {
  switch (brandId) {
    case 'decreecheck':
      return 'bg-emerald-500 hover:bg-emerald-400 text-navy-900'
    case 'act60review':
      return 'bg-[#C9A96E] hover:bg-[#DFC292] text-navy-900'
    case 'act60shield':
      return 'bg-violet-500 hover:bg-violet-400 text-white'
    default:
      return 'bg-slate-500 text-white'
  }
}

function getScenarioGlassClass(brandId: string): string {
  switch (brandId) {
    case 'decreecheck':
      return 'border-emerald-500/10 hover:border-emerald-500/25'
    case 'act60review':
      return 'border-[#C9A96E]/10 hover:border-[#C9A96E]/25'
    case 'act60shield':
      return 'border-violet-500/10 hover:border-violet-500/25'
    default:
      return 'border-white/10'
  }
}

export default function CompareContent({ brands, currentBrandId }: CompareContentProps) {
  const orderedBrands = brandOrder
    .map((id) => brands.find((b) => b.id === id))
    .filter((b): b is BrandConfig => b !== undefined)

  return (
    <>
      {/* Spacer for fixed navbar */}
      <div className="h-[72px]" />

      {/* Hero */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-navy-900" />
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute w-[60%] h-[60%] rounded-full blur-[120px] opacity-[0.08]"
            style={{
              top: '-10%',
              right: '-10%',
              background: 'radial-gradient(circle, #C9A96E, transparent 70%)',
            }}
          />
          <div
            className="absolute w-[40%] h-[40%] rounded-full blur-[100px] opacity-[0.06]"
            style={{
              bottom: '-10%',
              left: '-5%',
              background: 'radial-gradient(circle, #8B5CF6, transparent 70%)',
            }}
          />
        </div>
        <div className="noise absolute inset-0 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#C9A96E] font-sans text-xs font-semibold uppercase tracking-[0.25em] mb-6"
          >
            Compare Protection Levels
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-[-0.02em] leading-[1.08] mb-6 text-slate-100"
          >
            Find Your{' '}
            <em className="text-[#C9A96E] italic">Protection Level</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Three tiers of Act 60 compliance protection. From a quick scan to full audit defense,
            every decree holder has a right fit.
          </motion.p>
        </div>
      </section>

      {/* Comparison Matrix */}
      <section className="relative py-20 bg-navy-900 noise">
        <div className="section-line" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl sm:text-4xl text-slate-100 tracking-tight mb-4">
              Feature Comparison
            </h2>
            <p className="text-base text-slate-400 max-w-xl mx-auto">
              See exactly what each protection level includes.
            </p>
          </motion.div>

          {/* Desktop table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            className="hidden md:block overflow-x-auto"
          >
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left text-xs text-slate-500 uppercase tracking-wider py-4 pr-6 font-medium w-[40%]">
                    Feature
                  </th>
                  {orderedBrands.map((brand) => (
                    <th
                      key={brand.id}
                      className={`text-center py-4 px-4 ${
                        brand.id === 'act60review' ? 'relative' : ''
                      }`}
                    >
                      {brand.id === 'act60review' && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center px-3 py-0.5 bg-[#C9A96E]/10 border border-[#C9A96E]/20 text-[10px] text-[#C9A96E] font-semibold uppercase tracking-wider whitespace-nowrap">
                          Most Popular
                        </span>
                      )}
                      <span className={`text-sm font-medium ${getBrandAccentClass(brand.id)}`}>
                        {brand.name}
                      </span>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        from ${brand.tiers[0].price.toLocaleString()}
                      </p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature) => (
                  <tr key={feature.name} className="border-b border-white/[0.03]">
                    <td className="text-sm text-slate-400 py-3 pr-6">{feature.name}</td>
                    {orderedBrands.map((brand) => {
                      const hasFeature = feature[brand.id as keyof typeof feature] as boolean
                      return (
                        <td
                          key={brand.id}
                          className={`text-center py-3 px-4 ${
                            brand.id === 'act60review' ? 'bg-[#C9A96E]/[0.02]' : ''
                          }`}
                        >
                          {hasFeature ? (
                            <Check className={`w-4 h-4 mx-auto ${getBrandCheckColor(brand.id)}`} />
                          ) : (
                            <X className="w-4 h-4 text-slate-700 mx-auto" />
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Mobile stacked cards */}
          <div className="md:hidden space-y-6">
            {orderedBrands.map((brand, brandIndex) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: brandIndex * 0.1 }}
                className={`border ${
                  brand.id === 'act60review'
                    ? 'border-[#C9A96E]/20'
                    : 'border-white/[0.06]'
                } bg-navy-900/80 p-5`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    {brand.id === 'act60review' && (
                      <span className="inline-flex items-center px-2 py-0.5 bg-[#C9A96E]/10 border border-[#C9A96E]/20 text-[10px] text-[#C9A96E] font-semibold uppercase tracking-wider mb-2">
                        Most Popular
                      </span>
                    )}
                    <h3 className={`text-lg font-medium ${getBrandAccentClass(brand.id)}`}>
                      {brand.name}
                    </h3>
                  </div>
                  <span className="text-sm text-slate-400">
                    from ${brand.tiers[0].price.toLocaleString()}
                  </span>
                </div>

                <ul className="space-y-2">
                  {comparisonFeatures.map((feature) => {
                    const hasFeature = feature[brand.id as keyof typeof feature] as boolean
                    return (
                      <li
                        key={feature.name}
                        className={`flex items-center gap-2 text-sm ${
                          hasFeature ? 'text-slate-300' : 'text-slate-600 line-through'
                        }`}
                      >
                        {hasFeature ? (
                          <Check className={`w-3.5 h-3.5 shrink-0 ${getBrandCheckColor(brand.id)}`} />
                        ) : (
                          <X className="w-3.5 h-3.5 shrink-0 text-slate-700" />
                        )}
                        {feature.name}
                      </li>
                    )
                  })}
                </ul>

                <a
                  href={`https://${brand.domain}`}
                  className={`mt-5 group flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold tracking-wide uppercase transition-all duration-300 ${getBrandButtonClass(brand.id)}`}
                  rel="noopener"
                >
                  {brand.ctaText}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Price Comparison */}
      <section className="relative py-20 bg-navy-800/30 noise">
        <div className="section-line" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl sm:text-4xl text-slate-100 tracking-tight mb-4">
              Starting Prices
            </h2>
            <p className="text-base text-slate-400 max-w-xl mx-auto">
              Every tier includes a money-back guarantee. No questions asked within 7 days.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/[0.04] border border-white/[0.04]">
            {orderedBrands.map((brand, index) => {
              const isCurrent = brand.id === currentBrandId
              return (
                <motion.div
                  key={brand.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 sm:p-8 text-center ${
                    brand.id === 'act60review'
                      ? 'bg-[#C9A96E]/[0.03]'
                      : 'bg-navy-900'
                  }`}
                >
                  {brand.id === 'act60review' && (
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#C9A96E]" />
                  )}
                  <p className={`text-sm font-medium mb-1 ${getBrandAccentClass(brand.id)}`}>
                    {brand.name}
                  </p>
                  <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-4">
                    {brand.tier === 'diy' ? 'Quick Check' : brand.tier === 'premium' ? 'Full Review' : 'Audit Defense'}
                  </p>
                  <div className="mb-4">
                    {brand.tiers.map((tier, tierIdx) => (
                      <div key={tier.id} className={`flex items-center justify-between py-2 ${
                        tierIdx < brand.tiers.length - 1 ? 'border-b border-white/[0.04]' : ''
                      }`}>
                        <span className="text-xs text-slate-500">{tier.name}</span>
                        <span className={`font-serif text-lg ${
                          tier.popular ? getBrandAccentClass(brand.id) : 'text-slate-200'
                        }`}>
                          ${tier.price.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                  <a
                    href={isCurrent ? '#pricing' : `https://${brand.domain}`}
                    className={`group inline-flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold tracking-wide uppercase transition-all duration-300 ${
                      brand.id === 'act60review'
                        ? 'bg-[#C9A96E] hover:bg-[#DFC292] text-navy-900'
                        : 'border border-white/[0.06] text-slate-300 hover:text-slate-100 hover:border-white/[0.12]'
                    }`}
                    rel="noopener"
                  >
                    {brand.ctaText}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                  {isCurrent && (
                    <p className="text-[10px] text-[#C9A96E]/60 uppercase tracking-wider mt-3 font-medium">
                      You are here
                    </p>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Which is right for you? */}
      <section className="relative py-20 bg-navy-900 noise">
        <div className="section-line" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl sm:text-4xl text-slate-100 tracking-tight mb-4">
              Which Is Right for You?
            </h2>
            <p className="text-base text-slate-400 max-w-xl mx-auto">
              Pick the scenario that matches your situation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scenarios.map((scenario, index) => {
              const brand = orderedBrands.find((b) => b.id === scenario.targetId)
              if (!brand) return null
              const IconComponent = scenario.icon

              return (
                <motion.a
                  key={scenario.targetId}
                  href={`https://${brand.domain}`}
                  rel="noopener"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: index * 0.12 }}
                  className={`group relative p-6 sm:p-8 glass border transition-all duration-300 ${getScenarioGlassClass(scenario.targetId)}`}
                >
                  {/* Glassmorphism glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${
                        scenario.targetId === 'decreecheck'
                          ? 'rgba(16,185,129,0.05)'
                          : scenario.targetId === 'act60review'
                          ? 'rgba(201,169,110,0.05)'
                          : 'rgba(139,92,246,0.05)'
                      }, transparent 70%)`,
                    }}
                  />

                  <div className="relative z-10">
                    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-5 border ${getBrandAccentBg(scenario.targetId)}`}>
                      <IconComponent className={`w-5 h-5 ${getBrandAccentClass(scenario.targetId)}`} />
                    </div>

                    <h3 className="font-serif text-xl text-slate-100 mb-3 tracking-tight">
                      {scenario.headline}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-6">
                      {scenario.description}
                    </p>

                    <span className={`inline-flex items-center gap-2 text-sm font-semibold tracking-wide uppercase ${getBrandAccentClass(scenario.targetId)} group-hover:gap-3 transition-all`}>
                      {scenario.cta}
                      <ArrowRight className="w-4 h-4" />
                    </span>

                    <p className={`text-[11px] mt-3 ${getBrandAccentClass(scenario.targetId)} opacity-60`}>
                      {brand.name} &middot; from ${brand.tiers[0].price.toLocaleString()}
                    </p>
                  </div>
                </motion.a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 bg-navy-800/30 noise">
        <div className="section-line" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <h2 className="font-serif text-3xl sm:text-4xl text-slate-100 tracking-tight mb-5">
              Still Not Sure?
            </h2>
            <p className="text-base text-slate-400 max-w-xl mx-auto leading-relaxed mb-8">
              Start with DecreeCheck for a quick scan. If issues are found, upgrade to Act 60 Review
              or Act 60 Shield — your scan results carry over.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {orderedBrands.map((brand) => (
                <a
                  key={brand.id}
                  href={`https://${brand.domain}`}
                  rel="noopener"
                  className={`group inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold tracking-wide uppercase transition-all duration-300 ${
                    brand.id === 'act60review'
                      ? 'bg-[#C9A96E] hover:bg-[#DFC292] text-navy-900'
                      : 'border border-white/[0.06] text-slate-300 hover:text-slate-100 hover:border-white/[0.12]'
                  }`}
                >
                  {brand.name}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
