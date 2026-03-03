import { Phone, Mail, Clock, MapPin, Instagram, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react'

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/webtasarimevi' },
  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com/webtasarimevi' },
  { icon: Twitter, label: 'Twitter / X', href: 'https://twitter.com/webtasarimevi' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/company/webtasarimevi' },
  { icon: Youtube, label: 'YouTube', href: 'https://youtube.com/@webtasarimevi' },
]

export default function ContactInfo() {
  return (
    <div className="lg:w-80 shrink-0 flex flex-col gap-5">
      {/* Info Card */}
      <div className="bg-[#1A1A2E] rounded-2xl p-7 text-white">
        <h2 className="text-[20px] font-extrabold mb-5">İletişim Bilgileri</h2>
        <ul className="space-y-4">
          <li>
            <a
              href="tel:08503033132"
              className="flex items-start gap-3 group focus:outline-none"
              aria-label="0850 303 31 32'yi ara"
            >
              <div className="w-9 h-9 rounded-xl bg-[#FF6B35]/20 flex items-center justify-center shrink-0 group-hover:bg-[#FF6B35] transition-colors">
                <Phone size={16} className="text-[#FF6B35] group-hover:text-white transition-colors" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[11px] text-white/50 uppercase tracking-wide font-semibold">Telefon</p>
                <p className="text-[15px] font-semibold group-hover:text-[#FF6B35] transition-colors">
                  0850 303 31 32
                </p>
              </div>
            </a>
          </li>
          <li>
            <a
              href="mailto:info@webtasarimevi.com.tr"
              className="flex items-start gap-3 group focus:outline-none"
              aria-label="info@webtasarimevi.com.tr adresine e-posta gönder"
            >
              <div className="w-9 h-9 rounded-xl bg-[#FF6B35]/20 flex items-center justify-center shrink-0 group-hover:bg-[#FF6B35] transition-colors">
                <Mail size={16} className="text-[#FF6B35] group-hover:text-white transition-colors" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[11px] text-white/50 uppercase tracking-wide font-semibold">E-posta</p>
                <p className="text-[15px] font-semibold group-hover:text-[#FF6B35] transition-colors break-all">
                  info@webtasarimevi.com.tr
                </p>
              </div>
            </a>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FF6B35]/20 flex items-center justify-center shrink-0">
              <Clock size={16} className="text-[#FF6B35]" aria-hidden="true" />
            </div>
            <div>
              <p className="text-[11px] text-white/50 uppercase tracking-wide font-semibold">Çalışma Saatleri</p>
              <p className="text-[15px] font-semibold">Hafta içi 09:00 – 18:00</p>
              <p className="text-[12px] text-white/50 mt-0.5">Cumartesi: 10:00 – 15:00</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FF6B35]/20 flex items-center justify-center shrink-0">
              <MapPin size={16} className="text-[#FF6B35]" aria-hidden="true" />
            </div>
            <div>
              <p className="text-[11px] text-white/50 uppercase tracking-wide font-semibold">Adres</p>
              <p className="text-[15px] font-semibold leading-snug">
                Levent Mah. Büyükdere Cad.
                <br />
                No: 123, Beşiktaş / İstanbul
              </p>
            </div>
          </li>
        </ul>

        {/* Social */}
        <div className="mt-6 pt-5 border-t border-white/10">
          <p className="text-[12px] text-white/50 uppercase tracking-wide font-semibold mb-3">
            Sosyal Medya
          </p>
          <nav className="flex items-center gap-2" aria-label="Sosyal medya bağlantıları">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 text-white/70 hover:bg-[#FF6B35] hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
              >
                <Icon size={15} aria-hidden="true" />
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Map Placeholder */}
      <div
        className="rounded-2xl overflow-hidden bg-gray-200 flex items-center justify-center h-48 border border-gray-100"
        aria-label="Harita konumu — Beşiktaş, İstanbul"
      >
        <div className="text-center">
          <MapPin size={32} className="text-[#FF6B35] mx-auto mb-2" aria-hidden="true" />
          <p className="text-[13px] text-[#6B7280] font-medium">Beşiktaş, İstanbul</p>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] text-[#FF6B35] hover:underline mt-1 block focus:outline-none focus:underline"
          >
            Google Haritalar&apos;da Aç →
          </a>
        </div>
      </div>

      {/* WhatsApp CTA */}
      <a
        href="https://wa.me/905000000000"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 rounded-2xl font-bold text-[15px] hover:bg-[#22c35e] hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#25D366]"
      >
        <span className="text-[22px]" aria-hidden="true">💬</span>
        WhatsApp&apos;ta Hızlı Yardım Al
      </a>
    </div>
  )
}
