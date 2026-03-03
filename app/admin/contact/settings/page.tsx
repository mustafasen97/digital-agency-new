"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Save } from "lucide-react"
import AdminPageHeader from "@/components/admin/admin-page-header"

const inputCls =
  "w-full bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--admin-text-primary)] placeholder:text-[var(--admin-text-muted)]/50 outline-none focus:border-[var(--admin-accent)] transition-colors"
const labelCls =
  "block text-xs font-medium text-[var(--admin-text-muted)] uppercase tracking-wide mb-1.5"

const formFields = [
  { key: "firstName", label: "Ad" },
  { key: "lastName", label: "Soyad" },
  { key: "email", label: "E-posta" },
  { key: "phone", label: "Telefon" },
  { key: "subject", label: "Konu" },
  { key: "message", label: "Mesaj" },
  { key: "serviceInterest", label: "Hizmet İlgisi" },
]

export default function ContactSettingsPage() {
  const [recaptcha, setRecaptcha] = useState(false)
  const [honeypot, setHoneypot] = useState(true)
  const [fields, setFields] = useState<Record<string, { visible: boolean; required: boolean }>>({
    firstName: { visible: true, required: true },
    lastName: { visible: true, required: false },
    email: { visible: true, required: true },
    phone: { visible: true, required: false },
    subject: { visible: true, required: true },
    message: { visible: true, required: true },
    serviceInterest: { visible: true, required: false },
  })

  const toggleField = (key: string, prop: "visible" | "required") =>
    setFields((prev) => ({ ...prev, [key]: { ...prev[key], [prop]: !prev[key][prop] } }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="max-w-[860px] space-y-6"
    >
      <AdminPageHeader
        title="Form Ayarları"
        description="İletişim formu alanlarını ve bildirim ayarlarını yapılandırın"
        action={
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--admin-accent)] hover:bg-[var(--admin-accent-hover)] text-white font-semibold text-sm rounded-lg transition-colors">
            <Save size={14} />
            Kaydet
          </button>
        }
      />

      {/* Field configurator */}
      <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[var(--admin-border)]">
          <h2 className="text-sm font-semibold text-[var(--admin-text-primary)]" style={{ fontFamily: "var(--font-syne)" }}>
            Form Alanları
          </h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--admin-border)]">
              <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest text-[var(--admin-text-muted)] font-semibold">Alan</th>
              <th className="text-center px-5 py-3 text-[10px] uppercase tracking-widest text-[var(--admin-text-muted)] font-semibold">Görünür</th>
              <th className="text-center px-5 py-3 text-[10px] uppercase tracking-widest text-[var(--admin-text-muted)] font-semibold">Zorunlu</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--admin-border)]">
            {formFields.map((field) => (
              <tr key={field.key} className="hover:bg-[var(--admin-hover)] transition-colors">
                <td className="px-5 py-3.5">
                  <span className="text-sm text-[var(--admin-text-primary)] font-medium">{field.label}</span>
                </td>
                <td className="px-5 py-3.5 text-center">
                  <button
                    onClick={() => toggleField(field.key, "visible")}
                    className={`w-9 h-5 rounded-full transition-colors relative inline-block ${fields[field.key].visible ? "bg-[var(--admin-accent)]" : "bg-[var(--admin-border)]"}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow ${fields[field.key].visible ? "translate-x-4" : "translate-x-0.5"}`} />
                  </button>
                </td>
                <td className="px-5 py-3.5 text-center">
                  <button
                    onClick={() => toggleField(field.key, "required")}
                    disabled={!fields[field.key].visible}
                    className={`w-9 h-5 rounded-full transition-colors relative inline-block disabled:opacity-30 ${fields[field.key].required && fields[field.key].visible ? "bg-[var(--admin-accent)]" : "bg-[var(--admin-border)]"}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow ${fields[field.key].required && fields[field.key].visible ? "translate-x-4" : "translate-x-0.5"}`} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Notifications & Messages */}
      <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-semibold text-[var(--admin-text-primary)]" style={{ fontFamily: "var(--font-syne)" }}>
          Bildirimler
        </h2>
        <div>
          <label className={labelCls}>Bildirim E-postası</label>
          <input type="email" defaultValue="info@webtasarimevi.com.tr" className={inputCls} placeholder="yeni mesajlar bu adrese iletilir" />
        </div>
        <div>
          <label className={labelCls}>Başarı Mesajı</label>
          <textarea
            rows={3}
            defaultValue="Mesajınız için teşekkür ederiz! En kısa sürede size geri dönüş yapacağız."
            className={`${inputCls} resize-none`}
          />
        </div>
      </div>

      {/* Anti-spam */}
      <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-semibold text-[var(--admin-text-primary)]" style={{ fontFamily: "var(--font-syne)" }}>
          Spam Koruması
        </h2>
        <div className="flex items-center justify-between py-2 border-b border-[var(--admin-border)]">
          <div>
            <p className="text-sm font-medium text-[var(--admin-text-primary)]">Honeypot Filtresi</p>
            <p className="text-xs text-[var(--admin-text-muted)] mt-0.5">Bot formlarını görünmez alan ile yakalar</p>
          </div>
          <button
            onClick={() => setHoneypot(!honeypot)}
            className={`w-10 h-5 rounded-full transition-colors relative ${honeypot ? "bg-[var(--admin-accent)]" : "bg-[var(--admin-border)]"}`}
          >
            <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow ${honeypot ? "translate-x-5" : "translate-x-0.5"}`} />
          </button>
        </div>
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-sm font-medium text-[var(--admin-text-primary)]">Google reCAPTCHA</p>
            <p className="text-xs text-[var(--admin-text-muted)] mt-0.5">v2 veya v3 desteklenir</p>
          </div>
          <button
            onClick={() => setRecaptcha(!recaptcha)}
            className={`w-10 h-5 rounded-full transition-colors relative ${recaptcha ? "bg-[var(--admin-accent)]" : "bg-[var(--admin-border)]"}`}
          >
            <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow ${recaptcha ? "translate-x-5" : "translate-x-0.5"}`} />
          </button>
        </div>
        {recaptcha && (
          <div className="space-y-3 pt-1">
            <div>
              <label className={labelCls}>Site Key</label>
              <input type="text" placeholder="6Lc..." className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Secret Key</label>
              <input type="password" placeholder="••••••••••••••••" className={inputCls} />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
