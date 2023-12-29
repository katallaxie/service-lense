import { Session } from 'next-auth'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import type { NextRequest } from 'next/server'

export const middleware = async (request: NextRequest) => {
  const { origin, protocol, host } = request.nextUrl
  const baseUrl = request.headers.get('x-original-proto') === 'http' && protocol === 'https:' ? `http://${host}`: origin 

  const res = await fetch(`${baseUrl}/api/auth/session`, {
    headers: {
      cookie: headers().get('cookie') ?? ''
    },
    cache: 'no-store'
  })

  const session: Session = await res.json()
  const isLoggedIn = session !== null
  const pathname = request.nextUrl.pathname

  if (pathname != '/login' && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', origin))
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/account/:path*']
}
