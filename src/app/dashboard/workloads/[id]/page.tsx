import {
  SubNav,
  SubNavTitle,
  SubNavActions,
  SubNavSubtitle
} from '@/components/sub-nav'
import { api } from '@/trpc/server-http'

export type PageProps = {
  params: { id: string }
}

export default async function Page({ params }: PageProps) {
  const workload = await api.getWorkload.query(params?.id)

  return (
    <>
      <SubNav>
        <SubNavTitle>
          {workload?.name}
          <SubNavSubtitle>Manage and review workflows</SubNavSubtitle>
        </SubNavTitle>
        <SubNavActions></SubNavActions>
      </SubNav>
      <section></section>
    </>
  )
}
