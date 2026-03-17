import Link from 'next/link'
import { getBrandFromHeaders } from '@/config/brands.server'

export async function generateMetadata() {
  const brand = await getBrandFromHeaders()
  return {
    title: `Privacy Policy | ${brand.name}`,
    description: `Privacy Policy for ${brand.name}, operated by Dis Optimus Capital LLC.`,
  }
}

export default async function PrivacyPage() {
  const brand = await getBrandFromHeaders()
  const supportEmail = `support@${brand.domain}`
  return (
    <main className="min-h-screen bg-navy-900 pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-accent/60 text-sm hover:text-accent transition-colors mb-8 inline-block">&larr; Back to Home</Link>

        <h1 className="font-serif text-4xl sm:text-5xl text-slate-100 mb-4 tracking-tight">Privacy Policy</h1>
        <p className="text-sm text-slate-500 mb-12">Last updated: March 16, 2026</p>

        <div className="space-y-8 text-slate-400 text-[15px] leading-relaxed">
          <section>
            <h2 className="font-serif text-xl text-slate-200 mb-3">1. Introduction</h2>
            <p>Dis Optimus Capital LLC (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates the {brand.name} service (&ldquo;Service&rdquo;). This Privacy Policy describes how we collect, use, store, and protect your personal information when you use our Service. We are committed to protecting the privacy and security of the sensitive financial information you entrust to us.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-slate-200 mb-3">2. Information We Collect</h2>
            <p className="font-semibold text-slate-300 mb-2">Information you provide directly:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Contact information (name, email address)</li>
              <li>Tax return documents (Planilla/Form 482, Form 1040, schedules)</li>
              <li>Supporting tax documents (Form 8938, FBAR filings, Act 60 decree)</li>
              <li>Transfer pricing documentation</li>
              <li>Hacienda correspondence</li>
              <li>Payment information (processed by Stripe; we do not store card numbers)</li>
            </ul>
            <p className="font-semibold text-slate-300 mb-2 mt-4">Information collected automatically:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>IP address and approximate geographic location</li>
              <li>Browser type and operating system</li>
              <li>Pages viewed and time spent on the Service</li>
              <li>Referring URL</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-slate-200 mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>To perform the AI-powered compliance analysis of your tax documents</li>
              <li>To facilitate CPA review of flagged findings</li>
              <li>To generate and deliver your compliance report</li>
              <li>To process your payment</li>
              <li>To communicate with you about your review</li>
              <li>To improve the accuracy and functionality of the Service</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-slate-200 mb-3">4. Data Security</h2>
            <p>We implement industry-standard security measures to protect your information:</p>
            <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
              <li><span className="text-slate-300">Encryption:</span> All data is encrypted in transit (TLS 1.3) and at rest (AES-256)</li>
              <li><span className="text-slate-300">Isolated processing:</span> Tax documents are processed in isolated, ephemeral compute environments</li>
              <li><span className="text-slate-300">Access controls:</span> Strict role-based access; only authorized CPA reviewers and essential personnel can access your documents</li>
              <li><span className="text-slate-300">SOC 2 compliance:</span> Our infrastructure is SOC 2 Type II compliant</li>
              <li><span className="text-slate-300">No AI training:</span> Your tax documents are never used to train AI models</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-slate-200 mb-3">5. Data Retention and Deletion</h2>
            <p>Uploaded tax documents and associated analysis data are <span className="text-slate-300">permanently deleted thirty (30) days</span> after your review is complete. Your compliance report is available for download during this period. After deletion, no copies of your tax documents are retained on our systems. Account information (name, email, purchase history) is retained for as long as your account is active or as needed to comply with legal and tax obligations.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-slate-200 mb-3">6. Information Sharing</h2>
            <p>We do not sell, rent, or trade your personal information. We share information only with:</p>
            <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
              <li><span className="text-slate-300">CPA reviewers:</span> Licensed Puerto Rico CPAs who verify AI-generated findings as part of the Service</li>
              <li><span className="text-slate-300">Payment processor:</span> Stripe, Inc. processes your payment (subject to <a href="https://stripe.com/privacy" className="text-accent hover:text-accent-light transition-colors" target="_blank" rel="noopener noreferrer">Stripe&apos;s Privacy Policy</a>)</li>
              <li><span className="text-slate-300">Legal compliance:</span> When required by law, subpoena, court order, or government request</li>
              <li><span className="text-slate-300">Business transfer:</span> In connection with a merger, acquisition, or sale of assets, with prior notice to you</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-slate-200 mb-3">7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
              <li>Request access to your personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Request a copy of your data in a portable format</li>
              <li>Opt out of marketing communications</li>
            </ul>
            <p className="mt-3">To exercise any of these rights, contact us at {supportEmail}. We will respond to your request within thirty (30) days.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-slate-200 mb-3">8. Cookies</h2>
            <p>We use essential cookies required for the Service to function (session management, security). We do not use advertising or tracking cookies. Analytics data is collected in aggregate and cannot be used to identify individual users.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-slate-200 mb-3">9. Children&apos;s Privacy</h2>
            <p>The Service is not intended for individuals under 18 years of age. We do not knowingly collect information from children under 18.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-slate-200 mb-3">10. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. Material changes will be posted on this page with an updated effective date. We encourage you to review this page periodically.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-slate-200 mb-3">11. Contact</h2>
            <p>For privacy-related questions or to exercise your data rights:</p>
            <p className="mt-2 text-slate-300">
              Dis Optimus Capital LLC<br />
              San Juan, Puerto Rico<br />
              {supportEmail}
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
