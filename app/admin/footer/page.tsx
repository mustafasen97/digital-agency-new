"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Trash2, Save, Upload } from "lucide-react"
import AdminPageHeader from "@/components/admin/admin-page-header"

const inputCls =
  "w-full bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--admin-text-primary)] placeholder:text-[var(--admin-text-muted)]/50 outline-none focus:border-[var(--admin-accent)] transition-colors"
const labelCls =
  "block text-xs font-medium text-[var(--admin-text-muted)] uppercase tracking-wide mb-1.5"

interface FooterColumn {
  id: number
  heading: string
  links: { id: number; label: string; url: string }[]
}

const initialColumns: FooterColumn[] = [
  { id: 1, heading: "Hizmetler", links: [{ id: 11, label: "Web Tasarım", url: "/hizmetler/web-tasarim" }, { id: 12, label: "SEO", url: "/hizmetler/seo" }] },
  { id: 2, heading: "Şirket", links: [{ id: 21, label: "Hakkımızda", url: "/hakkimizda" }, { id: 22, label: "Blog", url: "/blog" }] },
  { id: 3, heading: "Destek", links: [{ id: 31, label: "İletişim", url: "/iletisim" }, { id: 32, label: "SSS", url: "/sss" }] },
]

export default function FooterPage() {
  const [columns, setColumns] = useState<FooterColumn[]>(initialColumns)

  const addColumn = () => {
    if (columns.length >= 4) return
    setColumns((prev) => [...prev, { id: Date.now(), heading: "Yeni Kolon", links: [] }])
  }

  const removeColumn = (id: number) => setColumns((prev) => prev.filter((c) => c.id !== id))

  const addLink = (colId: number) =>
    setColumns((prev) =>
      prev.map((c) => c.id === colId ? { ...c, links: [...c.links, { id: Date.now(), label: "Yeni Link", url: "/" }] } : c)
    )

  const removeLink = (colId: number, linkId: number) =>
    setColumns((prev) =>
      prev.map((c) => c.id === colId ? { ...c, links: c.links.filter((l) => l.id !== linkId) } : c)
    )

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="max-w-[1000px] space-y-6"
    >
      <AdminPageHeader
        title="Footer Ayarları"
        description="Site alt bilgi bölümünü yönetin"
        action={
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--admin-accent)] hover:bg-[var(--admin-accent-hover)] text-black font-semibold text-sm rounded-lg transition-colors">
            <Save size={14} />
            Kaydet
          </button>
        }
      />

      {/* Logo & Description */}
      <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-6 space-y-5">
        <h2 className="text-sm font-semibold text-[var(--admin-text-primary)]" style={{ fontFamily: "var(--font-syne)" }}>Logo & Açıklama</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelCls}>Footer Logosu (Açık Arka Plan)</label>
            <div className="border-2 border-dashed border-[var(--admin-border)] rounded-lg p-5 text-center cursor-pointer hover:border-[var(--admin-accent)]/40 transition-colors group">
              <Upload size={16} className="mx-auto mb-1 text-[var(--admin-text-muted)] group-hover:text-[var(--admin-accent)] transition-colors" />
              <p className="text-xs text-[var(--admin-text-muted)]">PNG, SVG — Önerilen: 200×60px</p>
            </div>
          </div>
          <div>
            <label className={labelCls}>Footer Logosu (Koyu Arka Plan)</label>
            <div className="border-2 border-dashed border-[var(--admin-border)] rounded-lg p-5 text-center cursor-pointer hover:border-[var(--admin-accent)]/40 transition-colors group">
              <Upload size={16} className="mx-auto mb-1 text-[var(--admin-text-muted)] group-hover:text-[var(--admin-accent)] transition-colors" />
              <p className="text-xs text-[var(--admin-text-muted)]">PNG, SVG — Önerilen: 200×60px</p>
            </div>
          </div>
        </div>
        <div>
          <label className={labelCls}>Kısa Açıklama</label>
          <textarea
            rows={3}
            maxLength={200}
            defaultValue="Dijital ajansınız için profesyonel web tasarım ve SEO çözümleri sunuyoruz."
            className={`${inputCls} resize-none`}
          />
        </div>
        <div>
          <label className={labelCls}>Telif Hakkı Metni</label>
          <input type="text" defaultValue="© 2025 WebTasarımEvi. Tüm hakları saklıdır." className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Arka Plan Rengi</label>
          <div className="flex items-center gap-3">
            <input type="color" defaultValue="#0A0A0F" className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-[var(--admin-border)]" />
            <input type="text" defaultValue="#0A0A0F" className={`${inputCls} font-mono w-32`} />
          </div>
        </div>
      </div>

      {/* Columns */}
      <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-[var(--admin-text-primary)]" style={{ fontFamily: "var(--font-syne)" }}>
            Link Kolonları
          </h2>
          <button
            onClick={addColumn}
            disabled={columns.length >= 4}
            className="flex items-center gap-1.5 text-xs text-[var(--admin-accent)] hover:text-[var(--admin-accent-hover)] transition-colors font-medium disabled:opacity-40"
          >
            <Plus size={13} />
            Kolon Ekle (maks. 4)
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {columns.map((col) => (
            <div key={col.id} className="bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  defaultValue={col.heading}
                  className={`${inputCls} flex-1 font-semibold`}
                />
                <button
                  onClick={() => removeColumn(col.id)}
                  className="p-1.5 rounded text-[var(--admin-text-muted)] hover:text-[var(--admin-danger)] hover:bg-[var(--admin-danger)]/10 transition-colors shrink-0"
                >
                  <Trash2 size={13} />
                </button>
              </div>
              <div className="space-y-2">
                {col.links.map((link) => (
                  <div key={link.id} className="flex items-center gap-2">
                    <input type="text" defaultValue={link.label} className={`${inputCls} flex-1 text-xs py-1.5`} placeholder="Başlık" />
                    <input type="text" defaultValue={link.url} className={`${inputCls} w-24 text-xs py-1.5 font-mono text-[var(--admin-accent)]`} placeholder="URL" />
                    <button onClick={() => removeLink(col.id, link.id)} className="p-1 rounded text-[var(--admin-text-muted)] hover:text-[var(--admin-danger)] transition-colors shrink-0">
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => addLink(col.id)}
                className="flex items-center gap-1.5 text-xs text-[var(--admin-text-muted)] hover:text-[var(--admin-accent)] transition-colors"
              >
                <Plus size={12} />
                Link Ekle
              </button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
