'use client'

import type { BrandConfig } from '@/config/brands'

interface FooterProps {
  brand: BrandConfig
}

const protectionStack = [
  { id: 'decreecheck', name: 'DecreeCheck', domain: 'decreecheck.com', desc: 'Quick compliance scan', price: 'From $149' },
  { id: 'act60review', name: 'Act 60 Review', domain: 'act60review.com', desc: 'Full AI review + CPA verification', price: 'From $299' },
  { id: 'act60shield', name: 'Act 60 Shield', domain: 'act60shield.com', desc: 'Audit defense + ongoing protection', price: 'From $799' },
]

export default function Footer({ brand }: FooterProps) {
  return (
    <footer className="bg-navy-950 border-t border-white/[0.04] py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Protection Stack */}
        <div className="mb-10 pb-10 border-b border-white/[0.04]">
          <h4 className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.18em] mb-5 text-center">
            The Complete Protection Stack
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {protectionStack.map((site) => {
              const isCurrent = site.id === brand.id
              return (
                <a
                  key={site.id}
                  href={isCurrent ? '#pricing' : `https://${site.domain}`}
                  className={`block p-4 border transition-colors duration-200 ${
                    isCurrent
                      ? 'border-accent/20 bg-accent/[0.03]'
                      : 'border-white/[0.04] hover:border-white/[0.08]'
                  }`}
                  rel="noopener"
                >
                  <div className="flex items-baseline justify-between mb-1">
                    <span className={`text-sm font-medium ${isCurrent ? 'text-accent' : 'text-slate-400'}`}>
                      {site.name}
                    </span>
                    <span className="text-[10px] text-slate-600">{site.price}</span>
                  </div>
                  <p className="text-xs text-slate-600">{site.desc}</p>
                </a>
              )
            })}
          </div>
        </div>

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
                { href: '/lead-magnet', label: 'Free Checklist' },
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

          {/* Resources */}
          <div>
            <h4 className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.18em] mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="/lead-magnet" className="text-sm text-slate-600 hover:text-slate-300 transition-colors duration-200">
                  Free Compliance Checklist
                </a>
              </li>
              <li>
                <a href={brand.consultationUrl} className="text-sm text-slate-600 hover:text-slate-300 transition-colors duration-200">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-700">
            &copy; {new Date().getFullYear()} Dis Optimus Capital LLC
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {brand.credentials.slice(0, 3).map((badge) => (
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
