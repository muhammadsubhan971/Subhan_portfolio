"use client"

import { useRef } from "react"
import { ShaderAnimation } from "@/components/ui/shader-animation"
import { Spotlight } from "@/components/ui/spotlight"
import { ArrowRight } from "lucide-react"
import { ParticleField } from "@/components/ParticleField"
import { TypewriterText } from "@/components/TypewriterText"
import { CountUp } from "@/components/CountUp"
import { MagneticButton } from "@/components/MagneticButton"

const stats = [
  { num: 10, suffix: "+", label: "AI Projects" },
  { num: 3, suffix: "", label: "Active Roles" },
  { num: 0, suffix: "A", label: "PIAIC Grade" },
  { num: 82, suffix: "", label: "Portfolio Score" },
]

const marqueeItems = [
  "Generative AI", "Computer Vision", "NLP", "RAG Systems",
  "Flutter", "YOLO", "LLM Fine-tuning", "REST APIs",
  "PyTorch", "ChromaDB", "InsightFace", "DeepSort",
]

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)

  return (
    <>
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20"
      >
        {/* Shader fills the entire background */}
        <div className="absolute inset-0 z-0 opacity-30">
          <ShaderAnimation />
        </div>

        {/* Particle field */}
        <div className="absolute inset-0 z-[1]">
          <ParticleField />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 z-0 grid-bg" />

        {/* Spotlight */}
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />

        {/* Ambient glows */}
        <div
          className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full animate-float pointer-events-none z-0"
          style={{ background: "radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full animate-float-slow pointer-events-none z-0"
          style={{ background: "radial-gradient(circle, rgba(80,80,200,0.04) 0%, transparent 70%)" }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
          {/* Badge */}
          <div className="animate-fadeUp flex items-center gap-2 mb-10 w-fit px-4 py-2 rounded-full border text-xs font-semibold tracking-widest uppercase"
            style={{ borderColor: "rgba(212,175,55,0.4)", color: "#d4af37" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulseDot" />
            Available for opportunities
          </div>

          {/* Title */}
          <h1
            className="animate-fadeUp-d1 font-bold leading-[0.92] tracking-tight mb-8"
            style={{
              fontFamily: "var(--font-syne), sans-serif",
              fontSize: "clamp(4rem, 10vw, 9rem)",
            }}
          >
            <span className="block text-zinc-100">Muhammad</span>
            <span className="block">
              <span className="gradient-text">Subhan</span>
              <span style={{ color: "#d4af37" }}>.</span>
            </span>
            <span className="block text-zinc-600">AI Engineer</span>
          </h1>

          {/* Description */}
          <p className="animate-fadeUp-d2 text-zinc-400 text-lg font-light leading-relaxed max-w-xl mb-3">
            Building intelligent systems at the intersection of machine learning,
            computer vision, and generative AI. Faisalabad, Pakistan — shaping
            the future of AI one model at a time.
          </p>

          {/* Typewriter */}
          <div className="animate-fadeUp-d2 text-lg font-light leading-relaxed max-w-xl mb-10">
            <TypewriterText />
          </div>

          {/* CTAs */}
          <div className="animate-fadeUp-d3 flex flex-wrap gap-4 mb-16">
            <MagneticButton
              href="#projects"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-zinc-100 text-zinc-900 font-semibold text-sm hover:bg-[var(--gold)] transition-all duration-300 hover:-translate-y-0.5"
            >
              View Work <ArrowRight size={15} />
            </MagneticButton>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/10 text-zinc-300 font-medium text-sm hover:border-white/20 hover:bg-white/5 transition-all duration-300 hover:-translate-y-0.5"
            >
              Get in touch
            </a>
          </div>

          {/* Stats */}
          <div className="animate-fadeUp-d4 flex flex-wrap gap-10 pt-8 border-t border-white/5">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span
                  className="text-4xl font-bold tracking-tight text-zinc-100"
                  style={{ fontFamily: "var(--font-syne), sans-serif" }}
                >
                  {s.suffix === "A" ? (
                    "A"
                  ) : (
                    <CountUp to={s.num} suffix={s.suffix} />
                  )}
                </span>
                <span className="text-xs tracking-widest uppercase text-zinc-600">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="animate-fadeUp-d5 absolute bottom-8 left-6 flex items-center gap-3 text-zinc-600 text-xs tracking-widest uppercase">
          <div className="w-10 h-px bg-zinc-700" />
          Scroll
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden py-6 border-y border-white/5">
        <div className="flex gap-12 animate-marquee whitespace-nowrap w-max">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="text-xs font-semibold tracking-widest uppercase text-zinc-600 flex items-center gap-4"
            >
              {item}
              <span className="text-zinc-800 text-base">·</span>
            </span>
          ))}
        </div>
      </div>
    </>
  )
}
