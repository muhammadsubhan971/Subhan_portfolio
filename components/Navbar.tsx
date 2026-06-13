"use client"

import { useState, useEffect } from "react"
import { GitBranch, Globe, Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/ThemeToggle"
import { CommandPalette } from "@/components/CommandPalette"
import { useActiveSection } from "@/components/ActiveNavIndicator"
import { motion } from "framer-motion"
import { MagneticButton } from "@/components/MagneticButton"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const activeSection = useActiveSection()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const links = [
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-4 border-b border-[var(--border)] backdrop-blur-xl bg-[var(--bg)]/80"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-display text-xl font-700 tracking-tight">
          <span style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 700 }}>
            MS<span style={{ color: "#d4af37" }}>.</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive = activeSection === link.href.slice(1)
            return (
              <a
                key={link.label}
                href={link.href}
                className={`relative text-xs font-medium tracking-widest uppercase transition-colors duration-300 ${
                  isActive ? "text-[var(--gold)]" : "text-zinc-500 hover:text-zinc-100"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-dot"
                    className="absolute -bottom-2 left-1/2 w-[3px] h-[3px] rounded-full bg-[var(--gold)]"
                    style={{ transform: "translateX(-50%)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            )
          })}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-4">
          <CommandPalette />
          <a
            href="https://github.com/muhammadsubhan971"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-zinc-100 transition-colors"
          >
            <GitBranch size={16} />
          </a>
          <a
            href="https://linkedin.com/in/muhammadsubhan971"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-zinc-100 transition-colors"
          >
          <Globe size={16} />
          </a>
          <ThemeToggle />
          <MagneticButton
            href="#contact"
            className="px-5 py-2 text-xs font-semibold tracking-wider rounded-full border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-300"
          >
            Hire Me
          </MagneticButton>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-zinc-400"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 mx-4 p-6 rounded-2xl border border-white/5 bg-[var(--bg2)] backdrop-blur-xl" style={{ opacity: 0.95 }}>
          <div className="flex flex-col gap-5">
            {links.map((link) => {
              const isActive = activeSection === link.href.slice(1)
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`relative text-sm font-medium transition-colors pl-4 ${
                    isActive ? "text-[var(--gold)]" : "text-zinc-400 hover:text-zinc-100"
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 w-[2px] h-4 bg-[var(--gold)] -translate-y-1/2" />
                  )}
                  {link.label}
                </a>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}
