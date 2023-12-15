import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface AddLensButtonProps {}

export function AddLensButton({}: AddLensButtonProps) {
  return (
    <Link href="/dashboard/lenses/new" passHref>
      <Button variant={'outline'}>New Lens</Button>
    </Link>
  )
}
