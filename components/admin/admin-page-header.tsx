import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface AdminPageHeaderProps {
  title: string
  description?: string
  backHref?: string
  action?: React.ReactNode
  className?: string
}

export default function AdminPageHeader({
  title,
  description,
  backHref,
  action,
  className,
}: AdminPageHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4 mb-6", className)}>
      <div className="flex items-start gap-3">
        {backHref && (
          <Link
            href={backHref}
            className="mt-0.5 p-1.5 rounded-md text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] hover:bg-white/5 transition-colors"
            aria-label="Geri dön"
          >
            <ArrowLeft size={16} />
          </Link>
        )}
        <div>
          <h1
            className="text-xl font-bold text-[var(--admin-text-primary)]"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {title}
          </h1>
          {description && (
            <p className="text-sm text-[var(--admin-text-muted)] mt-0.5">{description}</p>
          )}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
