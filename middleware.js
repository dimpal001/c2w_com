import { NextResponse } from 'next/server'

export function middleware(req) {
  const url = req.nextUrl.clone()

  if (!url.pathname.startsWith('/maintenance')) {
    url.pathname = '/maintenance'
    return NextResponse.rewrite(url)
  }
}

export const config = {
  matcher: '/:path*',
}
