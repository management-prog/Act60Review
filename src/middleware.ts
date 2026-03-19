import { NextRequest, NextResponse } from 'next/server'

const domainToBrand: Record<string, string> = {
  'act60review.com': 'act60review',
  'www.act60review.com': 'act60review',
  'decreecheck.com': 'decreecheck',
  'www.decreecheck.com': 'decreecheck',
  'act60shield.com': 'act60shield',
  'www.act60shield.com': 'act60shield',
}

const wwwToNonWww: Record<string, string> = {
  'www.act60review.com': 'act60review.com',
  'www.decreecheck.com': 'decreecheck.com',
  'www.act60shield.com': 'act60shield.com',
}

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') ?? ''

  // Redirect www to non-www (301) to prevent duplicate content
  const nonWwwHost = wwwToNonWww[host]
  if (nonWwwHost) {
    const url = request.nextUrl.clone()
    url.host = nonWwwHost
    url.protocol = 'https'
    return NextResponse.redirect(url, 301)
  }

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
