import { logRequest } from '@/lib/middleware'
import { createEdgeRouter } from 'next-connect'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { createWorkload, findAndCountWorkloads } from '@/db/services/workloads'

const router = createEdgeRouter<NextRequest, { params?: unknown }>()

router.use(logRequest)

router.get(async req => {
  const workloads = await findAndCountWorkloads()

  return NextResponse.json({ ...workloads })
})

router.post(async req => {
  const body = await req.json()

  try {
    const workload = await createWorkload({ ...body })
    return NextResponse.json(workload)
  } catch (error) {}

  return NextResponse.json({})

  // const users = getUsers(req)
  // const body = await req.json()
  // const newUser = {
  //   id: randomId(),
  //   ...body
  // } as User
  // validateUser(newUser)
  // users.push(newUser)
  // const res = NextResponse.json({
  //   message: 'User has been created'
  // })
  // saveUsers(res, users)
  // return res
})

export async function GET(request: NextRequest, ctx: { params?: unknown }) {
  return router.run(request, ctx)
}

export async function POST(request: NextRequest, ctx: { params?: unknown }) {
  return router.run(request, ctx)
}
