import { AddSolution } from './components/add-solution'
import {
  SubNav,
  SubNavTitle,
  SubNavActions,
  SubNavSubtitle
} from '@/components/sub-nav'
import DataTable from './components/data-context'
import { Main } from '@/components/main'

export default function Page() {
  return (
    <>
      <SubNav>
        <SubNavTitle>
          Solutions
          <SubNavSubtitle>
            Design, review, and execute solutions.
          </SubNavSubtitle>
        </SubNavTitle>
        <SubNavActions>
          <AddSolution />
        </SubNavActions>
      </SubNav>
      <Main>
        <DataTable />
      </Main>
    </>
  )
}
