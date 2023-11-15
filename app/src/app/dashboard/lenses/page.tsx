import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SubNav } from '@/components/sub-nav'

export default function Lenses() {
  return (
    <>
      <SubNav name="Lenses">
        <Link href="/lenses/add" passHref>
          <Button>Add Lens</Button>
        </Link>
      </SubNav>
    </>
  )
}
