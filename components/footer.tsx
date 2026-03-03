import Link from 'next/link'
import { Phone, Mail, Clock, Instagram, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react'
import NewsletterForm from '@/components/newsletter-form'

const quickLinks = [
  { label: 'Ana Sayfa', href: '/' },
  { label: 'Ürünler', href: '/urunler' },
  { label: 'Araçlar', href: '/araclar' },
  { label: 'Blog', href: '/blog' },
  { label: 'İletişim', href: '/iletisim' },
  { label: 'Gizlilik Politikası', href: '/gizlilik' },
  { label: 'KVKK', href: '/kvkk' },
]

const serviceLinks = [
  { label: 'WordPress Tasarım', href: '/iletisim' },
  { label: 'Hız Optimizasyonu', href: '/iletisim' },
  { label: 'Güvenlik Temizliği', href: '/iletisim' },
  { label: 'SEO Hizmetleri', href: '/iletisim' },
  { label: 'Hata Giderme', href: '/iletisim' },
  { label: 'UI/UX Tasarım', href: '/iletisim' },
]

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/webtasarimevi' },
  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com/webtasarimevi' },
  { icon: Twitter, label: 'Twitter / X', href: 'https://twitter.com/webtasarimevi' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/company/webtasarimevi' },
  { icon: Youtube, label: 'YouTube', href: 'https://youtube.com/@webtasarimevi' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0F0F1A] text-white" aria-label="Site alt bilgisi">
      {/* Top Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 – Brand */}
          <div>
            <Link href="/" className="flex items-center gap-0.5 mb-4" aria-label="WebTasarımEvi Ana Sayfa">
              <span className="text-[#FF6B35] font-mono font-black mr-1" aria-hidden="true">{'</>'}</span>
              <span className="text-[20px] font-extrabold text-white">Web</span>
              <span className="text-[20px] font-extrabold text-[#FF6B35]">Tasarım</span>
              <span className="text-[20px] font-extrabold text-white">Evi</span>
            </Link>
            <p className="text-[14px] text-white/70 max-w-[240px] leading-relaxed mb-4">
              WordPress tasarım, SEO ve teknik destek alanında uzman dijital ajans.
            </p>
            <nav className="flex items-center gap-2" aria-label="Sosyal medya">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-white/70 hover:bg-[#FF6B35] hover:text-white transition-all duration-200"
                >
                  <Icon size={15} aria-hidden="true" />
                </a>
              ))}
            </nav>
          </div>

          {/* Column 2 – Quick Links */}
          <div>
            <h3 className="text-[16px] font-semibold mb-4 pb-2 border-b-2 border-[#FF6B35] inline-block">
              Hızlı Linkler
            </h3>
            <ul className="flex flex-col gap-2">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-[14px] text-white/70 hover:text-[#FF6B35] hover:opacity-100 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 – Services */}
          <div>
            <h3 className="text-[16px] font-semibold mb-4 pb-2 border-b-2 border-[#FF6B35] inline-block">
              Hizmetlerimiz
            </h3>
            <ul className="flex flex-col gap-2">
              {serviceLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-[14px] text-white/70 hover:text-[#FF6B35] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 – Contact + Newsletter */}
          <div>
            <h3 className="text-[16px] font-semibold mb-4 pb-2 border-b-2 border-[#FF6B35] inline-block">
              Bize Ulaşın
            </h3>
            <ul className="flex flex-col gap-3 mb-6">
              <li>
                <a
                  href="tel:08503033132"
                  className="flex items-center gap-2 text-[14px] text-white/70 hover:text-[#FF6B35] transition-colors"
                >
                  <Phone size={14} aria-hidden="true" />
                  0850 303 31 32
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@webtasarimevi.com.tr"
                  className="flex items-center gap-2 text-[14px] text-white/70 hover:text-[#FF6B35] transition-colors"
                >
                  <Mail size={14} aria-hidden="true" />
                  info@webtasarimevi.com.tr
                </a>
              </li>
              <li className="flex items-center gap-2 text-[14px] text-white/70">
                <Clock size={14} aria-hidden="true" />
                Hafta içi 09:00 - 18:00
              </li>
            </ul>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[13px] text-white/60">
            © 2025 WebTasarımEvi. Tüm hakları saklıdır.
          </p>
          <span className="text-[13px] text-white/60 flex items-center gap-1">
            <span aria-hidden="true">🇹🇷</span> Türkiye&apos;den Hizmet
          </span>
          <nav className="flex items-center gap-4" aria-label="Yasal bağlantılar">
            {['Gizlilik', 'KVKK', 'Çerez Politikası'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(/ /g, '-')}`}
                className="text-[13px] text-white/60 hover:text-white transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
