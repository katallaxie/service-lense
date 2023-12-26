'use client'

import type { Workload } from '@/db/models/workload'
import { createContext } from '@/components/data-table-context'
import { api } from '@/trpc/client'
import { PaginationState } from '@tanstack/react-table'
import { WorkloadDataTable } from './data-table'

const [DataTableProvider, useDataTableContext, DataTableContext] =
  createContext<Workload[]>({})

export { useDataTableContext, DataTableContext }

export default function DataTable() {
  const getRows = (pagination: PaginationState) =>
    api.listWorkloads
      .query({
        limit: pagination.pageSize,
        offset: pagination.pageIndex
      })
      .then(({ rows }) => rows)

  return (
    <DataTableProvider getRows={getRows}>
      <WorkloadDataTable />
    </DataTableProvider>
  )
}
