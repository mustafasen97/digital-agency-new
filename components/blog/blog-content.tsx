'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import NewsletterForm from '@/components/newsletter-form'

const featuredPost = {
  category: 'WordPress',
  title: 'WordPress Sitenizi 2025\'te Hızlandırmanın 10 Yolu',
  excerpt:
    'Sayfa yükleme süreniz her geçen saniye dönüşüm oranınızı düşürüyor. Bu rehberde Core Web Vitals skorunuzu artıracak, Google\'da üst sıralara taşıyacak ve ziyaretçilerinizi sitenizde tutacak 10 kanıtlanmış yöntemi detaylıca anlattık.',
  author: 'Ahmet Kaya',
  initials: 'AK',
  color: '#FF6B35',
  date: '20 Ocak 2025',
  readTime: '8 dk okuma',
  gradient: 'from-blue-500 via-blue-600 to-indigo-700',
}

const posts = [
  {
    category: 'SEO',
    title: '2025 Google Algoritma Güncellemesinde Öne Çıkın',
    excerpt: 'Google\'ın en son güncellemesi pek çok siteyi etkiledi. Sıralamada kalmak için yapmanız gerekenler.',
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
    excerpt: 'Sepeti terk etme oranını düşürün, müşteri deneyimini iyileştirin ve satışlarınızı artırın.',
    author: 'Elif Yıldız',
    initials: 'EY',
    color: '#10B981',
    date: '2 Ocak 2025',
    readTime: '5 dk okuma',
    gradient: 'from-purple-400 to-purple-600',
  },
  {
    category: 'WordPress',
    title: 'WooCommerce\'de Stok Yönetimi Nasıl Yapılır?',
    excerpt: 'E-ticaret sitenizde stokları etkin şekilde yönetmek için bilmeniz gereken tüm WooCommerce özellikleri.',
    author: 'Selin Arslan',
    initials: 'SA',
    color: '#3B82F6',
    date: '27 Aralık 2024',
    readTime: '7 dk okuma',
    gradient: 'from-orange-400 to-red-500',
  },
  {
    category: 'Güvenlik',
    title: 'WordPress Sitenizi Hacklerden Korumanın 7 Yolu',
    excerpt: 'Brute-force saldırıları, kötü amaçlı eklentiler ve SQL enjeksiyonlarına karşı sitenizi nasıl korursunuz?',
    author: 'Onur Tekin',
    initials: 'OT',
    color: '#8B5CF6',
    date: '20 Aralık 2024',
    readTime: '6 dk okuma',
    gradient: 'from-gray-600 to-gray-800',
  },
  {
    category: 'SEO',
    title: 'Yerel SEO ile Google Haritalarda Üst Sıralara Çıkın',
    excerpt: 'Yerel işletmeler için Google Haritalar ve yerel SEO stratejileri. Müşterilerinizin sizi bulmasını kolaylaştırın.',
    author: 'Ahmet Kaya',
    initials: 'AK',
    color: '#FF6B35',
    date: '15 Aralık 2024',
    readTime: '5 dk okuma',
    gradient: 'from-cyan-400 to-blue-500',
  },
  {
    category: 'Web Tasarım',
    title: 'Mobile-First Tasarımın Önemi ve Nasıl Uygulanır',
    excerpt: 'Mobil kullanıcılar artık çoğunlukta. Mobile-first yaklaşım neden kritik ve nasıl uygulanır?',
    author: 'Elif Yıldız',
    initials: 'EY',
    color: '#10B981',
    date: '10 Aralık 2024',
    readTime: '4 dk okuma',
    gradient: 'from-rose-400 to-rose-600',
  },
]

const categories = ['WordPress', 'SEO', 'Web Tasarım', 'Güvenlik', 'E-Ticaret']
const recentPosts = posts.slice(0, 4)

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function BlogContent() {
  return (
    <section className="py-12 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Post */}
        <motion.article
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm mb-10 group"
          aria-label="Öne çıkan yazı"
        >
          <div className="flex flex-col lg:flex-row">
            <div className={`lg:w-2/5 h-56 lg:h-auto min-h-[220px] bg-gradient-to-br ${featuredPost.gradient}`} aria-hidden="true" />
            <div className="flex-1 p-7 lg:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-[#FFF3EE] text-[#FF6B35] text-[11px] font-bold uppercase tracking-wide px-3 py-1 rounded-full">
                  Öne Çıkan
                </span>
                <span className="bg-[#FFF3EE] text-[#FF6B35] text-[11px] font-bold uppercase tracking-wide px-3 py-1 rounded-full">
                  {featuredPost.category}
                </span>
              </div>
              <h2 className="text-[22px] sm:text-[26px] font-extrabold text-[#1A1A2E] mb-3 leading-snug group-hover:text-[#FF6B35] transition-colors text-balance">
                <Link href="/blog" className="focus:outline-none focus:text-[#FF6B35]">
                  {featuredPost.title}
                </Link>
              </h2>
              <p className="text-[#6B7280] text-[15px] leading-relaxed mb-5 line-clamp-3">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ backgroundColor: featuredPost.color }}
                    aria-hidden="true"
                  >
                    {featuredPost.initials}
                  </div>
                  <span className="text-[14px] font-medium text-[#374151]">{featuredPost.author}</span>
                  <span className="text-[#6B7280] text-[13px]">· {featuredPost.date} · {featuredPost.readTime}</span>
                </div>
                <Link
                  href="/blog"
                  className="text-[#FF6B35] font-semibold text-[14px] hover:underline focus:outline-none focus:underline"
                >
                  Devamını Oku →
                </Link>
              </div>
            </div>
          </div>
        </motion.article>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Posts Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {posts.map((post, i) => (
                <motion.article
                  key={post.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    ...fadeUp,
                    visible: { ...fadeUp.visible, transition: { duration: 0.4, delay: i * 0.07 } },
                  }}
                  className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className={`h-36 bg-gradient-to-br ${post.gradient}`} aria-hidden="true" />
                  <div className="p-5">
                    <span className="inline-block bg-[#FFF3EE] text-[#FF6B35] text-[10px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full mb-2">
                      {post.category}
                    </span>
                    <h3 className="text-[15px] font-bold text-[#1A1A2E] mb-2 leading-snug group-hover:text-[#FF6B35] transition-colors text-balance">
                      <Link href="/blog" className="focus:outline-none focus:text-[#FF6B35]">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-[#6B7280] text-[13px] line-clamp-2 mb-3">{post.excerpt}</p>
                    <div className="flex items-center gap-2 text-[12px] text-[#6B7280]">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0"
                        style={{ backgroundColor: post.color }}
                        aria-hidden="true"
                      >
                        {post.initials}
                      </div>
                      <span>{post.author}</span>
                      <span aria-hidden="true">·</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-72 shrink-0 space-y-6" aria-label="Blog kenar çubuğu">
            {/* Categories */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h2 className="text-[15px] font-bold text-[#1A1A2E] mb-4 pb-2 border-b border-gray-100">
                Kategoriler
              </h2>
              <ul className="space-y-1">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button className="w-full text-left flex items-center justify-between px-2 py-1.5 rounded-lg text-[14px] text-[#374151] hover:bg-[#FFF3EE] hover:text-[#FF6B35] transition-colors group focus:outline-none focus:ring-2 focus:ring-[#FF6B35]">
                      {cat}
                      <span className="text-[12px] text-[#6B7280] group-hover:text-[#FF6B35]">→</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Posts */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h2 className="text-[15px] font-bold text-[#1A1A2E] mb-4 pb-2 border-b border-gray-100">
                Son Yazılar
              </h2>
              <ul className="space-y-3">
                {recentPosts.map((post) => (
                  <li key={post.title}>
                    <Link href="/blog" className="flex items-start gap-3 group focus:outline-none">
                      <div className={`w-12 h-12 rounded-lg shrink-0 bg-gradient-to-br ${post.gradient}`} aria-hidden="true" />
                      <div>
                        <p className="text-[13px] font-semibold text-[#1A1A2E] leading-snug group-hover:text-[#FF6B35] transition-colors line-clamp-2">
                          {post.title}
                        </p>
                        <p className="text-[11px] text-[#6B7280] mt-0.5">{post.date}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="bg-[#1A1A2E] rounded-xl p-5">
              <h2 className="text-[15px] font-bold text-white mb-2">Bültenimize Abone Olun</h2>
              <p className="text-white/60 text-[13px] mb-4 leading-relaxed">
                Haftalık WordPress ipuçları ve SEO rehberleri e-postanıza gelsin.
              </p>
              <NewsletterForm />
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
