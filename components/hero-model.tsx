"use client"

import { useMemo, useRef, useState } from "react"
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber"
import { ContactShadows, Environment, Float, OrbitControls, Sparkles } from "@react-three/drei"
import { useMobile } from "@/hooks/use-mobile"
import * as THREE from "three"

function SuitSegment({
  position,
  rotation,
  scale,
  color = "#f4f7ff",
}: {
  position: [number, number, number]
  rotation?: [number, number, number]
  scale: [number, number, number]
  color?: string
}) {
  return (
    <mesh castShadow receiveShadow position={position} rotation={rotation} scale={scale}>
      <capsuleGeometry args={[0.5, 0.9, 8, 18]} />
      <meshStandardMaterial color={color} metalness={0.36} roughness={0.45} />
    </mesh>
  )
}

function Hose({ points }: { points: THREE.Vector3[] }) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points])

  return (
    <mesh castShadow receiveShadow>
      <tubeGeometry args={[curve, 28, 0.025, 8, false]} />
      <meshStandardMaterial color="#5d8eff" emissive="#5d8eff" emissiveIntensity={0.45} metalness={0.35} roughness={0.38} />
    </mesh>
  )
}

function PremiumAstronaut(props: ThreeElements["group"]) {
  const group = useRef<THREE.Group>(null)
  const isMobile = useMobile()
  const [hovered, setHovered] = useState(false)
  const scale = isMobile ? 1.24 : 1.56

  const leftHose = useMemo(
    () => [new THREE.Vector3(-0.42, 0.34, 0.46), new THREE.Vector3(-0.86, 0.12, 0.34), new THREE.Vector3(-0.82, -0.5, 0.2)],
    [],
  )
  const rightHose = useMemo(
    () => [new THREE.Vector3(0.34, 0.38, 0.46), new THREE.Vector3(0.92, 0.22, 0.3), new THREE.Vector3(0.82, -0.42, 0.18)],
    [],
  )

  useFrame((state) => {
    if (!group.current) {
      return
    }

    const elapsed = state.clock.getElapsedTime()
    group.current.rotation.y = Math.sin(elapsed * 0.32) * 0.22
    group.current.rotation.z = Math.sin(elapsed * 0.22) * 0.035
  })

  return (
    <group ref={group} {...props} scale={[scale, scale, scale]} rotation={[0.04, -0.12, 0]}>
      <Float speed={1.18} rotationIntensity={0.14} floatIntensity={0.26}>
        <group onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
          <mesh castShadow receiveShadow position={[0, -0.14, 0]} scale={[0.72, 0.98, 0.52]}>
            <capsuleGeometry args={[0.58, 0.95, 10, 24]} />
            <meshStandardMaterial color="#f4f7ff" metalness={0.42} roughness={0.38} />
          </mesh>

          <mesh castShadow receiveShadow position={[0, 0.26, 0.44]} scale={[0.86, 0.72, 0.1]}>
            <boxGeometry args={[0.82, 0.78, 0.18]} />
            <meshStandardMaterial color="#141a33" metalness={0.55} roughness={0.26} />
          </mesh>

          <mesh castShadow receiveShadow position={[0, 0.28, 0.55]}>
            <boxGeometry args={[0.54, 0.3, 0.06]} />
            <meshStandardMaterial color="#101525" emissive="#5d8eff" emissiveIntensity={hovered ? 0.7 : 0.42} metalness={0.7} roughness={0.18} />
          </mesh>

          {[-0.18, 0, 0.18].map((x) => (
            <mesh key={x} castShadow receiveShadow position={[x, 0.28, 0.6]}>
              <sphereGeometry args={[0.035, 12, 12]} />
              <meshStandardMaterial color={x === 0 ? "#b99cff" : "#5d8eff"} emissive={x === 0 ? "#915eff" : "#5d8eff"} emissiveIntensity={0.8} />
            </mesh>
          ))}

          <mesh castShadow receiveShadow position={[-0.35, 0.02, 0.52]} rotation={[0, 0, 0.22]}>
            <boxGeometry args={[0.08, 0.78, 0.05]} />
            <meshStandardMaterial color="#915eff" emissive="#915eff" emissiveIntensity={0.35} metalness={0.6} roughness={0.24} />
          </mesh>
          <mesh castShadow receiveShadow position={[0.35, 0.02, 0.52]} rotation={[0, 0, -0.22]}>
            <boxGeometry args={[0.08, 0.78, 0.05]} />
            <meshStandardMaterial color="#5d8eff" emissive="#5d8eff" emissiveIntensity={0.3} metalness={0.6} roughness={0.24} />
          </mesh>

          <mesh castShadow receiveShadow position={[0, 0.88, 0]}>
            <sphereGeometry args={[0.58, 40, 36]} />
            <meshPhysicalMaterial color="#eef8ff" metalness={0.26} roughness={0.12} transparent opacity={0.32} clearcoat={1} clearcoatRoughness={0.08} />
          </mesh>

          <mesh castShadow receiveShadow position={[0, 0.9, 0.05]} scale={[0.82, 0.86, 0.78]}>
            <sphereGeometry args={[0.42, 32, 28]} />
            <meshStandardMaterial color="#6f472c" metalness={0.08} roughness={0.76} />
          </mesh>

          <mesh castShadow receiveShadow position={[0, 0.91, 0.32]} scale={[0.95, 0.54, 0.24]}>
            <sphereGeometry args={[0.46, 36, 18]} />
            <meshPhysicalMaterial
              color={hovered ? "#b99cff" : "#5d8eff"}
              emissive={hovered ? "#915eff" : "#15244f"}
              emissiveIntensity={hovered ? 0.38 : 0.16}
              metalness={0.82}
              roughness={0.12}
              transparent
              opacity={0.58}
              clearcoat={1}
            />
          </mesh>

          <mesh castShadow receiveShadow position={[0, 0.9, 0.43]} scale={[1.04, 0.66, 0.08]}>
            <torusGeometry args={[0.36, 0.025, 10, 48]} />
            <meshStandardMaterial color="#d8d4ff" emissive="#915eff" emissiveIntensity={0.24} metalness={0.72} roughness={0.18} />
          </mesh>

          <mesh castShadow receiveShadow position={[0, 0.88, -0.02]}>
            <torusGeometry args={[0.62, 0.045, 14, 56]} />
            <meshStandardMaterial color="#d8d4ff" metalness={0.64} roughness={0.2} />
          </mesh>

          <mesh castShadow receiveShadow position={[0, 0.9, -0.65]} scale={[0.74, 0.78, 0.34]}>
            <boxGeometry args={[0.9, 1.05, 0.52]} />
            <meshStandardMaterial color="#d9dff0" metalness={0.48} roughness={0.36} />
          </mesh>
          <mesh castShadow receiveShadow position={[-0.24, 0.93, -0.96]} rotation={[0.35, 0, 0]}>
            <cylinderGeometry args={[0.045, 0.045, 0.72, 12]} />
            <meshStandardMaterial color="#5d8eff" emissive="#5d8eff" emissiveIntensity={0.35} />
          </mesh>
          <mesh castShadow receiveShadow position={[0.24, 0.93, -0.96]} rotation={[0.35, 0, 0]}>
            <cylinderGeometry args={[0.045, 0.045, 0.72, 12]} />
            <meshStandardMaterial color="#915eff" emissive="#915eff" emissiveIntensity={0.35} />
          </mesh>

          <SuitSegment position={[-0.68, 0.12, 0.05]} rotation={[0.18, 0, 0.48]} scale={[0.32, 0.84, 0.32]} />
          <SuitSegment position={[0.68, 0.12, 0.05]} rotation={[-0.15, 0, -0.48]} scale={[0.32, 0.84, 0.32]} />
          <SuitSegment position={[-0.98, -0.48, 0.1]} rotation={[0.08, 0.1, -0.18]} scale={[0.25, 0.5, 0.25]} color="#dfe6f7" />
          <SuitSegment position={[0.98, -0.48, 0.1]} rotation={[0.1, -0.08, 0.18]} scale={[0.25, 0.5, 0.25]} color="#dfe6f7" />

          <mesh castShadow receiveShadow position={[-1.04, -0.84, 0.16]} scale={[0.18, 0.16, 0.2]}>
            <sphereGeometry args={[0.5, 20, 20]} />
            <meshStandardMaterial color="#141a33" metalness={0.36} roughness={0.46} />
          </mesh>
          <mesh castShadow receiveShadow position={[1.04, -0.84, 0.16]} scale={[0.18, 0.16, 0.2]}>
            <sphereGeometry args={[0.5, 20, 20]} />
            <meshStandardMaterial color="#141a33" metalness={0.36} roughness={0.46} />
          </mesh>

          <SuitSegment position={[-0.3, -1.05, 0.04]} rotation={[0.28, 0, 0.08]} scale={[0.34, 0.88, 0.34]} />
          <SuitSegment position={[0.3, -1.06, 0.02]} rotation={[-0.18, 0, -0.08]} scale={[0.34, 0.86, 0.34]} />

          <mesh castShadow receiveShadow position={[-0.34, -1.68, 0.18]} rotation={[0.16, 0, 0.05]} scale={[0.34, 0.18, 0.46]}>
            <boxGeometry args={[0.85, 0.5, 1]} />
            <meshStandardMaterial color="#12162b" metalness={0.56} roughness={0.28} />
          </mesh>
          <mesh castShadow receiveShadow position={[0.34, -1.68, 0.18]} rotation={[0.08, 0, -0.05]} scale={[0.34, 0.18, 0.46]}>
            <boxGeometry args={[0.85, 0.5, 1]} />
            <meshStandardMaterial color="#12162b" metalness={0.56} roughness={0.28} />
          </mesh>

          <mesh castShadow receiveShadow position={[-0.28, 0.68, 0.55]}>
            <circleGeometry args={[0.13, 28]} />
            <meshStandardMaterial color="#101525" emissive="#915eff" emissiveIntensity={0.34} metalness={0.58} roughness={0.24} />
          </mesh>
          <mesh castShadow receiveShadow position={[-0.28, 0.68, 0.56]}>
            <ringGeometry args={[0.08, 0.13, 28]} />
            <meshStandardMaterial color="#b99cff" emissive="#915eff" emissiveIntensity={0.55} />
          </mesh>

          <Hose points={leftHose} />
          <Hose points={rightHose} />

          <Sparkles count={26} scale={[2.8, 3.2, 2.6]} size={1.15} speed={0.18} color="#b99cff" opacity={0.65} />
          <pointLight position={[0, 0.82, 0.9]} intensity={hovered ? 1.1 : 0.58} color="#915eff" distance={3.2} />
        </group>
      </Float>
    </group>
  )
}

export default function HeroModel() {
  return (
    <div className="h-full w-full">
      <Canvas
        shadows
        camera={{ position: [0, 0.16, 9.8], fov: 31 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.46} />
        <spotLight position={[5, 6, 5]} angle={0.24} penumbra={0.85} intensity={1.1} castShadow />
        <pointLight position={[-4, 1.5, 4]} intensity={0.8} color="#915eff" />
        <pointLight position={[3, -2, 2]} intensity={0.42} color="#5d8eff" />
        <PremiumAstronaut position={[0, -0.2, 0]} />
        <Environment preset="night" />
        <ContactShadows position={[0, -2.58, 0]} opacity={0.24} scale={8} blur={1.5} far={4} frames={1} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  )
}
