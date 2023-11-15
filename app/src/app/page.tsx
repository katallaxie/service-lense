import { Metadata } from 'next'
import { getServerSession } from 'next-auth/next'
import { config } from '@/lib/auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard'
}

type RootProps = {
  children: React.ReactNode
}

export default async function Root({ children }: RootProps) {
  const session = await getServerSession(config)

  if (!session) {
    redirect('/login')
  }

  return <>Dashboard</>
}
