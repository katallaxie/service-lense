import { getUsers, randomId, saveUsers } from '@/lib/api'
import type { User } from '@/lib/common'
import { validateUser } from '@/lib/common'
import { logRequest } from '@/lib/middleware'
import { createEdgeRouter } from 'next-connect'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { Workload } from '@/db'

const router = createEdgeRouter<NextRequest, { params?: unknown }>()

router.use(logRequest)

router.get(async async => {
  const workloads = await Workload.findAndCountAll({
    order: [['name', 'DESC']],
    offset: 0,
    limit: 5
  })

  return NextResponse.json({ ...workloads })
})

router.post(async req => {
  const users = getUsers(req)
  const body = await req.json()
  const newUser = {
    id: randomId(),
    ...body
  } as User
  validateUser(newUser)
  users.push(newUser)
  const res = NextResponse.json({
    message: 'User has been created'
  })
  saveUsers(res, users)
  return res
})

export async function GET(request: NextRequest, ctx: { params?: unknown }) {
  return router.run(request, ctx)
}

export async function POST(request: NextRequest, ctx: { params?: unknown }) {
  return router.run(request, ctx)
}
