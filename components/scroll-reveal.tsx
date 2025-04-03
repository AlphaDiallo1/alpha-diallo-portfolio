"use client"

import { type ReactNode, useRef, useEffect } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

interface ScrollRevealProps {
  children: ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  distance?: number
  once?: boolean
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  distance = 50,
  once = false, // Changed to false to enable animations when scrolling up
}: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-100px 0px" })
  const controls = useAnimation()

  // Set initial direction offsets
  let x = 0
  let y = 0

  if (direction === "up") y = distance
  if (direction === "down") y = -distance
  if (direction === "left") x = distance
  if (direction === "right") x = -distance

  useEffect(() => {
    if (isInView) {
      controls.start({
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
        },
      })
    } else {
      // Reset animation when element is out of view
      controls.start({
        x,
        y,
        opacity: 0,
        transition: {
          duration: duration * 0.5,
          ease: [0.25, 0.1, 0.25, 1],
        },
      })
    }
  }, [isInView, controls, delay, duration, x, y])

  return (
    <motion.div ref={ref} initial={{ opacity: 0, x, y }} animate={controls} className="w-full">
      {children}
    </motion.div>
  )
}

