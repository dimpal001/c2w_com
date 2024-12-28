import React from 'react'
import Header from '../Components/Header'
import Community from './Community'
import Footer from '../Components/Footer'

export const metadata = {
  title: 'Community | Clothes2Wear',
  description:
    'Join the Clothes2Wear community to connect with fellow fashion enthusiasts, share style tips, and stay updated on the latest trends and events.',
  keywords:
    'Clothes2Wear community, fashion community, style tips, fashion trends, fashion enthusiasts, online fashion group, Clothes2Wear events',
  author: 'Clothes2Wear',
  robots: 'index, follow',
  charset: 'UTF-8',
}

const page = () => {
  return (
    <div>
      <Header />
      <Community />
      <Footer />
    </div>
  )
}

export default page
