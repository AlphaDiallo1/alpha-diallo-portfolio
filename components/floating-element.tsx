"use client"

import type React from "react"

import type { ReactNode } from "react"
import { useEffect, useState } from "react"

interface FloatingElementProps {
  children: ReactNode
  yOffset?: number
  duration?: number
  delay?: number
}

export default function FloatingElement({ children, yOffset = 10, duration = 2000, delay = 0 }: FloatingElementProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div>{children}</div>
  }

  return (
    <div
      className="floating-element"
      style={
        {
          animation: `float ${duration}ms infinite ease-in-out`,
          animationDelay: `${delay}ms`,
          position: "relative",
          "--y-offset": `-${yOffset}px`,
        } as React.CSSProperties
      }
    >
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(var(--y-offset));
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
      {children}
    </div>
  )
}

