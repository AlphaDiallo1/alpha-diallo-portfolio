import type { CSSProperties, ReactNode } from "react"

interface FloatingElementProps {
  children: ReactNode
  yOffset?: number
  duration?: number
  delay?: number
}

export default function FloatingElement({ children, yOffset = 10, duration = 3000, delay = 0 }: FloatingElementProps) {
  return (
    <div
      className="floating-element"
      style={
        {
          "--float-y": `-${yOffset}px`,
          "--float-duration": `${duration}ms`,
          "--float-delay": `${delay}ms`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  )
}
