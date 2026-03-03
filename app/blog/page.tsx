import type { Metadata } from 'next'
import PageHero from '@/components/page-hero'
import BlogContent from '@/components/blog/blog-content'
import NewsletterCtaSection from '@/components/newsletter-cta-section'
import QuoteCtaSection from '@/components/quote-cta-section'

export const metadata: Metadata = {
  title: 'Blog - WordPress, SEO ve Web Tasarım Rehberleri | WebTasarımEvi',
  description:
    'WordPress kurulumu, SEO optimizasyonu, web tasarım trendleri ve dijital pazarlama hakkında uzman rehberler ve pratik ipuçları.',
  keywords: 'wordpress blog, seo rehber, web tasarım ipuçları, dijital pazarlama',
  alternates: { canonical: 'https://webtasarimevi.com.tr/blog' },
  openGraph: {
    title: 'Blog | WebTasarımEvi',
    description: 'WordPress, SEO ve web tasarım hakkında uzman içerikler.',
  },
}

export default function BlogPage() {
  return (
    <main>
      <PageHero
        badge="Blog & Rehberler"
        title="Son Yazılarımız"
        description="WordPress, SEO, web tasarım ve dijital pazarlama hakkında pratik rehberler. Her hafta yeni içerik."
        stats={[
          { value: '50+', label: 'Makale' },
          { value: '10K+', label: 'Aylık Okuyucu' },
          { value: '4.9★', label: 'İçerik Puanı' },
        ]}
      />

      <BlogContent />

      <NewsletterCtaSection />

      <QuoteCtaSection
        title="Web Sitenizi Büyütmek mi İstiyorsunuz?"
        description="Blog içeriklerimiz faydalı geldiyse, web siteniz için profesyonel destek almayı düşünün. Ücretsiz analiz ve teklif için iletişime geçin."
        primaryCta="Ücretsiz Site Analizi"
        secondaryCta="WhatsApp ile Yaz"
      />
    </main>
  )
}
