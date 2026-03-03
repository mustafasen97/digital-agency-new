"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Edit2, Trash2, X, Check, ShieldCheck } from "lucide-react"
import AdminPageHeader from "@/components/admin/admin-page-header"

const roles = [
  { id: 1, name: "Admin", count: 1, permissions: ["Tüm izinler"] },
  { id: 2, name: "Editor", count: 2, permissions: ["İçerik oluştur", "İçerik düzenle", "Yayınla", "Medya yükle"] },
  { id: 3, name: "Member", count: 2, permissions: ["İçerik görüntüle", "Yorum yap"] },
]

const permissionGroups = [
  {
    group: "İçerik Yönetimi",
    perms: [
      { key: "content.create", label: "İçerik Oluştur" },
      { key: "content.edit", label: "İçerik Düzenle" },
      { key: "content.delete", label: "İçerik Sil" },
      { key: "content.publish", label: "Yayınla / Yayından Al" },
    ],
  },
  {
    group: "Kullanıcı Yönetimi",
    perms: [
      { key: "users.view", label: "Kullanıcıları Görüntüle" },
      { key: "users.edit", label: "Kullanıcı Düzenle" },
      { key: "users.delete", label: "Kullanıcı Sil" },
    ],
  },
  {
    group: "Ayarlar",
    perms: [
      { key: "settings.general", label: "Genel Ayarlar" },
      { key: "settings.seo", label: "SEO Ayarları" },
      { key: "settings.theme", label: "Tema Ayarları" },
    ],
  },
  {
    group: "Medya",
    perms: [
      { key: "media.upload", label: "Dosya Yükle" },
      { key: "media.delete", label: "Dosya Sil" },
    ],
  },
]

const inputCls =
  "w-full bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--admin-text-primary)] placeholder:text-[var(--admin-text-muted)]/50 outline-none focus:border-[var(--admin-accent)] transition-colors"

export default function RolesPage() {
  const [showModal, setShowModal] = useState(false)
  const [checked, setChecked] = useState<Record<string, boolean>>({
    "content.create": true,
    "content.edit": true,
    "content.publish": true,
    "media.upload": true,
  })

  const toggle = (key: string) => setChecked((prev) => ({ ...prev, [key]: !prev[key] }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="max-w-[900px] space-y-6"
    >
      <AdminPageHeader
        title="Roller ve İzinler"
        description="Kullanıcı rollerini ve erişim izinlerini yönetin"
        action={
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--admin-accent)] hover:bg-[var(--admin-accent-hover)] text-white font-semibold text-sm rounded-lg transition-colors"
          >
            <Plus size={15} />
            Yeni Rol
          </button>
        }
      />

      <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--admin-border)]">
              {["Rol Adı", "Kullanıcı", "İzin Özeti", "İşlemler"].map((h) => (
                <th key={h} className="text-left px-5 py-3.5 text-[10px] uppercase tracking-widest text-[var(--admin-text-muted)] font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--admin-border)]">
            {roles.map((role) => (
              <tr key={role.id} className="hover:bg-[var(--admin-hover)] transition-colors group">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck size={16} className="text-[var(--admin-accent)] shrink-0" />
                    <span className="text-[var(--admin-text-primary)] font-semibold">{role.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--admin-info)]/15 text-[var(--admin-info)] border border-[var(--admin-info)]/30">
                    {role.count} kullanıcı
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.map((p) => (
                      <span key={p} className="text-[10px] px-2 py-0.5 rounded bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] text-[var(--admin-text-muted)]">
                        {p}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setShowModal(true)}
                      className="p-1.5 rounded text-[var(--admin-text-muted)] hover:text-[var(--admin-accent)] hover:bg-[var(--admin-accent)]/10 transition-colors"
                    >
                      <Edit2 size={14} />
                    </button>
                    {role.id !== 1 && (
                      <button className="p-1.5 rounded text-[var(--admin-text-muted)] hover:text-[var(--admin-danger)] hover:bg-[var(--admin-danger)]/10 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Permission edit modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setShowModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-2xl w-full max-w-xl max-h-[85vh] flex flex-col shadow-2xl">
                <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--admin-border)]">
                  <h3 className="text-base font-semibold text-[var(--admin-text-primary)]" style={{ fontFamily: "var(--font-syne)" }}>
                    Rol Düzenle: Editor
                  </h3>
                  <button onClick={() => setShowModal(false)} className="p-1.5 rounded-md text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] hover:bg-[var(--admin-hover)] transition-colors">
                    <X size={16} />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-5">
                  <div>
                    <label className="block text-xs font-medium text-[var(--admin-text-muted)] uppercase tracking-wide mb-1.5">Rol Adı</label>
                    <input type="text" defaultValue="Editor" className={inputCls} />
                  </div>
                  {permissionGroups.map((group) => (
                    <div key={group.group}>
                      <p className="text-xs font-semibold text-[var(--admin-text-muted)] uppercase tracking-wide mb-2">{group.group}</p>
                      <div className="bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-lg divide-y divide-[var(--admin-border)]">
                        {group.perms.map((perm) => (
                          <label key={perm.key} className="flex items-center justify-between px-4 py-2.5 cursor-pointer hover:bg-[var(--admin-hover)] transition-colors">
                            <span className="text-sm text-[var(--admin-text-primary)]">{perm.label}</span>
                            <input
                              type="checkbox"
                              checked={!!checked[perm.key]}
                              onChange={() => toggle(perm.key)}
                              className="w-4 h-4 accent-[var(--admin-accent)] rounded"
                            />
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-6 py-4 border-t border-[var(--admin-border)] flex gap-3">
                  <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-lg border border-[var(--admin-border)] text-sm text-[var(--admin-text-muted)] hover:bg-[var(--admin-hover)] transition-colors">
                    İptal
                  </button>
                  <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-lg bg-[var(--admin-accent)] hover:bg-[var(--admin-accent-hover)] text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2">
                    <Check size={14} />
                    Kaydet
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
