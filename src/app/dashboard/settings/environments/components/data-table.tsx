'use client'

import { useMemo, use } from 'react'
import { columns } from './data-columns'
import { api } from '@/trpc/client'
import { DataTable } from '@/components/data-table'

export default function EnvironmentDataTable() {
  const environments = use(api.listEnvironments.query({}))

  return useMemo(() => {
    return (
      <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
        <DataTable data={environments?.rows ?? []} columns={columns} />
      </div>
    )
  }, [environments?.rows])
}
