'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, FileWarning, Scale, DollarSign, Search, Users } from 'lucide-react'

// Captology: Credibility through specificity + loss aversion
const threats = [
  {
    icon: Search,
    stat: '100+',
    label: 'Active IRS Investigations',
    description: 'The IRS has over 100 Act 60 holders under active investigation. Campaign 685 specifically targets Puerto Rico tax incentive abuse.',
    source: 'GAO Report GAO-26-107225, December 2025',
  },
  {
    icon: DollarSign,
    stat: '$287K',
    label: 'Average Audit Deficiency',
    description: 'When the IRS finds errors in Act 60 returns, the average assessment is $287,000 — not including penalties and interest.',
    source: 'IRS SBSE Division Data, 2025',
  },
  {
    icon: FileWarning,
    stat: '40%',
    label: 'Transfer Pricing Penalty',
    description: 'Gross valuation misstatements on transfer pricing trigger a 40% penalty. Puerto Rico\'s 51% disallowance rule compounds the risk.',
    source: 'IRC §6662(h), PR Code §1033.17',
  },
  {
    icon: Scale,
    stat: '$2.3B',
    label: 'Total Exempt Income',
    description: 'Act 60 holders claimed $2.3 billion in exempt income. This concentrated wealth makes every return a high-value audit target.',
    source: 'DDEC Performance Evaluation, 2024',
  },
  {
    icon: Users,
    stat: '85%',
    label: 'Holders Report CPA Issues',
    description: 'Community surveys show widespread CPA dissatisfaction — missed deadlines, vague advice, overlooked FBAR filings, and overcharging.',
    source: 'Act 60 Community Forum Research',
  },
  {
    icon: AlertTriangle,
    stat: '0',
    label: 'AI Tools Serving This Market',
    description: 'There are zero AI-powered tax review tools for Puerto Rico. Your CPA is your only line of defense. Now there\'s an alternative.',
    source: 'SimilarWeb Market Analysis, March 2026',
  },
]

export default function ThreatSection() {
  return (
    <section className="relative py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header — Captology: fear appeal framing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-red-400 font-semibold text-sm uppercase tracking-widest mb-3">
            The Enforcement Landscape
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            The IRS Is Not Bluffing
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Every data point below is sourced from government reports. This is not speculation — it&apos;s the reality Act 60 holders face today.
          </p>
        </motion.div>

        {/* Threat grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {threats.map((threat, index) => (
            <motion.div
              key={threat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-red-900/50 transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-2 bg-red-950/50 rounded-lg">
                  <threat.icon className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">{threat.stat}</p>
                  <p className="text-sm font-semibold text-red-400">{threat.label}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-3">
                {threat.description}
              </p>
              <p className="text-xs text-gray-600 italic">
                Source: {threat.source}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
