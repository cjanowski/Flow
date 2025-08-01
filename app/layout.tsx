import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CodeFlow - AI-Powered Ambient Coding Environment',
  description: 'Get into flow state with AI-generated soundscapes and dynamic visuals designed for programmers.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-flow-dark text-white antialiased`}>
        {children}
      </body>
    </html>
  )
}