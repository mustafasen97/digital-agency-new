"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Save } from "lucide-react"
import AdminPageHeader from "@/components/admin/admin-page-header"

const inputCls =
  "w-full bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--admin-text-primary)] placeholder:text-[var(--admin-text-muted)]/50 outline-none focus:border-[var(--admin-accent)] transition-colors"
const labelCls =
  "block text-xs font-medium text-[var(--admin-text-muted)] uppercase tracking-wide mb-1.5"

function Toggle({ value, onChange, label, description }: { value: boolean; onChange: (v: boolean) => void; label: string; description?: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[var(--admin-border)] last:border-0">
      <div>
        <p className="text-sm font-medium text-[var(--admin-text-primary)]">{label}</p>
        {description && <p className="text-xs text-[var(--admin-text-muted)] mt-0.5">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`w-10 h-5 rounded-full transition-colors relative shrink-0 ml-4 ${value ? "bg-[var(--admin-accent)]" : "bg-[var(--admin-border)]"}`}
      >
        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow ${value ? "translate-x-5" : "translate-x-0.5"}`} />
      </button>
    </div>
  )
}

export default function RegistrationPage() {
  const [openReg, setOpenReg] = useState(true)
  const [emailVerify, setEmailVerify] = useState(true)

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="max-w-[760px] space-y-6"
    >
      <AdminPageHeader
        title="Kayıt Ayarları"
        description="Üye kayıt seçeneklerini ve hoşgeldin e-postasını yapılandırın"
        action={
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--admin-accent)] hover:bg-[var(--admin-accent-hover)] text-black font-semibold text-sm rounded-lg transition-colors">
            <Save size={14} />
            Kaydet
          </button>
        }
      />

      <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-6 space-y-1">
        <Toggle value={openReg} onChange={setOpenReg} label="Açık Kayıt" description="Herkes ücretsiz olarak kayıt olabilir" />
        <Toggle value={emailVerify} onChange={setEmailVerify} label="E-posta Doğrulama" description="Yeni üyeler e-postalarını doğrulamalıdır" />
      </div>

      <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-semibold text-[var(--admin-text-primary)]" style={{ fontFamily: "var(--font-syne)" }}>
          Varsayılan Rol
        </h2>
        <div>
          <label className={labelCls}>Yeni Üyelere Atanacak Rol</label>
          <select className={inputCls}>
            <option>Member</option>
            <option>Editor</option>
          </select>
        </div>
      </div>

      <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-semibold text-[var(--admin-text-primary)]" style={{ fontFamily: "var(--font-syne)" }}>
          Hoşgeldin E-postası
        </h2>
        <p className="text-xs text-[var(--admin-text-muted)]">
          Kullanılabilir değişkenler: <code className="text-[var(--admin-accent)] font-mono bg-white/5 px-1 rounded">{"{name}"}</code>{" "}
          <code className="text-[var(--admin-accent)] font-mono bg-white/5 px-1 rounded">{"{email}"}</code>
        </p>
        <div>
          <label className={labelCls}>E-posta Konusu</label>
          <input
            type="text"
            defaultValue="WebTasarımEvi'ne hoş geldiniz, {name}!"
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>E-posta İçeriği</label>
          <textarea
            rows={7}
            defaultValue={`Merhaba {name},\n\nWebTasarımEvi ailesine hoş geldiniz! Hesabınız başarıyla oluşturuldu.\n\nE-posta adresiniz: {email}\n\nHerhangi bir sorunuz olursa bizimle iletişime geçmekten çekinmeyin.\n\nSaygılarımızla,\nWebTasarımEvi Ekibi`}
            className={`${inputCls} resize-none`}
          />
        </div>
      </div>
    </motion.div>
  )
}
