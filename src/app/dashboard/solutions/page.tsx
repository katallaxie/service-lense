import { Table } from './components/table'
import AddSolutionDialog from './components/add-solution'
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
          Solutions
          <SubNavSubtitle>Design, discuss, review, and build.</SubNavSubtitle>
        </SubNavTitle>
        <SubNavActions>
          <AddSolutionDialog />
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
