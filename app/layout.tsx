import type { Metadata } from "next"
import { Space_Grotesk, Syne } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/ThemeProvider"
import { ScrollProgress } from "@/components/ScrollProgress"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
})

export const metadata: Metadata = {
  title: "Muhammad Subhan - AI Engineer",
  description:
    "AI Engineer specializing in Generative AI, Computer Vision, and NLP. Building intelligent systems from Faisalabad, Pakistan.",
  keywords: [
    "AI Engineer",
    "Machine Learning",
    "Computer Vision",
    "Generative AI",
    "Pakistan",
    "Muhammad Subhan",
  ],
  openGraph: {
    title: "Muhammad Subhan - AI Engineer",
    description:
      "Building intelligent systems at the intersection of ML, CV, and GenAI.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${syne.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <ScrollProgress />
          <div className="noise-overlay" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
