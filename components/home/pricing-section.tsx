'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Link from 'next/link'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const plans = [
  {
    id: 'starter',
    name: 'Başlangıç',
    subtitle: 'Küçük işletmeler için ideal',
    price: '₺4.900',
    popular: false,
    features: [
      '1 Sayfalık Site',
      'SSL Kurulumu',
      'Mobil Uyumlu',
      '3 Ay Destek',
      'Hız Optimizasyonu',
    ],
    cta: 'Başla →',
    href: '/iletisim',
  },
  {
    id: 'pro',
    name: 'Profesyonel',
    subtitle: 'En popüler tercih',
    price: '₺9.900',
    popular: true,
    features: [
      '5 Sayfa',
      'Özel Tasarım',
      'WooCommerce Kurulumu',
      'SEO Optimizasyonu',
      '1 Yıl Destek',
      'Google Analytics',
    ],
    cta: 'En Çok Tercih Edilen →',
    href: '/iletisim',
  },
  {
    id: 'enterprise',
    name: 'Kurumsal',
    subtitle: 'Büyük ölçekli projeler için',
    price: '₺19.900',
    popular: false,
    features: [
      '10+ Sayfa',
      'Tam Özel Geliştirme',
      'E-Ticaret',
      'Çoklu Dil',
      '2 Yıl Destek',
      'Öncelikli Destek',
    ],
    cta: 'Teklif Al →',
    href: '/iletisim',
  },
]

export default function PricingSection() {
  return (
    <section className="bg-white py-20" aria-labelledby="pricing-heading">
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
            Paketlerimiz
          </span>
          <h2
            id="pricing-heading"
            className="mt-2 text-[32px] sm:text-[36px] font-extrabold text-[#1A1A2E] text-balance"
          >
            Web Siteniz İçin Doğru Paket
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={{
                ...fadeUp,
                visible: {
                  ...fadeUp.visible,
                  transition: { duration: 0.5, delay: i * 0.1 },
                },
              }}
              className={`relative rounded-2xl p-8 flex flex-col border transition-shadow ${
                plan.popular
                  ? 'scale-[1.04] shadow-2xl border-[#FF6B35] z-10'
                  : 'border-gray-200 hover:shadow-lg'
              }`}
              style={
                plan.popular
                  ? { background: 'linear-gradient(135deg, #FF6B35 0%, #e55a2b 100%)' }
                  : { background: '#fff' }
              }
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#1A1A2E] text-white text-[11px] font-bold px-4 py-1 rounded-full whitespace-nowrap">
                  EN POPÜLER
                </span>
              )}

              <div className="mb-6">
                <h3
                  className={`text-[22px] font-extrabold mb-1 ${
                    plan.popular ? 'text-white' : 'text-[#1A1A2E]'
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-[13px] ${
                    plan.popular ? 'text-white/80' : 'text-[#6B7280]'
                  }`}
                >
                  {plan.subtitle}
                </p>
                <div className="mt-4 flex items-end gap-1">
                  <span
                    className={`text-[38px] font-extrabold leading-none ${
                      plan.popular ? 'text-white' : 'text-[#1A1A2E]'
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-[14px] mb-1.5 ${
                      plan.popular ? 'text-white/70' : 'text-[#6B7280]'
                    }`}
                  >
                    tek seferlik
                  </span>
                </div>
              </div>

              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5">
                    <Check
                      size={16}
                      className={`shrink-0 ${
                        plan.popular ? 'text-white' : 'text-[#FF6B35]'
                      }`}
                      aria-hidden="true"
                    />
                    <span
                      className={`text-[14px] ${
                        plan.popular ? 'text-white' : 'text-[#374151]'
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`w-full text-center py-3 rounded-xl font-bold text-[15px] transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 ${
                  plan.popular
                    ? 'bg-white text-[#FF6B35] hover:bg-gray-50 focus:ring-white'
                    : 'bg-[#FF6B35] text-white hover:bg-[#e55a2b] focus:ring-[#FF6B35]'
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Guarantees */}
        <motion.p
          className="text-center text-[13px] text-[#6B7280] mt-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={fadeUp}
        >
          ✓ 14 gün içinde teslimat garantisi &nbsp;·&nbsp; ✓ Sözleşmeli hizmet
          &nbsp;·&nbsp; ✓ %100 müşteri memnuniyeti
        </motion.p>
      </div>
    </section>
  )
}
