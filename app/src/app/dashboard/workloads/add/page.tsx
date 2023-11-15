import { SubNav } from '@/components/sub-nav'
import { AddWorkloadForm } from './form'

type AddLensProps = {
  children?: React.ReactNode
}

export default function Add({ children }: AddLensProps) {
  return (
    <>
      <SubNav name="Add Workload" />
      <main>
        <AddWorkloadForm />
      </main>
    </>
  )
}
