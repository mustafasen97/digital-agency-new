"use client"

import { Bell, Search, ChevronDown, ExternalLink } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const breadcrumbMap: Record<string, string> = {
  admin: "Dashboard",
  pages: "Sayfalar",
  navigation: "Navigasyon Menüsü",
  header: "Header",
  footer: "Footer",
  services: "Hizmetler",
  categories: "Kategoriler",
  portfolio: "Portfolio",
  blog: "Blog",
  tags: "Etiketler",
  team: "Ekip",
  testimonials: "Müşteri Yorumları",
  clients: "Müşteri Logoları",
  users: "Kullanıcılar",
  roles: "Roller & İzinler",
  registration: "Kayıt Ayarları",
  contact: "İletişim",
  settings: "Ayarlar",
  seo: "SEO & Meta",
  social: "Sosyal / OG",
  theme: "Tema & Görünüm",
  logo: "Logo & Favicon",
  css: "Özel CSS",
  analytics: "Analitik",
  email: "E-posta / SMTP",
  security: "Güvenlik",
  new: "Yeni",
  edit: "Düzenle",
}

export default function AdminNavbar() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  const breadcrumbs = segments.map((seg, i) => ({
    label: breadcrumbMap[seg] || seg,
    href: "/" + segments.slice(0, i + 1).join("/"),
  }))

  return (
    <header className="h-16 border-b border-[var(--admin-border)] bg-[var(--admin-bg-secondary)] flex items-center px-6 gap-4 shrink-0">
      {/* Breadcrumb */}
      <nav className="flex-1 flex items-center gap-1.5 text-sm" aria-label="Breadcrumb">
        {breadcrumbs.map((crumb, i) => (
          <span key={crumb.href} className="flex items-center gap-1.5">
            {i > 0 && (
              <span className="text-[var(--admin-text-muted)]">/</span>
            )}
            {i === breadcrumbs.length - 1 ? (
              <span className="text-[var(--admin-text-primary)] font-medium">{crumb.label}</span>
            ) : (
              <Link
                href={crumb.href}
                className="text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] transition-colors"
              >
                {crumb.label}
              </Link>
            )}
          </span>
        ))}
      </nav>

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-md px-3 py-1.5 text-sm text-[var(--admin-text-muted)] w-56">
        <Search size={14} />
        <span>Hızlı ara...</span>
      </div>

      {/* View site */}
      <Link
        href="/"
        target="_blank"
        className="hidden md:flex items-center gap-1.5 text-sm text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] transition-colors"
      >
        <ExternalLink size={14} />
        <span>Siteyi Görüntüle</span>
      </Link>

      {/* Notifications */}
      <button className="relative p-2 rounded-md text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] hover:bg-[var(--admin-hover)] transition-colors">
        <Bell size={18} />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--admin-accent)]" />
        <span className="sr-only">Bildirimler</span>
      </button>

      {/* User menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-md hover:bg-[var(--admin-hover)] transition-colors">
            <div className="w-8 h-8 rounded-full bg-[var(--admin-accent)] flex items-center justify-center text-black font-bold text-sm shrink-0">
              M
            </div>
            <div className="hidden md:block text-left">
              <p className="text-[var(--admin-text-primary)] text-xs font-semibold leading-none">Mustafa Şen</p>
              <p className="text-[var(--admin-text-muted)] text-[11px] mt-0.5">Admin</p>
            </div>
            <ChevronDown size={14} className="text-[var(--admin-text-muted)] hidden md:block" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-[var(--admin-bg-card)] border-[var(--admin-border)] text-[var(--admin-text-primary)] w-48"
        >
          <DropdownMenuItem className="text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] focus:bg-[var(--admin-hover)] cursor-pointer">
            Profilim
          </DropdownMenuItem>
          <DropdownMenuItem className="text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] focus:bg-[var(--admin-hover)] cursor-pointer" asChild>
            <Link href="/admin/settings">Ayarlar</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-[var(--admin-border)]" />
          <DropdownMenuItem className="text-[var(--admin-danger)] focus:bg-[var(--admin-hover)] cursor-pointer">
            Çıkış Yap
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
