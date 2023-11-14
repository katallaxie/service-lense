import Link from 'next/link'

import { cn } from '@/lib/utils'

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      <Link
        href="/dasbhoard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Dashboard
      </Link>
      <Link
        href="/workloads"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Workloads
      </Link>
      <Link
        href="/lenses"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Lenses
      </Link>
      <Link
        href="/settings"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Settings
      </Link>
    </nav>
  )
}
