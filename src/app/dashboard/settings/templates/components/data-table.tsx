'use client'

import { useMemo, use, useTransition } from 'react'
import { columns } from './data-columns'
import { api } from '@/trpc/client'
import { DataTable } from '@/components/data-table'

export default function ProfilesDataTable() {
  const templates = use(api.findSolutionTemplates.query({}))

  return useMemo(() => {
    return (
      <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
        <DataTable data={templates?.rows ?? []} columns={columns} />
      </div>
    )
  }, [templates?.rows])
}
