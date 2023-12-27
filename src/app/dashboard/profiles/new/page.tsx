import { Suspense } from 'react'
import {
  SubNav,
  SubNavTitle,
  SubNavSubtitle,
  SubNavActions
} from '@/components/sub-nav'
import { Section } from '@/components/section'
import { NewProfileForm } from './components/new-form'
import { api } from '@/trpc/server-http'

export default async function Page() {
  const questions = await api.listProfilesQuestions.query()

  return (
    <>
      <SubNav>
        <SubNavTitle>
          New Profile
          <SubNavSubtitle>
            Profiles help to provide a business context.
          </SubNavSubtitle>
        </SubNavTitle>
      </SubNav>
      <Section>
        <Suspense>
          <NewProfileForm questions={questions} />
        </Suspense>
      </Section>
    </>
  )
}
