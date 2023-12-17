'use client'

import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/navigation'
import { Lens } from '@/db/models/lens'
import { useAction } from '@/trpc/client'
import { rhfActionDeleteLens } from '@/app/dashboard/lenses/actions/lens.action'

interface PublishButtonProps {
  lensId?: string
}

export function PublishButton({ lensId }: PublishButtonProps) {
  //   const mutation = useAction(rhfActionDeleteLens)
  //   const router = useRouter()
  //   const handleOnClickDelete = async () => {
  //     await mutation.mutate(lens?.id ?? '')
  //     router.replace('/dashboard/lenses')
  //   }

  return (
    <form>
      <Button variant="outline">Publish</Button>
    </form>
  )
}
