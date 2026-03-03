"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend,
} from "recharts"
import { Users, MousePointerClick, Clock, TrendingDown } from "lucide-react"
import AdminPageHeader from "@/components/admin/admin-page-header"
import { visitorData, analyticsData } from "@/lib/admin-mock-data"

// TODO: Replace with real analytics provider (GA4 / Plausible / Umami)

const miniStats = [
  { label: "Toplam Ziyaretçi", value: "28.4K", icon: Users, color: "var(--admin-accent)" },
  { label: "Tekil Ziyaretçi", value: "21.6K", icon: MousePointerClick, color: "var(--admin-info)" },
  { label: "Hemen Çıkma Oranı", value: "38.2%", icon: TrendingDown, color: "var(--admin-danger)" },
  { label: "Ortalama Süre", value: "3m 42s", icon: Clock, color: "var(--admin-success)" },
]

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

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<"7" | "30" | "90">("30")

  const slicedData = period === "7" ? visitorData.slice(-7) : period === "30" ? visitorData : visitorData

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="max-w-[1300px] space-y-6"
    >
      <AdminPageHeader
        title="Analitik"
        description="Site ziyaret ve trafik istatistikleri"
        action={
          <div className="flex rounded-lg overflow-hidden border border-[var(--admin-border)]">
            {[{ key: "7", label: "7 Gün" }, { key: "30", label: "30 Gün" }, { key: "90", label: "90 Gün" }].map((p) => (
              <button
                key={p.key}
                onClick={() => setPeriod(p.key as any)}
                className={`px-4 py-2 text-xs font-medium transition-colors ${
                  period === p.key
                    ? "bg-[var(--admin-accent)] text-white"
                    : "text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] hover:bg-[var(--admin-hover)]"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        }
      />

      {/* Mini stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {miniStats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-5 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(37,99,235,0.08)] transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <stat.icon size={18} style={{ color: stat.color }} />
            </div>
            <p className="text-2xl font-bold text-[var(--admin-text-primary)]" style={{ fontFamily: "var(--font-syne)" }}>
              {stat.value}
            </p>
            <p className="text-xs text-[var(--admin-text-muted)] mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Main chart */}
      <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-6">
        <h2 className="text-base font-semibold text-[var(--admin-text-primary)] mb-5" style={{ fontFamily: "var(--font-syne)" }}>
          Ziyaretçi Trendi
        </h2>
        {/* TODO: Replace with real analytics provider (GA4 / Plausible / Umami) */}
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={slicedData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="visitorsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="uniqueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--admin-border)" vertical={false} />
            <XAxis dataKey="date" tick={{ fill: "var(--admin-text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} interval={Math.floor(slicedData.length / 6)} />
            <YAxis tick={{ fill: "var(--admin-text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <RechartsTooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="visitors" stroke="#F59E0B" strokeWidth={2} fill="url(#visitorsGrad)" dot={false} activeDot={{ r: 4, fill: "#F59E0B" }} />
            <Area type="monotone" dataKey="unique" stroke="#3B82F6" strokeWidth={2} fill="url(#uniqueGrad)" dot={false} activeDot={{ r: 4, fill: "#3B82F6" }} />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-6 mt-3 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 rounded bg-[var(--admin-accent)]" />
            <span className="text-xs text-[var(--admin-text-muted)]">Toplam Ziyaretçi</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 rounded bg-[var(--admin-info)]" />
            <span className="text-xs text-[var(--admin-text-muted)]">Tekil Ziyaretçi</span>
          </div>
        </div>
      </div>

      {/* Bottom 3-col grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Top blog posts bar chart */}
        <div className="xl:col-span-2 bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-6">
          <h2 className="text-base font-semibold text-[var(--admin-text-primary)] mb-5" style={{ fontFamily: "var(--font-syne)" }}>
            En Çok Okunan Yazılar
          </h2>
          {/* TODO: Replace with real analytics provider (GA4 / Plausible / Umami) */}
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={analyticsData.topPosts} layout="vertical" margin={{ left: 0, right: 16, top: 0, bottom: 0 }}>
              <XAxis type="number" tick={{ fill: "var(--admin-text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="title" type="category" tick={{ fill: "var(--admin-text-muted)", fontSize: 10 }} axisLine={false} tickLine={false} width={180} />
              <RechartsTooltip
                contentStyle={{ background: "var(--admin-bg-card)", border: "1px solid var(--admin-border)", borderRadius: 8, fontSize: 12 }}
                itemStyle={{ color: "var(--admin-accent)" }}
                labelStyle={{ color: "var(--admin-text-muted)" }}
              />
              <Bar dataKey="views" fill="var(--admin-accent)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Traffic sources donut */}
        <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-6">
          <h2 className="text-base font-semibold text-[var(--admin-text-primary)] mb-5" style={{ fontFamily: "var(--font-syne)" }}>
            Trafik Kaynakları
          </h2>
          {/* TODO: Replace with real analytics provider (GA4 / Plausible / Umami) */}
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={analyticsData.trafficSources}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={78}
                dataKey="value"
                strokeWidth={2}
                stroke="var(--admin-bg-card)"
              >
                {analyticsData.trafficSources.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {analyticsData.trafficSources.map((src) => (
              <div key={src.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: src.color }} />
                  <span className="text-[var(--admin-text-muted)]">{src.name}</span>
                </div>
                <span className="text-[var(--admin-text-primary)] font-semibold">{src.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Device breakdown */}
      <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-6">
        <h2 className="text-base font-semibold text-[var(--admin-text-primary)] mb-4" style={{ fontFamily: "var(--font-syne)" }}>
          Cihaz Dağılımı
        </h2>
        <div className="flex flex-col gap-3">
          {[
            { label: "Masaüstü", value: analyticsData.deviceBreakdown.desktop, color: "var(--admin-accent)" },
            { label: "Mobil", value: analyticsData.deviceBreakdown.mobile, color: "var(--admin-info)" },
            { label: "Tablet", value: analyticsData.deviceBreakdown.tablet, color: "var(--admin-success)" },
          ].map((device) => (
            <div key={device.label} className="flex items-center gap-3">
              <span className="text-sm text-[var(--admin-text-muted)] w-20 shrink-0">{device.label}</span>
              <div className="flex-1 h-2.5 rounded-full bg-[var(--admin-border)] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${device.value}%`, backgroundColor: device.color }}
                />
              </div>
              <span className="text-sm font-semibold text-[var(--admin-text-primary)] w-10 text-right shrink-0">
                {device.value}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Pages table */}
      <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--admin-border)]">
          <h2 className="text-base font-semibold text-[var(--admin-text-primary)]" style={{ fontFamily: "var(--font-syne)" }}>
            Sayfa İstatistikleri
          </h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--admin-border)]">
              {["URL", "Görüntüleme", "Ort. Süre", "Hemen Çıkma"].map((h) => (
                <th key={h} className="text-left px-6 py-3.5 text-[10px] uppercase tracking-widest text-[var(--admin-text-muted)] font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--admin-border)]">
            {analyticsData.pageStats.map((page) => (
              <tr key={page.url} className="hover:bg-[var(--admin-hover)] transition-colors">
                <td className="px-6 py-3.5 font-mono text-xs text-[var(--admin-accent)]">{page.url}</td>
                <td className="px-6 py-3.5 text-[var(--admin-text-primary)] font-semibold">{page.views.toLocaleString()}</td>
                <td className="px-6 py-3.5 text-[var(--admin-text-muted)] text-xs">{page.avgTime}</td>
                <td className="px-6 py-3.5">
                  <span className="text-xs font-semibold" style={{ color: parseFloat(page.bounce) > 40 ? "var(--admin-danger)" : "var(--admin-success)" }}>
                    {page.bounce}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
