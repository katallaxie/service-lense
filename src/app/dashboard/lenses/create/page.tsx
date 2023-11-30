import {
  SubNav,
  SubNavTitle,
  SubNavActions,
  SubNavSubtitle
} from '@/components/sub-nav'
import { CreateLensForm } from './create.form'

export interface PageProps {
  children?: React.ReactNode
}

export default function Page({ children }: PageProps) {
  return (
    <>
      <SubNav>
        <SubNavTitle>
          Lenses
          <SubNavSubtitle>Review specifications for workloads</SubNavSubtitle>
        </SubNavTitle>
        <SubNavActions></SubNavActions>
      </SubNav>
      <section>
        <CreateLensForm />
      </section>
    </>
  )
}
