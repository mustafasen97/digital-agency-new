'use client'

import { useState, useCallback } from 'react'
import { Copy, RefreshCw, Check } from 'lucide-react'

function hslToHex(h: number, s: number, l: number): string {
  l /= 100
  const a = (s * Math.min(l, 1 - l)) / 100
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

function generatePalette(baseHex: string) {
  const tones = [95, 85, 70, 55, 40, 30, 20]
  return tones.map((l) => {
    const r = parseInt(baseHex.slice(1, 3), 16)
    const g = parseInt(baseHex.slice(3, 5), 16)
    const b = parseInt(baseHex.slice(5, 7), 16)
    const max = Math.max(r, g, b) / 255
    const min = Math.min(r, g, b) / 255
    const h =
      max === min
        ? 0
        : max === r / 255
        ? (60 * ((g - b) / 255 / (max - min) + 6)) % 360
        : max === g / 255
        ? 60 * ((b - r) / 255 / (max - min) + 2)
        : 60 * ((r - g) / 255 / (max - min) + 4)
    const s = max === 0 ? 0 : ((max - min) / max) * 100
    return { hex: hslToHex(h, s, l), l }
  })
}

export default function RenkPaletiPage() {
  const [baseColor, setBaseColor] = useState('#FF6B35')
  const [copied, setCopied] = useState<string | null>(null)

  const palette = generatePalette(baseColor)

  const copyColor = useCallback((hex: string) => {
    navigator.clipboard.writeText(hex).then(() => {
      setCopied(hex)
      setTimeout(() => setCopied(null), 1500)
    })
  }, [])

  const randomColor = () => {
    const h = Math.floor(Math.random() * 360)
    setBaseColor(hslToHex(h, 70, 50))
  }

  return (
    <main>
      <section className="bg-[#1A1A2E] py-14 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="text-[#FF6B35] text-[13px] font-semibold uppercase tracking-wide">Ücretsiz Araç</span>
          <h1 className="mt-2 text-[36px] sm:text-[44px] font-extrabold text-white text-balance">
            Renk Paleti Oluşturucu
          </h1>
          <p className="mt-2 text-white/70 text-[16px]">
            Bir renk seçin, anında tonlar ve uyumlu palet elde edin.
          </p>
        </div>
      </section>

      <section className="py-12 bg-[#F8F9FA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Color Picker */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 mb-6">
            <div className="flex items-center gap-4 flex-wrap">
              <label className="text-[15px] font-semibold text-[#1A1A2E]" htmlFor="color-input">
                Temel Renk
              </label>
              <div className="flex items-center gap-3 flex-1">
                <input
                  id="color-input"
                  type="color"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer"
                  aria-label="Renk seçin"
                />
                <input
                  type="text"
                  value={baseColor.toUpperCase()}
                  onChange={(e) => {
                    if (/^#[0-9A-Fa-f]{0,6}$/.test(e.target.value)) {
                      setBaseColor(e.target.value)
                    }
                  }}
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-[14px] font-mono text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                  aria-label="HEX renk kodu"
                  maxLength={7}
                />
                <button
                  onClick={randomColor}
                  className="flex items-center gap-1.5 border border-gray-200 px-3 py-2 rounded-lg text-[14px] text-[#374151] hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                  aria-label="Rastgele renk seç"
                >
                  <RefreshCw size={14} aria-hidden="true" />
                  Rastgele
                </button>
              </div>
            </div>
          </div>

          {/* Palette */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-[16px] font-bold text-[#1A1A2E]">Renk Paletiniz</h2>
              <p className="text-[13px] text-[#6B7280] mt-0.5">Renk kutusuna tıklayarak HEX değerini kopyalayın.</p>
            </div>
            <div className="grid grid-cols-7 h-32" role="list" aria-label="Renk tonu listesi">
              {palette.map((swatch) => (
                <button
                  key={swatch.hex}
                  onClick={() => copyColor(swatch.hex)}
                  style={{ backgroundColor: swatch.hex }}
                  className="relative flex items-end justify-center pb-2 group focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white/50 transition-transform hover:scale-105"
                  aria-label={`${swatch.hex} rengi kopyala`}
                  title={swatch.hex}
                >
                  <span
                    className={`opacity-0 group-hover:opacity-100 transition-opacity text-[9px] font-mono font-bold px-1 py-0.5 rounded ${
                      swatch.l > 55 ? 'bg-black/20 text-black' : 'bg-white/20 text-white'
                    }`}
                  >
                    {copied === swatch.hex ? '✓' : swatch.hex}
                  </span>
                </button>
              ))}
            </div>
            <div className="grid grid-cols-7 border-t border-gray-100">
              {palette.map((swatch) => (
                <button
                  key={swatch.hex + '-label'}
                  onClick={() => copyColor(swatch.hex)}
                  className="flex flex-col items-center py-3 gap-1 hover:bg-gray-50 transition-colors group focus:outline-none focus:bg-gray-50"
                  aria-label={`${swatch.hex} kopyala`}
                >
                  <span className="text-[11px] font-mono text-[#374151] group-hover:text-[#FF6B35] transition-colors">
                    {swatch.hex.toUpperCase()}
                  </span>
                  {copied === swatch.hex ? (
                    <Check size={12} className="text-green-500" aria-label="Kopyalandı" />
                  ) : (
                    <Copy size={12} className="text-[#6B7280] opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* How to use */}
          <div className="mt-8 bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="text-[16px] font-bold text-[#1A1A2E] mb-4">Nasıl Kullanılır?</h2>
            <ol className="space-y-2 text-[14px] text-[#374151] list-decimal list-inside">
              <li>Yukarıdaki renk seçiciden veya HEX kutusundan temel renginizi girin.</li>
              <li>Otomatik olarak 7 farklı ton oluşturulur.</li>
              <li>Herhangi bir renge tıklayarak HEX değerini kopyalayın.</li>
              <li>Renkleri markanızda, web sitenizde veya tasarımlarınızda kullanın.</li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  )
}
