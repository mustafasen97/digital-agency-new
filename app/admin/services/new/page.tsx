"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Lock, Unlock, Upload, ChevronDown, Globe, ShoppingCart, Search, Smartphone, BarChart, Code2, Palette } from "lucide-react"
import AdminPageHeader from "@/components/admin/admin-page-header"

const icons = [
  { key: "Globe", Icon: Globe },
  { key: "ShoppingCart", Icon: ShoppingCart },
  { key: "Search", Icon: Search },
  { key: "Smartphone", Icon: Smartphone },
  { key: "BarChart", Icon: BarChart },
  { key: "Code2", Icon: Code2 },
  { key: "Palette", Icon: Palette },
]

const inputCls =
  "w-full bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--admin-text-primary)] placeholder:text-[var(--admin-text-muted)]/50 outline-none focus:border-[var(--admin-accent)] transition-colors"
const labelCls = "block text-xs font-medium text-[var(--admin-text-muted)] uppercase tracking-wide mb-1.5"

export default function NewServicePage() {
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [slugLocked, setSlugLocked] = useState(false)
  const [status, setStatus] = useState<"draft" | "published">("draft")
  const [selectedIcon, setSelectedIcon] = useState("Globe")
  const [featured, setFeatured] = useState(false)

  const handleTitleChange = (v: string) => {
    setTitle(v)
    if (!slugLocked) {
      setSlug(v.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-"))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="max-w-[1000px]"
    >
      <AdminPageHeader
        title="Yeni Hizmet"
        description="Yeni bir hizmet oluşturun"
        backHref="/admin/services"
        action={
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-sm rounded-lg border border-[var(--admin-border)] text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] hover:bg-white/5 transition-colors">
              Taslak Kaydet
            </button>
            <button className="px-4 py-2 text-sm rounded-lg bg-[var(--admin-accent)] hover:bg-[var(--admin-accent-hover)] text-black font-semibold transition-colors">
              Yayınla
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left: Content */}
        <div className="xl:col-span-2 space-y-4">
          {/* Title */}
          <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-5">
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Hizmet başlığı..."
              className="w-full bg-transparent text-2xl font-bold text-[var(--admin-text-primary)] placeholder:text-[var(--admin-text-muted)]/50 outline-none"
              style={{ fontFamily: "var(--font-syne)" }}
            />
          </div>

          {/* Slug */}
          <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--admin-text-muted)] shrink-0">Slug:</span>
              <span className="text-xs text-[var(--admin-text-muted)]">/hizmetler/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                disabled={!slugLocked}
                className="flex-1 bg-transparent text-xs text-[var(--admin-accent)] outline-none font-mono disabled:opacity-70"
              />
              <button onClick={() => setSlugLocked(!slugLocked)} className="p-1 rounded text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] transition-colors">
                {slugLocked ? <Unlock size={13} /> : <Lock size={13} />}
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-[var(--admin-border)]">
              <p className="text-sm font-medium text-[var(--admin-text-primary)]">Açıklama</p>
            </div>
            <div className="p-5">
              <textarea
                placeholder="Hizmet açıklamasını buraya yazın..."
                rows={10}
                className="w-full bg-transparent text-sm text-[var(--admin-text-primary)] placeholder:text-[var(--admin-text-muted)]/50 outline-none resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* Features list */}
          <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-5">
            <label className={labelCls}>Özellikler (her satıra bir özellik)</label>
            <textarea
              rows={5}
              placeholder={"Özelleştirilmiş tasarım\nMobil uyumlu\nHızlı yükleme"}
              className="w-full bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--admin-text-primary)] placeholder:text-[var(--admin-text-muted)]/50 outline-none focus:border-[var(--admin-accent)] transition-colors resize-none"
            />
          </div>
        </div>

        {/* Right: Metadata */}
        <div className="space-y-4">
          {/* Status */}
          <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-5">
            <h3 className="text-sm font-semibold text-[var(--admin-text-primary)] mb-3" style={{ fontFamily: "var(--font-syne)" }}>Durum</h3>
            <div className="flex rounded-lg overflow-hidden border border-[var(--admin-border)]">
              {(["draft", "published"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`flex-1 py-2 text-xs font-medium transition-colors ${status === s ? "bg-[var(--admin-accent)] text-black" : "text-[var(--admin-text-muted)] hover:bg-white/5"}`}
                >
                  {s === "draft" ? "Taslak" : "Yayında"}
                </button>
              ))}
            </div>
          </div>

          {/* Category & Order */}
          <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-5 space-y-4">
            <div>
              <label className={labelCls}>Kategori</label>
              <div className="relative">
                <select className="w-full appearance-none bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--admin-text-primary)] outline-none focus:border-[var(--admin-accent)] transition-colors cursor-pointer pr-8">
                  <option>Web Tasarım</option>
                  <option>SEO</option>
                  <option>Mobil Uygulama</option>
                  <option>E-Ticaret</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)] pointer-events-none" />
              </div>
            </div>
            <div>
              <label className={labelCls}>Sıralama</label>
              <input type="number" min={1} defaultValue={1} className={inputCls} />
            </div>
          </div>

          {/* Icon picker */}
          <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-5">
            <h3 className="text-sm font-semibold text-[var(--admin-text-primary)] mb-3" style={{ fontFamily: "var(--font-syne)" }}>Hizmet İkonu</h3>
            <div className="grid grid-cols-4 gap-2">
              {icons.map(({ key, Icon }) => (
                <button
                  key={key}
                  onClick={() => setSelectedIcon(key)}
                  className={`p-3 rounded-lg flex items-center justify-center transition-all ${
                    selectedIcon === key
                      ? "bg-[var(--admin-accent)]/20 border border-[var(--admin-accent)] text-[var(--admin-accent)]"
                      : "bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] text-[var(--admin-text-muted)] hover:border-[var(--admin-accent)]/50"
                  }`}
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* Görseller */}
          <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-5">
            <h3 className="text-sm font-semibold text-[var(--admin-text-primary)] mb-3" style={{ fontFamily: "var(--font-syne)" }}>Kapak Görseli</h3>
            <div className="border-2 border-dashed border-[var(--admin-border)] rounded-lg p-6 text-center hover:border-[var(--admin-accent)]/50 transition-colors cursor-pointer group">
              <Upload size={20} className="mx-auto mb-2 text-[var(--admin-text-muted)] group-hover:text-[var(--admin-accent)] transition-colors" />
              <p className="text-xs text-[var(--admin-text-muted)]">Sürükleyip bırakın</p>
              <p className="text-[10px] text-[var(--admin-text-muted)] mt-1 opacity-60">Önerilen: 1200×630</p>
            </div>
          </div>

          {/* Featured */}
          <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl px-5 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--admin-text-primary)]">Öne Çıkan Hizmet</p>
                <p className="text-xs text-[var(--admin-text-muted)] mt-0.5">Ana sayfada gösterilir</p>
              </div>
              <button
                onClick={() => setFeatured(!featured)}
                className={`w-10 h-5 rounded-full transition-colors relative ${featured ? "bg-[var(--admin-accent)]" : "bg-[var(--admin-border)]"}`}
              >
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow ${featured ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
