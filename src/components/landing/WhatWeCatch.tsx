'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const categories = [
  {
    title: 'IRC 933 Exclusion Errors',
    severity: 'critical' as const,
    description: 'Incorrect exclusion calculations, missing elections, improperly sourced income.',
    example: 'Investment income before residency claimed as excluded.',
    irsCode: 'IRC \u00a7933, \u00a7937(a)',
    penalty: 'Penalty: 20\u201375% of underpayment',
    howWeCatch: 'Cross-references income sourcing against residency start date, verifies election filings, and flags income types ineligible for exclusion.',
  },
  {
    title: 'Transfer Pricing Red Flags',
    severity: 'critical' as const,
    description: 'Intercompany transactions not at arm\'s length, missing documentation.',
    example: 'S-Corp pays PR entity 90% of revenue as "services" \u2014 manufactured loss.',
    irsCode: 'IRC \u00a7482, Treas. Reg. \u00a71.482-1',
    penalty: 'Penalty: 20\u201340% of transfer pricing adjustment',
    howWeCatch: 'Analyzes intercompany ratios against industry benchmarks, flags revenue concentrations above 70%, and checks for contemporaneous documentation.',
  },
  {
    title: 'FBAR & FATCA Gaps',
    severity: 'critical' as const,
    description: 'Missing FinCEN 114, incomplete Form 8938, unreported accounts.',
    example: 'Cayman trust not on FBAR \u2014 $100K+ penalty per year.',
    irsCode: 'BSA \u00a75321, IRC \u00a76038D',
    penalty: 'Penalty: $10K\u2013$100K+ per account per year (willful)',
    howWeCatch: 'Maps disclosed accounts across FBAR, 8938, and 3520 filings to identify missing or inconsistent reporting.',
  },
  {
    title: 'Residency Test Failures',
    severity: 'high' as const,
    description: 'Insufficient presence days, missing closer connection documentation.',
    example: '187 days in PR but LinkedIn says "New York."',
    irsCode: 'IRC \u00a7937(a), \u00a77701(b)',
    penalty: 'Penalty: Full loss of Act 60 benefits + back taxes',
    howWeCatch: 'Counts presence days from travel records, flags social media / voter registration inconsistencies, verifies tax home documentation.',
  },
  {
    title: 'Missing Forms',
    severity: 'high' as const,
    description: 'Absent schedules, wrong filing status, missing 480 series returns.',
    example: 'Form 480.6 EC not filed \u2014 tax treatment disallowed.',
    irsCode: 'PR Code \u00a71062.08, Form 480 Series',
    penalty: 'Penalty: Disallowance of preferential tax rate + penalties',
    howWeCatch: 'Checks filing inventory against decree requirements, verifies 480.6 EC / 480.7 are filed with correct amounts.',
  },
  {
    title: 'Capital Gains Sourcing',
    severity: 'medium' as const,
    description: 'Pre-move appreciation, incorrect holding periods, wash sales.',
    example: 'Pre-2022 appreciation is NOT exempt under Act 60.',
    irsCode: 'Act 60 \u00a72022.03(b), IRC \u00a71001',
    penalty: 'Penalty: 15\u201320% federal capital gains tax on pre-move gains',
    howWeCatch: 'Calculates FMV at residency date using historical price data, separates pre/post-move appreciation, flags wash sale violations.',
  },
]

const severityStyles = {
  critical: { border: 'border-red-500/20', text: 'text-red-400', bg: 'bg-red-500/[0.06]' },
  high: { border: 'border-orange-500/20', text: 'text-orange-400', bg: 'bg-orange-500/[0.06]' },
  medium: { border: 'border-yellow-500/20', text: 'text-yellow-400', bg: 'bg-yellow-500/[0.06]' },
}

interface WhatWeCatchProps {
  brand?: { id: string; tier: string }
}

export default function WhatWeCatch({ brand }: WhatWeCatchProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const sectionTitle = brand?.tier === 'defense'
    ? 'What Auditors Target'
    : brand?.tier === 'diy'
    ? 'What Your Scan Checks'
    : '200+ Rules. Eight Categories.'

  const sectionSubtitle = brand?.tier === 'defense'
    ? 'IRS Campaign 685 agents focus on these exact compliance areas during Act 60 audits.'
    : brand?.tier === 'diy'
    ? 'Our AI scans for the same issues that trigger IRS enforcement actions.'
    : 'The exact issues that trigger audits and enforcement actions.'
  return (
    <section className="relative py-28 bg-navy-800/50 noise">
      <div className="section-line" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          className="text-center mb-16"
        >
          <p className="text-accent/80 font-sans text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            What We Catch
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-slate-100 mb-5 tracking-tight">
            {sectionTitle}
          </h2>
          <p className="text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            {sectionSubtitle}
          </p>
        </motion.div>

        {/* Grid table layout — editorial */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.04] border border-white/[0.04]">
          {categories.map((cat, index) => {
            const style = severityStyles[cat.severity]
            const isExpanded = expandedIndex === index
            return (
              <motion.div
                key={cat.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: index * 0.06 }}
                className="bg-navy-900 p-7 hover:bg-white/[0.01] transition-colors duration-300"
              >
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                  <h3 className="text-base font-semibold text-slate-100">{cat.title}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 border uppercase tracking-[0.1em] shrink-0 ${style.border} ${style.text} ${style.bg}`}>
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

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-white/[0.04] space-y-2">
                        <p className="text-xs text-accent/80 font-semibold tracking-wide">
                          {cat.irsCode}
                        </p>
                        <p className="text-xs text-red-400/80 font-medium">
                          {cat.penalty}
                        </p>
                        <p className="text-sm text-slate-400 leading-relaxed">
                          <span className="text-slate-300 font-medium">How we catch it: </span>
                          {cat.howWeCatch}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className="mt-3 text-xs text-accent/70 hover:text-accent font-semibold tracking-wide uppercase transition-colors duration-200"
                >
                  {isExpanded ? 'Show less' : 'Learn more'}
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
