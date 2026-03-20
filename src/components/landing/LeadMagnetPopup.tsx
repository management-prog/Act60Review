'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, FileText, ArrowRight, Loader2, Check } from 'lucide-react'
import type { BrandConfig } from '@/config/brands'

interface LeadMagnetPopupProps {
  brand: BrandConfig
}

export default function LeadMagnetPopup({ brand }: LeadMagnetPopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const storageKey = `lead-magnet-shown-${brand.id}`

  const showPopup = useCallback(() => {
    const alreadyShown = sessionStorage.getItem(storageKey)
    if (!alreadyShown) {
      setIsOpen(true)
      sessionStorage.setItem(storageKey, '1')
    }
  }, [storageKey])

  useEffect(() => {
    // Show after 30 seconds
    const timer = setTimeout(showPopup, 30000)

    // Exit intent (mouse leaves viewport top)
    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY <= 0) {
        showPopup()
      }
    }
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [showPopup])

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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[61] w-[90vw] max-w-md"
          >
            <div className="bg-navy-900 border border-white/[0.06] p-6 sm:p-8 relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {status === 'success' ? (
                <div className="text-center py-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="font-serif text-xl text-slate-100 mb-2">Check Your Inbox</h3>
                  <p className="text-sm text-slate-400">
                    {brand.leadMagnet.type === 'pdf'
                      ? "We've sent the checklist to your email."
                      : "We've sent your results to your email."}
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-start gap-3 mb-5">
                    <div className="w-10 h-10 rounded bg-accent/10 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-[10px] text-accent/70 uppercase tracking-widest font-semibold mb-1">
                        Free {brand.leadMagnet.type === 'pdf' ? 'Download' : 'Tool'}
                      </p>
                      <h3 className="font-serif text-lg text-slate-100 leading-snug">
                        {brand.leadMagnet.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-slate-400 mb-4">
                    {brand.leadMagnet.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {brand.leadMagnet.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2 text-sm text-slate-300">
                        <Check className="w-3.5 h-3.5 mt-0.5 text-accent/60 shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (status === 'error') setStatus('idle')
                      }}
                      placeholder="your@email.com"
                      className="w-full bg-navy-800 border border-white/[0.06] text-slate-200 text-sm px-4 py-3 placeholder:text-slate-600 focus:outline-none focus:border-accent/30 transition-colors"
                      required
                    />
                    {status === 'error' && errorMsg && (
                      <p className="text-xs text-red-400">{errorMsg}</p>
                    )}
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="group flex items-center justify-center gap-2 w-full bg-accent text-navy-900 font-semibold text-sm py-3.5 tracking-wide uppercase transition-all duration-300 hover:bg-accent-light disabled:opacity-60"
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

                  <p className="text-[10px] text-slate-600 mt-3 text-center">
                    No spam. Unsubscribe anytime.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
