'use client'

import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const services = [
  'WordPress Tasarım',
  'Hız Optimizasyonu',
  'Güvenlik & Temizlik',
  'SEO Optimizasyonu',
  'Hata Giderme',
  'UI/UX Tasarım',
  'E-Ticaret Kurulumu',
  'Diğer',
]

interface FormState {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

const defaultForm: FormState = {
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(defaultForm)
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const newErrors: Partial<FormState> = {}
    if (!form.name.trim()) newErrors.name = 'Ad Soyad zorunludur.'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Geçerli bir e-posta giriniz.'
    }
    if (!form.service) newErrors.service = 'Lütfen bir hizmet seçin.'
    if (!form.message.trim() || form.message.trim().length < 20) {
      newErrors.message = 'Mesajınız en az 20 karakter olmalıdır.'
    }
    return newErrors
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const v = validate()
    if (Object.keys(v).length) {
      setErrors(v)
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1200)
  }

  const update = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 bg-white rounded-2xl border border-gray-100 p-10 flex flex-col items-center justify-center text-center min-h-[480px]"
      >
        <CheckCircle size={64} className="text-green-500 mb-4" aria-hidden="true" />
        <h2 className="text-[26px] font-extrabold text-[#1A1A2E] mb-2">Mesajınız Alındı!</h2>
        <p className="text-[#6B7280] text-[16px] max-w-sm leading-relaxed">
          En kısa sürede, genellikle 24 saat içinde size geri döneceğiz. Teşekkür ederiz.
        </p>
        <button
          onClick={() => { setSubmitted(false); setForm(defaultForm) }}
          className="mt-6 text-[#FF6B35] font-semibold hover:underline focus:outline-none focus:underline"
        >
          Yeni mesaj gönder
        </button>
      </motion.div>
    )
  }

  const inputClass = (field: keyof FormState) =>
    `w-full border rounded-xl px-4 py-3 text-[14px] text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition-colors placeholder:text-[#9CA3AF] ${
      errors[field] ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'
    }`

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex-1"
    >
      <div className="bg-white rounded-2xl border border-gray-100 p-7 sm:p-10 shadow-sm">
        <h2 className="text-[22px] font-extrabold text-[#1A1A2E] mb-6">Ücretsiz Teklif Alın</h2>

        <form onSubmit={handleSubmit} noValidate aria-label="İletişim formu">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {/* Name */}
            <div>
              <label htmlFor="contact-name" className="block text-[13px] font-semibold text-[#374151] mb-1.5">
                Ad Soyad <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                placeholder="Ahmet Kaya"
                value={form.name}
                onChange={update('name')}
                className={inputClass('name')}
                autoComplete="name"
                aria-required="true"
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              <AnimatePresence>
                {errors.name && (
                  <motion.p
                    id="name-error"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-[12px] text-red-500 mt-1"
                    role="alert"
                  >
                    {errors.name}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="contact-email" className="block text-[13px] font-semibold text-[#374151] mb-1.5">
                E-posta <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                placeholder="ornek@email.com"
                value={form.email}
                onChange={update('email')}
                className={inputClass('email')}
                autoComplete="email"
                aria-required="true"
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    id="email-error"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-[12px] text-red-500 mt-1"
                    role="alert"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {/* Phone */}
            <div>
              <label htmlFor="contact-phone" className="block text-[13px] font-semibold text-[#374151] mb-1.5">
                Telefon
              </label>
              <input
                id="contact-phone"
                type="tel"
                placeholder="0532 000 00 00"
                value={form.phone}
                onChange={update('phone')}
                className={inputClass('phone')}
                autoComplete="tel"
              />
            </div>

            {/* Service */}
            <div>
              <label htmlFor="contact-service" className="block text-[13px] font-semibold text-[#374151] mb-1.5">
                Hizmet Seçin <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <select
                id="contact-service"
                value={form.service}
                onChange={update('service')}
                className={`${inputClass('service')} cursor-pointer`}
                aria-required="true"
                aria-describedby={errors.service ? 'service-error' : undefined}
              >
                <option value="">Hizmet seçin...</option>
                {services.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <AnimatePresence>
                {errors.service && (
                  <motion.p
                    id="service-error"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-[12px] text-red-500 mt-1"
                    role="alert"
                  >
                    {errors.service}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Message */}
          <div className="mb-6">
            <label htmlFor="contact-message" className="block text-[13px] font-semibold text-[#374151] mb-1.5">
              Mesajınız <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <textarea
              id="contact-message"
              rows={5}
              placeholder="Projeniz hakkında bilgi verin..."
              value={form.message}
              onChange={update('message')}
              className={`${inputClass('message')} resize-none`}
              aria-required="true"
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            <div className="flex items-center justify-between mt-1">
              <AnimatePresence>
                {errors.message && (
                  <motion.p
                    id="message-error"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-[12px] text-red-500"
                    role="alert"
                  >
                    {errors.message}
                  </motion.p>
                )}
              </AnimatePresence>
              <span className="text-[12px] text-[#6B7280] ml-auto">{form.message.length}/500</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#FF6B35] text-white py-3.5 rounded-xl font-bold text-[16px] hover:bg-[#e55a2b] hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
          >
            {loading ? (
              <>
                <Send size={18} className="animate-spin" aria-hidden="true" />
                Gönderiliyor...
              </>
            ) : (
              <>
                <Send size={18} aria-hidden="true" />
                Gönder
              </>
            )}
          </button>

          <p className="text-[12px] text-[#6B7280] mt-3 text-center">
            Formu göndererek{' '}
            <a href="/gizlilik" className="text-[#FF6B35] hover:underline">
              Gizlilik Politikamızı
            </a>{' '}
            kabul etmiş olursunuz.
          </p>
        </form>
      </div>
    </motion.div>
  )
}
