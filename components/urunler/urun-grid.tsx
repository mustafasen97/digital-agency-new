'use client'

import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  SlidersHorizontal, Star, ChevronDown, ChevronUp,
  Search, X, Check, Zap, TrendingUp, Package, Grid3x3,
  MessageCircle, FileText, Eye, ArrowUpRight,
} from 'lucide-react'

const productTypes = ['Tümü', 'Temalar', 'Eklentiler', 'Hazır Scriptler']

const allCategories: Record<string, string[]> = {
  'Tümü': ['Tümü', 'WordPress', 'E-Ticaret', 'Blog', 'Kurumsal', 'Lojistik', 'Sağlık', 'Eğitim', 'SEO', 'Performans', 'Güvenlik', 'Form', 'Script'],
  'Temalar': ['Tümü', 'WordPress', 'E-Ticaret', 'Blog', 'Kurumsal', 'Lojistik', 'Sağlık', 'Eğitim'],
  'Eklentiler': ['Tümü', 'SEO', 'Performans', 'Güvenlik', 'Form', 'E-Ticaret'],
  'Hazır Scriptler': ['Tümü', 'Script'],
}

const ratings = ['Tümü', '5 Yıldız', '4+ Yıldız']

type Product = {
  id: number
  name: string
  type: 'Temalar' | 'Eklentiler' | 'Hazır Scriptler'
  category: string
  desc: string
  gradient: string
  accentColor: string
  badge?: string
  badgeColor?: string
  rating: number
  reviews: number
  featured?: boolean
  features: string[]
}

const products: Product[] = [
  { id: 1, name: 'Lojistik Pro', type: 'Temalar', category: 'Lojistik', desc: 'Nakliyat ve lojistik firmaları için premium tema. Teklif formu, araç takibi, rota haritası dahil.', gradient: 'from-blue-500 via-blue-600 to-blue-800', accentColor: '#3B82F6', badge: 'POPÜLER', badgeColor: '#3B82F6', rating: 4.9, reviews: 48, featured: true, features: ['Araç Takibi', 'Teklif Formu', 'Rota Haritası'] },
  { id: 2, name: 'Restoran Plus', type: 'Temalar', category: 'WordPress', desc: 'Restoran ve kafe işletmeleri için. Online rezervasyon, menü, galeri modülleri içerir.', gradient: 'from-orange-400 via-orange-500 to-red-600', accentColor: '#F97316', badge: 'YENİ', badgeColor: '#10B981', rating: 4.8, reviews: 32, features: ['Online Rezervasyon', 'Dijital Menü', 'Galeri'] },
  { id: 3, name: 'E-Ticaret Max', type: 'Temalar', category: 'E-Ticaret', desc: 'WooCommerce entegrasyonlu güçlü e-ticaret. Çoklu ödeme, kargo entegrasyonu, stok yönetimi.', gradient: 'from-emerald-400 via-teal-500 to-teal-700', accentColor: '#10B981', badge: 'POPÜLER', badgeColor: '#3B82F6', rating: 5.0, reviews: 74, featured: true, features: ['WooCommerce', 'Çoklu Ödeme', 'Stok Yönetimi'] },
  { id: 4, name: 'Hukuk Bürosu', type: 'Temalar', category: 'Kurumsal', desc: 'Hukuk büroları için güven veren profesyonel tasarım. Pratik iletişim formu, ekip sayfası.', gradient: 'from-slate-500 via-gray-600 to-gray-800', accentColor: '#64748B', badge: 'YENİ', badgeColor: '#10B981', rating: 4.9, reviews: 21, features: ['Profesyonel Tasarım', 'İletişim Formu', 'Ekip Sayfası'] },
  { id: 5, name: 'Blog Yazarı', type: 'Temalar', category: 'Blog', desc: 'Kişisel blog ve içerik üreticileri için minimal ve hızlı tema. Tam SEO uyumlu.', gradient: 'from-purple-400 via-purple-500 to-purple-700', accentColor: '#A855F7', rating: 4.7, reviews: 29, features: ['Minimal Tasarım', 'SEO Uyumlu', 'Hızlı Yükleme'] },
  { id: 6, name: 'Kurumsal Elite', type: 'Temalar', category: 'Kurumsal', desc: 'Büyük ölçekli kurumsal şirketler için prestijli ve etkileyici tasarım. Çoklu dil desteği.', gradient: 'from-indigo-500 via-indigo-600 to-indigo-800', accentColor: '#6366F1', badge: 'POPÜLER', badgeColor: '#3B82F6', rating: 4.8, reviews: 56, featured: true, features: ['Çoklu Dil', 'Animasyonlar', 'Premium Tasarım'] },
  { id: 7, name: 'Sağlık Klinik', type: 'Temalar', category: 'Sağlık', desc: 'Hastane, klinik ve doktor ofisleri için. Online randevu, doktor profilleri, hizmet sayfaları.', gradient: 'from-cyan-400 via-cyan-500 to-blue-600', accentColor: '#06B6D4', rating: 4.9, reviews: 17, features: ['Online Randevu', 'Doktor Profili', 'Hizmet Sayfası'] },
  { id: 8, name: 'Eğitim LMS', type: 'Temalar', category: 'Eğitim', desc: 'Online eğitim ve kurslar için LMS entegrasyonlu tema. Kurs satışı, sertifika, quiz modülleri.', gradient: 'from-yellow-400 via-amber-500 to-orange-500', accentColor: '#F59E0B', badge: 'YENİ', badgeColor: '#10B981', rating: 4.7, reviews: 14, features: ['LMS Entegrasyonu', 'Kurs Satışı', 'Sertifika'] },
  { id: 9, name: 'Emlak Pro', type: 'Temalar', category: 'WordPress', desc: 'Gayrimenkul ve emlak firmaları için. Mülk listesi, harita entegrasyonu, arama filtresi.', gradient: 'from-rose-400 via-rose-500 to-rose-700', accentColor: '#F43F5E', rating: 4.8, reviews: 38, features: ['Mülk Listesi', 'Harita', 'Gelişmiş Filtre'] },
  { id: 10, name: 'SEO Power Suite', type: 'Eklentiler', category: 'SEO', desc: 'Gelişmiş SEO, site haritası ve schema markup eklentisi. Yoast uyumlu.', gradient: 'from-green-500 via-emerald-500 to-emerald-700', accentColor: '#22C55E', badge: 'YENİ', badgeColor: '#10B981', rating: 4.9, reviews: 38, features: ['Schema Markup', 'Sitemap', 'Yoast Uyumlu'] },
  { id: 11, name: 'Hızlandırıcı Pro', type: 'Eklentiler', category: 'Performans', desc: 'Önbellekleme, CDN ve görsel optimizasyon eklentisi. Core Web Vitals uyumlu.', gradient: 'from-yellow-400 via-amber-400 to-orange-500', accentColor: '#F59E0B', badge: 'POPÜLER', badgeColor: '#3B82F6', rating: 4.8, reviews: 61, features: ['Önbellekleme', 'CDN Desteği', 'Core Web Vitals'] },
  { id: 12, name: 'Güvenlik Kalkanı', type: 'Eklentiler', category: 'Güvenlik', desc: 'Firewall, spam koruması ve düzenli güvenlik tarama. 7/24 izleme.', gradient: 'from-red-500 via-red-500 to-rose-700', accentColor: '#EF4444', rating: 5.0, reviews: 44, features: ['Firewall', 'Spam Koruması', '7/24 İzleme'] },
  { id: 13, name: 'Form Builder Pro', type: 'Eklentiler', category: 'Form', desc: 'Sürükle-bırak form oluşturucu, şartlı mantık, çoklu entegrasyon desteği.', gradient: 'from-purple-400 via-violet-500 to-indigo-600', accentColor: '#8B5CF6', rating: 4.7, reviews: 27, features: ['Sürükle & Bırak', 'Şartlı Mantık', 'Entegrasyonlar'] },
  { id: 14, name: 'WooCommerce Plus', type: 'Eklentiler', category: 'E-Ticaret', desc: 'Kargo entegrasyonu, ödeme yönetimi ve gelişmiş stok takibi eklentisi.', gradient: 'from-teal-400 via-teal-500 to-cyan-700', accentColor: '#14B8A6', badge: 'POPÜLER', badgeColor: '#3B82F6', rating: 4.9, reviews: 52, features: ['Kargo Entegrasyonu', 'Ödeme Yönetimi', 'Stok Takibi'] },
  { id: 15, name: 'Randevu Sistemi', type: 'Hazır Scriptler', category: 'Script', desc: 'Tam özellikli online randevu ve takvim yönetim scripti. Google Takvim entegrasyonu.', gradient: 'from-indigo-500 via-violet-500 to-purple-700', accentColor: '#6366F1', badge: 'YENİ', badgeColor: '#10B981', rating: 4.8, reviews: 19, features: ['Google Takvim', 'SMS Bildirimi', 'Çoklu Kullanıcı'] },
  { id: 16, name: 'İlan Platformu', type: 'Hazır Scriptler', category: 'Script', desc: 'Çok satıcılı ilan ve pazar yeri scripti. Google Maps dahil, ödeme entegrasyonu mevcut.', gradient: 'from-orange-500 via-orange-500 to-red-600', accentColor: '#F97316', badge: 'POPÜLER', badgeColor: '#3B82F6', rating: 4.9, reviews: 33, features: ['Çok Satıcı', 'Google Maps', 'Ödeme Entegrasyonu'] },
  { id: 17, name: 'Link Kısaltıcı', type: 'Hazır Scriptler', category: 'Script', desc: 'Analytics destekli URL yönetim ve QR kod üretim sistemi.', gradient: 'from-blue-400 via-blue-500 to-blue-700', accentColor: '#3B82F6', rating: 4.7, reviews: 22, features: ['Analytics', 'QR Kod', 'URL Yönetimi'] },
  { id: 18, name: 'Üyelik Sistemi', type: 'Hazır Scriptler', category: 'Script', desc: 'Premium üyelik, içerik kilitleme ve abonelik yönetim scripti.', gradient: 'from-rose-400 via-pink-500 to-pink-700', accentColor: '#EC4899', badge: 'YENİ', badgeColor: '#10B981', rating: 4.9, reviews: 15, features: ['Üyelik Planları', 'İçerik Kilitleme', 'Abonelik'] },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} yıldız`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={11}
          className={s <= Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

const typeIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  'Tümü': Grid3x3,
  'Temalar': Package,
  'Eklentiler': Zap,
  'Hazır Scriptler': TrendingUp,
}

export default function UrunGrid() {
  const searchParams = useSearchParams()

  const [activeType, setActiveType] = useState(() => searchParams.get('tip') || 'Tümü')
  const [activeCategory, setActiveCategory] = useState('Tümü')
  const [activeRating, setActiveRating] = useState('Tümü')
  const [sortBy, setSortBy] = useState('popular')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get('q') || '')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Sync URL params
  useEffect(() => {
    const tip = searchParams.get('tip')
    const q = searchParams.get('q')
    if (tip && productTypes.includes(tip)) { setActiveType(tip); setActiveCategory('Tümü') }
    if (q) setSearchQuery(q)
  }, [searchParams])

  const handleTypeChange = useCallback((type: string) => {
    setActiveType(type)
    setActiveCategory('Tümü')
  }, [])

  const categories = allCategories[activeType] || allCategories['Tümü']

  const filtered = products
    .filter((p) => activeType === 'Tümü' || p.type === activeType)
    .filter((p) => activeCategory === 'Tümü' || p.category === activeCategory)
    .filter((p) => {
      if (activeRating === '5 Yıldız') return p.rating === 5.0
      if (activeRating === '4+ Yıldız') return p.rating >= 4.0
      return true
    })
    .filter((p) => {
      if (!searchQuery.trim()) return true
      const q = searchQuery.toLowerCase()
      return p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.type.toLowerCase().includes(q)
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'newest') return b.id - a.id
      return b.reviews - a.reviews
    })

  const featuredProducts = products.filter((p) => p.featured)

  const hasActiveFilters = activeType !== 'Tümü' || activeCategory !== 'Tümü' || activeRating !== 'Tümü' || searchQuery.trim() !== ''

  return (
    <section className="py-10 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Featured row (only on Tümü with no filters) */}
        {activeType === 'Tümü' && !searchQuery && activeCategory === 'Tümü' && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-1 h-5 rounded-full bg-[#FF6B35]" aria-hidden="true" />
                <h2 className="text-[16px] font-bold text-[#1A1A2E]">Öne Çıkan Ürünler</h2>
              </div>
              <Link href="/urunler" className="text-[13px] text-[#FF6B35] font-semibold hover:underline flex items-center gap-1">
                Tümünü Gör <ArrowUpRight size={13} aria-hidden="true" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {featuredProducts.slice(0, 3).map((p) => (
                <article
                  key={p.id}
                  className="relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  {/* Gradient preview */}
                  <div className={`h-36 bg-gradient-to-br ${p.gradient} relative overflow-hidden`}>
                    {/* Decorative circles */}
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-white/10" aria-hidden="true" />
                    <div className="absolute top-3 left-3 w-12 h-12 rounded-full bg-white/10" aria-hidden="true" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                      <div className="flex gap-2">
                        <Link href="/iletisim"
                          className="flex items-center gap-1.5 bg-white text-[#1A1A2E] px-3 py-1.5 rounded-lg text-[12px] font-bold hover:bg-[#FF6B35] hover:text-white transition-colors">
                          <FileText size={11} aria-hidden="true" /> Teklif Al
                        </Link>
                        <Link href="/iletisim"
                          className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white border border-white/40 px-3 py-1.5 rounded-lg text-[12px] font-bold hover:bg-white/40 transition-colors">
                          <Eye size={11} aria-hidden="true" /> İncele
                        </Link>
                      </div>
                    </div>
                    {p.badge && (
                      <span className="absolute top-2.5 right-2.5 text-[10px] font-black px-2 py-0.5 rounded-full text-white"
                        style={{ backgroundColor: p.badgeColor || '#FF6B35' }}>
                        {p.badge}
                      </span>
                    )}
                    <span className="absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full text-white bg-white/20 backdrop-blur-sm border border-white/30">
                      {p.type}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-[15px] font-bold text-[#1A1A2E] group-hover:text-[#FF6B35] transition-colors">{p.name}</h3>
                      <div className="flex items-center gap-1 shrink-0">
                        <StarRating rating={p.rating} />
                        <span className="text-[11px] text-[#6B7280] font-medium">{p.rating}</span>
                      </div>
                    </div>
                    <p className="text-[#6B7280] text-[12px] line-clamp-2 mb-3">{p.desc}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {p.features.map((f) => (
                        <span key={f} className="flex items-center gap-1 text-[10px] bg-gray-50 text-[#6B7280] border border-gray-100 px-2 py-0.5 rounded-full">
                          <Check size={8} className="text-[#10B981]" aria-hidden="true" /> {f}
                        </span>
                      ))}
                    </div>
                    <Link href="/iletisim"
                      className="flex items-center justify-center gap-2 w-full py-2 bg-[#FF6B35] text-white rounded-lg text-[13px] font-bold hover:bg-[#e55a2b] transition-colors">
                      <FileText size={12} aria-hidden="true" /> Teklif Al
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Top bar: search + type filters + sort */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6">
          {/* Search bar */}
          <div className="flex items-center gap-3 bg-[#F8F9FA] border border-gray-200 rounded-xl px-4 py-2.5 mb-4 focus-within:border-[#FF6B35] focus-within:ring-2 focus-within:ring-[#FF6B35]/20 transition-all">
            <Search size={16} className="text-[#9CA3AF] shrink-0" aria-hidden="true" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ürün ara... (örn: restoran, seo, randevu)"
              className="flex-1 bg-transparent text-[14px] text-[#1A1A2E] placeholder:text-[#9CA3AF] focus:outline-none"
              aria-label="Ürün arama"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-[#9CA3AF] hover:text-[#374151] transition-colors" aria-label="Aramayı temizle">
                <X size={14} aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Type pills + sort */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Ürün türü filtresi">
              {productTypes.map((type) => {
                const Icon = typeIcons[type]
                return (
                  <button
                    key={type}
                    onClick={() => handleTypeChange(type)}
                    aria-pressed={activeType === type}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] ${
                      activeType === type
                        ? 'bg-[#FF6B35] text-white shadow-md shadow-orange-200'
                        : 'bg-gray-100 text-[#374151] hover:bg-orange-50 hover:text-[#FF6B35]'
                    }`}
                  >
                    <Icon size={13} aria-hidden="true" />
                    {type}
                  </button>
                )
              })}
            </div>
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-2 text-[13px] text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#FF6B35] bg-white"
                aria-label="Sıralama seçin"
              >
                <option value="popular">En Popüler</option>
                <option value="rating">En Yüksek Puan</option>
                <option value="newest">En Yeni</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-52 shrink-0" aria-label="Filtreler">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-24">
              <button
                className="lg:hidden w-full flex items-center justify-between p-4 font-semibold text-[#1A1A2E]"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-expanded={sidebarOpen}
              >
                <span className="flex items-center gap-2">
                  <SlidersHorizontal size={15} aria-hidden="true" />
                  Filtreler
                  {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-[#FF6B35]" aria-label="Aktif filtreler var" />}
                </span>
                {sidebarOpen ? <ChevronUp size={15} aria-hidden="true" /> : <ChevronDown size={15} aria-hidden="true" />}
              </button>

              <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block p-4 pt-4 space-y-5`}>
                <div className="hidden lg:flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[13px] font-bold text-[#1A1A2E]">
                    <SlidersHorizontal size={14} aria-hidden="true" />
                    Filtreler
                  </span>
                  {hasActiveFilters && (
                    <button
                      onClick={() => { setActiveType('Tümü'); setActiveCategory('Tümü'); setActiveRating('Tümü'); setSearchQuery('') }}
                      className="text-[11px] text-[#FF6B35] font-semibold hover:underline focus:outline-none"
                    >
                      Temizle
                    </button>
                  )}
                </div>

                <div>
                  <h3 className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-2.5">Kategori</h3>
                  <ul className="space-y-0.5" role="list">
                    {categories.map((cat) => (
                      <li key={cat}>
                        <button
                          onClick={() => setActiveCategory(cat)}
                          aria-pressed={activeCategory === cat}
                          className={`w-full text-left px-3 py-1.5 rounded-lg text-[13px] transition-colors flex items-center justify-between ${
                            activeCategory === cat ? 'bg-[#FFF3EE] text-[#FF6B35] font-semibold' : 'text-[#374151] hover:bg-gray-50'
                          }`}
                        >
                          {cat}
                          {activeCategory === cat && <Check size={12} className="text-[#FF6B35]" aria-hidden="true" />}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-2.5">Değerlendirme</h3>
                  <ul className="space-y-0.5" role="list">
                    {ratings.map((r) => (
                      <li key={r}>
                        <button
                          onClick={() => setActiveRating(r)}
                          aria-pressed={activeRating === r}
                          className={`w-full text-left px-3 py-1.5 rounded-lg text-[13px] transition-colors flex items-center justify-between ${
                            activeRating === r ? 'bg-[#FFF3EE] text-[#FF6B35] font-semibold' : 'text-[#374151] hover:bg-gray-50'
                          }`}
                        >
                          {r}
                          {activeRating === r && <Check size={12} className="text-[#FF6B35]" aria-hidden="true" />}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sidebar CTA */}
                <div className="bg-gradient-to-br from-[#1A1A2E] to-[#252550] rounded-xl p-4 text-center">
                  <p className="text-white text-[12px] font-bold mb-1">Uygun ürünü bulamadınız mı?</p>
                  <p className="text-white/60 text-[11px] mb-3">Özel çözüm için bize yazın.</p>
                  <a
                    href="https://wa.me/905000000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 w-full py-2 bg-[#25D366] text-white rounded-lg text-[12px] font-bold hover:bg-[#1fb956] transition-colors"
                  >
                    <MessageCircle size={12} aria-hidden="true" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Main grid */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <p className="text-[13px] text-[#6B7280]">
                <span className="font-bold text-[#1A1A2E]">{filtered.length}</span> ürün bulundu
                {hasActiveFilters && (
                  <button
                    onClick={() => { setActiveType('Tümü'); setActiveCategory('Tümü'); setActiveRating('Tümü'); setSearchQuery('') }}
                    className="ml-2 text-[#FF6B35] hover:underline text-[12px] font-semibold focus:outline-none"
                  >
                    Filtreleri temizle
                  </button>
                )}
              </p>
              {/* View mode toggle */}
              <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-0.5">
                <button
                  onClick={() => setViewMode('grid')}
                  aria-pressed={viewMode === 'grid'}
                  aria-label="Grid görünümü"
                  className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-[#FF6B35] text-white' : 'text-[#6B7280] hover:text-[#374151]'}`}
                >
                  <Grid3x3 size={14} aria-hidden="true" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  aria-pressed={viewMode === 'list'}
                  aria-label="Liste görünümü"
                  className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-[#FF6B35] text-white' : 'text-[#6B7280] hover:text-[#374151]'}`}
                >
                  <SlidersHorizontal size={14} aria-hidden="true" />
                </button>
              </div>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((product) => (
                  <article
                    key={product.id}
                    className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col"
                  >
                    <div className={`relative h-40 bg-gradient-to-br ${product.gradient} overflow-hidden shrink-0`}>
                      {/* Decorative blobs */}
                      <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white/10" aria-hidden="true" />
                      <div className="absolute bottom-2 left-2 w-10 h-10 rounded-full bg-white/10" aria-hidden="true" />
                      {/* Product name watermark */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white/20 text-[32px] font-black tracking-tight select-none" aria-hidden="true">
                          {product.name.split(' ')[0]}
                        </span>
                      </div>
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Link href="/iletisim"
                          className="flex items-center gap-1.5 bg-white text-[#1A1A2E] px-3 py-1.5 rounded-lg text-[12px] font-bold hover:bg-[#FF6B35] hover:text-white transition-colors">
                          <FileText size={11} aria-hidden="true" /> Teklif Al
                        </Link>
                        <Link href="/iletisim"
                          className="flex items-center gap-1.5 border border-white/60 text-white px-3 py-1.5 rounded-lg text-[12px] font-bold hover:bg-white hover:text-[#1A1A2E] transition-colors">
                          <Eye size={11} aria-hidden="true" /> İncele
                        </Link>
                      </div>
                      <span className="absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full text-white bg-white/20 backdrop-blur-sm border border-white/30">
                        {product.type}
                      </span>
                      {product.badge && (
                        <span className="absolute top-2.5 right-2.5 text-[10px] font-black px-2 py-0.5 rounded-full text-white"
                          style={{ backgroundColor: product.badgeColor || '#FF6B35' }}>
                          {product.badge}
                        </span>
                      )}
                    </div>

                    <div className="p-4 flex flex-col flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: product.accentColor }}>
                            {product.category}
                          </span>
                          <h2 className="text-[15px] font-bold text-[#1A1A2E] group-hover:text-[#FF6B35] transition-colors leading-tight mt-0.5">
                            {product.name}
                          </h2>
                        </div>
                        <div className="shrink-0 flex flex-col items-end">
                          <StarRating rating={product.rating} />
                          <span className="text-[11px] text-[#6B7280] mt-0.5">{product.rating} ({product.reviews})</span>
                        </div>
                      </div>

                      <p className="text-[#6B7280] text-[12px] mb-3 line-clamp-2 leading-relaxed flex-1">{product.desc}</p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {product.features.map((f) => (
                          <span key={f} className="flex items-center gap-1 text-[10px] bg-gray-50 text-[#6B7280] border border-gray-100 px-2 py-0.5 rounded-full">
                            <Check size={8} className="text-[#10B981] shrink-0" aria-hidden="true" /> {f}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-2 mt-auto">
                        <Link
                          href="/iletisim"
                          className="flex-1 flex items-center justify-center gap-1.5 bg-[#FF6B35] text-white py-2 rounded-xl text-[12px] font-bold hover:bg-[#e55a2b] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                        >
                          <FileText size={11} aria-hidden="true" /> Teklif Al
                        </Link>
                        <Link
                          href="/iletisim"
                          className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 text-[#374151] py-2 rounded-xl text-[12px] font-medium hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                        >
                          <Eye size={11} aria-hidden="true" /> İncele
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              /* List view */
              <div className="flex flex-col gap-3">
                {filtered.map((product) => (
                  <article
                    key={product.id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-200 group flex gap-4 p-4 items-start"
                  >
                    <div className={`h-20 w-28 rounded-xl bg-gradient-to-br ${product.gradient} shrink-0 relative overflow-hidden flex items-center justify-center`}>
                      <span className="text-white/30 text-[18px] font-black select-none" aria-hidden="true">{product.name.split(' ')[0]}</span>
                      {product.badge && (
                        <span className="absolute top-1.5 right-1.5 text-[9px] font-black px-1.5 py-0.5 rounded-full text-white"
                          style={{ backgroundColor: product.badgeColor || '#FF6B35' }}>
                          {product.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: product.accentColor }}>{product.category} · {product.type}</span>
                          <h2 className="text-[15px] font-bold text-[#1A1A2E] group-hover:text-[#FF6B35] transition-colors">{product.name}</h2>
                        </div>
                        <div className="shrink-0 flex items-center gap-1.5">
                          <StarRating rating={product.rating} />
                          <span className="text-[12px] text-[#6B7280]">{product.rating}</span>
                        </div>
                      </div>
                      <p className="text-[#6B7280] text-[12px] mb-2 line-clamp-1">{product.desc}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        {product.features.map((f) => (
                          <span key={f} className="flex items-center gap-1 text-[10px] bg-gray-50 text-[#6B7280] border border-gray-100 px-2 py-0.5 rounded-full">
                            <Check size={8} className="text-[#10B981]" aria-hidden="true" /> {f}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      <Link href="/iletisim"
                        className="flex items-center gap-1.5 bg-[#FF6B35] text-white px-4 py-2 rounded-xl text-[12px] font-bold hover:bg-[#e55a2b] transition-colors whitespace-nowrap">
                        <FileText size={11} aria-hidden="true" /> Teklif Al
                      </Link>
                      <Link href="/iletisim"
                        className="flex items-center gap-1.5 border border-gray-200 text-[#374151] px-4 py-2 rounded-xl text-[12px] font-medium hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors whitespace-nowrap">
                        <Eye size={11} aria-hidden="true" /> İncele
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {filtered.length === 0 && (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                <Search size={40} className="text-gray-200 mx-auto mb-4" aria-hidden="true" />
                <p className="text-[#374151] text-[16px] font-semibold mb-1">Ürün bulunamadı</p>
                <p className="text-[#6B7280] text-[14px] mb-4">Bu arama veya filtrelerle eşleşen ürün yok.</p>
                <button
                  onClick={() => { setActiveType('Tümü'); setActiveCategory('Tümü'); setActiveRating('Tümü'); setSearchQuery('') }}
                  className="mt-1 px-5 py-2.5 bg-[#FF6B35] text-white rounded-xl font-semibold text-[14px] hover:bg-[#e55a2b] transition-colors focus:outline-none"
                >
                  Filtreleri Temizle
                </button>
              </div>
            )}

            {filtered.length > 0 && (
              <div className="flex justify-center gap-2 mt-10" aria-label="Sayfalama">
                {[1, 2, 3].map((p) => (
                  <button
                    key={p}
                    className={`w-9 h-9 rounded-xl text-[14px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6B35] ${
                      p === 1 ? 'bg-[#FF6B35] text-white shadow-md shadow-orange-200' : 'bg-white border border-gray-200 text-[#374151] hover:border-[#FF6B35] hover:text-[#FF6B35]'
                    }`}
                    aria-current={p === 1 ? 'page' : undefined}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
