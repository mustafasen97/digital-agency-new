'use client'

import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
    }
  }

  if (submitted) {
    return (
      <p className="text-[13px] text-[#FF6B35] font-medium">
        Teşekkürler! Abone oldunuz.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} aria-label="Bülten abonelik formu">
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-posta adresiniz"
          required
          aria-label="E-posta adresiniz"
          className="flex-1 min-w-0 bg-white/10 border border-white/20 text-white placeholder:text-white/50 rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#FF6B35] transition-colors"
        />
        <button
          type="submit"
          className="bg-[#FF6B35] text-white px-4 py-2 rounded-lg text-[13px] font-semibold hover:bg-[#e55a2b] transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
        >
          Abone Ol
        </button>
      </div>
      <p className="text-[12px] text-white/50 mt-1.5">
        Haftalık ipuçları ve kampanyalar için.
      </p>
    </form>
  )
}
