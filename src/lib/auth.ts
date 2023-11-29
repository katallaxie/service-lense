import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse
} from 'next'
import { NextResponse, NextRequest } from 'next/server'
import type { NextAuthOptions } from 'next-auth'
import { getServerSession } from 'next-auth'
import { Pool } from 'pg'
import PostgresAdapter from '@auth/pg-adapter'
import providers from './providers'

export type DefaultExt = { params?: unknown }

export function wrapper<
  Req extends Request = Request,
  Ext extends DefaultExt = DefaultExt,
  Res extends Response = Response
>(cb: WrapperCallback<Req, Ext, Res>) {
  return function <
    HExt extends DefaultExt = DefaultExt,
    HReq extends Request = Request,
    HRes extends Response | Promise<Response> = Response
  >(handler: (req: HReq & Req, ext?: HExt) => HRes) {
    // the new handler
    return (req: HReq & Req, ext?: HExt) => {
      return cb(
        (_req, _ext) =>
          handler(
            (_req || req) as unknown as HReq & Req,
            (_ext || ext) as any
          ) as unknown as Res,
        req as unknown as Req,
        ext as unknown as Ext
      ) as unknown as ReturnType<typeof handler>
    }
  }
}

export type WrapperCallback<
  Req extends Request = Request,
  Ext extends DefaultExt = DefaultExt,
  Res extends Response | Promise<Response> = Response
> = (
  next: (req?: Req, ext?: Ext) => Res | Promise<Res>,
  req: Req,
  ext: Ext
) => Promise<Res> | Res

const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
})

export const nextAuthOptions: NextAuthOptions = {
  adapter: PostgresAdapter(pool),
  secret: process.env.NEXTAUTH_SECRET,
  providers,
  pages: {
    signIn: '/login'
  }
}

export async function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, nextAuthOptions)
}

export async function useSession() {
  const session = await getServerSession(nextAuthOptions)

  return { session }
}

export const getServerAuthSession = useSession

export const authenticated = wrapper(async (next, request: NextRequest) => {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 })
  }

  return next()
})
