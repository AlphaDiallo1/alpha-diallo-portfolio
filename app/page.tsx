"use client"

import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProjectCard from "@/components/project-card"
import SkillBadge from "@/components/skill-badge"
import HeroModel from "@/components/hero-model"
import Starfield from "@/components/starfield"
import FloatingElement from "@/components/floating-element"
import ScrollReveal from "@/components/scroll-reveal"
import AnimatedProfile from "@/components/animated-profile"
import Scroll3DObject from "@/components/scroll-3d-object"
import { Suspense } from "react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#050816] text-white overflow-hidden">
      <Starfield />
      <Scroll3DObject />

      <header className="sticky top-0 z-10 backdrop-blur-sm bg-[#050816]/75 border-b border-[#2a1b5a]">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="font-bold text-xl text-[#aaa6c3]">
            <FloatingElement>Alpha Diallo</FloatingElement>
          </Link>
          <nav className="hidden md:flex gap-6">
            <a
              href="#about"
              className="text-sm font-medium hover:text-[#915eff] transition-colors"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              About
            </a>
            <a
              href="#skills"
              className="text-sm font-medium hover:text-[#915eff] transition-colors"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Skills
            </a>
            <a
              href="#projects"
              className="text-sm font-medium hover:text-[#915eff] transition-colors"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-sm font-medium hover:text-[#915eff] transition-colors"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="https://github.com/AlphaDiallo1" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="text-[#aaa6c3] hover:text-[#915eff]">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link href="https://www.linkedin.com/in/alpha-diallo-a43b38217/" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="text-[#aaa6c3] hover:text-[#915eff]">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 relative">
        {/* Hero Section with 3D Model */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050816] via-[#0a0a2e] to-[#050816] opacity-50"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="flex flex-col items-start space-y-4">
                <FloatingElement yOffset={15} duration={3000}>
                  <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
                    Hi, I'm <span className="text-[#915eff]">Alpha Diallo</span>
                  </h1>
                </FloatingElement>
                <FloatingElement yOffset={10} duration={3500} delay={200}>
                  <p className="text-xl md:text-2xl text-[#aaa6c3]">Software Engineer exploring the digital universe</p>
                </FloatingElement>
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <FloatingElement yOffset={5} duration={4000} delay={400}>
                    <Button
                      size="lg"
                      className="bg-[#915eff] hover:bg-[#7d4edb] text-white"
                      onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                    >
                      Get in Touch
                    </Button>
                  </FloatingElement>
                  <FloatingElement yOffset={5} duration={4000} delay={600}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-[#915eff] text-[#aaa6c3] hover:bg-[#915eff]/10"
                      onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                    >
                      View My Work
                    </Button>
                  </FloatingElement>
                </div>
              </div>
              <div className="h-[400px] w-full">
                <Suspense
                  fallback={
                    <div className="w-full h-full flex items-center justify-center text-[#aaa6c3]">
                      Loading 3D Model...
                    </div>
                  }
                >
                  <HeroModel />
                </Suspense>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 md:py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050816] via-[#0a0a2e] to-[#050816] opacity-30"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <ScrollReveal>
              <h2 className="text-3xl font-bold tracking-tighter mb-8 text-center text-[#aaa6c3]">About Me</h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <ScrollReveal direction="left" delay={0.2}>
                <AnimatedProfile imageUrl="/images/profile.png" alt="Alpha Diallo" />
              </ScrollReveal>
              <div className="space-y-4">
                <ScrollReveal direction="right" delay={0.3}>
                  <p className="text-lg text-[#aaa6c3]">
                    Currently new to HTML and CSS, I had an amazing time building this website. I was introduced to
                    Thinkful by my close relative, I'm determined to become a skilled coder. I'm committed to daily
                    improvement, working with thinkful has been a great help with more work I will achieve my dreams.
                  </p>
                </ScrollReveal>
                <ScrollReveal direction="right" delay={0.4}>
                  <p className="text-lg text-[#aaa6c3]">
                    Outside of coding, I enjoy exploring Staten Island, New York, Professional Wrestling, and Anime.
                  </p>
                </ScrollReveal>
                <ScrollReveal direction="right" delay={0.5}>
                  <p className="text-lg text-[#aaa6c3]">
                    If you're looking for a passionate and dedicated software engineer, feel free to reach out! I'm
                    enthusiastic about collaborating with like-minded professionals and making a positive impact on the
                    tech community.
                  </p>
                </ScrollReveal>
                <ScrollReveal direction="right" delay={0.6}>
                  <h3 className="text-xl font-semibold text-[#915eff] mt-4 mb-2">My Coding Journey</h3>
                  <p className="text-lg text-[#aaa6c3]">
                    I started coding with a strong determination to improve every day. I'm excited to explore new
                    opportunities and challenges in the coding world.
                  </p>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-16 md:py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050816] via-[#0a0a2e] to-[#050816] opacity-30"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <ScrollReveal>
              <h2 className="text-3xl font-bold tracking-tighter mb-8 text-center text-[#aaa6c3]">My Skills</h2>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { name: "JavaScript", level: 90, delay: 0.1 },
                { name: "React", level: 85, delay: 0.2 },
                { name: "HTML/CSS", level: 90, delay: 0.3 },
                { name: "Node.js", level: 75, delay: 0.4 },
                { name: "TypeScript", level: 80, delay: 0.5 },
                { name: "Next.js", level: 70, delay: 0.6 },
                { name: "Git", level: 85, delay: 0.7 },
                { name: "SQL", level: 65, delay: 0.8 },
                { name: "Tailwind CSS", level: 80, delay: 0.9 },
                { name: "RESTful APIs", level: 75, delay: 1.0 },
                { name: "MongoDB", level: 60, delay: 1.1 },
                { name: "Testing", level: 65, delay: 1.2 },
              ].map((skill, index) => (
                <ScrollReveal key={skill.name} delay={skill.delay} distance={20} once={false}>
                  <SkillBadge name={skill.name} level={skill.level} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 md:py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050816] via-[#0a0a2e] to-[#050816] opacity-30"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <ScrollReveal>
              <h2 className="text-3xl font-bold tracking-tighter mb-8 text-center text-[#aaa6c3]">My Projects</h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ScrollReveal direction="up" delay={0.2} once={false}>
                <ProjectCard
                  title="Flashcard-O-Matic"
                  description="An interactive flashcard application that displays decks of study cards with questions and answers. Users can flip cards to study and edit or delete cards."
                  technologies={["React.js", "JavaScript", "HTML", "CSS"]}
                  imageUrl="/images/flashcard-app.png"
                  githubUrl="https://github.com/AlphaDiallo1/FlashCardApp"
                  liveUrl="https://flashcard-app-alpha.vercel.app"
                />
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.4} once={false}>
                <ProjectCard
                  title="Recipe Tracking App"
                  description="A frontend CRUD application for creating, editing, displaying, and deleting recipes. Features a clean, user-friendly interface for managing your favorite recipes."
                  technologies={["React", "React Hooks", "JavaScript", "HTML", "CSS"]}
                  imageUrl="/images/recipe-app.png"
                  githubUrl="https://github.com/AlphaDiallo1/RecipeApp"
                  liveUrl="https://recipe-app-alpha.vercel.app"
                />
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.6} once={false}>
                <ProjectCard
                  title="ThinkfulBnB"
                  description="A responsive vacation rental website inspired by Airbnb. Features property listings, search functionality, and a responsive design for all devices."
                  technologies={["HTML", "CSS", "JavaScript", "Responsive Design"]}
                  imageUrl="/images/thinkfulbnb.png"
                  githubUrl="https://github.com/AlphaDiallo1/thinkfulbnb"
                  liveUrl="https://thinkfulbnb-five.vercel.app/"
                />
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050816] via-[#0a0a2e] to-[#050816] opacity-30"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <ScrollReveal once={false}>
              <h2 className="text-3xl font-bold tracking-tighter mb-8 text-center text-[#aaa6c3]">Get In Touch</h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <ScrollReveal direction="left" delay={0.2} once={false}>
                  <p className="text-lg text-[#aaa6c3]">
                    I'm currently open to new opportunities and collaborations. Feel free to reach out if you'd like to
                    work together or just want to connect!
                  </p>
                </ScrollReveal>
                <ScrollReveal direction="left" delay={0.4} once={false}>
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-[#915eff]" />
                    <a href="mailto:adiallo371@gmail.com" className="text-[#915eff] hover:underline">
                      adiallo371@gmail.com
                    </a>
                  </div>
                </ScrollReveal>
                <ScrollReveal direction="left" delay={0.6} once={false}>
                  <div className="flex gap-4 mt-6">
                    <Link href="https://github.com/AlphaDiallo1" target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-[#915eff] text-[#aaa6c3] hover:bg-[#915eff]/10"
                      >
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                      </Button>
                    </Link>
                    <Link
                      href="https://www.linkedin.com/in/alpha-diallo-a43b38217/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-[#915eff] text-[#aaa6c3] hover:bg-[#915eff]/10"
                      >
                        <Linkedin className="h-5 w-5" />
                        <span className="sr-only">LinkedIn</span>
                      </Button>
                    </Link>
                  </div>
                </ScrollReveal>
              </div>
              <ScrollReveal direction="right" delay={0.4} once={false}>
                <form className="space-y-4 bg-[#151030] p-6 rounded-lg border border-[#2a1b5a]">
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium leading-none text-[#aaa6c3]">
                          Name
                        </label>
                        <input
                          id="name"
                          className="flex h-10 w-full rounded-md border border-[#2a1b5a] bg-[#1d1836] px-3 py-2 text-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#aaa6c3]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915eff] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Your name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium leading-none text-[#aaa6c3]">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="flex h-10 w-full rounded-md border border-[#2a1b5a] bg-[#1d1836] px-3 py-2 text-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#aaa6c3]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915eff] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Your email"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium leading-none text-[#aaa6c3]">
                        Subject
                      </label>
                      <input
                        id="subject"
                        className="flex h-10 w-full rounded-md border border-[#2a1b5a] bg-[#1d1836] px-3 py-2 text-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#aaa6c3]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915eff] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Subject"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium leading-none text-[#aaa6c3]">
                        Message
                      </label>
                      <textarea
                        id="message"
                        className="flex min-h-[120px] w-full rounded-md border border-[#2a1b5a] bg-[#1d1836] px-3 py-2 text-sm text-white ring-offset-background placeholder:text-[#aaa6c3]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915eff] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Your message"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-[#915eff] hover:bg-[#7d4edb] text-white">
                    Send Message
                  </Button>
                </form>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-[#2a1b5a] py-6 md:py-8 relative">
        <div className="container flex flex-col items-center justify-center gap-4 text-center md:flex-row md:gap-6">
          <p className="text-sm text-[#aaa6c3]">© {new Date().getFullYear()} Alpha Diallo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

