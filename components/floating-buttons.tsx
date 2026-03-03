'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, ArrowUp } from 'lucide-react'

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        aria-label="Sayfanın başına dön"
        className={`w-11 h-11 flex items-center justify-center rounded-full bg-[#1A1A2E] text-white shadow-lg hover:bg-[#FF6B35] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] ${
          showScrollTop
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <ArrowUp size={18} aria-hidden="true" />
      </button>

      {/* WhatsApp */}
      <div className="relative group">
        {/* Pulse ring */}
        <span
          className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring"
          aria-hidden="true"
        />
        <a
          href="https://wa.me/905000000000"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp'ta yaz"
          className="relative w-14 h-14 flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-[#25D366]"
        >
          <MessageCircle size={28} aria-hidden="true" />
        </a>
        {/* Tooltip */}
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#1A1A2E] text-white text-[13px] font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          WhatsApp&apos;ta Yaz
        </span>
      </div>
    </div>
  )
}
