import { getBrandFromHeaders } from '@/config/brands.server'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import LeadMagnetForm from './LeadMagnetForm'

export default async function LeadMagnetPage() {
  const brand = await getBrandFromHeaders()

  return (
    <>
      <Navbar brand={brand} />
      <main className="min-h-screen bg-navy-900">
        <div className="pt-28 pb-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <LeadMagnetForm brand={brand} />
          </div>
        </div>
      </main>
      <Footer brand={brand} />
    </>
  )
}
