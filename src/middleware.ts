import { Session } from 'next-auth'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export const middleware = async (request: NextRequest) => {
  const { origin } = request.nextUrl

  const res = await fetch(`${origin}/api/auth/session`, {
    headers: headers(),
    cache: 'no-store'
  })

  const session: Session = await res.json()
  const isLoggedIn = Object.keys(session).length > 0
  const pathname = request.nextUrl.pathname

  if (pathname != '/login' && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', origin))
  }
}

export { default as mi } from 'next-auth/middleware'

export const config = {
  matcher: ['/dashboard/:path*', '/account/:path*']
}
