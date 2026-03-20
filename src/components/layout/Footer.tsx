'use client'

import type { BrandConfig } from '@/config/brands'

interface FooterProps {
  brand: BrandConfig
}

const sisterSites = [
  { id: 'act60review', name: 'Act 60 Review', domain: 'act60review.com', desc: 'Comprehensive AI tax review' },
  { id: 'decreecheck', name: 'DecreeCheck', domain: 'decreecheck.com', desc: 'Quick compliance check' },
  { id: 'act60shield', name: 'Act 60 Shield', domain: 'act60shield.com', desc: 'Audit defense protection' },
]

export default function Footer({ brand }: FooterProps) {
  const otherSites = sisterSites.filter((s) => s.id !== brand.id)

  return (
    <footer className="bg-navy-950 border-t border-white/[0.04] py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-0.5 mb-4">
              <span className="font-serif text-base text-slate-200">{brand.logoName[0]}</span>
              <span className="font-serif text-base text-accent font-semibold">{brand.logoName[1]}</span>
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

          {/* Sister sites */}
          <div>
            <h4 className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.18em] mb-4">
              Also From Us
            </h4>
            <ul className="space-y-3">
              {otherSites.map((site) => (
                <li key={site.id}>
                  <a
                    href={`https://${site.domain}`}
                    className="block group"
                    rel="noopener"
                  >
                    <span className="text-sm text-slate-500 group-hover:text-slate-300 transition-colors duration-200">
                      {site.name}
                    </span>
                    <span className="block text-xs text-slate-700 group-hover:text-slate-500 transition-colors duration-200">
                      {site.desc}
                    </span>
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
          <div className="flex flex-wrap items-center gap-4">
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
