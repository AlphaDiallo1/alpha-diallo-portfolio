import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProjectCard from "@/components/project-card"
import SkillBadge from "@/components/skill-badge"
import FloatingElement from "@/components/floating-element"
import ScrollReveal from "@/components/scroll-reveal"
import AnimatedProfile from "@/components/animated-profile"
import { HeroModelViewport, PortfolioVisuals } from "@/components/portfolio-visuals"

const siteContainer = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 2xl:max-w-[1440px]"
const sectionShell = "relative overflow-hidden py-20 sm:py-24 lg:py-28"
const sectionBackground =
  "absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(145,94,255,0.16),transparent_34%),linear-gradient(180deg,rgba(5,8,22,0.92),rgba(10,10,46,0.72),rgba(5,8,22,0.94))]"

const skills = [
  { name: "JavaScript", level: 90, delay: 0.05 },
  { name: "React", level: 85, delay: 0.1 },
  { name: "HTML/CSS", level: 90, delay: 0.15 },
  { name: "Node.js", level: 75, delay: 0.2 },
  { name: "TypeScript", level: 80, delay: 0.25 },
  { name: "Next.js", level: 70, delay: 0.3 },
  { name: "Git", level: 85, delay: 0.35 },
  { name: "SQL", level: 65, delay: 0.4 },
  { name: "Tailwind CSS", level: 80, delay: 0.45 },
  { name: "RESTful APIs", level: 75, delay: 0.5 },
  { name: "MongoDB", level: 60, delay: 0.55 },
  { name: "Testing", level: 65, delay: 0.6 },
]

const projects = [
  {
    title: "X42",
    description:
      "A futuristic 3D armor configurator where users can rotate a cinematic robot suit, customize armor colors, toggle upgrades, review live stats, and save builds in a responsive lab interface.",
    technologies: ["Next.js", "TypeScript", "Three.js", "React Three Fiber", "Tailwind CSS"],
    imageUrl: "/images/x42-preview.svg",
    githubUrl: "https://github.com/AlphaDiallo1/X42",
    liveUrl: "https://x42.vercel.app/",
  },
  {
    title: "Recipe Tracking App",
    description:
      "A frontend CRUD experience for creating, editing, displaying, and deleting recipes with a clean workflow for organizing favorite meals.",
    technologies: ["React", "React Hooks", "JavaScript", "HTML", "CSS"],
    imageUrl: "/images/recipe-app.png",
    githubUrl: "https://github.com/AlphaDiallo1/RecipeApp",
    liveUrl: "https://recipe-app-alpha.vercel.app",
  },
  {
    title: "ThinkfulBnB",
    description:
      "A responsive vacation-rental landing experience with property listings, search-focused structure, and layouts tuned for desktop and mobile users.",
    technologies: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    imageUrl: "/images/thinkfulbnb.png",
    githubUrl: "https://github.com/AlphaDiallo1/thinkfulbnb",
    liveUrl: "https://thinkfulbnb-five.vercel.app/",
  },
]

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#050816] text-white">
      <PortfolioVisuals />

      <header className="sticky top-0 z-30 border-b border-[#2a1b5a]/80 bg-[#050816]/80 backdrop-blur-xl">
        <div className={`${siteContainer} flex h-16 items-center justify-between gap-4`}>
          <Link href="/" className="min-w-0 text-lg font-bold text-[#d8d4ff] transition-colors hover:text-white sm:text-xl">
            <FloatingElement yOffset={6} duration={3600}>
              Alpha Diallo
            </FloatingElement>
          </Link>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
            {["about", "skills", "projects", "contact"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="text-sm font-medium capitalize text-[#aaa6c3] transition-colors duration-200 hover:text-[#b99cff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915eff]"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <Button asChild variant="ghost" size="icon" className="text-[#aaa6c3] hover:text-[#b99cff]">
              <Link href="https://github.com/AlphaDiallo1" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
                <Github className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon" className="text-[#aaa6c3] hover:text-[#b99cff]">
              <Link
                href="https://www.linkedin.com/in/alpha-diallo-a43b38217/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1">
        <section className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_38%,rgba(145,94,255,0.22),transparent_32%),linear-gradient(180deg,rgba(5,8,22,0.68),rgba(10,10,46,0.5),rgba(5,8,22,0.86))]" />
          <div className={`${siteContainer} relative z-10`}>
            <div className="grid min-h-[calc(100vh-8rem)] items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,1.08fr)] xl:gap-16">
              <div className="mx-auto flex max-w-3xl flex-col items-center text-center lg:mx-0 lg:items-start lg:text-left">
                <FloatingElement yOffset={12} duration={4200}>
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#915eff]">3D Developer Portfolio</p>
                  <h1 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                    Hi, I'm <span className="text-[#b99cff]">Alpha Diallo</span>
                  </h1>
                </FloatingElement>
                <FloatingElement yOffset={8} duration={4600} delay={160}>
                  <p className="mt-6 max-w-2xl text-lg leading-8 text-[#c7c3df] sm:text-xl lg:text-2xl">
                    Software engineer building responsive web experiences with clean interfaces, thoughtful motion, and
                    production-minded front-end architecture.
                  </p>
                </FloatingElement>
                <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row lg:justify-start">
                  <Button asChild size="lg" className="bg-[#915eff] text-white shadow-[0_0_28px_rgba(145,94,255,0.28)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#7d4edb]">
                    <a href="#contact">Get in Touch</a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-[#915eff]/80 bg-[#151030]/40 text-[#d8d4ff] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#915eff]/10">
                    <a href="#projects">View My Work</a>
                  </Button>
                </div>
              </div>
              <HeroModelViewport />
            </div>
          </div>
        </section>

        <section id="about" className={sectionShell}>
          <div className={sectionBackground} />
          <div className={`${siteContainer} relative z-10`}>
            <ScrollReveal>
              <div className="mx-auto mb-12 max-w-3xl text-center">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#915eff]">About Me</p>
                <h2 className="text-3xl font-bold tracking-tight text-[#f4f1ff] sm:text-4xl lg:text-5xl">Coding Journey</h2>
              </div>
            </ScrollReveal>
            <div className="grid items-center gap-12 lg:grid-cols-[360px_minmax(0,1fr)] xl:gap-16">
              <ScrollReveal direction="left" delay={0.12}>
                <AnimatedProfile imageUrl="/images/profile.png" alt="Alpha Diallo" />
              </ScrollReveal>
              <div className="mx-auto max-w-3xl lg:mx-0">
                <ScrollReveal direction="right" delay={0.18}>
                  <div className="rounded-lg border border-[#2a1b5a]/80 bg-[#151030]/60 p-6 shadow-[0_24px_80px_rgba(5,8,22,0.36)] backdrop-blur md:p-8">
                    <p className="text-xl font-semibold leading-8 text-white">
                      I am an emerging software engineer focused on building polished, useful web products with React,
                      Next.js, JavaScript, HTML, CSS, and modern UI tooling.
                    </p>
                    <div className="mt-6 space-y-5 text-base leading-8 text-[#c7c3df] sm:text-lg">
                      <p>
                        My path into coding started with curiosity and daily practice. Through Thinkful and hands-on
                        project work, I have been learning how to turn ideas into responsive interfaces, structure
                        reusable components, and make user experiences feel clear, fast, and dependable.
                      </p>
                      <p>
                        I care about the details that make software feel professional: readable layouts, accessible
                        interactions, performance-aware rendering, and designs that stay balanced across phones,
                        laptops, large desktops, and ultrawide screens.
                      </p>
                      <p>
                        Outside of coding, I enjoy exploring Staten Island, following professional wrestling, and
                        watching anime. That mix of discipline, storytelling, and visual energy influences the
                        futuristic style of this portfolio.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className={sectionShell}>
          <div className={sectionBackground} />
          <div className={`${siteContainer} relative z-10`}>
            <ScrollReveal>
              <div className="mx-auto mb-12 max-w-3xl text-center">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#915eff]">Toolbox</p>
                <h2 className="text-3xl font-bold tracking-tight text-[#f4f1ff] sm:text-4xl lg:text-5xl">My Skills</h2>
              </div>
            </ScrollReveal>
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {skills.map((skill) => (
                <ScrollReveal key={skill.name} delay={skill.delay} distance={24}>
                  <SkillBadge name={skill.name} level={skill.level} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className={sectionShell}>
          <div className={sectionBackground} />
          <div className={`${siteContainer} relative z-10`}>
            <ScrollReveal>
              <div className="mx-auto mb-12 max-w-3xl text-center">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#915eff]">Selected Work</p>
                <h2 className="text-3xl font-bold tracking-tight text-[#f4f1ff] sm:text-4xl lg:text-5xl">My Projects</h2>
              </div>
            </ScrollReveal>
            <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project, index) => (
                <ScrollReveal key={project.title} direction="up" delay={0.14 + index * 0.1} distance={28}>
                  <ProjectCard {...project} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className={sectionShell}>
          <div className={sectionBackground} />
          <div className={`${siteContainer} relative z-10`}>
            <ScrollReveal>
              <div className="mx-auto mb-12 max-w-3xl text-center">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#915eff]">Contact</p>
                <h2 className="text-3xl font-bold tracking-tight text-[#f4f1ff] sm:text-4xl lg:text-5xl">Get In Touch</h2>
              </div>
            </ScrollReveal>
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
              <div className="space-y-6 rounded-lg border border-[#2a1b5a]/80 bg-[#151030]/45 p-6 backdrop-blur md:p-8">
                <ScrollReveal direction="left" delay={0.12}>
                  <p className="text-lg leading-8 text-[#c7c3df]">
                    I am open to software engineering opportunities, collaborations, and conversations with people
                    building thoughtful digital products. Reach out and I will get back to you as soon as I can.
                  </p>
                </ScrollReveal>
                <ScrollReveal direction="left" delay={0.2}>
                  <div className="flex flex-wrap items-center gap-3 text-[#d8d4ff]">
                    <Mail className="h-5 w-5 text-[#915eff]" />
                    <a href="mailto:adiallo371@gmail.com" className="break-all text-[#b99cff] transition-colors hover:text-white">
                      adiallo371@gmail.com
                    </a>
                  </div>
                </ScrollReveal>
                <ScrollReveal direction="left" delay={0.28}>
                  <div className="flex gap-4">
                    <Button asChild variant="outline" size="icon" className="border-[#915eff]/80 text-[#d8d4ff] hover:bg-[#915eff]/10">
                      <Link href="https://github.com/AlphaDiallo1" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
                        <Github className="h-5 w-5" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="icon" className="border-[#915eff]/80 text-[#d8d4ff] hover:bg-[#915eff]/10">
                      <Link
                        href="https://www.linkedin.com/in/alpha-diallo-a43b38217/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn profile"
                      >
                        <Linkedin className="h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </ScrollReveal>
              </div>
              <ScrollReveal direction="right" delay={0.18}>
                <form className="space-y-4 rounded-lg border border-[#2a1b5a]/90 bg-[#151030]/75 p-6 shadow-[0_24px_80px_rgba(5,8,22,0.34)] backdrop-blur md:p-8">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium leading-none text-[#d8d4ff]">
                        Name
                      </label>
                      <input
                        id="name"
                        className="flex h-11 w-full rounded-md border border-[#2a1b5a] bg-[#1d1836] px-3 py-2 text-sm text-white placeholder:text-[#aaa6c3]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915eff]"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium leading-none text-[#d8d4ff]">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="flex h-11 w-full rounded-md border border-[#2a1b5a] bg-[#1d1836] px-3 py-2 text-sm text-white placeholder:text-[#aaa6c3]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915eff]"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium leading-none text-[#d8d4ff]">
                      Subject
                    </label>
                    <input
                      id="subject"
                      className="flex h-11 w-full rounded-md border border-[#2a1b5a] bg-[#1d1836] px-3 py-2 text-sm text-white placeholder:text-[#aaa6c3]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915eff]"
                      placeholder="Subject"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium leading-none text-[#d8d4ff]">
                      Message
                    </label>
                    <textarea
                      id="message"
                      className="flex min-h-[140px] w-full resize-y rounded-md border border-[#2a1b5a] bg-[#1d1836] px-3 py-2 text-sm text-white placeholder:text-[#aaa6c3]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915eff]"
                      placeholder="Your message"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-[#915eff] text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#7d4edb]">
                    Send Message
                  </Button>
                </form>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-[#2a1b5a]/80 py-6 md:py-8">
        <div className={`${siteContainer} flex flex-col items-center justify-center gap-4 text-center md:flex-row md:gap-6`}>
          <p className="text-sm text-[#aaa6c3]">&copy; {new Date().getFullYear()} Alpha Diallo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
