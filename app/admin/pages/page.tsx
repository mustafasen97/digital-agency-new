"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Edit2, Trash2, ExternalLink, Search } from "lucide-react"
import AdminPageHeader from "@/components/admin/admin-page-header"
import AdminStatusBadge from "@/components/admin/admin-status-badge"
import { pages } from "@/lib/admin-mock-data"

export default function PagesPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filtered = pages.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "all" || p.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="max-w-[1000px] space-y-6"
    >
      <AdminPageHeader
        title="Sayfalar"
        description="Site sayfalarını yönetin ve düzenleyin"
        action={
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--admin-accent)] hover:bg-[var(--admin-accent-hover)] text-black font-semibold text-sm rounded-lg transition-colors">
            <Plus size={15} />
            Yeni Sayfa
          </button>
        }
      />

      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-lg px-3 py-2 text-sm w-64">
          <Search size={14} className="text-[var(--admin-text-muted)]" />
          <input
            type="text"
            placeholder="Sayfa ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-[var(--admin-text-primary)] placeholder:text-[var(--admin-text-muted)] outline-none flex-1 text-sm"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-lg px-3 py-2 text-sm text-[var(--admin-text-primary)] outline-none cursor-pointer"
        >
          <option value="all">Tüm Durumlar</option>
          <option value="published">Yayında</option>
          <option value="draft">Taslak</option>
          <option value="archived">Arşivlendi</option>
        </select>
      </div>

      <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--admin-border)]">
              {["Sayfa Başlığı", "URL Slug", "Durum", "Son Güncelleme", "İşlemler"].map((h) => (
                <th key={h} className="text-left px-5 py-3.5 text-[10px] uppercase tracking-widest text-[var(--admin-text-muted)] font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--admin-border)]">
            {filtered.map((page) => (
              <tr key={page.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-5 py-3.5">
                  <span className="text-[var(--admin-text-primary)] font-medium">{page.title}</span>
                </td>
                <td className="px-5 py-3.5">
                  <span className="text-xs font-mono text-[var(--admin-accent)]">{page.slug}</span>
                </td>
                <td className="px-5 py-3.5">
                  <AdminStatusBadge status={page.status as any} />
                </td>
                <td className="px-5 py-3.5">
                  <span className="text-xs font-mono text-[var(--admin-text-muted)]">{page.updated}</span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 rounded text-[var(--admin-text-muted)] hover:text-[var(--admin-accent)] hover:bg-[var(--admin-accent)]/10 transition-colors">
                      <Edit2 size={14} />
                    </button>
                    <button className="p-1.5 rounded text-[var(--admin-text-muted)] hover:text-[var(--admin-info)] hover:bg-[var(--admin-info)]/10 transition-colors">
                      <ExternalLink size={14} />
                    </button>
                    <button className="p-1.5 rounded text-[var(--admin-text-muted)] hover:text-[var(--admin-danger)] hover:bg-[var(--admin-danger)]/10 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-5 py-3 border-t border-[var(--admin-border)]">
          <p className="text-xs text-[var(--admin-text-muted)]">{filtered.length} sayfa</p>
        </div>
      </div>
    </motion.div>
  )
}
