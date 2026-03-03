"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Edit2, Trash2, Star, Search, Globe, ShoppingCart, Smartphone, BarChart } from "lucide-react"
import AdminPageHeader from "@/components/admin/admin-page-header"
import AdminStatusBadge from "@/components/admin/admin-status-badge"
import { services } from "@/lib/admin-mock-data"

const iconMap: Record<string, React.ElementType> = {
  Globe,
  ShoppingCart,
  Search,
  Smartphone,
  BarChart,
}

export default function ServicesPage() {
  const [search, setSearch] = useState("")

  const filtered = services.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="max-w-[1200px] space-y-6"
    >
      <AdminPageHeader
        title="Hizmetler"
        description="Site hizmetlerini yönetin ve sıralayın"
        action={
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--admin-accent)] hover:bg-[var(--admin-accent-hover)] text-white font-semibold text-sm rounded-lg transition-colors">
            <Plus size={15} />
            Yeni Hizmet
          </button>
        }
      />

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-lg px-3 py-2 text-sm w-64">
          <Search size={14} className="text-[var(--admin-text-muted)]" />
          <input
            type="text"
            placeholder="Hizmet ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-[var(--admin-text-primary)] placeholder:text-[var(--admin-text-muted)] outline-none flex-1 text-sm"
          />
        </div>
      </div>

      <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--admin-border)]">
                {["Sıra", "Hizmet", "Kategori", "İkon", "Öne Çıkan", "Durum", "İşlemler"].map((h) => (
                  <th key={h} className="text-left px-5 py-3.5 text-[10px] uppercase tracking-widest text-[var(--admin-text-muted)] font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--admin-border)]">
              {filtered.map((svc) => {
                const Icon = iconMap[svc.icon] || Globe
                return (
                  <tr key={svc.id} className="hover:bg-[var(--admin-hover)] transition-colors group">
                    <td className="px-5 py-3.5">
                      <span className="text-xs font-mono text-[var(--admin-text-muted)] bg-[var(--admin-bg-secondary)] px-2 py-0.5 rounded border border-[var(--admin-border)]">
                        #{svc.order}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-[var(--admin-text-primary)] font-medium">{svc.title}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--admin-accent)]/15 text-[var(--admin-accent)] border border-[var(--admin-accent)]/30">
                        {svc.category}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5 text-[var(--admin-text-muted)]">
                        <Icon size={15} />
                        <span className="text-xs font-mono">{svc.icon}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      {svc.featured ? (
                        <Star size={15} className="text-[var(--admin-accent)] fill-[var(--admin-accent)]" />
                      ) : (
                        <Star size={15} className="text-[var(--admin-text-muted)]" />
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <AdminStatusBadge status={svc.status as any} />
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 rounded text-[var(--admin-text-muted)] hover:text-[var(--admin-accent)] hover:bg-[var(--admin-accent)]/10 transition-colors">
                          <Edit2 size={14} />
                        </button>
                        <button className="p-1.5 rounded text-[var(--admin-text-muted)] hover:text-[var(--admin-danger)] hover:bg-[var(--admin-danger)]/10 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-[var(--admin-border)]">
          <p className="text-xs text-[var(--admin-text-muted)]">{filtered.length} hizmet</p>
        </div>
      </div>
    </motion.div>
  )
}
