'use client'

import type { BrandConfig } from '@/config/brands'

interface FooterProps {
  brand: BrandConfig
}

export default function Footer({ brand }: FooterProps) {
  return (
    <footer className="bg-navy-950 border-t border-white/[0.04] py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-0.5 mb-4">
              <span className="font-serif text-base text-slate-200">Act 60 </span>
              <span className="font-serif text-base text-gold font-semibold">Review</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              AI-powered tax return review for Puerto Rico Act 60 decree holders. Operated by Dis Optimus Capital LLC.
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Not a substitute for professional CPA or attorney advice. For informational purposes only.
            </p>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.18em] mb-4">
              Product
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: '#how-it-works', label: 'How It Works' },
                { href: '#pricing', label: 'Pricing' },
                { href: '#faq', label: 'FAQ' },
                { href: '#pricing', label: 'Start Review' },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-slate-600 hover:text-slate-300 transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.18em] mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/terms', label: 'Terms of Service' },
                { href: '/disclaimer', label: 'Disclaimer' },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-slate-600 hover:text-slate-300 transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-700">
            &copy; {new Date().getFullYear()} Dis Optimus Capital LLC
          </p>
          <div className="flex items-center gap-4">
            {['CPA-Verified', 'SOC 2', '256-bit Encryption'].map((badge) => (
              <span key={badge} className="text-[10px] text-slate-600 uppercase tracking-[0.08em]">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
