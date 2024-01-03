'use client'

import React, { useEffect, useRef, useState } from 'react'
import { PaginationState } from '@tanstack/react-table'
import type { OnChangeFn } from '@tanstack/react-table'

export type CursorPagination = {
  /** The current page cursor. If empty, we're in the first page.
   * Whenever we change the page, this changes.
   */
  currentCursor?: string
  /** A counter that keeps track of the current page.
   * Useful if we want to show a page number in the UI */
  currentPage?: number | null
  /** The first cursor of the current page, as specified by the data source*/
  startCursor?: string
  /** The end cursor of the current page, as specified by the data source */
  endCursor?: string
  /** Whether the data source has a next page */
  hasNextPage?: boolean
  /** Whether the data source has a previous page */
  hasPreviousPage?: boolean
  /** Whether we're paging backwards (used when going to previous/last page) */
  reverse?: boolean
  /** The amount of items to take */
  pageSize: number
  /** The current start of the pages */
  pageIndex: number
  /** The total amount of items */
  totalCount: number
  /** Fetching is indicating that data is fetched */
  fetching: boolean
}

export type CursorState<T> = {
  rows: T[]
  cursor: CursorPagination
}

export interface GroupedCountResultItem {
  [key: string]: unknown
  count: number
}

export type ReturnResult<T> = {
  rows: T[]
  count: number
}

export interface DataTableContext<T = unknown> {
  state: CursorState<T>
  onPaginationChange: OnChangeFn<PaginationState>
}

enum TableActionKind {
  RESET = 'RESET',
  PREV_PAGE = 'PREV_PAGE',
  NEXT_PAGE = 'NEXT_PAGE',
  SET_PAGESIZE = 'SET_PAGESIZE',
  SUCCESS = 'SUCCESS',
  FETCHING = 'FETCHING',
  ERROR = 'ERROR'
}

interface ResetAction {
  type: TableActionKind.RESET
}

interface FetchingAction {
  type: TableActionKind.FETCHING
}

interface NextPageAction {
  type: TableActionKind.NEXT_PAGE
}

interface PrevPageAction {
  type: TableActionKind.PREV_PAGE
}

interface SetPageSizeAction {
  type: TableActionKind.SET_PAGESIZE
  pageSize: number
  pageIndex: number
}

interface SuccessAction<T> {
  type: TableActionKind.SUCCESS
  result: ReturnResult<T>
}

type TableAction<T> =
  | ResetAction
  | FetchingAction
  | NextPageAction
  | PrevPageAction
  | SetPageSizeAction
  | SuccessAction<T>

function tableReducer<T>(state: CursorState<T>, action: TableAction<T>) {
  switch (action.type) {
    case TableActionKind.NEXT_PAGE:
      return {
        ...state,
        cursor: {
          ...state.cursor,
          pageIndex: state.cursor.pageIndex + state.cursor.pageSize
        }
      }
    case TableActionKind.SET_PAGESIZE:
      return {
        ...state,
        cursor: {
          ...state.cursor,
          pageSize: action.pageSize
        }
      }
    case TableActionKind.FETCHING:
      return {
        ...state,
        cursor: {
          ...state.cursor,
          fetching: true
        }
      }
    case TableActionKind.SUCCESS:
      return {
        ...state,
        rows: action.result.rows,
        cursor: {
          ...state.cursor,
          fetching: false
        }
      }
    default:
      return state
  }
}

const defaultState = {
  rows: [],
  cursor: {
    pageSize: 10,
    pageIndex: 0,
    totalCount: 0,
    fetching: false
  }
}

const defaultPaginationState = {
  pageIndex: 0,
  pageSize: 10
}

export interface DataTableProviderProps<T> {
  initialState?: CursorState<T>
  getRows: (pagination: PaginationState) => Promise<ReturnResult<T>>
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

  const Provider = ({
    children,
    initialState = defaultState,
    getRows
  }: React.PropsWithChildren<DataTableProviderProps<T>>) => {
    const initialized = useRef(false)
    const [state, dispatch] = React.useReducer(tableReducer<T>, initialState)
    const [pagination, onPaginationChange] = useState<PaginationState>(
      defaultPaginationState
    )

    const fetchResults = React.useCallback(async () => {
      dispatch({ type: TableActionKind.FETCHING })
      const result = await getRows({
        pageIndex: state.cursor.pageIndex,
        pageSize: state.cursor.pageSize
      })
      dispatch({ type: TableActionKind.SUCCESS, result })
    }, [getRows, state.cursor.pageIndex, state.cursor.pageSize])

    useEffect(() => {
      if (!initialized.current) {
        initialized.current = true
        return
      }
      fetchResults()
    }, [state.cursor.pageIndex, state.cursor.pageSize, fetchResults])

    useEffect(() => {
      dispatch({
        type: TableActionKind.SET_PAGESIZE,
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize
      })
    }, [pagination.pageIndex, pagination.pageSize])

    return (
      <Context.Provider value={{ onPaginationChange, state }}>
        {children}
      </Context.Provider>
    )
  }

  return [Provider, useContext, Context] as CreateContextReturn<T>
}
