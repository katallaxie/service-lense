'use client'

import { useMemo, use } from 'react'
import { useDataTableContext } from '@/components/data-table-context'
import { columns } from './columns'
import { DataTable } from '@/components/data-table'
import { api } from '@/trpc/client'

export function Table() {
  const dataTableContext = useDataTableContext()
  const data = use(
    api.listSolutions.query({
      limit: dataTableContext.pagination.pageSize,
      offset: dataTableContext.pagination.pageIndex
    })
  )

  return useMemo(() => {
    return (
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <DataTable data={data?.rows} columns={columns} />
      </div>
    )
  }, [data])
}
