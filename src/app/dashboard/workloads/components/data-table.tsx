'use client'

import { columns } from './columns'
import { DataTable } from '@/components/data-table'
import { useDataTableContext } from './data-table-context'
import type { Workload } from '@/db/models/workload'

export function WorkloadDataTable() {
  const dataTableContext = useDataTableContext()

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <DataTable<Workload>
        columns={columns}
        onPaginationChange={dataTableContext.onPaginationChange}
        state={dataTableContext.state}
        pagination={dataTableContext.pagination}
      />
    </div>
  )
}
