"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, X, Hash } from "lucide-react"
import AdminPageHeader from "@/components/admin/admin-page-header"

const initialTags = [
  { id: 1, name: "WordPress", count: 18 },
  { id: 2, name: "web tasarım", count: 22 },
  { id: 3, name: "SEO", count: 15 },
  { id: 4, name: "PHP", count: 8 },
  { id: 5, name: "JavaScript", count: 11 },
  { id: 6, name: "React", count: 7 },
  { id: 7, name: "Next.js", count: 5 },
  { id: 8, name: "e-ticaret", count: 9 },
  { id: 9, name: "performans", count: 6 },
  { id: 10, name: "güvenlik", count: 4 },
  { id: 11, name: "UX tasarım", count: 13 },
  { id: 12, name: "sosyal medya", count: 10 },
  { id: 13, name: "içerik pazarlama", count: 7 },
  { id: 14, name: "Google Analytics", count: 5 },
  { id: 15, name: "hız optimizasyonu", count: 8 },
]

export default function BlogTagsPage() {
  const [tags, setTags] = useState(initialTags)
  const [newTag, setNewTag] = useState("")

  const addTag = () => {
    const trimmed = newTag.trim()
    if (!trimmed || tags.some((t) => t.name.toLowerCase() === trimmed.toLowerCase())) return
    setTags((prev) => [...prev, { id: Date.now(), name: trimmed, count: 0 }])
    setNewTag("")
  }

  const removeTag = (id: number) => setTags((prev) => prev.filter((t) => t.id !== id))

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") { e.preventDefault(); addTag() }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="max-w-[860px] space-y-6"
    >
      <AdminPageHeader
        title="Blog Etiketleri"
        description="Blog yazıları için etiketleri yönetin"
        backHref="/admin/blog"
      />

      {/* Add tag */}
      <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-5">
        <label className="block text-xs font-medium text-[var(--admin-text-muted)] uppercase tracking-wide mb-2">Yeni Etiket Ekle</label>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 flex-1 bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-lg px-3 py-2.5 focus-within:border-[var(--admin-accent)] transition-colors">
            <Hash size={14} className="text-[var(--admin-text-muted)] shrink-0" />
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Etiket adı yazın ve Enter'a basın..."
              className="flex-1 bg-transparent text-sm text-[var(--admin-text-primary)] placeholder:text-[var(--admin-text-muted)]/50 outline-none"
            />
          </div>
          <button
            onClick={addTag}
            className="flex items-center gap-2 px-4 py-2.5 bg-[var(--admin-accent)] hover:bg-[var(--admin-accent-hover)] text-white font-semibold text-sm rounded-lg transition-colors shrink-0"
          >
            <Plus size={14} />
            Ekle
          </button>
        </div>
      </div>

      {/* Tags cloud */}
      <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold text-[var(--admin-text-primary)]" style={{ fontFamily: "var(--font-syne)" }}>
            Tüm Etiketler
          </p>
          <span className="text-xs text-[var(--admin-text-muted)]">{tags.length} etiket</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags
            .sort((a, b) => b.count - a.count)
            .map((tag) => (
              <motion.div
                key={tag.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] hover:border-[var(--admin-accent)]/50 transition-colors"
              >
                <Hash size={11} className="text-[var(--admin-accent)] shrink-0" />
                <span className="text-sm text-[var(--admin-text-primary)]">{tag.name}</span>
                <span className="text-[10px] text-[var(--admin-text-muted)] ml-0.5">({tag.count})</span>
                <button
                  onClick={() => removeTag(tag.id)}
                  className="ml-0.5 p-0.5 rounded-full text-[var(--admin-text-muted)] hover:text-[var(--admin-danger)] hover:bg-[var(--admin-danger)]/10 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <X size={11} />
                </button>
              </motion.div>
            ))}
        </div>
      </div>

      {/* Table view */}
      <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[var(--admin-border)]">
          <p className="text-sm font-semibold text-[var(--admin-text-primary)]" style={{ fontFamily: "var(--font-syne)" }}>
            Kullanım İstatistikleri
          </p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--admin-border)]">
              {["Etiket", "Kullanım Sayısı", "İşlem"].map((h) => (
                <th key={h} className="text-left px-5 py-3.5 text-[10px] uppercase tracking-widest text-[var(--admin-text-muted)] font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--admin-border)]">
            {tags.sort((a, b) => b.count - a.count).map((tag) => (
              <tr key={tag.id} className="hover:bg-[var(--admin-hover)] transition-colors group">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <Hash size={13} className="text-[var(--admin-accent)]" />
                    <span className="text-[var(--admin-text-primary)]">{tag.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 max-w-[140px] h-1 rounded-full bg-[var(--admin-border)] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[var(--admin-accent)]"
                        style={{ width: `${Math.min((tag.count / Math.max(...tags.map((t) => t.count))) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="text-xs text-[var(--admin-text-muted)] tabular-nums">{tag.count} yazı</span>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <button
                    onClick={() => removeTag(tag.id)}
                    className="p-1.5 rounded text-[var(--admin-text-muted)] hover:text-[var(--admin-danger)] hover:bg-[var(--admin-danger)]/10 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <X size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
