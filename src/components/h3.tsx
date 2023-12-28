import { PropsWithChildren } from 'react'

export type H3Props = {}

export function H3({ children }: PropsWithChildren<H3Props>) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  )
}
