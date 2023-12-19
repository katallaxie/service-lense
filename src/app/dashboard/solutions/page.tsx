import { Table } from './components/table'
import { AddSolution } from './components/add-solution'
import {
  SubNav,
  SubNavTitle,
  SubNavActions,
  SubNavSubtitle
} from '@/components/sub-nav'
import { DataTableProvider } from '@/components/data-table-context'
import { api } from '@/trpc/server-http'

export type PageProps = {
  children?: React.ReactNode
}

export default async function Page({ children }: PageProps) {
  const templates = await api.findSolutionTemplates.query({})

  return (
    <>
      <SubNav>
        <SubNavTitle>
          Solutions
          <SubNavSubtitle>Design, discuss, review, and build.</SubNavSubtitle>
        </SubNavTitle>
        <SubNavActions>
          <AddSolution templates={templates.rows} />
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
