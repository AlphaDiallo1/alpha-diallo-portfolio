"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, ContactShadows, Float } from "@react-three/drei"
import { useMobile } from "@/hooks/use-mobile"

function AfricanAmericanAstronaut(props) {
  const group = useRef()
  const isMobile = useMobile()
  const [hovered, setHovered] = useState(false)

  // Continuous gentle rotation
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.2
    }
  })

  // Scale based on viewport for responsiveness
  const scale = isMobile ? 1.5 : 2

  return (
    <group ref={group} {...props} scale={[scale, scale, scale]}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <group onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
          {/* Astronaut Body */}
          <mesh castShadow receiveShadow position={[0, 0, 0]}>
            <capsuleGeometry args={[0.5, 1, 4, 8]} />
            <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.8} />
          </mesh>

          {/* Helmet */}
          <mesh castShadow receiveShadow position={[0, 1, 0]}>
            <sphereGeometry args={[0.55, 32, 32]} />
            <meshStandardMaterial color="#aaccff" metalness={0.5} roughness={0.2} transparent={true} opacity={0.7} />
          </mesh>

          {/* Face - African American skin tone */}
          <mesh castShadow receiveShadow position={[0, 1, 0.1]}>
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshStandardMaterial color="#5C3A21" metalness={0.1} roughness={0.8} />
          </mesh>

          {/* Eyes */}
          <mesh castShadow receiveShadow position={[-0.15, 1.05, 0.35]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <mesh castShadow receiveShadow position={[0.15, 1.05, 0.35]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>

          {/* Pupils */}
          <mesh castShadow receiveShadow position={[-0.15, 1.05, 0.39]}>
            <sphereGeometry args={[0.025, 16, 16]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
          <mesh castShadow receiveShadow position={[0.15, 1.05, 0.39]}>
            <sphereGeometry args={[0.025, 16, 16]} />
            <meshStandardMaterial color="#000000" />
          </mesh>

          {/* Mouth - Smile */}
          <mesh castShadow receiveShadow position={[0, 0.9, 0.38]}>
            <torusGeometry args={[0.1, 0.02, 16, 16, Math.PI]} />
            <meshStandardMaterial color="#000000" />
          </mesh>

          {/* Helmet Visor - More transparent to see face */}
          <mesh castShadow receiveShadow position={[0, 1, 0.25]}>
            <sphereGeometry args={[0.45, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
            <meshStandardMaterial
              color={hovered ? "#ff9900" : "#5588ff"}
              metalness={0.9}
              roughness={0.1}
              transparent={true}
              opacity={0.4}
            />
          </mesh>

          {/* Backpack */}
          <mesh castShadow receiveShadow position={[0, 0.2, -0.6]}>
            <boxGeometry args={[0.8, 0.8, 0.4]} />
            <meshStandardMaterial color="#dddddd" metalness={0.2} roughness={0.8} />
          </mesh>

          {/* Left Arm */}
          <group position={[-0.6, 0.2, 0]} rotation={[0, 0, Math.PI / 6]}>
            <mesh castShadow receiveShadow>
              <capsuleGeometry args={[0.2, 0.8, 4, 8]} />
              <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.8} />
            </mesh>
          </group>

          {/* Right Arm */}
          <group position={[0.6, 0.2, 0]} rotation={[0, 0, -Math.PI / 6]}>
            <mesh castShadow receiveShadow>
              <capsuleGeometry args={[0.2, 0.8, 4, 8]} />
              <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.8} />
            </mesh>
          </group>

          {/* Left Leg */}
          <group position={[-0.3, -1, 0]} rotation={[0.2, 0, 0.1]}>
            <mesh castShadow receiveShadow>
              <capsuleGeometry args={[0.25, 0.8, 4, 8]} />
              <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.8} />
            </mesh>
          </group>

          {/* Right Leg */}
          <group position={[0.3, -1, 0]} rotation={[-0.2, 0, -0.1]}>
            <mesh castShadow receiveShadow>
              <capsuleGeometry args={[0.25, 0.8, 4, 8]} />
              <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.8} />
            </mesh>
          </group>

          {/* NASA Logo */}
          <mesh castShadow receiveShadow position={[0, 0.5, 0.55]}>
            <boxGeometry args={[0.3, 0.1, 0.05]} />
            <meshStandardMaterial color="#0B3D91" emissive="#0B3D91" emissiveIntensity={0.2} />
          </mesh>

          {/* NASA Text */}
          <mesh castShadow receiveShadow position={[0, 0.5, 0.58]}>
            <boxGeometry args={[0.25, 0.05, 0.01]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>

          {/* Astronaut glow */}
          <pointLight position={[0, 1, 0.5]} intensity={0.3} color="#5588ff" distance={3} />
        </group>
      </Float>
    </group>
  )
}

export default function HeroModel() {
  return (
    <div className="w-full h-full">
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 25 }}>
        {/* Transparent background to see stars */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <AfricanAmericanAstronaut position={[0, -1, 0]} />
        <Environment preset="night" />
        <ContactShadows position={[0, -2, 0]} opacity={0.3} scale={10} blur={1.5} far={4} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}

