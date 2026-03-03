'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const testimonials = [
  {
    text: 'WebTasarımEvi ekibi beklentilerimin çok ötesinde bir site teslim etti. Hız optimizasyonu sonrası Google skorumuz 95\'e çıktı ve organik trafiğimiz 3 ayda %120 arttı.',
    name: 'Ahmet Kaya',
    role: 'Kurucu, KayaLojistik',
    initials: 'AK',
    color: '#FF6B35',
  },
  {
    text: 'WordPress sitemiz sürekli hackleniyordu. Ekip güvenlik temizliği yaptı, güvenlik duvarı kurdu. Artık tek sorun yaşamıyoruz. Profesyonel ve hızlı çözüm için teşekkürler.',
    name: 'Selin Demir',
    role: 'Kurucu, SelinBoutique',
    initials: 'SD',
    color: '#1A1A2E',
  },
  {
    text: 'E-ticaret sitemizin tasarımı hem modern hem de çok kullanışlı oldu. Sepeti terk etme oranımız belirgin şekilde düştü. Satışlarımız ilk ayda %45 arttı.',
    name: 'Murat Arslan',
    role: 'Kurucu, ArslanMarket',
    initials: 'MA',
    color: '#10B981',
  },
  {
    text: 'Blog temamızı hem görsel hem de SEO açısından mükemmel şekilde ayarladılar. İçerik yayımlamak artık çok daha kolay. Hızlı teslimat ve iletişim mükemmeldi.',
    name: 'Elif Yıldız',
    role: 'Kurucu, ElifBlog',
    initials: 'EY',
    color: '#3B82F6',
  },
  {
    text: 'Hukuk bürosu sitemiz artık çok daha profesyonel görünüyor. Müvekkiller siteyi gördüklerinde güven duyduklarını söylüyor. 10 üzerinden 10 veriyorum.',
    name: 'Onur Tekin',
    role: 'Kurucu, Tekin Hukuk',
    initials: 'OT',
    color: '#8B5CF6',
  },
]

export default function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === 'right' ? 340 : -340,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="bg-[#F8F9FA] py-20" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <div>
            <span className="text-[#FF6B35] text-[14px] font-semibold uppercase tracking-wide">
              Müşteri Yorumları
            </span>
            <h2
              id="testimonials-heading"
              className="mt-1 text-[32px] sm:text-[36px] font-extrabold text-[#1A1A2E] text-balance"
            >
              200+ Mutlu Müşterimiz
            </h2>
          </div>
          {/* Scroll controls */}
          <div className="flex gap-2" aria-label="Yorumlar arasında gezin">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
              aria-label="Önceki yorum"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
              aria-label="Sonraki yorum"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </motion.div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none' }}
          aria-label="Müşteri yorumları kaydırma alanı"
        >
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 shrink-0 w-[300px] sm:w-[340px] snap-start"
            >
              {/* Stars */}
              <div className="text-[#FF6B35] text-[15px] mb-3" aria-label="5 üzerinden 5 yıldız">
                ★★★★★
              </div>
              {/* Quote */}
              <p className="text-[15px] text-[#374151] italic leading-relaxed mb-4">
                &ldquo;{t.text}&rdquo;
              </p>
              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-bold text-white shrink-0"
                  style={{ backgroundColor: t.color }}
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-[14px] font-bold text-[#1A1A2E]">{t.name}</p>
                  <p className="text-[12px] text-[#6B7280]">{t.role}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
