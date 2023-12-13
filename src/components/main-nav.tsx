import Link from 'next/link'
import { headers } from 'next/headers'

import { cn } from '@/lib/utils'

const nav = [
  {
    name: 'Dasbboard',
    link: '/dashboard'
  },
  {
    name: 'Workloads',
    link: '/dashboard/workloads'
  },
  {
    name: 'Solutions',
    link: '/dashboard/solutions'
  },
  {
    name: 'Lenses',
    link: '/dashboard/lenses'
  },
  {
    name: 'Profiles',
    link: '/dashboard/profiles'
  },
  {
    name: 'Settings',
    link: '/dashboard/settings'
  }
]

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  // const heads = headers()
  // const pathname = heads.get('next-url') ?? ''

  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      {nav.map((item, idx) => (
        <Link
          key={idx}
          href={item.link}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary'
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  )
}
