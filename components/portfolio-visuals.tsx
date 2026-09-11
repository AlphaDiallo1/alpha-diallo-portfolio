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
    <div className="relative mx-auto h-[360px] w-full max-w-[760px] overflow-visible sm:h-[460px] lg:h-[580px] xl:h-[620px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(145,94,255,0.22),transparent_44%)]" />
      <HeroModel />
    </div>
  )
}
