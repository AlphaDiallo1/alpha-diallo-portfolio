import { ArrowDown, ArrowUpRight, Github, Linkedin } from "lucide-react"
import { AnimatedText, ContactForm, FadeIn, ProjectStack, WorkMarquee } from "@/components/portfolio-motion"
import HeroHead from "@/components/hero-head"
import { projects, skills } from "@/lib/portfolio-data"

function ContactButton() {
  return <a className="contact-button" href="#contact">Contact me <ArrowUpRight size={18} aria-hidden="true" /></a>
}

export default function Home() {
  return <main id="top" className="portfolio">
    <a className="skip-link" href="#about">Skip to content</a>
    <section className="hero" aria-labelledby="hero-title">
      <FadeIn className="hero-nav" y={-20}><nav aria-label="Primary navigation"><a href="#about">About</a><a href="#skills">Skills</a><a href="#projects">Projects</a><a href="#contact">Contact</a></nav></FadeIn>
      <div className="hero-title-wrap"><FadeIn delay={0.15} y={40}><h1 id="hero-title" className="hero-heading">Hi, I&apos;m Alpha</h1></FadeIn></div>
      <div className="hero-role"><span>Alpha Diallo</span><span>Software engineer</span></div>
      <FadeIn className="hero-portrait hero-portrait-3d" delay={0.4}><HeroHead /></FadeIn>
      <div className="hero-bottom"><FadeIn delay={0.35} className="hero-intro"><p>Clean interfaces.<br />Thoughtful motion.<br />Ideas brought to life.</p><a className="scroll-cue" href="#projects"><ArrowDown size={15} aria-hidden="true" /> Explore my work</a></FadeIn><FadeIn className="hero-cta" delay={0.5}><ContactButton /><p>Based in Staten Island, NY</p></FadeIn></div>
    </section>
    <section className="work-strip" aria-label="Selected project previews"><div className="section-caption"><span>A few things I&apos;ve built</span><span>Scroll to explore / 01—03</span></div><WorkMarquee projects={projects} /></section>
    <section id="about" className="about section-pad" aria-labelledby="about-title">
      <FadeIn className="decoration moon" x={-80} y={0}><img src="/images/moon.png" alt="" width={210} height={210} loading="lazy" /></FadeIn>
      <FadeIn className="decoration lego" x={80} y={0} delay={0.15}><img src="/images/lego.png" alt="" width={210} height={210} loading="lazy" /></FadeIn>
      <FadeIn className="decoration orbit" x={-80} y={0} delay={0.25}><img src="/images/orbit.png" alt="" width={180} height={180} loading="lazy" /></FadeIn>
      <FadeIn className="decoration chrome" x={80} y={0} delay={0.3}><img src="/images/chrome.png" alt="" width={220} height={220} loading="lazy" /></FadeIn>
      <div className="about-content"><FadeIn><p className="eyebrow">The person behind the pixels</p><h2 id="about-title" className="section-title hero-heading">About me</h2></FadeIn>
        <AnimatedText text="I am an emerging software engineer focused on building polished, useful web products with React, Next.js, JavaScript, HTML, CSS, and modern UI tooling." />
        <FadeIn className="journey"><h3>Coding journey</h3><p>My path into coding started with curiosity and daily practice. Through Thinkful and hands-on project work, I have been learning how to turn ideas into responsive interfaces, structure reusable components, and make user experiences feel clear, fast, and dependable.</p><p>I care about the details that make software feel professional: readable layouts, accessible interactions, performance-aware rendering, and designs that stay balanced across phones, laptops, large desktops, and ultrawide screens.</p><p>Outside of coding, I enjoy exploring Staten Island, following professional wrestling, and watching anime. That mix of discipline, storytelling, and visual energy influences the futuristic style of this portfolio.</p></FadeIn>
        <FadeIn><ContactButton /></FadeIn>
      </div>
    </section>
    <section id="skills" className="skills-section section-pad" aria-labelledby="skills-title"><FadeIn className="section-heading"><p className="eyebrow">My evolving toolbox</p><h2 id="skills-title" className="section-title">Skills</h2></FadeIn><div className="skills-list">{skills.map((group, index) => <FadeIn key={group.title} delay={index * 0.05} className="skill-row"><span className="skill-number" aria-hidden="true">0{index + 1}</span><div className="skill-detail"><h3>{group.title}</h3><p>{group.description}</p><div className="skill-tags">{group.items.map(skill => <span key={skill.name}>{skill.name}<small>{skill.level}%</small></span>)}</div></div><ArrowUpRight className="skill-arrow" size={28} aria-hidden="true" /></FadeIn>)}</div></section>
    <section id="projects" className="projects-section section-pad" aria-labelledby="projects-title"><FadeIn className="section-heading"><p className="eyebrow">A selection of my work / 01—03</p><h2 id="projects-title" className="section-title hero-heading">Projects</h2></FadeIn><ProjectStack projects={projects} /></section>
    <section id="contact" className="contact-section section-pad" aria-labelledby="contact-title"><FadeIn><div className="section-caption"><span>Have something in mind?</span><span>Let&apos;s make it happen</span></div><h2 id="contact-title" className="contact-title hero-heading">Let&apos;s talk.</h2></FadeIn><div className="contact-grid"><FadeIn className="contact-info"><p>I am open to software engineering opportunities, collaborations, and conversations with people building thoughtful digital products. Reach out and I will get back to you as soon as I can.</p><a className="email-link" href="mailto:adiallo371@gmail.com">adiallo371@gmail.com <ArrowUpRight size={22} aria-hidden="true" /></a><div className="social-links"><a href="https://github.com/AlphaDiallo1" target="_blank" rel="noopener noreferrer"><Github size={18} aria-hidden="true" /> GitHub</a><a href="https://www.linkedin.com/in/alpha-diallo-a43b38217/" target="_blank" rel="noopener noreferrer"><Linkedin size={18} aria-hidden="true" /> LinkedIn</a></div></FadeIn><FadeIn delay={0.1}><ContactForm /></FadeIn></div></section>
    <footer><a className="wordmark" href="#top">ALPHA<span>®</span></a><p>© {new Date().getFullYear()} Alpha Diallo. All rights reserved.</p><a className="back-top" href="#top">Back to top <ArrowUpRight size={17} aria-hidden="true" /></a></footer>
  </main>
}
