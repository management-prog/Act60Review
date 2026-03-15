'use client'

import { motion } from 'framer-motion'
import { Check, ArrowRight, Zap, Crown, Shield } from 'lucide-react'
import type { BrandConfig } from '@/config/brands'

interface PricingProps {
  brand: BrandConfig
}

const tiers = [
  {
    id: 'basic',
    name: 'Quick Scan',
    price: 299,
    description: 'Fast AI compliance check. Know your risk level in minutes.',
    icon: Zap,
    features: [
      'AI compliance score (0-100)',
      'Top 5 risk areas identified',
      'Missing form detection',
      'Basic transfer pricing flags',
      'Actionable recommendations',
      'PDF report delivered instantly',
    ],
    cta: 'Get Quick Scan',
    popular: false,
    gradient: 'from-gray-700 to-gray-600',
  },
  {
    id: 'comprehensive',
    name: 'Full Review',
    price: 999,
    description: 'Comprehensive AI review + CPA verification. The gold standard.',
    icon: Crown,
    features: [
      'Full return analysis (200+ rules)',
      'Transfer pricing deep dive',
      'FBAR & Form 8938 cross-check',
      'IRC 933 exclusion verification',
      'Residency test documentation review',
      'CPA-verified findings report',
      'Remediation priority guide',
      'Email support for 30 days',
    ],
    cta: 'Get Full Review',
    popular: true,
    gradient: 'from-blue-600 to-indigo-700',
  },
  {
    id: 'defense',
    name: 'Audit Shield',
    price: 1499,
    description: 'Everything in Full Review + audit preparation package.',
    icon: Shield,
    features: [
      'Everything in Full Review',
      'IRS Campaign 685 risk mapping',
      'Documentation completeness audit',
      'Presence test gap analysis',
      'Transfer pricing study evaluation',
      'Pre-audit response preparation',
      '30-min CPA consultation call',
      'Priority support for 90 days',
    ],
    cta: 'Activate Shield',
    popular: false,
    gradient: 'from-violet-600 to-purple-800',
  },
]

// Captology: Anchoring — show what CPA charges vs our price
function SavingsAnchor() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-2xl mx-auto mb-12 bg-gray-900/50 border border-gray-800 rounded-2xl p-6"
    >
      <p className="text-sm text-gray-400 text-center mb-4">
        What decree holders currently pay for the same service:
      </p>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-gray-500 line-through">$5,000</p>
          <p className="text-xs text-gray-600">Mid-tier CPA</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-500 line-through">$10,000</p>
          <p className="text-xs text-gray-600">Specialist Firm</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-500 line-through">$25,000+</p>
          <p className="text-xs text-gray-600">Big 4 Advisory</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Pricing({ brand }: PricingProps) {
  return (
    <section id="pricing" className="relative py-24 bg-gray-950">
      <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">
            Pricing
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            A Fraction of What Your CPA Charges
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Same rigor. Better technology. 90% less cost. Every review includes a money-back guarantee.
          </p>
        </motion.div>

        <SavingsAnchor />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={`relative bg-gray-900/50 border rounded-2xl p-8 flex flex-col ${
                tier.popular
                  ? 'border-blue-500/50 glow-strong scale-105'
                  : 'border-gray-800'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className={`bg-gradient-to-r ${brand.colors.gradient} text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider`}>
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${tier.gradient} mb-4`}>
                  <tier.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
                <p className="text-sm text-gray-400">{tier.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-5xl font-bold text-white">${tier.price}</span>
                <span className="text-gray-500 ml-2">one-time</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="/upload"
                className={`group flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold transition-all ${
                  tier.popular
                    ? `bg-gradient-to-r ${brand.colors.gradient} text-white hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25`
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                {tier.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Captology: Risk reversal — money-back guarantee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-sm text-gray-500">
            100% money-back guarantee if you&apos;re not satisfied with your review.
            <br />
            No questions asked. Cancel within 7 days of receiving your report.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
