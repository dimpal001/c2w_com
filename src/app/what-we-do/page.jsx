import React from 'react'
import Header from '../Components/Header'
import WhatWeDo from './WhatWeDo'
import Footer from '../Components/Footer'

export const metadata = {
  title: 'What We Do | Clothes2Wear',
  description:
    'Discover what Clothes2Wear does to bring you the latest fashion trends. From quality sourcing to seamless delivery, learn about our commitment to style and service.',
  keywords:
    'What Clothes2Wear does, fashion services, quality fashion, latest trends, online shopping, Clothes2Wear services, Indian fashion brand',
  author: 'Clothes2Wear',
  viewport: 'width=device-width, initial-scale=1.0',
  robots: 'index, follow',
  charset: 'UTF-8',
}

const page = () => {
  return (
    <div>
      <Header />
      <WhatWeDo />
      <Footer />
    </div>
  )
}

export default page
