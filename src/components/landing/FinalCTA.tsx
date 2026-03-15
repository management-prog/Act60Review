'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Shield } from 'lucide-react'
import type { BrandConfig } from '@/config/brands'

interface FinalCTAProps {
  brand: BrandConfig
}

export default function FinalCTA({ brand }: FinalCTAProps) {
  return (
    <section className="relative py-24 bg-gray-950 overflow-hidden">
      {/* Background glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${brand.colors.gradient} opacity-5`} />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Shield className="w-12 h-12 text-blue-400 mx-auto mb-6" />

          {/* Captology: Loss aversion final push */}
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            The Cost of Not Knowing<br />Is $287,000
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            That&apos;s the average IRS audit deficiency for Act 60 holders. A {brand.priceLabel} review
            is not an expense — it&apos;s insurance against a six-figure assessment.
          </p>

          <a
            href="/upload"
            className={`group inline-flex items-center gap-2 bg-gradient-to-r ${brand.colors.gradient} text-white font-semibold text-lg px-10 py-5 rounded-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 glow`}
          >
            {brand.ctaText}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          <p className="mt-6 text-sm text-gray-600">
            256-bit encryption • CPA-verified • Money-back guarantee
          </p>
        </motion.div>
      </div>
    </section>
  )
}
