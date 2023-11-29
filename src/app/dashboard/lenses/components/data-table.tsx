'use client'

import { useMemo, use, Suspense } from 'react'
import { useDataTableContext } from '@/components/data-table-context'
import { columns } from './data-columns'
import { DataTable } from '@/components/data-table'
import { api } from '@/trpc/client'

export default function LensesDataTable() {
  const dataTableContext = useDataTableContext()
  const data = use(api.listLenses.query({}))

  return useMemo(() => {
    return (
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <Suspense>
          <DataTable data={data?.rows ?? []} columns={columns} />
        </Suspense>
      </div>
    )
  }, [data?.rows])
}
