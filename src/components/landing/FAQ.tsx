'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'Is this a replacement for my CPA?',
    answer: 'No. Think of it as a second opinion — a comprehensive AI-powered check on the work your CPA has already done. We catch the errors that CPAs commonly miss in Act 60 returns, but we don\'t prepare or file returns. Every finding is verified by a licensed Puerto Rico CPA before it reaches you.',
  },
  {
    question: 'How is my data protected?',
    answer: 'Your tax documents are encrypted with 256-bit AES encryption in transit and at rest. We are SOC 2 Type II compliant. Files are processed in isolated environments and permanently deleted 30 days after your review is complete. We never share your data with third parties.',
  },
  {
    question: 'What documents do I need to upload?',
    answer: 'At minimum: your Puerto Rico tax return (Planilla/Form 482) and your federal return (Form 1040). For the most thorough review, also include: Form 8938, FBAR filing confirmation, your Act 60 decree, transfer pricing documentation, and any Hacienda correspondence.',
  },
  {
    question: 'How long does the review take?',
    answer: 'The Quick Scan delivers results in under 15 minutes. The Full Review and Audit Shield include CPA verification and are delivered within 24 hours. Most Full Reviews are completed in 4-6 hours.',
  },
  {
    question: 'What if the AI finds nothing wrong?',
    answer: 'That\'s the best possible outcome — you get peace of mind and a clean compliance report. About 30% of returns we review have zero critical findings. You still receive a detailed report documenting everything we checked, which serves as evidence of due diligence if you\'re ever audited.',
  },
  {
    question: 'Can you help if I\'m already under audit?',
    answer: 'Our Audit Shield package includes pre-audit preparation materials, but we do not provide legal representation. If you\'re currently under IRS or Hacienda examination, we recommend working with a tax attorney. Our report can help your attorney understand your compliance position quickly.',
  },
  {
    question: 'Do you handle Chapter 2 (Export Services) returns?',
    answer: 'Yes. Our AI is trained on both Chapter 2 (Export Services, formerly Act 20) and Chapter 3 (Individual Investor, formerly Act 22) compliance requirements. The transfer pricing analysis is particularly valuable for Chapter 2 holders with intercompany transactions.',
  },
  {
    question: 'What\'s the money-back guarantee?',
    answer: 'If you\'re not satisfied with your review for any reason, contact us within 7 days of receiving your report for a full refund. No questions asked. We\'ve never had a refund request, but the guarantee is there for your peace of mind.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="relative py-24 bg-gray-900/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">
            FAQ
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Common Questions
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="border border-gray-800 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-900/50 transition-colors"
              >
                <span className="text-white font-medium pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="px-5 pb-5 text-gray-400 text-sm leading-relaxed">
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
