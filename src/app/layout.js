'use client'

import localFont from 'next/font/local'
import './globals.css'
import React from 'react'
import { Roboto } from 'next/font/google'
import { SnackbarProvider } from 'notistack'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: '300',
})

// eslint-disable-next-line react/prop-types
export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} antialiased`}
      >
        <SnackbarProvider
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          autoHideDuration={2000}
        />
        <div>{children}</div>
      </body>
    </html>
  )
}
