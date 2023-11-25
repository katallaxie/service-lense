import { logRequest } from '@/lib/middleware'
import { createEdgeRouter } from 'next-connect'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { addProfile, findAndCountProfiles } from '@/db/services/profiles'

export type Pagination = {
  offset?: number
  limit?: number
}

const router = createEdgeRouter<NextRequest, { params?: unknown }>()

router.use(logRequest)

router.get(async req => {
  const { searchParams } = new URL(req.url)
  const offset = Number(searchParams.get('page'))
  const limit = Number(searchParams.get('limit'))

  const profiles = await findAndCountProfiles({ offset, limit })

  return NextResponse.json({ ...profiles })
})

router.post(async req => {
  const body = await req.json()

  try {
    const profile = await addProfile({ ...body })
    return NextResponse.json(profile)
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
