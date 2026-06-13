"use client"

import { useRef } from "react"
import { motion, useSpring } from "framer-motion"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  href?: string
  onClick?: () => void
}

export function MagneticButton({
  children,
  className = "",
  href,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 })
  const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const deltaX = e.clientX - centerX
    const deltaY = e.clientY - centerY

    x.set(Math.max(-12, Math.min(12, deltaX * 0.3)))
    y.set(Math.max(-8, Math.min(8, deltaY * 0.2)))
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const Wrapper = href ? "a" : "button"

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <motion.div style={{ x, y }}>
        <Wrapper
          href={href}
          onClick={onClick}
          className={className}
        >
          {children}
        </Wrapper>
      </motion.div>
    </div>
  )
}
