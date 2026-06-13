"use client"

import { useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { SplineScene } from "@/components/ui/spline-scene"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    num: "01",
    title: "Pakistan AI Legal Assistant",
    desc: "RAG-powered legal assistant using Groq/Llama 3.1 70B, ChromaDB, and sentence-transformers. Trained on Pakistani government legal portals for accurate contextual guidance.",
    tags: ["RAG", "LLaMA 3.1", "ChromaDB", "Groq"],
    highlight: true,
    link: "https://github.com/muhammadsubhan971",
  },
  {
    num: "02",
    title: "Retail Surveillance System",
    desc: "CCTV-based outlet surveillance with named staff detection, cash flow monitoring & attendance tracking. OSNet + HSV + DeepFace Facenet512 + DeepSort fusion pipeline.",
    tags: ["YOLO", "InsightFace", "DeepSort", "Computer Vision"],
    highlight: false,
    link: "https://github.com/muhammadsubhan971",
  },
  {
    num: "03",
    title: "AI Exam Proctoring System",
    desc: "Intelligent real-time exam monitoring with gaze tracking, head-pose estimation, and anomaly detection using MediaPipe to ensure academic integrity at scale.",
    tags: ["MediaPipe", "OpenCV", "Real-time", "ML"],
    highlight: false,
    link: "https://github.com/muhammadsubhan971",
  },
  {
    num: "04",
    title: "AI Prompt Guardian",
    desc: "PromptShield Enterprise — safety layer for LLM systems that detects and neutralizes prompt injection, jailbreak attempts, and adversarial inputs in real-time.",
    tags: ["LLM Safety", "NLP", "SaaS", "API"],
    highlight: false,
    link: "https://github.com/muhammadsubhan971",
  },
  {
    num: "05",
    title: "Soul Mate — AI Companion",
    desc: "Emotionally intelligent AI companion with personalized conversation, mood tracking, and mental wellness support built on fine-tuned LLM foundations with Flutter.",
    tags: ["LLM", "Flutter", "Fine-tuning", "Wellness"],
    highlight: false,
    link: "https://github.com/muhammadsubhan971",
  },
  {
    num: "06",
    title: "Zouq-ul-Ilm",
    desc: "AI-powered educational platform bringing personalized learning to Pakistani students with adaptive content delivery, intelligent tutoring, and Urdu NLP support.",
    tags: ["EdTech", "NLP", "Urdu", "Pakistan"],
    highlight: false,
    link: "https://github.com/muhammadsubhan971",
  },
]

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    card.style.setProperty("--mx", `${x}%`)
    card.style.setProperty("--my", `${y}%`)

    // 3D tilt
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const rotX = ((e.clientY - centerY) / rect.height) * -8
    const rotY = ((e.clientX - centerX) / rect.width) * 5
    setRotateX(rotX)
    setRotateY(rotY)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative p-7 flex flex-col gap-4 transition-all duration-500 cursor-pointer"
      style={{
        background: "var(--bg2)",
        transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        "--mx": "50%",
        "--my": "50%",
      } as React.CSSProperties}
    >
      {/* Mouse spotlight effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(circle at var(--mx) var(--my), rgba(212,175,55,0.05), transparent 60%)",
        }}
      />

      {/* Shine overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,0.06), transparent 50%)`,
        }}
      />

      {/* Number */}
      <span className="text-xs font-semibold tracking-widest uppercase text-zinc-700">
        {project.num}
      </span>

      {/* Title & arrow */}
      <div className="flex items-start justify-between gap-4">
        <h3
          className="text-lg font-bold text-zinc-100 tracking-tight leading-tight group-hover:text-[var(--gold)] transition-colors duration-300"
          style={{ fontFamily: "var(--font-syne), sans-serif" }}
        >
          {project.title}
        </h3>
        <ArrowUpRight
          size={16}
          className="text-zinc-700 group-hover:text-[var(--gold)] transition-colors duration-300 flex-shrink-0 mt-0.5"
        />
      </div>

      {/* Description */}
      <p className="text-sm text-zinc-500 leading-relaxed font-light flex-1">{project.desc}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tags.map((tag, i) => (
          <span
            key={i}
            className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all duration-300 ${
              i === 0
                ? "border-[#d4af3730] text-[var(--gold)] bg-[#d4af3710]"
                : "border-white/5 text-zinc-500 group-hover:border-white/10"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export function ProjectsSection() {
  return (
    <section id="projects" className="py-28 max-w-6xl mx-auto px-6">
      {/* Header */}
      <div className="reveal mb-14">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-5 h-px bg-[var(--gold)]" />
          <span className="text-xs font-semibold tracking-widest uppercase text-[var(--gold)]">Work</span>
        </div>
        <h2
          className="text-5xl font-bold tracking-tight leading-tight"
          style={{ fontFamily: "var(--font-syne), sans-serif" }}
        >
          Selected{" "}
          <span className="text-zinc-600">projects</span>
        </h2>
      </div>

      {/* Spline 3D showcase card */}
      <div className="reveal mb-6">
        <Card className="w-full h-[480px] relative overflow-hidden border-white/5"
          style={{ background: "rgba(0,0,0,0.96)" }}>
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

          <div className="flex h-full">
            {/* Left: text */}
            <div className="flex-1 p-10 relative z-10 flex flex-col justify-center">
              <span className="text-xs font-semibold tracking-widest uppercase text-[var(--gold)] mb-4 flex items-center gap-2">
                <span className="w-4 h-px bg-[var(--gold)]" />
                Featured
              </span>
              <h3
                className="text-4xl md:text-5xl font-bold leading-tight mb-5"
                style={{ fontFamily: "var(--font-syne), sans-serif" }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-zinc-50 to-zinc-400">
                  AI Systems
                </span>
                <br />
                <span className="text-[var(--gold)]">Built Different</span>
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed font-light max-w-xs mb-8">
                From real-time surveillance to legal intelligence — engineering AI solutions
                that solve real problems in Pakistan and beyond.
              </p>
              <a
                href="https://github.com/muhammadsubhan971"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-100 text-zinc-900 text-sm font-semibold hover:bg-[var(--gold)] transition-all duration-300 w-fit"
              >
                View on GitHub <ArrowUpRight size={14} />
              </a>
            </div>

            {/* Right: Spline 3D */}
            <div className="flex-1 relative">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Project grid */}
      <div
        className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 overflow-hidden rounded-2xl"
        style={{ border: "1px solid var(--border)", gap: "1px", background: "var(--border)" }}
      >
        {projects.map((project) => (
          <ProjectCard key={project.num} project={project} />
        ))}
      </div>
    </section>
  )
}
