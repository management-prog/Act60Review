'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Loader2 } from 'lucide-react'
import type { BrandConfig } from '@/config/brands'

interface PricingProps {
  brand: BrandConfig
}

export default function Pricing({ brand }: PricingProps) {
  const [loadingTier, setLoadingTier] = useState<string | null>(null)

  async function handleCheckout(tierId: string) {
    setLoadingTier(tierId)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier: tierId }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        console.error('Checkout error:', data.error)
        setLoadingTier(null)
      }
    } catch (err) {
      console.error('Checkout failed:', err)
      setLoadingTier(null)
    }
  }

  return (
    <section id="pricing" className="relative py-28 bg-navy-900 noise">
      <div className="section-line" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[500px] h-[80vw] max-h-[500px] bg-accent/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          className="text-center mb-10"
        >
          <p className="text-accent/80 font-sans text-xs font-semibold uppercase tracking-[0.2em] mb-4">
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
          viewport={{ once: true, amount: 0.1 }}
          className="text-center mb-14"
        >
          <p className="text-sm text-slate-500 mb-4">
            What decree holders currently pay:
          </p>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.04] border border-white/[0.04] max-w-5xl mx-auto overflow-hidden">
          {brand.tiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex flex-col p-5 sm:p-8 ${
                tier.popular ? 'bg-accent/[0.02]' : 'bg-navy-900'
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent" />
              )}

              <p className={`text-[10px] font-bold uppercase tracking-[0.18em] mb-1 ${
                tier.popular ? 'text-accent' : 'text-slate-600'
              }`}>
                {tier.tier}
              </p>
              <h3 className="font-serif text-xl text-slate-100 mb-1">{tier.name}</h3>
              <p className="text-sm text-slate-400 mb-6">{tier.description}</p>

              <div className="mb-6">
                <span className={`font-serif text-4xl tracking-tight ${
                  tier.popular ? 'text-accent' : 'text-slate-100'
                }`}>
                  ${tier.price.toLocaleString()}
                </span>
                <span className="text-slate-600 ml-2 text-sm">one-time</span>
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-slate-400">
                    <span className={`mt-1.5 w-1 h-1 rounded-full shrink-0 ${
                      tier.popular ? 'bg-accent/60' : 'bg-slate-600'
                    }`} />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleCheckout(tier.id)}
                disabled={loadingTier !== null}
                className={`group flex items-center justify-center gap-2 w-full py-3.5 text-sm font-semibold tracking-wide uppercase transition-all duration-300 disabled:opacity-60 ${
                  tier.popular
                    ? 'bg-accent text-navy-900 hover:bg-accent-light'
                    : 'border border-white/[0.06] text-slate-300 hover:text-slate-100 hover:border-white/[0.12]'
                }`}
              >
                {loadingTier === tier.id ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    {tier.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          className="text-center mt-10 text-sm text-slate-600"
        >
          100% money-back guarantee. No questions asked within 7 days.
        </motion.p>
      </div>
    </section>
  )
}
