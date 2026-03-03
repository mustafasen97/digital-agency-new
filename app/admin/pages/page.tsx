
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Edit2, Trash2, ExternalLink, Search, X, FileText } from "lucide-react"
import AdminPageHeader from "@/components/admin/admin-page-header"
import AdminStatusBadge from "@/components/admin/admin-status-badge"
import { pages as initialPages } from "@/lib/admin-mock-data"

type Page = {
  id: number
  title: string
  slug: string
  status: string
  updated: string
}

export default function PagesPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [pages, setPages] = useState<Page[]>(initialPages as Page[])
  const [showModal, setShowModal] = useState(false)
  const [editTarget, setEditTarget] = useState<Page | null>(null)

  // Form state
  const [formTitle, setFormTitle] = useState("")
  const [formSlug, setFormSlug] = useState("")
  const [formStatus, setFormStatus] = useState("draft")

  const filtered = pages.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "all" || p.status === statusFilter
    return matchSearch && matchStatus
  })

  function openNew() {
    setEditTarget(null)
    setFormTitle("")
    setFormSlug("")
    setFormStatus("draft")
    setShowModal(true)
  }

  function openEdit(page: Page) {
    setEditTarget(page)
    setFormTitle(page.title)
    setFormSlug(page.slug)
    setFormStatus(page.status)
    setShowModal(true)
  }

  function handleTitleChange(val: string) {
    setFormTitle(val)
    if (!editTarget) {
      setFormSlug(
        "/" +
          val
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .trim()
            .replace(/\s+/g, "-")
      )
    }
  }

  function handleSave() {
    if (!formTitle.trim()) return
    if (editTarget) {
      setPages((prev) =>
        prev.map((p) =>
          p.id === editTarget.id
            ? { ...p, title: formTitle, slug: formSlug, status: formStatus, updated: "Az önce" }
            : p
        )
      )
    } else {
      const newPage: Page = {
        id: Date.now(),
        title: formTitle,
        slug: formSlug || "/" + formTitle.toLowerCase().replace(/\s+/g, "-"),
        status: formStatus,
        updated: "Az önce",
      }
      setPages((prev) => [newPage, ...prev])
    }
    setShowModal(false)
  }

  function handleDelete(id: number) {
    setPages((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <>
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
            <button
              onClick={openNew}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--admin-accent)] hover:bg-[var(--admin-accent-hover)] text-white font-semibold text-sm rounded-lg transition-colors"
            >
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
              <tr className="border-b border-[var(--admin-border)] bg-[var(--admin-bg-secondary)]">
                {["Sayfa Başlığı", "URL Slug", "Durum", "Son Güncelleme", "İşlemler"].map((h) => (
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
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-[var(--admin-text-muted)] text-sm">
                    <FileText size={28} className="mx-auto mb-2 opacity-30" />
                    Sayfa bulunamadı
                  </td>
                </tr>
              ) : (
                filtered.map((page) => (
                  <tr key={page.id} className="hover:bg-[var(--admin-hover)] transition-colors group">
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
                        <button
                          onClick={() => openEdit(page)}
                          className="p-1.5 rounded text-[var(--admin-text-muted)] hover:text-[var(--admin-accent)] hover:bg-[var(--admin-accent-subtle)] transition-colors"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button className="p-1.5 rounded text-[var(--admin-text-muted)] hover:text-[var(--admin-info)] hover:bg-sky-50 transition-colors">
                          <ExternalLink size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(page.id)}
                          className="p-1.5 rounded text-[var(--admin-text-muted)] hover:text-[var(--admin-danger)] hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="px-5 py-3 border-t border-[var(--admin-border)] bg-[var(--admin-bg-secondary)]">
            <p className="text-xs text-[var(--admin-text-muted)]">{filtered.length} sayfa</p>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-[var(--admin-bg-card)] border-l border-[var(--admin-border)] shadow-xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--admin-border)]">
                <div>
                  <h2
                    className="text-base font-bold text-[var(--admin-text-primary)]"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {editTarget ? "Sayfayı Düzenle" : "Yeni Sayfa Ekle"}
                  </h2>
                  <p className="text-xs text-[var(--admin-text-muted)] mt-0.5">
                    {editTarget ? "Sayfa bilgilerini güncelleyin" : "Yeni bir site sayfası oluşturun"}
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-md text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] hover:bg-[var(--admin-hover)] transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-widest text-[var(--admin-text-muted)]">
                    Sayfa Başlığı <span className="text-[var(--admin-danger)]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Örn: Hakkımızda"
                    className="w-full px-3 py-2.5 bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-lg text-sm text-[var(--admin-text-primary)] placeholder:text-[var(--admin-text-muted)] outline-none focus:border-[var(--admin-accent)] focus:ring-1 focus:ring-[var(--admin-accent)] transition"
                  />
                </div>

                {/* Slug */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-widest text-[var(--admin-text-muted)]">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    placeholder="/hakkimizda"
                    className="w-full px-3 py-2.5 bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-lg text-sm font-mono text-[var(--admin-accent)] placeholder:text-[var(--admin-text-muted)] outline-none focus:border-[var(--admin-accent)] focus:ring-1 focus:ring-[var(--admin-accent)] transition"
                  />
                  <p className="text-[11px] text-[var(--admin-text-muted)]">Başlıktan otomatik oluşturulur, isteğe bağlı düzenlenebilir.</p>
                </div>

                {/* Status */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-widest text-[var(--admin-text-muted)]">
                    Durum
                  </label>
                  <div className="flex gap-2">
                    {(["draft", "published", "archived"] as const).map((s) => {
                      const labels = { draft: "Taslak", published: "Yayınla", archived: "Arşivle" }
                      const isSelected = formStatus === s
                      return (
                        <button
                          key={s}
                          onClick={() => setFormStatus(s)}
                          className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-all ${
                            isSelected
                              ? "bg-[var(--admin-accent)] text-white border-[var(--admin-accent)]"
                              : "bg-[var(--admin-bg-secondary)] text-[var(--admin-text-muted)] border-[var(--admin-border)] hover:border-[var(--admin-accent)] hover:text-[var(--admin-accent)]"
                          }`}
                        >
                          {labels[s]}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-[var(--admin-border)]">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] hover:bg-[var(--admin-hover)] rounded-lg transition-colors"
                >
                  İptal
                </button>
                <button
                  onClick={handleSave}
                  disabled={!formTitle.trim()}
                  className="px-5 py-2 bg-[var(--admin-accent)] hover:bg-[var(--admin-accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-lg transition-colors"
                >
                  {editTarget ? "Kaydet" : "Sayfa Oluştur"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
