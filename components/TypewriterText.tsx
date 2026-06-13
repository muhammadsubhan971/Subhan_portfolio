"use client"

import { useState, useEffect } from "react"

const strings = [
  "Building Generative AI Systems.",
  "Engineering Computer Vision Pipelines.",
  "Designing RAG Architectures.",
  "Creating Intelligent Applications.",
  "Solving Real Problems with AI.",
]

export function TypewriterText() {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const currentString = strings[currentIndex]

    if (!isDeleting) {
      // Typing forward
      if (displayText.length < currentString.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentString.slice(0, displayText.length + 1))
        }, 45)
        return () => clearTimeout(timeout)
      } else {
        // Pause at end
        const timeout = setTimeout(() => {
          setIsDeleting(true)
        }, 2000)
        return () => clearTimeout(timeout)
      }
    } else {
      // Deleting backward
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, 25)
        return () => clearTimeout(timeout)
      } else {
        // Move to next string
        const timeout = setTimeout(() => {
          setIsDeleting(false)
          setCurrentIndex((prev) => (prev + 1) % strings.length)
        }, 400)
        return () => clearTimeout(timeout)
      }
    }
  }, [displayText, currentIndex, isDeleting])

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="text-zinc-400">
      {displayText}
      <span
        className="text-[#d4af37]"
        style={{ opacity: showCursor ? 1 : 0, transition: "opacity 0.1s" }}
      >
        |
      </span>
    </span>
  )
}
