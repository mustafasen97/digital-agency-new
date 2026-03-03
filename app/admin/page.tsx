"use client"

import { motion } from "framer-motion"
import {
  Eye, Users, Mail, CheckCircle,
  TrendingUp, ArrowUpRight, PlusCircle,
  Briefcase, MessageSquare, Settings,
  FileText,
} from "lucide-react"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip, ResponsiveContainer,
} from "recharts"
import Link from "next/link"
import {
  visitorData,
  recentMessages,
  recentContent,
} from "@/lib/admin-mock-data"

const fadeIn = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

const statCards = [
  {
    label: "Toplam Sayfa Görüntüleme",
    value: "28.4K",
    trend: "+12% bu hafta",
    positive: true,
    icon: Eye,
  },
  {
    label: "Aktif Üyeler",
    value: "1,247",
    trend: "+8 yeni bu hafta",
    positive: true,
    icon: Users,
  },
  {
    label: "Okunmamış Mesajlar",
    value: "2",
    trend: "Yanıt bekliyor",
    positive: false,
    icon: Mail,
  },
  {
    label: "Yayınlanan İçerikler",
    value: "94",
    trend: "Aktif öğe",
    positive: true,
    icon: CheckCircle,
  },
]

const quickActions = [
  { label: "Yeni Blog Yazısı", icon: PlusCircle, href: "/admin/blog/new" },
  { label: "Yeni Hizmet", icon: Briefcase, href: "/admin/services/new" },
  { label: "Mesajları Görüntüle", icon: MessageSquare, href: "/admin/contact" },
  { label: "Ayarları Aç", icon: Settings, href: "/admin/settings" },
]

const typeColors: Record<string, string> = {
  blog: "var(--admin-info)",
  service: "var(--admin-accent)",
  portfolio: "var(--admin-success)",
}
const typeLabels: Record<string, string> = {
  blog: "Blog",
  service: "Hizmet",
  portfolio: "Portfolio",
}

// TODO: Replace with real analytics provider (GA4 / Plausible / Umami)
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-lg px-3 py-2 text-xs">
        <p className="text-[var(--admin-text-muted)] mb-1">{label}</p>
        <p className="text-[var(--admin-accent)] font-semibold">{payload[0].value.toLocaleString()} ziyaretçi</p>
      </div>
    )
  }
  return null
}

export default function AdminDashboard() {
  return (
    <motion.div
      variants={{ show: { transition: { staggerChildren: 0.06 } } }}
      initial="hidden"
      animate="show"
      className="space-y-6 max-w-[1400px]"
    >
      {/* Page header */}
      <motion.div variants={fadeIn}>
        <h1
          className="text-2xl font-bold text-[var(--admin-text-primary)]"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Dashboard
        </h1>
        <p className="text-sm text-[var(--admin-text-muted)] mt-0.5">WebTasarımEvi yönetim panelinize hoş geldiniz.</p>
      </motion.div>

      {/* Stat cards */}
      <motion.div variants={fadeIn} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-5 group transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(37,99,235,0.08)]"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-[var(--admin-text-muted)] font-medium uppercase tracking-wide">{card.label}</p>
                <p
                  className="text-3xl font-bold text-[var(--admin-text-primary)] mt-1"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {card.value}
                </p>
              </div>
              <div className="p-2 rounded-lg bg-[var(--admin-accent-subtle)]">
                <card.icon size={20} className="text-[var(--admin-accent)]" />
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-3">
              <TrendingUp size={12} className={card.positive ? "text-[var(--admin-success)]" : "text-[var(--admin-danger)]"} />
              <span className={`text-xs font-medium ${card.positive ? "text-[var(--admin-success)]" : "text-[var(--admin-danger)]"}`}>
                {card.trend}
              </span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Chart + Quick actions */}
      <motion.div variants={fadeIn} className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Visitor chart — 2/3 */}
        <div className="xl:col-span-2 bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2
                className="text-base font-semibold text-[var(--admin-text-primary)]"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Ziyaretçi Trendi
              </h2>
              <p className="text-xs text-[var(--admin-text-muted)] mt-0.5">Son 30 gün</p>
            </div>
            <span className="text-xs bg-[var(--admin-accent)]/10 text-[var(--admin-accent)] border border-[var(--admin-accent)]/20 px-2.5 py-1 rounded-full font-medium">
              +18.4% bu ay
            </span>
          </div>
          {/* TODO: Replace with real analytics provider (GA4 / Plausible / Umami) */}
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={visitorData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="visitGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--admin-border)" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fill: "var(--admin-text-muted)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                interval={4}
              />
              <YAxis
                tick={{ fill: "var(--admin-text-muted)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <RechartsTooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="visitors"
                stroke="#2563EB"
                strokeWidth={2}
                fill="url(#visitGradient)"
                dot={false}
                activeDot={{ r: 4, fill: "#2563EB" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Quick actions — 1/3 */}
        <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-6">
          <h2
            className="text-base font-semibold text-[var(--admin-text-primary)] mb-5"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Hızlı İşlemler
          </h2>
          <div className="space-y-2">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] hover:bg-[var(--admin-hover)] transition-all group"
              >
                <action.icon size={16} className="text-[var(--admin-accent)] shrink-0" />
                <span className="flex-1">{action.label}</span>
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>

          <div className="mt-6 pt-5 border-t border-[var(--admin-border)]">
            <p className="text-xs text-[var(--admin-text-muted)] mb-3 font-medium uppercase tracking-wide">Son Aktivite</p>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-xs">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--admin-success)] shrink-0" />
                <span className="text-[var(--admin-text-muted)]">Yeni mesaj alındı</span>
                <span className="ml-auto text-[var(--admin-text-muted)]">5 dk</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--admin-accent)] shrink-0" />
                <span className="text-[var(--admin-text-muted)]">Blog yazısı yayınlandı</span>
                <span className="ml-auto text-[var(--admin-text-muted)]">2 saat</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--admin-info)] shrink-0" />
                <span className="text-[var(--admin-text-muted)]">Yeni üye kaydı</span>
                <span className="ml-auto text-[var(--admin-text-muted)]">1 gün</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom tables */}
      <motion.div variants={fadeIn} className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Inbox */}
        <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--admin-border)]">
            <h2
              className="text-base font-semibold text-[var(--admin-text-primary)]"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Son Mesajlar
            </h2>
            <Link href="/admin/contact" className="text-xs text-[var(--admin-accent)] hover:text-[var(--admin-accent-hover)] transition-colors flex items-center gap-1">
              Tümünü gör <ArrowUpRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-[var(--admin-border)]">
            {recentMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-center gap-4 px-6 py-3 hover:bg-[var(--admin-hover)] transition-colors ${
                  !msg.read ? "border-l-2 border-[var(--admin-accent)]" : ""
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className={`text-sm truncate ${!msg.read ? "text-[var(--admin-text-primary)] font-medium" : "text-[var(--admin-text-muted)]"}`}>
                    {msg.name}
                  </p>
                  <p className="text-xs text-[var(--admin-text-muted)] truncate mt-0.5">{msg.subject}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-[var(--admin-text-muted)]">{msg.time}</span>
                  {!msg.read && (
                    <span className="w-2 h-2 rounded-full bg-[var(--admin-accent)] shrink-0" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent content */}
        <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--admin-border)]">
            <h2
              className="text-base font-semibold text-[var(--admin-text-primary)]"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Son Eklenen İçerikler
            </h2>
            <Link href="/admin/blog" className="text-xs text-[var(--admin-accent)] hover:text-[var(--admin-accent-hover)] transition-colors flex items-center gap-1">
              Tümünü gör <ArrowUpRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-[var(--admin-border)]">
            {recentContent.map((item) => (
              <div key={item.id} className="flex items-center gap-4 px-6 py-3 hover:bg-[var(--admin-hover)] transition-colors">
                <div className="shrink-0">
                  <FileText size={16} style={{ color: typeColors[item.type] }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[var(--admin-text-primary)] truncate">{item.title}</p>
                  <p className="text-xs text-[var(--admin-text-muted)] mt-0.5">{item.time}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full border"
                    style={{
                      color: typeColors[item.type],
                      borderColor: typeColors[item.type] + "40",
                      backgroundColor: typeColors[item.type] + "15",
                    }}
                  >
                    {typeLabels[item.type]}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      item.status === "published"
                        ? "bg-[var(--admin-success)]/15 text-[var(--admin-success)] border border-[var(--admin-success)]/30"
                        : "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30"
                    }`}
                  >
                    {item.status === "published" ? "Yayında" : "Taslak"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
