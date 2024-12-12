import React from 'react'
import Header from '../Components/Header'
import PrivacyPolicy from './PrivacyPolicy'
import Footer from '../Components/Footer'

export const metadata = {
  title: 'Privacy Policy | Clothes2Wear',
  description:
    'Learn about how Clothes2Wear collects, uses, and protects your personal information. Your privacy is our priority.',
  keywords:
    'privacy policy, Clothes2Wear privacy, data protection, personal information, user privacy, secure shopping',
  author: 'Clothes2Wear',
  viewport: 'width=device-width, initial-scale=1.0',
  robots: 'index, follow',
  charset: 'UTF-8',
}

const page = () => {
  return (
    <div>
      <Header />
      <PrivacyPolicy />
      <Footer />
    </div>
  )
}

export default page
