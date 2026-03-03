'use client'

import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const services = [
  {
    icon: '🎨',
    name: 'WordPress Tasarım',
    desc: 'Markanıza özel, sıfırdan tasarlanan WordPress siteleri. Kullanıcı dostu arayüz ve güçlü yönetim paneli.',
  },
  {
    icon: '⚡',
    name: 'Hız Optimizasyonu',
    desc: 'Core Web Vitals uyumlu site hızlandırma. Google PageSpeed skorunuzu artırın, bounce rate düşürün.',
  },
  {
    icon: '🔒',
    name: 'Güvenlik & Temizlik',
    desc: 'Malware temizleme, güvenlik duvarı kurulumu ve düzenli yedekleme ile sitenizi koruyun.',
  },
  {
    icon: '📈',
    name: 'SEO Optimizasyonu',
    desc: 'Google\'da üst sıralara çıkmak için teknik ve içerik SEO hizmetleri. Organik trafik artışı.',
  },
  {
    icon: '🛠️',
    name: 'Hata Giderme',
    desc: 'Site çökmesi, eklenti uyumsuzluğu ve teknik sorunlarda hızlı müdahale ve kalıcı çözüm.',
  },
  {
    icon: '📱',
    name: 'UI/UX Tasarım',
    desc: 'Dönüşüm odaklı tasarım anlayışıyla kullanıcı deneyimini en üst seviyeye taşıyın.',
  },
]

export default function ServicesSection() {
  return (
    <section className="bg-[#F8F9FA] py-20" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <span className="text-[#FF6B35] text-[14px] font-semibold uppercase tracking-wide">
            Hizmetlerimiz
          </span>
          <h2
            id="services-heading"
            className="mt-2 text-[32px] sm:text-[36px] font-extrabold text-[#1A1A2E] text-balance"
          >
            Ne Yapıyoruz?
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.article
              key={service.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.5, delay: i * 0.07 } } }}
              className="bg-white rounded-xl p-8 border border-gray-100 hover:border-orange-300 hover:shadow-md transition-all duration-200 group"
            >
              <div
                className="text-[48px] mb-4 leading-none"
                aria-hidden="true"
              >
                {service.icon}
              </div>
              <h3 className="text-[20px] font-bold text-[#1A1A2E] mb-2">
                {service.name}
              </h3>
              <p className="text-[14px] text-[#6B7280] leading-relaxed mb-4">
                {service.desc}
              </p>
              <a
                href="/iletisim"
                className="text-[14px] text-[#FF6B35] font-medium hover:underline focus:outline-none focus:underline"
              >
                Detaylı Bilgi →
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
