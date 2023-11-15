import NextAuth from 'next-auth'
import PostgresAdapter from '@auth/pg-adapter'
import { Pool } from 'pg'
import { config } from '@/lib/auth'

const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
})

const handler = NextAuth({
  adapter: PostgresAdapter(pool),
  ...config
})

export { handler as GET, handler as POST }
