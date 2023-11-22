'use client'

import React, { useState } from 'react'
import { PaginationState } from '@tanstack/react-table'

export interface DataTableContext {
  pagination: PaginationState
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>
}

const DataTableContext = React.createContext<DataTableContext | undefined>(
  undefined
)
export default DataTableContext

export interface DataTableProviderProps {
  children: React.ReactNode
}

export const DataTableProvider = ({ children }: DataTableProviderProps) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 1
  })

  return (
    <DataTableContext.Provider value={{ pagination, setPagination }}>
      {children}
    </DataTableContext.Provider>
  )
}

export const useDataTableContext = () => {
  const dataTableContext = React.useContext(DataTableContext)

  if (!dataTableContext) {
    throw new Error('useDataTableContext must be inside a DataTableProvider')
  }

  return dataTableContext
}
