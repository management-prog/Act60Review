'use client'

import { motion } from 'framer-motion'
import type { BrandConfig } from '@/config/brands'

interface CredentialBarProps {
  brand: BrandConfig
}

export default function CredentialBar({ brand }: CredentialBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      className="relative py-6 bg-navy-800/30 border-y border-white/[0.03]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {brand.credentials.map((credential, i) => (
            <div key={credential} className="flex items-center gap-3">
              {i > 0 && (
                <span className="hidden sm:block w-[3px] h-[3px] rounded-full bg-slate-700" />
              )}
              <span className="text-[11px] text-slate-500 uppercase tracking-[0.15em] font-medium">
                {credential}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
