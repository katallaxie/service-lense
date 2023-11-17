import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard'
}

type PageProps = {
  children: React.ReactNode
}

export default async function Page({ children }: PageProps) {
  return <main>Dashboard</main>
}
