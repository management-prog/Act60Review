'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Check, ArrowRight, Loader2, Shield } from 'lucide-react'
import type { BrandConfig } from '@/config/brands'

interface LeadMagnetFormProps {
  brand: BrandConfig
}

export default function LeadMagnetForm({ brand }: LeadMagnetFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setErrorMsg('Please enter a valid email address')
      setStatus('error')
      return
    }

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, brandId: brand.id }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Something went wrong')
      }

      setStatus('success')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-emerald-400" />
        </div>
        <h1 className="font-serif text-3xl text-slate-100 mb-3">Check Your Inbox</h1>
        <p className="text-slate-400 mb-8">
          {brand.leadMagnet.type === 'pdf'
            ? `We've sent "${brand.leadMagnet.title}" to ${email}`
            : `We've sent your results to ${email}`}
        </p>
        <a
          href="/#pricing"
          className="inline-flex items-center gap-2 text-accent text-sm font-medium hover:text-accent-light transition-colors"
        >
          Ready for a full review? See pricing
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded bg-accent/10 mb-5">
          <FileText className="w-7 h-7 text-accent" />
        </div>
        <p className="text-accent/70 text-xs uppercase tracking-[0.2em] font-semibold mb-3">
          Free {brand.leadMagnet.type === 'pdf' ? 'Download' : 'Tool'}
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl text-slate-100 mb-4 tracking-tight">
          {brand.leadMagnet.title}
        </h1>
        <p className="text-slate-400 text-base leading-relaxed max-w-lg mx-auto">
          {brand.leadMagnet.description}
        </p>
      </div>

      {/* Bullets */}
      <div className="border border-white/[0.05] p-6 mb-8">
        <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-4">
          What you&apos;ll get:
        </p>
        <ul className="space-y-3">
          {brand.leadMagnet.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3 text-sm text-slate-300">
              <Check className="w-4 h-4 mt-0.5 text-accent/60 shrink-0" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status === 'error') setStatus('idle')
          }}
          placeholder="your@email.com"
          className="w-full bg-navy-800 border border-white/[0.06] text-slate-200 text-base px-5 py-4 placeholder:text-slate-600 focus:outline-none focus:border-accent/30 transition-colors"
          required
        />
        {status === 'error' && errorMsg && (
          <p className="text-sm text-red-400">{errorMsg}</p>
        )}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="group flex items-center justify-center gap-2 w-full bg-accent text-navy-900 font-semibold text-sm py-4 tracking-wide uppercase transition-all duration-300 hover:bg-accent-light disabled:opacity-60"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Get Free {brand.leadMagnet.type === 'pdf' ? 'Checklist' : 'Score'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </button>
      </form>

      {/* Trust */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <div className="flex items-center gap-1.5 text-xs text-slate-600">
          <Shield className="w-3.5 h-3.5" />
          No spam. Unsubscribe anytime.
        </div>
        <span className="w-[3px] h-[3px] rounded-full bg-slate-700" />
        <span className="text-xs text-slate-600">
          {brand.clientCount}
        </span>
      </div>
    </motion.div>
  )
}
