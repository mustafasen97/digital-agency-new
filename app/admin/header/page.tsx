"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Upload, Save } from "lucide-react"
import AdminPageHeader from "@/components/admin/admin-page-header"

const inputCls =
  "w-full bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--admin-text-primary)] placeholder:text-[var(--admin-text-muted)]/50 outline-none focus:border-[var(--admin-accent)] transition-colors"

const labelCls =
  "block text-xs font-medium text-[var(--admin-text-muted)] uppercase tracking-wide mb-1.5"

function Toggle({ value, onChange, label, description }: { value: boolean; onChange: (v: boolean) => void; label: string; description?: string }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="text-sm font-medium text-[var(--admin-text-primary)]">{label}</p>
        {description && <p className="text-xs text-[var(--admin-text-muted)] mt-0.5">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`w-10 h-5 rounded-full transition-colors relative shrink-0 ${value ? "bg-[var(--admin-accent)]" : "bg-[var(--admin-border)]"}`}
      >
        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow ${value ? "translate-x-5" : "translate-x-0.5"}`} />
      </button>
    </div>
  )
}

export default function HeaderPage() {
  const [sticky, setSticky] = useState(true)
  const [ctaVisible, setCtaVisible] = useState(true)
  const [headerHeight, setHeaderHeight] = useState(72)

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="max-w-[860px] space-y-6"
    >
      <AdminPageHeader
        title="Header Ayarları"
        description="Site başlığını, logosunu ve navigasyonunu yönetin"
        action={
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--admin-accent)] hover:bg-[var(--admin-accent-hover)] text-black font-semibold text-sm rounded-lg transition-colors">
            <Save size={14} />
            Kaydet
          </button>
        }
      />

      {/* Logo */}
      <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-6 space-y-5">
        <h2 className="text-sm font-semibold text-[var(--admin-text-primary)]" style={{ fontFamily: "var(--font-syne)" }}>
          Logo
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Logo Dosyası</label>
            <div className="border-2 border-dashed border-[var(--admin-border)] rounded-lg p-5 text-center cursor-pointer hover:border-[var(--admin-accent)]/40 transition-colors group">
              <Upload size={18} className="mx-auto mb-2 text-[var(--admin-text-muted)] group-hover:text-[var(--admin-accent)] transition-colors" />
              <p className="text-xs text-[var(--admin-text-muted)]">PNG, SVG, WebP</p>
              <p className="text-[10px] text-[var(--admin-text-muted)] mt-0.5 opacity-60">Önerilen: 200×60px</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Logo Alt Metni</label>
              <input type="text" defaultValue="WebTasarımEvi" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Logo Maks. Yükseklik</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={24}
                  max={80}
                  value={48}
                  className="flex-1 accent-[var(--admin-accent)]"
                  readOnly
                />
                <span className="text-sm font-mono text-[var(--admin-accent)] w-12 text-right">48px</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header Settings */}
      <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-6 space-y-5">
        <h2 className="text-sm font-semibold text-[var(--admin-text-primary)]" style={{ fontFamily: "var(--font-syne)" }}>
          Header Davranışı
        </h2>
        <Toggle value={sticky} onChange={setSticky} label="Yapışkan Header" description="Kaydırılırken sayfanın üstünde sabit kalır" />
        <div className="border-t border-[var(--admin-border)] pt-4">
          <label className={labelCls}>Kaydırma Davranışı</label>
          <select className={inputCls}>
            <option>Sabit Kal</option>
            <option>Kaydırmada Gizle</option>
            <option>Kaydırmada Küçül</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Header Yüksekliği — {headerHeight}px</label>
          <input
            type="range"
            min={60}
            max={120}
            value={headerHeight}
            onChange={(e) => setHeaderHeight(Number(e.target.value))}
            className="w-full accent-[var(--admin-accent)]"
          />
          <div className="flex justify-between text-xs text-[var(--admin-text-muted)] mt-1">
            <span>60px</span>
            <span>120px</span>
          </div>
        </div>
        <div>
          <label className={labelCls}>Arka Plan Rengi</label>
          <div className="flex items-center gap-3">
            <input type="color" defaultValue="#0A0A0F" className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-[var(--admin-border)]" />
            <input type="text" defaultValue="#0A0A0F" className={`${inputCls} font-mono`} />
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-[var(--admin-text-primary)]" style={{ fontFamily: "var(--font-syne)" }}>
            CTA Butonu
          </h2>
          <button
            onClick={() => setCtaVisible(!ctaVisible)}
            className={`w-10 h-5 rounded-full transition-colors relative ${ctaVisible ? "bg-[var(--admin-accent)]" : "bg-[var(--admin-border)]"}`}
          >
            <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow ${ctaVisible ? "translate-x-5" : "translate-x-0.5"}`} />
          </button>
        </div>
        {ctaVisible && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Buton Metni</label>
                <input type="text" defaultValue="Teklif Al" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Hedef URL</label>
                <input type="text" defaultValue="/iletisim" className={inputCls} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Buton Rengi</label>
              <div className="flex items-center gap-3">
                <input type="color" defaultValue="#F59E0B" className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-[var(--admin-border)]" />
                <input type="text" defaultValue="#F59E0B" className={`${inputCls} font-mono`} />
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
