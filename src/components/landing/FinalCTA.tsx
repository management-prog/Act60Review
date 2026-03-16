'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { BrandConfig } from '@/config/brands'

interface FinalCTAProps {
  brand: BrandConfig
}

export default function FinalCTA({ brand }: FinalCTAProps) {
  return (
    <section className="relative py-32 bg-navy-900 overflow-hidden noise">
      <div className="section-line" />

      {/* Radial gold glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(201,169,110,0.06),transparent)]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-slate-100 mb-5 tracking-tight leading-[1.1]">
            The Cost of Not Knowing
            <br />
            Is <em className="text-red-400 italic">$287,000</em>
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
            That&apos;s the average IRS deficiency for Act 60 holders. A review
            isn&apos;t an expense &mdash; it&apos;s insurance against a six-figure assessment.
          </p>

          <a
            href="#pricing"
            className="group inline-flex items-center gap-3 bg-accent text-navy-900 font-semibold text-sm px-10 py-5 tracking-wide uppercase transition-all duration-300 hover:bg-accent-light hover:shadow-[0_0_60px_rgba(201,169,110,0.2)] glow-accent"
          >
            {brand.ctaText}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <div className="mt-8 flex items-center justify-center gap-5 text-xs text-slate-500 uppercase tracking-[0.12em]">
            <span>CPA-Verified</span>
            <span className="w-[3px] h-[3px] rounded-full bg-slate-700" />
            <span>SOC 2 Compliant</span>
            <span className="w-[3px] h-[3px] rounded-full bg-slate-700" />
            <span>Money-Back Guarantee</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
