"use client"

import { useRef, useEffect } from "react"

export default function Starfield() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    let animationFrameId
    let stars = []

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Initialize stars
    const initStars = () => {
      stars = []
      const starCount = Math.floor((canvas.width * canvas.height) / 1000)

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          speed: Math.random() * 0.5,
          opacity: Math.random(),
          hue: Math.random() * 60 + 200, // Blue to purple hues
        })
      }
    }

    // Draw stars
    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star) => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${star.hue}, 100%, 80%, ${star.opacity})`
        ctx.fill()

        // Move star
        star.y += star.speed

        // Reset star position if it goes off screen
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }

        // Twinkle effect
        star.opacity = Math.sin(Date.now() * 0.001 * star.speed) * 0.5 + 0.5
      })

      // Occasional shooting star
      if (Math.random() < 0.01) {
        const shootingStar = {
          x: Math.random() * canvas.width,
          y: 0,
          length: Math.random() * 80 + 20,
          speed: Math.random() * 10 + 10,
          angle: (Math.random() * Math.PI) / 4 + Math.PI / 4,
          opacity: 1,
        }

        drawShootingStar(shootingStar)
      }

      animationFrameId = requestAnimationFrame(drawStars)
    }

    // Draw shooting star
    const drawShootingStar = (star) => {
      const tailX = star.x - Math.cos(star.angle) * star.length
      const tailY = star.y + Math.sin(star.angle) * star.length

      const gradient = ctx.createLinearGradient(star.x, star.y, tailX, tailY)
      gradient.addColorStop(0, "rgba(255, 255, 255, " + star.opacity + ")")
      gradient.addColorStop(1, "rgba(145, 94, 255, 0)")

      ctx.beginPath()
      ctx.moveTo(star.x, star.y)
      ctx.lineTo(tailX, tailY)
      ctx.strokeStyle = gradient
      ctx.lineWidth = 2
      ctx.stroke()
    }

    // Handle resize
    const handleResize = () => {
      setCanvasDimensions()
      initStars()
    }

    // Initialize
    setCanvasDimensions()
    initStars()
    drawStars()

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  )
}

