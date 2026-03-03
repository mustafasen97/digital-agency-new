'use client'

import { useState } from 'react'
import { Search, CheckCircle, XCircle, AlertCircle, ExternalLink } from 'lucide-react'

interface SeoResult {
  url: string
  title: { value: string; length: number; ok: boolean }
  description: { value: string; length: number; ok: boolean }
  h1Count: number
  canonical: string
  score: number
  checks: { label: string; pass: boolean; note: string }[]
}

function analyzeSeo(url: string): SeoResult {
  const domain = url.replace(/https?:\/\//, '').split('/')[0]
  const title = `${domain} - Web Sitesi`
  const desc = `${domain} hakkında bilgi edinin. Hizmetlerimizi keşfedin.`
  const titleLen = title.length
  const descLen = desc.length
  const h1Count = 1

  const checks = [
    { label: 'HTTPS protokolü', pass: url.startsWith('https'), note: url.startsWith('https') ? 'Siteniz güvenli.' : 'HTTPS\'e geçiş yapın.' },
    { label: 'Title etiketi', pass: titleLen >= 30 && titleLen <= 60, note: `Uzunluk: ${titleLen} karakter (ideal: 30-60)` },
    { label: 'Meta açıklaması', pass: descLen >= 120 && descLen <= 160, note: `Uzunluk: ${descLen} karakter (ideal: 120-160)` },
    { label: 'Tek H1 etiketi', pass: h1Count === 1, note: h1Count === 1 ? 'Sayfada tek H1 var.' : `${h1Count} H1 etiketi bulundu.` },
    { label: 'Canonical URL', pass: true, note: 'Canonical etiketi mevcut.' },
    { label: 'Mobil uyumluluk', pass: true, note: 'Viewport meta etiketi mevcut.' },
    { label: 'Yapılandırılmış veri', pass: false, note: 'Schema.org işaretlemesi bulunamadı.' },
  ]

  const passed = checks.filter((c) => c.pass).length
  const score = Math.round((passed / checks.length) * 100)

  return {
    url,
    title: { value: title, length: titleLen, ok: titleLen >= 30 && titleLen <= 60 },
    description: { value: desc, length: descLen, ok: descLen >= 120 && descLen <= 160 },
    h1Count,
    canonical: url,
    score,
    checks,
  }
}

function ScoreRing({ score }: { score: number }) {
  const color = score >= 80 ? '#10B981' : score >= 60 ? '#F59E0B' : '#EF4444'
  return (
    <div className="flex flex-col items-center" aria-label={`SEO skoru: ${score}`}>
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center text-[24px] font-extrabold text-white"
        style={{ background: color }}
      >
        {score}
      </div>
      <p className="text-[12px] font-semibold mt-1" style={{ color }}>
        {score >= 80 ? 'İyi' : score >= 60 ? 'Orta' : 'Zayıf'}
      </p>
    </div>
  )
}

export default function SeoAnalizPage() {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState<SeoResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const analyze = () => {
    let cleanUrl = url.trim()
    if (!cleanUrl) return
    if (!cleanUrl.startsWith('http')) cleanUrl = 'https://' + cleanUrl
    try {
      new URL(cleanUrl)
      setError('')
    } catch {
      setError('Geçerli bir URL giriniz.')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setResult(analyzeSeo(cleanUrl))
      setLoading(false)
    }, 1200)
  }

  return (
    <main>
      <section className="bg-[#1A1A2E] py-14 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="text-[#FF6B35] text-[13px] font-semibold uppercase tracking-wide">Ücretsiz Araç</span>
          <h1 className="mt-2 text-[36px] sm:text-[44px] font-extrabold text-white text-balance">
            SEO Analiz Aracı
          </h1>
          <p className="mt-2 text-white/70 text-[16px]">
            Web sitenizin SEO durumunu analiz edin, eksiklikleri keşfedin.
          </p>
        </div>
      </section>

      <section className="py-12 bg-[#F8F9FA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* URL Input */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 mb-6">
            <label htmlFor="url-input" className="text-[15px] font-semibold text-[#1A1A2E] block mb-3">
              Web Sitesi URL&apos;si
            </label>
            <div className="flex gap-2">
              <input
                id="url-input"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && analyze()}
                placeholder="https://siteniz.com"
                className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#FF6B35] placeholder:text-[#6B7280]"
                aria-describedby={error ? 'url-error' : undefined}
              />
              <button
                onClick={analyze}
                disabled={loading || !url}
                className="flex items-center gap-2 bg-[#FF6B35] text-white px-5 py-2.5 rounded-lg font-semibold text-[14px] hover:bg-[#e55a2b] disabled:opacity-60 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
              >
                {loading ? (
                  <Search size={16} className="animate-spin" aria-hidden="true" />
                ) : (
                  <Search size={16} aria-hidden="true" />
                )}
                {loading ? 'Analiz...' : 'Analiz Et'}
              </button>
            </div>
            {error && (
              <p id="url-error" className="mt-2 text-[13px] text-red-500" role="alert">{error}</p>
            )}
            <p className="mt-2 text-[12px] text-[#6B7280]">
              Not: Bu araç demo analiz sonuçları gösterir. Gerçek site verisi için profesyonel SEO hizmetimizden yararlanın.
            </p>
          </div>

          {/* Results */}
          {result && (
            <div className="space-y-5">
              {/* Score */}
              <div className="bg-white rounded-xl border border-gray-100 p-6 flex items-center gap-6 flex-wrap">
                <ScoreRing score={result.score} />
                <div className="flex-1">
                  <h2 className="text-[18px] font-bold text-[#1A1A2E] mb-1">SEO Analiz Sonucu</h2>
                  <a
                    href={result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[13px] text-[#FF6B35] hover:underline"
                  >
                    <ExternalLink size={12} aria-hidden="true" />
                    {result.url}
                  </a>
                  <p className="text-[13px] text-[#6B7280] mt-1">
                    {result.checks.filter((c) => c.pass).length}/{result.checks.length} kontrol geçildi
                  </p>
                </div>
              </div>

              {/* Checks */}
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                  <h2 className="text-[16px] font-bold text-[#1A1A2E]">Detaylı Kontroller</h2>
                </div>
                <ul>
                  {result.checks.map((check, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 px-5 py-3.5 border-b border-gray-50 last:border-0"
                    >
                      {check.pass ? (
                        <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" aria-label="Geçti" />
                      ) : (
                        <XCircle size={18} className="text-red-400 shrink-0 mt-0.5" aria-label="Başarısız" />
                      )}
                      <div>
                        <p className="text-[14px] font-semibold text-[#1A1A2E]">{check.label}</p>
                        <p className="text-[12px] text-[#6B7280] mt-0.5">{check.note}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Meta Info */}
              <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
                <h2 className="text-[16px] font-bold text-[#1A1A2E]">Meta Bilgileri</h2>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[13px] font-semibold text-[#374151]">Title Etiketi</span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${result.title.ok ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                      {result.title.length} karakter
                    </span>
                  </div>
                  <p className="text-[13px] text-[#6B7280] bg-gray-50 px-3 py-2 rounded-lg">{result.title.value}</p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[13px] font-semibold text-[#374151]">Meta Açıklaması</span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${result.description.ok ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                      {result.description.length} karakter
                    </span>
                  </div>
                  <p className="text-[13px] text-[#6B7280] bg-gray-50 px-3 py-2 rounded-lg">{result.description.value}</p>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-[#FFF3EE] border border-orange-200 rounded-xl p-5 flex items-start gap-3">
                <AlertCircle size={20} className="text-[#FF6B35] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-[14px] font-semibold text-[#1A1A2E]">Profesyonel SEO Hizmeti Alın</p>
                  <p className="text-[13px] text-[#6B7280] mt-0.5">
                    Daha kapsamlı SEO analizi ve optimizasyonu için ekibimizle iletişime geçin.
                  </p>
                  <a
                    href="/iletisim"
                    className="inline-block mt-3 bg-[#FF6B35] text-white px-4 py-2 rounded-lg text-[13px] font-semibold hover:bg-[#e55a2b] transition-colors"
                  >
                    Teklif Al →
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
