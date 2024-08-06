import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const cookieConsent = request.cookies.get('cookieConsent')

  const response = NextResponse.next()

  if (cookieConsent && cookieConsent.value === 'true') {
    // Set user's country of origin and routes visited cookies
    const country = request.geo?.country || 'unknown'
    const visitedRoutes = request.cookies.get('visitedRoutes')?.value
    const currentRoute = request.nextUrl.pathname

    let newVisitedRoutes = visitedRoutes ? `${visitedRoutes},${currentRoute}` : currentRoute
    response.cookies.set('country', country, { path: '/' })
    response.cookies.set('visitedRoutes', newVisitedRoutes, { path: '/' })
  } else {
    // Delete all cookies if consent is not given
    request.cookies.getAll().forEach(cookie => {
      response.cookies.delete(cookie.name)
    })
  }

  return response
}

// Apply middleware to all paths
export const config = {
  matcher: '/:path*',
}
