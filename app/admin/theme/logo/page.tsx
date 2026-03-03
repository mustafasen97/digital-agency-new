"use client"

import { redirect } from "next/navigation"

export default function ThemeLogoRedirect() {
  redirect("/admin/theme")
}
