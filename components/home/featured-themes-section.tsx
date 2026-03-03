'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const tabs = [
  { id: 'temalar', label: 'Temalar' },
  { id: 'eklentiler', label: 'Eklentiler' },
  { id: 'scriptler', label: 'Hazır Scriptler' },
]

type Product = {
  id: number
  name: string
  category: string
  desc: string
  gradient: string
  badge?: string
  rating: number
  reviews: number
  tab: string
}

const products: Product[] = [
  { id: 1, name: 'Lojistik Pro', category: 'Lojistik', desc: 'Nakliyat ve lojistik firmaları için tasarlandı.', gradient: 'from-blue-500 to-blue-700', badge: 'POPÜLER', rating: 4.9, reviews: 48, tab: 'temalar' },
  { id: 2, name: 'Restoran Plus', category: 'WordPress', desc: 'Restoran ve kafe işletmeleri için modern tema.', gradient: 'from-orange-400 to-red-500', badge: 'YENİ', rating: 4.8, reviews: 32, tab: 'temalar' },
  { id: 3, name: 'E-Ticaret Max', category: 'E-Ticaret', desc: 'WooCommerce entegrasyonlu güçlü e-ticaret teması.', gradient: 'from-emerald-400 to-teal-600', badge: 'POPÜLER', rating: 5.0, reviews: 74, tab: 'temalar' },
  { id: 4, name: 'Hukuk Bürosu', category: 'Kurumsal', desc: 'Hukuk büroları için güven veren profesyonel tasarım.', gradient: 'from-gray-600 to-gray-800', badge: 'YENİ', rating: 4.9, reviews: 21, tab: 'temalar' },
  { id: 5, name: 'Blog Yazarı', category: 'Blog', desc: 'Kişisel blog ve içerik üreticileri için minimal tema.', gradient: 'from-purple-400 to-purple-600', rating: 4.7, reviews: 29, tab: 'temalar' },
  { id: 6, name: 'Kurumsal Elite', category: 'Kurumsal', desc: 'Büyük ölçekli kurumsal şirketler için prestijli tasarım.', gradient: 'from-indigo-500 to-indigo-700', badge: 'POPÜLER', rating: 4.8, reviews: 56, tab: 'temalar' },
  { id: 7, name: 'SEO Power Suite', category: 'SEO', desc: 'Gelişmiş SEO, site haritası ve schema markup eklentisi.', gradient: 'from-green-500 to-emerald-600', badge: 'YENİ', rating: 4.9, reviews: 38, tab: 'eklentiler' },
  { id: 8, name: 'Hızlandırıcı Pro', category: 'Performans', desc: 'Önbellekleme, CDN ve görsel optimizasyon eklentisi.', gradient: 'from-yellow-400 to-orange-500', badge: 'POPÜLER', rating: 4.8, reviews: 61, tab: 'eklentiler' },
  { id: 9, name: 'Güvenlik Kalkanı', category: 'Güvenlik', desc: 'Firewall, spam koruması ve düzenli güvenlik tarama.', gradient: 'from-red-500 to-rose-600', rating: 5.0, reviews: 44, tab: 'eklentiler' },
  { id: 10, name: 'Form Builder Pro', category: 'Form', desc: 'Sürükle-bırak form oluşturucu, şartlı mantık desteği.', gradient: 'from-purple-400 to-indigo-500', rating: 4.7, reviews: 27, tab: 'eklentiler' },
  { id: 11, name: 'WooCommerce Plus', category: 'E-Ticaret', desc: 'Kargo, ödeme entegrasyonu ve stok yönetimi eklentisi.', gradient: 'from-teal-400 to-cyan-600', badge: 'POPÜLER', rating: 4.9, reviews: 52, tab: 'eklentiler' },
  { id: 12, name: 'Randevu Sistemi', category: 'Script', desc: 'Tam özellikli online randevu ve takvim yönetim scripti.', gradient: 'from-indigo-500 to-purple-600', badge: 'YENİ', rating: 4.8, reviews: 19, tab: 'scriptler' },
  { id: 13, name: 'İlan Platformu', category: 'Script', desc: 'Çok satıcılı ilan ve pazar yeri scripti. Google Maps dahil.', gradient: 'from-orange-500 to-red-600', badge: 'POPÜLER', rating: 4.9, reviews: 33, tab: 'scriptler' },
  { id: 14, name: 'Link Kısaltıcı', category: 'Script', desc: 'Analytics destekli URL yönetim ve QR kod üretim sistemi.', gradient: 'from-blue-400 to-blue-600', rating: 4.7, reviews: 22, tab: 'scriptler' },
  { id: 15, name: 'Üyelik Sistemi', category: 'Script', desc: 'Premium üyelik, içerik kilitleme ve abonelik scripti.', gradient: 'from-rose-400 to-pink-600', badge: 'YENİ', rating: 4.9, reviews: 15, tab: 'scriptler' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function FeaturedProductsSection() {
  const [activeTab, setActiveTab] = useState('temalar')

  const filtered = products.filter((p) => p.tab === activeTab).slice(0, 6)

  return (
    <section className="bg-white py-20" aria-labelledby="products-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header row */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <div>
            <span className="text-[#FF6B35] text-[14px] font-semibold uppercase tracking-wide">
              Öne Çıkan Ürünler
            </span>
            <h2
              id="products-heading"
              className="mt-1 text-[32px] sm:text-[36px] font-extrabold text-[#1A1A2E] text-balance"
            >
              En Çok Tercih Edilenler
            </h2>
            <p className="mt-1.5 text-[#6B7280] text-[15px]">
              Hazır ürünlerimizle projenizi hızla hayata geçirin
            </p>
          </div>
          <Link
            href="/urunler"
            className="shrink-0 text-[#FF6B35] font-semibold hover:underline focus:outline-none focus:underline text-[15px]"
          >
            Tüm Ürünleri Gör →
          </Link>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="flex gap-2 mb-8 border-b border-gray-100 pb-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          role="tablist"
          aria-label="Ürün kategorisi seçin"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 text-[14px] font-semibold border-b-2 -mb-px transition-all duration-200 focus:outline-none whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#FF6B35] text-[#FF6B35]'
                  : 'border-transparent text-[#6B7280] hover:text-[#374151]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((product) => (
              <motion.article
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-200 group"
              >
                {/* Image area */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient}`} aria-hidden="true" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Link
                      href="/urunler"
                      className="bg-white text-[#1A1A2E] px-5 py-2 rounded-lg font-semibold text-[14px] hover:bg-[#FF6B35] hover:text-white transition-colors"
                      aria-label={`${product.name} incele`}
                    >
                      İncele
                    </Link>
                  </div>
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-[#FF6B35] text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Body */}
                <div className="p-5">
                  <span className="text-[#FF6B35] text-[11px] font-bold uppercase tracking-wide">
                    {product.category}
                  </span>
                  <h3 className="text-[18px] font-bold text-[#1A1A2E] mt-0.5 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-[#6B7280] text-[13px] mb-3 line-clamp-1">{product.desc}</p>

                  <div className="flex items-center gap-1.5 mb-4">
                    <span className="text-[#FF6B35] text-[13px]" aria-hidden="true">★★★★★</span>
                    <span className="text-[13px] text-[#6B7280]">
                      {product.rating} ({product.reviews} değerlendirme)
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href="/iletisim"
                      className="flex-1 bg-[#FF6B35] text-white text-center py-2.5 rounded-lg text-[14px] font-semibold hover:bg-[#e55a2b] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                    >
                      Teklif Al
                    </Link>
                    <Link
                      href="/urunler"
                      className="flex-1 border border-gray-200 text-[#374151] text-center py-2.5 rounded-lg text-[14px] font-medium hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                    >
                      İncele
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
