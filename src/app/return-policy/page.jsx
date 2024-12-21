import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import ReturnPolicy2 from './ReturnPolicy2'

export const metadata = {
  title: 'Return Policy | Clothes2Wear',
  description:
    'Learn about the return policy of Clothes2Wear, including the conditions and steps for returning your purchased items hassle-free.',
  keywords:
    'return policy, Clothes2Wear returns, product returns, return process, return conditions, online shopping returns',
  author: 'Clothes2Wear',
  viewport: 'width=device-width, initial-scale=1.0',
  robots: 'index, follow',
  charset: 'UTF-8',
}

const page = () => {
  return (
    <div>
      <Header />
      <ReturnPolicy2 />
      <Footer />
    </div>
  )
}

export default page
