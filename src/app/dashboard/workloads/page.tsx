import type { Metadata } from 'next'
import { SubNav } from '@/components/sub-nav'
import { GroupedCountResultItem } from 'sequelize'
import type { Workload } from '@/db/models/workload'
import { columns } from '@/components/columns'
import { DataTable } from '@/components/data-table'
import { AddWorkloadDialog } from './components/add-dialog'

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
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      {JSON.stringify(workloads)}
      <DataTable data={[]} columns={columns} />
    </div>
    // <Table>
    //   <TableHeader>
    //     <TableRow>
    //       <TableHead className="w-[100px]">ID</TableHead>
    //       <TableHead>Name</TableHead>
    //       <TableHead>Description</TableHead>
    //       <TableHead className="text-right">Environment</TableHead>
    //     </TableRow>
    //   </TableHeader>
    //   <TableBody>
    //     {workloads.rows?.map(workload => (
    //       <TableRow key={workload.id}>
    //         <TableCell className="font-medium">{workload.id}</TableCell>
    //         <TableCell>{workload.name}</TableCell>
    //         <TableCell>{workload.description}</TableCell>
    //         <TableCell className="text-right">{workload.environment}</TableCell>
    //       </TableRow>
    //     ))}
    //   </TableBody>
    // </Table>
  )
}

type RootProps = {
  children: React.ReactNode
}

export default async function Page({ children }: RootProps) {
  return (
    <>
      <SubNav name="Workloads">
        <AddWorkloadDialog />
      </SubNav>
      <section>
        <Workloads />
      </section>
    </>
  )
}