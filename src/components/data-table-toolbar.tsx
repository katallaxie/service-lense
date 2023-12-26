'use client'

import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { CgSpinner } from 'react-icons/cg'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from '@/components/data-table-view-options'

import { statuses } from './data/data'
import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { DataTableLoading } from './data-table-loading'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  isFetching: boolean
}

export type DataTableToolsbarOptions = {
  filterColumnName: string
  filterColumnPlaceholder: string
}

export function DataTableToolbar<TData>({
  table,
  isFetching
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter workloads..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={event =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn('environment') && (
          <DataTableFacetedFilter
            column={table.getColumn('environment')}
            title="Environment"
            options={statuses}
          />
        )}
        {/* {table.getColumn('priority') && (
          <DataTableFacetedFilter
            column={table.getColumn('priority')}
            title="Priority"
            options={priorities}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {isFetching && <DataTableLoading />}

      <DataTableViewOptions table={table} />
    </div>
  )
}
