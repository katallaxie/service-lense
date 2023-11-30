import { logRequest } from '@/lib/middleware'
import { createEdgeRouter } from 'next-connect'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { createWorkload, findAndCountWorkloads } from '@/db/services/workloads'

export type Pagination = {
  page?: number
  limit?: number
}

interface RequestContext {
  params?: unknown
}

const router = createEdgeRouter<NextRequest, RequestContext>()

router.use(logRequest)

router.get(async (req, ctx) => {
  const { searchParams } = new URL(req.url)

  const session = await auth()

  if (!session) {
    return NextResponse.json({}, { status: 404 })
  }

  const workloads = await findAndCountWorkloads({
    offset: Number(searchParams.get('page')),
    limit: Number(searchParams.get('limit'))
  })

  return NextResponse.json({ ...workloads })
})

router.post(async (req, ctx) => {
  const session = await auth()

  if (!session) {
    return NextResponse.json({}, { status: 404 })
  }

  const body = await req.json()
  const workload = await createWorkload(body)

  return NextResponse.json(workload)
})

export async function GET(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx)
}

export async function POST(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx)
}
