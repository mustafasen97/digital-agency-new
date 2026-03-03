"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Upload, Trash2, GripVertical, Globe, ToggleLeft, ToggleRight } from "lucide-react"
import AdminPageHeader from "@/components/admin/admin-page-header"

const mockLogos = [
  { id: 1, name: "TeknoMarket", url: "https://teknomarket.com", alt: "TeknoMarket logosu", active: true },
  { id: 2, name: "LegalPro", url: "https://legalpro.com.tr", alt: "LegalPro logosu", active: true },
  { id: 3, name: "FitLife", url: "", alt: "FitLife logosu", active: true },
  { id: 4, name: "OtelVista", url: "https://otelvista.com", alt: "OtelVista logosu", active: false },
  { id: 5, name: "MedPharma", url: "", alt: "MedPharma logosu", active: true },
  { id: 6, name: "DecoHouse", url: "https://decohouse.com.tr", alt: "DecoHouse logosu", active: true },
]

const inputCls =
  "w-full bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-lg px-3 py-2 text-sm text-[var(--admin-text-primary)] placeholder:text-[var(--admin-text-muted)]/50 outline-none focus:border-[var(--admin-accent)] transition-colors"

export default function ClientsPage() {
  const [logos, setLogos] = useState(mockLogos)

  const toggleActive = (id: number) =>
    setLogos((prev) => prev.map((l) => (l.id === id ? { ...l, active: !l.active } : l)))

  const removeLogo = (id: number) =>
    setLogos((prev) => prev.filter((l) => l.id !== id))

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="max-w-[1000px] space-y-6"
    >
      <AdminPageHeader
        title="Müşteri Logoları"
        description="Anasayfada görünen müşteri logolarını yönetin"
      />

      {/* Bulk upload zone */}
      <div className="border-2 border-dashed border-[var(--admin-border)] rounded-xl p-8 text-center hover:border-[var(--admin-accent)]/40 transition-colors cursor-pointer group">
        <Upload size={28} className="mx-auto mb-3 text-[var(--admin-text-muted)] group-hover:text-[var(--admin-accent)] transition-colors" />
        <p className="text-sm text-[var(--admin-text-primary)] font-medium">Logoları buraya sürükleyin</p>
        <p className="text-xs text-[var(--admin-text-muted)] mt-1">PNG, SVG, WebP — Birden fazla dosya seçebilirsiniz</p>
        <button className="mt-4 px-4 py-2 text-xs font-medium rounded-lg bg-[var(--admin-accent)]/10 border border-[var(--admin-accent)]/30 text-[var(--admin-accent)] hover:bg-[var(--admin-accent)]/20 transition-colors">
          Dosya Seç
        </button>
      </div>

      {/* Logo grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {logos.map((logo) => (
          <div
            key={logo.id}
            className={`bg-[var(--admin-bg-card)] border rounded-xl p-4 flex items-start gap-3 transition-all ${
              logo.active ? "border-[var(--admin-border)]" : "border-[var(--admin-border)] opacity-50"
            }`}
          >
            <div className="p-1.5 text-[var(--admin-text-muted)] cursor-grab hover:text-[var(--admin-text-primary)] transition-colors shrink-0 mt-1">
              <GripVertical size={16} />
            </div>

            {/* Logo placeholder */}
            <div className="w-16 h-10 rounded-lg bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] flex items-center justify-center shrink-0">
              <span className="text-[10px] font-bold text-[var(--admin-text-muted)]">{logo.name.slice(0, 2).toUpperCase()}</span>
            </div>

            <div className="flex-1 min-w-0 space-y-2">
              <input
                type="text"
                defaultValue={logo.name}
                className={inputCls}
                placeholder="Şirket adı"
              />
              <div className="flex items-center gap-2">
                <Globe size={13} className="text-[var(--admin-text-muted)] shrink-0" />
                <input
                  type="url"
                  defaultValue={logo.url}
                  placeholder="Website URL (opsiyonel)"
                  className={`${inputCls} text-xs`}
                />
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 shrink-0">
              <button
                onClick={() => toggleActive(logo.id)}
                className="text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] transition-colors"
                title={logo.active ? "Gizle" : "Göster"}
              >
                {logo.active ? (
                  <ToggleRight size={20} className="text-[var(--admin-accent)]" />
                ) : (
                  <ToggleLeft size={20} />
                )}
              </button>
              <button
                onClick={() => removeLogo(logo.id)}
                className="p-1 rounded text-[var(--admin-text-muted)] hover:text-[var(--admin-danger)] hover:bg-[var(--admin-danger)]/10 transition-colors"
                title="Kaldır"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[var(--admin-accent)] hover:bg-[var(--admin-accent-hover)] text-black font-semibold text-sm rounded-lg transition-colors">
          Değişiklikleri Kaydet
        </button>
      </div>
    </motion.div>
  )
}
