'use client'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import DateFormat from '@/components/date-format'
import { Lens } from '@/db/models/lens'

export type LensCardProps = {
  lens?: Lens
  className?: string
}

export function LensCard({ lens, ...props }: LensCardProps) {
  return (
    <Card {...props}>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">{lens?.name}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-l font-semibold tracking-tight text-muted-foreground">
              Last updated
            </h2>
            <p>
              <DateFormat date={lens?.dataValues?.updatedAt} />
            </p>
          </div>
        </div>
        <Separator />
        <p>{lens?.description || 'No description provided.'}</p>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  )
}
