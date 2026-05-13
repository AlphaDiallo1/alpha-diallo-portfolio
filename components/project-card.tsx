"use client"

import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProjectCardProps {
  title: string
  description: string
  technologies: string[]
  imageUrl: string
  githubUrl: string
  liveUrl: string
}

export default function ProjectCard({
  title,
  description,
  technologies,
  imageUrl,
  githubUrl,
  liveUrl,
}: ProjectCardProps) {
  const [imgError, setImgError] = useState(false)

  return (
    <Card className="group flex h-full flex-col overflow-hidden border-[#2a1b5a]/90 bg-[#151030]/80 shadow-[0_18px_60px_rgba(5,8,22,0.2)] transition-all duration-300 hover:-translate-y-1 hover:border-[#915eff]/60 hover:shadow-[0_24px_80px_rgba(145,94,255,0.22)]">
      <div className="relative aspect-video w-full overflow-hidden bg-[#0b0820]">
        {imgError ? (
          <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#151030,#2a1b5a)] px-6 text-center text-sm font-semibold uppercase tracking-[0.16em] text-[#d8d4ff]">
            {title}
          </div>
        ) : (
          <Image
            src={imageUrl}
            alt={`${title} project preview`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 420px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]"
            quality={82}
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <CardHeader className="space-y-3 p-5 sm:p-6">
        <CardTitle className="text-xl leading-tight text-[#f4f1ff]">{title}</CardTitle>
        <CardDescription className="text-sm leading-6 text-[#c7c3df]/80">{description}</CardDescription>
      </CardHeader>
      <CardContent className="px-5 pb-5 pt-0 sm:px-6">
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="bg-[#2a1b5a] text-[#d8d4ff] hover:bg-[#915eff]/25">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="mt-auto flex flex-col gap-3 px-5 pb-5 pt-0 sm:flex-row sm:justify-between sm:px-6 sm:pb-6">
        <Button asChild variant="outline" size="sm" className="w-full border-[#915eff]/80 text-[#d8d4ff] hover:bg-[#915eff]/10 sm:w-auto">
          <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-4 w-4" />
            Code
          </Link>
        </Button>
        <Button asChild size="sm" className="w-full bg-[#915eff] text-white hover:bg-[#7d4edb] sm:w-auto">
          <Link href={liveUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            Live Demo
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
