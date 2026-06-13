"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  color: string
  phase: number
  phaseSpeed: number
}

const colors = ["#d4af37", "#ffffff", "#a0a0ff"]

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const mouse = useRef({ x: -1000, y: -1000 })
  const animationFrameId = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const initParticles = () => {
      particles.current = []
      for (let i = 0; i < 60; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: 1 + Math.random() * 1.5,
          opacity: 0.15 + Math.random() * 0.25,
          color: colors[Math.floor(Math.random() * colors.length)],
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: 0.01 + Math.random() * 0.02,
        })
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.current.forEach((p) => {
        // Update position
        p.x += p.vx
        p.y += p.vy
        p.phase += p.phaseSpeed

        // Sine wave oscillation
        const sineOffset = Math.sin(p.phase) * 0.5

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Mouse repulsion
        const dx = p.x - mouse.current.x
        const dy = p.y - mouse.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 100) {
          const force = (100 - dist) / 100
          p.x += (dx / dist) * force * 2
          p.y += (dy / dist) * force * 2
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x + sineOffset, p.y + sineOffset, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity
        ctx.fill()
        ctx.globalAlpha = 1
      })

      animationFrameId.current = requestAnimationFrame(animate)
    }

    resize()
    initParticles()
    animate()

    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}
