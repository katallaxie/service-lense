'use client'

import React, { useState, useEffect } from 'react'
import { PaginationState } from '@tanstack/react-table'

export interface DataTableContext<T = unknown> {
  pagination: PaginationState
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>
  isFetching: boolean
  data: T | undefined
}

export interface DataTableProviderProps<T> {
  children?: React.ReactNode
  pageIndex?: number
  pageSize?: number
  getRows: (pagination: PaginationState) => Promise<T>
}

export type CreateContextReturn<T> = [
  React.FunctionComponent<React.PropsWithChildren<DataTableProviderProps<T>>>,
  () => DataTableContext<T>,
  React.Context<DataTableContext<T>>
]

export const createContext = <T,>({}): CreateContextReturn<T> => {
  const Context = React.createContext<DataTableContext<T> | null>(null)

  const useContext = <T extends unknown>() => {
    const dataTableContext = React.useContext<DataTableContext<T>>(
      Context as unknown as React.Context<DataTableContext<T>>
    )

    if (!dataTableContext) {
      throw new Error('useDataTableContext must be inside a DataTableProvider')
    }

    return dataTableContext
  }

  const Provider = ({ children, getRows }: DataTableProviderProps<T>) => {
    const [pagination, setPagination] = useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10
    })
    const [isFetching, setFetching] = useState(true)
    const [data, setData] = useState<T>()

    useEffect(() => {
      setFetching(true)

      const fetchData = async () => {
        const rows: T = await getRows(pagination)
        setData(rows)

        setFetching(false)
      }

      fetchData()
    }, [pagination, getRows])

    return (
      <Context.Provider value={{ pagination, setPagination, isFetching, data }}>
        {children}
      </Context.Provider>
    )
  }

  return [Provider, useContext, Context] as CreateContextReturn<T>
}
