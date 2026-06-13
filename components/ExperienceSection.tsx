"use client"

const experiences = [
  {
    date: "2025 — Present",
    role: "AI Engineer",
    company: "Optimum Tech",
    desc: "Building production-grade AI solutions — leading development of computer vision pipelines and LLM-powered applications for enterprise clients.",
    type: "work",
  },
  {
    date: "2024 — Present",
    role: "AI Consultant",
    company: "Intelliopia",
    desc: "Consulting on generative AI strategy and implementation, helping businesses integrate LLMs and RAG systems into their workflows effectively.",
    type: "work",
  },
  {
    date: "2024 — Present",
    role: "AI Consultant",
    company: "Career Into Reel",
    desc: "Delivering AI-powered career intelligence tools and resume analysis systems leveraging NLP and machine learning at scale.",
    type: "work",
  },
  {
    date: "2024",
    role: "Campus Ambassador",
    company: "DevTown",
    desc: "Representing DevTown on campus, organizing workshops on web development and AI — bridging the gap between students and industry.",
    type: "work",
  },
  {
    date: "2023 — 2027",
    role: "BS Artificial Intelligence",
    company: "NFC Institute of Engineering & Fertilizer Research",
    desc: "Pursuing a degree in AI with focus on machine learning, computer vision, and applied deep learning. Active in research and practical project development.",
    type: "edu",
  },
  {
    date: "Certified",
    role: "Cloud Applied Generative AI Engineer — Grade A",
    company: "PIAIC",
    desc: "Specialized certification in cloud-native AI development, generative AI applications, and modern LLMOps practices. Achieved Grade A.",
    type: "cert",
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="py-28 max-w-6xl mx-auto px-6">
      {/* Header */}
      <div className="reveal mb-14">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-5 h-px bg-[#d4af37]" />
          <span className="text-xs font-semibold tracking-widest uppercase text-[#d4af37]">Journey</span>
        </div>
        <h2
          className="text-5xl font-bold tracking-tight leading-tight"
          style={{ fontFamily: "var(--font-syne), sans-serif" }}
        >
          Experience{" "}
          <span className="text-zinc-600">& education</span>
        </h2>
      </div>

      {/* Timeline list */}
      <div className="divide-y divide-white/5">
        {experiences.map((exp, idx) => (
          <div
            key={idx}
            className="reveal group grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 md:gap-10 py-8 hover:bg-white/[0.01] transition-colors duration-300 -mx-4 px-4 rounded-xl"
          >
            {/* Date */}
            <div className="flex items-start gap-2 pt-1">
              <span
                className="text-xs font-medium tracking-wide text-zinc-600"
                style={{ minWidth: "fit-content" }}
              >
                {exp.date}
              </span>
              <div className="hidden md:block w-2 h-2 rounded-full mt-0.5 flex-shrink-0"
                style={{
                  background: exp.type === "cert" ? "#22c55e" : exp.type === "edu" ? "#60a5fa" : "#d4af37",
                  boxShadow: `0 0 8px ${exp.type === "cert" ? "#22c55e40" : exp.type === "edu" ? "#60a5fa40" : "#d4af3740"}`,
                }}
              />
            </div>

            {/* Content */}
            <div>
              <p
                className="font-bold text-zinc-100 text-base mb-1 group-hover:text-[#d4af37] transition-colors duration-300"
                style={{ fontFamily: "var(--font-syne), sans-serif" }}
              >
                {exp.role}
              </p>
              <p
                className="text-sm font-medium mb-3"
                style={{ color: exp.type === "cert" ? "#22c55e" : exp.type === "edu" ? "#60a5fa" : "#d4af37" }}
              >
                {exp.company}
              </p>
              <p className="text-sm text-zinc-500 leading-relaxed font-light">{exp.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
