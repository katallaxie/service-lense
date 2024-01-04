'use client'

import {
  useMemo,
  useState,
  use,
  useDeferredValue,
  useTransition,
  useCallback
} from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  OnChangeFn,
  PaginationState
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { DataTablePagination } from '../components/data-table-pagination'
import { DataTableToolbar } from '../components/data-table-toolbar'
import { api } from '@/trpc/client'
import { query } from 'winston'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  query: Query<TData>
}

const defaultPagination = {
  pageSize: 10,
  pageIndex: 0
}

export type Query<T> = (
  pagination: PaginationState
) => Promise<{ rows: T[]; count: number }>

export function DataTable<TData, TValue = unknown>({
  columns,
  query
}: DataTableProps<TData, TValue>) {
  const cols = useMemo(() => columns, [columns])
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] =
    useState<PaginationState>(defaultPagination)
  const [isFetching, startTransition] = useTransition()

  const onPaginationChange: OnChangeFn<PaginationState> = pagination => {
    startTransition(() => {
      setPagination(pagination)
    })
  }

  const { rows, count } = use(query(pagination))
  const deferredRows = useDeferredValue(rows)
  const deferredCount = useDeferredValue(count)

  const table = useReactTable({
    data: deferredRows,
    columns: cols,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination
    },
    pageCount: Math.ceil(count / pagination.pageSize),
    enableRowSelection: true,
    manualPagination: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onPaginationChange: onPaginationChange,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
  })

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} isFetching={isFetching} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No Results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination<TData> table={table} />
    </div>
  )
}
