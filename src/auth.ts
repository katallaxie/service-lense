import NextAuth from 'next-auth'
import providers from './providers'
import PostgresAdapter from '@auth/pg-adapter'
import type { DefaultSession } from 'next-auth'
import { Pool } from 'pg'

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string
    }
  }
}

const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
})

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  providers,
  adapter: PostgresAdapter(pool),
  pages: {
    signIn: '/login'
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (token?.sub) {
        session.user.id = token.sub
      }

      return session
    }
  }
})
