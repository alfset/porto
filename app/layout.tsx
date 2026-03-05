import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Alfino Setiawan — Web3 Developer & Validator Operator',
  description:
    'Personal portfolio of Alfino Setiawan (alfset) — Web3 Fullstack Developer, Smart Contract Engineer, and Blockchain Validator Operator from Indonesia.',
  keywords: ['Web3', 'Blockchain', 'Validator', 'Smart Contract', 'Developer', 'Indonesia'],
  openGraph: {
    title: 'Alfino Setiawan — Web3 Developer',
    description: 'Web3 Fullstack Developer & Validator Operator from Indonesia',
    url: 'https://comunitynode.my.id',
    siteName: 'Alfset Portfolio',
  },
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
