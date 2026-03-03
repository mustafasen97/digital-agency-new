"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Search, Edit2, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import AdminPageHeader from "@/components/admin/admin-page-header"
import AdminStatusBadge from "@/components/admin/admin-status-badge"
import { blogPosts } from "@/lib/admin-mock-data"

export default function BlogPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filtered = blogPosts.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "all" || p.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="max-w-[1200px] space-y-6"
    >
      <AdminPageHeader
        title="Blog Yazıları"
        description="Tüm blog içeriklerini yönetin"
        action={
          <Link
            href="/admin/blog/new"
            className="flex items-center gap-2 px-4 py-2 bg-[var(--admin-accent)] hover:bg-[var(--admin-accent-hover)] text-black font-semibold text-sm rounded-lg transition-colors"
          >
            <Plus size={15} />
            Yeni Yazı
          </Link>
        }
      />

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-lg px-3 py-2 text-sm w-64">
          <Search size={14} className="text-[var(--admin-text-muted)]" />
          <input
            type="text"
            placeholder="Yazı ara..."
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
        </select>
      </div>

      {/* Table */}
      <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--admin-border)]">
                {["Başlık", "Yazar", "Kategori", "Etiketler", "Tarih", "Görüntüleme", "Durum", "İşlemler"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3.5 text-[10px] uppercase tracking-widest text-[var(--admin-text-muted)] font-semibold"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--admin-border)]">
              {filtered.map((post) => (
                <tr key={post.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-5 py-3.5">
                    <span className="text-[var(--admin-text-primary)] font-medium line-clamp-1 max-w-[220px] block">
                      {post.title}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-[var(--admin-text-muted)]">{post.author}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--admin-info)]/15 text-[var(--admin-info)] border border-[var(--admin-info)]/30">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-1 flex-wrap max-w-[120px]">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-[var(--admin-text-muted)]">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-[var(--admin-text-muted)] font-mono text-xs">{post.date}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5 text-[var(--admin-text-muted)]">
                      <Eye size={13} />
                      <span className="text-xs">{post.views.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <AdminStatusBadge status={post.status as any} />
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        href={`/admin/blog/${post.id}/edit`}
                        className="p-1.5 rounded text-[var(--admin-text-muted)] hover:text-[var(--admin-accent)] hover:bg-[var(--admin-accent)]/10 transition-colors"
                      >
                        <Edit2 size={14} />
                      </Link>
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
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-[var(--admin-text-muted)] text-sm">Sonuç bulunamadı.</p>
          </div>
        )}
        <div className="flex items-center justify-between px-5 py-3 border-t border-[var(--admin-border)]">
          <p className="text-xs text-[var(--admin-text-muted)]">{filtered.length} sonuç gösteriliyor</p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 text-xs rounded border border-[var(--admin-border)] text-[var(--admin-text-muted)] hover:bg-white/5 transition-colors">Önceki</button>
            <button className="px-3 py-1.5 text-xs rounded border border-[var(--admin-accent)] bg-[var(--admin-accent)]/10 text-[var(--admin-accent)]">1</button>
            <button className="px-3 py-1.5 text-xs rounded border border-[var(--admin-border)] text-[var(--admin-text-muted)] hover:bg-white/5 transition-colors">Sonraki</button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
