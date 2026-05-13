"use client"

import { type MutableRefObject, useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sparkles, Trail } from "@react-three/drei"
import * as THREE from "three"

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t
const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max)

type ProgressRef = MutableRefObject<number>

function RocketShip({ progressRef }: { progressRef: ProgressRef }) {
  const rootRef = useRef<THREE.Group>(null)
  const rocketRef = useRef<THREE.Group>(null)
  const targetPosition = useMemo(() => new THREE.Vector3(), [])

  useFrame((state) => {
    const progress = progressRef.current
    const pathX = Math.sin(progress * Math.PI * 2) * 3
    const pathY = progress * 15 - 5
    const pathZ = Math.cos(progress * Math.PI) * 3 - 5

    if (rootRef.current) {
      rootRef.current.position.lerp(targetPosition.set(pathX, pathY, pathZ), 0.055)
    }

    if (rocketRef.current) {
      const previousProgress = clamp(progress - 0.012, 0, 1)
      const lookAtX = pathX - Math.sin(previousProgress * Math.PI * 2) * 3
      const lookAtY = pathY - (previousProgress * 15 - 5)
      const lookAtZ = pathZ - (Math.cos(previousProgress * Math.PI) * 3 - 5)
      const direction = new THREE.Vector3(lookAtX, lookAtY, lookAtZ).normalize()
      const targetX = Math.atan2(direction.y, Math.sqrt(direction.x * direction.x + direction.z * direction.z))
      const targetY = Math.atan2(direction.x, direction.z)

      rocketRef.current.rotation.x = lerp(rocketRef.current.rotation.x, targetX + Math.PI / 2, 0.055)
      rocketRef.current.rotation.y = lerp(rocketRef.current.rotation.y, targetY, 0.055)
      rocketRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 2) * 0.05
    }
  })

  return (
    <group ref={rootRef}>
      <group ref={rocketRef}>
        <mesh castShadow position={[0, 0, 0]}>
          <capsuleGeometry args={[0.5, 2, 12, 12]} />
          <meshStandardMaterial color="#ffffff" metalness={0.65} roughness={0.24} />
        </mesh>
        <mesh castShadow position={[0, 1.5, 0]}>
          <coneGeometry args={[0.5, 1, 14]} />
          <meshStandardMaterial color="#ff3333" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh castShadow position={[0, 0.45, 0.45]}>
          <sphereGeometry args={[0.16, 14, 14]} />
          <meshStandardMaterial color="#88ccff" metalness={0.9} roughness={0.1} emissive="#88ccff" emissiveIntensity={0.45} />
        </mesh>
        <mesh castShadow position={[0.6, -0.8, 0]} rotation={[0, 0, Math.PI / 2]}>
          <coneGeometry args={[0.3, 0.8, 4]} />
          <meshStandardMaterial color="#ff3333" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh castShadow position={[-0.6, -0.8, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.3, 0.8, 4]} />
          <meshStandardMaterial color="#ff3333" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh castShadow position={[0, -1.3, 0]}>
          <cylinderGeometry args={[0.3, 0.5, 0.5, 14]} />
          <meshStandardMaterial color="#555555" metalness={0.78} roughness={0.24} />
        </mesh>
        <Trail width={1.1} length={8} color={new THREE.Color(0.9, 0.6, 0.1)} attenuation={(t) => t * t}>
          <mesh position={[0, -1.6, 0]}>
            <sphereGeometry args={[0.1, 12, 12]} />
            <meshBasicMaterial color="#ffaa00" transparent opacity={0} />
          </mesh>
        </Trail>
        <Sparkles count={38} scale={[0.6, 3, 0.6]} size={1.8} speed={0.3} position={[0, -2.45, 0]} color="#ffaa00" />
      </group>
    </group>
  )
}

function SmallSpaceship({ progressRef, index, color }: { progressRef: ProgressRef; index: number; color: string }) {
  const rootRef = useRef<THREE.Group>(null)
  const shipRef = useRef<THREE.Group>(null)
  const targetPosition = useMemo(() => new THREE.Vector3(), [])

  useFrame((state) => {
    const progress = progressRef.current
    const offset = index * Math.PI * 0.5
    const radius = 5 + index * 0.5
    const speed = 1 + index * 0.18
    const pathX = Math.sin(progress * Math.PI * speed + offset) * radius
    const pathY = progress * 15 - 8 + Math.sin(progress * Math.PI * 2) * 2
    const pathZ = Math.cos(progress * Math.PI * speed + offset) * radius - 5

    if (rootRef.current) {
      rootRef.current.position.lerp(targetPosition.set(pathX, pathY, pathZ), 0.04)
    }

    if (shipRef.current) {
      shipRef.current.rotation.x = lerp(shipRef.current.rotation.x, Math.PI / 2, 0.05)
      shipRef.current.rotation.y = lerp(shipRef.current.rotation.y, Math.sin(progress * Math.PI + offset), 0.05)
      shipRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 2 + index) * 0.1
    }
  })

  return (
    <group ref={rootRef}>
      <group ref={shipRef} scale={[0.3, 0.3, 0.3]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.5, 1.5, 12, 12]} />
          <meshStandardMaterial color={color} metalness={0.78} roughness={0.22} />
        </mesh>
        <mesh castShadow position={[0, 0.8, 0]}>
          <sphereGeometry args={[0.4, 12, 12]} />
          <meshStandardMaterial color="#88ccff" metalness={0.9} roughness={0.1} transparent opacity={0.78} />
        </mesh>
        <mesh castShadow position={[0.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <coneGeometry args={[0.3, 1.2, 4]} />
          <meshStandardMaterial color={color} metalness={0.78} roughness={0.22} />
        </mesh>
        <mesh castShadow position={[-0.8, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.3, 1.2, 4]} />
          <meshStandardMaterial color={color} metalness={0.78} roughness={0.22} />
        </mesh>
        <Trail width={0.65} length={5} color={new THREE.Color(0.5, 0.8, 1)} attenuation={(t) => t * t}>
          <mesh position={[0, -1.2, 0]}>
            <sphereGeometry args={[0.05, 10, 10]} />
            <meshBasicMaterial color="#88ccff" transparent opacity={0} />
          </mesh>
        </Trail>
      </group>
    </group>
  )
}

function Planet({
  progressRef,
  position,
  size,
  color,
  ringColor,
  hasRing,
  rotationSpeed,
  travel,
}: {
  progressRef: ProgressRef
  position: [number, number, number]
  size: number
  color: string
  ringColor: string
  hasRing: boolean
  rotationSpeed: number
  travel: number
}) {
  const rootRef = useRef<THREE.Group>(null)
  const planetRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const progress = progressRef.current

    if (rootRef.current) {
      rootRef.current.position.y = position[1] + progress * travel
    }
    if (planetRef.current) {
      planetRef.current.rotation.y = state.clock.getElapsedTime() * rotationSpeed
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 3
      ringRef.current.rotation.z = state.clock.getElapsedTime() * rotationSpeed * 0.5
    }
  })

  return (
    <group ref={rootRef} position={position}>
      <mesh ref={planetRef} castShadow>
        <sphereGeometry args={[size, 24, 24]} />
        <meshStandardMaterial color={color} metalness={0.2} roughness={0.8} emissive={color} emissiveIntensity={0.1} />
      </mesh>
      {hasRing && (
        <mesh ref={ringRef} castShadow>
          <torusGeometry args={[size * 1.5, size * 0.1, 12, 64]} />
          <meshStandardMaterial color={ringColor} metalness={0.5} roughness={0.6} transparent opacity={0.68} />
        </mesh>
      )}
    </group>
  )
}

function SpaceScene({ progressRef }: { progressRef: ProgressRef }) {
  const planets = useMemo(
    () => [
      { position: [8, 0, -10] as [number, number, number], size: 2, color: "#1a237e", ringColor: "#0d47a1", hasRing: false, rotationSpeed: 0.1, travel: 5 },
      { position: [-12, 5, -15] as [number, number, number], size: 3, color: "#4a148c", ringColor: "#311b92", hasRing: false, rotationSpeed: 0.05, travel: 10 },
      { position: [15, -5, -20] as [number, number, number], size: 4, color: "#880e4f", ringColor: "#b71c1c", hasRing: true, rotationSpeed: 0.08, travel: 15 },
      { position: [-8, 10, -12] as [number, number, number], size: 1.5, color: "#004d40", ringColor: "#006064", hasRing: false, rotationSpeed: 0.15, travel: 20 },
    ],
    [],
  )

  const smallShips = useMemo(
    () => [
      { index: 0, color: "#3498db" },
      { index: 1, color: "#e74c3c" },
      { index: 2, color: "#f39c12" },
    ],
    [],
  )

  return (
    <>
      <RocketShip progressRef={progressRef} />
      {smallShips.map((ship) => (
        <SmallSpaceship key={ship.index} progressRef={progressRef} index={ship.index} color={ship.color} />
      ))}
      {planets.map((planet) => (
        <Planet key={`${planet.position[0]}-${planet.position[2]}`} progressRef={progressRef} {...planet} />
      ))}
      <Sparkles count={140} scale={[48, 48, 48]} size={0.9} speed={0.14} color="white" />
    </>
  )
}

export default function Scroll3DObject() {
  const progressRef = useRef(0)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const compactScreen = window.matchMedia("(max-width: 767px)").matches

    if (reduceMotion || compactScreen) {
      setEnabled(false)
      return
    }

    let ticking = false

    const updateProgress = () => {
      const docHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
      const scrollRange = Math.max(docHeight - window.innerHeight, 1)
      progressRef.current = clamp(window.scrollY / scrollRange, 0, 1)
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress)
        ticking = true
      }
    }

    setEnabled(true)
    updateProgress()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", updateProgress, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", updateProgress)
    }
  }, [])

  if (!enabled) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 1.35]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.48} />
        <pointLight position={[10, 10, 10]} intensity={0.72} />
        <SpaceScene progressRef={progressRef} />
      </Canvas>
    </div>
  )
}
