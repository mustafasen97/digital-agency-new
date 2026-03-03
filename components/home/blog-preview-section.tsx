'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const blogPosts = [
  {
    category: 'WordPress',
    title: 'WordPress Sitenizi 3 Adımda Hızlandırın',
    excerpt:
      'Site hızı SEO ve kullanıcı deneyimi için kritik öneme sahiptir. Bu rehberde Core Web Vitals skorunuzu artıracak adımları öğrenin.',
    author: 'Ahmet Kaya',
    initials: 'AK',
    color: '#FF6B35',
    date: '15 Ocak 2025',
    readTime: '4 dk okuma',
    gradient: 'from-blue-400 to-blue-600',
  },
  {
    category: 'SEO',
    title: '2025 Google Algoritma Güncellemesinde Öne Çıkın',
    excerpt:
      'Google\'ın en son algoritma güncellemesi pek çok siteyi etkiledi. Sıralamada kalmak için yapmanız gerekenler.',
    author: 'Mert Demir',
    initials: 'MD',
    color: '#1A1A2E',
    date: '8 Ocak 2025',
    readTime: '6 dk okuma',
    gradient: 'from-emerald-400 to-teal-600',
  },
  {
    category: 'Web Tasarım',
    title: 'E-Ticaret Sitesinde Dönüşüm Artırmanın Yolları',
    excerpt:
      'Sepeti terk etme oranını düşürün, müşteri deneyimini iyileştirin ve satışlarınızı artırın. Kanıtlanmış stratejiler.',
    author: 'Elif Yıldız',
    initials: 'EY',
    color: '#10B981',
    date: '2 Ocak 2025',
    readTime: '5 dk okuma',
    gradient: 'from-purple-400 to-purple-600',
  },
]

export default function BlogPreviewSection() {
  return (
    <section className="bg-white py-20" aria-labelledby="blog-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="flex items-end justify-between mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <div>
            <span className="text-[#FF6B35] text-[14px] font-semibold uppercase tracking-wide">
              Blog
            </span>
            <h2
              id="blog-heading"
              className="mt-1 text-[32px] sm:text-[36px] font-extrabold text-[#1A1A2E] text-balance"
            >
              Son Yazılarımız
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex text-[#FF6B35] font-semibold hover:underline focus:outline-none focus:underline shrink-0"
          >
            Tüm Yazılar →
          </Link>
        </motion.div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.title}
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
              className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow group"
            >
              {/* Image placeholder */}
              <div
                className={`h-44 bg-gradient-to-br ${post.gradient}`}
                aria-hidden="true"
              />
              <div className="p-6">
                {/* Category */}
                <span className="inline-block bg-[#FFF3EE] text-[#FF6B35] text-[11px] font-bold uppercase tracking-wide px-3 py-1 rounded-full mb-3">
                  {post.category}
                </span>
                {/* Title */}
                <h3 className="text-[18px] font-bold text-[#1A1A2E] mb-2 leading-snug group-hover:text-[#FF6B35] transition-colors text-balance">
                  <Link href="/blog" className="focus:outline-none focus:text-[#FF6B35]">
                    {post.title}
                  </Link>
                </h3>
                {/* Excerpt */}
                <p className="text-[14px] text-[#6B7280] leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                {/* Meta */}
                <div className="flex items-center gap-3 text-[13px] text-[#6B7280]">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                    style={{ backgroundColor: post.color }}
                    aria-label={`Yazar: ${post.author}`}
                  >
                    {post.initials}
                  </div>
                  <span className="font-medium text-[#374151]">{post.author}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Mobile "all posts" link */}
        <div className="mt-8 text-center sm:hidden">
          <Link href="/blog" className="text-[#FF6B35] font-semibold hover:underline">
            Tüm Yazılar →
          </Link>
        </div>
      </div>
    </section>
  )
}
