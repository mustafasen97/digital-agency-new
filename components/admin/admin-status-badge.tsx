import { cn } from "@/lib/utils"

type Status = "published" | "draft" | "archived" | "active" | "suspended" | "read" | "unread"

const statusConfig: Record<Status, { label: string; className: string }> = {
  published: {
    label: "Yayında",
    className: "bg-[var(--admin-success)]/15 text-[var(--admin-success)] border-[var(--admin-success)]/30",
  },
  draft: {
    label: "Taslak",
    className: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  },
  archived: {
    label: "Arşivlendi",
    className: "bg-[var(--admin-text-muted)]/15 text-[var(--admin-text-muted)] border-[var(--admin-text-muted)]/30",
  },
  active: {
    label: "Aktif",
    className: "bg-[var(--admin-success)]/15 text-[var(--admin-success)] border-[var(--admin-success)]/30",
  },
  suspended: {
    label: "Askıya Alındı",
    className: "bg-[var(--admin-danger)]/15 text-[var(--admin-danger)] border-[var(--admin-danger)]/30",
  },
  read: {
    label: "Okundu",
    className: "bg-[var(--admin-text-muted)]/15 text-[var(--admin-text-muted)] border-[var(--admin-text-muted)]/30",
  },
  unread: {
    label: "Okunmadı",
    className: "bg-[var(--admin-accent)]/15 text-[var(--admin-accent)] border-[var(--admin-accent)]/30",
  },
}

export default function AdminStatusBadge({ status }: { status: Status }) {
  const config = statusConfig[status]
  return (
    <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full border", config.className)}>
      {config.label}
    </span>
  )
}
