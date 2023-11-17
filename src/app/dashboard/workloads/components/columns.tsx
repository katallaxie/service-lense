'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'

import { statuses } from '../data/data'
import { Workload } from '@/db'
import { DataTableColumnHeader } from '@/components/data-table-column-header'
import { DataTableRowActions } from '@/components/data-table-row-actions'

export const columns: ColumnDef<Workload>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Workloads" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      //   const label = labels.find(label => label.value === row.original.)

      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('name')}
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: 'environment',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Environment" />
    ),
    cell: ({ row }) => {
      //   const status = statuses.find(
      //     status => status.value === row.getValue('environment')
      //   )

      //   if (!status) {
      //     return null
      //   }

      return (
        <div className="flex space-x-2 items-center">
          {/* {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )} */}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('environment')}
          </span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />
  }
]
