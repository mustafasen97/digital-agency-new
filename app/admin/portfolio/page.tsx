"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Edit2, Trash2, Star, Search, ExternalLink } from "lucide-react"
import AdminPageHeader from "@/components/admin/admin-page-header"
import AdminStatusBadge from "@/components/admin/admin-status-badge"
import { portfolioProjects } from "@/lib/admin-mock-data"

export default function PortfolioPage() {
  const [search, setSearch] = useState("")

  const filtered = portfolioProjects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.client.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="max-w-[1200px] space-y-6"
    >
      <AdminPageHeader
        title="Portfolio Projeleri"
        description="Portföy projelerini yönetin"
        action={
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--admin-accent)] hover:bg-[var(--admin-accent-hover)] text-white font-semibold text-sm rounded-lg transition-colors">
            <Plus size={15} />
            Yeni Proje
          </button>
        }
      />

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-lg px-3 py-2 text-sm w-64">
          <Search size={14} className="text-[var(--admin-text-muted)]" />
          <input
            type="text"
            placeholder="Proje veya müşteri ara..."
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
                {["Proje Adı", "Müşteri", "Kategori", "Yıl", "Öne Çıkan", "Durum", "İşlemler"].map((h) => (
                  <th key={h} className="text-left px-5 py-3.5 text-[10px] uppercase tracking-widest text-[var(--admin-text-muted)] font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--admin-border)]">
              {filtered.map((proj) => (
                <tr key={proj.id} className="hover:bg-[var(--admin-hover)] transition-colors group">
                  <td className="px-5 py-3.5">
                    <span className="text-[var(--admin-text-primary)] font-medium">{proj.title}</span>
                  </td>
                  <td className="px-5 py-3.5 text-[var(--admin-text-muted)]">{proj.client}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--admin-success)]/15 text-[var(--admin-success)] border border-[var(--admin-success)]/30">
                      {proj.category}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs font-mono text-[var(--admin-text-muted)]">{proj.year}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    {proj.featured ? (
                      <Star size={15} className="text-[var(--admin-accent)] fill-[var(--admin-accent)]" />
                    ) : (
                      <Star size={15} className="text-[var(--admin-text-muted)]" />
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <AdminStatusBadge status={proj.status as any} />
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
        </div>
        <div className="px-5 py-3 border-t border-[var(--admin-border)]">
          <p className="text-xs text-[var(--admin-text-muted)]">{filtered.length} proje</p>
        </div>
      </div>
    </motion.div>
  )
}
