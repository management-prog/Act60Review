export interface ReviewRequest {
  id: string
  userId: string
  brandId: string
  fileName: string
  fileUrl: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  createdAt: string
  completedAt?: string
  reportUrl?: string
}

export interface ReviewReport {
  id: string
  reviewId: string
  overallScore: number
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  findings: Finding[]
  summary: string
  recommendations: string[]
  generatedAt: string
}

export interface Finding {
  id: string
  category: FindingCategory
  severity: 'info' | 'warning' | 'error' | 'critical'
  title: string
  description: string
  recommendation: string
  irsReference?: string
}

export type FindingCategory =
  | 'irc933_exclusion'
  | 'transfer_pricing'
  | 'fbar_fatca'
  | 'residency_test'
  | 'form_completeness'
  | 'income_sourcing'
  | 'capital_gains'
  | 'compliance_general'
  | 'decree_terms'
