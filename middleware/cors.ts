import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ALLOWED_ORIGIN = 'https://onlive.is-a.dev'

export function middleware(request: NextRequest) {
 const origin = request.headers.get('origin')
 
 if (origin !== ALLOWED_ORIGIN) {
   return new NextResponse(null, { status: 403 })
 }

 const response = NextResponse.next()
 response.headers.set('Access-Control-Allow-Origin', ALLOWED_ORIGIN)
 response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
 response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
 
 return response
}

export const config = {
 matcher: '/api/:path*'
}