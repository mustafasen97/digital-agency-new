import type { Metadata } from 'next'
import PageHero from '@/components/page-hero'
import ContactForm from '@/components/iletisim/contact-form'
import ContactInfo from '@/components/iletisim/contact-info'
import ContactFeatures from '@/components/iletisim/contact-features'
import FaqSection from '@/components/faq-section'

export const metadata: Metadata = {
  title: 'İletişim - Ücretsiz Teklif Alın | WebTasarımEvi',
  description:
    'WebTasarımEvi ile iletişime geçin. Ücretsiz danışmanlık için formu doldurun, 24 saat içinde size özel teklif hazırlayalım.',
  alternates: { canonical: 'https://webtasarimevi.com.tr/iletisim' },
  openGraph: {
    title: 'İletişim | WebTasarımEvi',
    description: 'Ücretsiz danışmanlık için hemen iletişime geçin.',
  },
}

const faqItems = [
  {
    question: 'Teklif almak ücretsiz mi?',
    answer: 'Evet, teklif ve danışmanlık hizmetimiz tamamen ücretsizdir. Formu doldurmanız veya WhatsApp\'tan yazmanız yeterlidir.',
  },
  {
    question: 'Teklif ne kadar sürede gelir?',
    answer: 'Mesai saatleri içinde gelen talepler genellikle 2-4 saat içinde yanıtlanır. Hafta sonu ve resmi tatil dışında 24 saat içinde mutlaka dönüş yapılır.',
  },
  {
    question: 'Yurt dışındaki müşterilerle çalışıyor musunuz?',
    answer: 'Evet, Türkiye dışındaki müşterilerimize de hizmet veriyoruz. Uluslararası ödeme yöntemleri ve çoklu dil desteği sunuyoruz.',
  },
  {
    question: 'Proje teslim süresi ne kadar?',
    answer: 'Hazır temalar 3-5 iş günü içinde teslim edilir. Özel tasarım projelerinde süre kapsam ve karmaşıklığa göre 1-4 hafta arasında değişir.',
  },
  {
    question: 'Ödeme nasıl yapılır?',
    answer: 'Banka havalesi, EFT veya kredi kartı ile ödeme kabul ediyoruz. Büyük projelerde %50 peşinat, kalan %50 teslimatta alınır.',
  },
]

export default function IletisimPage() {
  return (
    <main>
      <PageHero
        badge="Bize Ulaşın"
        title="Projenizi Konuşalım"
        description="Ücretsiz danışmanlık için formu doldurun. 24 saat içinde size özel teklif hazırlayalım."
        cta={{ label: 'Teklif Formu', href: '#iletisim-formu' }}
        secondaryCta={{ label: 'WhatsApp\'tan Yaz', href: 'https://wa.me/905000000000' }}
        stats={[
          { value: '<2sa', label: 'Ortalama Yanıt' },
          { value: '200+', label: 'Mutlu Müşteri' },
          { value: '%100', label: 'Memnuniyet' },
        ]}
      />

      <section className="py-16 bg-[#F8F9FA]" id="iletisim-formu" aria-label="İletişim formu ve bilgileri">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>

      <ContactFeatures />

      <FaqSection title="İletişim Hakkında Sık Sorulan Sorular" items={faqItems} />
    </main>
  )
}
