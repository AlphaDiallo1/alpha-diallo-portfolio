"use client"

import { type ReactNode, useEffect, useMemo, useRef } from "react"
import { motion, useAnimation, useInView, useReducedMotion } from "framer-motion"

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
  duration = 0.48,
  distance = 42,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: "-80px 0px" })
  const controls = useAnimation()
  const reduceMotion = useReducedMotion()

  const offset = useMemo(() => {
    if (reduceMotion) {
      return { x: 0, y: 0 }
    }

    if (direction === "up") return { x: 0, y: distance }
    if (direction === "down") return { x: 0, y: -distance }
    if (direction === "left") return { x: distance, y: 0 }
    return { x: -distance, y: 0 }
  }, [direction, distance, reduceMotion])

  useEffect(() => {
    if (reduceMotion || isInView) {
      controls.start({
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          duration: reduceMotion ? 0 : duration,
          delay: reduceMotion ? 0 : delay,
          ease: [0.25, 0.1, 0.25, 1],
        },
      })
      return
    }

    if (!once) {
      controls.start({
        x: offset.x,
        y: offset.y,
        opacity: 0,
        transition: {
          duration: duration * 0.4,
          ease: [0.25, 0.1, 0.25, 1],
        },
      })
    }
  }, [controls, delay, duration, isInView, offset.x, offset.y, once, reduceMotion])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: reduceMotion ? 1 : 0, x: offset.x, y: offset.y }}
      animate={controls}
      className="w-full"
      style={{ willChange: reduceMotion ? "auto" : "transform, opacity" }}
    >
      {children}
    </motion.div>
  )
}
