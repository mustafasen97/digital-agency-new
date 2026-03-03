"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Edit2, Trash2, X, Check, GripVertical } from "lucide-react"
import AdminPageHeader from "@/components/admin/admin-page-header"

interface Category {
  id: number
  name: string
  slug: string
  count: number
}

const initialCategories: Category[] = [
  { id: 1, name: "Web Tasarım", slug: "web-tasarim", count: 4 },
  { id: 2, name: "SEO & Dijital Pazarlama", slug: "seo-dijital-pazarlama", count: 3 },
  { id: 3, name: "Mobil Uygulama", slug: "mobil-uygulama", count: 2 },
  { id: 4, name: "E-Ticaret Çözümleri", slug: "e-ticaret", count: 5 },
  { id: 5, name: "Kurumsal Kimlik", slug: "kurumsal-kimlik", count: 2 },
]

const inputCls =
  "w-full bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--admin-text-primary)] placeholder:text-[var(--admin-text-muted)]/50 outline-none focus:border-[var(--admin-accent)] transition-colors"

export default function ServiceCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [showPanel, setShowPanel] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [newName, setNewName] = useState("")
  const [newSlug, setNewSlug] = useState("")

  const openAdd = () => { setEditId(null); setNewName(""); setNewSlug(""); setShowPanel(true) }
  const openEdit = (cat: Category) => { setEditId(cat.id); setNewName(cat.name); setNewSlug(cat.slug); setShowPanel(true) }

  const handleName = (v: string) => {
    setNewName(v)
    setNewSlug(v.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-"))
  }

  const save = () => {
    if (!newName.trim()) return
    if (editId !== null) {
      setCategories((prev) => prev.map((c) => c.id === editId ? { ...c, name: newName, slug: newSlug } : c))
    } else {
      setCategories((prev) => [...prev, { id: Date.now(), name: newName, slug: newSlug, count: 0 }])
    }
    setShowPanel(false)
  }

  const remove = (id: number) => setCategories((prev) => prev.filter((c) => c.id !== id))

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="max-w-[860px] space-y-6"
    >
      <AdminPageHeader
        title="Hizmet Kategorileri"
        description="Hizmet listesi için kategorileri yönetin"
        backHref="/admin/services"
        action={
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--admin-accent)] hover:bg-[var(--admin-accent-hover)] text-white font-semibold text-sm rounded-lg transition-colors"
          >
            <Plus size={15} />
            Kategori Ekle
          </button>
        }
      />

      <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--admin-border)]">
              <th className="text-left px-5 py-3.5 text-[10px] uppercase tracking-widest text-[var(--admin-text-muted)] font-semibold w-8" />
              {["Kategori Adı", "Slug", "İçerik Sayısı", "İşlemler"].map((h) => (
                <th key={h} className="text-left px-5 py-3.5 text-[10px] uppercase tracking-widest text-[var(--admin-text-muted)] font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--admin-border)]">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-[var(--admin-hover)] transition-colors group">
                <td className="px-3 py-3.5">
                  <GripVertical size={15} className="text-[var(--admin-border)] cursor-grab hover:text-[var(--admin-text-muted)] transition-colors" />
                </td>
                <td className="px-5 py-3.5 font-medium text-[var(--admin-text-primary)]">{cat.name}</td>
                <td className="px-5 py-3.5 font-mono text-xs text-[var(--admin-accent)]">{cat.slug}</td>
                <td className="px-5 py-3.5">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--admin-info)]/15 text-[var(--admin-info)] border border-[var(--admin-info)]/30">
                    {cat.count} öğe
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEdit(cat)} className="p-1.5 rounded text-[var(--admin-text-muted)] hover:text-[var(--admin-accent)] hover:bg-[var(--admin-accent)]/10 transition-colors">
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => remove(cat.id)} className="p-1.5 rounded text-[var(--admin-text-muted)] hover:text-[var(--admin-danger)] hover:bg-[var(--admin-danger)]/10 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-5 py-3 border-t border-[var(--admin-border)]">
          <p className="text-xs text-[var(--admin-text-muted)]">{categories.length} kategori</p>
        </div>
      </div>

      <AnimatePresence>
        {showPanel && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setShowPanel(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-2xl w-full max-w-md shadow-2xl">
                <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--admin-border)]">
                  <h3 className="text-base font-semibold text-[var(--admin-text-primary)]" style={{ fontFamily: "var(--font-syne)" }}>
                    {editId !== null ? "Kategori Düzenle" : "Kategori Ekle"}
                  </h3>
                  <button onClick={() => setShowPanel(false)} className="p-1.5 rounded-md text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] hover:bg-[var(--admin-hover)] transition-colors">
                    <X size={16} />
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-[var(--admin-text-muted)] uppercase tracking-wide mb-1.5">Kategori Adı</label>
                    <input type="text" value={newName} onChange={(e) => handleName(e.target.value)} placeholder="Kategori adı..." className={inputCls} autoFocus />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--admin-text-muted)] uppercase tracking-wide mb-1.5">Slug</label>
                    <input type="text" value={newSlug} onChange={(e) => setNewSlug(e.target.value)} placeholder="kategori-slug" className={`${inputCls} font-mono text-[var(--admin-accent)]`} />
                  </div>
                </div>
                <div className="px-6 py-4 border-t border-[var(--admin-border)] flex gap-3">
                  <button onClick={() => setShowPanel(false)} className="flex-1 py-2.5 rounded-lg border border-[var(--admin-border)] text-sm text-[var(--admin-text-muted)] hover:bg-[var(--admin-hover)] transition-colors">
                    İptal
                  </button>
                  <button onClick={save} className="flex-1 py-2.5 rounded-lg bg-[var(--admin-accent)] hover:bg-[var(--admin-accent-hover)] text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2">
                    <Check size={14} />
                    Kaydet
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
