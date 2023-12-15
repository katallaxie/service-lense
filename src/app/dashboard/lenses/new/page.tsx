import { SubNav, SubNavTitle, SubNavSubtitle } from '@/components/sub-nav'
import { Section } from '@/components/section'
import { NewSolutionForm } from './components/new-form'

export type PageProps = {
  children?: React.ReactNode
  searchParams: { template: string }
}

export default function Page({ searchParams, children }: PageProps) {
  return (
    <>
      <SubNav>
        <SubNavTitle>
          New Lens
          <SubNavSubtitle>Lenses help to evalute workloads.</SubNavSubtitle>
        </SubNavTitle>
      </SubNav>
      <Section>
        <NewSolutionForm />
      </Section>
    </>
  )
}
