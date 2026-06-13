"use client"

import { useState, useEffect } from "react"

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const sections = ["skills", "projects", "experience", "contact"]
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.4 }
    )

    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return activeSection
}
