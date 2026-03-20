'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

const threats = [
  {
    stat: '100+',
    label: 'Active Investigations',
    description: 'Campaign 685 specifically targets Puerto Rico tax incentive abuse.',
    source: 'GAO Report GAO-26-107225',
    color: 'text-red-400',
  },
  {
    stat: '$287K',
    label: 'Average Deficiency',
    description: 'Average IRS assessment — not including penalties and interest.',
    source: 'IRS SBSE Division Data, 2025',
    color: 'text-red-400',
  },
  {
    stat: '40%',
    label: 'TP Penalty Rate',
    description: 'Gross valuation misstatements trigger a 40% penalty under IRC \u00A76662(h).',
    source: 'IRC \u00A76662(h), PR Code \u00A71033.17',
    color: 'text-red-400',
  },
  {
    stat: '$2.3B',
    label: 'Exempt Income',
    description: 'Total claimed by decree holders — every return is a high-value audit target.',
    source: 'DDEC Performance Evaluation, 2024',
    color: 'text-slate-300',
  },
  {
    stat: '85%',
    label: 'CPA Dissatisfaction',
    description: 'Missed deadlines, vague advice, overlooked FBAR filings, overcharging.',
    source: 'Community Forum Research',
    color: 'text-slate-300',
  },
  {
    stat: '0',
    label: 'AI Tools Available',
    description: 'Zero AI-powered review tools for PR. Your CPA is your only defense. Until now.',
    source: 'SimilarWeb, March 2026',
    color: 'text-accent',
  },
]

function AnimatedNumber({ value, suffix = '' }: { value: string; suffix?: string }) {
  const [display, setDisplay] = useState(value)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  const animate = useCallback(() => {
    if (hasAnimated.current) return
    hasAnimated.current = true

    const numericPart = value.replace(/[^0-9.]/g, '')
    const prefix = value.replace(/[0-9.+]/g, '')
    const target = parseFloat(numericPart)

    if (isNaN(target)) {
      setDisplay(value)
      return
    }

    const duration = 1500
    const start = performance.now()

    function step(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * target)

      if (value.includes('K')) {
        setDisplay(`${prefix}${current}K`)
      } else if (value.includes('B')) {
        setDisplay(`${prefix}${(eased * target).toFixed(1)}B`)
      } else {
        setDisplay(`${prefix}${current}${suffix}`)
      }

      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        setDisplay(value)
      }
    }

    requestAnimationFrame(step)
  }, [value, suffix])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate()
        }
      },
      { threshold: 0.3 }
    )
    const el = ref.current
    if (el) observer.observe(el)
    return () => { if (el) observer.unobserve(el) }
  }, [animate])

  return <div ref={ref}>{display}</div>
}

interface ThreatSectionProps {
  brand?: { id: string; tier: string }
}

export default function ThreatSection({ brand }: ThreatSectionProps) {
  const sectionTitle = brand?.tier === 'defense'
    ? 'Why You Need a Shield'
    : brand?.tier === 'diy'
    ? 'Why You Should Check Now'
    : 'The IRS Is Not Bluffing'

  const sectionSubtitle = brand?.tier === 'defense'
    ? 'IRS Campaign 685 is actively targeting decree holders. These numbers explain why audit defense matters.'
    : brand?.tier === 'diy'
    ? 'A quick scan today could prevent a six-figure assessment tomorrow.'
    : 'Every number below is from government reports. This is the reality Act 60 holders face today.'
  return (
    <section className="relative py-28 bg-navy-800/50 noise">
      <div className="section-line" />

      {/* Red ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(239,68,68,0.04),transparent)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          className="text-center mb-16"
        >
          <p className="text-red-400/80 font-sans text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            The Enforcement Landscape
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-slate-100 mb-5 tracking-tight">
            {sectionTitle}
          </h2>
          <p className="text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            {sectionSubtitle}
          </p>
        </motion.div>

        {/* Threat grid — editorial style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04] border border-white/[0.04] overflow-hidden">
          {threats.map((threat, index) => (
            <motion.div
              key={threat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: index * 0.08 }}
              className="bg-navy-900 p-5 sm:p-8 hover:bg-white/[0.01] transition-colors duration-300"
            >
              <div className={`font-sans text-4xl font-bold tracking-tight mb-1 ${threat.color}`}>
                <AnimatedNumber value={threat.stat} />
              </div>
              <p className="text-xs font-semibold text-red-400/70 uppercase tracking-[0.1em] mb-3">
                {threat.label}
              </p>
              <p className="text-sm text-slate-400 leading-relaxed mb-3">
                {threat.description}
              </p>
              <p className="text-[11px] text-slate-600">
                {threat.source}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
