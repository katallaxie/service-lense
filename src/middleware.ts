import { Session } from 'next-auth'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export const middleware = async (request: NextRequest) => {
  const { origin } = request.nextUrl

  const res = await fetch(`${origin}/api/auth/session`, {
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
