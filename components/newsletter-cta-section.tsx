'use client'

import { useState } from 'react'

export default function NewsletterCtaSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <section
      className="bg-[#F8F9FA] py-14"
      aria-labelledby="newsletter-cta-heading"
    >
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
        <span className="inline-block text-[#FF6B35] text-[13px] font-semibold uppercase tracking-widest mb-3">
          Bülten
        </span>
        <h2
          id="newsletter-cta-heading"
          className="text-[24px] sm:text-[30px] font-extrabold text-[#1A1A2E] text-balance"
        >
          Yeni Ürün ve Kampanyalardan Haberdar Olun
        </h2>
        <p className="mt-3 text-[#6B7280] text-[15px] leading-relaxed">
          Haftada en fazla 1 e-posta. Spam yok. İstediğiniz zaman iptal edebilirsiniz.
        </p>

        {submitted ? (
          <div className="mt-8 inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-6 py-3 rounded-xl font-semibold text-[15px]">
            Aboneniz kaydedildi, tesekkurler!
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-7 flex flex-col sm:flex-row gap-3"
            aria-label="Bülten abonelik formu"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresiniz"
              className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-[15px] text-[#1A1A2E] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
              aria-label="E-posta adresiniz"
            />
            <button
              type="submit"
              className="bg-[#FF6B35] text-white px-6 py-3 rounded-xl font-bold text-[15px] hover:bg-[#e55a2b] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6B35] whitespace-nowrap"
            >
              Abone Ol
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
