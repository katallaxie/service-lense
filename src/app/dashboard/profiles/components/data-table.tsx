'use client'

import { columns } from './data-columns'
import { DataTable } from '@/components/data-table'
import type { Profile } from '@/db/models/profile'

export function ProfileDataTable() {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <DataTable<Profile> columns={columns} />
    </div>
  )
}
