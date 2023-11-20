import React from 'react'

export type SubNavProps = {
  children?: React.ReactNode
  className?: string
}

export type SubNavTitleProps = {
  children?: string
  subtitle?: React.FC
}

export type SubNavActionsProps = {
  children?: React.ReactNode
}

export function SubNav({ children, ...props }: SubNavProps) {
  return (
    <aside
      className="flex border-b items-center justify-between space-y-2 p-8 pt-6"
      {...props}
    >
      {children}
    </aside>
  )
}

export function SubNavTitle({
  children,
  subtitle,
  ...props
}: SubNavTitleProps) {
  return (
    <h3
      className="scroll-m-20 text-2xl font-semibold tracking-tight"
      {...props}
    >
      {children}
    </h3>
  )
}

export function SubNavActions({ children, ...props }: SubNavProps) {
  return (
    <div className="flex items-center space-x-2" {...props}>
      {children}
    </div>
  )
}
