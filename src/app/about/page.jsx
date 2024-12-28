import React from 'react'
import AboutPage from './AboutPage'
import Header from '../Components/Header'
import Footer from '../Components/Footer'

export const metadata = {
  title: 'About Us | Clothes2Wear',
  description:
    'Learn more about Clothes2Wear, our mission, values, and commitment to delivering the best fashion pieces across India.',
  keywords:
    'About Clothes2Wear, our mission, fashion brand, online shopping, Indian fashion, about us page',
  author: 'Clothes2Wear',
  robots: 'index, follow',
  charset: 'UTF-8',
}

const page = () => {
  return (
    <div>
      <Header />
      <AboutPage />
      <Footer />
    </div>
  )
}

export default page
