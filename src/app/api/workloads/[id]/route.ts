import { createEdgeRouter } from 'next-connect'
import { logRequest } from '@/lib/middleware'
import type { NextRequest } from 'next/server'

interface RequestContext {
  params: {
    id: string
  }
}

const router = createEdgeRouter<NextRequest, RequestContext>()

router.use(logRequest)

export async function GET(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx)
}
