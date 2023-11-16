import Link from 'next/link'
import type { Metadata } from 'next'
import { SubNav } from '@/components/sub-nav'
import { Button } from '@/components/ui/button'
import { Suspense } from 'react'
import { GroupedCountResultItem } from 'sequelize'
import type { Workload } from '@/db/models/workload'
import { Icons } from '@/components/icons'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

export const metadata: Metadata = {
  title: 'Workloads',
  description: 'Workloads'
}

type FindAndCountAllResponse<M> = {
  rows: Workload[]
  count: GroupedCountResultItem[]
}

async function getWorkloads(): Promise<FindAndCountAllResponse<Workload>> {
  const res = await fetch('http://localhost:3000/api/workloads', {
    cache: 'no-store'
  })

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

async function Workloads() {
  const workloads = await getWorkloads()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Environment</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {workloads.rows?.map(workload => (
          <TableRow key={workload.id}>
            <TableCell className="font-medium">{workload.id}</TableCell>
            <TableCell>{workload.name}</TableCell>
            <TableCell>{workload.description}</TableCell>
            <TableCell className="text-right">{workload.environment}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

type RootProps = {
  children: React.ReactNode
}

export default async function Page({ children }: RootProps) {
  return (
    <>
      <SubNav name="Workloads">
        <Link href="/workloads/add" passHref>
          <Button>Add Workload</Button>
        </Link>
      </SubNav>
      <section>
        <Suspense
          fallback={
            <div className="flex items-center text-sm text-muted-foreground">
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </div>
          }
        >
          <Workloads />
        </Suspense>
      </section>
    </>
  )
}
