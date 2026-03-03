'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const avatarColors = ['#FF6B35', '#1A1A2E', '#10B981', '#3B82F6', '#8B5CF6']
const avatarInitials = ['AK', 'MB', 'EY', 'SD', 'OT']

const tabs = [
  { id: 'temalar', label: 'Temalar' },
  { id: 'eklentiler', label: 'Eklentiler' },
  { id: 'scriptler', label: 'Hazır Scriptler' },
]

const productSlides: Record<string, { name: string; desc: string; badge?: string; gradient: string; rating: string; tag: string }[]> = {
  temalar: [
    { name: 'Lojistik Pro', desc: 'Nakliyat firmaları için premium tema', badge: 'POPÜLER', gradient: 'from-blue-500 to-blue-700', rating: '4.9', tag: 'WordPress Tema' },
    { name: 'Restoran Plus', desc: 'Kafe ve restoran işletmeleri için', badge: 'YENİ', gradient: 'from-orange-400 to-red-500', rating: '4.8', tag: 'WordPress Tema' },
    { name: 'E-Ticaret Max', desc: 'WooCommerce entegrasyonlu güçlü tema', badge: 'POPÜLER', gradient: 'from-emerald-400 to-teal-600', rating: '5.0', tag: 'E-Ticaret' },
    { name: 'Hukuk Bürosu', desc: 'Hukuk büroları için profesyonel tasarım', gradient: 'from-gray-600 to-gray-800', rating: '4.9', tag: 'Kurumsal' },
    { name: 'Sağlık Klinik', desc: 'Klinik ve hastaneler için randevu sistemi', gradient: 'from-cyan-400 to-blue-500', rating: '4.9', tag: 'Sağlık' },
  ],
  eklentiler: [
    { name: 'SEO Power Suite', desc: 'Gelişmiş SEO ve site haritası eklentisi', badge: 'YENİ', gradient: 'from-green-500 to-emerald-600', rating: '4.9', tag: 'SEO Eklenti' },
    { name: 'Hızlandırıcı Pro', desc: 'Önbellekleme ve CDN optimizasyonu', badge: 'POPÜLER', gradient: 'from-yellow-400 to-orange-500', rating: '4.8', tag: 'Performans' },
    { name: 'Güvenlik Kalkanı', desc: 'Firewall, spam ve malware koruması', gradient: 'from-red-500 to-rose-600', rating: '5.0', tag: 'Güvenlik' },
    { name: 'Form Builder Pro', desc: 'Sürükle-bırak form oluşturucu', gradient: 'from-purple-400 to-indigo-500', rating: '4.7', tag: 'Form' },
    { name: 'WooCommerce Plus', desc: 'Kargo, ödeme ve stok yönetimi', badge: 'POPÜLER', gradient: 'from-teal-400 to-cyan-600', rating: '4.9', tag: 'E-Ticaret' },
  ],
  scriptler: [
    { name: 'Randevu Sistemi', desc: 'Tam özellikli online randevu scripti', badge: 'YENİ', gradient: 'from-indigo-500 to-purple-600', rating: '4.8', tag: 'Script' },
    { name: 'İlan Platformu', desc: 'Çok satıcılı ilan ve pazar yeri scripti', badge: 'POPÜLER', gradient: 'from-orange-500 to-red-600', rating: '4.9', tag: 'Script' },
    { name: 'Link Kısaltıcı', desc: 'Analytics destekli URL yönetim sistemi', gradient: 'from-blue-400 to-blue-600', rating: '4.7', tag: 'Script' },
    { name: 'Fatura Yönetimi', desc: 'E-fatura ve muhasebe scripti', gradient: 'from-emerald-500 to-green-700', rating: '4.8', tag: 'Script' },
    { name: 'Üyelik Sistemi', desc: 'Premium üyelik ve içerik kilitleme scripti', badge: 'YENİ', gradient: 'from-rose-400 to-pink-600', rating: '4.9', tag: 'Script' },
  ],
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState('temalar')
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = productSlides[activeTab]

  const next = useCallback(() => {
    setCurrentSlide((c) => (c + 1) % slides.length)
  }, [slides.length])

  // Auto-advance every 3.5s
  useEffect(() => {
    setCurrentSlide(0)
  }, [activeTab])

  useEffect(() => {
    const timer = setInterval(next, 3500)
    return () => clearInterval(timer)
  }, [next])

  const current = slides[currentSlide]

  return (
    <section
      className="min-h-[88vh] bg-gradient-to-b from-[#F8F9FA] to-white flex items-center pt-14 pb-12 overflow-hidden"
      aria-label="Ana sayfa hero bölümü"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">

          {/* ── Left Column ── */}
          <motion.div
            className="flex-1 lg:max-w-[52%] flex flex-col"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-1.5 bg-[#FFF3EE] border border-[#FF6B35] text-[#FF6B35] text-[13px] font-semibold px-4 py-1.5 rounded-full mb-5">
                Dijital Urun Magazasi
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-[42px] sm:text-[54px] font-extrabold leading-[1.1] text-[#1A1A2E] text-balance"
            >
              WordPress Tema,
              <br />
              <span className="text-[#FF6B35]">Eklenti</span> &amp; Hazir Script
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-4 text-[17px] text-[#6B7280] max-w-[480px] leading-relaxed"
            >
              Sektorunuze ozel tasarlanmis, kuruluma hazir WordPress temaları, guclu eklentiler ve tam islevli web scriptleri.
            </motion.p>

            {/* Social proof */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 mt-5">
              <div className="flex items-center" aria-hidden="true">
                {avatarColors.map((color, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white ${i > 0 ? '-ml-2' : ''}`}
                    style={{ backgroundColor: color }}
                  >
                    {avatarInitials[i]}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#FF6B35] text-[15px]" aria-hidden="true">★★★★★</span>
                <span className="text-[14px] text-[#374151] font-medium">200+ mutlu müşteri</span>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 mt-8">
              <Link
                href="/urunler"
                className="inline-flex items-center gap-2 bg-[#FF6B35] text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-[#e55a2b] hover:scale-105 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
              >
                Ürünlerimizi İncele →
              </Link>
              <Link
                href="/iletisim"
                className="inline-flex items-center gap-2 bg-transparent border-2 border-[#1A1A2E] text-[#1A1A2E] px-7 py-3.5 rounded-xl font-semibold hover:bg-[#1A1A2E] hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1A1A2E]"
              >
                Teklif Al
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-6 mt-9 pt-7 border-t border-gray-100">
              {[
                { value: '16+', label: 'Hazır Ürün' },
                { value: '150+', label: 'Tamamlanan Proje' },
                { value: '4.8★', label: 'Ortalama Puan' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-[22px] font-extrabold text-[#1A1A2E]">{value}</div>
                  <div className="text-[12px] text-[#6B7280] mt-0.5">{label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right Column – Product Slideshow ── */}
          <motion.div
            className="lg:w-[44%] w-full flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-full max-w-[340px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden">
              {/* macOS dots */}
              <div className="flex items-center gap-1.5 px-4 pt-4 pb-2">
                <span className="w-3 h-3 rounded-full bg-red-400" aria-hidden="true" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" aria-hidden="true" />
                <span className="w-3 h-3 rounded-full bg-green-400" aria-hidden="true" />
                <span className="ml-2 text-[12px] font-semibold text-[#374151]">Ürün Önizleme</span>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-100 mx-4" role="tablist" aria-label="Ürün kategorileri">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-2.5 text-[12px] font-semibold transition-all duration-200 border-b-2 focus:outline-none ${
                      activeTab === tab.id
                        ? 'border-[#FF6B35] text-[#FF6B35]'
                        : 'border-transparent text-[#6B7280] hover:text-[#374151]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Slide display */}
              <div className="flex-1 p-4 min-h-[280px] flex flex-col">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeTab}-${currentSlide}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 flex flex-col"
                  >
                    {/* Product image area */}
                    <div className={`rounded-xl overflow-hidden bg-gradient-to-br ${current.gradient} h-[150px] relative mb-4`}>
                      {current.badge && (
                        <span className="absolute top-2.5 left-2.5 bg-[#FF6B35] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {current.badge}
                        </span>
                      )}
                      {/* Decorative lines to simulate UI */}
                      <div className="absolute bottom-4 left-4 right-4 space-y-2" aria-hidden="true">
                        <div className="h-2 bg-white/30 rounded-full w-3/4" />
                        <div className="h-2 bg-white/20 rounded-full w-1/2" />
                      </div>
                    </div>

                    <span className="text-[#FF6B35] text-[10px] font-bold uppercase tracking-wide">{current.tag}</span>
                    <h3 className="text-[16px] font-bold text-[#1A1A2E] mt-0.5">{current.name}</h3>
                    <p className="text-[12px] text-[#6B7280] mt-0.5 mb-3 line-clamp-1">{current.desc}</p>

                    <div className="flex items-center gap-1 mb-4">
                      <span className="text-[#FF6B35] text-[12px]" aria-hidden="true">★★★★★</span>
                      <span className="text-[12px] text-[#6B7280]">{current.rating}</span>
                    </div>

                    <div className="flex gap-2 mt-auto">
                      <Link
                        href="/iletisim"
                        className="flex-1 bg-[#FF6B35] text-white text-center py-2 rounded-lg text-[12px] font-bold hover:bg-[#e55a2b] transition-colors"
                      >
                        Teklif Al
                      </Link>
                      <Link
                        href="/urunler"
                        className="flex-1 border border-gray-200 text-[#374151] text-center py-2 rounded-lg text-[12px] font-medium hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors"
                      >
                        İncele
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Slide indicators */}
              <div className="flex items-center justify-center gap-1.5 pb-4">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    aria-label={`Slayt ${i + 1}`}
                    className={`rounded-full transition-all duration-300 focus:outline-none ${
                      i === currentSlide ? 'w-5 h-2 bg-[#FF6B35]' : 'w-2 h-2 bg-gray-200 hover:bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* View all button */}
              <div className="border-t border-gray-100 px-4 py-3">
                <Link
                  href="/urunler"
                  className="block w-full text-center text-[13px] font-semibold text-[#FF6B35] hover:underline focus:outline-none"
                >
                  Tüm Ürünleri Gör →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
