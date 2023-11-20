'use client'

import { SubNav, SubNavTitle, SubNavActions } from '@/components/sub-nav'
import { AddProfileDialog } from './components/add-profile'

type PageProps = {
  children: React.ReactNode
}

export default function Page({ children }: PageProps) {
  return (
    <>
      <SubNav>
        <SubNavTitle>Profiles</SubNavTitle>
        <SubNavActions>
          <AddProfileDialog />
        </SubNavActions>
      </SubNav>
    </>
  )
}
