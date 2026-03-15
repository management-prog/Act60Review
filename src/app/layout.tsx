import type { Metadata } from 'next'
import { Inter, Geist } from 'next/font/google'
import { getBrandConfig } from '@/config/brands'
import './globals.css'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export function generateMetadata(): Metadata {
  const brand = getBrandConfig()
  return {
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.description,
    openGraph: {
      title: `${brand.name} — ${brand.tagline}`,
      description: brand.description,
      type: 'website',
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn("dark", "font-sans", geist.variable)}>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
