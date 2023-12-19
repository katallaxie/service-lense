import {
  SubNav,
  SubNavTitle,
  SubNavActions,
  SubNavSubtitle
} from '@/components/sub-nav'
import { Section } from '@/components/section'
import { NewSolutionForm } from './components/new-form'
import { api } from '@/trpc/server-invoker'
import { SolutionTemplate } from '@/db/models/solution-templates'

export type PageProps = {
  children?: React.ReactNode
  searchParams: { template: string }
}

export default async function Page({ searchParams, children }: PageProps) {
  const template = await api.getSolutionTemplate.query(searchParams.template)

  return (
    <>
      <SubNav>
        <SubNavTitle>
          Solutions
          <SubNavSubtitle>Design, discuss, review, and build.</SubNavSubtitle>
        </SubNavTitle>
      </SubNav>
      <Section>
        <NewSolutionForm template={template ?? new SolutionTemplate()} />
      </Section>
    </>
  )
}
