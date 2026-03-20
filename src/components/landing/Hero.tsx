'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, AlertTriangle } from 'lucide-react'
import type { BrandConfig } from '@/config/brands'
import GuaranteeBadge from '@/components/ui/GuaranteeBadge'

interface HeroProps {
  brand: BrandConfig
}

function getCurrentMonthYear(): string {
  const now = new Date()
  const month = now.toLocaleString('en-US', { month: 'long' })
  const year = now.getFullYear()
  return `${month} ${year}`
}

const tickerItems = [
  'IRS Campaign 685 actively targeting Act 60 holders',
  '100+ decree holders under investigation (GAO Report)',
  'Average audit deficiency: $287,000',
  'PR Hacienda sharing data with IRS since 2024',
  '40% penalty for gross transfer pricing misstatements',
  'BDO PR Tax Division head indicted for Act 60 violations',
  `Updated ${getCurrentMonthYear()}: IRS allocating $80M+ to Act 60 enforcement`,
]

function ComplianceGauge() {
  const radius = 36
  const circumference = 2 * Math.PI * radius
  const score = 47
  const offset = circumference - (score / 100) * circumference

  return (
    <svg width="96" height="96" viewBox="0 0 96 96" className="block">
      <circle
        cx="48"
        cy="48"
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="6"
      />
      <circle
        cx="48"
        cy="48"
        r={radius}
        fill="none"
        stroke="url(#gaugeGradient)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 48 48)"
      />
      <defs>
        <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
      </defs>
      <text
        x="48"
        y="44"
        textAnchor="middle"
        className="fill-slate-100 text-lg font-semibold"
        style={{ fontSize: '18px', fontWeight: 600 }}
      >
        47/100
      </text>
      <text
        x="48"
        y="60"
        textAnchor="middle"
        className="fill-slate-500"
        style={{ fontSize: '9px', letterSpacing: '0.05em' }}
      >
        COMPLIANCE
      </text>
    </svg>
  )
}

function FloatingCards() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="hidden lg:block absolute inset-0 pointer-events-none" aria-hidden="true">
      {/* Compliance Score Gauge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="glass-accent absolute top-32 right-12 xl:right-24 rounded-xl p-4 shadow-lg"
        style={{
          animation: 'float 20s ease-in-out infinite',
          willChange: 'transform',
        }}
      >
        <ComplianceGauge />
      </motion.div>

      {/* Notification Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="glass absolute top-72 right-4 xl:right-12 rounded-lg px-4 py-3 shadow-lg"
        style={{
          animation: 'float 20s ease-in-out infinite 7s',
          willChange: 'transform',
        }}
      >
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
          </span>
          <span className="text-sm text-slate-300 font-medium whitespace-nowrap">
            3 critical issues found
          </span>
        </div>
      </motion.div>

      {/* CPA Verified Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="glass-accent absolute top-[22rem] right-32 xl:right-44 rounded-full px-3.5 py-2 shadow-lg"
        style={{
          animation: 'float 20s ease-in-out infinite 14s',
          willChange: 'transform',
        }}
      >
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
            <circle cx="8" cy="8" r="8" fill="#22C55E" fillOpacity="0.2" />
            <path d="M5 8L7 10L11 6" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-xs text-slate-300 font-semibold tracking-wide whitespace-nowrap">
            CPA Verified
          </span>
        </div>
      </motion.div>
    </div>
  )
}

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
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-3 overflow-hidden">
          <span className="flex items-center justify-center w-5 h-5 shrink-0 rounded-full bg-red-500/15 pulse-ring">
            <AlertTriangle className="w-3 h-3 text-red-400" />
          </span>
          <AnimatePresence mode="wait">
            <motion.p
              key={tickerIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="text-xs sm:text-sm text-red-300/80 font-medium tracking-wide min-w-0"
            >
              {tickerItems[tickerIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Main hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-36">
        {/* Floating glassmorphism cards — lg+ only */}
        <FloatingCards />

        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-accent font-sans text-xs font-semibold uppercase tracking-[0.25em] mb-8"
          >
            AI-Powered Compliance Review
          </motion.p>

          {/* Headline — Playfair Display */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-[-0.02em] leading-[1.08] mb-8 text-slate-100"
          >
            {brand.heroHeadline}{' '}
            <em className="text-accent italic">{brand.heroHighlight}</em>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-lg sm:text-xl text-slate-400 max-w-xl leading-relaxed mb-10"
          >
            {brand.heroSubheadline}
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
              className="group inline-flex items-center gap-3 bg-accent text-navy-900 font-semibold text-sm px-5 sm:px-8 py-4 tracking-wide uppercase transition-all duration-300 hover:bg-accent-light hover:shadow-[0_0_50px_rgba(201,169,110,0.2)]"
            >
              {brand.ctaText}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 font-medium text-sm px-6 py-4 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
            >
              {brand.ctaSecondary}
            </a>
          </motion.div>

          {/* Guarantee badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-8"
          >
            <GuaranteeBadge size="md" />
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500 uppercase tracking-[0.12em]"
          >
            {brand.trustBadges.map((badge, i) => (
              <span key={badge} className="flex items-center gap-5">
                {i > 0 && <span className="w-[3px] h-[3px] rounded-full bg-slate-700" />}
                <span>{badge}</span>
              </span>
            ))}
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
            className="w-0.5 h-1.5 rounded-full bg-accent/50"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
