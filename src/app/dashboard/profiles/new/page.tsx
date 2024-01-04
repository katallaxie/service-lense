import { Suspense } from 'react'
import { SubNav, SubNavTitle, SubNavSubtitle } from '@/components/sub-nav'
import { Section } from '@/components/section'
import { NewProfileForm } from '@/components/dashboard/profiles/new-form'
import { LoadingSpinner } from '@/components/loading-spinner'

export default async function Page() {
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
        <Suspense fallback={<LoadingSpinner />}>
          <NewProfileForm />
        </Suspense>
      </Section>
    </>
  )
}
