import {
  SubNav,
  SubNavTitle,
  SubNavSubtitle,
  SubNavActions
} from '@/components/sub-nav'
import { Section } from '@/components/section'
import { NewProfileForm } from './components/new-form'

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
        <NewProfileForm />
      </Section>
    </>
  )
}
