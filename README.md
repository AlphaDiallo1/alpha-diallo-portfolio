# Alpha Diallo - 3D Animated Portfolio Website

This is the repository for Alpha Diallo's personal portfolio website. It's a modern, animated, and interactive single-page application designed to showcase skills, projects, and experience using cutting-edge web technologies. The site features a space theme with 3D elements, smooth animations, and a responsive design.

## ✨ Features

*   **Interactive 3D Hero Section**: Features a 3D astronaut model created with React Three Fiber.
*   **Dynamic Starfield Background**: A canvas-based animated starfield that adds to the space theme.
*   **Scrolling 3D Rocket Animation**: A 3D rocket ship that animates and follows the user's scroll, accompanied by planets and smaller spaceships.
*   **Preloading Screen**: A 3D rocket-themed preloader that displays loading progress until all page assets are ready.
*   **Smooth Scroll Animations**: Elements reveal themselves with subtle animations as the user scrolls, powered by Framer Motion.
*   **Floating Elements**: UI elements with gentle floating animations for a dynamic feel.
*   **Animated Profile Picture**: A visually engaging profile picture with multiple layers of animation.
*   **Responsive Design**: Adapts to various screen sizes, from mobile to desktop.
*   **Dark Theme**: Utilizes a sleek dark theme suitable for a modern tech portfolio.
*   **Sections**:
    *   **About Me**: Introduction and personal journey.
    *   **Skills**: Showcase of technical skills with progress indicators.
    *   **Projects**: Display of key projects with images, descriptions, technologies, and links to live demos and GitHub repositories.
    *   **Contact**: A section to get in touch, including a contact form (frontend only) and social media links.
*   **Shadcn/ui Components**: Leverages a curated set of reusable UI components.

## 🛠️ Technologies Used

*   **Frontend Framework**: [Next.js](https://nextjs.org/) (App Router)
*   **UI Library**: [React](https://react.dev/)
*   **3D Rendering**:
    *   [Three.js](https://threejs.org/)
    *   [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) (`@react-three/fiber`)
    *   [Drei](https://github.com/pmndrs/drei) (`@react-three/drei`) - Helper utilities for React Three Fiber
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Animation**: [Framer Motion](https://www.framer.com/motion/)
*   **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Deployment**: Intended for deployment on [Vercel](https://vercel.com/)

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18.x or later recommended)
*   npm, yarn, or pnpm

### Installation

1.  **Clone the repository:**
    \`\`\`bash
    git clone https://github.com/your-username/alpha-diallo-portfolio.git
    cd alpha-diallo-portfolio
    \`\`\`
    *(Replace `your-username/alpha-diallo-portfolio.git` with the actual repository URL if different)*

2.  **Install dependencies:**
    Using npm:
    \`\`\`bash
    npm install
    \`\`\`
    Or using yarn:
    \`\`\`bash
    yarn install
    \`\`\`
    Or using pnpm:
    \`\`\`bash
    pnpm install
    \`\`\`

3.  **Run the development server:**
    \`\`\`bash
    npm run dev
    \`\`\`
    Or using yarn:
    \`\`\`bash
    yarn dev
    \`\`\`
    Or using pnpm:
    \`\`\`bash
    pnpm dev
    \`\`\`

4.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure Overview

*   `app/`: Contains the core application routing and pages (Next.js App Router).
    *   `layout.tsx`: Root layout for the application.
    *   `page.tsx`: Main entry point for the home page, orchestrating the preloader and main content.
    *   `globals.css`: Global styles and Tailwind CSS directives.
*   `components/`: Contains all React components.
    *   `ui/`: Shadcn/ui components.
    *   `hero-model.tsx`: The 3D astronaut model for the hero section.
    *   `starfield.tsx`: The animated star background.
    *   `scroll-3d-object.tsx`: The scroll-based 3D rocket animation.
    *   `preloader.tsx`: The 3D loading screen component.
    *   `portfolio-page.tsx`: The main component rendering all sections of the portfolio.
    *   `project-card.tsx`: Component for displaying individual projects.
    *   `skill-badge.tsx`: Component for displaying skills.
    *   `animated-profile.tsx`: Animated profile picture component.
    *   `scroll-reveal.tsx`: Component for scroll-triggered animations.
    *   `floating-element.tsx`: Component for floating animations.
*   `public/`: Static assets like images and fonts.
*   `hooks/`: Custom React hooks (e.g., `useMobile.ts`, `useToast.ts`).
*   `lib/`: Utility functions (e.g., `utils.ts` for `cn`).
*   `tailwind.config.ts`: Tailwind CSS configuration.
*   `next.config.mjs`: Next.js configuration.

## 👤 Author

**Alpha Diallo**

*   GitHub: [@AlphaDiallo1](https://github.com/AlphaDiallo1)
*   LinkedIn: [Alpha Diallo](https://www.linkedin.com/in/alpha-diallo-a43b38217/)
*   Email: [adiallo371@gmail.com](mailto:adiallo371@gmail.com)
