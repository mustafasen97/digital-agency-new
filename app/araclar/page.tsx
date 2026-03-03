import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/page-hero'
import FaqSection from '@/components/faq-section'
import QuoteCtaSection from '@/components/quote-cta-section'

export const metadata: Metadata = {
  title: 'Ücretsiz Web Araçları - SEO, Resim, Favicon ve Daha Fazlası | WebTasarımEvi',
  description:
    'Resim sıkıştırma, SEO analiz, renk paleti oluşturma, favicon üretme ve daha fazlası — tamamen ücretsiz web araçları. Web geliştiriciler için pratik araçlar.',
  keywords: 'ücretsiz web araçları, seo analiz, resim sıkıştırıcı, favicon oluşturucu, meta etiket',
  alternates: { canonical: 'https://webtasarimevi.com.tr/araclar' },
}

const tools = [
  { slug: 'resim-sikistirici', name: 'Resim Sıkıştırıcı', desc: 'JPEG, PNG ve WebP görsellerinizi kalite kaybı olmadan sıkıştırın. Site hızınızı artırın.', icon: '🖼️', color: 'from-blue-400 to-blue-600', tag: 'Görsel' },
  { slug: 'renk-paleti', name: 'Renk Paleti Oluşturucu', desc: 'Markanıza uygun renk paletleri oluşturun. HEX, RGB ve HSL değerlerini kopyalayın.', icon: '🎨', color: 'from-purple-400 to-purple-600', tag: 'Tasarım' },
  { slug: 'seo-analiz', name: 'SEO Analiz Aracı', desc: 'URL\'nizi analiz edin, meta etiketleri, başlık hiyerarşisi ve SEO puanınızı öğrenin.', icon: '📊', color: 'from-emerald-400 to-teal-600', tag: 'SEO' },
  { slug: 'favicon', name: 'Favicon Oluşturucu', desc: 'Mevcut görselinizden farklı boyutlarda favicon dosyaları oluşturun ve indirin.', icon: '✂️', color: 'from-orange-400 to-red-500', tag: 'Araç' },
  { slug: 'meta-etiket', name: 'Meta Etiket Oluşturucu', desc: 'SEO ve sosyal medya paylaşımı için doğru meta etiketleri oluşturun.', icon: '🏷️', color: 'from-indigo-400 to-indigo-600', tag: 'SEO' },
  { slug: 'robots-txt', name: 'Robots.txt Oluşturucu', desc: 'Web siteniz için doğru robots.txt dosyasını oluşturun ve indirin.', icon: '🤖', color: 'from-gray-500 to-gray-700', tag: 'SEO' },
]

const faqItems = [
  {
    question: 'Araçlar gerçekten ücretsiz mi?',
    answer: 'Evet, tüm araçlarımız tamamen ücretsiz ve kayıt gerektirmez. Dilediğiniz zaman kullanabilirsiniz.',
  },
  {
    question: 'Resim sıkıştırıcı kaliteyi düşürür mü?',
    answer: 'Akıllı sıkıştırma algoritması kullanıldığından görsel kalitesi göze çarpmayacak düzeyde korunur. Ortalama %60-70 boyut azaltımı sağlanır.',
  },
  {
    question: 'Araçları ticari amaçla kullanabilir miyim?',
    answer: 'Evet, tüm araçlar ticari ve kişisel kullanım için serbesttir. Herhangi bir kısıtlama bulunmamaktadır.',
  },
  {
    question: 'Yüklediğim dosyalar sunucuda saklanıyor mu?',
    answer: 'Hayır. Tüm işlemler tarayıcınızda gerçekleşir ve yüklediğiniz dosyalar sunucularımıza iletilmez, gizliliğiniz korunur.',
  },
]

export default function AraclarPage() {
  return (
    <main>
      <PageHero
        badge="Ücretsiz Araçlar"
        title="Ücretsiz Web Araçları"
        description="Resim sıkıştırma, SEO analiz, renk paleti ve daha fazlası — tamamen ücretsiz ve kayıt gerektirmez."
        stats={[
          { value: '6', label: 'Araç' },
          { value: '%100', label: 'Ücretsiz' },
          { value: 'Kayıt Yok', label: 'Hemen Kullan' },
        ]}
      />

      <section className="py-16 bg-[#F8F9FA]" aria-label="Araçlar listesi">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/araclar/${tool.slug}`}
                className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
              >
                <div className={`h-28 bg-gradient-to-br ${tool.color} flex items-center justify-center`}>
                  <span className="text-[52px]" aria-hidden="true">{tool.icon}</span>
                </div>
                <div className="p-5">
                  <span className="text-[#FF6B35] text-[11px] font-bold uppercase tracking-wide">{tool.tag}</span>
                  <h2 className="text-[18px] font-bold text-[#1A1A2E] mt-1 mb-2 group-hover:text-[#FF6B35] transition-colors">
                    {tool.name}
                  </h2>
                  <p className="text-[#6B7280] text-[14px] leading-relaxed mb-4">{tool.desc}</p>
                  <span className="text-[#FF6B35] font-semibold text-[14px] group-hover:underline">Kullan →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FaqSection title="Araçlar Hakkında Sık Sorulan Sorular" items={faqItems} />

      <QuoteCtaSection
        title="Profesyonel Yardıma mı İhtiyacınız Var?"
        description="Araçlarımızı kullanmanıza rağmen web sitenizde sorun yaşıyorsanız, uzman ekibimiz yardıma hazır. Ücretsiz site analizi için hemen iletişime geçin."
        primaryCta="Ücretsiz Analiz Al"
        secondaryCta="WhatsApp ile Yaz"
      />
    </main>
  )
}
