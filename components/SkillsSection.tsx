"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

const skills = [
  {
    icon: "🧠",
    name: "Generative AI",
    desc: "LLMs, RAG pipelines, fine-tuning, prompt engineering with Groq, Llama 3.1, OpenAI APIs",
    tag: "Expert",
    tagColor: "#d4af37",
    proficiency: 95,
  },
  {
    icon: "👁️",
    name: "Computer Vision",
    desc: "YOLO, InsightFace, DeepSort, MediaPipe — building surveillance & real-time detection systems",
    tag: "Expert",
    tagColor: "#d4af37",
    proficiency: 92,
  },
  {
    icon: "💬",
    name: "NLP & Embeddings",
    desc: "Text classification, sentence-transformers, ChromaDB vector stores, semantic search",
    tag: "Advanced",
    tagColor: "#71717a",
    proficiency: 88,
  },
  {
    icon: "📱",
    name: "Flutter & REST APIs",
    desc: "Cross-platform mobile apps with real-time REST API backends and clean architecture",
    tag: "Advanced",
    tagColor: "#71717a",
    proficiency: 82,
  },
  {
    icon: "☁️",
    name: "Cloud GenAI Ops",
    desc: "PIAIC Certified Grade A — deploying scalable AI systems on cloud infrastructure",
    tag: "Certified",
    tagColor: "#22c55e",
    proficiency: 90,
  },
  {
    icon: "📊",
    name: "ML & Deep Learning",
    desc: "PyTorch, TensorFlow, scikit-learn, Kaggle notebooks, model evaluation & optimization",
    tag: "Advanced",
    tagColor: "#71717a",
    proficiency: 85,
  },
]

function SkillCard({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true)
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="group p-7 flex flex-col gap-3 transition-all duration-300 hover:bg-zinc-900/80 dark:hover:bg-zinc-900/80"
      style={{ background: "var(--bg2)" }}
    >
      <div className="text-3xl">{skill.icon}</div>
      <div>
        <p className="font-semibold text-zinc-100 text-base mb-2">{skill.name}</p>
        <p className="text-zinc-500 text-sm leading-relaxed font-light">{skill.desc}</p>
      </div>

      {/* Proficiency bar */}
      <div className="mt-2">
        <div className="h-[3px] w-full bg-zinc-800/50 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: `${skill.proficiency}%` } : { width: 0 }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
              delay: index * 0.1,
            }}
            className="h-full rounded-full"
            style={{
              background: "#d4af37",
              boxShadow: "0 0 8px rgba(212,175,55,0.6)",
            }}
          />
        </div>
      </div>

      <div className="mt-auto pt-3">
        <span
          className="inline-flex px-3 py-1 rounded-full text-xs font-semibold tracking-wide"
          style={{
            color: skill.tagColor,
            border: `1px solid ${skill.tagColor}30`,
            background: `${skill.tagColor}10`,
          }}
        >
          {skill.tag}
        </span>
      </div>
    </div>
  )
}

export function SkillsSection() {
  return (
    <section id="skills" className="py-28 max-w-6xl mx-auto px-6">
      {/* Header */}
      <div className="reveal mb-14">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-5 h-px bg-[var(--gold)]" />
          <span className="text-xs font-semibold tracking-widest uppercase text-[var(--gold)]">Expertise</span>
        </div>
        <h2
          className="text-5xl font-bold tracking-tight leading-tight"
          style={{ fontFamily: "var(--font-syne), sans-serif" }}
        >
          What I{" "}
          <span className="text-zinc-600">build with</span>
        </h2>
      </div>

      {/* Grid */}
      <div
        className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 overflow-hidden rounded-2xl"
        style={{ border: "1px solid var(--border)", gap: "1px", background: "var(--border)" }}
      >
        {skills.map((skill, index) => (
          <SkillCard key={skill.name} skill={skill} index={index} />
        ))}
      </div>
    </section>
  )
}
