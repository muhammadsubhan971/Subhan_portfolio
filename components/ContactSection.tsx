"use client"

import { GitBranch, Globe, MapPin, GraduationCap, Mail, ArrowUpRight } from "lucide-react"

const links = [
  {
    icon: GitBranch,
    label: "GitHub",
    sub: "muhammadsubhan971",
    href: "https://github.com/muhammadsubhan971",
  },
  {
    icon: Globe,
    label: "LinkedIn",
    sub: "Connect professionally",
    href: "https://linkedin.com/in/muhammadsubhan971",
  },
  {
    icon: MapPin,
    label: "Location",
    sub: "Faisalabad, Pakistan",
    href: null,
  },
  {
    icon: GraduationCap,
    label: "Education",
    sub: "BS AI · NFC-IEFR 2027",
    href: null,
  },
]

export function ContactSection() {
  return (
    <section id="contact" className="py-28 max-w-6xl mx-auto px-6">
      <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-5 h-px bg-[#d4af37]" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[#d4af37]">Contact</span>
          </div>
          <h2
            className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.0] mb-6"
            style={{ fontFamily: "var(--font-syne), sans-serif" }}
          >
            Let&apos;s build
            <br />
            <span className="text-zinc-600">something</span>
            <br />
            great<span style={{ color: "#d4af37" }}>.</span>
          </h2>
          <p className="text-zinc-400 text-base font-light leading-relaxed mb-8 max-w-sm">
            Open to full-time roles, consulting projects, and AI collaborations.
            Based in Faisalabad — working globally.
          </p>
          <a
            href="mailto:muhammadsubhan971@gmail.com"
            className="group inline-flex items-center gap-2 text-zinc-200 font-medium text-base border-b border-white/10 pb-1 hover:border-[#d4af37] hover:text-[#d4af37] transition-all duration-300"
          >
            <Mail size={16} />
            muhammadsubhan971@gmail.com
          </a>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-3">
          {links.map((link) => {
            const Icon = link.icon
            const inner = (
              <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.15)" }}>
                    <Icon size={15} style={{ color: "#d4af37" }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-200">{link.label}</p>
                    <p className="text-xs text-zinc-500">{link.sub}</p>
                  </div>
                </div>
                {link.href && (
                  <ArrowUpRight
                    size={14}
                    className="text-zinc-700 group-hover:text-[#d4af37] transition-colors duration-300"
                  />
                )}
              </div>
            )

            return link.href ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {inner}
              </a>
            ) : (
              <div key={link.label}>{inner}</div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
