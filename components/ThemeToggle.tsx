"use client"

import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-14 h-7 rounded-full transition-all duration-400 flex items-center"
      style={{
        background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
        border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.15)",
      }}
      aria-label="Toggle theme"
    >
      {/* Sliding pill */}
      <div
        className="absolute w-5 h-5 rounded-full transition-all duration-400 flex items-center justify-center"
        style={{
          background: isDark ? "#d4af37" : "#b8960c",
          left: isDark ? "4px" : "calc(100% - 24px)",
          boxShadow: isDark
            ? "0 2px 8px rgba(212,175,55,0.4)"
            : "0 2px 8px rgba(184,150,12,0.3)",
        }}
      >
        {/* Icon with rotation and fade */}
        <div
          className="transition-all duration-400"
          style={{
            transform: isDark ? "rotate(0deg)" : "rotate(180deg)",
            opacity: 1,
          }}
        >
          {isDark ? (
            <Moon size={12} className="text-zinc-900" />
          ) : (
            <Sun size={12} className="text-white" />
          )}
        </div>
      </div>
    </button>
  )
}
