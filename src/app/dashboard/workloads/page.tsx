import { Table } from './components/table'
import { AddWorkloadDialog } from './components/add-dialog'
import {
  SubNav,
  SubNavTitle,
  SubNavActions,
  SubNavSubtitle
} from '@/components/sub-nav'

type RootProps = {
  children: React.ReactNode
}
import { DataTableProvider } from '@/components/data-table-context'

export default function Page({ children }: RootProps) {
  return (
    <>
      <SubNav>
        <SubNavTitle>
          Workloads
          <SubNavSubtitle>Manage and review workflows</SubNavSubtitle>
        </SubNavTitle>
        <SubNavActions>
          <AddWorkloadDialog />
        </SubNavActions>
      </SubNav>
      <section>
        <DataTableProvider>
          <Table />
        </DataTableProvider>
      </section>
    </>
  )
}
