"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Save, RefreshCw, Upload, Info } from "lucide-react"
import AdminPageHeader from "@/components/admin/admin-page-header"

export default function SEOPage() {
  const [activeTab, setActiveTab] = useState<"global" | "pages" | "schema">("global")
  const [metaDesc, setMetaDesc] = useState("Sektörünüze özel WordPress temaları, güçlü eklentiler ve hazır scriptler.")
  const [robotsTxt, setRobotsTxt] = useState("User-agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: https://webtasarimevi.com.tr/sitemap.xml")

  const tabs = [
    { key: "global", label: "Genel SEO" },
    { key: "pages", label: "Sayfa Bazlı SEO" },
    { key: "schema", label: "Şema İşaretleme" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="max-w-[900px] space-y-6"
    >
      <AdminPageHeader
        title="SEO & Meta Ayarları"
        description="Arama motoru optimizasyonu ayarlarını yönetin"
        action={
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--admin-accent)] hover:bg-[var(--admin-accent-hover)] text-black font-semibold text-sm rounded-lg transition-colors">
            <Save size={15} />
            Kaydet
          </button>
        }
      />

      {/* Tabs */}
      <div className="flex gap-1 bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg transition-colors ${
              activeTab === tab.key
                ? "bg-[var(--admin-accent)] text-black"
                : "text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] hover:bg-white/5"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "global" && (
        <div className="space-y-5">
          <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-6 space-y-5">
            <div>
              <label className="block text-xs font-medium text-[var(--admin-text-muted)] uppercase tracking-wide mb-1.5">
                Site Başlık Şablonu
              </label>
              <input
                type="text"
                defaultValue="%page_title% | WebTasarımEvi"
                className="w-full bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--admin-text-primary)] outline-none focus:border-[var(--admin-accent)] transition-colors font-mono"
              />
              <p className="text-xs text-[var(--admin-text-muted)] mt-1.5 flex items-center gap-1">
                <Info size={11} /> Değişkenler: %page_title%, %site_name%
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-[var(--admin-text-muted)] uppercase tracking-wide">
                  Varsayılan Meta Açıklama
                </label>
                <span className={`text-xs ${metaDesc.length > 160 ? "text-[var(--admin-danger)]" : "text-[var(--admin-text-muted)]"}`}>
                  {metaDesc.length}/160
                </span>
              </div>
              <textarea
                value={metaDesc}
                onChange={(e) => setMetaDesc(e.target.value)}
                rows={3}
                className="w-full bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--admin-text-primary)] outline-none focus:border-[var(--admin-accent)] transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[var(--admin-text-muted)] uppercase tracking-wide mb-1.5">
                Varsayılan OG Görseli
              </label>
              <div className="border-2 border-dashed border-[var(--admin-border)] rounded-lg p-6 text-center hover:border-[var(--admin-accent)]/50 transition-colors cursor-pointer group">
                <Upload size={20} className="mx-auto mb-2 text-[var(--admin-text-muted)] group-hover:text-[var(--admin-accent)] transition-colors" />
                <p className="text-xs text-[var(--admin-text-muted)]">Sürükleyip bırakın veya tıklayın</p>
                <p className="text-[10px] text-[var(--admin-text-muted)] mt-1 opacity-60">Önerilen: 1200×630px</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[var(--admin-text-muted)] uppercase tracking-wide mb-1.5">
                  Google Analytics ID
                </label>
                <input
                  type="text"
                  placeholder="G-XXXXXXXXXX"
                  className="w-full bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--admin-text-primary)] placeholder:text-[var(--admin-text-muted)]/50 outline-none focus:border-[var(--admin-accent)] transition-colors font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--admin-text-muted)] uppercase tracking-wide mb-1.5">
                  Search Console Kodu
                </label>
                <input
                  type="text"
                  placeholder="Doğrulama kodu..."
                  className="w-full bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--admin-text-primary)] placeholder:text-[var(--admin-text-muted)]/50 outline-none focus:border-[var(--admin-accent)] transition-colors font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[var(--admin-text-muted)] uppercase tracking-wide mb-1.5">
                Robots.txt
              </label>
              <textarea
                value={robotsTxt}
                onChange={(e) => setRobotsTxt(e.target.value)}
                rows={6}
                className="w-full bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--admin-text-primary)] outline-none focus:border-[var(--admin-accent)] transition-colors resize-none font-mono"
              />
            </div>

            <div className="flex items-center justify-between bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-lg px-4 py-3">
              <div>
                <p className="text-sm font-medium text-[var(--admin-text-primary)]">Sitemap.xml</p>
                <p className="text-xs text-[var(--admin-text-muted)] mt-0.5">Son oluşturulma: 01.01.2025 08:00</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[var(--admin-text-muted)]">Otomatik oluştur</span>
                  <div className="w-8 h-4 rounded-full bg-[var(--admin-success)] relative">
                    <div className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-white shadow" />
                  </div>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-[var(--admin-border)] text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] hover:bg-white/5 transition-colors">
                  <RefreshCw size={12} />
                  Yeniden Oluştur
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "pages" && (
        <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--admin-border)]">
                {["Sayfa", "Meta Başlık", "Meta Açıklama", "Index", "Hızlı Düzenle"].map((h) => (
                  <th key={h} className="text-left px-5 py-3.5 text-[10px] uppercase tracking-widest text-[var(--admin-text-muted)] font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--admin-border)]">
              {[
                { page: "Ana Sayfa", metaTitle: true, metaDesc: true, index: true },
                { page: "Hizmetler", metaTitle: true, metaDesc: false, index: true },
                { page: "Portfolio", metaTitle: false, metaDesc: false, index: true },
                { page: "Blog", metaTitle: true, metaDesc: true, index: true },
                { page: "İletişim", metaTitle: true, metaDesc: false, index: true },
              ].map((row) => (
                <tr key={row.page} className="hover:bg-white/5 transition-colors group">
                  <td className="px-5 py-3.5 text-[var(--admin-text-primary)] font-medium">{row.page}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                      row.metaTitle
                        ? "bg-[var(--admin-success)]/15 text-[var(--admin-success)] border-[var(--admin-success)]/30"
                        : "bg-[var(--admin-danger)]/15 text-[var(--admin-danger)] border-[var(--admin-danger)]/30"
                    }`}>
                      {row.metaTitle ? "Ayarlandı" : "Eksik"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                      row.metaDesc
                        ? "bg-[var(--admin-success)]/15 text-[var(--admin-success)] border-[var(--admin-success)]/30"
                        : "bg-[var(--admin-danger)]/15 text-[var(--admin-danger)] border-[var(--admin-danger)]/30"
                    }`}>
                      {row.metaDesc ? "Ayarlandı" : "Eksik"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs text-[var(--admin-success)]">{row.index ? "index" : "noindex"}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <button className="opacity-0 group-hover:opacity-100 text-xs text-[var(--admin-accent)] hover:underline transition-opacity">
                      Düzenle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "schema" && (
        <div className="space-y-4">
          <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-6">
            <h3 className="text-sm font-semibold text-[var(--admin-text-primary)] mb-4" style={{ fontFamily: "var(--font-syne)" }}>
              Organization Schema
            </h3>
            <textarea
              rows={12}
              defaultValue={`{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "WebTasarımEvi",
  "url": "https://webtasarimevi.com.tr",
  "logo": "https://webtasarimevi.com.tr/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+90-XXX-XXX-XXXX",
    "contactType": "customer service"
  }
}`}
              className="w-full bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-lg px-4 py-3 text-sm text-[var(--admin-success)] outline-none focus:border-[var(--admin-accent)] transition-colors resize-none font-mono leading-relaxed"
            />
          </div>
        </div>
      )}
    </motion.div>
  )
}
