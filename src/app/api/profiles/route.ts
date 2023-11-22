import { logRequest } from '@/lib/middleware'
import { createEdgeRouter } from 'next-connect'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { addProfile, findAndCountProfiles } from '@/db/services/profiles'

const router = createEdgeRouter<NextRequest, { params?: unknown }>()

router.use(logRequest)

router.get(async req => {
  const workloads = await findAndCountProfiles()

  return NextResponse.json({ ...workloads })
})

router.post(async req => {
  const body = await req.json()

  try {
    const workload = await addProfile({ ...body })
    return NextResponse.json(workload)
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 })
  }
})

export async function GET(request: NextRequest, ctx: { params?: unknown }) {
  return router.run(request, ctx)
}

export async function POST(request: NextRequest, ctx: { params?: unknown }) {
  return router.run(request, ctx)
}
