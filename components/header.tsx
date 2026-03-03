'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  Menu, X, ChevronDown, MessageCircle, Search, Map,
  Phone, Info, CreditCard, FileText, Tag, Wrench,
  Layers, BookOpen, ChevronRight, ArrowRight,
  UserCircle2, LogOut, ShieldCheck, Key,
} from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

const navItems = [
  { label: 'Ana Sayfa', href: '/' },
  {
    label: 'Ürünler',
    href: '/urunler',
    dropdown: [
      { label: 'WordPress Temaları', color: '#FF6B35', href: '/urunler?tip=Temalar', icon: Layers },
      { label: 'WordPress Eklentileri', color: '#10B981', href: '/urunler?tip=Eklentiler', icon: Wrench },
      { label: 'Hazır Scriptler', color: '#3B82F6', href: '/urunler?tip=Haz%C4%B1r+Scriptler', icon: FileText },
      { label: 'Tüm Ürünler', color: '#8B5CF6', href: '/urunler', icon: Tag },
    ],
  },
  { label: 'Araçlar', href: '/araclar' },
  { label: 'Blog', href: '/blog' },
  { label: 'İletişim', href: '/iletisim' },
]

const sitemapItems = [
  { label: 'İletişim', href: '/iletisim', icon: Phone, desc: 'Bize ulaşın' },
  { label: 'Hakkımızda', href: '/hakkimizda', icon: Info, desc: 'Bizi tanıyın' },
  { label: 'Banka Bilgileri', href: '/odeme', icon: CreditCard, desc: 'Ödeme yöntemleri' },
  { label: 'Teklif Al', href: '/iletisim', icon: FileText, desc: 'Ücretsiz fiyat teklifi' },
  { label: 'Blog', href: '/blog', icon: BookOpen, desc: 'Faydalı içerikler' },
  { label: 'Araçlar', href: '/araclar', icon: Wrench, desc: 'Ücretsiz web araçları' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [sitemapOpen, setSitemapOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [megaOpen, setMegaOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)

  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const sitemapRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const megaRef = useRef<HTMLDivElement>(null)
  const accountRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setDropdownOpen(false)
    setSitemapOpen(false)
    setSearchOpen(false)
    setMegaOpen(false)
    setAccountOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Close popups on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (sitemapRef.current && !sitemapRef.current.contains(e.target as Node)) setSitemapOpen(false)
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false)
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMegaOpen(false)
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) setAccountOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchInputRef.current?.focus(), 50)
  }, [searchOpen])

  const openDropdown = useCallback(() => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current)
    setDropdownOpen(true)
  }, [])

  const closeDropdown = useCallback(() => {
    dropdownTimer.current = setTimeout(() => setDropdownOpen(false), 120)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/urunler?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <>
      {/* Search overlay — sits below the search panel itself */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[48]" onClick={() => setSearchOpen(false)} aria-hidden="true" />
      )}

      <header
        className={`sticky top-0 z-50 bg-white border-b border-gray-200 transition-shadow duration-300 ${
          scrolled ? 'shadow-md' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[68px]">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-0.5 shrink-0 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] rounded-lg"
            aria-label="WebTasarımEvi - Ana Sayfa"
          >
            <span className="text-[#FF6B35] font-mono text-xl font-black mr-1" aria-hidden="true">{'</>'}</span>
            <span className="text-[22px] font-extrabold text-[#1A1A2E]">Web</span>
            <span className="text-[22px] font-extrabold text-[#FF6B35]">Tasarım</span>
            <span className="text-[22px] font-extrabold text-[#1A1A2E]">Evi</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Ana navigasyon">
            {navItems.map((item) =>
              item.dropdown ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={openDropdown}
                  onMouseLeave={closeDropdown}
                >
                  <button
                    className={`flex items-center gap-1 text-[15px] font-medium transition-colors focus:outline-none focus:text-[#FF6B35] ${
                      pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                        ? 'text-[#FF6B35]'
                        : 'text-[#374151] hover:text-[#FF6B35]'
                    }`}
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      aria-hidden="true"
                      className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {/* Bridge gap so hover doesn't drop when moving to panel */}
                  <div className="absolute top-full left-0 right-0 h-3 z-50" />
                  <div
                    className={`absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 transition-all duration-200 ${
                      dropdownOpen
                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 -translate-y-2 pointer-events-none'
                    }`}
                    role="menu"
                  >
                    <div className="px-3 pb-2 mb-1 border-b border-gray-100">
                      <p className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-widest">Ürünler</p>
                    </div>
                    {item.dropdown.map((sub) => {
                      const Icon = sub.icon
                      return (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          role="menuitem"
                          className="flex items-center gap-3 px-4 py-2.5 text-[14px] text-[#374151] hover:text-[#FF6B35] hover:bg-orange-50 transition-colors group"
                        >
                          <span
                            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors group-hover:bg-[#FF6B35]"
                            style={{ backgroundColor: sub.color + '22' }}
                            aria-hidden="true"
                          >
                            <Icon size={14} style={{ color: sub.color }} className="group-hover:text-white group-hover:[color:white]" />
                          </span>
                          {sub.label}
                          <ChevronRight size={12} className="ml-auto opacity-0 group-hover:opacity-100 text-[#FF6B35] transition-opacity" aria-hidden="true" />
                        </Link>
                      )
                    })}
                    <div className="mt-2 mx-3 pt-2 border-t border-gray-100">
                      <Link
                        href="/iletisim"
                        className="flex items-center justify-center gap-2 w-full py-2 bg-[#FF6B35] text-white rounded-lg text-[13px] font-semibold hover:bg-[#e55a2b] transition-colors"
                        role="menuitem"
                      >
                        <FileText size={13} aria-hidden="true" />
                        Teklif Al
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-[15px] font-medium transition-colors focus:outline-none focus:text-[#FF6B35] ${
                    pathname === item.href
                      ? 'text-[#FF6B35]'
                      : 'text-[#374151] hover:text-[#FF6B35]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Search Button */}
            <div ref={searchRef} className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Ürün ara"
                aria-expanded={searchOpen}
                className={`p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] ${
                  searchOpen ? 'bg-[#FFF3EE] text-[#FF6B35]' : 'text-[#374151] hover:bg-gray-100 hover:text-[#FF6B35]'
                }`}
              >
                <Search size={19} aria-hidden="true" />
              </button>
              {/* Search dropdown */}
              {searchOpen && (
                <div className="absolute top-[calc(100%+10px)] right-0 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 p-3 z-[50]">
                  <form onSubmit={handleSearch} role="search">
                    <div className="flex items-center gap-2 bg-[#F8F9FA] border border-gray-200 rounded-lg px-3 py-2.5 focus-within:border-[#FF6B35] focus-within:ring-2 focus-within:ring-[#FF6B35]/20">
                      <Search size={15} className="text-[#9CA3AF] shrink-0" aria-hidden="true" />
                      <input
                        ref={searchInputRef}
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Ürün ara... (örn: restoran, seo)"
                        className="flex-1 bg-transparent text-[14px] text-[#1A1A2E] placeholder:text-[#9CA3AF] focus:outline-none"
                        aria-label="Ürün arama"
                      />
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {['WordPress Tema', 'Eklenti', 'Hazır Script', 'SEO'].map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => { setSearchQuery(tag); router.push(`/urunler?q=${encodeURIComponent(tag)}`); setSearchOpen(false) }}
                          className="text-[12px] px-2.5 py-1 bg-gray-100 text-[#374151] rounded-full hover:bg-[#FFF3EE] hover:text-[#FF6B35] transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Sitemap / Quick Links */}
            <div ref={sitemapRef} className="relative">
              <button
                onClick={() => { setSitemapOpen(!sitemapOpen); setMegaOpen(false) }}
                aria-label="Hızlı bağlantılar"
                aria-expanded={sitemapOpen}
                className={`p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] ${
                  sitemapOpen ? 'bg-[#FFF3EE] text-[#FF6B35]' : 'text-[#374151] hover:bg-gray-100 hover:text-[#FF6B35]'
                }`}
              >
                <Map size={19} aria-hidden="true" />
              </button>
              {sitemapOpen && (
                <div className="absolute top-[calc(100%+10px)] right-0 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 p-3 z-50">
                  <p className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-widest px-1 mb-2">Hızlı Erişim</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {sitemapItems.map(({ label, href, icon: Icon, desc }) => (
                      <Link
                        key={label}
                        href={href}
                        onClick={() => setSitemapOpen(false)}
                        className="flex flex-col gap-0.5 p-2.5 rounded-lg hover:bg-[#FFF3EE] transition-colors group"
                      >
                        <div className="flex items-center gap-2">
                          <Icon size={14} className="text-[#FF6B35]" aria-hidden="true" />
                          <span className="text-[13px] font-semibold text-[#1A1A2E] group-hover:text-[#FF6B35] transition-colors">{label}</span>
                        </div>
                        <span className="text-[11px] text-[#9CA3AF] pl-5">{desc}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <Link
                      href="/iletisim"
                      onClick={() => setSitemapOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-[#FF6B35] to-[#e55a2b] text-white rounded-lg text-[13px] font-bold hover:opacity-90 transition-opacity"
                    >
                      <FileText size={13} aria-hidden="true" />
                      Ücretsiz Teklif Al
                      <ArrowRight size={13} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Mega Menu / Categories */}
            <div ref={megaRef} className="relative">
              <button
                onClick={() => { setMegaOpen(!megaOpen); setSitemapOpen(false) }}
                aria-label="Kategoriler ve hizmetler"
                aria-expanded={megaOpen}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[14px] font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] ${
                  megaOpen ? 'bg-[#1A1A2E] text-white' : 'bg-[#1A1A2E] text-white hover:bg-[#252540]'
                }`}
              >
                <Layers size={15} aria-hidden="true" />
                Keşfet
                <ChevronDown size={13} aria-hidden="true" className={`transition-transform duration-200 ${megaOpen ? 'rotate-180' : ''}`} />
              </button>
              {megaOpen && (
                <div className="absolute top-[calc(100%+10px)] right-0 w-[520px] bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                  <div className="bg-gradient-to-r from-[#1A1A2E] to-[#252550] px-5 py-4">
                    <p className="text-white font-bold text-[15px]">Tüm Ürün ve Hizmetler</p>
                    <p className="text-white/60 text-[12px] mt-0.5">Sektörünüze özel dijital çözümler</p>
                  </div>
                  <div className="grid grid-cols-2 gap-0 p-3">
                    <div className="pr-3 border-r border-gray-100">
                      <p className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-widest px-2 mb-2">Ürünler</p>
                      {[
                        { label: 'WordPress Temaları', href: '/urunler?tip=Temalar', color: '#FF6B35' },
                        { label: 'WordPress Eklentileri', href: '/urunler?tip=Eklentiler', color: '#10B981' },
                        { label: 'Hazır Scriptler', href: '/urunler?tip=Haz%C4%B1r+Scriptler', color: '#3B82F6' },
                        { label: 'Öne Çıkanlar', href: '/urunler', color: '#8B5CF6' },
                      ].map((l) => (
                        <Link key={l.label} href={l.href} onClick={() => setMegaOpen(false)}
                          className="flex items-center gap-2.5 px-2 py-2 rounded-lg text-[13px] text-[#374151] hover:bg-orange-50 hover:text-[#FF6B35] transition-colors group">
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: l.color }} aria-hidden="true" />
                          {l.label}
                          <ChevronRight size={11} className="ml-auto opacity-0 group-hover:opacity-100 text-[#FF6B35]" aria-hidden="true" />
                        </Link>
                      ))}
                    </div>
                    <div className="pl-3">
                      <p className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-widest px-2 mb-2">Hizmetler</p>
                      {[
                        { label: 'Web Tasarım', href: '/iletisim', color: '#F59E0B' },
                        { label: 'SEO Optimizasyonu', href: '/araclar/seo-analiz', color: '#EF4444' },
                        { label: 'E-Ticaret Kurulum', href: '/iletisim', color: '#06B6D4' },
                        { label: 'Teknik Destek', href: '/iletisim', color: '#84CC16' },
                      ].map((l) => (
                        <Link key={l.label} href={l.href} onClick={() => setMegaOpen(false)}
                          className="flex items-center gap-2.5 px-2 py-2 rounded-lg text-[13px] text-[#374151] hover:bg-orange-50 hover:text-[#FF6B35] transition-colors group">
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: l.color }} aria-hidden="true" />
                          {l.label}
                          <ChevronRight size={11} className="ml-auto opacity-0 group-hover:opacity-100 text-[#FF6B35]" aria-hidden="true" />
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 p-3 pt-0">
                    <Link href="/iletisim" onClick={() => setMegaOpen(false)}
                      className="flex items-center justify-center gap-2 py-2.5 bg-[#FF6B35] text-white rounded-lg text-[13px] font-bold hover:bg-[#e55a2b] transition-colors">
                      <FileText size={13} aria-hidden="true" />
                      Teklif Al
                    </Link>
                    <a href="https://wa.me/905000000000" target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-2.5 bg-[#25D366] text-white rounded-lg text-[13px] font-bold hover:bg-[#1fb956] transition-colors">
                      <MessageCircle size={13} aria-hidden="true" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* WhatsApp icon-only */}
            <a
              href="https://wa.me/905000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#25D366]"
              aria-label="WhatsApp ile iletişime geç"
            >
              <MessageCircle size={18} aria-hidden="true" />
            </a>

            {/* Account button */}
            <div ref={accountRef} className="relative">
              {user ? (
                <button
                  onClick={() => setAccountOpen(!accountOpen)}
                  aria-label="Hesabım"
                  aria-expanded={accountOpen}
                  className={`flex items-center gap-1.5 p-1.5 pr-2.5 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] ${
                    accountOpen ? 'bg-[#FFF3EE] text-[#FF6B35]' : 'text-[#374151] hover:bg-gray-100 hover:text-[#FF6B35]'
                  }`}
                >
                  <span className="relative">
                    <span className="w-7 h-7 rounded-full bg-[#1A1A2E] text-white text-[12px] font-bold flex items-center justify-center">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                    {!user.phoneVerified && (
                      <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-amber-400 border border-white rounded-full" aria-label="Telefon doğrulanmamış" />
                    )}
                  </span>
                  <ChevronDown size={13} aria-hidden="true" className={`transition-transform duration-200 ${accountOpen ? 'rotate-180' : ''}`} />
                </button>
              ) : (
                <Link
                  href="/giris"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[14px] font-medium text-[#374151] hover:bg-gray-100 hover:text-[#FF6B35] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                  aria-label="Giriş yap"
                >
                  <UserCircle2 size={19} aria-hidden="true" />
                  <span className="hidden xl:inline text-[13px]">Giriş Yap</span>
                </Link>
              )}

              {/* Account dropdown */}
              {accountOpen && user && (
                <div className="absolute top-[calc(100%+10px)] right-0 w-60 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                  {/* User info */}
                  <div className="px-4 py-3.5 bg-[#F8F9FA] border-b border-gray-100">
                    <p className="text-[14px] font-bold text-[#1A1A2E] truncate">{user.name}</p>
                    <p className="text-[12px] text-[#9CA3AF] truncate">{user.email}</p>
                  </div>
                  <div className="p-1.5">
                    <Link
                      href="/hesabim"
                      onClick={() => setAccountOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-medium text-[#374151] hover:bg-[#FFF3EE] hover:text-[#FF6B35] transition-colors"
                    >
                      <UserCircle2 size={15} aria-hidden="true" />
                      Hesabım
                    </Link>
                    <Link
                      href="/hesabim"
                      onClick={() => setAccountOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-medium text-[#374151] hover:bg-[#FFF3EE] hover:text-[#FF6B35] transition-colors"
                    >
                      <ShieldCheck size={15} aria-hidden="true" />
                      Lisanslarım
                    </Link>
                    <Link
                      href="/hesabim?tab=verify"
                      onClick={() => setAccountOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-medium text-[#374151] hover:bg-[#FFF3EE] hover:text-[#FF6B35] transition-colors"
                    >
                      <Key size={15} aria-hidden="true" />
                      Lisans Sorgula
                    </Link>
                  </div>
                  <div className="p-1.5 border-t border-gray-100">
                    <button
                      onClick={() => { logout(); setAccountOpen(false) }}
                      className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-[13px] font-medium text-red-600 hover:bg-red-50 transition-colors focus:outline-none"
                    >
                      <LogOut size={15} aria-hidden="true" />
                      Çıkış Yap
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Teklif Al */}
            <Link
              href="/iletisim"
              className="flex items-center gap-2 px-4 py-2 bg-[#FF6B35] text-white rounded-lg text-[13px] font-semibold hover:bg-[#e55a2b] hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
            >
              Teklif Al
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg text-[#374151] hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
            onClick={() => setMobileOpen(true)}
            aria-label="Menüyü aç"
            aria-expanded={mobileOpen}
          >
            <Menu size={24} aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 lg:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 lg:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobil menü"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-0.5" aria-label="Ana sayfa">
            <span className="text-[#FF6B35] font-mono font-black mr-1" aria-hidden="true">{'</>'}</span>
            <span className="text-[18px] font-extrabold text-[#1A1A2E]">Web</span>
            <span className="text-[18px] font-extrabold text-[#FF6B35]">Tasarım</span>
            <span className="text-[18px] font-extrabold text-[#1A1A2E]">Evi</span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
            aria-label="Menüyü kapat"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Mobile search */}
        <div className="px-4 pt-3 pb-2">
          <form onSubmit={handleSearch} role="search">
            <div className="flex items-center gap-2 bg-[#F8F9FA] border border-gray-200 rounded-lg px-3 py-2.5 focus-within:border-[#FF6B35]">
              <Search size={14} className="text-[#9CA3AF] shrink-0" aria-hidden="true" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ürün ara..."
                className="flex-1 bg-transparent text-[14px] text-[#1A1A2E] placeholder:text-[#9CA3AF] focus:outline-none"
              />
            </div>
          </form>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-1" aria-label="Mobil navigasyon">
          {navItems.map((item) => (
            <div key={item.label}>
              <Link
                href={item.href}
                className={`block px-3 py-2.5 text-[15px] font-medium rounded-lg transition-colors ${
                  pathname === item.href
                    ? 'text-[#FF6B35] bg-orange-50'
                    : 'text-[#374151] hover:text-[#FF6B35] hover:bg-orange-50'
                }`}
              >
                {item.label}
              </Link>
              {item.dropdown && (
                <div className="ml-4 mt-1 flex flex-col gap-0.5">
                  {item.dropdown.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      className="flex items-center gap-2 px-3 py-2 text-[13px] text-[#6B7280] hover:text-[#FF6B35] rounded-lg transition-colors"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: sub.color }}
                        aria-hidden="true"
                      />
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-widest px-3 mb-2">Hızlı Erişim</p>
            {sitemapItems.slice(0, 4).map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-2.5 px-3 py-2.5 text-[14px] text-[#374151] hover:text-[#FF6B35] hover:bg-orange-50 rounded-lg transition-colors"
              >
                <Icon size={14} className="text-[#FF6B35]" aria-hidden="true" />
                {label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-100 flex flex-col gap-2">
          {user ? (
            <>
              <div className="flex items-center gap-3 px-3 py-2 bg-[#F8F9FA] rounded-lg mb-1">
                <span className="w-8 h-8 rounded-full bg-[#1A1A2E] text-white text-[13px] font-bold flex items-center justify-center shrink-0">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <div className="min-w-0">
                  <p className="text-[13px] font-bold text-[#1A1A2E] truncate">{user.name}</p>
                  <p className="text-[11px] text-[#9CA3AF] truncate">{user.email}</p>
                </div>
              </div>
              <Link
                href="/hesabim"
                className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 text-[#374151] rounded-lg text-[14px] font-medium hover:bg-gray-50 transition-all"
              >
                <UserCircle2 size={15} aria-hidden="true" />
                Hesabım
              </Link>
              <button
                onClick={logout}
                className="flex items-center justify-center gap-2 py-2.5 border border-red-200 text-red-600 rounded-lg text-[14px] font-medium hover:bg-red-50 transition-all"
              >
                <LogOut size={15} aria-hidden="true" />
                Çıkış Yap
              </button>
            </>
          ) : (
            <Link
              href="/giris"
              className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 text-[#374151] rounded-lg text-[14px] font-medium hover:bg-gray-50 transition-all"
            >
              <UserCircle2 size={15} aria-hidden="true" />
              Giriş Yap / Kayıt Ol
            </Link>
          )}
          <a
            href="https://wa.me/905000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 border border-[#25D366] text-[#25D366] rounded-lg text-[14px] font-medium hover:bg-[#25D366] hover:text-white transition-all"
          >
            <MessageCircle size={15} aria-hidden="true" />
            WhatsApp
          </a>
          <Link
            href="/iletisim"
            className="flex items-center justify-center gap-2 py-2.5 bg-[#FF6B35] text-white rounded-lg text-[14px] font-semibold hover:bg-[#e55a2b] transition-all"
          >
            <FileText size={14} aria-hidden="true" />
            Teklif Al
          </Link>
        </div>
      </div>
    </>
  )
}
