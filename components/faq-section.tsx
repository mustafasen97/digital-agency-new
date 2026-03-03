'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface FaqItem {
  question: string
  answer: string
}

interface FaqSectionProps {
  title?: string
  items: FaqItem[]
  dark?: boolean
}

export default function FaqSection({
  title = 'Sıkça Sorulan Sorular',
  items,
  dark = false,
}: FaqSectionProps) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section
      className={`py-16 ${dark ? 'bg-[#0E1628]' : 'bg-white'}`}
      aria-labelledby="faq-heading"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2
            id="faq-heading"
            className={`text-[28px] sm:text-[34px] font-extrabold text-balance ${
              dark ? 'text-white' : 'text-[#1A1A2E]'
            }`}
          >
            {title}
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {items.map((item, i) => (
            <div
              key={i}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                dark
                  ? open === i
                    ? 'border-[#FF6B35] bg-white/5'
                    : 'border-white/10 bg-white/5'
                  : open === i
                  ? 'border-[#FF6B35] bg-[#FFF3EE]'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <button
                className={`w-full flex items-center justify-between gap-4 px-6 py-4 text-left font-semibold text-[15px] focus:outline-none ${
                  dark ? 'text-white' : 'text-[#1A1A2E]'
                }`}
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span>{item.question}</span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 transition-transform duration-300 ${
                    open === i ? 'rotate-180 text-[#FF6B35]' : dark ? 'text-white/50' : 'text-[#6B7280]'
                  }`}
                  aria-hidden="true"
                />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p
                      className={`px-6 pb-5 text-[14px] leading-relaxed ${
                        dark ? 'text-white/70' : 'text-[#6B7280]'
                      }`}
                    >
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
