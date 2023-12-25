import { AddLensButton } from './components/add-button'
import {
  SubNav,
  SubNavTitle,
  SubNavActions,
  SubNavSubtitle
} from '@/components/sub-nav'
import DataTable from './components/data-context'

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
        <DataTable />
      </section>
    </>
  )
}
