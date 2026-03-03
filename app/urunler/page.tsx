import type { Metadata } from 'next'
import { Suspense } from 'react'
import PageHero from '@/components/page-hero'
import UrunGrid from '@/components/urunler/urun-grid'
import FaqSection from '@/components/faq-section'
import NewsletterCtaSection from '@/components/newsletter-cta-section'
import QuoteCtaSection from '@/components/quote-cta-section'

export const metadata: Metadata = {
  title: 'WordPress Tema, Eklenti ve Hazır Script Mağazası | WebTasarımEvi',
  description:
    'WordPress temaları, güçlü eklentiler ve hazır scriptler. Sektörünüze özel kuruluma hazır dijital ürünler. Hızlı kurulum, tam destek.',
  keywords: 'wordpress tema, wordpress eklenti, hazır script, dijital ürün, web tasarım',
  alternates: { canonical: 'https://webtasarimevi.com.tr/urunler' },
  openGraph: {
    title: 'Dijital Ürün Mağazası | WebTasarımEvi',
    description: 'WordPress temaları, eklentiler ve hazır web scriptleri.',
  },
}

const faqItems = [
  {
    question: 'Ürünleri satın almak için nasıl sipariş verebilirim?',
    answer: 'Ürün sayfasındaki "Teklif Al" butonuna tıklayarak veya WhatsApp üzerinden ekibimize ulaşabilirsiniz. 24 saat içinde fiyat teklifimizi iletiyoruz.',
  },
  {
    question: 'Kurulum ve ayarları siz mi yapıyorsunuz?',
    answer: 'Evet. Tüm ürünlerimiz tam kurulum desteği ile birlikte gelir. Sunucunuza kurulum, ayar ve ilk içerik yükleme işlemlerini ekibimiz gerçekleştirir.',
  },
  {
    question: 'Satın aldıktan sonra destek alabilecek miyim?',
    answer: 'Tüm ürünlerimizde en az 3 ay teknik destek dahildir. Profesyonel ve Kurumsal paketlerde bu süre 1 yıla kadar çıkmaktadır.',
  },
  {
    question: 'Temalar mobil uyumlu mu?',
    answer: 'Evet, tüm WordPress temalarımız %100 mobil uyumlu (responsive) olup Google\'ın Core Web Vitals standartlarını karşılar.',
  },
  {
    question: 'Ürünleri özelleştirebilir miyim?',
    answer: 'Kesinlikle. Renk, font, logo ve genel tasarım öğelerini markanıza uygun şekilde özelleştiriyoruz. Özel geliştirme talepleri için fiyat teklifi sunuyoruz.',
  },
  {
    question: 'Lisans anlaşması nasıl işliyor?',
    answer: 'Aldığınız ürün için tek seferlik bir site lisansı satın almış olursunuz. Birden fazla sitede kullanım için ayrı lisans gerekmektedir.',
  },
]

export default function UrunlerPage() {
  return (
    <main>
      <PageHero
        badge="Dijital Ürün Mağazası"
        title="WordPress Tema, Eklenti & Hazır Script"
        description="Sektörünüze özel tasarlanmış, kuruluma hazır WordPress temaları, güçlü eklentiler ve tam işlevli web scriptleri."
        searchPlaceholder="Ürün ara... (örn: restoran, seo, randevu)"
        stats={[
          { value: '16+', label: 'Hazır Ürün' },
          { value: '150+', label: 'Tamamlanan Proje' },
          { value: '4.8★', label: 'Ortalama Puan' },
        ]}
      />

      <Suspense>
        <UrunGrid />
      </Suspense>

      <NewsletterCtaSection />

      <FaqSection
        title="Ürünler Hakkında Sık Sorulan Sorular"
        items={faqItems}
      />

      <QuoteCtaSection
        title="Hangi Ürünün Sizin İçin Uygun Olduğundan Emin Değil misiniz?"
        description="Uzman ekibimiz iş modelinizi analiz ederek en uygun ürün ve hizmet paketini önerir. Ücretsiz danışmanlık için hemen iletişime geçin."
        primaryCta="Ücretsiz Danışmanlık Al"
      />
    </main>
  )
}
