"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Edit2, Trash2, Star, X, Upload, Check } from "lucide-react"
import AdminPageHeader from "@/components/admin/admin-page-header"
import { testimonials } from "@/lib/admin-mock-data"

const inputCls =
  "w-full bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--admin-text-primary)] placeholder:text-[var(--admin-text-muted)]/50 outline-none focus:border-[var(--admin-accent)] transition-colors"

const labelCls =
  "block text-xs font-medium text-[var(--admin-text-muted)] uppercase tracking-wide mb-1.5"

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(n)}
          className="transition-transform hover:scale-110"
        >
          <Star
            size={20}
            className={n <= (hovered || value) ? "text-[var(--admin-accent)] fill-[var(--admin-accent)]" : "text-[var(--admin-border)]"}
          />
        </button>
      ))}
    </div>
  )
}

export default function TestimonialsPage() {
  const [items, setItems] = useState(testimonials)
  const [showPanel, setShowPanel] = useState(false)
  const [rating, setRating] = useState(5)

  const togglePublished = (id: number) =>
    setItems((prev) => prev.map((t) => (t.id === id ? { ...t, published: !t.published } : t)))

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="max-w-[1000px] space-y-6"
    >
      <AdminPageHeader
        title="Müşteri Yorumları"
        description="Referans ve müşteri değerlendirmelerini yönetin"
        action={
          <button
            onClick={() => setShowPanel(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--admin-accent)] hover:bg-[var(--admin-accent-hover)] text-black font-semibold text-sm rounded-lg transition-colors"
          >
            <Plus size={15} />
            Yorum Ekle
          </button>
        }
      />

      <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--admin-border)]">
              {["İsim", "Şirket", "Puan", "Tarih", "Yayın", "İşlemler"].map((h) => (
                <th key={h} className="text-left px-5 py-3.5 text-[10px] uppercase tracking-widest text-[var(--admin-text-muted)] font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--admin-border)]">
            {items.map((t) => (
              <tr key={t.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[var(--admin-accent)]/20 flex items-center justify-center text-xs font-bold text-[var(--admin-accent)] shrink-0">
                      {t.name.charAt(0)}
                    </div>
                    <span className="text-[var(--admin-text-primary)] font-medium">{t.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-[var(--admin-text-muted)] text-sm">{t.company}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        className={i < t.rating ? "text-[var(--admin-accent)] fill-[var(--admin-accent)]" : "text-[var(--admin-border)]"}
                      />
                    ))}
                  </div>
                </td>
                <td className="px-5 py-3.5 text-xs font-mono text-[var(--admin-text-muted)]">{t.date}</td>
                <td className="px-5 py-3.5">
                  <button
                    onClick={() => togglePublished(t.id)}
                    className={`w-9 h-5 rounded-full transition-colors relative ${t.published ? "bg-[var(--admin-accent)]" : "bg-[var(--admin-border)]"}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow ${t.published ? "translate-x-4" : "translate-x-0.5"}`} />
                  </button>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setShowPanel(true)}
                      className="p-1.5 rounded text-[var(--admin-text-muted)] hover:text-[var(--admin-accent)] hover:bg-[var(--admin-accent)]/10 transition-colors"
                    >
                      <Edit2 size={14} />
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
          <p className="text-xs text-[var(--admin-text-muted)]">{items.length} yorum</p>
        </div>
      </div>

      {/* Slide-over panel */}
      <AnimatePresence>
        {showPanel && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setShowPanel(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed right-0 top-0 h-full w-[480px] bg-[var(--admin-bg-card)] border-l border-[var(--admin-border)] z-50 flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--admin-border)]">
                <h3 className="text-base font-semibold text-[var(--admin-text-primary)]" style={{ fontFamily: "var(--font-syne)" }}>
                  Yorum Ekle / Düzenle
                </h3>
                <button onClick={() => setShowPanel(false)} className="p-1.5 rounded-md text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] hover:bg-white/5 transition-colors">
                  <X size={16} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-5">
                <div className="flex justify-center">
                  <div className="relative w-20 h-20 rounded-full bg-[var(--admin-bg-secondary)] border-2 border-dashed border-[var(--admin-border)] flex items-center justify-center cursor-pointer hover:border-[var(--admin-accent)]/50 transition-colors">
                    <Upload size={20} className="text-[var(--admin-text-muted)]" />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Ad Soyad</label>
                  <input type="text" placeholder="Müşteri adı" className={inputCls} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Şirket</label>
                    <input type="text" placeholder="Şirket adı" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Pozisyon</label>
                    <input type="text" placeholder="CEO, Kurucu..." className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Değerlendirme</label>
                  <textarea rows={4} placeholder="Müşteri yorumu..." className={`${inputCls} resize-none`} />
                </div>
                <div>
                  <label className={labelCls}>Puan</label>
                  <StarPicker value={rating} onChange={setRating} />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-[var(--admin-text-primary)]">Yayınla</p>
                    <p className="text-xs text-[var(--admin-text-muted)] mt-0.5">Sitede görünür olsun</p>
                  </div>
                  <button className="w-10 h-5 rounded-full bg-[var(--admin-accent)] relative">
                    <div className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-white shadow" />
                  </button>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-[var(--admin-border)] flex gap-3">
                <button
                  onClick={() => setShowPanel(false)}
                  className="flex-1 py-2.5 rounded-lg border border-[var(--admin-border)] text-sm text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] hover:bg-white/5 transition-colors"
                >
                  İptal
                </button>
                <button
                  onClick={() => setShowPanel(false)}
                  className="flex-1 py-2.5 rounded-lg bg-[var(--admin-accent)] hover:bg-[var(--admin-accent-hover)] text-black font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Check size={14} />
                  Kaydet
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
