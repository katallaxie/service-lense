import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SubNav } from '@/components/sub-nav'
import AddLensDialog from './components/add-lens'

export default function Lenses() {
  return (
    <>
      <SubNav name="Lenses">
        <AddLensDialog />
      </SubNav>
    </>
  )
}
