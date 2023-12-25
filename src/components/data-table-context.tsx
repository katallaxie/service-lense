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

// export interface DataTableContext<T = unknown> {
//   pagination: PaginationState
//   setPagination: React.Dispatch<React.SetStateAction<PaginationState>>
//   isFetching: boolean
//   data: T
// }

// export function createDataTableContext<T = unknown>() {
//   return React.createContext<DataTableContext<T> | null>(null)
// }

// export function createDataTableProvider<T = unknown>(
//   context: React.Context<T>
// ): React.FC<React.Provider<T>> {
//   // const [pagination, setPagination] = useState<PaginationState>({
//   //   pageIndex,
//   //   pageSize
//   // })
//   // const [isFetching, setFetching] = useState(true)
//   // const [data, setData] = useState<T>()
//   // useEffect(() => {
//   //   setFetching(true)
//   //   const fetchData = async () => {
//   //     const rows: T = await getRows(pagination)
//   //     setData(rows)
//   //     setFetching(false)
//   //   }
//   //   fetchData()
//   // }, [pagination, getRows])
//   return (
//     <context.Provider value={{ pagination, setPagination, isFetching, data }}>
//       {children}
//     </context.Provider>
//   )
// }

// const DataTableContext = React.createContext<DataTableContext | undefined>(
//   undefined
// )
// export default DataTableContext

// export interface DataTableProviderProps<T> {
//   children?: React.ReactNode
//   pageIndex?: number
//   pageSize?: number
//   getRows: (pagination: PaginationState) => Promise<T>
// }

// export function DataTableProvider<T = unknown>({
//   children,
//   pageIndex = 0,
//   pageSize = 10,
//   getRows
// }: DataTableProviderProps<T>) {
//   const [pagination, setPagination] = useState<PaginationState>({
//     pageIndex,
//     pageSize
//   })
//   const [isFetching, setFetching] = useState(true)
//   const [data, setData] = useState<T>()

//   useEffect(() => {
//     setFetching(true)

//     const fetchData = async () => {
//       const rows: T = await getRows(pagination)
//       setData(rows)

//       setFetching(false)
//     }

//     fetchData()
//   }, [pagination, getRows])

//   return (
//     <DataTableContext.Provider
//       value={{ pagination, setPagination, isFetching, data }}
//     >
//       {children}
//     </DataTableContext.Provider>
//   )
// }

// export const useDataTableContext = <T extends unknown>() => {
//   const dataTableContext = React.useContext<DataTableContext<T>>(
//     DataTableContext as unknown as React.Context<DataTableContext<T>>
//   )

//   if (!dataTableContext) {
//     throw new Error('useDataTableContext must be inside a DataTableProvider')
//   }

//   return dataTableContext
// }
