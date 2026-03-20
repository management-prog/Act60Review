'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { BrandConfig } from '@/config/brands'

interface StickyMobileCTAProps {
  brand: BrandConfig
}

export default function StickyMobileCTA({ brand }: StickyMobileCTAProps) {
  const [visible, setVisible] = useState(false)

  const lowestPrice = brand.tiers.reduce(
    (min, tier) => (tier.price < min ? tier.price : min),
    brand.tiers[0].price
  )

  useEffect(() => {
    const heroEl = document.querySelector('section')
    if (!heroEl) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting)
      },
      { threshold: 0 }
    )

    observer.observe(heroEl)
    return () => observer.disconnect()
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
          style={{ backgroundColor: brand.colors.bgPrimary + 'e6' }}
        >
          <div className="backdrop-blur-xl border-t border-white/[0.06] px-4 py-3">
            <a
              href="#pricing"
              className="flex items-center justify-center gap-3 bg-accent text-navy-900 font-semibold text-sm px-6 py-3 tracking-wide uppercase transition-all duration-300 hover:bg-accent-light w-full"
            >
              <span>{brand.ctaText}</span>
              <span className="text-navy-900/60 font-normal normal-case tracking-normal">
                from ${lowestPrice}
              </span>
              <ArrowRight className="w-4 h-4 ml-auto" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
