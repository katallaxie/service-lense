import {
  SubNav,
  SubNavTitle,
  SubNavActions,
  SubNavSubtitle
} from '@/components/sub-nav'
import { SidebarNav } from './components/sidebar-nav'
import { Separator } from '@/components/ui/separator'
import { ProfileForm } from './components/profile-form'

type PageProps = {
  children: React.ReactNode
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

export default function Page({ children }: PageProps) {
  return (
    <>
      <SubNav>
        <SubNavTitle>
          Account Settings
          <SubNavSubtitle>
            Manage your account settings and set e-mail preferences.
          </SubNavSubtitle>
        </SubNavTitle>
        <SubNavActions></SubNavActions>
      </SubNav>
      <main>
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Profile</h3>
                <p className="text-sm text-muted-foreground">
                  This is how others will see you on the site.
                </p>
              </div>
              <Separator />
              <ProfileForm />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
