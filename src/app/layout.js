/* eslint-disable react/prop-types */
'use client'

import React, { useState, useEffect } from 'react'
import localFont from 'next/font/local'
import './globals.css'
import { Roboto, Inter, Unbounded, Playwrite_HU } from 'next/font/google'
import { SnackbarProvider } from 'notistack'
import { UserProvider } from './context/UserContext'
import { CategoryProvider } from './context/CategoryContext'
import { SearchProvider } from './context/SearchContext'
import { ChevronDown, ChevronUp } from 'lucide-react'

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

export default function RootLayout({ children }) {
  const [isVisible, setIsVisible] = useState(false)

  const handleScroll = () => {
    const scrolled = window.scrollY
    console.log(scrolled)
    setIsVisible(scrolled > 300)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const schemaData = {
    '@context': 'https://schema.org/',
    '@type': 'WebSite',
    name: 'Clothes2Wear',
    url: 'https://www.thebmim.com',
    description:
      'Clothes2Wear offers the latest trends in fashion, with the best deals on clothing, shoes, and accessories.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.thebmim.com/search',
      'query-input': 'required search=search_term_string',
    },
    logo: 'https://www.thebmim.com/logo.png',
    sameAs: [
      'https://www.facebook.com/thebmim',
      'https://twitter.com/thebmim',
      'https://www.instagram.com/thebmim',
      'https://www.linkedin.com/company/thebmim',
    ],
    mainEntityOfPage: 'https://www.thebmim.com',
    headline: 'Clothes2Wear | Trendy Fashion, Best Deals on Clothing',
  }

  return (
    <html lang='en'>
      <head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
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
              <div className='font-inter relative'>
                <div>{children}</div>
              </div>{' '}
              {/* Applies Inter font */}
              {/* Scroll Buttons */}
              {isVisible && (
                <div className='fixed z-20 bottom-4 right-4 lg:bottom-16 lg:right-16 flex flex-col space-y-2'>
                  <button
                    onClick={scrollToTop}
                    className='bg-pink-500 text-white animate__animated animate__fadeInUp flex justify-center p-2 rounded-lg shadow-lg'
                  >
                    <ChevronUp
                      strokeWidth={3}
                      className='max-sm:w-8 max-sm:h-8 text-white'
                    />
                  </button>
                  <button
                    onClick={scrollToBottom}
                    className='bg-pink-500 text-white animate__animated animate__fadeInUp flex justify-center p-2 rounded-lg shadow-lg'
                  >
                    <ChevronDown
                      strokeWidth={3}
                      className='max-sm:w-8 text-white max-sm:h-8'
                    />
                  </button>
                </div>
              )}
            </UserProvider>
          </CategoryProvider>
        </SearchProvider>
      </body>
    </html>
  )
}
