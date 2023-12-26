'use client'

import type { Profile } from '@/db/models/profile'
import { createContext } from '@/components/data-table-context'
import { api } from '@/trpc/client'
import { PaginationState } from '@tanstack/react-table'
import { ProfileDataTable } from './data-table'

const [DataTableProvider, useDataTableContext, DataTableContext] =
  createContext<Profile[]>({})

export { useDataTableContext, DataTableContext }

export default function DataTable() {
  const getRows = (pagination: PaginationState) =>
    api.listProfiles
      .query({
        limit: pagination.pageSize,
        offset: pagination.pageIndex
      })
      .then(({ rows }) => rows)

  return (
    <DataTableProvider getRows={getRows}>
      <ProfileDataTable />
    </DataTableProvider>
  )
}
