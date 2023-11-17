import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function useWorkloads() {
  const { data, error, mutate, isLoading } = useSWR(`/api/workloads`, fetcher)

  return {
    workloads: data,
    isLoading,
    isError: error,
    mutate
  }
}
