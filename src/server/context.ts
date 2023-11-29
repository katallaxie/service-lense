import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'
import { getServerAuthSession } from '@/lib/auth'

export async function createContext(opts?: FetchCreateContextFnOptions) {
  const { session } = await getServerAuthSession()

  return {
    session,
    headers: opts && Object.fromEntries(opts.req.headers)
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
