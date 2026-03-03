'use client'

import { useCallback, useState } from 'react'
import { Upload, Download } from 'lucide-react'

const SIZES = [16, 32, 48, 64, 128, 192, 256]

interface FaviconEntry {
  size: number
  dataUrl: string
}

export default function FaviconPage() {
  const [original, setOriginal] = useState<string | null>(null)
  const [favicons, setFavicons] = useState<FaviconEntry[]>([])
  const [dragging, setDragging] = useState(false)

  const processImage = useCallback((file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const src = e.target!.result as string
      setOriginal(src)
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        const entries: FaviconEntry[] = SIZES.map((size) => {
          const canvas = document.createElement('canvas')
          canvas.width = size
          canvas.height = size
          const ctx = canvas.getContext('2d')!
          ctx.drawImage(img, 0, 0, size, size)
          return { size, dataUrl: canvas.toDataURL('image/png') }
        })
        setFavicons(entries)
      }
      img.src = src
    }
    reader.readAsDataURL(file)
  }, [])

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file?.type.startsWith('image/')) processImage(file)
  }

  const download = (entry: FaviconEntry) => {
    const a = document.createElement('a')
    a.href = entry.dataUrl
    a.download = `favicon-${entry.size}x${entry.size}.png`
    a.click()
  }

  const downloadAll = () => favicons.forEach(download)

  return (
    <main>
      <section className="bg-[#1A1A2E] py-14 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="text-[#FF6B35] text-[13px] font-semibold uppercase tracking-wide">Ücretsiz Araç</span>
          <h1 className="mt-2 text-[36px] sm:text-[44px] font-extrabold text-white text-balance">
            Favicon Oluşturucu
          </h1>
          <p className="mt-2 text-white/70 text-[16px]">
            Görselinizden tüm boyutlarda favicon dosyaları oluşturun. Ücretsiz.
          </p>
        </div>
      </section>

      <section className="py-12 bg-[#F8F9FA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Drop Zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => document.getElementById('favicon-input')?.click()}
            className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200 mb-8 ${
              dragging
                ? 'border-[#FF6B35] bg-[#FFF3EE]'
                : 'border-gray-300 bg-white hover:border-[#FF6B35] hover:bg-[#FFF3EE]/40'
            }`}
            role="button"
            aria-label="Favicon oluşturmak için resim yükleyin"
          >
            <input
              id="favicon-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) processImage(file)
              }}
            />
            {original ? (
              <div className="flex flex-col items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={original} alt="Yüklenen resim" className="w-20 h-20 rounded-xl object-cover border border-gray-200" />
                <p className="text-[14px] text-[#6B7280]">Farklı resim yüklemek için tıklayın</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <Upload size={40} className="text-[#FF6B35]" aria-hidden="true" />
                <p className="text-[16px] font-semibold text-[#1A1A2E]">
                  Resim yüklemek için tıklayın veya sürükleyin
                </p>
                <p className="text-[13px] text-[#6B7280]">PNG, JPEG, SVG desteklenir. Kare resim önerilir.</p>
              </div>
            )}
          </div>

          {/* Favicons Grid */}
          {favicons.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-[16px] font-bold text-[#1A1A2E]">Oluşturulan Faviconlar</h2>
                <button
                  onClick={downloadAll}
                  className="flex items-center gap-2 bg-[#FF6B35] text-white px-4 py-2 rounded-lg text-[13px] font-semibold hover:bg-[#e55a2b] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                >
                  <Download size={14} aria-hidden="true" />
                  Tümünü İndir
                </button>
              </div>
              <div className="p-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {favicons.map((entry) => (
                  <div
                    key={entry.size}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl border border-gray-100 hover:border-[#FF6B35] transition-colors group"
                  >
                    <div className="w-16 h-16 flex items-center justify-center bg-gray-50 rounded-lg">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={entry.dataUrl}
                        alt={`${entry.size}x${entry.size} favicon`}
                        style={{ width: Math.min(entry.size, 48), height: Math.min(entry.size, 48) }}
                        className="object-contain"
                      />
                    </div>
                    <p className="text-[12px] font-semibold text-[#374151]">
                      {entry.size}×{entry.size}
                    </p>
                    <button
                      onClick={() => download(entry)}
                      className="text-[12px] text-[#FF6B35] font-medium hover:underline focus:outline-none focus:underline"
                      aria-label={`${entry.size}x${entry.size} favicon indir`}
                    >
                      İndir
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Info */}
          <div className="mt-8 bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="text-[15px] font-bold text-[#1A1A2E] mb-3">Hangi Boyutu Kullanmalıyım?</h2>
            <ul className="space-y-2 text-[13px] text-[#374151]">
              <li><span className="font-semibold text-[#FF6B35]">16×16 &amp; 32×32</span> — Tarayıcı sekme ikonları</li>
              <li><span className="font-semibold text-[#FF6B35]">48×48</span> — Windows görev çubuğu</li>
              <li><span className="font-semibold text-[#FF6B35]">192×192</span> — Android PWA ikonu</li>
              <li><span className="font-semibold text-[#FF6B35]">256×256</span> — Masaüstü kısayolu</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}
