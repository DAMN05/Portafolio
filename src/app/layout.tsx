import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SEO } from '@/shared/constants'
import Navbar from '@/presentation/components/layout/Header/Navbar'
import { CustomCursor } from '@/presentation/components/common/CustomCursor/CustomCursor'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: SEO.TITLE,
  description: SEO.DESCRIPTION,
  keywords: SEO.KEYWORDS,
  authors: [{ name: 'Daniel Ramirez' }],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: SEO.URL,
    title: SEO.TITLE,
    description: SEO.DESCRIPTION,
    siteName: SEO.TITLE,
    images: [
      {
        url: SEO.OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SEO.TITLE,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO.TITLE,
    description: SEO.DESCRIPTION,
    images: [SEO.OG_IMAGE],
  },
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={inter.className}>
        <CustomCursor />
        <Navbar />
        {children}
      </body>
    </html>
  )
}