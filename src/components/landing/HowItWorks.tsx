'use client'

import { motion } from 'framer-motion'
import type { BrandConfig } from '@/config/brands'

interface HowItWorksProps {
  brand: BrandConfig
}

const steps = [
  {
    number: '01',
    title: 'Upload Your Return',
    description: 'Securely upload your Planilla, federal return, and supporting docs. 256-bit encrypted.',
    time: '2 Minutes',
  },
  {
    number: '02',
    title: 'AI Analyzes Everything',
    description: 'Cross-references against 200+ compliance rules, IRS patterns, and common CPA errors.',
    time: '15 Minutes',
  },
  {
    number: '03',
    title: 'CPA Verifies Findings',
    description: 'Licensed PR CPA reviews every finding. No false positives. Specific fix instructions.',
    time: 'Within 24 Hours',
  },
  {
    number: '04',
    title: 'Get Your Report',
    description: 'Compliance score, prioritized findings, step-by-step remediation guide.',
    time: 'Secure Delivery',
  },
]

export default function HowItWorks({ brand }: HowItWorksProps) {
  return (
    <section id="how-it-works" className="relative py-28 bg-navy-900 noise">
      <div className="section-line" />

      {/* Subtle gold ambient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_30%_at_50%_50%,rgba(201,169,110,0.03),transparent)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-gold/80 font-sans text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            How It Works
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-slate-100 mb-5 tracking-tight">
            Four Steps to Certainty
          </h2>
          <p className="text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            Upload. Analyze. Verify. Done. No phone calls, no billable hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              className="relative px-6 lg:px-8 py-8 text-center lg:text-left"
            >
              {/* Vertical divider between steps */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 right-0 w-px h-16 bg-gradient-to-b from-white/[0.06] to-transparent" />
              )}

              {/* Step number */}
              <p className="font-serif text-5xl text-gold/[0.08] mb-4">{step.number}</p>

              <h3 className="font-sans text-base font-semibold text-slate-100 mb-2 tracking-tight">
                {step.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                {step.description}
              </p>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-gold/70 font-semibold tracking-[0.08em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-gold/40" />
                {step.time}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
