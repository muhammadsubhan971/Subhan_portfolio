export function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 max-w-6xl mx-auto px-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs text-zinc-600">
          © 2026 Muhammad Subhan. Crafted with intention.
        </p>
        <div className="flex items-center gap-6">
          {["Skills", "Projects", "Experience", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-xs text-zinc-600 hover:text-zinc-300 transition-colors duration-300 tracking-wide"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
