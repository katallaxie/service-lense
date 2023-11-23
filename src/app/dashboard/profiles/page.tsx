import {
  SubNav,
  SubNavTitle,
  SubNavActions,
  SubNavSubtitle
} from '@/components/sub-nav'

import AddProfileDialog from './components/add-profile'
import { DataTableProvider } from '@/components/data-table-context'

type PageProps = {
  children: React.ReactNode
}

export default function Page({ children }: PageProps) {
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
          <AddProfileDialog />
        </SubNavActions>
      </SubNav>
      <section>
        <DataTableProvider></DataTableProvider>
      </section>
    </>
  )
}
