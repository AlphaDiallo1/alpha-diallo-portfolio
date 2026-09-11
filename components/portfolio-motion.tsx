"use client"
import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react"
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion"
import { ArrowUpRight, Github } from "lucide-react"
import type { Project } from "@/lib/portfolio-data"

export function FadeIn({ children, className, delay = 0, x = 0, y = 30 }: { children: ReactNode; className?: string; delay?: number; x?: number; y?: number }) {
  const reduced = useReducedMotion()
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, x, y }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, margin: "50px", amount: 0 }} transition={{ duration: reduced ? 0 : 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}>{children}</motion.div>
}
export function Magnet({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  useEffect(() => {
    const el = ref.current
    if (!el || reduced || !window.matchMedia("(pointer: fine)").matches) return
    let frame = 0
    const reset = () => { el.style.transform = "translate3d(0,0,0)"; el.style.transition = "transform .6s ease-in-out" }
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const box = el.parentElement!.getBoundingClientRect()
        const x = e.clientX - (box.left + box.width / 2)
        const y = e.clientY - (box.top + box.height / 2)
        if (Math.abs(x) < box.width / 2 + 150 && Math.abs(y) < box.height / 2 + 150) {
          el.style.transition = "transform .3s ease-out"
          el.style.transform = `translate3d(${x / 3}px,${y / 3}px,0)`
        } else reset()
      })
    }
    window.addEventListener("pointermove", move, { passive: true })
    document.documentElement.addEventListener("pointerleave", reset)
    return () => { window.removeEventListener("pointermove", move); document.documentElement.removeEventListener("pointerleave", reset); cancelAnimationFrame(frame); reset() }
  }, [reduced])
  return <div ref={ref} className="magnet">{children}</div>
}
function Character({ char, progress, start, end }: { char: string; progress: MotionValue<number>; start: number; end: number }) {
  const opacity = useTransform(progress, [start, end], [0.22, 1])
  return <motion.span style={{ opacity }}>{char}</motion.span>
}
export function AnimatedText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.2"] })
  let offset = 0
  return <p ref={ref} className="animated-text"><span className="sr-only">{text}</span><span aria-hidden="true">{text.split(" ").map((word, i) => {
    const start = offset
    offset += word.length + 1
    return <span className="animated-word" key={i}>{[...word].map((char, j) => reduced ? <span key={j}>{char}</span> : <Character key={j} char={char} progress={scrollYProgress} start={(start + j) / text.length} end={(start + j + 1) / text.length} />)}{" "}</span>
  })}</span></p>
}
export function WorkMarquee({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const right = useTransform(scrollYProgress, [0, 1], [-600, -100])
  const left = useTransform(scrollYProgress, [0, 1], [-100, -600])
  return <div ref={ref} className="marquee-window" aria-hidden="true">{[projects, [...projects].reverse()].map((row, i) => <motion.div key={i} className="marquee-track" style={{ x: reduced ? -100 : i === 0 ? right : left }}>{[...row, ...row, ...row].map((project, j) => <div className="marquee-tile" key={`${i}-${j}`}><img src={project.imageUrl} alt="" width={420} height={270} loading="lazy" /><span>{project.title}<ArrowUpRight size={17} /></span></div>)}</motion.div>)}</div>
}
function StackingCard({ project, index, total, progress }: { project: Project; index: number; total: number; progress: MotionValue<number> }) {
  const reduced = useReducedMotion()
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - 1 - index) * 0.03])
  return <motion.article className="project-card" id={`project-${index + 1}`} style={{ scale: reduced ? 1 : scale, "--card-index": index } as CSSProperties} aria-labelledby={`project-title-${index}`}>
    <div className="project-top"><span className="project-number" aria-hidden="true">0{index + 1}</span><div><p className="eyebrow">{project.category}</p><h3 id={`project-title-${index}`}>{project.title}</h3></div><a className="outline-button" href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Live project: ${project.title}`}>Live project <ArrowUpRight size={18} aria-hidden="true" /></a></div>
    <div className="project-body"><div className="project-notes"><div className="project-description"><p>{project.description}</p><div className="project-tags">{project.technologies.map(tech => <span key={tech}>{tech}</span>)}</div><a className="source-link" href={project.githubUrl} target="_blank" rel="noopener noreferrer"><Github size={17} aria-hidden="true" /> View source <ArrowUpRight size={16} aria-hidden="true" /></a></div><div className="project-detail-image" style={{ backgroundColor: project.accent }}><img src={project.imageUrl} alt={`${project.title} interface detail`} width={560} height={300} loading="lazy" /></div></div><a className="project-main-image" href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Explore ${project.title}`} style={{ backgroundColor: project.accent }}><img src={project.imageUrl} alt={`${project.title} project preview`} width={900} height={720} loading="lazy" /><span>Explore project <ArrowUpRight size={20} aria-hidden="true" /></span></a></div>
  </motion.article>
}
export function ProjectStack({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  return <div className="project-stack" ref={ref}>{projects.map((project, index) => <StackingCard key={project.title} project={project} index={index} total={projects.length} progress={scrollYProgress} />)}</div>
}
export function ContactForm() {
  const [draft, setDraft] = useState<string | null>(null)
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const subject = String(data.get("subject") || "Portfolio inquiry")
    const body = `${data.get("message")}\n\nFrom: ${data.get("name")}\nReply to: ${data.get("email")}`
    const url = `mailto:adiallo371@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setDraft(url)
    window.location.href = url
  }
  return <form className="contact-form" onSubmit={submit} onChange={() => setDraft(null)}><div className="form-row"><label>Your name<input name="name" autoComplete="name" placeholder="Alex Smith" required maxLength={120} /></label><label>Email address<input name="email" type="email" autoComplete="email" placeholder="alex@example.com" required maxLength={254} /></label></div><label>Subject<input name="subject" placeholder="A project, an opportunity, an idea…" required maxLength={180} /></label><label>Your message<textarea name="message" placeholder="Tell me what you have in mind." required rows={3} maxLength={4000} /></label><div className="form-bottom"><button type="submit" className="contact-button">Create email <ArrowUpRight size={18} aria-hidden="true" /></button><p>Opens a draft in your email app.<br />You review and send it.</p></div>{draft && <p className="form-status" role="status">Your draft is ready. If your email app didn&apos;t open, <a href={draft}>open it here</a> or email adiallo371@gmail.com.</p>}</form>
}
