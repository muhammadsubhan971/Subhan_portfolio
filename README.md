# Muhammad Subhan — AI Engineer Portfolio

Full Next.js 14 portfolio with shadcn/ui, Tailwind CSS, TypeScript,
Three.js WebGL Shader (Prompt 1) + Spline 3D (Prompt 2). Build: ✓ Passing.

## Setup

```bash
tar -xzf portfolio-muhammad-subhan.tar.gz
cd portfolio
npm install
npm run dev   # http://localhost:3000
```

## Structure

```
components/
  Navbar.tsx              # Sticky nav, scroll detection, mobile menu
  HeroSection.tsx         # Shader bg + Spotlight + stats + marquee
  SkillsSection.tsx       # 6-skill grid with hover glow
  ProjectsSection.tsx     # Spline 3D card + 6 project cards
  ExperienceSection.tsx   # Work / education / cert timeline
  ContactSection.tsx      # Split layout + social links
  Footer.tsx
  ClientEffects.tsx       # Scroll-reveal IntersectionObserver + cursor

components/ui/
  shader-animation.tsx    # Three.js WebGL (Prompt 1)
  spline-scene.tsx        # @splinetool/react-spline (Prompt 2)
  spotlight.tsx           # Aceternity Spotlight SVG (Prompt 2)
  card.tsx                # shadcn Card (Prompt 2)

lib/utils.ts              # cn() helper
```

## Deploy to Vercel
```bash
npx vercel
```
