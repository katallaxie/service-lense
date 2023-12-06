import { SubNav } from '@/components/sub-nav'
import { Suspense } from 'react'
import { Icons } from '@/components/icons'
import { baseUrl } from '@/lib/constants'
import { UpdateWorkloadForm } from './components/update-form'

type PageProps = {
  children: React.ReactNode
  params: { id: string }
}

export async function getWorkload(id: string) {
  const res = await fetch(`${baseUrl}/api/workloads/${id}`)

  if (!res.ok) {
    throw new Error('Failed to fetch workload')
  }

  return res.json()
}

const Fallback = () => (
  <div className="flex items-center text-sm text-muted-foreground">
    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
    Loading...
  </div>
)

export default async function Page({ children, params, ...rest }: PageProps) {
  const workload = await getWorkload(params.id)

  return (
    <Suspense fallback={<Fallback />}>
      <SubNav name={`${workload.name}`}></SubNav>
      <UpdateWorkloadForm id={params.id} />
    </Suspense>
  )
}
