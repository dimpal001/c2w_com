import React from 'react'
import Header from '../Components/Header'
import DiscountPolicy from './DiscountPolicy'
import Footer from '../Components/Footer'

export const metadata = {
  title: 'Discount Policy | Clothes2Wear',
  description:
    'Understand the discount policy of Clothes2Wear, including eligibility, terms, and conditions for availing discounts and offers.',
  keywords:
    'discount policy, Clothes2Wear discounts, shopping offers, discount terms, promotional offers, eligibility criteria',
  author: 'Clothes2Wear',
  viewport: 'width=device-width, initial-scale=1.0',
  robots: 'index, follow',
  charset: 'UTF-8',
}

const page = () => {
  return (
    <div>
      <Header />
      <DiscountPolicy />
      <Footer />
    </div>
  )
}

export default page
