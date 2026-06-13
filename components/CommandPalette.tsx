"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  GitBranch,
  Globe,
  Mail,
  Download,
  Sun,
  Moon,
  ChevronRight,
  Briefcase,
  GraduationCap,
} from "lucide-react"
import { useTheme } from "next-themes"

interface Command {
  id: string
  label: string
  icon: React.ReactNode
  action: () => void
  hint?: string
}

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState(0)
  const { theme, setTheme } = useTheme()
  const inputRef = useRef<HTMLInputElement>(null)

  const commands: Command[] = [
    {
      id: "skills",
      label: "Go to Skills",
      icon: <GraduationCap size={16} />,
      action: () => {
        document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })
        setOpen(false)
      },
      hint: "↓",
    },
    {
      id: "projects",
      label: "Go to Projects",
      icon: <Briefcase size={16} />,
      action: () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
        setOpen(false)
      },
      hint: "↓",
    },
    {
      id: "experience",
      label: "Go to Experience",
      icon: <Briefcase size={16} />,
      action: () => {
        document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })
        setOpen(false)
      },
      hint: "↓",
    },
    {
      id: "contact",
      label: "Go to Contact",
      icon: <Mail size={16} />,
      action: () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
        setOpen(false)
      },
      hint: "↓",
    },
    {
      id: "github",
      label: "Open GitHub",
      icon: <GitBranch size={16} />,
      action: () => {
        window.open("https://github.com/muhammadsubhan971", "_blank")
        setOpen(false)
      },
      hint: "↗",
    },
    {
      id: "linkedin",
      label: "Open LinkedIn",
      icon: <Globe size={16} />,
      action: () => {
        window.open("https://linkedin.com/in/muhammadsubhan971", "_blank")
        setOpen(false)
      },
      hint: "↗",
    },
    {
      id: "theme",
      label: "Toggle Dark/Light Mode",
      icon: theme === "dark" ? <Sun size={16} /> : <Moon size={16} />,
      action: () => {
        setTheme(theme === "dark" ? "light" : "dark")
        setOpen(false)
      },
      hint: "⌘T",
    },
    {
      id: "resume",
      label: "Download Resume",
      icon: <Download size={16} />,
      action: () => {
        window.open("/resume.pdf", "_blank")
        setOpen(false)
      },
      hint: "↓",
    },
  ]

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen((prev) => !prev)
      }

      if (open) {
        if (e.key === "Escape") {
          setOpen(false)
        } else if (e.key === "ArrowDown") {
          e.preventDefault()
          setSelected((prev) => (prev + 1) % filtered.length)
        } else if (e.key === "ArrowUp") {
          e.preventDefault()
          setSelected((prev) => (prev - 1 + filtered.length) % filtered.length)
        } else if (e.key === "Enter") {
          e.preventDefault()
          filtered[selected]?.action()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, filtered, selected])

  useEffect(() => {
    if (open) {
      setSearch("")
      setSelected(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    setSelected(0)
  }, [search])

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-300 transition-colors rounded-md border border-white/10 hover:border-white/20"
      >
        <Search size={12} />
        <span className="text-[10px]">⌘K</span>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
            />

            {/* Palette */}
            <div className="fixed inset-0 flex items-start justify-center pt-[20vh] z-[10000] pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="w-full max-w-xl pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-[var(--bg2)] border border-[var(--border2)] rounded-2xl shadow-2xl overflow-hidden">
                  {/* Search input */}
                  <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--border)]">
                    <Search size={16} className="text-zinc-500" />
                    <input
                      ref={inputRef}
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search commands..."
                      className="flex-1 bg-transparent text-sm text-[var(--text)] placeholder:text-zinc-600 outline-none"
                    />
                  </div>

                  {/* Commands list */}
                  <div className="max-h-[400px] overflow-y-auto p-2">
                    {filtered.length === 0 ? (
                      <div className="px-4 py-8 text-center text-sm text-zinc-600">
                        No commands found
                      </div>
                    ) : (
                      filtered.map((cmd, i) => (
                        <button
                          key={cmd.id}
                          onClick={cmd.action}
                          onMouseEnter={() => setSelected(i)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                            i === selected
                              ? "bg-[var(--gold-dim)] text-[var(--gold)]"
                              : "text-zinc-400 hover:bg-[var(--bg3)]"
                          }`}
                        >
                          <span className={i === selected ? "text-[var(--gold)]" : "text-zinc-600"}>
                            {cmd.icon}
                          </span>
                          <span className="flex-1 text-sm font-medium">{cmd.label}</span>
                          {cmd.hint && (
                            <span className="text-xs text-zinc-600">{cmd.hint}</span>
                          )}
                          {i === selected && (
                            <ChevronRight size={14} className="text-[var(--gold)]" />
                          )}
                        </button>
                      ))
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
