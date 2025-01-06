import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ALLOWED_ORIGINS = [
  'https://onlive.is-a.dev',
  'http://localhost:3000'
]

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin')
  
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return new NextResponse(null, { status: 403 })
  }

  const response = NextResponse.next()
  
  if (origin) {
    response.headers.set('Access-Control-Allow-Origin', origin)
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.set('Access-Control-Max-Age', '86400')
  }

  return response
}

export const config = {
  matcher: '/api/:path*'
}