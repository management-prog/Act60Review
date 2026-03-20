'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { BrandConfig } from '@/config/brands'
import GuaranteeBadge from '@/components/ui/GuaranteeBadge'

interface FinalCTAProps {
  brand: BrandConfig
}

function getDaysUntilDeadline(): number {
  const now = new Date()
  const currentYear = now.getFullYear()
  const april15 = new Date(currentYear, 3, 15)
  if (now > april15) {
    const nextApril15 = new Date(currentYear + 1, 3, 15)
    return Math.ceil((nextApril15.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  }
  return Math.ceil((april15.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
}

export default function FinalCTA({ brand }: FinalCTAProps) {
  const daysLeft = getDaysUntilDeadline()
  return (
    <section className="relative py-32 bg-navy-900 overflow-hidden noise">
      <div className="section-line" />

      {/* Radial gold glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(201,169,110,0.06),transparent)]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-slate-100 mb-5 tracking-tight leading-[1.1]">
            The Cost of Not Knowing
            <br className="hidden sm:block" />
            {' '}Is <em className="text-red-400 italic">$287,000</em>
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto mb-4 leading-relaxed">
            That&apos;s the average IRS deficiency for Act 60 holders. A review
            isn&apos;t an expense &mdash; it&apos;s insurance against a six-figure assessment.
          </p>

          {/* Alt cost frame */}
          <p className="text-sm text-accent/80 font-medium mb-10">
            {brand.altCostFrame}
          </p>

          <p className="text-xs text-red-400/60 mb-3">
            Filing deadline is {daysLeft} days away
          </p>

          <a
            href="#pricing"
            className="group inline-flex items-center gap-3 bg-accent text-navy-900 font-semibold text-sm px-10 py-5 tracking-wide uppercase transition-all duration-300 hover:bg-accent-light glow-accent"
          >
            {brand.ctaText}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <div className="mt-6 flex justify-center">
            <GuaranteeBadge size="md" />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-500 uppercase tracking-[0.12em]">
            {brand.trustBadges.map((badge, i) => (
              <span key={badge} className="flex items-center gap-5">
                {i > 0 && <span className="w-[3px] h-[3px] rounded-full bg-slate-700" />}
                <span>{badge}</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
