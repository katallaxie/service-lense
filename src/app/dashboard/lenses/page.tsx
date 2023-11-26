import AddLensDialog from './components/add-lens'
import {
  SubNav,
  SubNavTitle,
  SubNavActions,
  SubNavSubtitle
} from '@/components/sub-nav'
import AddProfileDialog from './components/add-lens'
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
          <AddLensDialog />
        </SubNavActions>
      </SubNav>
      <section>
        <DataTableProvider>
          <DataTable></DataTable>
        </DataTableProvider>
      </section>
    </>
  )
}
