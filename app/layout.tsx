import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: '--font-plus-jakarta'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://modulerstand.com.tr'),
  title: {
    default: 'ModulerStand | Modüler Fuar Standları ve LED Işıklı Kutular',
    template: '%s | ModulerStand'
  },
  description: 'ModulerStand - Türkiye\'nin lider modüler fuar standı, LED ışıklı kutu, tekstil germe sistemleri ve taşınabilir sergi çözümleri üreticisi. Profesyonel fuar ve etkinlik çözümleri.',
  keywords: ['modüler stand', 'fuar standı', 'LED ışıklı kutu', 'tekstil germe sistemi', 'pop-up stand', 'sergi standı', 'Ankara fuar standı', 'reklam panosu'],
  authors: [{ name: 'ModulerStand' }],
  creator: 'ModulerStand',
  publisher: 'ModulerStand',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://modulerstand.com.tr',
    siteName: 'ModulerStand',
    title: 'ModulerStand | Modüler Fuar Standları ve LED Işıklı Kutular',
    description: 'Türkiye\'nin lider modüler fuar standı ve LED ışıklı kutu üreticisi. Profesyonel fuar ve etkinlik çözümleri.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ModulerStand - Modüler Fuar Standları',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ModulerStand | Modüler Fuar Standları',
    description: 'Türkiye\'nin lider modüler fuar standı üreticisi',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://modulerstand.com.tr',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#2563eb',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} ${plusJakarta.variable} font-sans antialiased`}>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  )
}
