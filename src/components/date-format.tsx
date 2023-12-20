const defaultFormat: Intl.DateTimeFormatOptions = {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC'
}

export type DateFormatProps = {
  date?: Date
  placeholder?: string
  format?: Intl.DateTimeFormatOptions
  className?: string
}

export default function DateFormat({
  date = new Date(Date.now()),
  placeholder = '-',
  format = defaultFormat,
  ...props
}: DateFormatProps) {
  const formattedDate = date.toLocaleDateString('en-US', format)

  return (
    <>
      <p {...props}>{formattedDate ?? placeholder}</p>
    </>
  )
}
