'use client'

import { useState } from 'react'
import { Phone, Clock, Instagram, Facebook, Twitter, Linkedin, Youtube, Tag, Star, Truck, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/webtasarimevi' },
  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com/webtasarimevi' },
  { icon: Twitter, label: 'Twitter / X', href: 'https://twitter.com/webtasarimevi' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/company/webtasarimevi' },
  { icon: Youtube, label: 'YouTube', href: 'https://youtube.com/@webtasarimevi' },
]

const announcements = [
  { icon: Tag, text: 'Tüm ürünlerde kurulum desteği dahil', color: '#FF6B35' },
  { icon: Star, text: '4.8★ müşteri memnuniyeti — 200+ tamamlanan proje', color: '#F59E0B' },
  { icon: Truck, text: '24 saat içinde kurulum garantisi', color: '#10B981' },
  { icon: ShieldCheck, text: 'Tüm ürünlerde 3 ay teknik destek', color: '#3B82F6' },
]

export default function TopBar() {
  const [announcementIdx] = useState(0)
  const ann = announcements[announcementIdx % announcements.length]
  const AnnIcon = ann.icon

  return (
    <div className="bg-[#1A1A2E] text-white">
      {/* Announcement strip */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-8 flex items-center justify-center gap-2">
          <AnnIcon size={12} aria-hidden="true" style={{ color: ann.color }} />
          <p className="text-[12px] text-white/80 font-medium">{ann.text}</p>
          <Link
            href="/iletisim"
            className="text-[11px] font-bold text-[#FF6B35] hover:text-[#FF8C5A] transition-colors underline underline-offset-2 shrink-0"
          >
            Hemen Al &rarr;
          </Link>
        </div>
      </div>

      {/* Main top bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between h-10">
        {/* Left: Phone + Hours */}
        <div className="flex items-center gap-4 text-[12px]">
          <a
            href="tel:08503033132"
            className="flex items-center gap-1.5 hover:text-[#FF6B35] transition-colors font-medium"
            aria-label="Bizi arayın: 0850 303 31 32"
          >
            <Phone size={11} aria-hidden="true" />
            <span>0850 303 31 32</span>
          </a>
          <span className="w-px h-3 bg-white/20" aria-hidden="true" />
          <span className="hidden sm:flex items-center gap-1.5 text-white/60">
            <Clock size={11} aria-hidden="true" />
            Pzt–Cum 09:00–18:00
          </span>
        </div>

        {/* Right: Socials + Language */}
        <div className="flex items-center gap-3">
          <nav className="flex items-center gap-2.5" aria-label="Sosyal medya">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-white/60 hover:text-[#FF6B35] transition-colors"
              >
                <Icon size={13} aria-hidden="true" />
              </a>
            ))}
          </nav>
          <span className="w-px h-3 bg-white/20" aria-hidden="true" />
          <span className="text-[12px] flex items-center gap-1 text-white/60">
            <span aria-hidden="true">🇹🇷</span>
            <span>TR</span>
          </span>
        </div>
      </div>
    </div>
  )
}
