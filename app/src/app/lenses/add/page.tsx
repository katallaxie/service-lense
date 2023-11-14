import { SubNav } from '@/components/sub-nav'
import { AddLensForm } from './form'

type AddLensProps = {
  children?: React.ReactNode
}

export default function Add({ children }: AddLensProps) {
  return (
    <>
      <SubNav name="Add Lense" />
      <main>
        <AddLensForm />
      </main>
    </>
  )
}
