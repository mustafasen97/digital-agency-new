'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function FinalCtaSection() {
  return (
    <section
      className="relative py-24 text-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1A1A2E 0%, #2D2D4E 100%)',
      }}
      aria-labelledby="final-cta-heading"
    >
      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.h2
            id="final-cta-heading"
            variants={fadeUp}
            className="text-[36px] sm:text-[42px] font-extrabold text-white text-balance"
          >
            Projenize Bugün Başlayalım
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-white/80 text-[17px] max-w-[500px] mx-auto leading-relaxed"
          >
            Ücretsiz danışmanlık için hemen iletişime geçin. 24 saat içinde
            size özel teklif hazırlayalım.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-4 mt-10"
          >
            <Link
              href="/iletisim"
              className="bg-[#FF6B35] text-white px-8 py-4 rounded-xl font-bold text-[16px] hover:bg-[#e55a2b] hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
            >
              Ücretsiz Teklif Al
            </Link>
            <Link
              href="/iletisim"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-[16px] hover:bg-white hover:text-[#1A1A2E] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
            >
              Demo Talep Et
            </Link>
          </motion.div>

          {/* Quick contact links */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-6 mt-6"
          >
            {[
              { icon: '📞', label: 'Hemen Ara', href: 'tel:08503033132' },
              { icon: '💬', label: 'WhatsApp', href: 'https://wa.me/905000000000' },
              { icon: '✉️', label: 'E-posta', href: 'mailto:info@webtasarimevi.com.tr' },
            ].map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-2 text-white/70 text-[14px] hover:text-white transition-colors focus:outline-none focus:text-white"
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                <span aria-hidden="true">{icon}</span>
                {label}
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
