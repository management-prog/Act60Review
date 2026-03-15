'use client'

import { Shield } from 'lucide-react'
import type { BrandConfig } from '@/config/brands'

interface FooterProps {
  brand: BrandConfig
}

export default function Footer({ brand }: FooterProps) {
  return (
    <footer className="bg-gray-950 border-t border-gray-800/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-blue-400" />
              <span className="text-lg font-bold text-white">{brand.name}</span>
            </div>
            <p className="text-sm text-gray-500 max-w-md mb-4">
              AI-powered tax return review for Puerto Rico Act 60 decree holders.
              Operated by Tesseract LLC.
            </p>
            <p className="text-xs text-gray-600">
              This service is not a substitute for professional advice from a licensed CPA or tax attorney.
              AI-generated analysis is for informational and educational purposes only and does not
              constitute tax preparation, tax advice, or representation before the IRS or PR Hacienda.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#how-it-works" className="text-sm text-gray-500 hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#pricing" className="text-sm text-gray-500 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#faq" className="text-sm text-gray-500 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="/upload" className="text-sm text-gray-500 hover:text-white transition-colors">Start Review</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="/privacy" className="text-sm text-gray-500 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-sm text-gray-500 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="/disclaimer" className="text-sm text-gray-500 hover:text-white transition-colors">Disclaimer</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Tesseract LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {brand.trustBadges.map((badge) => (
              <span key={badge} className="text-xs text-gray-600 border border-gray-800 rounded-full px-3 py-1">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
