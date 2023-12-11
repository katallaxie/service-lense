'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { Lens } from '@/db/models/lens'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

export type SidebarNavProps = {
  params: { lensId: string; id: string }
  lens?: Lens
  className?: string
}

export function SidebarNav({
  className,
  lens,
  params,
  ...props
}: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1',
        className
      )}
      {...props}
    >
      <Accordion type="single" collapsible className="w-full">
        {lens?.pillars?.map(pillar => (
          <AccordionItem key={pillar.ref} value={pillar.ref}>
            <AccordionTrigger>{pillar.name}</AccordionTrigger>
            <AccordionContent>
              {pillar.questions?.map(question => (
                <Link
                  key={question.ref}
                  href={`/dashboard/workloads/${params.id}/lenses/${params.lensId}/question/${question.id}`}
                >
                  <Button variant="ghost" className="w-full justify-start">
                    {question.name}
                  </Button>
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* {items.map(item => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            pathname === item.href
              ? 'bg-muted hover:bg-muted'
              : 'hover:bg-transparent hover:underline',
            'justify-start'
          )}
        >
          {item.title}
        </Link>
      ))} */}
    </nav>
  )
}
