import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'WatchDog Alert — Real-Time Election Monitoring',
  description: 'Empowering citizens. Ensuring transparency. Report polling unit incidents instantly for rapid intervention.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
