'use client'

import type { Lens } from '@/db/models/lens'
import { createContext } from '@/components/data-table-context'
import { api } from '@/trpc/client'
import { PaginationState } from '@tanstack/react-table'
import LensesDataTable from './data-table'

const [DataTableProvider, useDataTableContext, DataTableContext] =
  createContext<Lens[]>({})

export { useDataTableContext, DataTableContext }

export default function DataTable() {
  const getRows = (pagination: PaginationState) =>
    api.listLenses
      .query({
        limit: pagination.pageSize,
        offset: pagination.pageIndex
      })
      .then(({ rows }) => rows)

  return (
    <DataTableProvider getRows={getRows}>
      <LensesDataTable />
    </DataTableProvider>
  )
}
