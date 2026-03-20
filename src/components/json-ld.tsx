import type { BrandConfig } from '@/config/brands'

interface JsonLdProps {
  brand: BrandConfig
}

export function JsonLd({ brand }: JsonLdProps) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `https://${brand.domain}/#organization`,
        name: 'Dis Optimus Capital LLC',
        url: `https://${brand.domain}`,
        logo: `https://${brand.domain}/favicon.ico`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'San Juan',
          addressRegion: 'PR',
          addressCountry: 'US',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          email: `support@${brand.domain}`,
          contactType: 'customer service',
        },
        sameAs: [
          'https://act60review.com',
          'https://decreecheck.com',
          'https://act60shield.com',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `https://${brand.domain}/#website`,
        url: `https://${brand.domain}`,
        name: brand.name,
        description: brand.description,
        publisher: { '@id': `https://${brand.domain}/#organization` },
      },
      {
        '@type': 'SoftwareApplication',
        name: brand.name,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        description: brand.description,
        offers: {
          '@type': 'AggregateOffer',
          lowPrice: String(brand.tiers[0].price),
          highPrice: String(brand.tiers[brand.tiers.length - 1].price),
          priceCurrency: 'USD',
        },
        provider: { '@id': `https://${brand.domain}/#organization` },
      },
    ],
  }

  // Content is derived from trusted brand config, not user input
  return (
    <script
      id="json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  )
}
