import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse
} from 'next'
import type { NextAuthOptions } from 'next-auth'
import { getServerSession } from 'next-auth'
import { Pool } from 'pg'
import PostgresAdapter from '@auth/pg-adapter'
import providers from './providers'

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
