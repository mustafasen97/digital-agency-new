'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const tools = [
  { icon: '🖼️', name: 'Resim Sıkıştırıcı', href: '/araclar/resim-sikistirici' },
  { icon: '🎨', name: 'Renk Paleti Oluşturucu', href: '/araclar/renk-paleti' },
  { icon: '📊', name: 'SEO Analiz Aracı', href: '/araclar/seo-analiz' },
  { icon: '✂️', name: 'Favicon Oluşturucu', href: '/araclar/favicon' },
]

export default function ToolsTeaserSection() {
  return (
    <section className="bg-[#1A1A2E] py-16" aria-labelledby="tools-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left */}
          <motion.div
            className="lg:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
          >
            <h2
              id="tools-heading"
              className="text-[32px] sm:text-[36px] font-extrabold text-white text-balance mb-4"
            >
              Ücretsiz Web Araçlarımız
            </h2>
            <p className="text-white/70 text-[16px] leading-relaxed mb-8 max-w-md">
              Resim sıkıştırma, SEO analiz, renk paleti ve daha fazlası —
              tamamen ücretsiz.
            </p>
            <Link
              href="/araclar"
              className="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#1A1A2E] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
            >
              Araçları Keşfet →
            </Link>
          </motion.div>

          {/* Right: 2x2 grid */}
          <motion.div
            className="lg:w-1/2 grid grid-cols-2 gap-4 w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {tools.map((tool) => (
              <motion.a
                key={tool.name}
                href={tool.href}
                variants={fadeUp}
                className="bg-white/10 rounded-xl p-5 flex flex-col gap-3 hover:bg-white/15 transition-colors group focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <span className="text-[32px]" aria-hidden="true">{tool.icon}</span>
                <div>
                  <p className="text-white font-semibold text-[15px]">{tool.name}</p>
                  <span className="text-[#FF6B35] text-[13px] font-medium group-hover:underline">
                    Kullan →
                  </span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
