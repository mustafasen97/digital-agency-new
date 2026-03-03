'use client'

import { useState } from 'react'
import { Copy, Check, Download } from 'lucide-react'

export default function RobotsTxtPage() {
  const [domain, setDomain] = useState('')
  const [allowAll, setAllowAll] = useState(true)
  const [blockAdmin, setBlockAdmin] = useState(true)
  const [blockPlugins, setBlockPlugins] = useState(true)
  const [blockIncludes, setBlockIncludes] = useState(true)
  const [sitemapPath, setSitemapPath] = useState('/sitemap.xml')
  const [copied, setCopied] = useState(false)

  const lines: string[] = [
    'User-agent: *',
    allowAll ? 'Allow: /' : 'Disallow: /',
  ]
  if (blockAdmin) lines.push('Disallow: /wp-admin/')
  if (blockPlugins) lines.push('Disallow: /wp-content/plugins/')
  if (blockIncludes) lines.push('Disallow: /wp-includes/')
  lines.push('Allow: /wp-admin/admin-ajax.php')
  lines.push('')
  if (domain && sitemapPath) {
    const cleanDomain = domain.replace(/\/$/, '')
    lines.push(`Sitemap: ${cleanDomain}${sitemapPath}`)
  }

  const content = lines.join('\n')

  const copy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const download = () => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'robots.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  const checkboxClass = 'w-4 h-4 accent-[#FF6B35] cursor-pointer'
  const inputClass = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition-colors placeholder:text-[#9CA3AF]'

  return (
    <main>
      <section className="bg-[#1A1A2E] py-14 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="text-[#FF6B35] text-[13px] font-semibold uppercase tracking-wide">Ücretsiz Araç</span>
          <h1 className="mt-2 text-[36px] sm:text-[44px] font-extrabold text-white text-balance">
            Robots.txt Oluşturucu
          </h1>
          <p className="mt-2 text-white/70 text-[16px]">
            WordPress siteniz için doğru robots.txt dosyasını oluşturun.
          </p>
        </div>
      </section>

      <section className="py-12 bg-[#F8F9FA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Config */}
            <div className="flex-1 bg-white rounded-xl border border-gray-100 p-6 space-y-5">
              <h2 className="text-[16px] font-bold text-[#1A1A2E]">Ayarlar</h2>

              <div>
                <label htmlFor="rt-domain" className="block text-[13px] font-semibold text-[#374151] mb-1.5">
                  Site URL&apos;si
                </label>
                <input
                  id="rt-domain"
                  type="url"
                  placeholder="https://siteniz.com"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="rt-sitemap" className="block text-[13px] font-semibold text-[#374151] mb-1.5">
                  Sitemap Yolu
                </label>
                <input
                  id="rt-sitemap"
                  type="text"
                  placeholder="/sitemap.xml"
                  value={sitemapPath}
                  onChange={(e) => setSitemapPath(e.target.value)}
                  className={inputClass}
                />
              </div>

              <fieldset>
                <legend className="text-[13px] font-bold text-[#1A1A2E] uppercase tracking-wide mb-3">
                  Erişim Kuralları
                </legend>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={allowAll}
                      onChange={(e) => setAllowAll(e.target.checked)}
                      className={checkboxClass}
                    />
                    <span className="text-[14px] text-[#374151]">Tüm sayfalara izin ver (Allow: /)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={blockAdmin}
                      onChange={(e) => setBlockAdmin(e.target.checked)}
                      className={checkboxClass}
                    />
                    <span className="text-[14px] text-[#374151]">WordPress admin sayfasını engelle (/wp-admin/)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={blockPlugins}
                      onChange={(e) => setBlockPlugins(e.target.checked)}
                      className={checkboxClass}
                    />
                    <span className="text-[14px] text-[#374151]">Eklenti klasörünü engelle (/wp-content/plugins/)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={blockIncludes}
                      onChange={(e) => setBlockIncludes(e.target.checked)}
                      className={checkboxClass}
                    />
                    <span className="text-[14px] text-[#374151]">WordPress includes klasörünü engelle</span>
                  </label>
                </div>
              </fieldset>
            </div>

            {/* Output */}
            <div className="lg:w-80 bg-white rounded-xl border border-gray-100 overflow-hidden flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-gray-100 flex-wrap gap-2">
                <h2 className="text-[15px] font-bold text-[#1A1A2E]">robots.txt</h2>
                <div className="flex gap-2">
                  <button
                    onClick={copy}
                    className="flex items-center gap-1 text-[12px] font-semibold text-[#FF6B35] border border-[#FF6B35] px-3 py-1 rounded-lg hover:bg-[#FFF3EE] transition-colors focus:outline-none"
                    aria-label="Kodu kopyala"
                  >
                    {copied ? <Check size={12} aria-hidden="true" /> : <Copy size={12} aria-hidden="true" />}
                    {copied ? 'Kopyalandı' : 'Kopyala'}
                  </button>
                  <button
                    onClick={download}
                    className="flex items-center gap-1 text-[12px] font-semibold bg-[#FF6B35] text-white px-3 py-1 rounded-lg hover:bg-[#e55a2b] transition-colors focus:outline-none"
                    aria-label="robots.txt dosyasını indir"
                  >
                    <Download size={12} aria-hidden="true" />
                    İndir
                  </button>
                </div>
              </div>
              <pre className="flex-1 p-4 text-[13px] text-[#374151] font-mono whitespace-pre-wrap bg-gray-50 leading-relaxed">
                {content}
              </pre>
            </div>
          </div>

          {/* How to use */}
          <div className="mt-8 bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="text-[15px] font-bold text-[#1A1A2E] mb-3">Robots.txt Nasıl Yüklenir?</h2>
            <ol className="space-y-2 text-[14px] text-[#374151] list-decimal list-inside">
              <li>Yukarıdaki ayarları doldurun ve &quot;İndir&quot; butonuna tıklayın.</li>
              <li>İndirilen <code className="bg-gray-100 px-1 rounded text-[13px]">robots.txt</code> dosyasını sitenizin ana dizinine (public_html) yükleyin.</li>
              <li>cPanel veya FTP ile mevcut robots.txt dosyasını değiştirin.</li>
              <li>Google Search Console&apos;dan test edip doğrulayın.</li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  )
}
