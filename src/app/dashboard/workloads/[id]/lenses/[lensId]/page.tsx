import {
  SubNav,
  SubNavTitle,
  SubNavActions,
  SubNavSubtitle
} from '@/components/sub-nav'
import { Section } from '@/components/section'

export type PageProps = {
  params: { lensId: string }
}

export default async function Page({ params }: PageProps) {
  console.log(params)
  // const workload = await api.getWorkload.query(params?.id)

  return (
    <>
      <SubNav>
        <SubNavTitle>
          Lens
          <SubNavSubtitle>Lens description</SubNavSubtitle>
        </SubNavTitle>
        <SubNavActions></SubNavActions>
      </SubNav>
      <Section>This is is the lens</Section>
    </>
  )
}
