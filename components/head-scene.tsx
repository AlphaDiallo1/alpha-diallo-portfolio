"use client"

import { Suspense, useEffect, useRef, type MutableRefObject } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"
import * as THREE from "three"

export type HeadRotation = { x: number; y: number }
function Avatar({ rotation, reduced, onReady }: { rotation: MutableRefObject<HeadRotation>; reduced: boolean; onReady: () => void }) {
  const gltf = useLoader(GLTFLoader, "/models/alpha-head.glb")
  const group = useRef<THREE.Group>(null)
  useEffect(onReady, [onReady])
  useFrame(({ clock }, delta) => {
    if (!group.current) return
    const damping = reduced ? 1 : 1 - Math.exp(-10 * delta)
    group.current.rotation.x += (rotation.current.x - group.current.rotation.x) * damping
    group.current.rotation.y += (rotation.current.y - group.current.rotation.y) * damping
    group.current.position.y = reduced ? 0 : Math.sin(clock.elapsedTime * 1.15) * 0.045
  })
  return <group ref={group}><primitive object={gltf.scene} /></group>
}

export default function HeadScene({ rotation, reduced, active, onReady }: { rotation: MutableRefObject<HeadRotation>; reduced: boolean; active: boolean; onReady: () => void }) {
  return <Canvas camera={{ position: [0, 0.02, 5.2], fov: 34 }} dpr={[1, 1.75]} frameloop={active ? "always" : "never"} gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}>
    <ambientLight intensity={1.1} />
    <directionalLight position={[-3, 4, 5]} intensity={2.6} color="#fff0df" />
    <directionalLight position={[3, 1, 4]} intensity={1.1} color="#e3edff" />
    <directionalLight position={[2, 3, -4]} intensity={2.0} color="#9faaff" />
    <directionalLight position={[-3, -1, -2]} intensity={0.8} color="#b4a6ce" />
    <Suspense fallback={null}><Avatar rotation={rotation} reduced={reduced} onReady={onReady} /></Suspense>
  </Canvas>
}
