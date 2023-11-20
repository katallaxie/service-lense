import { Metadata } from 'next'
import { auth } from '@/lib/auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Root',
  description: 'Root'
}

type RootProps = {
  children: React.ReactNode
}

export default async function Root({ children }: RootProps) {
  const session = await auth()

  if (session !== null) {
    redirect('/dashboard')
  }

  return (
    <>
      <Link href="/login">Login</Link>
    </>
  )
}
