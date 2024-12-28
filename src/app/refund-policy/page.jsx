import React from 'react'
import Header from '../Components/Header'
import RefundPolicy from './RefundPolicy'
import Footer from '../Components/Footer'

export const metadata = {
  title: 'Refund Policy | Clothes2Wear',
  description:
    'Understand the refund policy of Clothes2Wear, detailing the conditions and procedures for returns and refunds to ensure a hassle-free shopping experience.',
  keywords:
    'refund policy, Clothes2Wear refunds, return policy, online shopping refunds, return process, refund conditions',
  author: 'Clothes2Wear',
  robots: 'index, follow',
  charset: 'UTF-8',
}

const page = () => {
  return (
    <div>
      <Header />
      <RefundPolicy />
      <Footer />
    </div>
  )
}

export default page
