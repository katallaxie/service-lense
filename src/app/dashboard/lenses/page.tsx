import { AddLensButton } from './components/add-lens'
import {
  SubNav,
  SubNavTitle,
  SubNavActions,
  SubNavSubtitle
} from '@/components/sub-nav'
import { Suspense } from 'react'
import { DataTableProvider } from '@/components/data-table-context'
import DataTable from './components/data-table'

export default function Lenses() {
  return (
    <>
      <SubNav>
        <SubNavTitle>
          Lenses
          <SubNavSubtitle>Review specifications for workloads</SubNavSubtitle>
        </SubNavTitle>
        <SubNavActions>
          <AddLensButton />
        </SubNavActions>
      </SubNav>
      <section>
        <Suspense>
          <DataTableProvider>
            <DataTable></DataTable>
          </DataTableProvider>
        </Suspense>
      </section>
    </>
  )
}
