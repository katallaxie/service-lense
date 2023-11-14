import Link from 'next/link'
import type { Metadata } from 'next'
import { SubNav } from '@/components/sub-nav'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Workloads',
  description: 'Workloads'
}

type RootProps = {
  children: React.ReactNode
}

export default function Workloads({ children }: RootProps) {
  return (
    <>
      <SubNav name="Workloads">
        <Link href="/workloads/add" passHref>
          <Button>Add Workload</Button>
        </Link>
      </SubNav>
    </>
  )
}
