import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/HeroSection"
import { SkillsSection } from "@/components/SkillsSection"
import { ProjectsSection } from "@/components/ProjectsSection"
import { ExperienceSection } from "@/components/ExperienceSection"
import { ContactSection } from "@/components/ContactSection"
import { Footer } from "@/components/Footer"
import { ClientEffects } from "@/components/ClientEffects"
import { PageTransition } from "@/components/PageTransition"

export default function Home() {
  return (
    <PageTransition>
      <main className="bg-[var(--bg)] min-h-screen">
        <ClientEffects />
        <Navbar />
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
        <Footer />
      </main>
    </PageTransition>
  )
}
