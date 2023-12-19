const defaultFormat: Intl.DateTimeFormatOptions = {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC'
}

export type DateFormatProps = {
  children?: React.ReactNode
  date?: Date
  placeholder?: string
  format?: Intl.DateTimeFormatOptions
}

export default function DateFormat({
  children,
  date = new Date(Date.now()),
  placeholder = '-',
  format = defaultFormat
}: DateFormatProps) {
  const f = date.toLocaleDateString('en-US', format)

  return <>{`${children} ${f ?? placeholder}`}</>
}
