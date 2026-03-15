'use client'

import { motion } from 'framer-motion'
import { Upload, Brain, FileCheck, Shield } from 'lucide-react'
import type { BrandConfig } from '@/config/brands'

const steps = [
  {
    icon: Upload,
    number: '01',
    title: 'Upload Your Return',
    description: 'Securely upload your PR tax return (Planilla), federal return, and supporting documents. 256-bit encrypted. Deleted after review.',
    time: '2 minutes',
  },
  {
    icon: Brain,
    number: '02',
    title: 'AI Analyzes Everything',
    description: 'Our AI engine cross-references your return against 200+ Act 60 compliance rules, IRS enforcement patterns, and common CPA errors.',
    time: '15 minutes',
  },
  {
    icon: FileCheck,
    number: '03',
    title: 'CPA Verifies Findings',
    description: 'A licensed Puerto Rico CPA reviews every finding. No false positives. No generic advice. Every issue includes specific fix instructions.',
    time: 'Within 24 hours',
  },
  {
    icon: Shield,
    number: '04',
    title: 'Get Your Report',
    description: 'Receive a comprehensive report with your compliance score, prioritized findings, and step-by-step remediation guide.',
    time: 'Delivered via secure portal',
  },
]

interface HowItWorksProps {
  brand: BrandConfig
}

export default function HowItWorks({ brand }: HowItWorksProps) {
  return (
    <section id="how-it-works" className="relative py-24 bg-gray-950">
      {/* Subtle gradient divider */}
      <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">
            How It Works
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Four Steps to Certainty
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Upload. Analyze. Verify. Done. No phone calls, no billable hours, no waiting weeks for a callback.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[calc(100%_-_16px)] w-[calc(100%_-_32px)] h-px bg-gradient-to-r from-gray-700 to-gray-800" />
              )}

              <div className="bg-gray-900/30 border border-gray-800/50 rounded-2xl p-6 h-full hover:border-blue-900/30 transition-all">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${brand.colors.gradient} mb-4`}>
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-xs font-mono text-gray-600 mb-2">STEP {step.number}</p>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-3">
                  {step.description}
                </p>
                <p className="text-xs text-blue-400 font-medium">{step.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
