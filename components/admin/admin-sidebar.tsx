"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  Globe,
  FileText,
  Navigation,
  LayoutTemplate,
  AlignJustify,
  Briefcase,
  List,
  FolderOpen,
  Image,
  BookOpen,
  Tag,
  Hash,
  Users,
  Star,
  Building2,
  UserCircle,
  ShieldCheck,
  Settings2,
  MessageSquare,
  Sliders,
  Search,
  Palette,
  Type,
  ImageIcon,
  Code2,
  BarChart2,
  Settings,
  Mail,
  Lock,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type NavItem = {
  label: string
  icon: React.ElementType
  href?: string
  children?: NavItem[]
}

const navGroups: { label: string; items: NavItem[] }[] = [
  {
    label: "",
    items: [{ label: "Dashboard", icon: LayoutDashboard, href: "/admin" }],
  },
  {
    label: "Site Yönetimi",
    items: [
      {
        label: "Site Yönetimi",
        icon: Globe,
        children: [
          { label: "Sayfalar", icon: FileText, href: "/admin/pages" },
          { label: "Navigasyon Menüsü", icon: Navigation, href: "/admin/navigation" },
          { label: "Header", icon: LayoutTemplate, href: "/admin/header" },
          { label: "Footer", icon: AlignJustify, href: "/admin/footer" },
        ],
      },
    ],
  },
  {
    label: "İçerik",
    items: [
      {
        label: "Hizmetler",
        icon: Briefcase,
        children: [
          { label: "Hizmet Listesi", icon: List, href: "/admin/services" },
          { label: "Hizmet Kategorileri", icon: FolderOpen, href: "/admin/services/categories" },
        ],
      },
      {
        label: "Portfolio",
        icon: Image,
        children: [
          { label: "Projeler", icon: FolderOpen, href: "/admin/portfolio" },
          { label: "Proje Kategorileri", icon: Tag, href: "/admin/portfolio/categories" },
        ],
      },
      {
        label: "Blog",
        icon: BookOpen,
        children: [
          { label: "Yazılar", icon: FileText, href: "/admin/blog" },
          { label: "Kategoriler", icon: Tag, href: "/admin/blog/categories" },
          { label: "Etiketler", icon: Hash, href: "/admin/blog/tags" },
        ],
      },
    ],
  },
  {
    label: "Ekip & Sosyal Kanıt",
    items: [
      {
        label: "Ekip",
        icon: Users,
        children: [
          { label: "Ekip Üyeleri", icon: UserCircle, href: "/admin/team" },
        ],
      },
      {
        label: "Referanslar & Müşteriler",
        icon: Star,
        children: [
          { label: "Müşteri Yorumları", icon: Star, href: "/admin/testimonials" },
          { label: "Müşteri Logoları", icon: Building2, href: "/admin/clients" },
        ],
      },
    ],
  },
  {
    label: "Kullanıcılar",
    items: [
      {
        label: "Üyelik",
        icon: UserCircle,
        children: [
          { label: "Kullanıcılar", icon: Users, href: "/admin/users" },
          { label: "Roller & İzinler", icon: ShieldCheck, href: "/admin/roles" },
          { label: "Kayıt Ayarları", icon: Settings2, href: "/admin/registration" },
        ],
      },
    ],
  },
  {
    label: "İletişim",
    items: [
      {
        label: "İletişim",
        icon: MessageSquare,
        children: [
          { label: "Gelen Kutusu", icon: Mail, href: "/admin/contact" },
          { label: "Form Ayarları", icon: Sliders, href: "/admin/contact/settings" },
        ],
      },
    ],
  },
  {
    label: "SEO & Görünüm",
    items: [
      {
        label: "SEO & Meta",
        icon: Search,
        children: [
          { label: "Genel SEO", icon: Globe, href: "/admin/seo" },
          { label: "Sayfa Bazlı SEO", icon: FileText, href: "/admin/seo/pages" },
          { label: "Sosyal / OG Etiketleri", icon: Hash, href: "/admin/seo/social" },
        ],
      },
      {
        label: "Tema & Görünüm",
        icon: Palette,
        children: [
          { label: "Renkler & Fontlar", icon: Type, href: "/admin/theme" },
          { label: "Logo & Favicon", icon: ImageIcon, href: "/admin/theme/logo" },
          { label: "Özel CSS", icon: Code2, href: "/admin/theme/css" },
        ],
      },
    ],
  },
  {
    label: "Sistem",
    items: [
      { label: "Analitik", icon: BarChart2, href: "/admin/analytics" },
      {
        label: "Ayarlar",
        icon: Settings,
        children: [
          { label: "Genel", icon: Settings, href: "/admin/settings" },
          { label: "E-posta / SMTP", icon: Mail, href: "/admin/settings/email" },
          { label: "Güvenlik", icon: Lock, href: "/admin/settings/security" },
        ],
      },
    ],
  },
]

function SidebarItem({
  item,
  collapsed,
  depth = 0,
}: {
  item: NavItem
  collapsed: boolean
  depth?: number
}) {
  const pathname = usePathname()
  const [open, setOpen] = useState(() => {
    if (!item.children) return false
    return item.children.some((c) => pathname === c.href)
  })

  const isActive = item.href ? pathname === item.href : false

  if (item.children) {
    return (
      <div>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => setOpen(!open)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors group",
                  "text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] hover:bg-[var(--admin-hover)]",
                  collapsed ? "justify-center" : "justify-between"
                )}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <item.icon size={18} className="shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </div>
                {!collapsed && (
                  <ChevronDown
                    size={14}
                    className={cn("shrink-0 transition-transform", open && "rotate-180")}
                  />
                )}
              </button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right" className="bg-[var(--admin-bg-card)] text-[var(--admin-text-primary)] border-[var(--admin-border)]">
                {item.label}
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>

        <AnimatePresence initial={false}>
          {open && !collapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="ml-5 pl-3 border-l border-[var(--admin-border)] mt-0.5 space-y-0.5">
                {item.children.map((child) => (
                  <SidebarItem key={child.label} item={child} collapsed={false} depth={depth + 1} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={item.href!}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all group relative",
              collapsed ? "justify-center" : "",
              isActive
                ? "text-[var(--admin-accent)] bg-[var(--admin-active-bg)] border-l-2 border-[var(--admin-accent)] font-medium"
                : "text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] hover:bg-[var(--admin-hover)]"
            )}
          >
            <item.icon size={18} className="shrink-0" />
            {!collapsed && <span className="truncate">{item.label}</span>}
          </Link>
        </TooltipTrigger>
        {collapsed && (
          <TooltipContent side="right" className="bg-[var(--admin-bg-card)] text-[var(--admin-text-primary)] border-[var(--admin-border)]">
            {item.label}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  )
}

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 240 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="relative flex flex-col h-screen bg-[var(--admin-bg-secondary)] border-r border-[var(--admin-border)] overflow-hidden shrink-0"
    >
      {/* Logo */}
      <div
        className={cn(
          "flex items-center h-16 border-b border-[var(--admin-border)] shrink-0 px-4",
          collapsed ? "justify-center" : "justify-between"
        )}
      >
        {!collapsed && (
          <span
            className="text-[var(--admin-text-primary)] font-bold text-base tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="text-[var(--admin-accent)]">WTE</span> Admin
          </span>
        )}
        {collapsed && (
          <span
            className="text-[var(--admin-accent)] font-bold text-lg"
            style={{ fontFamily: "var(--font-display)" }}
          >
            W
          </span>
        )}
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-3 space-y-0.5 scrollbar-hide px-2">
        {navGroups.map((group, gi) => (
          <div key={gi} className={gi > 0 ? "pt-3" : ""}>
            {group.label && !collapsed && (
              <p className="text-[10px] uppercase tracking-widest text-[var(--admin-text-muted)] px-3 pb-1 font-semibold">
                {group.label}
              </p>
            )}
            {group.label && !collapsed && gi > 0 && (
              <div className="border-t border-[var(--admin-border)] mb-2 mx-1" />
            )}
            {group.label && collapsed && gi > 0 && (
              <div className="border-t border-[var(--admin-border)] mb-2 mx-1" />
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <SidebarItem key={item.label} item={item} collapsed={collapsed} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Toggle button */}
      <div className="border-t border-[var(--admin-border)] p-2 shrink-0">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] hover:bg-[var(--admin-hover)] transition-colors",
            collapsed ? "justify-center" : ""
          )}
        >
          {collapsed ? <ChevronRight size={16} /> : <><ChevronLeft size={16} /><span>Daralt</span></>}
        </button>
      </div>
    </motion.aside>
  )
}
