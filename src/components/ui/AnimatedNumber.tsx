'use client'

import { useRef, useEffect, useState, useCallback } from 'react'

interface AnimatedNumberProps {
  value: string
  suffix?: string
  className?: string
}

export default function AnimatedNumber({ value, suffix = '', className }: AnimatedNumberProps) {
  const [display, setDisplay] = useState(value)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  const animate = useCallback(() => {
    if (hasAnimated.current) return
    hasAnimated.current = true

    const numericPart = value.replace(/[^0-9.]/g, '')
    const prefix = value.replace(/[0-9.+]/g, '')
    const target = parseFloat(numericPart)

    if (isNaN(target)) {
      setDisplay(value)
      return
    }

    const duration = 1500
    const start = performance.now()

    function step(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * target)

      if (value.includes('K')) {
        setDisplay(`${prefix}${current}K`)
      } else if (value.includes('B')) {
        setDisplay(`${prefix}${(eased * target).toFixed(1)}B`)
      } else {
        setDisplay(`${prefix}${current}${suffix}`)
      }

      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        setDisplay(value)
      }
    }

    requestAnimationFrame(step)
  }, [value, suffix])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate()
        }
      },
      { threshold: 0.3 }
    )
    const el = ref.current
    if (el) observer.observe(el)
    return () => { if (el) observer.unobserve(el) }
  }, [animate])

  return <div ref={ref} className={className}>{display}</div>
}
