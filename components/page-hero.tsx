'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

interface PageHeroProps {
  badge?: string
  title: string
  description?: string
  searchPlaceholder?: string
  stats?: { value: string; label: string }[]
  cta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function PageHero({
  badge,
  title,
  description,
  searchPlaceholder,
  stats,
  cta,
  secondaryCta,
}: PageHeroProps) {
  const [query, setQuery] = useState('')
  const router = useRouter()

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) router.push(`/urunler?q=${encodeURIComponent(query.trim())}`)
  }
  return (
    <section
      className="relative overflow-hidden bg-[#0E1628] py-20 sm:py-24 text-center"
      aria-labelledby="page-hero-heading"
    >
      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,107,53,0.15) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="flex flex-col items-center"
        >
          {badge && (
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 bg-[#FF6B35] text-white text-[13px] font-bold px-4 py-1.5 rounded-full mb-6">
                {badge}
              </span>
            </motion.div>
          )}

          <motion.h1
            id="page-hero-heading"
            variants={fadeUp}
            className="text-[36px] sm:text-[52px] lg:text-[60px] font-extrabold text-white leading-[1.1] text-balance"
          >
            {title}
          </motion.h1>

          {description && (
            <motion.p
              variants={fadeUp}
              className="mt-5 text-[16px] sm:text-[18px] text-white/70 max-w-2xl mx-auto leading-relaxed"
            >
              {description}
            </motion.p>
          )}

          {searchPlaceholder && (
            <motion.div variants={fadeUp} className="mt-8 w-full max-w-xl">
              <form onSubmit={handleSearch} role="search">
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={searchPlaceholder}
                    className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 rounded-2xl pl-11 pr-5 py-4 text-[15px] focus:outline-none focus:border-[#FF6B35] focus:bg-white/15 transition-all"
                    aria-label={searchPlaceholder}
                  />
                </div>
              </form>
            </motion.div>
          )}

          {(cta || secondaryCta) && (
            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4 mt-8">
              {cta && (
                <Link
                  href={cta.href}
                  className="inline-flex items-center gap-2 bg-[#FF6B35] text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-[#e55a2b] hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                >
                  {cta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center gap-2 border border-white/30 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </motion.div>
          )}

          {stats && stats.length > 0 && (
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center justify-center gap-8 mt-10 pt-8 border-t border-white/10 w-full"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-[28px] font-extrabold text-white">{stat.value}</div>
                  <div className="text-[13px] text-white/60 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
