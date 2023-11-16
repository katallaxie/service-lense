import { Metadata } from 'next'
import { auth } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'Root',
  description: 'Root'
}

type RootProps = {
  children: React.ReactNode
}

export default async function Root({ children }: RootProps) {
  const session = auth()

  return <>{JSON.stringify(session)}</>
}
