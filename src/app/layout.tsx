import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter, Playfair_Display } from 'next/font/google'
import { getBrandFromHeaders } from '@/config/brands.server'
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

export async function generateMetadata(): Promise<Metadata> {
  const brand = await getBrandFromHeaders()
  return {
    title: `${brand.name} | ${brand.tagline}`,
    description: brand.description,
    keywords: 'Act 60, Puerto Rico tax review, Act 60 compliance, IRS Campaign 685, decree holder tax, PR tax return review, AI tax review',
    alternates: {
      canonical: `https://${brand.domain}`,
    },
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
    robots: { index: true, follow: true },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const brand = await getBrandFromHeaders()
  return (
    <html lang="en" className="dark" data-brand={brand.id}>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-navy-900 text-slate-100`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-E45JBVPNT4"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-E45JBVPNT4');
          `}
        </Script>
        <JsonLd brand={brand} />
        {children}
      </body>
    </html>
  )
}
