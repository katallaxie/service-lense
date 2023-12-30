import { PropsWithChildren } from 'react'
import { ProfileForm } from './components/profile-form'
import { api } from '@/trpc/server-invoker'

type PageProps = {}

export default async function Page({ children }: PropsWithChildren<PageProps>) {
  const me = await api.me.query()

  return <>{me && <ProfileForm session={me} />}</>
}
