"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, Reply, Trash2, CheckCheck, Mail, MailOpen } from "lucide-react"
import AdminPageHeader from "@/components/admin/admin-page-header"
import { inboxMessages } from "@/lib/admin-mock-data"

type Message = typeof inboxMessages[0]

export default function ContactPage() {
  const [messages, setMessages] = useState(inboxMessages)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selected, setSelected] = useState<Message | null>(null)

  const filtered = messages.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "all" || m.status === statusFilter
    return matchSearch && matchStatus
  })

  const markRead = (id: number) =>
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status: "read" } : m)))

  const deleteMsg = (id: number) => {
    setMessages((prev) => prev.filter((m) => m.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  const unreadCount = messages.filter((m) => m.status === "unread").length

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="max-w-[1200px] space-y-6"
    >
      <AdminPageHeader
        title="Gelen Kutusu"
        description={`${unreadCount} okunmamış mesaj`}
      />

      <div className="flex gap-4">
        {/* Message list */}
        <div className="flex-1 bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl overflow-hidden flex flex-col">
          {/* Filters */}
          <div className="flex items-center gap-3 p-4 border-b border-[var(--admin-border)]">
            <div className="flex items-center gap-2 bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-lg px-3 py-1.5 text-sm flex-1 max-w-xs">
              <Search size={13} className="text-[var(--admin-text-muted)]" />
              <input
                type="text"
                placeholder="Mesaj ara..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent text-[var(--admin-text-primary)] placeholder:text-[var(--admin-text-muted)] outline-none flex-1 text-xs"
              />
            </div>
            <div className="flex rounded-lg overflow-hidden border border-[var(--admin-border)]">
              {[
                { key: "all", label: "Tümü" },
                { key: "unread", label: "Okunmadı" },
                { key: "read", label: "Okundu" },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setStatusFilter(f.key)}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                    statusFilter === f.key
                      ? "bg-[var(--admin-accent)] text-black"
                      : "text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] hover:bg-white/5"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 divide-y divide-[var(--admin-border)] overflow-y-auto">
            {filtered.map((msg) => (
              <div
                key={msg.id}
                onClick={() => { setSelected(msg); markRead(msg.id) }}
                className={`flex items-start gap-3 px-4 py-3.5 cursor-pointer transition-colors hover:bg-white/5 ${
                  selected?.id === msg.id ? "bg-white/5" : ""
                } ${msg.status === "unread" ? "border-l-2 border-[var(--admin-accent)]" : "border-l-2 border-transparent"}`}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--admin-accent)]/20 to-[var(--admin-info)]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-[var(--admin-text-muted)]">
                    {msg.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-sm ${msg.status === "unread" ? "text-[var(--admin-text-primary)] font-semibold" : "text-[var(--admin-text-muted)]"}`}>
                      {msg.name}
                    </span>
                    <span className="text-[10px] text-[var(--admin-text-muted)] shrink-0">{msg.date.split(" ")[1]}</span>
                  </div>
                  <p className={`text-xs mt-0.5 truncate ${msg.status === "unread" ? "text-[var(--admin-text-primary)]" : "text-[var(--admin-text-muted)]"}`}>
                    {msg.subject}
                  </p>
                  <span className="text-[10px] text-[var(--admin-accent)] mt-0.5 block">{msg.service}</span>
                </div>
                {msg.status === "unread" && (
                  <div className="w-2 h-2 rounded-full bg-[var(--admin-accent)] shrink-0 mt-2" />
                )}
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="py-16 text-center">
                <Mail size={32} className="mx-auto mb-3 text-[var(--admin-text-muted)] opacity-30" />
                <p className="text-sm text-[var(--admin-text-muted)]">Mesaj bulunamadı</p>
              </div>
            )}
          </div>
        </div>

        {/* Message detail panel */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.15 }}
              className="w-[380px] shrink-0 bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl flex flex-col"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--admin-border)]">
                <h3 className="text-sm font-semibold text-[var(--admin-text-primary)]" style={{ fontFamily: "var(--font-syne)" }}>
                  Mesaj Detayı
                </h3>
                <button
                  onClick={() => setSelected(null)}
                  className="p-1.5 rounded-md text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] hover:bg-white/5 transition-colors"
                >
                  <X size={15} />
                </button>
              </div>

              <div className="flex-1 p-5 overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--admin-accent)]/20 to-[var(--admin-info)]/20 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-[var(--admin-text-muted)]">
                        {selected.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--admin-text-primary)]">{selected.name}</p>
                      <p className="text-xs text-[var(--admin-text-muted)] font-mono">{selected.email}</p>
                    </div>
                  </div>

                  <div className="bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-lg p-3 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-[var(--admin-text-muted)]">Konu:</span>
                      <span className="text-[var(--admin-text-primary)] font-medium">{selected.subject}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[var(--admin-text-muted)]">Hizmet:</span>
                      <span className="text-[var(--admin-accent)]">{selected.service}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[var(--admin-text-muted)]">Tarih:</span>
                      <span className="text-[var(--admin-text-muted)] font-mono">{selected.date}</span>
                    </div>
                  </div>

                  <div className="bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-lg p-4">
                    <p className="text-sm text-[var(--admin-text-muted)] leading-relaxed">
                      Merhaba,
                      {"\n\n"}
                      {selected.subject} konusunda bilgi almak istiyorum. Hizmetleriniz hakkında detaylı bir görüşme yapabilir miyiz?
                      {"\n\n"}
                      Teşekkürler,
                      {"\n"}
                      {selected.name}
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-5 py-4 border-t border-[var(--admin-border)] flex items-center gap-2">
                <a
                  href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                  className="flex items-center gap-2 flex-1 justify-center px-4 py-2 bg-[var(--admin-accent)] hover:bg-[var(--admin-accent-hover)] text-black text-xs font-semibold rounded-lg transition-colors"
                >
                  <Reply size={13} />
                  Yanıtla
                </a>
                <button
                  onClick={() => markRead(selected.id)}
                  className="p-2 rounded-lg border border-[var(--admin-border)] text-[var(--admin-text-muted)] hover:text-[var(--admin-success)] hover:border-[var(--admin-success)]/50 transition-colors"
                  title="Okundu olarak işaretle"
                >
                  <CheckCheck size={14} />
                </button>
                <button
                  onClick={() => deleteMsg(selected.id)}
                  className="p-2 rounded-lg border border-[var(--admin-border)] text-[var(--admin-text-muted)] hover:text-[var(--admin-danger)] hover:border-[var(--admin-danger)]/50 transition-colors"
                  title="Sil"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
