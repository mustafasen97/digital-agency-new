'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SlidersHorizontal, Star, ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const allCategories = ['Tümü', 'WordPress', 'E-Ticaret', 'Blog', 'Kurumsal', 'Lojistik', 'Sağlık', 'Eğitim']
const ratings = ['Tümü', '5 Yıldız', '4+ Yıldız']

const themes = [
  { id: 1, name: 'Lojistik Pro', category: 'Lojistik', desc: 'Nakliyat ve lojistik firmaları için premium tema. Teklif formu, araç takibi, rota haritası dahil.', gradient: 'from-blue-500 to-blue-700', badge: 'POPÜLER', rating: 4.9, reviews: 48, price: 2500, oldPrice: 4000 },
  { id: 2, name: 'Restoran Plus', category: 'WordPress', desc: 'Restoran ve kafe işletmeleri için. Online rezervasyon, menü, galeri modülleri içerir.', gradient: 'from-orange-400 to-red-500', badge: 'YENİ', rating: 4.8, reviews: 32, price: 2900, oldPrice: 4500 },
  { id: 3, name: 'E-Ticaret Max', category: 'E-Ticaret', desc: 'WooCommerce entegrasyonlu güçlü e-ticaret. Çoklu ödeme, kargo entegrasyonu, stok yönetimi.', gradient: 'from-emerald-400 to-teal-600', badge: 'POPÜLER', rating: 5.0, reviews: 74, price: 3500, oldPrice: 5500 },
  { id: 4, name: 'Hukuk Bürosu', category: 'Kurumsal', desc: 'Hukuk büroları için güven veren profesyonel tasarım. Pratik iletişim formu, ekip sayfası.', gradient: 'from-gray-600 to-gray-800', badge: 'YENİ', rating: 4.9, reviews: 21, price: 2200, oldPrice: 3500 },
  { id: 5, name: 'Blog Yazarı', category: 'Blog', desc: 'Kişisel blog ve içerik üreticileri için minimal ve hızlı tema. Tam SEO uyumlu.', gradient: 'from-purple-400 to-purple-600', badge: undefined, rating: 4.7, reviews: 29, price: 1500, oldPrice: 2400 },
  { id: 6, name: 'Kurumsal Elite', category: 'Kurumsal', desc: 'Büyük ölçekli kurumsal şirketler için prestijli ve etkileyici tasarım. Çoklu dil desteği.', gradient: 'from-indigo-500 to-indigo-700', badge: 'POPÜLER', rating: 4.8, reviews: 56, price: 3200, oldPrice: 5000 },
  { id: 7, name: 'Sağlık Klinik', category: 'Sağlık', desc: 'Hastane, klinik ve doktor ofisleri için. Online randevu, doktor profilleri, hizmet sayfaları.', gradient: 'from-cyan-400 to-blue-500', badge: undefined, rating: 4.9, reviews: 17, price: 2800, oldPrice: 4200 },
  { id: 8, name: 'Eğitim LMS', category: 'Eğitim', desc: 'Online eğitim ve kurslar için LMS entegrasyonlu tema. Kurs satışı, sertifika, quiz modülleri.', gradient: 'from-yellow-400 to-orange-500', badge: 'YENİ', rating: 4.7, reviews: 14, price: 3900, oldPrice: 5800 },
  { id: 9, name: 'Emlak Pro', category: 'WordPress', desc: 'Gayrimenkul ve emlak firmaları için. Mülk listesi, harita entegrasyonu, arama filtresi.', gradient: 'from-rose-400 to-rose-600', badge: undefined, rating: 4.8, reviews: 38, price: 3100, oldPrice: 4800 },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} yıldız`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={13}
          className={s <= Math.floor(rating) ? 'fill-[#FF6B35] text-[#FF6B35]' : 'text-gray-300'}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

export default function TemaGrid() {
  const [activeCategory, setActiveCategory] = useState('Tümü')
  const [activeRating, setActiveRating] = useState('Tümü')
  const [sortBy, setSortBy] = useState('popular')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const filtered = themes
    .filter((t) => activeCategory === 'Tümü' || t.category === activeCategory)
    .filter((t) => {
      if (activeRating === '5 Yıldız') return t.rating === 5.0
      if (activeRating === '4+ Yıldız') return t.rating >= 4.0
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'rating') return b.rating - a.rating
      return b.reviews - a.reviews
    })

  return (
    <section className="py-12 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              {/* Mobile toggle */}
              <button
                className="lg:hidden w-full flex items-center justify-between p-4 font-semibold text-[#1A1A2E]"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-expanded={sidebarOpen}
              >
                <span className="flex items-center gap-2">
                  <SlidersHorizontal size={16} aria-hidden="true" />
                  Filtreler
                </span>
                {sidebarOpen ? <ChevronUp size={16} aria-hidden="true" /> : <ChevronDown size={16} aria-hidden="true" />}
              </button>

              <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block p-5 pt-0 lg:pt-5 space-y-6`}>
                {/* Category */}
                <div>
                  <h3 className="text-[13px] font-bold text-[#1A1A2E] uppercase tracking-wide mb-3">
                    Kategori
                  </h3>
                  <ul className="space-y-1" role="list">
                    {allCategories.map((cat) => (
                      <li key={cat}>
                        <button
                          onClick={() => setActiveCategory(cat)}
                          className={`w-full text-left px-3 py-1.5 rounded-lg text-[14px] transition-colors ${
                            activeCategory === cat
                              ? 'bg-[#FFF3EE] text-[#FF6B35] font-semibold'
                              : 'text-[#374151] hover:bg-gray-50'
                          }`}
                          aria-pressed={activeCategory === cat}
                        >
                          {cat}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Rating */}
                <div>
                  <h3 className="text-[13px] font-bold text-[#1A1A2E] uppercase tracking-wide mb-3">
                    Değerlendirme
                  </h3>
                  <ul className="space-y-1" role="list">
                    {ratings.map((r) => (
                      <li key={r}>
                        <button
                          onClick={() => setActiveRating(r)}
                          className={`w-full text-left px-3 py-1.5 rounded-lg text-[14px] transition-colors ${
                            activeRating === r
                              ? 'bg-[#FFF3EE] text-[#FF6B35] font-semibold'
                              : 'text-[#374151] hover:bg-gray-50'
                          }`}
                          aria-pressed={activeRating === r}
                        >
                          {r}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            {/* Top bar: count + sort */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <p className="text-[14px] text-[#6B7280]">
                <span className="font-semibold text-[#1A1A2E]">{filtered.length}</span> tema bulundu
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-[14px] text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#FF6B35] bg-white"
                aria-label="Sıralama seçin"
              >
                <option value="popular">En Popüler</option>
                <option value="rating">En Yüksek Puan</option>
                <option value="price-asc">Fiyat: Düşük → Yüksek</option>
                <option value="price-desc">Fiyat: Yüksek → Düşük</option>
              </select>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              <AnimatePresence mode="popLayout">
                {filtered.map((theme) => (
                  <motion.article
                    key={theme.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-200 group"
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient}`} aria-hidden="true" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Link href="/iletisim" className="bg-white text-[#1A1A2E] text-[13px] font-semibold px-4 py-2 rounded-lg hover:bg-[#FF6B35] hover:text-white transition-colors">
                          Önizle
                        </Link>
                      </div>
                      {theme.badge && (
                        <span className="absolute top-2 left-2 bg-[#FF6B35] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {theme.badge}
                        </span>
                      )}
                    </div>

                    <div className="p-4">
                      <span className="text-[#FF6B35] text-[11px] font-bold uppercase tracking-wide">
                        {theme.category}
                      </span>
                      <h2 className="text-[16px] font-bold text-[#1A1A2E] mt-0.5 mb-1">
                        {theme.name}
                      </h2>
                      <p className="text-[#6B7280] text-[12px] mb-2 line-clamp-2">{theme.desc}</p>

                      <div className="flex items-center gap-1.5 mb-3">
                        <StarRating rating={theme.rating} />
                        <span className="text-[12px] text-[#6B7280]">{theme.rating} ({theme.reviews})</span>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[16px] font-bold text-[#1A1A2E]">
                          ₺{theme.price.toLocaleString('tr-TR')}
                        </span>
                        <span className="text-[12px] text-[#6B7280] line-through">
                          ₺{theme.oldPrice.toLocaleString('tr-TR')}
                        </span>
                        <span className="text-[10px] font-bold text-green-700 bg-green-50 px-1.5 py-0.5 rounded-full">
                          %{Math.round((1 - theme.price / theme.oldPrice) * 100)} indirim
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <Link
                          href="/iletisim"
                          className="flex-1 bg-[#FF6B35] text-white text-center py-2 rounded-lg text-[13px] font-semibold hover:bg-[#e55a2b] transition-colors"
                        >
                          Satın Al
                        </Link>
                        <Link
                          href="/iletisim"
                          className="flex-1 border border-gray-200 text-[#374151] text-center py-2 rounded-lg text-[13px] hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors"
                        >
                          Önizle
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-[#6B7280] text-[16px]">Bu filtrelerle eşleşen tema bulunamadı.</p>
                <button
                  onClick={() => { setActiveCategory('Tümü'); setActiveRating('Tümü') }}
                  className="mt-4 text-[#FF6B35] font-semibold hover:underline"
                >
                  Filtreleri Temizle
                </button>
              </div>
            )}

            {/* Pagination */}
            {filtered.length > 0 && (
              <div className="flex justify-center gap-2 mt-10" aria-label="Sayfalama">
                {[1, 2, 3].map((p) => (
                  <button
                    key={p}
                    className={`w-9 h-9 rounded-lg text-[14px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6B35] ${
                      p === 1
                        ? 'bg-[#FF6B35] text-white'
                        : 'bg-white border border-gray-200 text-[#374151] hover:border-[#FF6B35] hover:text-[#FF6B35]'
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
