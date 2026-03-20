'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import type { BrandConfig } from '@/config/brands'

interface NavbarProps {
  brand: BrandConfig
}

export default function Navbar({ brand }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#pricing', label: 'Pricing' },
    { href: '/lead-magnet', label: 'Free Checklist' },
    { href: '#faq', label: 'FAQ' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-navy-900/85 backdrop-blur-2xl border-b border-white/[0.05] shadow-[0_1px_40px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <a href="/" className="flex items-center gap-0.5 group">
            <span className="font-serif text-lg text-slate-100 tracking-tight">
              {brand.logoName[0]}
            </span>
            <span className="font-serif text-lg text-accent font-semibold tracking-tight">
              {brand.logoName[1]}
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] text-slate-500 hover:text-slate-200 px-4 py-2 font-medium tracking-wide transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <div className="w-px h-4 bg-white/[0.06] mx-3" />
            <a
              href="#pricing"
              className="group inline-flex items-center gap-2 text-accent text-[13px] font-semibold tracking-[0.08em] uppercase border border-accent/25 px-5 py-2.5 hover:bg-accent/[0.06] hover:border-accent/40 transition-all duration-300"
            >
              Start Review
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-slate-400 hover:text-slate-200 p-2 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="glass-strong rounded-lg mb-4 p-2">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-slate-300 hover:text-slate-100 hover:bg-white/[0.03] rounded-lg transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="px-2 pt-2 pb-1">
                  <a
                    href="#pricing"
                    onClick={() => setMobileOpen(false)}
                    className="block text-center bg-accent text-navy-900 font-semibold text-sm px-5 py-3 tracking-wide uppercase"
                  >
                    Start Review
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
