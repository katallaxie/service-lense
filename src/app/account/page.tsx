import {
  SubNav,
  SubNavTitle,
  SubNavActions,
  SubNavSubtitle
} from '@/components/sub-nav'
import { SidebarNav } from '@/components/sidebar-nav'
import { Separator } from '@/components/ui/separator'
import { ProfileForm } from './components/profile-form'
import { Main } from '@/components/main'

type PageProps = {
  children: React.ReactNode
}

export default function Page({ children }: PageProps) {
  return (
    <>
      <ProfileForm />
    </>
  )
}
