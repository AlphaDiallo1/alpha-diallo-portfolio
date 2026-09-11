export const projects = [
  { title: "X42", category: "Interactive 3D experience", imageUrl: "/images/x42-preview.svg", description: "A futuristic 3D armor configurator where users can rotate a cinematic robot suit, customize armor colors, toggle upgrades, review live stats, and save builds in a responsive lab interface.", technologies: ["Next.js", "TypeScript", "Three.js", "React Three Fiber", "Tailwind CSS"], githubUrl: "https://github.com/AlphaDiallo1/X42", liveUrl: "https://x42.vercel.app/", accent: "#b6a1e8" },
  { title: "Recipe Tracking App", category: "Frontend application", imageUrl: "/images/recipe-app.png", description: "A frontend CRUD experience for creating, editing, displaying, and deleting recipes with a clean workflow for organizing favorite meals.", technologies: ["React", "React Hooks", "JavaScript", "HTML", "CSS"], githubUrl: "https://github.com/AlphaDiallo1/RecipeApp", liveUrl: "https://recipe-app-alpha.vercel.app", accent: "#e9be93" },
  { title: "ThinkfulBnB", category: "Responsive web design", imageUrl: "/images/thinkfulbnb.png", description: "A responsive vacation-rental landing experience with property listings, search-focused structure, and layouts tuned for desktop and mobile users.", technologies: ["HTML", "CSS", "JavaScript", "Responsive Design"], githubUrl: "https://github.com/AlphaDiallo1/thinkfulbnb", liveUrl: "https://thinkfulbnb-five.vercel.app/", accent: "#99c6c1" },
]
export type Project = (typeof projects)[number]
export const skills = [
  { title: "Frontend development", description: "Responsive interfaces built with reusable components and attention to the details.", items: [{ name: "JavaScript", level: 90 }, { name: "React", level: 85 }, { name: "HTML/CSS", level: 90 }] },
  { title: "Modern web architecture", description: "Clear structure and typed components for dependable web experiences.", items: [{ name: "TypeScript", level: 80 }, { name: "Next.js", level: 70 }, { name: "Tailwind CSS", level: 80 }] },
  { title: "Backend & APIs", description: "Connecting interfaces to server logic and the data that brings them to life.", items: [{ name: "Node.js", level: 75 }, { name: "RESTful APIs", level: 75 }] },
  { title: "Data & databases", description: "Working with structured and document-based data for useful applications.", items: [{ name: "SQL", level: 65 }, { name: "MongoDB", level: 60 }] },
  { title: "Workflow & quality", description: "Version control, thoughtful iteration, and testing throughout the development process.", items: [{ name: "Git", level: 85 }, { name: "Testing", level: 65 }] },
]
