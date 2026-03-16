'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { BrandConfig } from '@/config/brands'

interface PricingProps {
  brand: BrandConfig
}

const tiers = [
  {
    id: 'basic',
    tier: 'Essential',
    name: 'Quick Scan',
    price: 299,
    description: 'AI compliance check. Know your risk in minutes.',
    features: [
      'AI compliance score (0\u2013100)',
      'Top 5 risk areas identified',
      'Missing form detection',
      'Basic transfer pricing flags',
      'Actionable recommendations',
      'PDF report instantly',
    ],
    cta: 'Get Quick Scan',
    popular: false,
  },
  {
    id: 'comprehensive',
    tier: 'Comprehensive',
    name: 'Full Review',
    price: 999,
    description: 'Complete AI review + CPA verification. The gold standard.',
    features: [
      'Full return analysis (200+ rules)',
      'Transfer pricing deep dive',
      'FBAR & 8938 cross-check',
      'IRC 933 exclusion verification',
      'Residency test review',
      'CPA-verified report',
      'Remediation guide',
      '30-day email support',
    ],
    cta: 'Get Full Review',
    popular: true,
  },
  {
    id: 'defense',
    tier: 'Defense',
    name: 'Audit Shield',
    price: 1499,
    description: 'Full Review + audit preparation package.',
    features: [
      'Everything in Full Review',
      'Campaign 685 risk mapping',
      'Documentation audit',
      'Presence test gap analysis',
      'TP study evaluation',
      'Pre-audit preparation',
      '30-min CPA call',
      '90-day priority support',
    ],
    cta: 'Activate Shield',
    popular: false,
  },
]

export default function Pricing({ brand }: PricingProps) {
  return (
    <section id="pricing" className="relative py-28 bg-navy-900 noise">
      <div className="section-line" />

      {/* Ambient glow behind pricing */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-gold/80 font-sans text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            Pricing
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-slate-100 mb-5 tracking-tight">
            A Fraction of What{' '}
            <br className="hidden sm:block" />
            Your CPA Charges
          </h2>
          <p className="text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            Same rigor. Better technology. Money-back guarantee.
          </p>
        </motion.div>

        {/* Price anchoring */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-sm text-slate-500 mb-4">
            What decree holders currently pay:
          </p>
          <div className="flex justify-center gap-10">
            {[
              { price: '$5,000', label: 'Mid-tier CPA' },
              { price: '$15,000', label: 'Specialist Firm' },
              { price: '$30,000+', label: 'Big 4 Advisory' },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-serif text-2xl text-slate-600 line-through decoration-red-500/30">
                  {item.price}
                </p>
                <p className="text-[11px] text-slate-600 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.04] border border-white/[0.04] max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex flex-col p-8 ${
                tier.popular
                  ? 'bg-gold/[0.02]'
                  : 'bg-navy-900'
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold" />
              )}

              <p className={`text-[10px] font-bold uppercase tracking-[0.18em] mb-1 ${
                tier.popular ? 'text-gold' : 'text-slate-600'
              }`}>
                {tier.tier}
              </p>
              <h3 className="font-serif text-xl text-slate-100 mb-1">{tier.name}</h3>
              <p className="text-sm text-slate-400 mb-6">{tier.description}</p>

              <div className="mb-6">
                <span className={`font-serif text-4xl tracking-tight ${
                  tier.popular ? 'text-gold' : 'text-slate-100'
                }`}>
                  ${tier.price.toLocaleString()}
                </span>
                <span className="text-slate-600 ml-2 text-sm">one-time</span>
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-slate-400">
                    <span className={`mt-1.5 w-1 h-1 rounded-full shrink-0 ${
                      tier.popular ? 'bg-gold/60' : 'bg-slate-600'
                    }`} />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#pricing"
                className={`group flex items-center justify-center gap-2 w-full py-3.5 text-sm font-semibold tracking-wide uppercase transition-all duration-300 ${
                  tier.popular
                    ? 'bg-gold text-navy-900 hover:bg-gold-light hover:shadow-[0_0_40px_rgba(201,169,110,0.15)]'
                    : 'border border-white/[0.06] text-slate-300 hover:text-slate-100 hover:border-white/[0.12]'
                }`}
              >
                {tier.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10 text-sm text-slate-600"
        >
          100% money-back guarantee. No questions asked within 7 days.
        </motion.p>
      </div>
    </section>
  )
}
