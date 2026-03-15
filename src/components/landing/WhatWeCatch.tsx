'use client'

import { motion } from 'framer-motion'
import {
  FileX,
  ArrowLeftRight,
  Globe,
  MapPin,
  Calculator,
  Landmark,
  TrendingUp,
  FileText,
} from 'lucide-react'

// Captology: Specificity builds credibility. Each finding references real IRC/PR code sections.
const categories = [
  {
    icon: Calculator,
    title: 'IRC 933 Exclusion Errors',
    description: 'Incorrect exclusion calculations, missing elections, improperly sourced income treated as PR-source.',
    example: 'Common miss: Investment income earned before establishing bona fide residency claimed as excluded.',
    severity: 'critical',
  },
  {
    icon: ArrowLeftRight,
    title: 'Transfer Pricing Red Flags',
    description: 'Intercompany transactions not at arm\'s length, missing TP documentation, PR 51% disallowance exposure.',
    example: 'Your mainland S-Corp pays your PR entity 90% of revenue as "services" — IRS sees a manufactured loss.',
    severity: 'critical',
  },
  {
    icon: Globe,
    title: 'FBAR & FATCA Gaps',
    description: 'Missing FinCEN 114, incomplete Form 8938, unreported foreign accounts or signature authority.',
    example: 'Your Cayman trust account wasn\'t reported on FBAR — that\'s a $100K+ penalty per year.',
    severity: 'critical',
  },
  {
    icon: MapPin,
    title: 'Residency Test Failures',
    description: 'Insufficient presence days, missing closer connection documentation, tax home inconsistencies.',
    example: 'You spent 187 days in PR but your LinkedIn still says "New York" — IRS will challenge residency.',
    severity: 'high',
  },
  {
    icon: FileX,
    title: 'Missing or Incorrect Forms',
    description: 'Absent schedules, wrong filing status, missing informative returns (480 series), unsigned elections.',
    example: 'Form 480.6 EC not filed for your PR LLC — Hacienda can disallow the entity\'s tax treatment.',
    severity: 'high',
  },
  {
    icon: Landmark,
    title: 'Decree Term Violations',
    description: 'Activities outside decree scope, expired provisions, non-compliance with annual reporting.',
    example: 'Your decree covers "technology consulting" but you reported income from "real estate management."',
    severity: 'high',
  },
  {
    icon: TrendingUp,
    title: 'Capital Gains Sourcing',
    description: 'Pre-move appreciation taxed at federal rates, incorrect holding period calculations, wash sale issues.',
    example: 'Stock purchased in 2019, sold in 2025 — the pre-move appreciation from 2019-2022 is NOT exempt.',
    severity: 'medium',
  },
  {
    icon: FileText,
    title: 'CPA Quality Issues',
    description: 'Missed deadlines, inconsistent positions between PR and federal returns, copy-paste errors.',
    example: 'Your federal return claims $0 PR income but your Planilla shows $450K — IRS sees this mismatch instantly.',
    severity: 'medium',
  },
]

const severityColors: Record<string, string> = {
  critical: 'bg-red-950/50 text-red-400 border-red-900/30',
  high: 'bg-orange-950/50 text-orange-400 border-orange-900/30',
  medium: 'bg-yellow-950/50 text-yellow-400 border-yellow-900/30',
}

export default function WhatWeCatch() {
  return (
    <section className="relative py-24 bg-gray-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">
            What We Catch
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            200+ Compliance Rules.<br />Eight Critical Categories.
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            These are the exact issues that trigger IRS audits and Hacienda enforcement actions. Your CPA may have missed them.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-gray-800 rounded-lg shrink-0">
                  <cat.icon className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{cat.title}</h3>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${severityColors[cat.severity]}`}>
                      {cat.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{cat.description}</p>
                  {/* Captology: Concrete example makes abstract threat real */}
                  <div className="bg-gray-950/50 border border-gray-800/50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Example Finding</p>
                    <p className="text-sm text-gray-300 italic">&ldquo;{cat.example}&rdquo;</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
