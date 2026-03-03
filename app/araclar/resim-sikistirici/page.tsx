'use client'

import { useCallback, useState } from 'react'
import { Upload, Download, RefreshCw, ImageIcon } from 'lucide-react'

interface CompressedImage {
  name: string
  originalSize: number
  compressedSize: number
  dataUrl: string
  savings: number
}

export default function ResimSikistiriciPage() {
  const [images, setImages] = useState<CompressedImage[]>([])
  const [quality, setQuality] = useState(80)
  const [dragging, setDragging] = useState(false)
  const [processing, setProcessing] = useState(false)

  const compress = useCallback(
    (file: File) => {
      return new Promise<CompressedImage>((resolve) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const img = new Image()
          img.crossOrigin = 'anonymous'
          img.onload = () => {
            const canvas = document.createElement('canvas')
            canvas.width = img.width
            canvas.height = img.height
            const ctx = canvas.getContext('2d')!
            ctx.drawImage(img, 0, 0)
            const dataUrl = canvas.toDataURL('image/jpeg', quality / 100)
            const compressedSize = Math.round((dataUrl.length * 3) / 4)
            resolve({
              name: file.name,
              originalSize: file.size,
              compressedSize,
              dataUrl,
              savings: Math.round((1 - compressedSize / file.size) * 100),
            })
          }
          img.src = e.target!.result as string
        }
        reader.readAsDataURL(file)
      })
    },
    [quality]
  )

  const handleFiles = async (files: FileList) => {
    setProcessing(true)
    const results: CompressedImage[] = []
    for (const file of Array.from(files)) {
      if (file.type.startsWith('image/')) {
        const result = await compress(file)
        results.push(result)
      }
    }
    setImages((prev) => [...prev, ...results])
    setProcessing(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  const download = (img: CompressedImage) => {
    const a = document.createElement('a')
    a.href = img.dataUrl
    a.download = `compressed_${img.name.replace(/\.[^.]+$/, '')}.jpg`
    a.click()
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

  return (
    <main>
      <section className="bg-[#1A1A2E] py-14 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="text-[#FF6B35] text-[13px] font-semibold uppercase tracking-wide">Ücretsiz Araç</span>
          <h1 className="mt-2 text-[36px] sm:text-[44px] font-extrabold text-white text-balance">
            Resim Sıkıştırıcı
          </h1>
          <p className="mt-2 text-white/70 text-[16px]">
            Görsellerinizi kalite kaybı minimumda tutarak sıkıştırın. Ücretsiz ve sınırsız.
          </p>
        </div>
      </section>

      <section className="py-12 bg-[#F8F9FA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Quality Slider */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 mb-6">
            <label htmlFor="quality-slider" className="flex items-center justify-between mb-3">
              <span className="text-[15px] font-semibold text-[#1A1A2E]">Kalite Seviyesi</span>
              <span className="text-[#FF6B35] font-bold text-[18px]">{quality}%</span>
            </label>
            <input
              id="quality-slider"
              type="range"
              min={10}
              max={100}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full accent-[#FF6B35] h-2 cursor-pointer"
            />
            <div className="flex justify-between text-[12px] text-[#6B7280] mt-1">
              <span>Daha küçük dosya</span>
              <span>Daha yüksek kalite</span>
            </div>
          </div>

          {/* Drop Zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200 ${
              dragging
                ? 'border-[#FF6B35] bg-[#FFF3EE]'
                : 'border-gray-300 bg-white hover:border-[#FF6B35] hover:bg-[#FFF3EE]/50'
            }`}
            onClick={() => document.getElementById('file-input')?.click()}
            role="button"
            aria-label="Resim yüklemek için tıklayın veya sürükleyin"
          >
            <input
              id="file-input"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
            />
            {processing ? (
              <div className="flex flex-col items-center gap-3">
                <RefreshCw size={40} className="text-[#FF6B35] animate-spin" aria-hidden="true" />
                <p className="text-[#374151] font-medium">İşleniyor...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <Upload size={40} className="text-[#FF6B35]" aria-hidden="true" />
                <p className="text-[16px] font-semibold text-[#1A1A2E]">
                  Resim yüklemek için tıklayın veya sürükleyin
                </p>
                <p className="text-[13px] text-[#6B7280]">JPEG, PNG, WebP desteklenir</p>
              </div>
            )}
          </div>

          {/* Results */}
          {images.length > 0 && (
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-[18px] font-bold text-[#1A1A2E]">Sıkıştırılan Resimler</h2>
                <button
                  onClick={() => setImages([])}
                  className="text-[13px] text-[#6B7280] hover:text-[#FF6B35] transition-colors"
                >
                  Temizle
                </button>
              </div>
              {images.map((img, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4"
                >
                  <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-gray-50 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.dataUrl} alt={img.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-semibold text-[#1A1A2E] truncate">{img.name}</p>
                    <div className="flex items-center gap-3 mt-1 text-[12px] text-[#6B7280]">
                      <span>{formatSize(img.originalSize)} → {formatSize(img.compressedSize)}</span>
                      <span className="text-green-600 font-semibold">%{img.savings} tasarruf</span>
                    </div>
                    <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#FF6B35] rounded-full"
                        style={{ width: `${100 - img.savings}%` }}
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => download(img)}
                    className="shrink-0 flex items-center gap-1.5 bg-[#FF6B35] text-white px-3 py-2 rounded-lg text-[13px] font-medium hover:bg-[#e55a2b] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                    aria-label={`${img.name} indir`}
                  >
                    <Download size={14} aria-hidden="true" />
                    İndir
                  </button>
                </div>
              ))}
            </div>
          )}

          {images.length === 0 && !processing && (
            <div className="mt-8 flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <ImageIcon size={20} className="text-blue-500 shrink-0" aria-hidden="true" />
              <p className="text-[13px] text-blue-700">
                Resimleri yükledikten sonra sıkıştırılmış versiyonları burada göreceksiniz.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
