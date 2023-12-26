import { AddWorkloadButton } from './components/add-button'
import {
  SubNav,
  SubNavTitle,
  SubNavActions,
  SubNavSubtitle
} from '@/components/sub-nav'
import DataTable from './components/data-table-context'

export type PageProps = {
  children?: React.ReactNode
}

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
        <DataTable />
      </section>
    </>
  )
}
