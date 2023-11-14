import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Workloads',
  description: 'Workloads'
}

type RootProps = {
  children: React.ReactNode
}

export default function Workloads({ children }: RootProps) {
  return <>Workloads</>
}
