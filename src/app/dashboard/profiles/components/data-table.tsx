'use client'

import { useMemo } from 'react'
import { columns } from './data-columns'
import { DataTable } from '@/components/data-table'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function ProfilesDataTable() {
  // const dataTableContext = useDataTableContext()
  const { data, mutate, isLoading } = useSWR(`/api/profiles`, fetcher)

  return useMemo(() => {
    return (
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <DataTable data={data?.rows ?? []} columns={columns} />
      </div>
    )
  }, [data?.rows])
}
