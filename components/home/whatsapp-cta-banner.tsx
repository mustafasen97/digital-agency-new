import Link from 'next/link'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppCtaBanner() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 my-16" aria-label="WhatsApp iletişim bandı">
      <div className="max-w-7xl mx-auto">
        <div
          className="rounded-2xl px-8 py-12 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{
            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
          }}
        >
          {/* Left */}
          <div className="flex items-start sm:items-center gap-4">
            <MessageCircle size={48} className="text-white shrink-0" aria-hidden="true" />
            <div>
              <h2 className="text-[28px] font-bold text-white text-balance">
                Hızlı Yardım mı Lazım?
              </h2>
              <p className="text-white/90 mt-1 text-[16px]">
                WhatsApp üzerinden bize ulaşın, dakikalar içinde yanıt verelim.
              </p>
            </div>
          </div>

          {/* Right */}
          <a
            href="https://wa.me/905000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-white text-[#128C7E] font-bold px-8 py-4 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white text-[16px]"
          >
            WhatsApp&apos;ta Yaz →
          </a>
        </div>
      </div>
    </section>
  )
}
