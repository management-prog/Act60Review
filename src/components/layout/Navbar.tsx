'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, Menu, X } from 'lucide-react'
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
    { href: '#faq', label: 'FAQ' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-400" />
            <span className="text-lg font-bold text-white">{brand.name}</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/upload"
              className={`bg-gradient-to-r ${brand.colors.gradient} text-white text-sm font-semibold px-5 py-2 rounded-lg hover:scale-105 transition-all`}
            >
              Start Review
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-gray-400 hover:text-white"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-gray-950 border-t border-gray-800 py-4"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-gray-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="px-4 pt-2">
              <a
                href="/upload"
                className={`block text-center bg-gradient-to-r ${brand.colors.gradient} text-white font-semibold px-5 py-3 rounded-lg`}
              >
                Start Review
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
