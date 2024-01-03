'use client'

import type { Solution } from '@/db/models/solution'
import { createContext } from '@/components/data-table-context'
import { api } from '@/trpc/client'
import { PaginationState } from '@tanstack/react-table'
import LensesDataTable from './data-table'

const [DataTableProvider, useDataTableContext, DataTableContext] =
  createContext<Solution>({})

export { useDataTableContext, DataTableContext }

export default function DataTable() {
  const getRows = (pagination: PaginationState) =>
    api.listSolutions.query({
      limit: pagination.pageSize,
      offset: pagination.pageIndex
    })

  return (
    <DataTableProvider getRows={getRows}>
      <LensesDataTable />
    </DataTableProvider>
  )
}
