"use client"

import dynamic from "next/dynamic"
import { Component, useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react"
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"
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
  const [failed, setFailed] = useState(false)
  const [active, setActive] = useState(true)
  const onReady = useCallback(() => setReady(true), [])
  const onError = useCallback(() => { setFailed(true); setReady(false) }, [])
  useEffect(() => {
    if (!viewport.current) return
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { rootMargin: "100px" })
    observer.observe(viewport.current)
    return () => observer.disconnect()
  }, [])

  function start(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0 || !ready) return
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY }
    event.currentTarget.setPointerCapture(event.pointerId)
    event.currentTarget.focus({ preventScroll: true })
  }
  function move(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current || drag.current.id !== event.pointerId) return
    rotation.current.y += (event.clientX - drag.current.x) * 0.009
    rotation.current.x = Math.max(-0.42, Math.min(0.42, rotation.current.x + (event.clientY - drag.current.y) * 0.004))
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY }
  }
  function end(event: PointerEvent<HTMLDivElement>) {
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
    if (event.key === "ArrowUp") rotation.current.x = Math.max(-0.42, rotation.current.x - 0.1)
    if (event.key === "ArrowDown") rotation.current.x = Math.min(0.42, rotation.current.x + 0.1)
  }
  return <div className="hero-head" ref={viewport}>
    <div className="head-canvas" role="group" aria-label="Interactive 3D head of Alpha. Drag left or right to rotate. Arrow keys rotate, Home resets." aria-describedby="head-help" tabIndex={ready ? 0 : -1} onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end} onLostPointerCapture={() => { drag.current = null }} onKeyDown={keyboard}>
      {!ready && <img className="head-fallback" src="/images/alpha-head-reference.png" alt="Alpha's supplied avatar reference" width={689} height={566} />}
      <SceneBoundary onError={onError}><HeadScene rotation={rotation} reduced={!!reduced} active={active} onReady={onReady} /></SceneBoundary>
    </div>
    <div className="head-controls"><button type="button" disabled={!ready} onClick={() => { rotation.current.y -= Math.PI / 4 }} aria-label="Rotate head left"><ChevronLeft size={16} /></button><p id="head-help">{failed ? "3D unavailable on this device" : ready ? "Drag to explore" : "Loading 3D head"}</p><button type="button" disabled={!ready} onClick={() => { rotation.current.y += Math.PI / 4 }} aria-label="Rotate head right"><ChevronRight size={16} /></button><button type="button" disabled={!ready} onClick={reset} aria-label="Reset head to front view"><RotateCcw size={14} /></button></div>
  </div>
}
