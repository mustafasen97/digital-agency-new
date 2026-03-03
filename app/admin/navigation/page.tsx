"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash2, GripVertical, ChevronDown, ChevronRight, Save, ExternalLink } from "lucide-react"
import AdminPageHeader from "@/components/admin/admin-page-header"

interface MenuItem {
  id: number
  label: string
  url: string
  newTab: boolean
  children: Omit<MenuItem, "children">[]
  open?: boolean
}

const initialMenu: MenuItem[] = [
  { id: 1, label: "Ana Sayfa", url: "/", newTab: false, children: [] },
  {
    id: 2,
    label: "Hizmetler",
    url: "/hizmetler",
    newTab: false,
    open: true,
    children: [
      { id: 21, label: "Web Tasarım", url: "/hizmetler/web-tasarim", newTab: false },
      { id: 22, label: "SEO Optimizasyonu", url: "/hizmetler/seo", newTab: false },
    ],
  },
  { id: 3, label: "Portfolio", url: "/portfolio", newTab: false, children: [] },
  { id: 4, label: "Blog", url: "/blog", newTab: false, children: [] },
  { id: 5, label: "İletişim", url: "/iletisim", newTab: false, children: [] },
]

const inputCls =
  "bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-lg px-3 py-2 text-sm text-[var(--admin-text-primary)] placeholder:text-[var(--admin-text-muted)]/50 outline-none focus:border-[var(--admin-accent)] transition-colors"

export default function NavigationPage() {
  const [menu, setMenu] = useState<MenuItem[]>(initialMenu)

  const toggleItem = (id: number) =>
    setMenu((prev) => prev.map((item) => (item.id === id ? { ...item, open: !item.open } : item)))

  const removeItem = (id: number) =>
    setMenu((prev) => prev.filter((item) => item.id !== id).map((item) => ({
      ...item,
      children: item.children.filter((c) => c.id !== id),
    })))

  const removeChild = (parentId: number, childId: number) =>
    setMenu((prev) => prev.map((item) =>
      item.id === parentId ? { ...item, children: item.children.filter((c) => c.id !== childId) } : item
    ))

  const addItem = () =>
    setMenu((prev) => [...prev, { id: Date.now(), label: "Yeni Menü Öğesi", url: "/", newTab: false, children: [] }])

  const addChild = (parentId: number) =>
    setMenu((prev) => prev.map((item) =>
      item.id === parentId
        ? { ...item, open: true, children: [...item.children, { id: Date.now(), label: "Alt Menü", url: "/", newTab: false }] }
        : item
    ))

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="max-w-[860px] space-y-6"
    >
      <AdminPageHeader
        title="Navigasyon Menüsü"
        description="Sürükle-bırak ile menü öğelerini düzenleyin"
        action={
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--admin-accent)] hover:bg-[var(--admin-accent-hover)] text-black font-semibold text-sm rounded-lg transition-colors">
            <Save size={14} />
            Kaydet
          </button>
        }
      />

      <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[var(--admin-border)] flex items-center justify-between">
          <p className="text-sm font-medium text-[var(--admin-text-primary)]">{menu.length} menü öğesi</p>
          <button
            onClick={addItem}
            className="flex items-center gap-1.5 text-xs text-[var(--admin-accent)] hover:text-[var(--admin-accent-hover)] transition-colors font-medium"
          >
            <Plus size={13} />
            Öğe Ekle
          </button>
        </div>

        <div className="p-4 space-y-2">
          {menu.map((item) => (
            <div key={item.id}>
              {/* Parent item */}
              <div className="bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] rounded-lg">
                <div className="flex items-center gap-2 p-3">
                  <GripVertical size={16} className="text-[var(--admin-text-muted)] cursor-grab shrink-0" />
                  {item.children.length > 0 && (
                    <button onClick={() => toggleItem(item.id)} className="text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] transition-colors shrink-0">
                      {item.open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </button>
                  )}
                  <input
                    type="text"
                    defaultValue={item.label}
                    className={`${inputCls} flex-1`}
                  />
                  <input
                    type="text"
                    defaultValue={item.url}
                    className={`${inputCls} w-40 font-mono text-xs text-[var(--admin-accent)]`}
                  />
                  <label className="flex items-center gap-1.5 text-xs text-[var(--admin-text-muted)] cursor-pointer shrink-0">
                    <input type="checkbox" defaultChecked={item.newTab} className="accent-[var(--admin-accent)] rounded" />
                    <ExternalLink size={12} />
                  </label>
                  <button
                    onClick={() => addChild(item.id)}
                    className="p-1.5 rounded text-[var(--admin-text-muted)] hover:text-[var(--admin-accent)] hover:bg-[var(--admin-accent)]/10 transition-colors shrink-0"
                    title="Alt menü ekle"
                  >
                    <Plus size={13} />
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 rounded text-[var(--admin-text-muted)] hover:text-[var(--admin-danger)] hover:bg-[var(--admin-danger)]/10 transition-colors shrink-0"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>

                {/* Children */}
                <AnimatePresence>
                  {item.open && item.children.length > 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="overflow-hidden border-t border-[var(--admin-border)]"
                    >
                      <div className="pl-8 pr-3 py-2 space-y-2">
                        {item.children.map((child) => (
                          <div key={child.id} className="flex items-center gap-2 bg-[var(--admin-bg-primary)] border border-[var(--admin-border)] rounded-lg p-2.5">
                            <GripVertical size={14} className="text-[var(--admin-text-muted)] cursor-grab shrink-0" />
                            <input
                              type="text"
                              defaultValue={child.label}
                              className={`${inputCls} flex-1 text-xs py-1.5`}
                            />
                            <input
                              type="text"
                              defaultValue={child.url}
                              className={`${inputCls} w-36 font-mono text-[10px] py-1.5 text-[var(--admin-accent)]`}
                            />
                            <button
                              onClick={() => removeChild(item.id, child.id)}
                              className="p-1 rounded text-[var(--admin-text-muted)] hover:text-[var(--admin-danger)] hover:bg-[var(--admin-danger)]/10 transition-colors shrink-0"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile accent color */}
      <div className="bg-[var(--admin-bg-card)] border border-[var(--admin-border)] rounded-xl p-6">
        <h2 className="text-sm font-semibold text-[var(--admin-text-primary)] mb-4" style={{ fontFamily: "var(--font-syne)" }}>
          Mobil Menü
        </h2>
        <div>
          <label className="block text-xs font-medium text-[var(--admin-text-muted)] uppercase tracking-wide mb-1.5">Vurgu Rengi</label>
          <div className="flex items-center gap-3">
            <input type="color" defaultValue="#F59E0B" className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-[var(--admin-border)]" />
            <input type="text" defaultValue="#F59E0B" className={`${inputCls} font-mono w-32`} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
