"use client"

import { usePathname } from "next/navigation"
import TopBar from "@/components/top-bar"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"
import { AuthProvider } from "@/lib/auth-context"

export default function SiteLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith("/admin")

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <AuthProvider>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#FF6B35] focus:text-white focus:rounded-lg"
      >
        Ana içeriğe geç
      </a>
      <TopBar />
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <FloatingButtons />
    </AuthProvider>
  )
}
