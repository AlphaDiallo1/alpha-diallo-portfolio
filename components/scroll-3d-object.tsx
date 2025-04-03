"use client"

import { useRef, useEffect, useState, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, Trail, Sparkles } from "@react-three/drei"
import * as THREE from "three"

// Utility function for smooth interpolation
const lerp = (start, end, t) => start * (1 - t) + end * t
const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

// Main rocket ship component
function RocketShip({ scrollY, scrollProgress }) {
  const rocketRef = useRef()
  const exhaustRef = useRef()

  // Smoother path calculation using scroll progress (0-1) instead of raw scrollY
  const pathX = Math.sin(scrollProgress * Math.PI * 2) * 3
  const pathY = scrollProgress * 15 - 5 // Smooth vertical movement
  const pathZ = Math.cos(scrollProgress * Math.PI) * 3 - 5

  // Smooth position with easing
  const [smoothPos, setSmoothPos] = useState([pathX, pathY, pathZ])

  // Rocket movement and rotation with smoother transitions
  useFrame((state, delta) => {
    if (rocketRef.current) {
      // Smooth position update with easing
      setSmoothPos((prev) => [lerp(prev[0], pathX, 0.05), lerp(prev[1], pathY, 0.05), lerp(prev[2], pathZ, 0.05)])

      // Calculate direction of movement for rotation
      const lookAtX = pathX - Math.sin((scrollProgress - 0.01) * Math.PI * 2) * 3
      const lookAtY = pathY - ((scrollProgress - 0.01) * 15 - 5)
      const lookAtZ = pathZ - (Math.cos((scrollProgress - 0.01) * Math.PI) * 3 - 5)

      // Create a look direction
      const direction = new THREE.Vector3(lookAtX, lookAtY, lookAtZ).normalize()

      // Gradually rotate to face direction of travel
      const targetRotation = new THREE.Euler()
      targetRotation.x = Math.atan2(direction.y, Math.sqrt(direction.x * direction.x + direction.z * direction.z))
      targetRotation.y = Math.atan2(direction.x, direction.z)

      // Apply smooth rotation
      rocketRef.current.rotation.x = lerp(rocketRef.current.rotation.x, targetRotation.x + Math.PI / 2, 0.05)
      rocketRef.current.rotation.y = lerp(rocketRef.current.rotation.y, targetRotation.y, 0.05)

      // Add subtle wobble
      rocketRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 2) * 0.05
    }
  })

  return (
    <group position={smoothPos}>
      <group ref={rocketRef}>
        {/* Rocket body */}
        <mesh castShadow position={[0, 0, 0]}>
          <capsuleGeometry args={[0.5, 2, 16, 16]} />
          <meshStandardMaterial color="#ffffff" metalness={0.7} roughness={0.2} />
        </mesh>

        {/* Rocket nose cone */}
        <mesh castShadow position={[0, 1.5, 0]}>
          <coneGeometry args={[0.5, 1, 16]} />
          <meshStandardMaterial color="#ff3333" metalness={0.6} roughness={0.3} />
        </mesh>

        {/* Rocket windows */}
        <mesh castShadow position={[0, 0.5, 0.45]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color="#88ccff"
            metalness={0.9}
            roughness={0.1}
            emissive="#88ccff"
            emissiveIntensity={0.5}
          />
        </mesh>
        <mesh castShadow position={[0, 0, 0.45]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color="#88ccff"
            metalness={0.9}
            roughness={0.1}
            emissive="#88ccff"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Rocket fins */}
        <mesh castShadow position={[0.6, -0.8, 0]} rotation={[0, 0, Math.PI / 2]}>
          <coneGeometry args={[0.3, 0.8, 4]} />
          <meshStandardMaterial color="#ff3333" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh castShadow position={[-0.6, -0.8, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.3, 0.8, 4]} />
          <meshStandardMaterial color="#ff3333" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh castShadow position={[0, -0.8, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.3, 0.8, 4]} />
          <meshStandardMaterial color="#ff3333" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh castShadow position={[0, -0.8, -0.6]} rotation={[-Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.3, 0.8, 4]} />
          <meshStandardMaterial color="#ff3333" metalness={0.6} roughness={0.3} />
        </mesh>

        {/* Rocket engine */}
        <mesh castShadow position={[0, -1.3, 0]}>
          <cylinderGeometry args={[0.3, 0.5, 0.5, 16]} />
          <meshStandardMaterial color="#555555" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Rocket exhaust */}
        <Trail width={1.5} length={10} color={new THREE.Color(0.9, 0.6, 0.1)} attenuation={(t) => t * t}>
          <mesh ref={exhaustRef} position={[0, -1.6, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color="#ffaa00" transparent opacity={0} />
          </mesh>
        </Trail>

        {/* Sparkles for rocket exhaust */}
        <Sparkles count={80} scale={[0.6, 3, 0.6]} size={2} speed={0.4} position={[0, -2.5, 0]} color="#ffaa00" />
      </group>
    </group>
  )
}

// Small spaceship that follows a different path
function SmallSpaceship({ scrollProgress, index, color }) {
  const shipRef = useRef()
  const { viewport } = useThree()

  // Create a unique path for each small ship
  const offset = index * Math.PI * 0.5
  const radius = 5 + index * 0.5
  const speed = 1 + index * 0.2

  // Calculate path
  const pathX = Math.sin(scrollProgress * Math.PI * speed + offset) * radius
  const pathY = scrollProgress * 15 - 8 + Math.sin(scrollProgress * Math.PI * 2) * 2
  const pathZ = Math.cos(scrollProgress * Math.PI * speed + offset) * radius - 5

  // Smooth position with easing
  const [smoothPos, setSmoothPos] = useState([pathX, pathY, pathZ])

  useFrame((state, delta) => {
    if (shipRef.current) {
      // Smooth position update
      setSmoothPos((prev) => [lerp(prev[0], pathX, 0.03), lerp(prev[1], pathY, 0.03), lerp(prev[2], pathZ, 0.03)])

      // Calculate direction for rotation
      const lookAtX = pathX - Math.sin((scrollProgress - 0.01) * Math.PI * speed + offset) * radius
      const lookAtY = pathY - ((scrollProgress - 0.01) * 15 - 8 + Math.sin((scrollProgress - 0.01) * Math.PI * 2) * 2)
      const lookAtZ = pathZ - (Math.cos((scrollProgress - 0.01) * Math.PI * speed + offset) * radius - 5)

      // Create a look direction
      const direction = new THREE.Vector3(lookAtX, lookAtY, lookAtZ).normalize()

      // Gradually rotate to face direction of travel
      const targetRotation = new THREE.Euler()
      targetRotation.x = Math.atan2(direction.y, Math.sqrt(direction.x * direction.x + direction.z * direction.z))
      targetRotation.y = Math.atan2(direction.x, direction.z)

      // Apply smooth rotation
      shipRef.current.rotation.x = lerp(shipRef.current.rotation.x, targetRotation.x + Math.PI / 2, 0.05)
      shipRef.current.rotation.y = lerp(shipRef.current.rotation.y, targetRotation.y, 0.05)

      // Add subtle wobble
      shipRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 2 + index) * 0.1
    }
  })

  return (
    <group position={smoothPos}>
      <group ref={shipRef} scale={[0.3, 0.3, 0.3]}>
        {/* Ship body */}
        <mesh castShadow>
          <capsuleGeometry args={[0.5, 1.5, 16, 16]} />
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Ship cockpit */}
        <mesh castShadow position={[0, 0.8, 0]}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshStandardMaterial color="#88ccff" metalness={0.9} roughness={0.1} transparent opacity={0.8} />
        </mesh>

        {/* Ship wings */}
        <mesh castShadow position={[0.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <coneGeometry args={[0.3, 1.2, 4]} />
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh castShadow position={[-0.8, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.3, 1.2, 4]} />
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Ship engine */}
        <mesh castShadow position={[0, -1, 0]}>
          <cylinderGeometry args={[0.3, 0.4, 0.4, 16]} />
          <meshStandardMaterial color="#555555" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Ship exhaust */}
        <Trail width={0.8} length={6} color={new THREE.Color(0.5, 0.8, 1)} attenuation={(t) => t * t}>
          <mesh position={[0, -1.2, 0]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color="#88ccff" transparent opacity={0} />
          </mesh>
        </Trail>
      </group>
    </group>
  )
}

// Planet component
function Planet({ position, size, color, ringColor, hasRing, rotationSpeed }) {
  const planetRef = useRef()
  const ringRef = useRef()

  useFrame((state) => {
    if (planetRef.current) {
      planetRef.current.rotation.y = state.clock.getElapsedTime() * rotationSpeed
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 3
      ringRef.current.rotation.z = state.clock.getElapsedTime() * rotationSpeed * 0.5
    }
  })

  return (
    <group position={position}>
      {/* Planet body */}
      <mesh ref={planetRef} castShadow>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color={color} metalness={0.2} roughness={0.8} emissive={color} emissiveIntensity={0.1} />
      </mesh>

      {/* Planet ring if needed */}
      {hasRing && (
        <mesh ref={ringRef} castShadow>
          <torusGeometry args={[size * 1.5, size * 0.1, 16, 100]} />
          <meshStandardMaterial color={ringColor} metalness={0.5} roughness={0.6} transparent opacity={0.7} />
        </mesh>
      )}
    </group>
  )
}

// Space scene with planets and ships
function SpaceScene({ scrollY, scrollProgress }) {
  // Create planets at different positions
  const planets = useMemo(
    () => [
      {
        position: [8, scrollProgress * 5, -10],
        size: 2,
        color: "#1a237e", // Darker blue
        ringColor: "#0d47a1",
        hasRing: false,
        rotationSpeed: 0.1,
      },
      {
        position: [-12, scrollProgress * 10 + 5, -15],
        size: 3,
        color: "#4a148c", // Dark purple
        ringColor: "#311b92",
        hasRing: false,
        rotationSpeed: 0.05,
      },
      {
        position: [15, scrollProgress * 15 - 5, -20],
        size: 4,
        color: "#880e4f", // Dark pink/red
        ringColor: "#b71c1c",
        hasRing: true,
        rotationSpeed: 0.08,
      },
      {
        position: [-8, scrollProgress * 20 + 10, -12],
        size: 1.5,
        color: "#004d40", // Dark teal
        ringColor: "#006064",
        hasRing: false,
        rotationSpeed: 0.15,
      },
      {
        position: [10, scrollProgress * 25 - 15, -18],
        size: 2.5,
        color: "#3e2723", // Dark brown
        ringColor: "#212121",
        hasRing: true,
        rotationSpeed: 0.07,
      },
    ],
    [scrollProgress],
  )

  // Create small spaceships
  const smallShips = useMemo(
    () => [
      { index: 0, color: "#3498db" },
      { index: 1, color: "#e74c3c" },
      { index: 2, color: "#f39c12" },
      { index: 3, color: "#2ecc71" },
    ],
    [],
  )

  return (
    <>
      {/* Main rocket */}
      <RocketShip scrollY={scrollY} scrollProgress={scrollProgress} />

      {/* Small spaceships */}
      {smallShips.map((ship, i) => (
        <SmallSpaceship key={i} scrollProgress={scrollProgress} index={ship.index} color={ship.color} />
      ))}

      {/* Planets */}
      {planets.map((planet, i) => (
        <Planet
          key={i}
          position={planet.position}
          size={planet.size}
          color={planet.color}
          ringColor={planet.ringColor}
          hasRing={planet.hasRing}
          rotationSpeed={planet.rotationSpeed}
        />
      ))}

      {/* Background stars */}
      <Sparkles count={300} scale={[50, 50, 50]} size={1} speed={0.2} color="white" />
    </>
  )
}

export default function Scroll3DObject() {
  const [scrollY, setScrollY] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const canvasRef = useRef()

  // Only run on client-side
  useEffect(() => {
    setIsMounted(true)

    // Only add event listener if we're in the browser
    if (typeof window !== "undefined") {
      // Calculate total scroll height for progress calculation
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight,
      )
      const windowHeight = window.innerHeight
      const scrollRange = docHeight - windowHeight

      const handleScroll = () => {
        const currentScrollY = window.scrollY
        setScrollY(currentScrollY)

        // Calculate scroll progress (0 to 1)
        const progress = clamp(currentScrollY / scrollRange, 0, 1)
        setScrollProgress(progress)
      }

      window.addEventListener("scroll", handleScroll, { passive: true })

      // Initial call to set initial position
      handleScroll()

      return () => {
        window.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  // Don't render anything during SSR
  if (!isMounted) {
    return null
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[1]" ref={canvasRef}>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <SpaceScene scrollY={scrollY} scrollProgress={scrollProgress} />
        <Environment preset="night" />
      </Canvas>
    </div>
  )
}

