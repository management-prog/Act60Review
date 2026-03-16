import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { getBrandConfig } from '@/config/brands'
import { JsonLd } from '@/components/json-ld'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

export function generateMetadata(): Metadata {
  const brand = getBrandConfig()
  return {
    title: `${brand.name} | ${brand.tagline}`,
    description: brand.description,
    keywords: 'Act 60, Puerto Rico tax review, Act 60 compliance, IRS Campaign 685, decree holder tax, PR tax return review, AI tax review',
    openGraph: {
      title: `${brand.name} | ${brand.tagline}`,
      description: brand.description,
      type: 'website',
      siteName: brand.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${brand.name} | ${brand.tagline}`,
      description: brand.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-navy-900 text-slate-100`}>
        <JsonLd />
        {children}
      </body>
    </html>
  )
}
