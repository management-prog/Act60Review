'use client'

import { Shield } from 'lucide-react'

interface GuaranteeBadgeProps {
  className?: string
  size?: 'sm' | 'md'
}

export default function GuaranteeBadge({ className = '', size = 'sm' }: GuaranteeBadgeProps) {
  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <Shield className={size === 'sm' ? 'w-3.5 h-3.5 text-emerald-400' : 'w-4 h-4 text-emerald-400'} />
      <span className={`font-medium text-emerald-400/90 ${size === 'sm' ? 'text-[11px]' : 'text-xs'}`}>
        100% Money-Back Guarantee
      </span>
    </div>
  )
}
