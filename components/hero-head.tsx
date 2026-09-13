"use client"

import dynamic from "next/dynamic"
import { Component, useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react"
import { useReducedMotion } from "framer-motion"
import type { HeadRotation } from "@/components/head-scene"

const HeadScene = dynamic(() => import("@/components/head-scene"), { ssr: false })
class SceneBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch() { this.props.onError() }
  render() { return this.state.failed ? null : this.props.children }
}

export default function HeroHead() {
  const rotation = useRef<HeadRotation>({ x: 0, y: 0 })
  const drag = useRef<{ id: number; x: number; y: number } | null>(null)
  const viewport = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [ready, setReady] = useState(false)
  const [active, setActive] = useState(true)
  const onReady = useCallback(() => setReady(true), [])
  const onError = useCallback(() => setReady(false), [])
  useEffect(() => {
    if (!viewport.current) return
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { rootMargin: "100px" })
    observer.observe(viewport.current)
    return () => observer.disconnect()
  }, [])

  function start(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0 || !ready || drag.current) return
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY }
    event.currentTarget.setPointerCapture(event.pointerId)
    event.currentTarget.focus({ preventScroll: true })
  }
  function move(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current || drag.current.id !== event.pointerId) return
    rotation.current.y += (event.clientX - drag.current.x) * 0.009
    rotation.current.x = Math.max(-1.1, Math.min(1.1, rotation.current.x + (event.clientY - drag.current.y) * 0.006))
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY }
  }
  function end(event: PointerEvent<HTMLDivElement>) {
    if (drag.current?.id !== event.pointerId) return
    drag.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
  }
  function reset() { rotation.current = { x: 0, y: 0 } }
  function keyboard(event: KeyboardEvent<HTMLDivElement>) {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home"].includes(event.key)) return
    event.preventDefault()
    if (event.key === "Home") reset()
    if (event.key === "ArrowLeft") rotation.current.y -= Math.PI / 12
    if (event.key === "ArrowRight") rotation.current.y += Math.PI / 12
    if (event.key === "ArrowUp") rotation.current.x = Math.max(-1.1, rotation.current.x - 0.1)
    if (event.key === "ArrowDown") rotation.current.x = Math.min(1.1, rotation.current.x + 0.1)
  }
  return <div className="hero-head" ref={viewport}>
    <div className="head-canvas" role="group" aria-label="Alpha's 3D avatar. Arrow keys rotate; Home resets." aria-busy={!ready} tabIndex={ready ? 0 : -1} onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end} onLostPointerCapture={() => { drag.current = null }} onKeyDown={keyboard}>
      <SceneBoundary onError={onError}><HeadScene rotation={rotation} reduced={!!reduced} active={active} onReady={onReady} /></SceneBoundary>
    </div>
  </div>
}
