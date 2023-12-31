import {
  SubNav,
  SubNavTitle,
  SubNavActions,
  SubNavSubtitle
} from '@/components/sub-nav'

import { AddProfileButton } from './components/add-button'
import DataTable from './components/data-table-context'

export default function Page() {
  return (
    <>
      <SubNav>
        <SubNavTitle>
          <p>Profiles</p>
          <SubNavSubtitle>
            Provide business context for a workload
          </SubNavSubtitle>
        </SubNavTitle>
        <SubNavActions>
          <AddProfileButton />
        </SubNavActions>
      </SubNav>
      <section>
        <DataTable />
      </section>
    </>
  )
}
