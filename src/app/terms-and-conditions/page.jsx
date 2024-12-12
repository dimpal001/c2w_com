import React from 'react'
import Header from '../Components/Header'
import TermsAndConditions from './TermsAndConditions'
import Footer from '../Components/Footer'

export const metadata = {
  title: 'Terms and Conditions | Clothes2Wear',
  description:
    'Read the terms and conditions of Clothes2Wear, outlining the policies, agreements, and user responsibilities for shopping with us.',
  keywords:
    'terms and conditions, Clothes2Wear policies, online shopping terms, agreements, user responsibilities',
  author: 'Clothes2Wear',
  viewport: 'width=device-width, initial-scale=1.0',
  robots: 'index, follow',
  charset: 'UTF-8',
}

const page = () => {
  return (
    <div>
      <Header />
      <TermsAndConditions />
      <Footer />
    </div>
  )
}

export default page
