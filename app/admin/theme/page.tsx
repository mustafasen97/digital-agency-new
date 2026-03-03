"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Save, RotateCcw, Upload } from "lucide-react"
import AdminPageHeader from "@/components/admin/admin-page-header"

const presetThemes = [
  { name: "Dark Pro", primary: "#F59E0B", bg: "#0A0A0F", text: "#F8F8FF" },
  { name: "Light Studio", primary: "#6366F1", bg: "#FFFFFF", text: "#1A1A2E" },
  { name: "Ocean Depth", primary: "#06B6D4", bg: "#0C1527", text: "#E2E8F0" },
  { name: "Forest Ink", primary: "#10B981", bg: "#0D1F0D", text: "#F0FDF4" },
]

const colorFields = [
  { label: "Ana Renk", key: "primary", defaultValue: "#F59E0B" },
  { label: "İkincil Renk", key: "secondary", defaultValue: "#111118" },
  { label: "Vurgu Rengi", key: "accent", defaultValue: "#D97706" },
  { label: "Arka Plan", key: "background", defaultValue: "#0A0A0F" },
  { label: "Metin Rengi", key: "text", defaultValue: "#F8F8FF" },
]

export default function ThemePage() {
  const [activeTab, setActiveTab] = useState<"colors" | "typography" | "logo" | "css">("colors")
  const [colors, setColors] = useState<Record<string, string>>(
    Object.fromEntries(colorFields.map((f) => [f.key, f.defaultValue]))
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="max-w-[1000px] space-y-6"
    >
      <AdminPageHeader
        title="Tema & Görünüm"
        description="Sitenin görsel kimliğini özelleştirin"
        action={
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--admin-accent)] hover:bg-[var(--admin-accent-hover)] text-black font-semibold text-sm rounded-lg transition-colors">
            <Save size={15} />
            Değişiklikleri Uygula
          </button>
        }
      />

      {/* Tabs */}
      <div className="flex gap-1 bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-1">
        {(["colors", "typography", "logo", "css"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg transition-colors ${
              activeTab === tab
                ? "bg-[var(--admin-accent)] text-black"
                : "text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] hover:bg-white/5"
            }`}
          >
            {tab === "colors" ? "Renkler" : tab === "typography" ? "Tipografi" : tab === "logo" ? "Logo & Favicon" : "Özel CSS"}
          </button>
        ))}
      </div>

      {activeTab === "colors" && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="space-y-5">
            <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-6">
              <h3 className="text-sm font-semibold text-[var(--admin-text-primary)] mb-5" style={{ fontFamily: "var(--font-syne)" }}>
                Renk Paleti
              </h3>
              <div className="space-y-4">
                {colorFields.map((field) => (
                  <div key={field.key} className="flex items-center gap-3">
                    <input
                      type="color"
                      value={colors[field.key]}
                      onChange={(e) => setColors((prev) => ({ ...prev, [field.key]: e.target.value }))}
                      className="w-9 h-9 rounded-lg border border-[var(--admin-border)] cursor-pointer bg-transparent p-0.5"
                    />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-[var(--admin-text-primary)] mb-1">{field.label}</p>
                      <input
                        type="text"
                        value={colors[field.key]}
                        onChange={(e) => setColors((prev) => ({ ...prev, [field.key]: e.target.value }))}
                        className="w-full bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-lg px-3 py-1.5 text-xs text-[var(--admin-text-primary)] outline-none focus:border-[var(--admin-accent)] transition-colors font-mono uppercase"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Preset themes */}
            <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-6">
              <h3 className="text-sm font-semibold text-[var(--admin-text-primary)] mb-4" style={{ fontFamily: "var(--font-syne)" }}>
                Hazır Temalar
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {presetThemes.map((theme) => (
                  <button
                    key={theme.name}
                    onClick={() => setColors({ primary: theme.primary, secondary: theme.bg, accent: theme.primary, background: theme.bg, text: theme.text })}
                    className="p-3 rounded-lg border border-[var(--admin-border)] hover:border-[var(--admin-accent)]/50 transition-colors text-left group"
                  >
                    <div className="flex gap-1.5 mb-2">
                      {[theme.bg, theme.primary, theme.text].map((c, i) => (
                        <div key={i} className="w-5 h-5 rounded-full border border-white/10" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                    <p className="text-xs font-medium text-[var(--admin-text-primary)] group-hover:text-[var(--admin-accent)] transition-colors">
                      {theme.name}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Live preview */}
          <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-6">
            <h3 className="text-sm font-semibold text-[var(--admin-text-primary)] mb-4" style={{ fontFamily: "var(--font-syne)" }}>
              Canlı Önizleme
            </h3>
            <div
              className="rounded-xl overflow-hidden border border-[var(--admin-border)]"
              style={{ backgroundColor: colors.background }}
            >
              {/* Mock navbar */}
              <div
                className="flex items-center justify-between px-4 py-3 border-b"
                style={{ borderColor: colors.primary + "30", backgroundColor: colors.secondary }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded" style={{ backgroundColor: colors.primary }} />
                  <span className="text-xs font-bold" style={{ color: colors.text }}>WTE</span>
                </div>
                <div className="flex items-center gap-3">
                  {["Ana Sayfa", "Hizmetler", "Blog"].map((item) => (
                    <span key={item} className="text-[10px]" style={{ color: colors.text + "99" }}>{item}</span>
                  ))}
                </div>
                <div className="px-3 py-1 rounded text-[10px] font-bold text-black" style={{ backgroundColor: colors.primary }}>
                  İletişim
                </div>
              </div>

              {/* Hero */}
              <div className="px-6 py-8 text-center">
                <div className="w-12 h-0.5 mx-auto mb-3 rounded" style={{ backgroundColor: colors.primary }} />
                <h2 className="text-lg font-bold mb-2" style={{ color: colors.text, fontFamily: "var(--font-syne)" }}>
                  Dijital Varlığınızı Güçlendirin
                </h2>
                <p className="text-[11px] mb-4" style={{ color: colors.text + "66" }}>
                  Profesyonel web tasarım ve geliştirme hizmetleri
                </p>
                <div className="inline-block px-4 py-1.5 rounded text-xs font-bold text-black" style={{ backgroundColor: colors.primary }}>
                  Hemen Başlayın
                </div>
              </div>

              {/* Card row */}
              <div className="flex gap-2 px-4 pb-4">
                {["Tasarım", "Geliştirme", "SEO"].map((label) => (
                  <div key={label} className="flex-1 p-2.5 rounded-lg border text-center" style={{ borderColor: colors.primary + "30", backgroundColor: colors.secondary }}>
                    <div className="w-4 h-4 rounded mx-auto mb-1.5" style={{ backgroundColor: colors.primary + "30" }} />
                    <p className="text-[10px] font-medium" style={{ color: colors.text }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button className="flex-1 py-2 text-xs font-semibold rounded-lg bg-[var(--admin-accent)] hover:bg-[var(--admin-accent-hover)] text-black transition-colors">
                Değişiklikleri Uygula
              </button>
              <button className="px-3 py-2 text-xs rounded-lg border border-[var(--admin-border)] text-[var(--admin-danger)] hover:bg-[var(--admin-danger)]/10 transition-colors">
                <RotateCcw size={13} />
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "typography" && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-6 space-y-5">
            <h3 className="text-sm font-semibold text-[var(--admin-text-primary)]" style={{ fontFamily: "var(--font-syne)" }}>
              Font Ayarları
            </h3>
            <div>
              <label className="block text-xs font-medium text-[var(--admin-text-muted)] uppercase tracking-wide mb-1.5">
                Başlık Fontu
              </label>
              <select className="w-full bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--admin-text-primary)] outline-none focus:border-[var(--admin-accent)] transition-colors cursor-pointer">
                <option>Syne</option>
                <option>Inter</option>
                <option>Playfair Display</option>
                <option>Space Grotesk</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--admin-text-muted)] uppercase tracking-wide mb-1.5">
                Gövde Fontu
              </label>
              <select className="w-full bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--admin-text-primary)] outline-none focus:border-[var(--admin-accent)] transition-colors cursor-pointer">
                <option>DM Sans</option>
                <option>Inter</option>
                <option>Roboto</option>
                <option>Open Sans</option>
              </select>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-[var(--admin-text-muted)] uppercase tracking-wide">Temel Font Boyutu</label>
                <span className="text-xs text-[var(--admin-accent)] font-mono">16px</span>
              </div>
              <input type="range" min={14} max={18} defaultValue={16} className="w-full accent-[#F59E0B]" />
              <div className="flex justify-between text-[10px] text-[var(--admin-text-muted)] mt-1">
                <span>14px</span><span>18px</span>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-[var(--admin-text-muted)] uppercase tracking-wide">Satır Yüksekliği</label>
                <span className="text-xs text-[var(--admin-accent)] font-mono">1.6</span>
              </div>
              <input type="range" min={140} max={200} defaultValue={160} className="w-full accent-[#F59E0B]" />
              <div className="flex justify-between text-[10px] text-[var(--admin-text-muted)] mt-1">
                <span>1.4</span><span>2.0</span>
              </div>
            </div>
          </div>
          <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-6">
            <h3 className="text-sm font-semibold text-[var(--admin-text-primary)] mb-5" style={{ fontFamily: "var(--font-syne)" }}>
              Yazı Önizlemesi
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] text-[var(--admin-text-muted)] mb-1.5 uppercase tracking-wide">H1 Başlık</p>
                <p className="text-3xl font-bold text-[var(--admin-text-primary)]" style={{ fontFamily: "var(--font-syne)" }}>
                  Dijital Varlığınızı Güçlendirin
                </p>
              </div>
              <div>
                <p className="text-[10px] text-[var(--admin-text-muted)] mb-1.5 uppercase tracking-wide">H2 Başlık</p>
                <p className="text-xl font-bold text-[var(--admin-text-primary)]" style={{ fontFamily: "var(--font-syne)" }}>
                  Hizmetlerimiz
                </p>
              </div>
              <div>
                <p className="text-[10px] text-[var(--admin-text-muted)] mb-1.5 uppercase tracking-wide">Paragraf</p>
                <p className="text-sm text-[var(--admin-text-muted)] leading-relaxed">
                  Profesyonel web tasarım ve geliştirme hizmetleri ile dijital dünyada öne çıkın. Sektörünüze özel çözümler sunuyoruz.
                </p>
              </div>
              <div>
                <p className="text-[10px] text-[var(--admin-text-muted)] mb-1.5 uppercase tracking-wide">Buton</p>
                <button className="px-4 py-2 text-sm font-bold rounded-lg bg-[var(--admin-accent)] text-black">
                  Hemen Başlayın
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "logo" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Açık Arkaplan Logosu", desc: "Koyu arka planda kullanılır" },
            { label: "Koyu Arkaplan Logosu", desc: "Açık arka planda kullanılır" },
          ].map((item) => (
            <div key={item.label} className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-6">
              <h3 className="text-sm font-semibold text-[var(--admin-text-primary)] mb-1" style={{ fontFamily: "var(--font-syne)" }}>
                {item.label}
              </h3>
              <p className="text-xs text-[var(--admin-text-muted)] mb-4">{item.desc}</p>
              <div className="border-2 border-dashed border-[var(--admin-border)] rounded-xl p-8 text-center hover:border-[var(--admin-accent)]/50 transition-colors cursor-pointer group">
                <Upload size={24} className="mx-auto mb-2 text-[var(--admin-text-muted)] group-hover:text-[var(--admin-accent)] transition-colors" />
                <p className="text-xs text-[var(--admin-text-muted)]">Logo yükle</p>
              </div>
            </div>
          ))}
          <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-6">
            <h3 className="text-sm font-semibold text-[var(--admin-text-primary)] mb-4" style={{ fontFamily: "var(--font-syne)" }}>
              Favicon
            </h3>
            <div className="border-2 border-dashed border-[var(--admin-border)] rounded-xl p-8 text-center hover:border-[var(--admin-accent)]/50 transition-colors cursor-pointer group mb-4">
              <Upload size={24} className="mx-auto mb-2 text-[var(--admin-text-muted)] group-hover:text-[var(--admin-accent)] transition-colors" />
              <p className="text-xs text-[var(--admin-text-muted)]">32×32 veya 64×64 PNG/ICO</p>
            </div>
            <div className="bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-lg px-3 py-2 flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[var(--admin-accent)]" />
              <span className="text-xs text-[var(--admin-text-muted)]">WTE — Tarayıcı sekme önizlemesi</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === "css" && (
        <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--admin-border)]">
            <p className="text-sm font-medium text-[var(--admin-text-primary)]">Özel CSS Editörü</p>
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-[var(--admin-danger)] text-[var(--admin-danger)] hover:bg-[var(--admin-danger)]/10 transition-colors">
                <RotateCcw size={12} />
                Varsayılana Döndür
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-[var(--admin-accent)] text-black font-semibold hover:bg-[var(--admin-accent-hover)] transition-colors">
                <Save size={12} />
                CSS Kaydet
              </button>
            </div>
          </div>
          <textarea
            rows={24}
            placeholder="/* Özel CSS kurallarınızı buraya yazın */"
            defaultValue={`/* Özel CSS — WebTasarımEvi */

/* Hero bölümü özel stilleri */
.hero-section {
  /* özel stiller */
}

/* Buton hover efekti */
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(245, 158, 11, 0.3);
}`}
            className="w-full bg-[var(--admin-bg-secondary)] px-5 py-4 text-sm text-[var(--admin-success)] outline-none resize-none font-mono leading-relaxed"
          />
        </div>
      )}
    </motion.div>
  )
}
