"use client"

import { useEffect, useState, useRef } from "react"

interface CountUpProps {
  to: number
  suffix?: string
  duration?: number
}

export function CountUp({ to, suffix = "", duration = 1.5 }: CountUpProps) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const start = 0
          const end = to
          const startTime = Date.now()
          const endTime = startTime + duration * 1000

          const animate = () => {
            const now = Date.now()
            const progress = Math.min((now - startTime) / (endTime - startTime), 1)
            const easeOut = 1 - Math.pow(1 - progress, 3)
            const current = Math.floor(start + (end - start) * easeOut)

            setCount(current)

            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }

          animate()
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [to, duration, hasAnimated])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}
