'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import type { BrandConfig } from '@/config/brands'

interface SocialProofProps {
  brand: BrandConfig
}

export default function SocialProof({ brand }: SocialProofProps) {
  return (
    <section className="relative py-20 bg-navy-900 noise">
      <div className="section-line" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Client count metric */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          className="text-center mb-14"
        >
          <p className="text-accent/80 font-sans text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            Trusted By Decree Holders
          </p>
          <p className="font-serif text-2xl sm:text-3xl text-slate-100 tracking-tight">
            {brand.clientCount}
          </p>
        </motion.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.04] border border-white/[0.04]">
          {brand.testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-navy-900 p-6 sm:p-8 flex flex-col"
            >
              <Quote className="w-5 h-5 text-accent/30 mb-4 shrink-0" />
              <p className="text-sm text-slate-300 leading-relaxed mb-6 flex-1">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="border-t border-white/[0.05] pt-4">
                <p className="text-sm font-medium text-slate-200">{testimonial.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">{testimonial.role}</p>
                <p className="text-xs text-accent/70 font-medium mt-2">{testimonial.result}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
