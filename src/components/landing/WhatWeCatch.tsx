'use client'

import { motion } from 'framer-motion'

const categories = [
  {
    title: 'IRC 933 Exclusion Errors',
    severity: 'critical' as const,
    description: 'Incorrect exclusion calculations, missing elections, improperly sourced income.',
    example: 'Investment income before residency claimed as excluded.',
  },
  {
    title: 'Transfer Pricing Red Flags',
    severity: 'critical' as const,
    description: 'Intercompany transactions not at arm\'s length, missing documentation.',
    example: 'S-Corp pays PR entity 90% of revenue as "services" \u2014 manufactured loss.',
  },
  {
    title: 'FBAR & FATCA Gaps',
    severity: 'critical' as const,
    description: 'Missing FinCEN 114, incomplete Form 8938, unreported accounts.',
    example: 'Cayman trust not on FBAR \u2014 $100K+ penalty per year.',
  },
  {
    title: 'Residency Test Failures',
    severity: 'high' as const,
    description: 'Insufficient presence days, missing closer connection documentation.',
    example: '187 days in PR but LinkedIn says "New York."',
  },
  {
    title: 'Missing Forms',
    severity: 'high' as const,
    description: 'Absent schedules, wrong filing status, missing 480 series returns.',
    example: 'Form 480.6 EC not filed \u2014 tax treatment disallowed.',
  },
  {
    title: 'Capital Gains Sourcing',
    severity: 'medium' as const,
    description: 'Pre-move appreciation, incorrect holding periods, wash sales.',
    example: 'Pre-2022 appreciation is NOT exempt under Act 60.',
  },
]

const severityStyles = {
  critical: { border: 'border-red-500/20', text: 'text-red-400', bg: 'bg-red-500/[0.06]' },
  high: { border: 'border-orange-500/20', text: 'text-orange-400', bg: 'bg-orange-500/[0.06]' },
  medium: { border: 'border-yellow-500/20', text: 'text-yellow-400', bg: 'bg-yellow-500/[0.06]' },
}

export default function WhatWeCatch() {
  return (
    <section className="relative py-28 bg-navy-800/50 noise">
      <div className="section-line" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-gold/80 font-sans text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            What We Catch
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-slate-100 mb-5 tracking-tight">
            200+ Rules. Eight Categories.
          </h2>
          <p className="text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            The exact issues that trigger audits and enforcement actions.
          </p>
        </motion.div>

        {/* Grid table layout — editorial */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.04] border border-white/[0.04]">
          {categories.map((cat, index) => {
            const style = severityStyles[cat.severity]
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="bg-navy-900 p-7 hover:bg-white/[0.01] transition-colors duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-base font-semibold text-slate-100">{cat.title}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 border uppercase tracking-[0.1em] ${style.border} ${style.text} ${style.bg}`}>
                    {cat.severity}
                  </span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mb-3">
                  {cat.description}
                </p>
                <div className="border-l-2 border-white/[0.06] pl-3">
                  <p className="text-sm text-slate-500 italic leading-relaxed">
                    &ldquo;{cat.example}&rdquo;
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
