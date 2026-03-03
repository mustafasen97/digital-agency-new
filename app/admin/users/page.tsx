"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Search, UserCircle, ChevronDown } from "lucide-react"
import AdminPageHeader from "@/components/admin/admin-page-header"
import AdminStatusBadge from "@/components/admin/admin-status-badge"
import { users } from "@/lib/admin-mock-data"

export default function UsersPage() {
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    const matchRole = roleFilter === "all" || u.role === roleFilter
    const matchStatus = statusFilter === "all" || u.status === statusFilter
    return matchSearch && matchRole && matchStatus
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="max-w-[1100px] space-y-6"
    >
      <AdminPageHeader
        title="Kullanıcılar"
        description="Tüm kullanıcıları görüntüleyin ve yönetin"
        action={
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--admin-accent)] hover:bg-[var(--admin-accent-hover)] text-black font-semibold text-sm rounded-lg transition-colors">
            <Plus size={15} />
            Kullanıcı Ekle
          </button>
        }
      />

      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-lg px-3 py-2 text-sm w-64">
          <Search size={14} className="text-[var(--admin-text-muted)]" />
          <input
            type="text"
            placeholder="İsim veya e-posta ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-[var(--admin-text-primary)] placeholder:text-[var(--admin-text-muted)] outline-none flex-1 text-sm"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-lg px-3 py-2 text-sm text-[var(--admin-text-primary)] outline-none cursor-pointer"
        >
          <option value="all">Tüm Roller</option>
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
          <option value="Member">Üye</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-lg px-3 py-2 text-sm text-[var(--admin-text-primary)] outline-none cursor-pointer"
        >
          <option value="all">Tüm Durumlar</option>
          <option value="active">Aktif</option>
          <option value="suspended">Askıya Alındı</option>
        </select>
      </div>

      <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--admin-border)]">
              {["Kullanıcı", "E-posta", "Rol", "Kayıt Tarihi", "Son Giriş", "Durum"].map((h) => (
                <th key={h} className="text-left px-5 py-3.5 text-[10px] uppercase tracking-widest text-[var(--admin-text-muted)] font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--admin-border)]">
            {filtered.map((user) => (
              <tr key={user.id} className="hover:bg-white/5 transition-colors cursor-pointer group">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--admin-accent)]/30 to-[var(--admin-info)]/30 flex items-center justify-center shrink-0">
                      <UserCircle size={16} className="text-[var(--admin-text-muted)]" />
                    </div>
                    <span className="text-[var(--admin-text-primary)] font-medium">{user.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-[var(--admin-text-muted)] text-xs font-mono">{user.email}</td>
                <td className="px-5 py-3.5">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full border ${
                      user.role === "Admin"
                        ? "bg-[var(--admin-accent)]/15 text-[var(--admin-accent)] border-[var(--admin-accent)]/30"
                        : user.role === "Editor"
                        ? "bg-[var(--admin-info)]/15 text-[var(--admin-info)] border-[var(--admin-info)]/30"
                        : "bg-white/5 text-[var(--admin-text-muted)] border-[var(--admin-border)]"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-xs font-mono text-[var(--admin-text-muted)]">{user.registered}</td>
                <td className="px-5 py-3.5 text-xs font-mono text-[var(--admin-text-muted)]">{user.lastLogin}</td>
                <td className="px-5 py-3.5">
                  <AdminStatusBadge status={user.status as any} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-5 py-3 border-t border-[var(--admin-border)]">
          <p className="text-xs text-[var(--admin-text-muted)]">{filtered.length} kullanıcı</p>
        </div>
      </div>
    </motion.div>
  )
}
