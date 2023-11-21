import { SubNav, SubNavTitle, SubNavActions } from '@/components/sub-nav'

type PageProps = {
  children: React.ReactNode
}

export default function Page({ children }: PageProps) {
  return (
    <>
      <SubNav>
        <SubNavTitle>Account Settings</SubNavTitle>
        <SubNavActions></SubNavActions>
      </SubNav>
    </>
  )
}
