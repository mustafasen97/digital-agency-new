"use client"

import { redirect } from "next/navigation"

export default function SettingsEmailRedirect() {
  redirect("/admin/settings")
}
