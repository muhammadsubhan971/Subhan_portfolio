"use client"

import { useEffect } from "react"

export function ClientEffects() {
  useEffect(() => {
    // Scroll reveal
    const reveals = document.querySelectorAll(".reveal")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("in-view")
            }, i * 60)
          }
        })
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    )
    reveals.forEach((el) => observer.observe(el))

    // Custom cursor
    const dot = document.createElement("div")
    dot.className = "cursor-dot"
    const ring = document.createElement("div")
    ring.className = "cursor-ring"
    document.body.appendChild(dot)
    document.body.appendChild(ring)

    let mx = 0, my = 0, rx = 0, ry = 0

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      dot.style.left = mx + "px"
      dot.style.top = my + "px"
    }
    document.addEventListener("mousemove", onMouseMove)

    let rafId: number
    const animRing = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      ring.style.left = rx + "px"
      ring.style.top = ry + "px"
      rafId = requestAnimationFrame(animRing)
    }
    animRing()

    // Cursor enlarge on hover
    const hoverEls = document.querySelectorAll("a, button, [role='button']")
    const enlarge = () => {
      dot.style.width = "16px"
      dot.style.height = "16px"
      ring.style.width = "48px"
      ring.style.height = "48px"
      ring.style.borderColor = "rgba(212,175,55,0.7)"
    }
    const shrink = () => {
      dot.style.width = "8px"
      dot.style.height = "8px"
      ring.style.width = "32px"
      ring.style.height = "32px"
      ring.style.borderColor = "rgba(212,175,55,0.4)"
    }
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", enlarge)
      el.addEventListener("mouseleave", shrink)
    })

    return () => {
      observer.disconnect()
      document.removeEventListener("mousemove", onMouseMove)
      cancelAnimationFrame(rafId)
      if (dot.parentNode) dot.parentNode.removeChild(dot)
      if (ring.parentNode) ring.parentNode.removeChild(ring)
    }
  }, [])

  return null
}
