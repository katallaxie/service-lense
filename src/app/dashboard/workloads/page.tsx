import { AddWorkloadButton } from './components/add-button'
import {
  SubNav,
  SubNavTitle,
  SubNavActions,
  SubNavSubtitle
} from '@/components/sub-nav'
import DataTable from './components/data-table-context'

export default function Page() {
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
