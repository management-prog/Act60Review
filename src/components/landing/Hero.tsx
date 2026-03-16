'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, AlertTriangle } from 'lucide-react'
import type { BrandConfig } from '@/config/brands'

interface HeroProps {
  brand: BrandConfig
}

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
    }, 4500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Deep navy background */}
      <div className="absolute inset-0 bg-navy-900" />

      {/* Animated gradient orbs — Stripe/Linear style */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-[70%] h-[70%] rounded-full blur-[120px] opacity-[0.12]"
          style={{
            top: '-20%',
            right: '-15%',
            background: 'radial-gradient(circle, #C9A96E, transparent 70%)',
            animation: 'float 20s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-[50%] h-[50%] rounded-full blur-[100px] opacity-[0.06]"
          style={{
            bottom: '-15%',
            left: '-10%',
            background: 'radial-gradient(circle, #3B82F6, transparent 70%)',
            animation: 'float 20s ease-in-out infinite -10s',
          }}
        />
        <div
          className="absolute w-[40%] h-[40%] rounded-full blur-[120px] opacity-[0.08]"
          style={{
            top: '30%',
            left: '15%',
            background: 'radial-gradient(circle, #C9A96E, transparent 70%)',
            animation: 'float 25s ease-in-out infinite -5s',
          }}
        />
      </div>

      {/* Noise texture */}
      <div className="noise absolute inset-0 pointer-events-none" />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: 'linear-gradient(rgba(201,169,110,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.15) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 40%, black, transparent)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 40%, black, transparent)',
        }}
      />

      {/* Spacer for fixed navbar */}
      <div className="h-[72px] shrink-0" />

      {/* Threat ticker */}
      <div className="relative z-10 border-b border-red-900/20 bg-red-950/10 backdrop-blur-sm py-2.5">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-3">
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-500/15 pulse-ring">
            <AlertTriangle className="w-3 h-3 text-red-400" />
          </span>
          <AnimatePresence mode="wait">
            <motion.p
              key={tickerIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="text-sm text-red-300/80 font-medium tracking-wide"
            >
              {tickerItems[tickerIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Main hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-36">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gold font-sans text-xs font-semibold uppercase tracking-[0.25em] mb-8"
          >
            AI-Powered Compliance Review
          </motion.p>

          {/* Headline — Playfair Display */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal tracking-[-0.02em] leading-[1.08] mb-8 text-slate-100"
          >
            Is Your Act 60 Return{' '}
            <em className="text-gold italic">Bulletproof?</em>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-lg sm:text-xl text-slate-400 max-w-xl leading-relaxed mb-10"
          >
            The IRS is investigating 100+ decree holders. Our AI reviews your return against 200+ compliance rules in under 24 hours — catching the errors that trigger audits.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <a
              href="#pricing"
              className="group inline-flex items-center gap-3 bg-gold text-navy-900 font-semibold text-sm px-8 py-4 tracking-wide uppercase transition-all duration-300 hover:bg-gold-light hover:shadow-[0_0_50px_rgba(201,169,110,0.2)]"
            >
              Get Your Review
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 font-medium text-sm px-6 py-4 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
            >
              See What We Catch
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-14 flex items-center gap-5 text-xs text-slate-500 uppercase tracking-[0.12em]"
          >
            <span>CPA-Verified</span>
            <span className="w-[3px] h-[3px] rounded-full bg-slate-700" />
            <span>SOC 2 Compliant</span>
            <span className="w-[3px] h-[3px] rounded-full bg-slate-700" />
            <span>256-bit Encryption</span>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-white/[0.08] flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            className="w-0.5 h-1.5 rounded-full bg-gold/50"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
