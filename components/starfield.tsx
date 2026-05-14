"use client"

import { useEffect, useRef } from "react"

type Star = {
  x: number
  y: number
  radius: number
  speed: number
  opacity: number
  hue: number
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d", { alpha: true })

    if (!canvas || !ctx) {
      return
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let animationFrameId = 0
    let resizeTimer = 0
    let stars: Star[] = []
    let width = 0
    let height = 0
    let dpr = 1

    const setCanvasDimensions = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const initStars = () => {
      const starCount = Math.min(720, Math.max(160, Math.floor((width * height) / 4200)))
      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.25 + 0.2,
        speed: Math.random() * 0.24 + 0.04,
        opacity: Math.random() * 0.72 + 0.18,
        hue: Math.random() * 60 + 220,
      }))
    }

    const drawStars = () => {
      ctx.clearRect(0, 0, width, height)

      for (const star of stars) {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${star.hue}, 100%, 82%, ${star.opacity})`
        ctx.fill()

        if (!reduceMotion) {
          star.y += star.speed
          if (star.y > height) {
            star.y = 0
            star.x = Math.random() * width
          }
          star.opacity = 0.35 + Math.sin(performance.now() * 0.0007 * (star.speed + 0.5)) * 0.28
        }
      }

      if (!reduceMotion) {
        animationFrameId = requestAnimationFrame(drawStars)
      }
    }

    const handleResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        setCanvasDimensions()
        initStars()
        drawStars()
      }, 160)
    }

    setCanvasDimensions()
    initStars()
    drawStars()

    window.addEventListener("resize", handleResize, { passive: true })

    return () => {
      window.removeEventListener("resize", handleResize)
      window.clearTimeout(resizeTimer)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed left-0 top-0 z-0 h-full w-full pointer-events-none"
      style={{ opacity: 0.64 }}
    />
  )
}
