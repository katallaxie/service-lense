import useSWR from 'swr'
import { useDataTableContext } from '../data-table-context'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function useWorkloads() {
  const {
    pagination: { pageSize: limit, pageIndex: page }
  } = useDataTableContext()

  const { data, error, mutate, isLoading } = useSWR(
    `/api/workloads?page=${page}&limit=${limit}`,
    fetcher
  )

  return {
    workloads: data,
    isLoading,
    isError: error,
    mutate
  }
}

export function useWorkload(id: string) {
  const { data, error, mutate, isLoading } = useSWR(
    `/api/workloads/${id}`,
    fetcher
  )

  return {
    workload: data,
    isLoading,
    isError: error,
    mutate
  }
}
