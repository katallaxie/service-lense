import { PropsWithChildren } from 'react'

export type MainProps = {}

export function Main({ children }: PropsWithChildren<MainProps>) {
  return <main>{children}</main>
}
