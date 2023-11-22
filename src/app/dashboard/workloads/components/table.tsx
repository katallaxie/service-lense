'use client'

import { columns } from './columns'
import { DataTable } from '@/components/data-table'
import { useWorkloads } from '@/components/data/workloads'

export function Table() {
  const { workloads, mutate, isLoading } = useWorkloads()

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <DataTable
        data={workloads?.rows ?? []}
        columns={columns}
        isLoading={isLoading}
      />
    </div>
  )
}

export default Table
