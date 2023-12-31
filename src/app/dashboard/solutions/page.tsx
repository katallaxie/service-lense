import { AddSolution } from './components/add-solution'
import {
  SubNav,
  SubNavTitle,
  SubNavActions,
  SubNavSubtitle
} from '@/components/sub-nav'
import DataTable from './components/data-context'
import { PropsWithChildren } from 'react'

export interface PageProps {}

export default function Page({ ...props }: PropsWithChildren<PageProps>) {
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
      <section>
        <DataTable />
      </section>
    </>
  )
}
