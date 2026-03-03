import type { Metadata } from 'next'
import HeroSection from '@/components/home/hero-section'
import TrustBar from '@/components/home/trust-bar'
import FeaturedProductsSection from '@/components/home/featured-themes-section'
import WhatsAppCtaBanner from '@/components/home/whatsapp-cta-banner'
import ServicesSection from '@/components/home/services-section'
import PricingSection from '@/components/home/pricing-section'
import ToolsTeaserSection from '@/components/home/tools-teaser-section'
import TestimonialsSection from '@/components/home/testimonials-section'
import BlogPreviewSection from '@/components/home/blog-preview-section'
import FinalCtaSection from '@/components/home/final-cta-section'

export const metadata: Metadata = {
  title: 'WebTasarımEvi - WordPress Tema, Eklenti & Hazır Script Mağazası',
  description:
    'Sektörünüze özel WordPress temaları, güçlü eklentiler ve hazır scriptler. 5 yılda 200+ başarılı proje, 4.8 yıldız müşteri memnuniyeti.',
  alternates: { canonical: 'https://webtasarimevi.com.tr' },
  keywords: 'wordpress tema, wordpress eklenti, hazır script, web tasarım, dijital ajans türkiye',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <FeaturedProductsSection />
      <WhatsAppCtaBanner />
      <ServicesSection />
      <PricingSection />
      <ToolsTeaserSection />
      <TestimonialsSection />
      <BlogPreviewSection />
      <FinalCtaSection />
    </>
  )
}
