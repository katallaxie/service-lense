import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard'
}

type RootProps = {
  children: React.ReactNode
}

export default function Root({ children }: RootProps) {
  return <>Dashboard</>
}
