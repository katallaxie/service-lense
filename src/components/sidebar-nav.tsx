import Link from 'next/link'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export type SidebarItem = {
  href: string
  title: string
}

export interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: SidebarItem[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  return (
    <aside
      className={cn(
        'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1',
        className
      )}
      {...props}
    >
      {items.map(item => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'hover:bg-transparent hover:bg-muted hover:rounded',
            'justify-start'
          )}
        >
          {item.title}
        </Link>
      ))}
    </aside>
  )
}
