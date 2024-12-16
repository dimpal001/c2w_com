import React from 'react'
import { Search, Home } from 'lucide-react'
import Header from './Components/Header'

export const metadata = {
  title: 'Oops! Content Not Found | Clothes2Wear',
  description:
    'The page you are looking for is not available. Return to the homepage or explore our wide range of products.',
  keywords:
    '404, page not found, error page, e-commerce, online store, content missing',
  robots: 'noindex, follow',
  openGraph: {
    title: 'Oops! Content Not Found | Clothes2Wear',
    description:
      'We couldn’t find the page you’re looking for. Visit our homepage to continue shopping.',
    url: 'https://www.clothes2wear.com/404',
    siteName: 'Clothes2Wear',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oops! Content Not Found | Clothes2Wear',
    description:
      'Oops! The page you’re looking for doesn’t exist. Visit our homepage to keep exploring.',
  },
}

const NotFoundPage = () => {
  return (
    <div>
      <Header />
      <div className='flex flex-col items-center justify-center min-h-[calc(100vh-77px)] bg-gray-100 p-6'>
        <div className='max-w-lg text-center'>
          <h1 className='text-6xl font-extrabold text-gray-800 mb-4'>404</h1>
          <h2 className='text-2xl font-semibold text-gray-700 mb-6'>
            Oops! We can&apos;t find that page.
          </h2>
          <p className='text-gray-600 mb-8'>
            The page you&apos;re looking for might have been removed, had its
            name changed, or is temporarily unavailable.
          </p>
          <div className='flex justify-center max-sm:flex-col max-sm:mx-16 gap-4'>
            <a
              href='/'
              className='flex items-center max-sm:justify-center px-6 py-3 text-white bg-pink-600 hover:bg-pink-700 rounded-lg shadow-lg transition-transform transform hover:scale-105'
            >
              <Home className='w-5 h-5 mr-2' />
              Go Home
            </a>
            <a
              href='/search'
              className='flex items-center max-sm:justify-center px-6 py-3 text-pink-600 border border-pink-600 hover:bg-pink-100 rounded-lg shadow-lg transition-transform transform hover:scale-105'
            >
              <Search className='w-5 h-5 mr-2' />
              Search Products
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
