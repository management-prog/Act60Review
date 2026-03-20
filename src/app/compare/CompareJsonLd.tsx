import type { BrandConfig } from '@/config/brands'

interface CompareJsonLdProps {
  brands: BrandConfig[]
}

export default function CompareJsonLd({ brands }: CompareJsonLdProps) {
  // Content is derived from trusted brand config, not user input
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Compare Act 60 Protection Plans',
    description:
      'Side-by-side comparison of DecreeCheck, Act 60 Review, and Act 60 Shield compliance services for Puerto Rico Act 60 decree holders.',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: brands.map((brand, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Service',
          name: brand.name,
          description: brand.description,
          url: `https://${brand.domain}`,
          offers: {
            '@type': 'AggregateOffer',
            lowPrice: String(brand.tiers[0].price),
            highPrice: String(brand.tiers[brand.tiers.length - 1].price),
            priceCurrency: 'USD',
          },
          provider: {
            '@type': 'Organization',
            name: 'Dis Optimus Capital LLC',
          },
        },
      })),
    },
  }

  return (
    <script
      id="compare-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  )
}
