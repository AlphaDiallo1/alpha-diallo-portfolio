"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

interface AnimatedProfileProps {
  imageUrl: string
  alt: string
}

export default function AnimatedProfile({ imageUrl, alt }: AnimatedProfileProps) {
  const [isHovered, setIsHovered] = useState(false)
  const profileRef = useRef(null)
  const isInView = useInView(profileRef, { once: false, margin: "-100px 0px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start({
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        transition: {
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1],
        },
      })
    } else {
      controls.start({
        scale: 0.9,
        opacity: 0,
        filter: "blur(10px)",
        transition: {
          duration: 0.5,
        },
      })
    }
  }, [isInView, controls])

  return (
    <div
      className="relative w-64 h-64 mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={profileRef}
    >
      {/* Rotating outer ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          rotate: 360,
          borderWidth: isHovered ? 6 : 4,
        }}
        transition={{
          rotate: {
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          },
          borderWidth: {
            duration: 0.3,
          },
        }}
        style={{
          border: `4px solid transparent`,
          borderRadius: "50%",
          borderTopColor: "#915eff",
          borderRightColor: "#5d8eff",
          borderBottomColor: "#915eff",
          borderLeftColor: "#5d8eff",
        }}
      />

      {/* Pulsing middle ring */}
      <motion.div
        className="absolute inset-2 rounded-full"
        animate={{
          scale: isHovered ? [1, 1.05, 1] : 1,
          opacity: isHovered ? [0.5, 0.8, 0.5] : 0.5,
        }}
        transition={{
          scale: {
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
          opacity: {
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
        }}
        style={{
          background: "radial-gradient(circle, rgba(145,94,255,0.2) 0%, rgba(93,142,255,0) 70%)",
        }}
      />

      {/* Image container with special fade-in effect */}
      <motion.div
        className="absolute inset-4 rounded-full overflow-hidden border-2 border-[#915eff]/50"
        animate={controls}
        initial={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
      >
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={alt}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              // Fallback if image fails to load
              e.currentTarget.src = "https://placehold.co/400x400/151030/915eff?text=Alpha+Diallo"
            }}
          />
        </div>

        {/* Overlay effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-[#915eff]/20 to-transparent"
          animate={{
            opacity: isHovered ? 0.8 : 0,
          }}
          transition={{
            duration: 0.3,
          }}
        />
      </motion.div>

      {/* Particles around the profile */}
      {isHovered && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-[#915eff]"
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

