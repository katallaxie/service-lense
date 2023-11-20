'use client'

import { SubNav } from '@/components/sub-nav'
import { GroupedCountResultItem } from 'sequelize'
import type { Workload } from '@/db/models/workload'
import { columns } from './components/columns'
import { DataTable } from '@/components/data-table'
import { AddWorkloadDialog } from './components/add-dialog'
import { useWorkloads } from '@/components/data/workloads'

type RootProps = {
  children: React.ReactNode
}

export default function Page({ children }: RootProps) {
  const { workloads, mutate, isLoading } = useWorkloads()

  return (
    <>
      <SubNav name="Workloads">
        <AddWorkloadDialog />
      </SubNav>
      <section>
        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
          {!isLoading && <DataTable data={workloads?.rows} columns={columns} />}
        </div>
      </section>
    </>
  )
}
