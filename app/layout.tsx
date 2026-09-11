import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Kanit } from "next/font/google"
import "@/app/globals.css"
import "@/app/hero-head.css"
const kanit = Kanit({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800", "900"], display: "swap", variable: "--font-kanit" })
export const metadata: Metadata = {
  title: "Alpha — Software Engineer",
  description: "Alpha Diallo is a software engineer building responsive web experiences with clean interfaces and thoughtful motion. Explore his projects, skills, and coding journey.",
  icons: { icon: "/icon.svg" },
}
export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en" className={`dark ${kanit.variable}`}><body>{children}<noscript><style>{`[style*="opacity:0"] { opacity:1 !important; transform:none !important; }`}</style></noscript></body></html>
}
