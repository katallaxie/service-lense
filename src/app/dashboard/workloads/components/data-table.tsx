'use client'

import { columns } from './columns'
import { DataTable } from '@/components/data-table'
import { useDataTableContext } from './data-table-context'

export function WorkloadDataTable() {
  const dataTableContext = useDataTableContext()

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <DataTable
        rows={dataTableContext.data ?? []}
        columns={columns}
        onPaginationChange={dataTableContext.setPagination}
        isFetching={dataTableContext.isFetching}
        pagination={dataTableContext.pagination}
      />
    </div>
  )
}
