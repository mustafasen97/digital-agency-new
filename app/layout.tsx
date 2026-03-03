import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SiteLayoutWrapper from '@/components/site-layout-wrapper'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'WebTasarımEvi - WordPress Tema, Eklenti & Script Mağazası',
    template: '%s | WebTasarımEvi',
  },
  description:
    'Sektörünüze özel WordPress temaları, güçlü eklentiler ve hazır scriptler. 5 yılda 200+ başarılı proje, 4.8 yıldız memnuniyet.',
  keywords: [
    'wordpress tema',
    'wordpress eklenti',
    'hazır script',
    'dijital ürün mağazası',
    'web tasarım ajansı',
    'seo optimizasyonu',
    'dijital ajans türkiye',
  ],
  authors: [{ name: 'WebTasarımEvi' }],
  creator: 'WebTasarımEvi',
  metadataBase: new URL('https://webtasarimevi.com.tr'),
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://webtasarimevi.com.tr',
    siteName: 'WebTasarımEvi',
    title: 'WebTasarımEvi - WordPress Tema, Eklenti & Script Mağazası',
    description:
      'Sektörünüze özel WordPress temaları, güçlü eklentiler ve hazır scriptler.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebTasarımEvi - WordPress Tema, Eklenti & Script Mağazası',
    description:
      'Sektörünüze özel WordPress temaları, güçlü eklentiler ve hazır scriptler.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={inter.variable}>
      <body className="font-sans antialiased">
        <SiteLayoutWrapper>{children}</SiteLayoutWrapper>
      </body>
    </html>
  )
}
