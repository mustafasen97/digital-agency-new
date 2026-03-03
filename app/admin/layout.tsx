import type { Metadata } from "next"
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google"
import AdminSidebar from "@/components/admin/admin-sidebar"
import AdminNavbar from "@/components/admin/admin-navbar"
import { AdminThemeProvider } from "@/lib/admin-theme-context"

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Admin Panel — WebTasarımEvi",
    template: "%s | Admin — WebTasarımEvi",
  },
  description: "WebTasarımEvi CMS Admin Panel",
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminThemeProvider>
      <div
        className={`admin-panel ${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable} flex h-screen overflow-hidden transition-colors duration-300`}
        style={{
          backgroundColor: "var(--admin-bg-primary)",
          color: "var(--admin-text-primary)",
          fontFamily: "var(--font-dm-sans), sans-serif",
        }}
      >
        <AdminSidebar />
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <AdminNavbar />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </AdminThemeProvider>
  )
}
