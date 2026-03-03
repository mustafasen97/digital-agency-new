"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Lock, Unlock, Upload, ChevronDown } from "lucide-react"
import AdminPageHeader from "@/components/admin/admin-page-header"

export default function NewBlogPostPage() {
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [slugLocked, setSlugLocked] = useState(false)
  const [status, setStatus] = useState<"draft" | "published" | "scheduled">("draft")
  const [metaTitle, setMetaTitle] = useState("")
  const [metaDesc, setMetaDesc] = useState("")
  const [featured, setFeatured] = useState(false)
  const [activeTab, setActiveTab] = useState<"content" | "seo">("content")

  const handleTitleChange = (v: string) => {
    setTitle(v)
    if (!slugLocked) {
      setSlug(
        v
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
      )
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="max-w-[1200px]"
    >
      <AdminPageHeader
        title="Yeni Blog Yazısı"
        description="Yeni bir blog yazısı oluşturun"
        backHref="/admin/blog"
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
              placeholder="Yazı başlığı..."
              className="w-full bg-transparent text-2xl font-bold text-[var(--admin-text-primary)] placeholder:text-[var(--admin-text-muted)]/50 outline-none"
              style={{ fontFamily: "var(--font-syne)" }}
            />
          </div>

          {/* Slug */}
          <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--admin-text-muted)] shrink-0">Slug:</span>
              <span className="text-xs text-[var(--admin-text-muted)]">/blog/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                disabled={!slugLocked}
                className="flex-1 bg-transparent text-xs text-[var(--admin-accent)] outline-none font-mono disabled:opacity-70"
              />
              <button
                onClick={() => setSlugLocked(!slugLocked)}
                className="p-1 rounded text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] transition-colors"
              >
                {slugLocked ? <Unlock size={13} /> : <Lock size={13} />}
              </button>
            </div>
          </div>

          {/* Content area tabs */}
          <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl overflow-hidden">
            <div className="flex border-b border-[var(--admin-border)]">
              {(["content", "seo"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? "text-[var(--admin-accent)] border-b-2 border-[var(--admin-accent)]"
                      : "text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)]"
                  }`}
                >
                  {tab === "content" ? "İçerik" : "SEO"}
                </button>
              ))}
            </div>

            {activeTab === "content" && (
              <div className="p-5">
                {/* Tiptap toolbar placeholder */}
                <div className="flex flex-wrap gap-1 pb-3 border-b border-[var(--admin-border)] mb-3">
                  {["H1", "H2", "H3", "B", "I", "U", "S", "Link", "Img", "Code", '" "', "UL", "OL"].map((btn) => (
                    <button
                      key={btn}
                      className="px-2 py-1 text-xs rounded bg-white/5 text-[var(--admin-text-muted)] hover:bg-white/10 hover:text-[var(--admin-text-primary)] transition-colors font-mono"
                    >
                      {btn}
                    </button>
                  ))}
                </div>
                <textarea
                  placeholder="Yazı içeriğini buraya yazın..."
                  rows={18}
                  className="w-full bg-transparent text-sm text-[var(--admin-text-primary)] placeholder:text-[var(--admin-text-muted)]/50 outline-none resize-none leading-relaxed"
                />
              </div>
            )}

            {activeTab === "seo" && (
              <div className="p-5 space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium text-[var(--admin-text-muted)] uppercase tracking-wide">Meta Başlık</label>
                    <span className={`text-xs ${metaTitle.length > 60 ? "text-[var(--admin-danger)]" : "text-[var(--admin-text-muted)]"}`}>
                      {metaTitle.length}/60
                    </span>
                  </div>
                  <input
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder="SEO meta başlığı..."
                    className="w-full bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--admin-text-primary)] placeholder:text-[var(--admin-text-muted)]/50 outline-none focus:border-[var(--admin-accent)] transition-colors"
                  />
                  <div className="mt-1.5 h-1 rounded-full bg-[var(--admin-border)] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${Math.min((metaTitle.length / 60) * 100, 100)}%`,
                        backgroundColor: metaTitle.length > 60 ? "var(--admin-danger)" : metaTitle.length > 40 ? "var(--admin-success)" : "var(--admin-accent)",
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium text-[var(--admin-text-muted)] uppercase tracking-wide">Meta Açıklama</label>
                    <span className={`text-xs ${metaDesc.length > 160 ? "text-[var(--admin-danger)]" : "text-[var(--admin-text-muted)]"}`}>
                      {metaDesc.length}/160
                    </span>
                  </div>
                  <textarea
                    value={metaDesc}
                    onChange={(e) => setMetaDesc(e.target.value)}
                    placeholder="SEO meta açıklaması..."
                    rows={3}
                    className="w-full bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--admin-text-primary)] placeholder:text-[var(--admin-text-muted)]/50 outline-none focus:border-[var(--admin-accent)] transition-colors resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--admin-text-muted)] uppercase tracking-wide mb-1.5">Odak Anahtar Kelime</label>
                  <input
                    type="text"
                    placeholder="Odak anahtar kelime..."
                    className="w-full bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--admin-text-primary)] placeholder:text-[var(--admin-text-muted)]/50 outline-none focus:border-[var(--admin-accent)] transition-colors"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Metadata panel */}
        <div className="space-y-4">
          {/* Status */}
          <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-5">
            <h3 className="text-sm font-semibold text-[var(--admin-text-primary)] mb-3" style={{ fontFamily: "var(--font-syne)" }}>
              Durum
            </h3>
            <div className="flex rounded-lg overflow-hidden border border-[var(--admin-border)]">
              {(["draft", "published", "scheduled"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`flex-1 py-2 text-xs font-medium transition-colors ${
                    status === s
                      ? "bg-[var(--admin-accent)] text-black"
                      : "text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] hover:bg-white/5"
                  }`}
                >
                  {s === "draft" ? "Taslak" : s === "published" ? "Yayında" : "Planlandı"}
                </button>
              ))}
            </div>
            {status === "scheduled" && (
              <div className="mt-3">
                <label className="block text-xs text-[var(--admin-text-muted)] mb-1.5">Yayın Tarihi</label>
                <input
                  type="datetime-local"
                  className="w-full bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-lg px-3 py-2 text-sm text-[var(--admin-text-primary)] outline-none focus:border-[var(--admin-accent)] transition-colors"
                />
              </div>
            )}
          </div>

          {/* Author & Category */}
          <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-5 space-y-4">
            <div>
              <label className="block text-xs font-medium text-[var(--admin-text-muted)] uppercase tracking-wide mb-1.5">Yazar</label>
              <div className="relative">
                <select className="w-full appearance-none bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--admin-text-primary)] outline-none focus:border-[var(--admin-accent)] transition-colors cursor-pointer pr-8">
                  <option>Admin</option>
                  <option>Zeynep Arslan</option>
                  <option>Emre Koç</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)] pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--admin-text-muted)] uppercase tracking-wide mb-1.5">Kategori</label>
              <div className="relative">
                <select className="w-full appearance-none bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--admin-text-primary)] outline-none focus:border-[var(--admin-accent)] transition-colors cursor-pointer pr-8">
                  <option>Tasarım</option>
                  <option>SEO</option>
                  <option>Geliştirme</option>
                  <option>Pazarlama</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)] pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--admin-text-muted)] uppercase tracking-wide mb-1.5">Etiketler</label>
              <input
                type="text"
                placeholder="Etiket ekle ve Enter'a bas..."
                className="w-full bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--admin-text-primary)] placeholder:text-[var(--admin-text-muted)]/50 outline-none focus:border-[var(--admin-accent)] transition-colors"
              />
            </div>
          </div>

          {/* Featured image */}
          <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-5">
            <h3 className="text-sm font-semibold text-[var(--admin-text-primary)] mb-3" style={{ fontFamily: "var(--font-syne)" }}>
              Öne Çıkan Görsel
            </h3>
            <div className="border-2 border-dashed border-[var(--admin-border)] rounded-lg p-6 text-center hover:border-[var(--admin-accent)]/50 transition-colors cursor-pointer group">
              <Upload size={20} className="mx-auto mb-2 text-[var(--admin-text-muted)] group-hover:text-[var(--admin-accent)] transition-colors" />
              <p className="text-xs text-[var(--admin-text-muted)]">Sürükleyip bırakın veya tıklayın</p>
              <p className="text-[10px] text-[var(--admin-text-muted)] mt-1 opacity-60">Önerilen: 1200×630</p>
            </div>
          </div>

          {/* Featured toggle */}
          <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl px-5 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--admin-text-primary)]">Öne Çıkan Yazı</p>
                <p className="text-xs text-[var(--admin-text-muted)] mt-0.5">Blog listesinin üstüne sabitler</p>
              </div>
              <button
                onClick={() => setFeatured(!featured)}
                className={`w-10 h-5 rounded-full transition-colors relative ${
                  featured ? "bg-[var(--admin-accent)]" : "bg-[var(--admin-border)]"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow ${
                    featured ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
