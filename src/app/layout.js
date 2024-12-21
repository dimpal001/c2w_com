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
import RouteGuard from './context/RouteGuard'

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
    url: 'https://www.clothes2wear.com',
    description:
      'Clothes2Wear offers the latest trends in fashion, with the best deals on clothing, shoes, and accessories.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.clothes2wear.com/search',
      'query-input': 'required search=search_term_string',
    },
    logo: 'https://www.clothes2wear.com/logo.png',
    sameAs: [
      'https://www.facebook.com/clothes2wear',
      'https://twitter.com/clothes2wear',
      'https://www.instagram.com/clothes2wear',
      'https://www.linkedin.com/company/clothes2wear',
    ],
    mainEntityOfPage: 'https://www.clothes2wear.com',
    headline: 'Clothes2Wear | Trendy Fashion, Best Deals on Clothing',
  }

  return (
    <html lang='en'>
      <head>
        <meta
          httpEquiv='Cache-Control'
          content='no-store, no-cache, must-revalidate, proxy-revalidate'
        />
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
              <RouteGuard>
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
                  <div className='fixed z-20 bottom-4 right-4 md:bottom-16 md:right-16 flex flex-col space-y-2'>
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
              </RouteGuard>
            </UserProvider>
          </CategoryProvider>
        </SearchProvider>
      </body>
    </html>
  )
}
