'use client'

import {useMemo} from 'react'
import { useDataTableContext } from '@/components/data-table-context'
import { columns } from './columns'
import { DataTable } from '@/components/data-table'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function Table() {
  const dataTableContext = useDataTableContext()
  const { data, mutate, isLoading } = useSWR(
    `/api/workloads?page=${dataTableContext.pagination.pageIndex}&limit=${dataTableContext.pagination.pageSize}`,
    fetcher
  )

  // const { workloads, mutate, isLoading } = useWorkloads()

  return useMemo(() => {
return <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
<DataTable
  data={data?.rows ?? []}
  columns={columns}
  isLoading={isLoading}
/>
</div>
  }, [dataTableContext.pagination.pageIndex, dataTableContext.pagination.pageSize, isLoading])
}


