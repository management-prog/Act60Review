'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, ArrowRight, AlertTriangle } from 'lucide-react'
import type { BrandConfig } from '@/config/brands'

interface HeroProps {
  brand: BrandConfig
}

// Captology: Loss aversion ticker — shows real enforcement stats
const tickerItems = [
  'IRS Campaign 685 actively targeting Act 60 holders',
  '100+ decree holders under investigation (GAO Report)',
  'Average audit deficiency: $287,000',
  'PR Hacienda sharing data with IRS since 2024',
  '40% penalty for gross transfer pricing misstatements',
  'BDO PR Tax Division head indicted for Act 60 violations',
]

export default function Hero({ brand }: HeroProps) {
  const [tickerIndex, setTickerIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % tickerItems.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />
      <div className={`absolute inset-0 bg-gradient-to-br ${brand.colors.gradient} opacity-5`} />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Threat ticker — Captology: urgency + loss aversion */}
      <div className="relative z-10 bg-red-950/40 border-b border-red-900/30 py-2">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
          <motion.p
            key={tickerIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm text-red-300 font-medium"
          >
            {tickerItems[tickerIndex]}
          </motion.p>
        </div>
      </div>

      {/* Main hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust badge — Captology: authority */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-blue-950/50 border border-blue-800/30 rounded-full px-4 py-1.5 mb-8"
          >
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300 font-medium">
              CPA-Verified AI Review • SOC 2 Compliant
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            {brand.heroHeadline.split('\n').map((line, i) => (
              <span key={i}>
                {i === 1 ? (
                  <span className={`text-gradient bg-gradient-to-r ${brand.colors.gradient}`}>
                    {line}
                  </span>
                ) : (
                  <span className="text-white">{line}</span>
                )}
                {i === 0 && <br />}
              </span>
            ))}
          </motion.h1>

          {/* Subheadline — Captology: fear appeal + quantified threat */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {brand.heroSubheadline}
          </motion.p>

          {/* CTA Buttons — Captology: tunneling (single clear action) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#pricing"
              className={`group inline-flex items-center gap-2 bg-gradient-to-r ${brand.colors.gradient} text-white font-semibold text-lg px-8 py-4 rounded-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 glow`}
            >
              {brand.ctaText}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white font-medium text-lg px-8 py-4 rounded-xl border border-gray-800 hover:border-gray-600 transition-all"
            >
              {brand.ctaSecondary}
            </a>
          </motion.div>

          {/* Social proof — Captology: social validation */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 text-sm text-gray-500"
          >
            {brand.socialProof}
          </motion.p>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 rounded-full border-2 border-gray-700 flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-gray-500" />
        </motion.div>
      </motion.div>
    </section>
  )
}
