import { NextRequest, NextResponse } from 'next/server'

const domainToBrand: Record<string, string> = {
  'act60review.com': 'act60review',
  'www.act60review.com': 'act60review',
  'decreecheck.com': 'decreecheck',
  'www.decreecheck.com': 'decreecheck',
  'act60shield.com': 'act60shield',
  'www.act60shield.com': 'act60shield',
}

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') ?? ''
  const brandId = domainToBrand[host] ?? 'act60review'

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-brand-id', brandId)

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  })

  response.cookies.set('brand-id', brandId, {
    path: '/',
    sameSite: 'lax',
    secure: true,
  })

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
