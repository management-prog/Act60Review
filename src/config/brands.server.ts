import 'server-only'
import { headers } from 'next/headers'
import { getBrandFromId } from './brands'
import type { BrandConfig } from './brands'

export async function getBrandFromHeaders(): Promise<BrandConfig> {
  const headersList = await headers()
  const brandId = headersList.get('x-brand-id') ?? 'act60review'
  return getBrandFromId(brandId)
}
