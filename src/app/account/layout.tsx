import {
  SubNav,
  SubNavTitle,
  SubNavActions,
  SubNavSubtitle
} from '@/components/sub-nav'
import { SidebarNav } from '@/components/sidebar-nav'
import DefaultLayout from '@/components/default-layout'

type PageProps = {
  children?: React.ReactNode
}

const sidebarNavItems = [
  {
    title: 'Profile',
    href: '/examples/forms'
  },
  {
    title: 'Account',
    href: '/examples/forms/account'
  },
  {
    title: 'Appearance',
    href: '/examples/forms/appearance'
  },
  {
    title: 'Notifications',
    href: '/examples/forms/notifications'
  },
  {
    title: 'Display',
    href: '/examples/forms/display'
  }
]

export default function Layout({ children }: PageProps) {
  return (
    <>
      <DefaultLayout>
        <SubNav>
          <SubNavTitle>
            Settings
            <SubNavSubtitle>
              Manage the settings of the service lens.
            </SubNavSubtitle>
          </SubNavTitle>
          <SubNavActions></SubNavActions>
        </SubNav>
        <main className="p-8">
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/5">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="flex-1 lg:max-w-2xl">
              <div className="space-y-6">{children}</div>
            </div>
          </div>
        </main>
      </DefaultLayout>
    </>
  )
}
