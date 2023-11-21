import Link from 'next/link'

import { cn } from '@/lib/utils'

const nav = [
  {
    name: 'Dasbboard',
    link: '/dashboard'
  },
  {
    name: 'Solutions',
    link: '/dashboard/solutions'
  },
  {
    name: 'Workloads',
    link: '/dashboard/workloads'
  },
  {
    name: 'Lenses',
    link: '/dashboard/lenses'
  },
  {
    name: 'Profiles',
    link: '/dashboard/profiles'
  }
]

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      {nav.map((item, idx) => (
        <Link
          key={idx}
          href={item.link}
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  )
}
