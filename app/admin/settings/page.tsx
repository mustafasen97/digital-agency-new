"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Save, Copy, Check, Instagram, Twitter, Linkedin, Youtube, Facebook, Github } from "lucide-react"
import AdminPageHeader from "@/components/admin/admin-page-header"

const inputCls =
  "w-full bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--admin-text-primary)] placeholder:text-[var(--admin-text-muted)]/50 outline-none focus:border-[var(--admin-accent)] transition-colors"

const labelCls = "block text-xs font-medium text-[var(--admin-text-muted)] uppercase tracking-wide mb-1.5"

const socialLinks = [
  { key: "instagram", label: "Instagram", icon: Instagram },
  { key: "twitter", label: "Twitter / X", icon: Twitter },
  { key: "linkedin", label: "LinkedIn", icon: Linkedin },
  { key: "youtube", label: "YouTube", icon: Youtube },
  { key: "facebook", label: "Facebook", icon: Facebook },
  { key: "github", label: "GitHub", icon: Github },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"general" | "email" | "security" | "backup">("general")
  const [copied, setCopied] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [twoFactor, setTwoFactor] = useState(false)
  const [socials, setSocials] = useState<Record<string, { url: string; active: boolean }>>({
    instagram: { url: "https://instagram.com/webtasarimevi", active: true },
    twitter: { url: "https://twitter.com/webtasarimevi", active: true },
    linkedin: { url: "https://linkedin.com/company/webtasarimevi", active: true },
    youtube: { url: "", active: false },
    facebook: { url: "", active: false },
    github: { url: "", active: false },
  })

  const copyUrl = () => {
    navigator.clipboard.writeText("https://webtasarimevi.com.tr")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const tabs = [
    { key: "general", label: "Genel" },
    { key: "email", label: "E-posta / SMTP" },
    { key: "security", label: "Güvenlik" },
    { key: "backup", label: "Yedekleme" },
  ] as const

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="max-w-[860px] space-y-6"
    >
      <AdminPageHeader
        title="Ayarlar"
        description="Site genel ayarlarını ve sistem konfigürasyonunu yönetin"
        action={
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--admin-accent)] hover:bg-[var(--admin-accent-hover)] text-white font-semibold text-sm rounded-lg transition-colors">
            <Save size={14} />
            Kaydet
          </button>
        }
      />

      {/* Tabs */}
      <div className="flex border-b border-[var(--admin-border)] gap-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === t.key
                ? "text-[var(--admin-accent)] border-b-2 border-[var(--admin-accent)]"
                : "text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* General Tab */}
      {activeTab === "general" && (
        <div className="space-y-5">
          <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-6 space-y-5">
            <h2 className="text-sm font-semibold text-[var(--admin-text-primary)]" style={{ fontFamily: "var(--font-syne)" }}>
              Site Bilgileri
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Site Adı</label>
                <input type="text" defaultValue="WebTasarımEvi" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Slogan</label>
                <input type="text" defaultValue="WordPress Tema, Eklenti & Script Mağazası" className={inputCls} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Site URL</label>
              <div className="flex gap-2">
                <input type="text" defaultValue="https://webtasarimevi.com.tr" readOnly className={`${inputCls} flex-1 opacity-70`} />
                <button
                  onClick={copyUrl}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--admin-border)] text-sm text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] hover:bg-[var(--admin-hover)] transition-colors shrink-0"
                >
                  {copied ? <Check size={14} className="text-[var(--admin-success)]" /> : <Copy size={14} />}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>İletişim E-posta</label>
                <input type="email" defaultValue="info@webtasarimevi.com.tr" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Telefon</label>
                <input type="text" defaultValue="+90 (212) 000 00 00" className={inputCls} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Adres</label>
              <textarea rows={2} defaultValue="Maslak Mah. AOS 55. Sokak No:3, Sarıyer / İstanbul" className={`${inputCls} resize-none`} />
            </div>
            <div>
              <label className={labelCls}>Çalışma Saatleri</label>
              <textarea rows={2} defaultValue={"Hafta içi: 09:00 – 18:00\nCumartesi: 10:00 – 15:00"} className={`${inputCls} resize-none`} />
            </div>
          </div>

          <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-6 space-y-4">
            <h2 className="text-sm font-semibold text-[var(--admin-text-primary)]" style={{ fontFamily: "var(--font-syne)" }}>
              Sosyal Medya
            </h2>
            <div className="space-y-3">
              {socialLinks.map(({ key, label, icon: Icon }) => (
                <div key={key} className="flex items-center gap-3">
                  <Icon size={16} className="text-[var(--admin-text-muted)] shrink-0" />
                  <input
                    type="url"
                    placeholder={`${label} URL`}
                    value={socials[key].url}
                    onChange={(e) => setSocials((prev) => ({ ...prev, [key]: { ...prev[key], url: e.target.value } }))}
                    className={`${inputCls} flex-1`}
                  />
                  <button
                    onClick={() => setSocials((prev) => ({ ...prev, [key]: { ...prev[key], active: !prev[key].active } }))}
                    className={`w-10 h-5 rounded-full transition-colors relative shrink-0 ${socials[key].active ? "bg-[var(--admin-accent)]" : "bg-[var(--admin-border)]"}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow ${socials[key].active ? "translate-x-5" : "translate-x-0.5"}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Email / SMTP Tab */}
      {activeTab === "email" && (
        <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-6 space-y-5">
          <h2 className="text-sm font-semibold text-[var(--admin-text-primary)]" style={{ fontFamily: "var(--font-syne)" }}>
            SMTP Ayarları
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>SMTP Host</label>
              <input type="text" placeholder="smtp.example.com" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Port</label>
              <input type="number" defaultValue="587" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Kullanıcı Adı</label>
              <input type="text" placeholder="smtp-user@example.com" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Şifre</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} placeholder="••••••••" className={`${inputCls} pr-12`} />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] transition-colors"
                >
                  {showPassword ? "Gizle" : "Göster"}
                </button>
              </div>
            </div>
            <div>
              <label className={labelCls}>Gönderici Adı</label>
              <input type="text" defaultValue="WebTasarımEvi" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Gönderici E-posta</label>
              <input type="email" defaultValue="noreply@webtasarimevi.com.tr" className={inputCls} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Şifreleme</label>
            <select className={inputCls}>
              <option>TLS</option>
              <option>SSL</option>
              <option>Yok</option>
            </select>
          </div>
          <div className="pt-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--admin-border)] text-sm text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] hover:bg-[var(--admin-hover)] transition-colors">
              Test E-postası Gönder
            </button>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="space-y-5">
          <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-6 space-y-5">
            <h2 className="text-sm font-semibold text-[var(--admin-text-primary)]" style={{ fontFamily: "var(--font-syne)" }}>
              Güvenlik Ayarları
            </h2>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-[var(--admin-text-primary)]">İki Faktörlü Doğrulama</p>
                <p className="text-xs text-[var(--admin-text-muted)] mt-0.5">Admin hesapları için 2FA zorunlu kıl</p>
              </div>
              <button
                onClick={() => setTwoFactor(!twoFactor)}
                className={`w-10 h-5 rounded-full transition-colors relative ${twoFactor ? "bg-[var(--admin-accent)]" : "bg-[var(--admin-border)]"}`}
              >
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow ${twoFactor ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
            </div>
            <div>
              <label className={labelCls}>Oturum Zaman Aşımı</label>
              <select className={inputCls}>
                <option>30 dakika</option>
                <option>1 saat</option>
                <option>4 saat</option>
                <option>8 saat</option>
                <option>1 gün</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Maksimum Başarısız Giriş Denemesi</label>
              <input type="number" defaultValue="5" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Admin IP İzin Listesi</label>
              <textarea
                rows={4}
                placeholder={"Her satıra bir IP adresi girin\n192.168.1.1\n10.0.0.0/24"}
                className={`${inputCls} resize-none font-mono text-xs`}
              />
              <p className="text-xs text-[var(--admin-text-muted)] mt-1.5">Boş bırakılırsa tüm IP&apos;lere izin verilir.</p>
            </div>
          </div>
          <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-6">
            <h2 className="text-sm font-semibold text-[var(--admin-text-primary)] mb-4" style={{ fontFamily: "var(--font-syne)" }}>
              Oturumlar
            </h2>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--admin-danger)]/40 text-sm text-[var(--admin-danger)] hover:bg-[var(--admin-danger)]/10 transition-colors">
              Tüm Oturumları Sonlandır
            </button>
          </div>
        </div>
      )}

      {/* Backup Tab */}
      {activeTab === "backup" && (
        <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-6 space-y-5">
          <h2 className="text-sm font-semibold text-[var(--admin-text-primary)]" style={{ fontFamily: "var(--font-syne)" }}>
            Yedekleme ve Dışa Aktarma
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-lg">
              <div>
                <p className="text-sm font-medium text-[var(--admin-text-primary)]">Tüm İçeriği Dışa Aktar</p>
                <p className="text-xs text-[var(--admin-text-muted)] mt-0.5">Tüm içerik ve ayarları JSON olarak indir</p>
              </div>
              <button className="px-4 py-2 text-xs font-medium rounded-lg border border-[var(--admin-border)] text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] hover:bg-[var(--admin-hover)] transition-colors">
                JSON İndir
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-lg">
              <div>
                <p className="text-sm font-medium text-[var(--admin-text-primary)]">Medya Arşivi İndir</p>
                <p className="text-xs text-[var(--admin-text-muted)] mt-0.5">Tüm yüklenen dosyaları ZIP olarak indir (~240 MB)</p>
              </div>
              <button className="px-4 py-2 text-xs font-medium rounded-lg border border-[var(--admin-border)] text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] hover:bg-[var(--admin-hover)] transition-colors">
                ZIP İndir
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-lg">
              <div>
                <p className="text-sm font-medium text-[var(--admin-text-primary)]">Önbelleği Temizle</p>
                <p className="text-xs text-[var(--admin-text-muted)] mt-0.5">Son yedekleme: 01.01.2025 – 03:00</p>
              </div>
              <button className="px-4 py-2 text-xs font-medium rounded-lg border border-[var(--admin-danger)]/40 text-[var(--admin-danger)] hover:bg-[var(--admin-danger)]/10 transition-colors">
                Temizle
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
