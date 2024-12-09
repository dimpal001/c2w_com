/* eslint-disable react/prop-types */
'use client'

import localFont from 'next/font/local'
import './globals.css'
import React from 'react'
import { Roboto, Inter, Unbounded, Playwrite_HU } from 'next/font/google'
import { SnackbarProvider } from 'notistack'
import { UserProvider } from './context/UserContext'
import { CategoryProvider } from './context/CategoryContext'
import { SearchProvider } from './context/SearchContext'
import LandingPage from './landing/page'

// Local fonts
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

// Google Fonts
const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: '300',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: '400',
})

const unbounded = Unbounded({
  subsets: ['latin'],
  variable: '--font-unbounded',
  weight: '400',
})

const plhu = Playwrite_HU({
  subsets: ['latin'],
  variable: '--font-plhu',
  weight: '400',
})

export default function RootLayout() {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} ${plhu.variable} ${unbounded.variable} ${inter.variable} antialiased`}
      >
        <SearchProvider>
          <CategoryProvider>
            <UserProvider>
              <SnackbarProvider
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                autoHideDuration={2000}
              />
              {/* <div className='font-inter'>{children}</div>{' '} */}
              <div>
                <LandingPage />
              </div>
              {/* Applies Inter font */}
            </UserProvider>
          </CategoryProvider>
        </SearchProvider>
      </body>
    </html>
  )
}
