import { Table } from './components/table'
import { AddWorkloadButton } from './components/add-button'
import {
  SubNav,
  SubNavTitle,
  SubNavActions,
  SubNavSubtitle
} from '@/components/sub-nav'

export type PageProps = {
  children?: React.ReactNode
}

import { DataTableProvider } from '@/components/data-table-context'

export default function Page({ children }: PageProps) {
  return (
    <>
      <SubNav>
        <SubNavTitle>
          Workloads
          <SubNavSubtitle>Manage and review workflows</SubNavSubtitle>
        </SubNavTitle>
        <SubNavActions>
          <AddWorkloadButton />
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
