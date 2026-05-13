"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, useInView, useReducedMotion } from "framer-motion"

interface AnimatedProfileProps {
  imageUrl: string
  alt: string
}

export default function AnimatedProfile({ imageUrl, alt }: AnimatedProfileProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(profileRef, { once: true, margin: "-80px 0px" })
  const controls = useAnimation()
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion || isInView) {
      controls.start({
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        transition: {
          duration: reduceMotion ? 0 : 0.7,
          ease: [0.25, 0.1, 0.25, 1],
        },
      })
    }
  }, [controls, isInView, reduceMotion])

  return (
    <div
      className="relative mx-auto aspect-square w-64 max-w-[78vw] sm:w-72 lg:w-80"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={profileRef}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={reduceMotion ? undefined : { rotate: 360, borderWidth: isHovered ? 6 : 4 }}
        transition={{
          rotate: {
            duration: 24,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          },
          borderWidth: {
            duration: 0.3,
          },
        }}
        style={{
          border: "4px solid transparent",
          borderTopColor: "#915eff",
          borderRightColor: "#5d8eff",
          borderBottomColor: "#915eff",
          borderLeftColor: "#5d8eff",
        }}
      />

      <motion.div
        className="absolute inset-2 rounded-full"
        animate={
          reduceMotion
            ? undefined
            : {
                scale: isHovered ? [1, 1.05, 1] : 1,
                opacity: isHovered ? [0.52, 0.82, 0.52] : 0.52,
              }
        }
        transition={{
          scale: {
            duration: 2.2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
          opacity: {
            duration: 2.2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
        }}
        style={{
          background: "radial-gradient(circle, rgba(145,94,255,0.22) 0%, rgba(93,142,255,0) 70%)",
        }}
      />

      <motion.div
        className="absolute inset-4 overflow-hidden rounded-full border-2 border-[#915eff]/50 bg-[#151030]"
        animate={controls}
        initial={{ scale: 0.94, opacity: 0, filter: "blur(8px)" }}
      >
        {imageFailed ? (
          <div className="flex h-full w-full items-center justify-center bg-[#151030] text-center text-sm font-semibold uppercase tracking-[0.18em] text-[#aaa6c3]">
            Alpha Diallo
          </div>
        ) : (
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={alt}
            fill
            sizes="(max-width: 640px) 240px, (max-width: 1024px) 288px, 320px"
            className="scale-[1.07] object-cover object-[50%_44%]"
            quality={86}
            onError={() => setImageFailed(true)}
          />
        )}

        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-[#915eff]/20 to-transparent"
          animate={{ opacity: isHovered ? 0.75 : 0 }}
          transition={{ duration: 0.25 }}
        />
      </motion.div>

      {isHovered && !reduceMotion && (
        <>
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-2 w-2 rounded-full bg-[#915eff]"
              initial={{
                x: 0,
                y: 0,
                opacity: 0,
                scale: 0,
              }}
              animate={{
                x: Math.cos((i * Math.PI) / 4) * 120,
                y: Math.sin((i * Math.PI) / 4) * 120,
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
              style={{
                top: "50%",
                left: "50%",
                marginLeft: -4,
                marginTop: -4,
              }}
            />
          ))}
        </>
      )}
    </div>
  )
}
