"use client"

import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

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

  // Generate a colorful placeholder with project title as fallback
  const placeholderUrl = `https://placehold.co/600x400/151030/aaa6c3?text=${encodeURIComponent(title)}`

  return (
    <Card className="overflow-hidden bg-[#151030] border-[#2a1b5a] hover:shadow-[0_0_15px_rgba(145,94,255,0.3)] transition-all duration-300">
      <div className="aspect-video w-full overflow-hidden bg-[#151030]">
        <img
          src={imgError ? placeholderUrl : imageUrl}
          alt={title}
          className="object-cover w-full h-full transition-transform hover:scale-105"
          onError={() => setImgError(true)}
        />
      </div>
      <CardHeader>
        <CardTitle className="text-[#aaa6c3]">{title}</CardTitle>
        <CardDescription className="text-[#aaa6c3]/70">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="bg-[#2a1b5a] text-[#aaa6c3] hover:bg-[#915eff]/20">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button asChild variant="outline" size="sm" className="border-[#915eff] text-[#aaa6c3] hover:bg-[#915eff]/10">
          <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-4 w-4" />
            Code
          </Link>
        </Button>
        <Button asChild size="sm" className="bg-[#915eff] hover:bg-[#7d4edb] text-white">
          <Link href={liveUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            Live Demo
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

