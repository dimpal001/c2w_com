/* eslint-disable no-unreachable */
import React from 'react'
import MainPage from './HomePageComponents/MainPage'

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

export const metadata = {
  title: 'Clothes2Wear | Trendy Fashion, Best Deals on Clothing',
  description:
    'Clothes2Wear offers the latest fashion trends, Clothing, shoes, and accessories for men and women at the best prices. Shop online now!',
  keywords:
    'Clothing, fashion, online shopping, shoes, accessories, latest trends, Clothes2wear',
  robots: 'index, follow',
  author: 'Clothes2Wear',
  language: 'en',
  structuredData: schemaData,

  openGraph: {
    title: 'Clothes2Wear | Trendy Fashion, Best Deals on Clothing',
    description:
      'Clothes2Wear offers the latest fashion trends, clothing, shoes, and accessories for men and women at the best prices. Shop online now!',
    url: 'https://www.clothes2wear.com',
    type: 'website',
    site_name: 'Clothes2Wear',
    locale: 'en_US',
    images: [
      {
        url: 'https://www.clothes2wear.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Clothes2Wear Fashion Collection',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Clothes2Wear | Trendy Fashion, Best Deals on Clothing',
    description:
      'Clothes2Wear offers the latest fashion trends, clothing, shoes, and accessories for men and women at the best prices. Shop online now!',
    image: 'https://www.clothes2wear.com/twitter-card-image.jpg',
    creator: '@clothes2wear',
  },

  canonical: 'https://www.clothes2wear.com',
}

const HomePage = async () => {
  try {
    return (
      <>
        <MainPage />
      </>
    )
  } catch {
    return (
      <div className='w-screen bg-gradient-to-br from-green-400 to-blue-500 via-indigo-600 text-white flex justify-center items-center h-screen'>
        <p className='text-3xl font-semibold animate__animated animate__flip animate__slow'>
          Hello, world 👋
        </p>
      </div>
    )
  }
}

export default HomePage
