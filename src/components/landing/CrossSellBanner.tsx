'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { BrandConfig } from '@/config/brands'

interface CrossSellBannerProps {
  brand: BrandConfig
}

const protectionStack = [
  { brandId: 'decreecheck', name: 'DecreeCheck', price: '$149', desc: 'Quick compliance scan', domain: 'decreecheck.com' },
  { brandId: 'act60review', name: 'Act 60 Review', price: '$1,499', desc: 'Full AI review + CPA verification', domain: 'act60review.com' },
  { brandId: 'act60shield', name: 'Act 60 Shield', price: '$1,999', desc: 'Audit defense + ongoing protection', domain: 'act60shield.com' },
]

export default function CrossSellBanner({ brand }: CrossSellBannerProps) {
  return (
    <section className="relative py-16 bg-navy-800/30 noise">
      <div className="section-line" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Direct cross-sell */}
        <motion.a
          href={brand.crossSell.url}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          className="block p-6 border border-white/[0.05] hover:border-accent/20 bg-navy-900/50 transition-all duration-300 group mb-10"
          rel="noopener"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Next Step</p>
              <p className="text-base text-slate-200 group-hover:text-accent transition-colors">
                {brand.crossSell.text} &rarr;
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-accent group-hover:translate-x-1 transition-all" />
          </div>
        </motion.a>

        {/* Full protection stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <p className="text-xs text-slate-500 uppercase tracking-[0.15em] font-medium text-center mb-6">
            The Complete Protection Stack
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/[0.04] border border-white/[0.04]">
            {protectionStack.map((item) => {
              const isCurrent = item.brandId === brand.id
              return (
                <a
                  key={item.brandId}
                  href={isCurrent ? '#pricing' : `https://${item.domain}`}
                  className={`p-5 transition-colors duration-300 ${
                    isCurrent
                      ? 'bg-accent/[0.04] border-l-2 border-l-accent'
                      : 'bg-navy-900 hover:bg-white/[0.01]'
                  }`}
                  rel="noopener"
                >
                  <div className="flex items-baseline justify-between mb-2">
                    <span className={`text-sm font-medium ${isCurrent ? 'text-accent' : 'text-slate-300'}`}>
                      {item.name}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{item.price}</span>
                  </div>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                  {isCurrent && (
                    <p className="text-[10px] text-accent/60 uppercase tracking-wider mt-2 font-medium">You are here</p>
                  )}
                </a>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
