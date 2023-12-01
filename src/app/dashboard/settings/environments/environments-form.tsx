'use client'

import { useMemo, use } from 'react'
import { api } from '@/trpc/client'
import { useDataTableContext } from '@/components/data-table-context'

export function EnvironmentsForm() {
  const pagination = useDataTableContext()
  const environments = use(
    api.listEnvironments.query({
      limit: pagination.pagination.pageSize,
      offset: pagination.pagination.pageIndex
    })
  )

  return (
    <>
      {environments.rows?.map(environment => (
        <div key={environment.id}>{environment.name}</div>
      ))}
    </>
  )
}
