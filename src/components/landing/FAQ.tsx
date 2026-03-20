'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

const faqs = [
  {
    question: 'Is this a replacement for my CPA?',
    answer: 'No. Think of it as a comprehensive AI check on your CPA\'s work. We catch errors they commonly miss, but we don\'t prepare or file returns. Every finding is verified by a licensed PR CPA.',
  },
  {
    question: 'How is my data protected?',
    answer: '256-bit AES encryption. SOC 2 Type II compliant. Isolated processing environments. Files permanently deleted 30 days after review.',
  },
  {
    question: 'What documents do I need?',
    answer: 'At minimum: Planilla (Form 482) and federal 1040. Ideally also Form 8938, FBAR confirmation, decree, TP documentation, and Hacienda correspondence.',
  },
  {
    question: 'How long does it take?',
    answer: 'Quick Scan: under 15 minutes. Full Review and Audit Shield with CPA verification: within 24 hours. Most complete in 4\u20136 hours.',
  },
  {
    question: 'What if nothing is wrong?',
    answer: 'Best outcome \u2014 peace of mind plus a clean compliance report. ~30% of returns have zero critical findings. The report serves as due diligence evidence.',
  },
  {
    question: 'Money-back guarantee?',
    answer: 'Full refund within 7 days. No questions asked. We\'ve never had a request, but the guarantee is there for your confidence.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="relative py-28 bg-navy-800/50 noise">
      <div className="section-line" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          className="text-center mb-16"
        >
          <p className="text-accent/80 font-sans text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            FAQ
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-slate-100 tracking-tight">
            Common Questions
          </h2>
        </motion.div>

        <div>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: index * 0.04 }}
              className="border-b border-white/[0.05]"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between py-5 text-left group"
              >
                <span className="text-slate-200 font-medium text-[15px] pr-4 group-hover:text-accent transition-colors duration-200">
                  {faq.question}
                </span>
                <Plus
                  className={`w-4 h-4 text-slate-600 shrink-0 transition-all duration-300 ${
                    openIndex === index ? 'rotate-45 text-accent' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-sm text-slate-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
