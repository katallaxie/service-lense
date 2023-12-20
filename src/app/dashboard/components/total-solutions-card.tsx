'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Suspense, use } from 'react'
import { api } from '@/trpc/client'
import { MagicWandIcon } from '@radix-ui/react-icons'
import DateFormat from '@/components/date-format'

export default function TotalSolutionsCard() {
  const totalSolutions = use(api.totalSolutions.query())

  return (
    <Suspense>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Solutions</CardTitle>
          <MagicWandIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalSolutions}</div>
          <p className="text-xs text-muted-foreground">
            <DateFormat />
          </p>
        </CardContent>
      </Card>
    </Suspense>
  )
}
