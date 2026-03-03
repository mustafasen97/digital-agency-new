"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Edit2, Trash2, UserCircle } from "lucide-react"
import AdminPageHeader from "@/components/admin/admin-page-header"
import { teamMembers } from "@/lib/admin-mock-data"

export default function TeamPage() {
  const [members, setMembers] = useState(teamMembers)

  const toggleActive = (id: number) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, active: !m.active } : m))
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="max-w-[900px] space-y-6"
    >
      <AdminPageHeader
        title="Ekip Üyeleri"
        description="Sitede gösterilen ekip üyelerini yönetin"
        action={
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--admin-accent)] hover:bg-[var(--admin-accent-hover)] text-white font-semibold text-sm rounded-lg transition-colors">
            <Plus size={15} />
            Ekip Üyesi Ekle
          </button>
        }
      />

      <div className="space-y-3">
        {members.map((member) => (
          <div
            key={member.id}
            className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl px-5 py-4 flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(37,99,235,0.08)] transition-all group"
          >
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--admin-accent)]/30 to-[var(--admin-info)]/30 flex items-center justify-center shrink-0">
              <UserCircle size={22} className="text-[var(--admin-text-muted)]" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[var(--admin-text-primary)]">{member.name}</p>
              <p className="text-xs text-[var(--admin-text-muted)] mt-0.5">{member.position}</p>
            </div>

            {/* Order badge */}
            <span className="text-xs font-mono text-[var(--admin-text-muted)] bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] px-2 py-0.5 rounded shrink-0">
              #{member.order}
            </span>

            {/* Active toggle */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-[var(--admin-text-muted)]">{member.active ? "Aktif" : "Pasif"}</span>
              <button
                onClick={() => toggleActive(member.id)}
                className={`w-10 h-5 rounded-full transition-colors relative ${
                  member.active ? "bg-[var(--admin-success)]" : "bg-[var(--admin-border)]"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow ${
                    member.active ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
              <button className="p-1.5 rounded text-[var(--admin-text-muted)] hover:text-[var(--admin-accent)] hover:bg-[var(--admin-accent)]/10 transition-colors">
                <Edit2 size={14} />
              </button>
              <button className="p-1.5 rounded text-[var(--admin-text-muted)] hover:text-[var(--admin-danger)] hover:bg-[var(--admin-danger)]/10 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
