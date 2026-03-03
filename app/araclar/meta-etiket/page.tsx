'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function MetaEtiketPage() {
  const [fields, setFields] = useState({
    title: '',
    description: '',
    keywords: '',
    ogTitle: '',
    ogDesc: '',
    canonical: '',
    author: '',
  })
  const [copied, setCopied] = useState(false)

  const set = (key: keyof typeof fields) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFields((prev) => ({ ...prev, [key]: e.target.value }))

  const generated = `<!-- Temel Meta Etiketler -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
${fields.title ? `<title>${fields.title}</title>` : '<!-- <title>Başlık giriniz</title> -->'}
${fields.description ? `<meta name="description" content="${fields.description}">` : ''}
${fields.keywords ? `<meta name="keywords" content="${fields.keywords}">` : ''}
${fields.author ? `<meta name="author" content="${fields.author}">` : ''}
${fields.canonical ? `<link rel="canonical" href="${fields.canonical}">` : ''}

<!-- Open Graph / Sosyal Medya -->
<meta property="og:type" content="website">
${fields.canonical ? `<meta property="og:url" content="${fields.canonical}">` : ''}
${(fields.ogTitle || fields.title) ? `<meta property="og:title" content="${fields.ogTitle || fields.title}">` : ''}
${(fields.ogDesc || fields.description) ? `<meta property="og:description" content="${fields.ogDesc || fields.description}">` : ''}

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
${(fields.ogTitle || fields.title) ? `<meta name="twitter:title" content="${fields.ogTitle || fields.title}">` : ''}
${(fields.ogDesc || fields.description) ? `<meta name="twitter:description" content="${fields.ogDesc || fields.description}">` : ''}`
    .split('\n')
    .filter((l) => l.trim())
    .join('\n')

  const copy = () => {
    navigator.clipboard.writeText(generated).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const inputClass =
    'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition-colors placeholder:text-[#9CA3AF]'

  return (
    <main>
      <section className="bg-[#1A1A2E] py-14 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="text-[#FF6B35] text-[13px] font-semibold uppercase tracking-wide">Ücretsiz Araç</span>
          <h1 className="mt-2 text-[36px] sm:text-[44px] font-extrabold text-white text-balance">
            Meta Etiket Oluşturucu
          </h1>
          <p className="mt-2 text-white/70 text-[16px]">
            SEO ve sosyal medya için doğru meta etiketleri oluşturun.
          </p>
        </div>
      </section>

      <section className="py-12 bg-[#F8F9FA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Inputs */}
            <div className="flex-1 bg-white rounded-xl border border-gray-100 p-6 space-y-4">
              <h2 className="text-[16px] font-bold text-[#1A1A2E]">Bilgileri Girin</h2>

              <div>
                <label htmlFor="mt-title" className="block text-[13px] font-semibold text-[#374151] mb-1.5">
                  Sayfa Başlığı
                </label>
                <input id="mt-title" type="text" placeholder="WebTasarımEvi - WordPress Uzmanı" value={fields.title} onChange={set('title')} className={inputClass} maxLength={70} />
                <p className="text-[11px] text-[#6B7280] mt-0.5">{fields.title.length}/70 karakter (ideal: 30-60)</p>
              </div>

              <div>
                <label htmlFor="mt-desc" className="block text-[13px] font-semibold text-[#374151] mb-1.5">Meta Açıklaması</label>
                <textarea id="mt-desc" rows={3} placeholder="Sitenizin kısa açıklaması..." value={fields.description} onChange={set('description')} className={`${inputClass} resize-none`} maxLength={170} />
                <p className="text-[11px] text-[#6B7280] mt-0.5">{fields.description.length}/170 karakter (ideal: 120-160)</p>
              </div>

              <div>
                <label htmlFor="mt-keywords" className="block text-[13px] font-semibold text-[#374151] mb-1.5">Anahtar Kelimeler</label>
                <input id="mt-keywords" type="text" placeholder="wordpress, web tasarım, seo" value={fields.keywords} onChange={set('keywords')} className={inputClass} />
              </div>

              <div>
                <label htmlFor="mt-canonical" className="block text-[13px] font-semibold text-[#374151] mb-1.5">Canonical URL</label>
                <input id="mt-canonical" type="url" placeholder="https://siteniz.com/sayfa" value={fields.canonical} onChange={set('canonical')} className={inputClass} />
              </div>

              <div>
                <label htmlFor="mt-author" className="block text-[13px] font-semibold text-[#374151] mb-1.5">Yazar</label>
                <input id="mt-author" type="text" placeholder="WebTasarımEvi" value={fields.author} onChange={set('author')} className={inputClass} />
              </div>

              <div>
                <label htmlFor="mt-og-title" className="block text-[13px] font-semibold text-[#374151] mb-1.5">OG Başlığı (sosyal medya)</label>
                <input id="mt-og-title" type="text" placeholder="Boş bırakırsanız sayfa başlığı kullanılır" value={fields.ogTitle} onChange={set('ogTitle')} className={inputClass} />
              </div>
            </div>

            {/* Output */}
            <div className="lg:w-96 bg-white rounded-xl border border-gray-100 overflow-hidden flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h2 className="text-[15px] font-bold text-[#1A1A2E]">Oluşturulan Kod</h2>
                <button
                  onClick={copy}
                  className="flex items-center gap-1.5 text-[13px] font-semibold text-[#FF6B35] hover:underline focus:outline-none"
                  aria-label="Kodu kopyala"
                >
                  {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
                  {copied ? 'Kopyalandı!' : 'Kopyala'}
                </button>
              </div>
              <pre className="flex-1 p-4 text-[12px] text-[#374151] font-mono whitespace-pre-wrap break-all overflow-auto bg-gray-50 leading-relaxed">
                {generated}
              </pre>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
