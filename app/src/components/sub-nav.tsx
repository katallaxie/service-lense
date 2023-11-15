export type SubNavProps = {
  name?: string
  children?: React.ReactNode
  className?: string
}

export function SubNav({ name, children, ...props }: SubNavProps) {
  return (
    <aside className="flex items-center justify-between space-y-2">
      <h2 className="text-3xl font-bold tracking-tight">{name}</h2>
      <div className="flex items-center space-x-2">{children}</div>
    </aside>
  )
}