import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/providers'
import DefaultLayout from '@/components/DefaultLayout'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <DefaultLayout>{children}</DefaultLayout>
        </Providers>
      </body>
    </html>
  )
}
