import Link from 'next/link'

interface QuoteCtaSectionProps {
  title?: string
  description?: string
  primaryCta?: string
  secondaryCta?: string
}

export default function QuoteCtaSection({
  title = 'Projeniz İçin Ücretsiz Teklif Alın',
  description = 'Uzman ekibimiz ihtiyaçlarınızı analiz ederek size özel fiyat teklifi hazırlar. 24 saat içinde yanıt garantisi.',
  primaryCta = 'Teklif İste',
  secondaryCta = 'WhatsApp ile Yaz',
}: QuoteCtaSectionProps) {
  return (
    <section
      className="bg-[#0E1628] py-16"
      aria-labelledby="quote-cta-heading"
    >
      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block text-[#FF6B35] text-[13px] font-semibold uppercase tracking-widest mb-4">
          Teklif Al
        </span>
        <h2
          id="quote-cta-heading"
          className="text-[28px] sm:text-[36px] font-extrabold text-white text-balance"
        >
          {title}
        </h2>
        <p className="mt-4 text-white/70 text-[16px] leading-relaxed max-w-xl mx-auto">
          {description}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 bg-[#FF6B35] text-white px-8 py-3.5 rounded-xl font-bold text-[15px] hover:bg-[#e55a2b] hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
          >
            {primaryCta} →
          </Link>
          <a
            href="https://wa.me/905000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[#25D366] text-[#25D366] px-8 py-3.5 rounded-xl font-bold text-[15px] hover:bg-[#25D366] hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#25D366]"
          >
            {secondaryCta}
          </a>
        </div>
        <p className="mt-5 text-[13px] text-white/40">
          Ucretsiz danismanlik · 24 saat icerisinde yanit · Sozlesmeli hizmet
        </p>
      </div>
    </section>
  )
}
