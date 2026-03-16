import Script from 'next/script'

const schemaData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Act 60 Review',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  description: 'AI-powered tax return review for Puerto Rico Act 60 decree holders.',
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '299',
    highPrice: '1499',
    priceCurrency: 'USD',
  },
  provider: {
    '@type': 'Organization',
    name: 'Dis Optimus Capital LLC',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'PR',
      addressCountry: 'US',
    },
  },
}

export function JsonLd() {
  return (
    <Script
      id="json-ld"
      type="application/ld+json"
      strategy="afterInteractive"
    >
      {JSON.stringify(schemaData)}
    </Script>
  )
}
