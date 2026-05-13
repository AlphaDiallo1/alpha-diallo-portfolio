"use client"

import dynamic from "next/dynamic"

const Starfield = dynamic(() => import("@/components/starfield"), {
  ssr: false,
})

const Scroll3DObject = dynamic(() => import("@/components/scroll-3d-object"), {
  ssr: false,
})

const HeroModel = dynamic(() => import("@/components/hero-model"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center text-sm font-medium uppercase tracking-[0.18em] text-[#aaa6c3]">
      Loading 3D Model
    </div>
  ),
})

export function PortfolioVisuals() {
  return (
    <>
      <Starfield />
      <Scroll3DObject />
    </>
  )
}

export function HeroModelViewport() {
  return (
    <div className="relative mx-auto h-[320px] w-full max-w-[720px] overflow-visible sm:h-[420px] lg:h-[520px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(145,94,255,0.2),transparent_42%)]" />
      <HeroModel />
    </div>
  )
}
