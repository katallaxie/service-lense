import {
  SubNav,
  SubNavTitle,
  SubNavActions,
  SubNavSubtitle
} from '@/components/sub-nav'
import { SidebarNav } from './components/sidebar-nav'
import { Separator } from '@/components/ui/separator'
import { GeneralForm } from './components/general-form'

type PageProps = {
  children: React.ReactNode
}

const sidebarNavItems = [
  {
    title: 'General',
    href: '/dashboard/settings/general'
  },
  {
    title: 'Environments',
    href: '/dashboard/settings/environments'
  },
  {
    title: 'Appearance',
    href: '/dashboard/settings/appearance'
  }
]

export default function Page({ children }: PageProps) {
  return (
    <>
      <div>
        <h3 className="text-lg font-medium">General</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <GeneralForm />
    </>
  )
}
