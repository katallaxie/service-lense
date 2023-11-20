import { createEdgeRouter } from 'next-connect'
import { logRequest } from '@/lib/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { deleteWorkload, getWorkload } from '@/db/services/workloads'

interface RequestContext {
  params: {
    id: string
  }
}

const router = createEdgeRouter<NextRequest, RequestContext>()
router.use(logRequest)

router.get(async (req, ctx) => {
  const { id } = ctx.params

  const workload = await getWorkload(id)

  return NextResponse.json(workload)
})

router.delete(async (req, ctx) => {
  const { id } = ctx.params

  await deleteWorkload(id)

  return NextResponse.json({ id })
})

export async function DELETE(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx)
}

export async function GET(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx)
}
